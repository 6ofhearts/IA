import {useState} from "react";
import TaskForm from "./TaskForm";

const TaskView = props =>{

    const [task, setTask] = useState(props.task);
    const [isEdit, setIsEdit] = useState(false);

  const save = content =>{

      let body = {
          content:content,
      }

      fetch('http://localhost:3306/db/api/task'+task.id, {
          method: 'PUT',
          body: JSON.stringify(body),
      }).then(response => response.json()).then(remoteData=>{
          setTask(remoteData.data)
          setIsEdit(false)
      }).catch(err => console.error('ERROR', err))
      //setList(tmp)
  }

    const handleCheck = () =>{

        let body = {
            done: !task.done
        }

        fetch('http://localhost:3306/db/api/task'+task.id, {
            method: 'PUT',
            body: JSON.stringify(body),
        }).then(response => response.json()).then(remoteData=>{
            setTask(remoteData.data)
        }).catch(err => console.error('ERROR', err))
    }



    if(isEdit) return <div className={'taskView'}>
    <TaskForm onSave ={(content)=>save(content)} onCancel={()=>setIsEdit(false)} task={task}/>
    </div>

    return <div className={'taskView'}>
        <div className={'flex-row'}>
            <input type={'checkbox'} defaultChecked={task.done} onChange={e=> handleCheck()}/>
            <p>{task.content}</p>
        </div>
        <div className={'flex-row'}>
            <button onClick={()=>props.onDelete()}>Delete</button>
            <button onClick={()=> setIsEdit(true)}>Edit</button>
        </div>

    </div>
}

export default TaskView;