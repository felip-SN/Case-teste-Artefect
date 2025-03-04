import { initTRPC } from "@trpc/server";
import { z } from 'zod';

//Neste arquivo, estou estabelecendo a conexão do tRPC, e criando os endpoints que vão ser usados pela api tRPC

const t = initTRPC.create(); //Iniciando a conexão com o tRPC

//Estou criando essa interface com o intuito de evitar um erro. Quando criei a task, ele reclamava que ele era do tipo 'never", acontece que ele estava inciiando vazio, o que estava dando conflito com o endpoint, para evitar isso criei essa interface para declarar um array dessa interface.
interface Task {
    id: number;
    title: string;
    description: string;
    createdAt: Date;
}

let tasks: Task[] = []; //Criando o array de tarefas
let idCounter = 1; //Estabelencdo uma variavel para servir como id das tarefas

//Nesta parte do código, estou definindo o CRUD da api. Inicio criando o endpoint para o get, depois para post, update e delete. 
// No fim, estou exportando que vai ser do tipo AppRouter para poder chamar os endpoint no cliente sem o risco de erros.
export const appRouter = t.router({
    getTasks: t.procedure.query(() => tasks),
    postTasks: t.procedure.input(z.object({title: z.string().min(1), description: z.string().optional()}))
    .mutation(({ input }) => {
        const newTask = { id: idCounter++, title: input.title, description: input.description || '', createdAt: new Date() };
        tasks.push(newTask);
        return newTask;
    }),
    updateTasks: t.procedure.input(z.object({ id: z.number(), title: z.string().min(1), description: z.string().optional()}))
        .mutation(( {input} ) => {
            const task = tasks.find(t => t.id === input.id);
            if (!task)
                throw new Error("A tarefa não foi encontrada");
            task.title = input.title;
            task.description = input.description || '';
            return task;
    }),
    deleteTasks: t.procedure.input(z.object({ id: z.number() }))
        .mutation(({ input }) => {
            tasks = tasks.filter(t => t.id !== input.id);
            return { success: "Tarefa excluida com sucesso" };
        })
});

export type AppRouter = typeof appRouter;