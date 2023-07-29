import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todos') // localhost:3000/todos
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  // 'id' would mean /todos/id
  // ':id' means id is dynamic
  // /todos/0, /todos/1, /todos/2, ...
  @Get(':id')
  // @Param('id') allows us to retrieve our param value
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(id);
  }

  // @Get for …/todos GET request
  @Get()
  findAll(): Todo[] {
    return this.todosService.findAll();
  }

  // @Post for …/todos POST request
  @Post()
  // @Body allows us to retrieve the body of the POST request
  // The CreateTodoDto DTO specify the expected shape of @Body
  createTodo(@Body() newTodo: CreateTodoDto) {
    // We pass this body to our service
    this.todosService.create(newTodo);
  }

  @Patch(':id')
  updateTodo(@Param('id') id: string, @Body() todo: CreateTodoDto) {
    return this.todosService.update(id, todo);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.todosService.delete(id);
  }
}
