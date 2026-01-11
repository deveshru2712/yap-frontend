"use client";
import * as React from "react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const schema = z.object({
  username: z.string(),
  email: z.email(),
  password: z.string().min(6, { message: "Password must be of 6 character" }),
});

type Errors = Record<string, string | string[]>;

export default function SignUpForm() {
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Errors>({});

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = schema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      const { fieldErrors } = z.flattenError(result.error);
      setErrors(fieldErrors as Errors);
      setLoading(false);
      return;
    }

    console.log(result.data);
    setLoading(false);
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
              disabled={loading}
              placeholder="jhondoe"
              type="text"
              className="w-full"
            />
            <FieldError />
          </Field>
          <Field name="email">
            <FieldLabel>Email</FieldLabel>
            <Input
              disabled={loading}
              placeholder="jhon@doe.com"
              type="email"
              className="w-full"
            />
            <FieldError />
          </Field>
          <Field name="password">
            <FieldLabel>Password</FieldLabel>
            <Input
              disabled={loading}
              placeholder="******"
              type="password"
              className="w-full"
            />
            <FieldError />
          </Field>
          <Button disabled={loading} type="submit" className="w-full">
            {loading ? "Signing in..." : "Sign In"}
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
