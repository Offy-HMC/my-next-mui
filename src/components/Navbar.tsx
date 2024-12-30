import { stringAvatar } from "@/utils/utilFnc";
import { AppBar, Toolbar, Box, Stack, Avatar } from "@mui/material";

interface NavbarProps {
  username: string | null | undefined;
}

export default function Navbar({ username }: NavbarProps) {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        // boxShadow: "none",
      }}
    >
      <Toolbar>
        <Stack
          direction={"row"}
          flexGrow={1}
          justifyContent={"flex-end"}
          alignItems={"center"}
        >
          <Avatar
            alt={username || ""}
            {...stringAvatar(username || "unknown", 32)}
          />
          <Box
            ml={1.5}
            color={"var(--foreground)"}
            fontSize={18}
            fontWeight={"medium"}
          >
            {username}
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
