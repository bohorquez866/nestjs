import { Injectable } from "@nestjs/common";
import { Tasks, TaskStatus } from "./task.model";
import { v4 as uuidGenerate } from "uuid";
import { CreateTaskDTO } from "./DTO/create-task.dto";

@Injectable()
export class TasksService {
  private tasks: Tasks[] = [];
  getTasks() {
    return this.tasks;
  }

  getTaskById(id: string) {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDTO) {
    const { title, description } = createTaskDto;
    const task: Tasks = {
      id: uuidGenerate(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}
