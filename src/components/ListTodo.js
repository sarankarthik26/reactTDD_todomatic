import { useState } from "react";

const ListTodo = (props) => {

    const [isEditing,setIsEditing] = useState(false);
    const [updatedNote, setUpdatedNote] = useState("");

    function handleNoteEdit(e){
        e.preventDefault();
        setIsEditing(true);
    };

    function handleCancel(e){
        e.preventDefault();
        setIsEditing(false);
        setUpdatedNote("");
    };

    function handleEdit(e){
        setUpdatedNote(e.target.value);
    }

    function update(){
        if(updatedNote==""){
            alert("Type something ... ");
        }
        else{
        props.modifyNote(props.id, updatedNote);
        setUpdatedNote("");
        setIsEditing(false);
        }
    }

    if(isEditing==false){
    return (
        <>
            <li>
                 <input data-testid={props.id+"check"} id={props.id} type="checkbox" checked={props.completed} onChange={()=>props.toggleButton(props.id)}></input>
                 <label htmlFor={props.id} data-testid={props.id + "label"}>{props.listItem}</label>
            </li>
            <div id="list-button" className="btn-group">
                <button data-testid={props.id + "edit"} className="btn-edit" onClick={handleNoteEdit}>Edit</button>
                <button data-testid={props.id + "del"} className="btn-del" onClick={()=>props.deleteNotes(props.id)}>Delete</button>
            </div>

        </>
    );
    }
    else {
        return(
            <>
                <input type="text" data-testid={props.id+"editor"} value={updatedNote} onChange={handleEdit}/>
            <div id="list-button" className="btn-group">
                <button data-testid={props.id + "cancel"} className="btn-cancel" onClick={handleCancel}>Cancel</button>
                <button data-testid={props.id + "save"} className="btn-save" onClick={update} >Save</button>
            </div>
            </>
        );
    }
}
 
export default ListTodo;