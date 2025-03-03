import { useState } from "react";
import { trpc } from "../utils/trpc";
import './globals.css';

export default function Home() {
    const { data: tasks, refetch } = trpc.getTasks.useQuery();
    const deleteTask = trpc.deleteTasks.useMutation({ onSuccess: () => refetch() });
    const updateTask = trpc.updateTasks.useMutation({ onSuccess: () => refetch() });

    const [isVisible, setSelectedTaskId] = useState(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleClick = (task) => {
        setSelectedTaskId(task.id === setSelectedTaskId ? null : task.id);

        setSelectedTaskId(task.id);
        setTitle(task.title);
        setDescription(task.description);
    };

    const handleUpdate = () => {
        if (!isVisible) return;

        updateTask.mutate(
            { id: isVisible, title, description },
            {
                onSuccess: () => {
                    refetch();
                    setSelectedTaskId(null)
                }
            }
        );
    };

    return (
        <div className="main">
            <div className="title">
                <h1>Gerenciador de Tarefas</h1>
            </div>

            <div className="task-list">
                <div className="task-item">
                    {tasks?.map(task => (
                        <div className="card" key={task.id}>
                            <div className="title-card card-items">
                                <h2> <b>Titulo: </b> {task.title}</h2>
                            </div>
                            <div className="title-card card-items mtop">
                                <h2></h2><p>{task.description}</p>
                            </div>
                            <div className="btn-group btn-item">
                                <button className="btn" onClick={() => deleteTask.mutate({ id: task.id })}>Excluir</button>
                                <button className="btn" onClick={() => handleClick(task)}>Atualizar</button>
                            </div>
                        </div>
                    ))}
                </div>
                <a className="btn" href="/new">Criar Nova Tarefa</a>
            </div>

            {tasks?.map(task => (
                    <div>
                        {isVisible === task.id && (
                            <div className="task-list">
                                <div className="task-item">
                                    <div className="card" key={task.id}>
                                        <div className="title">
                                            <h2>Atualizar tarefa</h2>
                                        </div>

                                        <div className="w-100">
                                            <input type="text" className="card-items" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" />
                                        </div>

                                        <div className="card-items mtop">
                                            <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                        </div>

                                        <div className="btn-group btn-item">
                                            <button className="btn" onClick={handleUpdate}>Atualizar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
        </div>
    );
}