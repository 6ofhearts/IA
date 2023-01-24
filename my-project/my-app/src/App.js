import logo from './logo.svg';
import './App.css';
import HelloComponent from "./component/hello";
import List from "./component/List";

function App() {
  return (
    <div className="App">
        <h1>ToDoList</h1>
        <div><List/></div>
    </div>
  );
}

export default App;
