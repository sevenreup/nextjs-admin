"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLogin } from "./use-form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Footer from "../components/footer";
import ErrorBlock from "@/components/error-block";
import { LoaderIcon } from "lucide-react";

type Props = {};

const Page = (props: Props) => {
  const { errors, form, isLoadingSubmit, submitHandler } = useLogin();

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold md:text-4xl">Log in</h1>

      <hr className="my-8 w-full" />

      <Form {...form}>
        <form
          onSubmit={submitHandler}
          className="flex w-full flex-col gap-y-3"
          autoComplete="off"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email address..."
                    type="text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder={"********"}
                    type={"password"}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            size="lg"
            className="w-full"
            type="submit"
            disabled={isLoadingSubmit}
          >
            {isLoadingSubmit && (
              <LoaderIcon className="animate mr-2 h-4 w-4 animate-spin" />
            )}
            Continue
          </Button>

          <ErrorBlock message={errors.root?.apiError.message} />

          <Button
            variant="link"
            className="mt-5 h-auto p-0 font-normal"
            asChild
          >
            <Link href="/forgot-password">Forgot password?</Link>
          </Button>

          <div className="flex justify-center gap-x-1 text-sm">
            <p>Don&apos;t have an account?</p>

            <Button variant="link" className="h-auto p-0 font-normal" asChild>
              <Link href="/signup">Sign up here</Link>
            </Button>
          </div>
        </form>
      </Form>

      <Footer />
    </>
  );
};

export default Page;
