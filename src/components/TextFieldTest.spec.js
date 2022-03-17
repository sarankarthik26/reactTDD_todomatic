import { fireEvent, render } from "@testing-library/react";
import App from "../App.js";
import TextField from "./TextField.js";

const DATA = [
    { id: "todo-0", name: "Eat", completed: true },
    { id: "todo-1", name: "Sleep", completed: false },
    { id: "todo-2", name: "Repeat", completed: false }
  ];

describe("Check whether the text field and the add button is rendered", ()=>{
    it("Check whether the Header appears",()=>{
        const AppElement = render(<App data={DATA}/>);
        expect(AppElement.getByTestId("Header")).toBeDefined();
        //expect(AppElement.getByTestId("Header")).toHaveTextContent("Todo_Matic");
    });

    it("Check Whether the text field appears", ()=>{
        const textField = render(<TextField />);
        const textValue = textField.getByPlaceholderText("Enter the Note");
        expect(textValue).toHaveAttribute("value","");
        //expect(textValue.value).toBe("");
    });
    
    it("Check whether the add button is disabled initially", ()=>{
        const textField = render(<TextField />);
        expect(textField.getByTestId("add-button")).toBeDisabled();
    });
});

describe("To check the functionality of the text field",()=>{
    it("Check whether the values being typed are reflected",()=>{
        const textField = render(<TextField/>);
        const textElement = textField.getByPlaceholderText("Enter the Note");
        fireEvent.change(textElement, {target: {value: 'New note'}});
        expect(textElement.value).toBe('New note');
    });

    it("Check whether the Add button becomes enabled after note is typed",()=>{
        const textField = render(<TextField/>);
        const textElement = textField.getByPlaceholderText("Enter the Note");
        fireEvent.change(textElement, {target: {value: 'New note'}});       //remember "element.target.value"?
        expect(textField.getByTestId("add-button")).not.toBeDisabled();
    });

    it("Check whether the new note is added when add button is clicked",()=>{

        const AppElement = render(<App data={DATA}/>);
        const textElement = AppElement.getByPlaceholderText("Enter the Note");

        fireEvent.change(textElement, {target: {value: "New Note"}});
        fireEvent.click(AppElement.getByTestId("add-button"));

        expect(AppElement.getByTestId("noOfTasks")).toHaveTextContent("4 tasks available");
        
    });
})