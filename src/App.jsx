import { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState(() => {
        let tasks = localStorage.getItem('todos');
        if (tasks === null)
            tasks = [];
        else
            tasks = JSON.parse(tasks);
        return tasks;
    });
    const [completedTasks, setCompletedTasks] = useState(() => {
        let completedTasks = localStorage.getItem('completed');
        if (completedTasks === null)
            completedTasks = [];
        else
            completedTasks = JSON.parse(completedTasks);
        return completedTasks;
    });

    const handleAddTask = (event) => {
        event.preventDefault();
        if (task.trim()) {
            setTasks([...tasks, task]);
            setTask('');
        }
    };

    const handleCompleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        const completedTask = tasks[index];
        setTasks(updatedTasks);
        setCompletedTasks([...completedTasks, completedTask]);
    };

    const handleUncompleteTask = (index) => {
        const updatedCompletedTasks = completedTasks.filter((_, i) => i !== index);
        const uncompletedTask = completedTasks[index];
        setCompletedTasks(updatedCompletedTasks);
        setTasks([...tasks, uncompletedTask]);
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const handleDeleteCompletedTask = (index) => {
        const updatedTasks = completedTasks.filter((_, i) => i !== index);
        setCompletedTasks(updatedTasks);
    };

    // Sauvegarde dans le Local Storage lorsque `tasks` ou `completedTasks` changent
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(tasks));
        localStorage.setItem("completed", JSON.stringify(completedTasks));
    }, [tasks, completedTasks]);

    return (
        <div className="app">
            <header>
                <h1>TodoList by Mominho</h1>
                <form onSubmit={handleAddTask}>
                    <input
                        type="text"
                        placeholder="Add a task..."
                        value={task}
                        onChange={(event) => setTask(event.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>
            </header>
            <main>
                <section className="todos">
                    <div className="tasks-column">
                        <h2>To Do</h2>
                        <ul>
                            {tasks.map((task, index) => (
                                <li key={index}>
                                    <input
                                        type="checkbox"
                                        checked={false}
                                        onChange={() => handleCompleteTask(index)}
                                    />
                                    {task}
                                    <button id="x-button" onClick={() => handleDeleteTask(index)}>
                                        x
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button
                        id="reset-button"
                        onClick={() => {
                            localStorage.removeItem("todos");
                            setTasks([]);
                        }}>
                        Reset
                    </button>
                </section>
                <section className="todos">
                <div className="tasks-column">
                    <h2>Completed</h2>
                    <ul>
                        {completedTasks.map((task, index) => (
                            <li key={index}>
                                <input
                                    type="checkbox"
                                    checked
                                    onChange={() => handleUncompleteTask(index)}
                                />
                                {task}
                                <button id="x-button" onClick={() => handleDeleteCompletedTask(index)}>
                                    x
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                    <button
                        id="reset-button"
                        onClick={() => {
                        localStorage.removeItem("completed");
                        setCompletedTasks([]);
                    }}>
                    Reset
                </button>
                </section>
            </main>
        </div>
    );
}

export default App;