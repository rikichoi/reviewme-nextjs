import prisma from "@/lib/db";
import { hash } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia } from "@/auth";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";
import { signUpSchema } from "@/lib/validation";

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
    <div className="bg-white max-w-2xl rounded border-2 mx-auto my-8">
      <h1 className="text-2xl font-bold tracking-tighter">Create an account</h1>
      <form action={signup} className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input name="email" id="username" className="border-2 p-2 rounded-lg" />
        <br />
        <label htmlFor="username">Username</label>
        <input
          name="username"
          id="username"
          className="border-2 p-2 rounded-lg"
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="border-2 p-2 rounded-lg"
        />
        <br />
        <button
          type="submit"
          className="border rounded-lg p-2 text-white bg-[#1c1c1c] w-full"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}

interface ActionResult {
  error: string;
}
