import {useState} from "react";

const HelloComponent = props =>{
        const[name, setName] = useState(props.name)
    return <div>
        <h2>Hello, {name}!</h2>
        <input defaultValue ={name} onChange ={e => setName(e.target.value)}/>
    </div>

}

export default HelloComponent;