import { Controller, Get, Post } from "@nestjs/common";
import { Body, Delete, Param, Patch, Query } from "@nestjs/common/decorators";
import { CreateTaskDTO } from "./DTO/create-task.dto";
import { GetTasksFilterDTO } from "./DTO/get-tasks-filter.dto";
import { Tasks } from "./task.model";
import { TasksService } from "./tasks.service";

@Controller("/tasks")
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDTO: GetTasksFilterDTO): Tasks[] {
    if (Object.keys(GetTasksFilterDTO).length) {
      return this.taskService.getTasksWithFilters(filterDTO);
    }
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

  @Delete()
  deleteTask(@Param("id") id) {
    return this.taskService.deleteTask(id);
  }

  @Patch("/:id/status")
  updateTaskStatus(@Param("id") id, @Body("status") status): Tasks {
    return this.taskService.updateTaskStatus(status, id);
  }
}
