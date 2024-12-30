import KanbanBoard from "@/components/KanbanBoard";
import { Stack, Typography } from "@mui/material";

export default function DashboardPage() {
  return (
    <Stack height={1}>
      <Typography>DashboardPage</Typography>
      <KanbanBoard />
    </Stack>
  );
}
