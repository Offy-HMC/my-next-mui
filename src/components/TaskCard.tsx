import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Card, CardContent, Typography } from "@mui/material";
import { TaskType } from "@/schemas/kanbanboard";

export default function TaskCard({
  task,
  index,
}: {
  task: TaskType;
  index: number;
}) {
  console.log(task.id, task.content);
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{ marginBottom: "8px", ...provided.draggableProps.style }}
        >
          <CardContent>
            <Typography>{task.content}</Typography>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
}
