"use client";

import { Button } from "@mui/material";
import { signOut } from "next-auth/react";

export default function BtnLogout() {
  return (
    <Button onClick={() => signOut()} variant="contained">
      Logout
    </Button>
  );
}
