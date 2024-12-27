import { Container, Stack } from "@mui/material";
import Logo from "@/components/Logo";
import FormLogin from "@/components/FormLogin";

export default function LoginPage() {
  return (
    <Container maxWidth="xs">
      <Stack height="100vh" justifyContent={"center"}>
        <Stack
          alignItems={"center"}
          width={1}
          borderRadius={2}
          boxShadow={2}
          px={3}
          py={2}
        >
          <Logo size={250} image="logo" />
          <FormLogin />
        </Stack>
      </Stack>
    </Container>
  );
}
