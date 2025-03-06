import { useState } from "react";

import Completed from "./Completed";
import Form from "./Form";
import TaskCard from "./TaskCard";

type task = {
  title:string,
  description:string,
  isCompleted:boolean,
}

function Body() {
  const [isFormOpen, setisFormOpen]:[  boolean,
    React.Dispatch<React.SetStateAction<boolean>>] = useState(false);
  const [Tasks,setTasks]:[task[],React.Dispatch<React.SetStateAction<task[]>>] = useState<task[]>([{
    title:"DWT writeup",
    description:"today is the last day",
    "isCompleted":false,
  },{
    title:"CIA",
    description:"3rd week of March",
    "isCompleted":true,
  }]);
  
let f:number =0
  return (
    <>
      <div className="bg-white  p-5 mx-auto rounded-xl shadow-2xl w-[400px] h-[99%] border-2 space-y-4 relative">
        {isFormOpen && <div className="absolute inset-0 bg-black opacity-20 z-10"></div> }
        <p className="font-medium text-2xl">Todo List</p>
        <div className=" flex flex-col items-start justify-start space-y-2">
        { 
            Tasks.map((t:task,index:number,tasks:task[])=>{
              if(!t.isCompleted)
              {
                f++;
                return <TaskCard t={t} id={index} setTasks={setTasks} tasks={tasks}/>
              }
            })
          }
        </div>
        {!f && <div className="font-sm text-xl">No pending Tasks</div>}
        {Tasks.length-f>0 && <Completed tasks={Tasks} setTasks={setTasks}/>}
        {isFormOpen && <Form setTasks={setTasks} setisFormOpen = {setisFormOpen} isFormOpen={isFormOpen}/>}
        {!isFormOpen && (
          <button onClick={()=> setisFormOpen(!isFormOpen)} className=" text-[#FFFCFC]  absolute bottom-4 cursor-pointer h-[48px] w-[360px]  mx-auto bg-[#80BBE6] text-base font-bold rounded-sm">
            Add Task
          </button>
        )}
      </div>
    </>
  );
}

export default Body;
