import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

function App() {
    const FILTER_MAP = {
        All: () => true,
        Active: (task) => !task.completed,
        Completed: (task) => task.completed,
    };
    const FILTER_NAMES = Object.keys(FILTER_MAP);

    const [tasks, setTasks] = useState(loadTasksFromLocalStorage());
    const [filter, setFilter] = useState("All");

    useEffect(saveTasksToLocalStorage, [tasks]);

    function toggleTaskCompleted(id) {
        const updatedTasks = tasks.map((task) => {
            if (id === task.id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    function addTask(name) {
        const newTask = { id: `todo-${nanoid()}`, name, completed: false };
        setTasks([...tasks, newTask]);
    }

    function deleteTask(id) {
        const remainingTasks = tasks.filter((task) => id !== task.id);
        setTasks(remainingTasks);
    }

    function editTask(id, newName) {
        const editedTasks = tasks.map((task) => {
            if (id === task.id) {
                return { ...task, name: newName };
            }
            return task;
        });
        setTasks(editedTasks);
    }

    const filterList = FILTER_NAMES.map((name) => (
        <FilterButton
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter} />
    ));

    const taskList = tasks?.filter(FILTER_MAP[filter]).map((task) => (
        <Todo
            id={task.id}
            name={task.name}
            completed={task.completed}
            key={task.id}
            toggleTaskCompleted={toggleTaskCompleted}
            deleteTask={deleteTask}
            editTask={editTask} />
    ));

    function saveTasksToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasksFromLocalStorage() {
        const storedTasks = localStorage.getItem("tasks");
        return storedTasks ? JSON.parse(storedTasks) : [];
    }

    const headingText = `${taskList.length}個のタスクがあるよ`;

    return (
        <div className="todoapp stack-large">
            <h1>TodoApp</h1>
            <Form addTask={addTask} />
            <div className="filters btn-group stack-exception">
                {filterList}
            </div>
            <h2 id="list-heading">
                {taskList.length > 0 && headingText}
            </h2>
            <ul
                role="list"
                className="todo-list stack-large stack-exception"
                aria-labelledby="list-heading">
                {taskList}
            </ul>
        </div>
    )
};

export default App;