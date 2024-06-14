import { updateTask } from '@/app/actions'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip'
import { Typography } from './ui/typography'

export function CompleteButton({
  id,
  status
}: {
  id: string
  status: 'completed' | 'uncompleted'
}) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <button
            className={cn(
              'rounded-full size-6 bg-transparent p-1 group duration-300 transition-colors shadow-md cursor-pointer flex items-center justify-center border border-[#616895] hover:bg-black/10 animate-task-complete',
              {
                'bg-zinc-900 text-white border-none': status === 'completed',
                'text-white': status === 'uncompleted'
              }
            )}
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
            <Check
              className={cn(
                'text-[#616895]',
                status === 'completed' && 'text-white'
              )}
            />
          </button>
        </TooltipTrigger>

        <TooltipContent color="#fff">
          <Typography variant="smallText" className="text-center">
            Mark as done
          </Typography>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
