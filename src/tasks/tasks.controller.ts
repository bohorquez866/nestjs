import { Controller, Get, Post } from "@nestjs/common";
import { Body, Param } from "@nestjs/common/decorators";
import { CreateTaskDTO } from "./DTO/create-task.dto";
import { Tasks } from "./task.model";
import { TasksService } from "./tasks.service";

@Controller("/tasks")
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Tasks[] {
    return this.taskService.getTasks();
  }

  @Get(":id")
  getTaskById(@Param("id") id: string) {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDTO) {
    return this.taskService.createTask(createTaskDto);
  }
}
