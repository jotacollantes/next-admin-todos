'use client';

import { Todo } from "@prisma/client"
import { TodoItem } from "./TodoItem";

// import * as todosApi from '@/todos/helpers/todos';
import { useRouter } from "next/navigation";

import { toggleTodo } from '../actions/todo-actions';


interface Props {
  todos?: Todo[];
}


export const TodosGrid = ({ todos = [] }: Props) => {

  const router = useRouter();

  

  //! Esta es la funcion en caso de que se ejecute en modo Server Component => Client Component
  // const toggleTodo = async(id: string, complete: boolean) => {
  //   const updatedTodo = await todosApi.updateTodo( id, complete );
  //   console.log({updatedTodo});
  //   router.refresh();
  // }


  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {
        todos.map( todo => (
          //!Enviamos la funcion toogleTodo que es un action directamente como prop
          <TodoItem key={ todo.id } todo={ todo } toggleTodo={ toggleTodo }  />
        ))
      }
    </div>
  )
}
