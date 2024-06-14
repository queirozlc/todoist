import { updateTask } from '@/app/actions'
import { Check } from 'lucide-react'
import { forwardRef } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip'
import { Typography } from './ui/typography'

type EditModeProps = {
  id: string
  title: string
  setEditMode: (id: string) => void
}

const EditMode = forwardRef<HTMLInputElement, EditModeProps>(
  ({ title, id, setEditMode }, ref) => {
    return (
      <form
        className="flex w-full items-center"
        action={async () => {
          // @ts-ignore
          const newTitle = ref.current?.value
          if (!newTitle) return
          if (newTitle === title) {
            setEditMode('')
            return
          }
          await updateTask({
            id,
            payload: {
              // @ts-ignore
              title: ref.current?.value ?? title
            }
          })
          setEditMode('')
        }}
      >
        <input
          ref={ref}
          type="text"
          defaultValue={title}
          className="p-0 flex-1 bg-transparent border-none outline-none"
        />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="rounded-md flex items-center justify-center p-1 size-6 hover:bg-black/5 transition-all bg-transparent mr-6"
                type="submit"
              >
                <Check className="size-4" />
              </button>
            </TooltipTrigger>

            <TooltipContent>
              <Typography variant="smallText" className="text-center">
                Save Changes
              </Typography>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </form>
    )
  }
)

EditMode.displayName = 'EditMode'

export { EditMode }
