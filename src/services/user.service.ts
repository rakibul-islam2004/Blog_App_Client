import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.API_URL;

export const userService = {
  getSession: async function () {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${AUTH_URL}/api/auth/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const session = await res.json();

      if (session === null) {
        return { data: null, error: { message: "Session is missing." } };
      }

      return { data: session, error: null };
    } catch (err) {
      console.log(err);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
