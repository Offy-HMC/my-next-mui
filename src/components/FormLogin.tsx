"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TFormLoginSchema, IFormLogin } from "@/schemas/login";
import { signIn } from "next-auth/react";
import { PersonRounded, LockRounded } from "@mui/icons-material";
import { Button, InputAdornment, Stack, TextField } from "@mui/material";

export default function FormLogin() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<TFormLoginSchema>({
    resolver: zodResolver(IFormLogin),
    mode: "all",
  });

  const onSubmit = async (data: TFormLoginSchema) => {
    try {
      const response = await signIn("credentials", {
        redirect: false,
        ...data,
      });

      if (!response?.error) {
        router.push("/dashboard"); // Replace with your desired route
      } else {
        console.error("something wrong", response.error);

        return false;
      }
    } catch (error) {
      console.error(
        `Login failed. Please check your credentials and try again. error: (${
          error as Error
        }).message`
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
      <Stack width={1} spacing={2}>
        <TextField
          type="text"
          {...register("username")}
          label="username"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonRounded />
                </InputAdornment>
              ),
            },
          }}
          error={!!errors.username}
          helperText={errors.username && errors.username.message}
        />
        <TextField
          type="password"
          {...register("password")}
          label="password"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LockRounded />
                </InputAdornment>
              ),
            },
          }}
          error={!!errors.password}
          helperText={errors.password && errors.password.message}
        />
      </Stack>
      {/* <Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          // border={1}
          boxShadow={2}
          borderRadius={2.5}
          py={1.5}
          px={2}
        >
          <LockRounded />
          <TextField
            type="password"
            {...register("password")}
            label="password"
          />
        </Stack>
        {errors.password && (
          <Typography color="error.main" mt={1} variant="body1" gutterBottom>
            {errors.password.message}
          </Typography>
        )}
      </Stack>
      {errorMessage && (
        <Typography color="error.main" variant="body1" gutterBottom>
          {errorMessage}
        </Typography>
      )} */}

      <Stack direction="row" justifyContent={"center"} mb={2}>
        <Button
          type="submit"
          disabled={isSubmitting || !isValid}
          variant="contained"
        >
          {isSubmitting ? "กำลังเข้าสู่ระบบ.." : "เข้าสู่ระบบ"}
        </Button>
      </Stack>
    </form>
  );
}
