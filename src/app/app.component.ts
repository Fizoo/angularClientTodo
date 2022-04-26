import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ClientService, ITodo } from './client.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularClient';

  todos: ITodo[] =[]

  todoTitle:string=''

  constructor(private client:ClientService) {
    client.fetchTodo().subscribe(data=> this.todos=data,
      error=> console.log(error.message))
  }

  addTodo() {
    if(!this.todoTitle.trim()){return}

    const newTodo:ITodo={
      title:this.todoTitle,
      completed:false,
      id:Date.now()
    }
    this.client.addTodos(newTodo).subscribe((el:ITodo)=>this.todos.push(el))
    this.todoTitle=''
  }

  uploadTodo() {
    this.client.fetchTodo().subscribe(data=> this.todos=data)
  }

  deleteTodo(id:number ) {
    this.client.deleteTodo(id).subscribe(()=>{
      this.todos=this.todos.filter(todo => id!==todo?.id)
    })
  }

  completeTodo(id: number) {
    this.client.completeTodo(id).subscribe(todo=>{
        // @ts-ignore
      this.todos.find(t => t.id === todo.id).completed = true
    })
  }
}

