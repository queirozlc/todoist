'use client'

import { removeTask, updateTask } from '@/app/actions'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { Task } from '@/model/task'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Check, Circle, Pencil, StarIcon, Trash } from 'lucide-react'
import { Typography } from './ui/typography'
import { useRef, useState } from 'react'
import { CompleteButton } from './complete-button'
import { EditMode } from './edit-mode'

const TASK_STATUS = {
  completed: 1,
  uncompleted: 0
}

export function TaskCard({ tasks }: { tasks: Task[] }) {
  const [editMode, setEditMode] = useState('')
  const editInputRef = useRef<HTMLInputElement>(null)

  return (
    tasks
      // sort by importance
      .sort((a, b) => TASK_STATUS[a.status] - TASK_STATUS[b.status])
      .map(({ id, title, status, is_important }) => (
        <ul className="mt-5 space-y-2" key={id}>
          <li
            className={cn(
              'flex items-center justify-between p-4 bg-white/40 rounded-md transition-all duration-300 hover:bg-white/50',
              { 'bg-white/20 hover:bg-white/20': status === 'completed' },
              //  if the task is in edit mode, add border to the task card
              { 'border-2 border-ring': editMode === id }
            )}
          >
            <div className="flex items-center flex-1 space-x-2">
              <CompleteButton status={status} id={id} />

              {editMode == id ? (
                <EditMode
                  ref={editInputRef}
                  title={title}
                  id={id}
                  setEditMode={setEditMode}
                />
              ) : (
                <p
                  className={cn('font-sans font-medium', {
                    'line-through text-[#616895]': status === 'completed'
                  })}
                >
                  {title}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip delayDuration={200}>
                  <TooltipTrigger asChild>
                    <button
                      className="rounded-md flex items-center justify-center p-1 size-6 hover:bg-black/5 transition-all bg-transparent"
                      onClick={async () => {
                        if (is_important) {
                          await updateTask({
                            id,
                            payload: { is_important: false }
                          })
                          return
                        }

                        await updateTask({
                          id,
                          payload: { is_important: true }
                        })
                      }}
                    >
                      <StarIcon
                        className={cn('size-4', {
                          'text-yellow-500 fill-yellow-500': is_important
                        })}
                      />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <Typography variant="smallText" className="text-center">
                      {is_important
                        ? 'Unmark as important'
                        : 'Mark as important'}
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
                  <DropdownMenuItem
                    className="flex items-center space-x-4 focus:bg-black/5"
                    onClick={async () => {
                      if (status === 'completed') {
                        await updateTask({
                          id,
                          payload: { status: 'uncompleted' }
                        })
                        return
                      }

                      await updateTask({
                        id,
                        payload: { status: 'completed' }
                      })
                    }}
                  >
                    {status === 'completed' ? (
                      <Circle className="size-4" />
                    ) : (
                      <Check className="size-4" />
                    )}
                    <Typography variant="smallText">
                      {status === 'completed'
                        ? 'Mark as uncompleted'
                        : 'Mark as completed'}
                    </Typography>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="flex items-center space-x-4 focus:bg-black/5"
                    onClick={() => {
                      editInputRef.current?.focus()
                      setEditMode(id)
                    }}
                  >
                    <Pencil className="size-4" />
                    <Typography variant="smallText">Edit Task</Typography>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="flex items-center space-x-4 focus:bg-[#a8000020]"
                    onClick={async () => await removeTask(id)}
                  >
                    <Trash className="size-4 text-red-700" />
                    <Typography variant="smallText" className="text-red-700">
                      Delete Task
                    </Typography>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </li>
        </ul>
      ))
  )
}
