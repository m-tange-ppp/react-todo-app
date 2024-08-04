import { useState } from "react";

export default function Todo(props) {
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState("");

    function handleChange(e) {
        setNewName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.editTask(props.id, newName);
        setNewName("");
        setEditing(false);
    }

    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    id={props.id}
                    className="todo-text"
                    type="text"
                    onChange={handleChange}
                    placeholder={props.name} />
            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn btn__secondary"
                    onClick={() => setEditing(false)}>
                    <span className="visually-hidden">{props.name} の編集を</span>
                    中止する
                </button>
                <button type="submit" className="btn btn__primary todo-edit">
                    <span className="visually-hidden">新しいタスクの内容 {props.name} を</span>
                    保存する
                </button>
            </div>
        </form>
    );

    const viewTemplate = (
        <div className="stack-small">
            <div className="c-cb">
                <input
                    id={props.id}
                    type="checkbox"
                    defaultChecked={props.completed}
                    onChange={() => props.toggleTaskCompleted(props.id)}
                />
                <label className="todo-label" htmlFor={props.id}>
                    {props.name}
                </label>
            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn btn__secondary"
                    onClick={() => setEditing(true)}>
                    編集する <span className="visually-hidden">{props.name}</span>
                </button>
                <button
                    type="button"
                    className="btn btn__primary"
                    onClick={() => props.deleteTask(props.id)}>
                    削除する <span className="visually-hidden">{props.name}</span>
                </button>
            </div>
        </div>
    );

    return (
        <li >
            {isEditing ? editingTemplate : viewTemplate}
        </li>
    );
}