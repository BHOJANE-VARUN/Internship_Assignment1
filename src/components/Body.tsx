import { useEffect, useState } from "react";

import Completed from "./Completed";
import Form from "./Form";
import TaskCard from "./TaskCard";
import axios from "axios";
import { BASE_URL } from "../constants/URL";
import { task } from "../constants/Types";
import UpdationForm from "./UpdationForm";

let sampleTask:task = {
  id:-1,
  title:"CIA",
  description:"3rd week of March",
  completed:true,
};
// 
//   {
//     "id": 0,
//     "title": "string",
//     "description": "string",
//     "completed": true,
//     "createdAt": "2025-03-06T08:24:51.181Z"
//   }

function Body() {
  const fetchTodo = async ()=>{
     const {data} = await axios.get(BASE_URL);
     setTasks(data);
     console.log(data);
  }
  const [isFormOpen, setisFormOpen]:[  boolean,
    React.Dispatch<React.SetStateAction<boolean>>] = useState(false);
   
    const [isUpdateOpen, setisUpdateOpen]:[task, React.Dispatch<React.SetStateAction<task>>]= useState(sampleTask);
    
  useEffect(()=>{
     fetchTodo();
  },[])
  const [Tasks,setTasks]:[task[],React.Dispatch<React.SetStateAction<task[]>>] = useState<task[]>([{
    id:1,
    title:"DWT writeup",
    description:"today is the last day",
    completed:false,
  },{
    id:2,
    title:"CIA",
    description:"3rd week of March",
    completed:true,
  }]);
let f:number =0
  return (
    <>
      <div className="bg-white  p-5 mx-auto rounded-xl shadow-2xl w-[400px] h-[99%] border-2 space-y-4 relative">
        {isFormOpen && <div className="absolute inset-0 bg-black opacity-20 z-10"></div> }
        <p className="font-medium text-2xl">Todo List</p>
        <div className=" flex flex-col items-start justify-start space-y-2 h-fit">
        { 
            Tasks.map((t:task,index:number,tasks:task[])=>{
              if(!t.completed)
              {
                f++;
                return <TaskCard t={t}  id={t.id?t.id:index} setisUpdateOpen={setisUpdateOpen} setTasks={setTasks} tasks={tasks}/>
              }
            })
          }
        </div>
        {!f && <div className="font-sm text-xl">No pending Tasks</div>}
        {Tasks.length-f>0 && <Completed setisUpdateOpen={setisUpdateOpen} tasks={Tasks} setTasks={setTasks}/>}
        {isUpdateOpen.id==-1 && isFormOpen  &&  <Form setTasks={setTasks} setisFormOpen = {setisFormOpen} isFormOpen={isFormOpen}/>}
        {!isFormOpen && isUpdateOpen.id!=-1 && <UpdationForm setTasks={setTasks} isUpdateOpen = {isUpdateOpen} setisUpdateOpen={setisUpdateOpen}/>}
        {!isFormOpen && isUpdateOpen.id==-1 && (
          <button onClick={()=> setisFormOpen(!isFormOpen)} className=" text-[#FFFCFC]  absolute bottom-4 cursor-pointer h-[48px] w-[360px]  mx-auto bg-[#80BBE6] text-base font-bold rounded-sm">
            Add Task
          </button>
        )}
      </div>
    </>
  );
}

export default Body;
