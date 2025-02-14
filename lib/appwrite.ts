"use server";

import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  try {
    const session = (await cookies()).get("appwrite-session");

    console.log("Retrieved Session Cookie:", session);

    if (!session || !session.value) {
      throw new Error("No session found. Ensure the user is logged in and the session cookie is set.");
    }

    client.setSession(session.value);

    return {
      get account() {
        return new Account(client);
      },
    };
  } catch (error) {
    console.error("Error in createSessionClient:", error);
    throw new Error("Failed to create session client.");
  }
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
    get user() {
      return new Users(client);
    },
  };
}
