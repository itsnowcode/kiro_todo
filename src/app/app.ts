import { Component } from '@angular/core';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoFormComponent, TodoListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'TODO App';

  constructor(private todoService: TodoService) {}
}
