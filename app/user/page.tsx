import { authOptions } from "@/app/options";
import { getServerSession, User } from "next-auth";
import { redirect } from "next/navigation";
import { Session } from "@/app/types";

async function getUser() {
  const session: Session | null = await getServerSession(authOptions);

  if (session?.token) {
    const res = await fetch(`${process.env.API_BASE}/users/me`, {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });
    const user = await res.json();
    // Handle the response from the API
    if (res.ok && user) {
      console.log(user);
      return user;
    } else {
      return undefined;
    }
  }
}

export default async function User() {
  const data = await getUser();
  if (data === undefined) {
    redirect("/login");
  }
  return (
    <main className="flex min-h-screen items-center justify-center">Hello</main>
  );
}
