'use client'


import { SafeBlog, SafeUser } from "@/types/type"
import axios from "axios";
import { useRouter } from 'next/navigation'
import {RiDeleteBin5Line} from 'react-icons/ri'
import {BsFillPencilFill} from 'react-icons/bs'
import {  IconTrash } from '@tabler/icons-react';
import { Card, Image, Text, Group, Badge, Button, ActionIcon } from '@mantine/core';
import classes from './SingleBlog.module.css';

interface BlogProps {
    key:string
    data:SafeBlog
    currentUser?:SafeUser | null
}


export default function SingleBlog({key,data,currentUser}:BlogProps) {

    const router = useRouter();

    const onLike = () => {
        axios.post(`/api/like/${data.id}`)
        .then(() => {
          router.refresh()
        })
        .catch((error) => {
        })
        .finally(() => {
        })
    }

    const onDelete = () => {

        axios.delete(`/api/blogs/${data.id}`)
        .then(() => {
          router.refresh()
        })
        .catch((error) => {
        })
        .finally(() => {
        })
      }
    
      return (
        <div className="w-[600px] h-[600px]">
        <Card withBorder radius="md" p="md" className={classes.card}>
          <Card.Section>
            <Image src={data.imageSrc} alt={'image'} height={180} />
          </Card.Section>
    
          <Card.Section className={classes.section} mt="md">
            <Group justify="apart">
              <Text fz="lg" fw={500}>
                {data.name}
              </Text>
              <Badge size="sm" variant="light">
                {data.createdAt}
              </Badge>
            </Group>
            <Text fz="sm" mt="xs">
              {data.description}
            </Text>
          </Card.Section>
    
          <Card.Section className={classes.section}>
          </Card.Section>
    
          <Group mt="xs">
            <Button onClick={() => router.push(`/blogs/${data.id}`)} radius="md" style={{ flex: 1 }}>
              Ver Mais
            </Button>
            <ActionIcon variant="default" radius="md" size={36}>
              <IconTrash onClick={onDelete} className={classes.trash} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Card>
        </div>
      );

    
    }
    
    
      // return (
      //   <div className="w-[1100px] border-2 p-4">
      //       <div className="">
      //           <div className="flex gap-2 justify-between items-center">
      //               <Image width={400} className="w-[500px] object-contain" height={300} src={data.imageSrc} alt="Blog Image" />
    
      //               <div className="w-[530px] flex flex-col gap-4 leading-[1.5]">
      //               <h1>{data.name}</h1>
      //               <span>{data.description}</span>
      //               </div>
      //           </div>
      //       </div>
    
      //       {data.userId === currentUser?.id && (
      //           <div className="flex items-center gap-4 mt-4">
      //         <RiDeleteBin5Line onClick={onDelete} className=" cursor-pointer text-[1.5rem]"/>
      //         <BsFillPencilFill onClick={() => router.push(`/blogs/${data.id}`)} className=" cursor-pointer text-[1.2rem]"/>
      //         {/* <button className="bg-red-400 px-6 py-2" onClick={onDelete}>Delete</button> */}
      //         {/* <button className="bg-yellow-400 px-6 py-2" onClick={() => router.push(`/blogs/${data.id}`)}>Edit</button> */}
      //         </div>
      //       )}
      //   </div>
      // )