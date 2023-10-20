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
          {data.userId === currentUser?.id && (
          <Group mt="xs">
            <Button onClick={() => router.push(`/blogs/${data.id}`)} radius="md" style={{ flex: 1 }}>
              Ver Mais
            </Button>
            <ActionIcon variant="default" radius="md" size={36}>
              <IconTrash onClick={onDelete} className={classes.trash} stroke={1.5} />
            </ActionIcon>
          </Group> )}
        </Card>
        </div>
      );
    }
    
