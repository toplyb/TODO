import style from './index.module.less'
import { useEffect, useRef, useState } from 'react'
import { ITaskItem } from '@/types/task.ts'
import { TaskForm } from '@/components/taskForm.tsx'
import { TaskItem } from '@/components/taskItem.tsx'

export function Index() {
  const [taskList, setTaskList] = useState(JSON.parse(sessionStorage.getItem('tasks') || '[]'))
  useEffect(() => {
    sessionStorage.setItem('tasks', JSON.stringify(taskList))
  }, [taskList])


  const dragElementList  = useRef<HTMLUListElement>(null)

  return (
    <div className={style['task-container']}>
      <TaskForm taskList={taskList} setTaskList={setTaskList}></TaskForm>
      <ul className={style['task-list']} ref={dragElementList}>
        {
          taskList.map((task: ITaskItem, index: number) => {
            return (
              <TaskItem style={{top: 70 * index + 'px'}} dragElementList={dragElementList} key={task.id} task={task} taskList={taskList} setTaskList={setTaskList}></TaskItem>
            )
          })
        }
      </ul>
    </div>
  )
}
