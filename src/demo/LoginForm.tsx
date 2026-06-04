import { useForm } from "react-hook-form";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { PasswordInput } from "@/components/Input/PasswordInput";
import { UserIcon } from "@/components/icons/UserIcon";

interface LoginValues {
  username: string;
  password: string;
}

/**
 * Demo: React Hook Form driving the Button + Input + PasswordInput.
 * Because the inputs forward refs and spread native props, `{...register(...)}`
 * wires validation, value tracking and blur with no controlled state here.
 */
export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<LoginValues>({
    defaultValues: { username: "", password: "" },
    mode: "onTouched",
  });

  async function onSubmit(values: LoginValues) {
    // pretend to authenticate
    await new Promise((resolve) => setTimeout(resolve, 900));
    console.log("login", values);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      style={{ display: "flex", flexDirection: "column", gap: 16 }}
    >
      <Input
        label="Usuario"
        placeholder="nombre_de_usuario"
        autoComplete="username"
        leading={<UserIcon size={18} />}
        error={errors.username?.message}
        {...register("username", {
          required: "Ingresá tu usuario",
          minLength: { value: 3, message: "Mínimo 3 caracteres" },
        })}
      />

      <PasswordInput
        label="Contraseña"
        placeholder="Mínimo 8 caracteres"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register("password", {
          required: "Ingresá tu contraseña",
          minLength: { value: 8, message: "La contraseña es muy corta" },
        })}
      />

      <Button type="submit" isLoading={isSubmitting} style={{ marginTop: 8 }}>
        {isSubmitSuccessful ? "¡LISTO!" : "INGRESAR"}
      </Button>
    </form>
  );
}
