import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo, TodoState } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private initialState: TodoState = {
    todos: [],
    nextId: 1
  };

  private stateSubject = new BehaviorSubject<TodoState>(this.initialState);
  public state$: Observable<TodoState> = this.stateSubject.asObservable();

  constructor() { }

  // TODO: Implement CRUD operations in next task
}