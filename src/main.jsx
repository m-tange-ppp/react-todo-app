import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const DATA = [
    { id: "todo-0", name: "食べる", completed: true },
    { id: "todo-1", name: "寝る", completed: false },
    { id: "todo-2", name: "勉強する", completed: false },
];

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App tasks={DATA} />
    </React.StrictMode>,
)
