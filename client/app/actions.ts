'use server'

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
    await fetch('http://localhost:4000/api/tasks', {
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

export async function markTaskAsCompleted(id: string) {
  try {
    await fetch(`http://localhost:4000/api/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ task: { status: 'completed' } })
    })
  } catch (error) {
    throw new Error('Failed to mark task as completed')
  }
  revalidateTag('tags_index')
}

export async function markTaskAsUncompleted(id: string) {
  try {
    await fetch(`http://localhost:4000/api/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ task: { status: 'uncompleted' } })
    })
  } catch (error) {
    throw new Error('Failed to mark task as uncompleted')
  }
  revalidateTag('tags_index')
}

export async function markAsImportant(id: string) {
  try {
    await fetch(`http://localhost:4000/api/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ task: { is_important: true } })
    })
  } catch (error) {
    throw new Error('Failed to mark task as important')
  }
  revalidateTag('tags_index')
}

export async function markAsUnimportant(id: string) {
  try {
    await fetch(`http://localhost:4000/api/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ task: { is_important: false } })
    })
  } catch (error) {
    throw new Error('Failed to mark task as unimportant')
  }
  revalidateTag('tags_index')
}

export async function removeTask(id: string) {
  try {
    await fetch(`http://localhost:4000/api/tasks/${id}`, {
      method: 'DELETE'
    })
  } catch (error) {
    throw new Error('Failed to remove task')
  }
  revalidateTag('tags_index')
}
