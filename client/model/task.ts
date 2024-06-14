export type Task = {
  id: string
  title: string
  is_important: boolean
  status: 'completed' | 'uncompleted'
}
