"use client";

import { lusitana } from "@/config/fonts";
import {
  KeyRoundIcon,
  AtSignIcon,
  ArrowRightIcon,
  CircleAlertIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authenticate } from "@/lib/actions";
import { useSearchParams } from "next/navigation";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";

interface LoginInputs {
  email: string;
  password: string;
}

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [errorMessage, setErrorMessage] = useState("");

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginInputs>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setErrorMessage("");
    const resp = await authenticate(data);

    if (resp?.error) {
      setErrorMessage(resp.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <Controller
              control={control}
              name="email"
              rules={{
                required: {
                  value: true,
                  message: `Email is required`,
                },
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: `Invalid email address`,
                },
              }}
              render={({ field }) => (
                <div className="relative">
                  <Input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="email"
                    placeholder="Enter your email address"
                    {...field}
                  />
                  <AtSignIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              )}
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <Controller
              control={control}
              name="password"
              rules={{
                required: {
                  value: true,
                  message: `Password is required`,
                },
                minLength: {
                  value: 6,
                  message: `Password must be at least 6 characters`,
                },
              }}
              render={({ field }) => (
                <div className="relative">
                  <Input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    {...field}
                  />
                  <KeyRoundIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              )}
            />
            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <Button className="mt-4 w-full bg-blue-500 text-white hover:bg-blue-400">
          <ArrowRightIcon /> Log in
        </Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <CircleAlertIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
