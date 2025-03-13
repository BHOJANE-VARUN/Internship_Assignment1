import { useState } from "react";
import TaskCard from "./TaskCard";
import { task } from "../constants/Types";

interface CompType{
  tasks:task[],
  setTasks:React.Dispatch<React.SetStateAction<task[]>>,
}


function Completed({tasks,setTasks}:CompType){
  if(tasks.length==0)
  {
    return <div></div>
  }
  const [Close, setClose]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(false);
  return (
    <div className="space-y-2">
      <div className="w-full h-fit flex justify-between items-center font-medium">
        <p>Completed</p>
        {Close? <svg
          onClick={()=> setClose(!Close)}
          width="7"
          height="11"
          viewBox="0 0 7 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.83331 5.5L1.83331 0.25L0.666646 1.475L4.49998 5.5L0.666646 9.525L1.83331 10.75L6.83331 5.5Z"
            fill="black"
          />
        </svg>  :
          <svg
          onClick={()=> setClose(!Close)}
          width="11"
          height="7"
          viewBox="0 0 11 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.5 6.83332L0.25 1.83332L1.475 0.666656L5.5 4.49999L9.525 0.666656L10.75 1.83332L5.5 6.83332Z"
            fill="black"
          />
        </svg> }
      </div>
      {!Close && tasks.map((t:task,index:number,arr:task[])=> t.completed &&  <TaskCard t={t} id={t.id?t.id:0} setTasks={setTasks} tasks={arr}/>)}
    </div>
  );
}

export default Completed;
