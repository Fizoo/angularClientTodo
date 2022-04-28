import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {delay, Observable, tap } from 'rxjs';


export interface ITodo {
  userId?: number;
  id: number;
  title: string;
  completed: boolean;
}

const url = 'https://jsonplaceholder.typicode.com/todos';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
 todos: ITodo[] =[]

  constructor(private http:HttpClient) {}

  deleteTodo(value:number):Observable<void>{
   return this.http.delete<void>(`${url}/${value}`)
 }

  addTodos(value:ITodo):Observable<ITodo>{
  return  this.http.post<ITodo>(url,value)
  }

  completeTodo(id:number):Observable<ITodo>{
    return this.http.put<ITodo>(`${url}/${id}`,{
      completed: true
    })
  }

 fetchTodo():Observable<ITodo[]>{
   return  this.http.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos?_limit=5').pipe(
     delay(500)
   )
  }
}
