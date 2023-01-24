import {useState} from "react";

const TaskForm = props => {
    const [content, setContent] = useState(props.task? props.task.content:'');

   const handleSave = () =>{
        props.onSave(content);
        setContent('');
   }

    return <div className={'flex-row mx-90 mb-10px'}>
    <input value={content} onChange={e => setContent(e.target.value)}/>
        {props.task && <button onClick={()=>props.onCancel()}>Cancel</button>}
        <button onClick={()=>handleSave()}>Save</button>
 </div>
}

export default TaskForm;