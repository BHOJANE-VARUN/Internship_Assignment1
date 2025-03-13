import { useState } from "react";
import { task } from "../constants/Types";
import { BASE_URL } from "../constants/URL";
import axios from "axios";

// {
//   "title": "string",
//   "description": "string"
// }
type CompProps = {
  setTasks: React.Dispatch<React.SetStateAction<task[]>>;
  setisFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isFormOpen: boolean;
};

function Form({ setTasks, setisFormOpen, isFormOpen }: CompProps) {
  
  const addTodo = async (data: task): Promise<any> => {
    try {
      console.log(JSON.stringify(data));
      await axios.post("https://training-backend-api.onrender.com/todos",JSON.stringify(data),{
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleClose = (): void => {
    setisFormOpen(!isFormOpen);
  };

  const handleSubmit = async () => {
    if (title.trim() === "" || description.trim() === "") return;
    
    const newTask: task = {
      title,
      description,
      completed: false,
    };
    //console.log(newTask);
    await addTodo(newTask);

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTitle("");
    setDescription("");
    setisFormOpen(false);
  };

  return (
    <div className="w-[397px] h-[370px] border-2 border-gray-50 py-3 absolute -left-[1px] bottom-0 z-20 flex flex-col bg-white rounded-xl justify-between items-center">
      <div className="w-full border-0 px-4 flex flex-col space-y-4">
        <div className="w-full h-fit flex justify-between items-center">
          <p className="font-medium text-balance">New Task</p>
          <div onClick={handleClose} className="cursor-pointer w-fit h-fit p-1 rounded-full bg-gray-200">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.26665 9.66668L0.333313 8.73334L4.06665 5.00001L0.333313 1.26668L1.26665 0.333344L4.99998 4.06668L8.73331 0.333344L9.66665 1.26668L5.93331 5.00001L9.66665 8.73334L8.73331 9.66668L4.99998 5.93334L1.26665 9.66668Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
        <label className="font-semibold text-sm text-gray-600">
          <p>Title</p>
          <input 
          required
            className="border-2 rounded-sm border-gray-300 w-full h-[48px] font-semibold text-base p-3"
            type="text"
            name="title"
            id="title"
            placeholder="Enter title of your task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="font-semibold text-sm text-gray-600">
          <p>Description</p>
          <textarea
          required
            className="resize-none border-2 w-full h-[100px] font-semibold text-base p-2 border-gray-300 rounded"
            name="description"
            id="description"
            placeholder="Enter the description of your task"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
      </div>
      <div className="w-fit h-fit bg-white text-[#FFFCFC] font-bold">
        <button
          className="cursor-pointer h-[48px] w-[360px] mx-auto bg-[#80BBE6] text-base font-semibold rounded-sm"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Form;
