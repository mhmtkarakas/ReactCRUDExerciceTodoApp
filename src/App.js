import React, { useState } from "react";

function App() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    //
    if (todoText === "") {
      alert("Input can't be empty");
      return;
    }
    const newTodo = {
      id: new Date().getTime(),
      title: todoText,
      date: new Date(),
      hasDone: false,
    };
    setTodos([...todos, newTodo]);
    setTodoText("");
  };
  // Deleted Todo
  const deletedTodo = (id) => {
    const filteredTodos = todos.filter(
      (item) => item.id !== id
    );
    setTodos(filteredTodos);
  }
  // Change hasDone 
  const changeHasDone = (item) =>{
     console.log(item);
     let tempTodos = [];
     todos.map((i,index)=>{
      if(i.id  === item.id){
       let updatedTodo = {
             ...item,
             hasDone: !item.hasDone
       }
       tempTodos.push(updatedTodo);
      }else{
       tempTodos.push(i);
      }
     })
    //  for(let i = 0; i < todos.length; i++){
    //   if(todos[i].id===todo.id){
    //      let updatedTodo ={
    //       ...todo,
    //       hasDone: !todo.hasDone
    //      }
    //      tempTodos.push(updatedTodo);
    //   }else{
    //      tempTodos.push(todos[i])
    //   }
    //  }
     setTodos(tempTodos);
  }

  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            value={todoText}
            onChange={(event) => setTodoText(event.target.value)}
            type="text"
            className="form-control"
            placeholder="Please Enter"
          />
          <button className="btn btn-primary w-25" type="submit">
            ADD
          </button>
        </div>
      </form>
      <div className="container">
        {todos.length === 0 ? (
          <p>You don't have any todos yet</p>
        ) : (
          <div>
            {todos.map((todo, index) => (
              <div
                key={index}
                className="d-flex justify-content-between align-items-center"
              >
                <div style={{ borderBottom: "1px solid gray" }}>
                  <h1
                    style={{
                      textDecoration:
                        todo.hasDone === true ? "line-through" : "none",
                    }}
                  >
                    {todo.title}{" "}
                  </h1>
                  <small>{new Date(todo.date).toLocaleString()}</small>
                </div>
                <div>
                  <button
                    onClick={() =>{deletedTodo(todo.id)}}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                  <button className="btn btn-sm btn-secondary">Edit</button>
                  <button onClick = {()=>{changeHasDone(todo)}}className="btn btn-sm btn-success">
                    {todo.hasDone === true ? "Done" : "Undone"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
