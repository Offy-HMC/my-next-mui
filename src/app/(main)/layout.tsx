import { Box, Drawer } from "@mui/material";
import { auth } from "@/auth";
import Navbar from "@/components/Navbar";
import BtnLogout from "@/components/BtnLogout";

const drawerWidth = 250;

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const username =
    typeof session?.user?.username === "string" ? session?.user?.username : "";

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      {/* Left Side */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          boxShadow: 1,
          bgcolor: "background.paper",
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* <Sidebar /> */}
        <BtnLogout />
      </Drawer>

      {/* Right Side */}
      <Box
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Navbar username={username} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: "0 1.5rem 1.5rem 1.5rem",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
