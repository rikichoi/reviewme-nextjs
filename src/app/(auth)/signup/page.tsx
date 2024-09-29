import prisma from "@/lib/db";
import { hash } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia } from "@/auth";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";
import { signUpSchema } from "@/lib/validation";
import Link from "next/link";

async function signup(formData: FormData): Promise<ActionResult> {
  "use server";
  const values = Object.fromEntries(formData.entries());

  const { email, password, username } = signUpSchema.parse(values);

  const passwordHash = await hash(password, {
    // recommended minimum parameters
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  const userId = generateIdFromEntropySize(10); // 16 characters long

  // TODO: check if username is already used
  const usernameExists = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
  });

  if (usernameExists) {
    return { error: "Username already exists" };
  }

  const emailExists = await prisma.user.findFirst({
    where: {
      email: {
        equals: email,
        mode: "insensitive",
      },
    },
  });

  if (emailExists) {
    return { error: "Email already exists" };
  }

  await prisma.user.create({
    data: {
      id: userId,
      email,
      username,
      displayName: username,
      passwordHash,
    },
  });

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
}

export default async function SignUpPage() {
  return (
    <div className="bg-white max-w-lg rounded border-2 mx-auto my-8 space-y-10 p-10">
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-bold tracking-tighter">
          Create an account
        </h1>
        <p className="text-gray-500 tracking-tighter">
          Enter your credentials to access your account
        </p>
      </div>

      <form action={signup} className="flex flex-col gap-5">
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
          Sign Up
        </button>
      </form>
      <br />
      <p className="text-center text-gray-600">
        Already have an account?{" "}
        <Link className="text-blue-500 hover:underline" href={"/login"}>
          Log In
        </Link>
      </p>
    </div>
  );
}

interface ActionResult {
  error: string;
}
