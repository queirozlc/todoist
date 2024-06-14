import { Plus } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Sheet, SheetTrigger, SheetContent, SheetClose } from './ui/sheet'
import { createTask } from '@/app/actions'

export function MobileBottomSheet() {
  return (
    <Sheet modal>
      <SheetTrigger asChild>
        <Button className="rounded-full size-16 absolute bottom-8 mx-auto group-active:translate-y-60 transition-transform duration-300">
          <Plus />
        </Button>
      </SheetTrigger>

      <SheetContent
        side={'bottom'}
        className="w-full bg-zinc-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-50 border-none px-2 py-5"
      >
        <form
          className="flex flex-col items-center justify-center py-10 w-full"
          action={createTask}
        >
          <Input
            className="h-14 bg-white/60 transition-all duration-400 px-4 py-2 text-base text-foreground font-medium w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none focus-visible:border-2 border-ring rounded-b-none"
            placeholder="What needs to be done?"
            required
            name="title"
          />
          <SheetClose asChild>
            <Button
              type="submit"
              className="w-full h-14 rounded-t-none rounded-b-lg font-semibold text-lg"
            >
              + Add Task
            </Button>
          </SheetClose>
        </form>
      </SheetContent>
    </Sheet>
  )
}
