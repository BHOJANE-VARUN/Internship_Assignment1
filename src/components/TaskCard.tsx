import React from "react";
import { task } from "../constants/Types";
import axios from "axios";

function TaskCard({t,id,setTasks,tasks}:{t:task,id:number,setTasks:React.Dispatch<React.SetStateAction<task[]>>,tasks:task[]}) {
  //console.log(tasks);
  const putCompleted = async (data: task): Promise<any> => {
    try {
      await axios.put(`https://training-backend-api.onrender.com/todos/${data.id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    catch (error) {
      console.error("Error updating todo:", error);
    }
  };
  const handleComplete = ():void =>{
    
    const Arr = [...tasks]; 
    console.log(Arr); 
    Arr.map((t:task,index:number)=>{
        if(t.id === id)
        {
          t.completed = !t.completed;
          putCompleted(t);
        }
      }
    );
    console.log(Arr); 
   // console.log(id);
   // Arr[id].completed = !Arr[id].completed;
    setTasks(Arr);
  }
  
  return (
    <div className="w-[360px] mx-auto max-h-full  min-h-[80px] flex">
      <div className=" w-[8px]  bg-[#80BBE6]  rounded-l-md"></div>
      <div className="flex p-5 justify-between items-center min-h-[80px] max-h-fit w-[99%] border-r-2 border-y-2 rounded-r-md border-gray-200">
        <div className="h-fit">
          <h1 className="font-medium text-md">{t.title}</h1>
          <p className="text-[#8B8B8B] text-md font-medium">{t.description}</p>
        </div>
        <label onClick={handleComplete} className="flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" checked={t.completed} className="hidden peer" />
          <div className="w-6 h-6 flex items-center justify-center rounded-full border-2 bg-gray-100 border-gray-200 text-gray-100 peer-checked:bg-white peer-checked:text-blue-500  peer-checked:border-blue-500 transition-all">
            <svg
              className="w-6 h-6  peer-checked:block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 21"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9 16.17l-4.88-4.88a1 1 0 0 1 1.41-1.41L9 13.34l8.47-8.47a1 1 0 1 1 1.41 1.41L9 16.17z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </label>
      </div>
    </div>
  );
}

export default TaskCard;
