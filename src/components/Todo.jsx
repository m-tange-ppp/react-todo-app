import { useState } from "react";

export default function Todo(props) {
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState("");
    const [newDeadline, setNewDeadline] = useState("")

    function handleSubmit(e) {
        e.preventDefault();
        props.editTask(props.id, newName, newDeadline);
        setNewName("");
        setNewDeadline("");
        setEditing(false);
    }

    function handleCancel() {
        setEditing(false);
        setNewName("");
        setNewDeadline("");
    }

    function handleEdit() {
        setEditing(true);
        setNewName(props.name);
        setNewDeadline(props.deadline);
    }

    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    id={props.id}
                    className="todo-text"
                    type="text"
                    onChange={(e) => setNewName(e.target.value)}
                    defaultValue={newName}
                />
                <input
                    type="date"
                    className="todo-deadline"
                    name="deadline"
                    onChange={(e) => setNewDeadline(e.target.value)}
                />
            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn btn__secondary"
                    onClick={handleCancel}>
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
            <div className="information">
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
                {props.deadline != "" && <span className="deadline">{props.deadline}まで</span>}
            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn btn__secondary"
                    onClick={handleEdit}>
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