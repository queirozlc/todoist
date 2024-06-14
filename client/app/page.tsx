import { MobileBottomSheet } from '@/components/mobile-bottom-sheet'
import { NewTaskForm } from '@/components/new-task-form'
import { TaskCard } from '@/components/task-card'
import { Typography } from '@/components/ui/typography'
import { env } from '@/lib/envs'
import { cn } from '@/lib/utils'
import { Task } from '@/model/task'
import { JetBrains_Mono } from 'next/font/google'

const titleFont = JetBrains_Mono({
  style: 'normal',
  subsets: ['latin'],
  display: 'swap',
  weight: ['800']
})

async function getTasksData() {
  const url = `${env.API_URL}/tasks`
  const response = await fetch(url, {
    next: {
      tags: ['tags_index'],
      revalidate: 1
    }
  })
  if (!response.ok) {
    throw new Error('Failed to fetch tasks')
  }
  return response.json() as Promise<{ data: Task[] }>
}

export default async function Home() {
  const { data } = await getTasksData()
  const importantTasks = data.filter((task) => task.is_important)
  const regularTasks = data.filter((task) => !task.is_important)

  return (
    <>
      <header className="bg-transparent text-white min-h-12 flex items-center justify-center py-4 w-full absolute">
        <Typography
          variant={'h2'}
          className={cn('font-black text-foreground', titleFont.className)}
        >
          🎯 Todoist
        </Typography>
      </header>

      <main className="h-screen pt-20 container lg:max-w-[800px]">
        <Typography variant={'h4'} className="mt-5">
          Importants 📌
        </Typography>

        <TaskCard tasks={importantTasks} />

        <Typography variant={'h4'} className="mt-5">
          Tasks 📝
        </Typography>

        <div className="flex items-center justify-center group sm:hidden">
          <MobileBottomSheet />
        </div>

        {/* Task */}
        <TaskCard tasks={regularTasks} />

        <NewTaskForm />
      </main>
    </>
  )
}
