"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";
import CustomInputs from "./CustomInputs";
import { AuthFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/actions.user";

const AuthForm = ({ type }: { type: string }) => {
  const formSchema = AuthFormSchema(type);
  const router = useRouter(); // ✅ Fixed: Called useRouter correctly
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address1: "",
      city: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
      ssn: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (type === "sign-up") {
        const newUser = await signUp(data);
        setUser(newUser);
      } else if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });

        if (response) {
          router.push("/"); // ✅ Fixed: Calling router.push() correctly
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 mb:gap-8">
        <Link href="/" className="flex items-center gap-2 cursor-pointer px-12">
          <Image src="/icons/logo.svg" alt="Horizon logo" width={34} height={34} />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1 justify-center">
            HASHIRA
          </h1>
        </Link>
        <div className="flex flex-col gap-1 mb:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className="text-16 font-normal text-gray-600">
              {user ? "Link the Account to get Started" : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>

      {user ? (
        <div>
          {/* Add plaidLink or other UI elements if needed */}
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInputs control={form.control} name="firstName" label="First Name" placeholder="Enter your first name" />
                    <CustomInputs control={form.control} name="lastName" label="Last Name" placeholder="Enter your last name" />
                  </div>
                  <CustomInputs control={form.control} name="address1" label="Address" placeholder="Enter your specific address" />
                  <CustomInputs control={form.control} name="city" label="City" placeholder="Enter your city" />
                  <div className="flex gap-4">
                    <CustomInputs control={form.control} name="state" label="State" placeholder="Example: NY" />
                    <CustomInputs control={form.control} name="postalCode" label="Pin Code" placeholder="Example: 11101" />
                  </div>
                  <div className="flex gap-4">
                    <CustomInputs control={form.control} name="dateOfBirth" label="Date of Birth" placeholder="YYYY-MM-DD" />
                    <CustomInputs control={form.control} name="ssn" label="SSN" placeholder="Example: 1234" />
                  </div>
                </>
              )}

              <CustomInputs control={form.control} name="email" placeholder="Enter a valid email" label="Email" />
              <CustomInputs control={form.control} name="password" placeholder="Enter a valid password" label="Password" />

              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                    </>
                  ) : type === "sign-in" ? "Sign In" : "Sign Up"}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-bold text-gray-600">
              {type === "sign-in"
                ? " Don't Have An Account?"
                : "Already have An Account?"}
            </p>
            <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"} className="form-link">
              {type === "sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
