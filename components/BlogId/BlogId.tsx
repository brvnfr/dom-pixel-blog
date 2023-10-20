'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import ImageUpload from '../ImageUpload'
import { toast } from 'react-hot-toast'
import {  IconTrash } from '@tabler/icons-react';
import { Input, Card, Image, Text, Group, Badge, Button, ActionIcon } from '@mantine/core';
import classes from './BlogId.module.css';


interface BlogProps {
    name?:string
    description?:string
    imageSrc?:any
    createdAt: string
    blogId?:string
}


interface InitalStateProps {
    name:string,
    description:string
    imageSrc:string
    createdAt:string
    
  }   
  
  
  const initialState:InitalStateProps = {
    name:'',
    description:'',
    imageSrc:'',
    createdAt: ''
  }
  


export default function BlogId({name,description,imageSrc,createdAt,blogId}:BlogProps) {


    const router = useRouter()
    const [onActive,setOnActive] = useState(false)
    const [isLoading,setIsLoading] = useState(false)



    const [state,setState] = useState(initialState)

    function handleChange(event:ChangeEvent<HTMLInputElement> ) {
        setState({ ...state, [event.target.name]: event.target.value });
      }
  


      const onSubmit = (event:FormEvent) => {

        setIsLoading(true)

        event.preventDefault()
        axios.put(`/api/blogs/${blogId}`,state)
        .then(() => {
          toast.success('Updated Successfully')
            router.refresh()
            router.push('/')
        })

        .catch((err) => {
            throw new Error(err)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    const onDelete = (event:FormEvent) => {

      setIsLoading(true)

        event.preventDefault()
        axios.delete(`/api/blogs/${blogId}`)
        .then(() => {
            toast.success('Updated Successfully')
            router.refresh()
            router.push('/')
        })

        .catch((err) => {
            throw new Error(err)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }


    const setCustomValue = (id:any, value:any) => {
      setState((prevValues) => ({
        ...prevValues,
        [id]: value,
      }));
    };




  return (
    <div className="w-[1200px] h-[100%]">
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={imageSrc} alt={'image'} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {name}
          </Text>
          <Badge size="sm" variant="light">
            {createdAt}
          </Badge>
        </Group>
        <Text fz="sm" mt="xs">
          {description}
        </Text>
      </Card.Section>

      <Card.Section className={classes.section}>
      </Card.Section>
      <Group mt="xs">
            <Button onClick={() => setOnActive(!onActive)} radius="md" style={{ flex: 1 }}>
             Editar
            </Button>
            <Button onClick={onDelete} color='red' radius="md" style={{ flex: 1 }}>
             Deletar
            </Button>
          </Group>
    </Card>
    {onActive && (
        <form onSubmit={onSubmit}>
          <div>
            <ImageUpload value={state.imageSrc} onChange={(value) => setCustomValue('imageSrc',value)}/>
          </div>
            <div className='flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2'>
            <Input placeholder='Titulo' id="name" type='text' value={state.name} name='name' onChange={handleChange}/>
            <Input placeholder='Descrição' id="description" type='text' value={state.description} name='description' onChange={handleChange}/>
            <div> 
            </div>
            <button type='submit' disabled={isLoading}>Submit</button>
            </div>
            
        </form>
        )}
    </div>
  )
}
