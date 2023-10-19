'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import ImageUpload from '@/components/ImageUpload';
import { Button, TextInput } from '@mantine/core';

interface InitalStateProps {
  name: string;
  imageSrc: string;
  description: string;
}

const initialState: InitalStateProps = {
  name: '',
  imageSrc: '', // A URL segura será definida aqui
  description: '',
};

export default function page() {
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = (event: FormEvent) => {
    setIsLoading(true);
    event.preventDefault();

    axios
      .post('/api/blogs', state)
      .then(() => {
        toast.success('Blog criado com sucesso!');
        router.refresh();
        router.push('/');
      })
      .catch(() => {
        toast.error('Erro ao publicar. Tente novamente.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [event.target.name]: event.target.value });
  }
  const updateSecureUrl = (secureUrl: string) => {
    setState({ ...state, imageSrc: secureUrl });
  };

  return (
    <form onSubmit={onSubmit} className="w-[600px] h-[700px] mx-auto py-12">
      <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
        <div>
          <ImageUpload onSecureUrl={updateSecureUrl} value={state.imageSrc} /> 
        </div>
        <TextInput type="text" value={state.name} name="name" onChange={handleChange} />
        <TextInput type="text" value={state.description} name="description" onChange={handleChange} />
        <div>
          <Button type="submit" fullWidth disabled={isLoading}>
            Publicar
          </Button>
        </div>
      </div>
    </form>
  );
}
