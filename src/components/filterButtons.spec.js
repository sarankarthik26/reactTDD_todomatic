import { fireEvent, render } from "@testing-library/react";
import App from "../App";

const DATA = [
    { id: "todo-0", name: "Eat", completed: true },
    { id: "todo-1", name: "Sleep", completed: false },
    { id: "todo-2", name: "Repeat", completed: false }
  ];


describe("To test the functionality of the filter buttons",()=> {
    it("check whether there are buttons rendered initially",()=>{
        const AppElement = render(<App data={DATA}/>);
        expect(AppElement.getByText("All")).toBeDefined();
        expect(AppElement.getByText("Completed")).toBeDefined();
        expect(AppElement.getByText("Todo")).toBeDefined();
    });

    it("Check whether the all filter is pressed by default",()=>{
        const AppElement = render(<App data={DATA}/>);
        expect(AppElement.getByText("All")).toHaveAttribute("aria-pressed","true");
        expect(AppElement.getByText("Completed")).toHaveAttribute("aria-pressed","false");
        expect(AppElement.getByText("Todo")).toHaveAttribute("aria-pressed","false");
        expect(AppElement.getByTestId("noOfTasks")).toHaveTextContent("3 tasks available");
    });

    it("Check whether the completed filter works as expected",()=>{
        const AppElement = render(<App data={DATA}/>);
        const CompleteButton = AppElement.getByText("Completed");

        fireEvent.click(CompleteButton);

        expect(AppElement.getByTestId("noOfTasks")).toHaveTextContent("1 task available");
    });

    it("Check whether the Todo filter works as expected",()=>{
        const AppElement = render(<App data={DATA}/>);
        const TodoButton = AppElement.getByText("Todo");

        fireEvent.click(TodoButton);

        expect(AppElement.getByTestId("noOfTasks")).toHaveTextContent("2 tasks available");
    });

    it("Check whether the Todo filter updates when a task is marked as completed",()=>{
        const AppElement = render(<App data={DATA}/>);
        const TodoButton = AppElement.getByText("Todo");

        fireEvent.click(TodoButton);
        fireEvent.click(AppElement.getByTestId("todo-1check"));

        expect(AppElement.getByTestId("noOfTasks")).toHaveTextContent("1 task available");
    });
});