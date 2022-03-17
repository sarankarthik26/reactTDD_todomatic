import { nanoid } from 'nanoid';
import { useState } from 'react';
import ListTodo from './components/ListTodo';
import TextField from './components/TextField';
import FilterButton from './components/filterButtons';

function App(props) {

  const [data, setData] = useState(props.data);
  const [filter,setFilter] = useState("All");

  const Filters = {
    All:()=>true,
    Completed:(task)=>task.completed,
    Todo: (task)=>!task.completed
  };

  const FilterNames = Object.keys(Filters);

  function handleFilter(filter_name){
    setFilter(filter_name);
  }

  const FilterButtons = FilterNames.map((task)=>
     <FilterButton name={task} key={task} currentFilter={filter} set_filter={handleFilter}/>
  );

  function addNote(newName){
    const newNote = {id:"todo-"+ nanoid(), name:newName, completed: false};
    setData([...data, newNote]);
    setTimeout(() => {
      alert("New note created")
    }, 100); 
  }

  function changeCompleted(id){
    const modTasks = data.map((dataItem)=>{
      if(dataItem.id==id){
        return {...dataItem,completed:!dataItem.completed};
      }
      return dataItem;
    });
    setData(modTasks);
  }

  function deleteNotes(id){
    const modTasks = data.filter((dataItem)=> dataItem.id!=id);
    setData(modTasks);
  }

  function modifyNote(id,value){
    const modTasks = data.map((dataItem)=>{
      if(dataItem.id==id){
        return {...dataItem,name:value};
      }
      return dataItem;
    });
    setData(modTasks);
  }

  const list = (data).filter(Filters[filter]).map((dataItem)=>{
  return (<ListTodo listItem={dataItem.name} key={dataItem.id} id={dataItem.id} completed={dataItem.completed} 
    toggleButton={changeCompleted} deleteNotes={deleteNotes} modifyNote={modifyNote} />)
  });

  let lengthText = list.length;
  if(lengthText==1){
    lengthText += " task available";
  }
  else{
    lengthText += " tasks available";
  }


  return (
    <>
    <h1 data-testid="Header">Todo_Matic</h1>
    <h2>Add a new note</h2>
    <TextField setData={addNote} />
    <div className="filterbutton btn-group">
    {FilterButtons}
    </div>
    <label htmlFor='list' data-testid="noOfTasks"> {lengthText} </label>
    <ul data-testid="list-todo" id="list">
      {list}
    </ul>
    </>
  );
}

export default App;
