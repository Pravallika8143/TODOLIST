import React from 'react'
import { useState } from "react"
import { useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from '../../services/todoApi'

function Todolist() {
    const {data:todos=[],refetch}=useGetTodosQuery();
    const [addTodo]= useAddTodoMutation();
    const [updateTodo]= useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();
    const [title,setTitle] = useState("");
    const [editId,setEditId] = useState(null);
    const handleAddOrUpdate = async()=>{
        if(!title.trim()) return;
        if(editId){
            await updateTodo({id:editId,title:title,status:false});
            setEditId(null);
        }else{
            await addTodo({title,status:false});
        }
        setTitle("");
        refetch()
    }

    const handleDelete = async(id) => {
        await deleteTodo(id);
        refetch();
    }

    const handleEditClick =(todo)=>{
        setEditId(todo._id);
        setTitle(todo.title);
        refetch();
    }

  return (
    <div className="container mt-5">
      <div className="card-body text-center">
        <h3>Todolist</h3>
        <div>
          <input type="text" value={title} className="me-2" onChange={(e)=>setTitle(e.target.value)} placeholder="Enter Todo"/>
          <button type="submit" onClick={handleAddOrUpdate}>{editId?"Update":"Add"}</button><br/><br/>
        </div>
        <ul className="list-group">
         {
            todos.map((todo)=>(
                <li className =" list-group-item d-flex justify-content-between align-items-center">
                    <span>{todo.title}</span>
                    <div>
                        <button className="me-2" onClick={()=>handleEditClick(todo)}>Edit</button>
                        <button className="me-2" onClick={()=>handleDelete(todo._id)}>Delete</button>
                    </div>
                </li>
            ))
         }
      </ul>
    </div>
    </div>
  )
}

export default Todolist