export type GetAllTasksResponse = {
  cursor?: null | string
  items: Task[]
  next_page?: null | string
}
export type Task = {
  _created: number
  _data_type: Priority
  _is_deleted: boolean
  _modified: number
  _self_link: string
  _user: string
  _uuid: string
  completed: boolean
  title: string
}

export type Priority = 'low' | 'medium' | 'high'
