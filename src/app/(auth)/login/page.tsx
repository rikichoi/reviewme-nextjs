import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia } from "@/auth";
import { redirect } from "next/navigation";
import { logInSchema } from "@/lib/validation";
import prisma from "@/lib/db";
import Link from "next/link";

async function login(formData: FormData): Promise<ActionResult> {
  "use server";
  const values = Object.fromEntries(formData.entries());

  const { password, username } = logInSchema.parse(values);

  const existingUser = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
  });

  if (!existingUser || !existingUser.passwordHash) {
    // NOTE:
    // Returning immediately allows malicious actors to figure out valid usernames from response times,
    // allowing them to only focus on guessing passwords in brute-force attacks.
    // As a preventive measure, you may want to hash passwords even for invalid usernames.
    // However, valid usernames can be already be revealed with the signup page among other methods.
    // It will also be much more resource intensive.
    // Since protecting against this is non-trivial,
    // it is crucial your implementation is protected against brute-force attacks with login throttling etc.
    // If usernames are public, you may outright tell the user that the username is invalid.
    return {
      error: "Incorrect username or password",
    };
  }

  const validPassword = await verify(existingUser.passwordHash, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  if (!validPassword) {
    return {
      error: "Incorrect username or password",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
}

export default async function LogInPage() {
  return (
    <div className="bg-white max-w-lg rounded border-2 mx-auto my-8 space-y-10 p-10">
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-bold tracking-tighter">Log In</h1>
        <p className="text-gray-500 tracking-tighter">
          Enter your credentials to access your account
        </p>
      </div>

      <form action={login} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label className="font-medium" htmlFor="username">
            Username
          </label>
          <input
            name="username"
            id="username"
            className="border-2 p-2 rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="border-2 p-2 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="border rounded-lg p-2 text-white bg-[#1c1c1c] w-full"
        >
          Log in
        </button>
      </form>
      <br />
      <p className="text-center text-gray-600">
        Don&apos;t have an account?{" "}
        <Link className="text-blue-500 hover:underline" href={"/signup"}>
          Sign up
        </Link>
      </p>
    </div>
  );
}

interface ActionResult {
  error: string;
}
