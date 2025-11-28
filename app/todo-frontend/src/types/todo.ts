export interface Todo {
  id: number;
  title: string;
  completed: boolean | number;
}

export interface TodoUpdate {
  title?: string;
  completed?: boolean | number;
}

