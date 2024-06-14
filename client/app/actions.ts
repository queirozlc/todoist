'use server'

import { env } from '@/lib/envs'
import { Task } from '@/model/task'
import { revalidateTag } from 'next/cache'

export async function createTask(formData: FormData) {
  type Payload = {
    task: {
      title: string
      status: 'completed' | 'uncompleted'
      is_important: boolean
    }
  }
  const payload: Payload = {
    task: {
      title: formData.get('title') as string,
      status: 'uncompleted',
      is_important: false
    }
  }

  try {
    await fetch(`${env.API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    revalidateTag('tags_index')
  } catch (error) {
    throw new Error('Failed to create task')
  }
}

type Payload = {
  task: Omit<Task, 'id'>
}
// rewrite all update functions in order to prioritize code reuse
export async function updateTask({
  id,
  payload
}: {
  id: string
  payload: Partial<Payload['task']>
}) {
  try {
    await fetch(`${env.API_URL}/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ task: payload })
    })
  } catch (error) {
    throw new Error('Failed to update task')
  }
  revalidateTag('tags_index')
}

export async function removeTask(id: string) {
  try {
    await fetch(`${env.API_URL}/tasks/${id}`, {
      method: 'DELETE'
    })
  } catch (error) {
    throw new Error('Failed to remove task')
  }
  revalidateTag('tags_index')
}
