import { stringAvatar } from "@/utils/utilFnc";
import { AppBar, Toolbar, Box, Stack, Avatar } from "@mui/material";

interface NavbarProps {
  username: string | null | undefined;
  name?: string | null;
}

export default function Navbar({ username, name }: NavbarProps) {
  const userName = name?.replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <Stack
          direction={"row"}
          flexGrow={1}
          justifyContent={"flex-end"}
          alignItems={"center"}
        >
          <Avatar alt={userName} {...stringAvatar(userName || "unknown", 32)} />
          <Box
            ml={1.5}
            color={"whitesmoke"}
            fontSize={18}
            fontWeight={"medium"}
          >
            {username} - {userName}
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
