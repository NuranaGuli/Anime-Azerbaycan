"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { LogIn, Eye, EyeOff } from "lucide-react";
import { loginSchema, type LoginFormValues } from "@/lib/schemas/authSchemas";
import { useLogin } from "@/hooks/useAuth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function LoginForm() {
  const router = useRouter();
  const login = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const { onBlur: rhfPasswordBlur, ...passwordField } = register("password");

  const onSubmit = (values: LoginFormValues) => {
    login.mutate(values, {
      onSuccess: () => router.push("/profile"),
      onError: (error) => {
        if (error.fieldErrors) {
          Object.entries(error.fieldErrors).forEach(([field, message]) => {
            setError(field as keyof LoginFormValues, { message });
          });
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4" noValidate>
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        label="Şifrə"
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        error={errors.password?.message}
        onBlur={(event) => {
          rhfPasswordBlur(event);
        }}
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Şifrəni gizlət" : "Şifrəni göstər"}
            className="flex h-8 w-8 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-hover hover:text-text-primary"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
        {...passwordField}
      />
      <Button type="submit" size="lg" className="mt-2 w-full" isLoading={login.isPending}>
        <LogIn className="h-4 w-4" />
        Daxil ol
      </Button>
    </form>
  );
}
