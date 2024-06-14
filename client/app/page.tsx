import { MobileBottomSheet } from '@/components/mobile-bottom-sheet'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import { Task } from '@/model/task'
import { StarIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Check, Pencil, Trash } from 'lucide-react'
import { JetBrains_Mono } from 'next/font/google'

const titleFont = JetBrains_Mono({
  style: 'normal',
  subsets: ['latin'],
  display: 'swap',
  weight: ['800']
})

async function getTasksData() {
  const response = await fetch('http://localhost:4000/api/tasks')
  if (!response.ok) {
    throw new Error('Failed to fetch tasks')
  }
  return response.json() as Promise<{ data: Task[] }>
}

export default async function Home() {
  const { data } = await getTasksData()

  return (
    <>
      <header className="bg-transparent text-white min-h-12 flex items-center justify-center py-4 w-full fixed">
        <Typography
          variant={'h2'}
          className={cn('font-black text-foreground', titleFont.className)}
        >
          🎯 Todoist
        </Typography>
      </header>

      <main className="h-screen pt-20 container lg:max-w-[800px]">
        <Typography variant={'h4'} className="mt-5">
          Tasks 📝
        </Typography>

        <div className="flex items-center justify-center group sm:hidden">
          <MobileBottomSheet />
        </div>

        <ul className="mt-5 flex flex-col space-y-2">
          {/* Task */}
          {data.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-4 bg-white/40 rounded-md transition-all duration-300 hover:bg-white/50"
            >
              <div className="flex items-center space-x-2">
                <TooltipProvider>
                  <Tooltip delayDuration={200}>
                    <TooltipTrigger asChild>
                      <button className="rounded-full size-6 bg-transparent p-1 group duration-300 transition-colors shadow-md cursor-pointer flex items-center justify-center border border-[#616895] hover:bg-black/10 animate-task-complete">
                        <Check className="text-[#616895]" />
                      </button>
                    </TooltipTrigger>

                    <TooltipContent color="#fff">
                      <Typography variant="smallText" className="text-center">
                        Mark as done
                      </Typography>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <p className="font-sans font-medium">{task.title}</p>
              </div>

              <div className="flex items-center space-x-2">
                <TooltipProvider>
                  <Tooltip delayDuration={200}>
                    <TooltipTrigger asChild>
                      <button className="rounded-md flex items-center justify-center p-1 size-6 hover:bg-black/5 transition-all bg-transparent">
                        <StarIcon className="size-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <Typography variant="smallText" className="text-center">
                        Mark as important
                      </Typography>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="rounded-md flex items-center justify-center p-1 size-6 hover:bg-black/5 transition-all bg-transparent">
                      <DotsHorizontalIcon className="size-4" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="space-y-1 border-none shadow-md bg-white/60 backdrop-filter backdrop-blur-xl rounded-md">
                    <DropdownMenuItem className="flex items-center space-x-4 focus:bg-black/5">
                      <Check className="size-4" />
                      <Typography variant="smallText">Mark as done</Typography>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex items-center space-x-4 focus:bg-black/5">
                      <Pencil className="size-4" />
                      <Typography variant="smallText">Edit Task</Typography>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex items-center space-x-4 focus:bg-[#a8000020]">
                      <Trash className="size-4 text-red-700" />
                      <Typography variant="smallText" className="text-red-700">
                        Delete Task
                      </Typography>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </li>
          ))}
        </ul>

        <form className="items-center group hidden sm:flex absolute bottom-8 right-0 left-0 w-[calc(100%-2rem)] mx-auto lg:w-[800px]">
          <Input
            className="h-12 bg-white/60 transition-all duration-400 px-4 py-2 text-base text-foreground font-medium rounded-r-none w-full flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none focus-visible:border-2 border-ring"
            placeholder="What needs to be done?"
            required
          />

          <Button
            type="button"
            className="h-12 rounded-l-none font-semibold text-lg"
          >
            + Add Task
          </Button>
        </form>
      </main>
    </>
  )
}
