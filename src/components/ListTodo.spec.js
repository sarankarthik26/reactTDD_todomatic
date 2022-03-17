import { fireEvent, getAllByTestId, render } from "@testing-library/react";
import App from "../App";
import ListTodo from "./ListTodo";

const DATA = [
    { id: "todo-0", name: "Eat", completed: true },
    { id: "todo-1", name: "Sleep", completed: false },
    { id: "todo-2", name: "Repeat", completed: false }
  ];

describe("Checking whether the todo list is rendered",()=>{

    it("Checking whether the list is displayed",()=>{
        const AppComponent = render(<App data={DATA}/>);
        expect(AppComponent.getByTestId("list-todo")).toBeDefined();
    });

    it("Checking whether the list displays the correct initial count when loading",()=>{
        const AppComponent = render(<App data={DATA}/>);
        expect(AppComponent.getByTestId("noOfTasks")).toHaveTextContent("3 tasks available");
    });

    it("Checking whether the two buttons are added for each list are not",()=>{
        const AppComponent = render(<App data={DATA}/>);
        expect(AppComponent.getAllByText("Edit")).toHaveLength(3);
        expect(AppComponent.getAllByText("Delete")).toHaveLength(3);
    });

    it("Check whether the checkboxes are working",()=>{
        const AppComponent = render(<App data={DATA}/>);
        const checkBox = AppComponent.getByTestId("todo-0check");
        expect(checkBox.checked).toBe(true);

        fireEvent.click(checkBox);
        
        expect(checkBox.checked).toBe(false);
    });

    it("Check whether the delete button is working",()=>{
        const AppComponent = render(<App data={DATA} />);
        const deleteButton = AppComponent.getByTestId("todo-0del");

        fireEvent.click(deleteButton);
        
        expect(AppComponent.queryByTestId("todo-0del")).toBeNull();
        expect(AppComponent.getByTestId("noOfTasks")).toHaveTextContent("2 tasks available");
    });
});

describe("Checking the edit functionality",()=>{
    it("Check whether the template changes when edit button is clicked",()=> {
         const AppComponent = render(<App data={DATA}/>);
         expect(AppComponent.getByTestId("todo-0check")).toBeDefined();
         const editButton = AppComponent.getByTestId("todo-0edit");
         
         fireEvent.click(editButton);
         
         expect(AppComponent.queryByTestId("todo-0check")).toBeNull();
         expect(AppComponent.queryByTestId("todo-0edit")).toBeNull();
         expect(AppComponent.queryByTestId("todo-0del")).toBeNull();

         expect(AppComponent.getByTestId("todo-0editor")).toBeDefined();
         expect(AppComponent.getByTestId("todo-0cancel")).toBeDefined();
         expect(AppComponent.getByTestId("todo-0save")).toBeDefined();
    });

    it("Check whether the cancel button works",()=>{
        const AppComponent = render(<App data={DATA} />);
        const editButton = AppComponent.getByTestId("todo-0edit");

        fireEvent.click(editButton);
        fireEvent.click(AppComponent.getByTestId("todo-0cancel"));

        expect(AppComponent.queryByTestId("todo-0editor")).toBeNull();
        expect(AppComponent.getByTestId("todo-0check")).toBeDefined();
        expect(AppComponent.getByTestId("todo-0label")).toHaveTextContent("Eat");
    });

    it("Check whether the save button works",()=>{
        const AppComponent = render(<App data={DATA} />);

        fireEvent.click(AppComponent.getByTestId("todo-2edit"));
        fireEvent.change(AppComponent.getByTestId("todo-2editor"), {target:{value:"Conquer"}});
        fireEvent.click(AppComponent.getByTestId("todo-2save"));

        expect(AppComponent.queryByTestId("todo-2editor")).toBeNull();
        expect(AppComponent.getByTestId("todo-2check")).toBeDefined();
        expect(AppComponent.getByTestId("todo-2label")).toHaveTextContent("Conquer");
    });

});