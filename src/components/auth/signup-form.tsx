"use client";
import Link from "next/link";
import * as React from "react";
import { useEffect, useState } from "react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSignUp } from "@/hooks/use-auth";
import { useCheckUsername } from "@/hooks/use-check-username";
import { useDebounce } from "@/hooks/use-debounce";

const schema = z.object({
  username: z.string(),
  email: z.email(),
  password: z.string().min(6, { message: "Password must be of 6 character" }),
});

type Errors = Record<string, string | string[]>;

export default function SignUpForm() {
  const { isPending, mutate: signUp } = useSignUp();
  const [errors, setErrors] = React.useState<Errors>({});
  const [username, setUserName] = useState("");

  const debouncedUsername = useDebounce(username);
  const { data: isAvailable } = useCheckUsername(debouncedUsername);

  useEffect(() => {
    if (debouncedUsername.length < 3) return;

    if (isAvailable === false) {
      setErrors((prev) => ({ ...prev, username: "Username already taken" }));
    }

    if (isAvailable === true) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.username;
        return newErrors;
      });
    }
  }, [isAvailable, debouncedUsername]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = schema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      const { fieldErrors } = z.flattenError(result.error);
      setErrors(fieldErrors as Errors);
      return;
    }

    if (isAvailable === false) {
      setErrors({ username: "Username already taken" });
      return;
    }

    signUp(result.data);
  };
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-sm text-gray-600">
            Enter your details to create your account
          </p>
        </div>
        <Form className="space-y-4" errors={errors} onSubmit={onSubmit}>
          <Field name="username">
            <FieldLabel>Username</FieldLabel>
            <Input
              disabled={isPending}
              placeholder="jhondoe"
              type="text"
              className="w-full"
              onChange={(e) => setUserName(e.target.value)}
            />
            <FieldError />
          </Field>
          <Field name="email">
            <FieldLabel>Email</FieldLabel>
            <Input
              disabled={isPending}
              placeholder="jhon@doe.com"
              type="email"
              className="w-full"
            />
            <FieldError />
          </Field>
          <Field name="password">
            <FieldLabel>Password</FieldLabel>
            <Input
              disabled={isPending}
              placeholder="******"
              type="password"
              className="w-full"
            />
            <FieldError />
          </Field>
          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? "Signing in..." : "Sign In"}
          </Button>
        </Form>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/sign-in" className="underline underline-offset-4">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
