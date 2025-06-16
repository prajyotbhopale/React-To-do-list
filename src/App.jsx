  import { useState, useEffect } from 'react'
  import "./index.css"
  import Navbar from './assets/components/navbar'
  import { v4 as uuidv4 } from 'uuid';
  import { BiSolidMessageSquareEdit } from "react-icons/bi";
  import { RiDeleteBack2Fill } from "react-icons/ri";



  function App() {

    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState([])
    const [placeholder, setPlaceholder] = useState("Enter todo");
    const [Input, setInput] = useState("")
    const [Edit, setEdit] = useState(false)
    const [current, setCurrent] = useState(null)
    const [showfinished, setshowFinished] = useState(true)

    useEffect(() => {
      const todoString = localStorage.getItem("todos");
      if (todoString) {
        const savedTodos = JSON.parse(todoString);
        setTodos(savedTodos);
      }
    }, []);



    const saveTols = (params) => {
      localStorage.setItem("todos", JSON.stringify(todos))
    }


    const handleAdd = () => {

      if (!todo || todo.trim() === "") {
        setPlaceholder("Please write something");
        return;
      }
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
      console.log(todos)
      setTodo("")
      saveTols()


    }
    // const handleEdit = (e, id) => {
    //   let t = todos.filter(i => i.id === id)
    //   setTodo(t[0].todo)

    //    const newTodos = todos.filter((index) => index.id!== id);
    //   setTodos(newTodos);

    // }

    const handleEdit = (id) => {
      const index = todos.findIndex(t => t.id === id);
      setInput(todos[index].todo);
      setEdit(true);
      setCurrent(index);
    };

    const handleDelete = (id) => {
      const newTodos = todos.filter((item) => item.id !== id);
      setTodos(newTodos);
      saveTols();
    };

    const handleUpdate = () => {
      if (Input.trim() === "") return;

      const updated = [...todos];
      updated[current].todo = Input;
      setTodos(updated);

      setEdit(false);
      setInput("");
      setCurrent(null);

      saveTols()
    };
    // const handleDelete = (del) => {
    //   const newTodos = todos.filter((_, index) => index !== del);
    //   setTodos(newTodos);
    //   saveTols()
    // };

    const handleChange = (e) => {
      setTodo(e.target.value)
    }


    const handleCheckbox = (id) => {
      const updatedTodos = todos.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      );
      setTodos(updatedTodos);
      saveTols()
    };

    const togglefinished = (e) => {

      setshowFinished(!showfinished)
    }
    return (
      <>
        <Navbar />
        <div className="bg-indigo-100 p-5 min-h-[91.8vh]">

      <div className="bg-violet-100 min-h-[80vh] w-[90vw] md:w-[60vw] lg:w-[40vw] xl:w-[30vw] m-auto rounded-2xl p-5">


          <h2 className="text-2xl font-bold text-center mb-4 text-violet-800">Todo List</h2>

          <div className="flex gap-2 mb-3">
            <input
              onChange={Edit ? (e) => setInput(e.target.value) : handleChange}
              value={Edit ? Input : todo}
              type="text"
              placeholder={placeholder}
              className="flex-1 border border-violet-1000 bg-white p-2 rounded"
            />
            <button
              onClick={Edit ? handleUpdate : handleAdd}
              disabled={Edit ? Input.trim() === "" : todo.trim() === ""}
              className={`bg-violet-500 text-white font-bold px-4 cursor-pointer rounded hover:bg-indigo-500 
              ${(Edit ? Input.trim() === "" : todo.trim() === "") ? 'opacity-50' : ''}`}
            >
              {Edit ? "Update" : "Add"}
            </button>
          </div>
          <div className='flex gap-3 text-gray-500 font-medium ml-1'>
            <input onChange={togglefinished} type="checkbox" checked={showfinished} />show Finished
          </div>
          <div className=' h-[1] my-2 bg-black opacity-20 mx-auto'></div>
          <h3 className="text-lg font-medium text-gray-700 mb-2 mt-2">Your todos</h3>
          {todos.length === 0 && <div className='text-violet-500 text-2xl m-3 font-medium'>No todos to display</div>}
          {todos
            .filter(item => showfinished || !item.isCompleted)
            .map((item) => (
              <div
                key={item.id}
                className="bg-white p-3  rounded flex justify-between items-center mb-3 shadow"
              >
                <div className='flex gap-3'>
                  <input
                    type="checkbox"
                    checked={item.isCompleted}
                    onChange={() => handleCheckbox(item.id)}
                  />
                  <div className={item.isCompleted ? "line-through text-gray-500" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                  >
                    <BiSolidMessageSquareEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                  >
                  <RiDeleteBack2Fill />
                  </button>
                </div>
              </div>
            ))}

        </div >
        </div>

      </>
    )
  }

  export default App
