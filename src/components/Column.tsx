import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import { Box, Typography } from "@mui/material";
import { ColumnType, TaskType } from "@/schemas/kanbanboard";

export default function Column({
  column,
  tasks,
}: {
  column: ColumnType;
  tasks: TaskType[];
}) {
  return (
    <Box
      sx={{
        background: "#f4f5f7",
        borderRadius: "8px",
        padding: "8px",
        width: "250px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: "8px" }}>
        {column.title}
      </Typography>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              background: "#ffffff",
              borderRadius: "4px",
              padding: "8px",
              minHeight: "100px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
            }}
          >
            {tasks.map((task: TaskType, index: number) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Box>
  );
}
