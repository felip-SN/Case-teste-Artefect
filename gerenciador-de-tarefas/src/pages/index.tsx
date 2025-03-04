import { useState } from "react";
import { trpc } from "../utils/trpc";
import './globals.css';

export default function Home() {
    const { data: tasks, refetch } = trpc.getTasks.useQuery(); //Neste codigo estou usando o endpoint getTasks para poder buscar as tarefas no servidor
    const deleteTask = trpc.deleteTasks.useMutation({
        onSuccess: () => {
            alert("Tarefa excluida com sucesso!")
            refetch();
        },
        onError: () => {
            alert("Erro ao deletar a tarefa")
        }
    }); // Aqui, estou consumindo o endpoint deleteTasks, e fazendo um alert para poder dizer se a requisição foi um sucesso ou falha

    const updateTask = trpc.updateTasks.useMutation({
        onSuccess: () => {
            alert("Tarefa atualizada com sucesso!")
            refetch()
        },
        onError: () => {
            alert("Erro ao atualizar a tarefa")
        }
    }); // Aqui, estou consumindo o endpoint updateTasks, e fazendo um alert para poder dizer se a requisição foi um sucesso ou falha

    //As funções abaixo eu desenvolvi para os seguintes intuitos
    //O isVisible é para poder gerenciar a aparição do formulario para poder atualizar a tarefa
    //handleClick serve para que, quando clicar para aparecer, ele vai chamar o isVisible e garantir se o componente esta aparecendo ou n, e após isso, fazer uma busca das informações da tarefa pela a id e preencher os campos
    //handleUpdate é uma função para poder atualizar a tarefa selecionada caso tenha uma alteração nas informações
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
                            <div className="title-card card-items mtop">
                                <h2>Data de Criação: {new Date(task.createdAt).toLocaleDateString("pt-BR")}</h2>
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

                                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

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