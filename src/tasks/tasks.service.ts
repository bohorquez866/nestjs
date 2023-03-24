import { Injectable } from "@nestjs/common";
import { Tasks, TaskStatus } from "./task.model";
import { v4 as uuidGenerate } from "uuid";
import { CreateTaskDTO } from "./DTO/create-task.dto";
import { GetTasksFilterDTO } from "./DTO/get-tasks-filter.dto";

@Injectable()
export class TasksService {
  private tasks: Tasks[] = [];

  getTasks() {
    return this.tasks;
  }

  getTaskById(id: string) {
    return this.tasks.find((task) => task.id === id);
  }

  getTasksWithFilters(tasksWithFilters: GetTasksFilterDTO) {
    const { status, search } = tasksWithFilters;
    let tasks = this.getTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (
          task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
          task.description
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
        ) {
          return true;
        }
      });
    }

    return tasks;
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

  deleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskStatus(status: TaskStatus, id: string) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
