import {useEffect, useState} from "react";
import TaskView from "./TaskView";
import TaskForm from "./TaskForm";

const List = props =>{

   const [list, setList] = useState ([]);

  useEffect(()=>{
      fetch('http://localhost:3000/api/task', {
          method: 'GET'
      }).then(response => response.json()).then(remoteData=>{
          setList(remoteData.data)
      }).catch(err => console.error('ERROR', err))
   //   setList([
    //      {id:1, content: 'Test1', done: false},
     //     {id:2, content: 'Test2', done: false},
      //    {id:3, content: 'Test3', done: false},
      //    {id:4, content: 'Test4', done: true},
      //    {id:5, content: 'Test5', done: false},
    //  ])
  },[])

    const handleDelete = (key) => {

        fetch('http://localhost:3306/db/api/task' + list[key].id, {
            method: 'DELETE',
        }).then(response => response.json()).then(remoteData=>{
            let tmp = Array.from(list);
            tmp.slice(key, 1)
            setList(tmp)
        }).catch(err => console.error('ERROR', err))

    }

    const save = (content) => {
        let tmp = Array.from(list);
        let fd = new FormData();

        fd.append('content', content);

        fetch('http://localhost:3306/db/api/task', {
            method: 'POST',
            body: fd,
        }).then(response => response.json()).then(remoteData=>{
            let tmp = Array.from(list);
            tmp.push(remoteData.data())
            setList(tmp)
        }).catch(err => console.error('ERROR', err))
            //setList(tmp)
    }

    //  console.log(list)

    return <div className={'list'}>
        <TaskForm onSave={(content) => save(content)}/>
        {list.map((item, key) => {
            return < TaskView key={item.id} task={item} onDelete={ ()=>handleDelete(key)}/>
        })}
    </div>
}

export default  List;