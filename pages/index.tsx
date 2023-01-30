import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Todo from '@/components/todo/Todo'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Todo app</title>
       
      </Head>
      <main >
        <Todo/>
      </main>
    </>
  )
}
