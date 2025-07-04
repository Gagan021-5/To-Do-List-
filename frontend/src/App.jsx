import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";

function App() {
  const [input, setinput] = useState(""); //for input
  const [task, settask] = useState([]); //for assigning tasks
  const { id } = useParams();

  useEffect(() => {
    const fetchdata = async () => {
      let response = await axios.get("http://localhost:4000/my/todo");
       
      let items = response.data;
  
      
      settask(items);
    };
    fetchdata();
  }, []);

  const additems = async () => {
    if(!input) return ;
    const addresponse = await axios.post("http://localhost:4000/todo/add", {
      tasktodo: input,
    });

    settask((prev)=>[...prev, {tasktodo:input}]);
    setinput("");
  };

const deletitems = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:4000/todo/delete/${id}`
    );
    if (response.status === 200) {
      settask((prev) => prev.filter((todos) => todos.id !== id));
    } else {
      alert('Failed to delete task');
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    
    alert('Error deleting task, please try again later.');
  }
};


  return (
    <>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
        <div className="max-w-lg w-full bg-gray-800 p-6 rounded-2xl shadow-xl">
          <h1 className="text-3xl font-extrabold text-center text-blue-400 mb-8">
            Todo App
          </h1>

          <div className="mb-6 flex">
            <input
              onChange={(e) => {
                e.preventDefault();
                setinput(e.target.value);
              }}
              type="text"
              className="w-full px-5 py-3 border-2 border-gray-600 rounded-l-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a new task"
            />
            <button
              onClick={additems}
              className="px-6 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition duration-200"
            >
              Add
            </button>
          </div>

          {/* Todo List */}
          <ul className="space-y-6">
            {/* Todo Item */}
            {task.length>0 ? (
              task.map((val) => {
                console.log(val.id);
                
                
                return (
                  <div
                    key={val.id}
                    className="flex justify-between items-center p-5 border-2 border-gray-600 rounded-xl bg-gray-700 shadow-md hover:shadow-lg transition duration-200"
                  >
                    <span className="text-white text-lg">{val.tasktodo}</span>{" "}
                     
                      
                    <button className="ml-4 text-red-500 hover:text-red-600 transition duration-200">
                      <MdDeleteForever  onClick={()=> deletitems(val.id)} className="size-7" />
                    </button>
                  </div>
                );
              })
            ) : (
              <p className="text-white text-center">Please add a Task</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
