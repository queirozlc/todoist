'use client'

import { createTask } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRef } from 'react'
import { useFormStatus } from 'react-dom'

export function NewTaskForm() {
  const { pending } = useFormStatus()
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form
      className="items-center group hidden sm:flex fixed bottom-8 right-0 left-0 w-[calc(100%-2rem)] mx-auto max-w-[800px] px-6"
      action={async (formData) => {
        await createTask(formData)
      }}
      onSubmit={() => formRef.current?.reset()}
    >
      <Input
        className="h-12 bg-white/40 transition-all duration-400 px-4 py-2 text-base text-foreground font-medium rounded-r-none w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none focus-visible:border-2 border-ring backdrop-filter backdrop-blur-md"
        placeholder="What needs to be done?"
        required
        name="title"
      />

      <Button
        type="submit"
        className="h-12 rounded-l-none font-semibold"
        disabled={pending}
      >
        + Add Task
      </Button>
    </form>
  )
}
