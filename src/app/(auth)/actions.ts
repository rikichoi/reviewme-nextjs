import { lucia, getUser } from "@/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

interface ActionResult {
    error: string;
}


export async function logout(): Promise<ActionResult> {
    "use server";
    const session = await getUser();
    if (!session) {
        return {
            error: "Unauthorized"
        };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect("/login");
}