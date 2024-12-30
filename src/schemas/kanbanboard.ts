export type TaskType = {
  id: string;
  content: string;
};

export type Task = {
  [key: string]: TaskType;
};

export type ColumnType = {
  id: string;
  title: string;
  taskIds: string[];
};

export type Columns = {
  [key: string]: ColumnType;
};
