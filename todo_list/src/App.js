import React,{useState,useEffect} from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [count, setCount ]=useState(1);
  const [todoEditing, setTodoEdit ]=useState(0);
  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

useEffect(() => {
    if(todos.length > 0) {
        const json = JSON.stringify(todos);
        localStorage.setItem("todos", json);
    }
  }, [todos]);
  
  function handleUpdate(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = document.getElementById(id).value;
        }
        return todo;
      });
      setTodos(updatedTodos);
      setTodoEdit(null);
    }

  function handleSubmit(e) {
    e.preventDefault();
    
    let todo = document.getElementById('todoAdd').value
    setCount(count+1);
    const newTodo = {
      id: count,
      text: todo.trim(),
      completed: false,
    };
    if (newTodo.text.length > 0 ) {
        setTodos([...todos].concat(newTodo));
        
    } else {

        alert("Enter Valid Task");
    }
    document.getElementById('todoAdd').value = ""
  }
function handleDelete(id)
{
  let updatedTodos=[...todos].filter((todo)=>todo.id!==id);
  setTodos(updatedTodos)  
}

function toggleComplete(id) {
        let updatedTodos = [...todos].map((todo) => {
          if (todo.id === id) {
            todo.completed = !todo.completed;
          }
          return todo;
        });
        setTodos(updatedTodos);
}


    return (
      <div id="todo-list">
        <h1>Todo List</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id = 'todoAdd'
            />
            <button type="submit">Add Todo</button>
        </form>
        {todos.map((todo) => 
        <div>
            <ul style={{listStyle:'none'}}className="todo" key={todo.id}>
                <li>
                    <input type="checkbox" onChange={() => toggleComplete(todo.id)}/>
                    {todo.id!==todoEditing?(<>{todo.id}.    {todo.text}</>):(<input type="text" id={todo.id} defaultValue={todo.text}/>) }
                    {todo.id!==todoEditing?(<button style={{marginLeft:'15px',marginRight:'10px'}} onClick={()=>setTodoEdit(todo.id)}>Edit</button>):(<button style={{marginLeft:'10px',marginRight:'10px'}} onClick={()=>handleUpdate(todo.id)}>Save Changes</button>) }
                    
                    <button style={{marginLeft:'10px'}} onClick={()=>handleDelete(todo.id)}>Delete</button>
                </li>
            </ul>
        </div>)}
        </div>
  );
};

export default App;