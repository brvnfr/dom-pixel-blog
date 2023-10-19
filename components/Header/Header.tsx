'use client'


import { SafeUser } from '@/types/type'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { Container, Paper, Button, Text, Group } from '@mantine/core';
import ToggleTheme from '@/components/ToggleTheme'
interface UserMenuProps {
    currentUser: SafeUser | null
  }


export default function Navbar({currentUser}:UserMenuProps) {


  return (
    <Paper shadow="xs" style={{ padding: '1rem' }}>
    <Container>
      <Group justify="space-between" align="center">
        <Text size="xl">
        <h1><strong>Dom Pixel Blog</strong></h1>

        </Text>

        <Group>
          <Link href="/">Inicio</Link>
          <Link href="/create">Publicar</Link>
          {currentUser ? (
            <Button variant="filled" onClick={() => signOut()}>
              Logout
            </Button>
          ) : (

            <Link href="/register">
              Cadastrar
              </Link>
          )}
          <ToggleTheme />
        </Group>
      </Group>
    </Container>
  </Paper>
  )
}
