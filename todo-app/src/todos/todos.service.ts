import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
  todos: Todo[] = [
    {
      id: 1,
      title: 'todos app',
      description: 'Create NestJS todos app',
      done: false,
    },
    {
      id: 2,
      title: 'read',
      description: 'Read SOLID',
      done: true,
    },
    {
      id: 3,
      title: 'lunch',
      description: 'Lunch with Delphine',
      done: true,
    },
  ];

  findOne(id: string) {
    return this.todos.find((todo) => todo.id === Number(id));
  }

  findAll(): Todo[] {
    return this.todos;
  }

  create(todo: CreateTodoDto) {
    // we have a CreateTodoDto DTO and a Todo interface with the same type shape
    this.todos = [...this.todos, todo]; // as Todo
  }

  update(id: string, todo: Todo) {
    // retrieve the todo to update
    const newTodo = this.todos.find((todo) => todo.id === +id);
    if (!newTodo) {
      return new NotFoundException('Todo not found.');
    }
    // apply to granulary update a single property modifications
    if (todo.title) {
      newTodo.title = todo.title;
    }
    if (todo.description) {
      newTodo.description = todo.description;
    }
    // we use hasOwnProperty because 'done' is a boolean which we don't want
    // which we do not wish to be evaluated by the if statement.
    if (todo.hasOwnProperty('done')) {
      newTodo.done = todo.done;
    }
    const updatedTodos = this.todos.map((todo) =>
      todo.id !== +id ? todo : newTodo,
    );
    this.todos = [...updatedTodos];
    return { updatedTodo: 1, todo: newTodo };
  }

  delete(id: string) {
    const todosInitialCount = this.todos.length;
    this.todos = [...this.todos.filter((todo) => todo.id !== +id)];
    if (this.todos.length < todosInitialCount) {
      return { deletedTodos: 1, nbTodos: this.todos.length };
    } else {
      return { deletedTodos: 0, nbTodos: todosInitialCount };
    }
  }
}
