import { trpc } from '../utils/trpc';
import { useRouter } from 'next/router';
import { useState } from 'react';
import './globals.css';

export default function NewTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();
  const createTask = trpc.postTasks.useMutation({ onSuccess: () => router.push('/') });

  return (
    <div className='main'>
      <div className='title'>
        <h1>Criar Nova Tarefa</h1>
      </div>

      <div className='form'>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição" />
        <button className='btn btn-new' onClick={() => createTask.mutate({ title, description })}>Criar</button>
      </div>
    </div>
  );
}