import { Day } from "../shared/day.enum";

export interface Task {
  _id?: string;
  day: Day;
  description: string;
  completed?: boolean;
}
