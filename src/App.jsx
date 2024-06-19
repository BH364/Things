import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true)
  useEffect(() => {
    let todoString = localStorage.getItem('todos');
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  const saveToLS = (updatedTodos) => {
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };
  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }
  const handleEdit = (e, id) => {
    let t = todos.find(i => i.id === id);
    setTodo(t.todo);
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleAdd = () => {
    let newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos);
    setTodo('');
    saveToLS(newTodos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-slate-100 min-h-[80vh] md:w-[35%]">
        <h1 className='font-bold text-center text-lg'>Things - The award-winning personal task manager</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <div className="flex">
            <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-slate-700 hover:bg-slate-950 p-3 py-1 text-white text-sm font-bold disabled:bg-slate-400 rounded-md mx-6'>Add</button>
          </div>
        </div>
        <input onChange={toggleFinished} type="checkbox" id='show' className='my-4' checked={showFinished} />
        <label htmlFor="show" className='mx-2'> Show Finished</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className='text-xl font-bold'>Your tasks</h2>
        <div className='todos'>
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className={"todo flex my-3 justify-between"}>
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-slate-700 hover:bg-slate-950 p-2 py-1 text-white text-sm font-bold rounded-md mx-1'>Edit</button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-slate-700 hover:bg-slate-950 p-2 py-1 text-white text-sm font-bold rounded-md mx-1'>Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  );
}

export default App;
