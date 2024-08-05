import { useState } from "react";

function Form(props) {
    const [name, setName] = useState("");
    const [deadline, setDeadline] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        if (name) {
            props.addTask(name, deadline);
            setName("");
            setDeadline("")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                    さあ、片づけようか
                </label>
            </h2>
            <input
                type="text"
                id="new-todo-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="date"
                id="new-todo-input"
                className="input input__lg"
                name="deadline"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
            />
            <button type="submit" className="btn btn__primary btn__lg">
                追加する
            </button>
        </form>
    );
}

export default Form;