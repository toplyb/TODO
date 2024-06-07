import style from '@/components/taskForm/index.module.less'
import React, { ChangeEvent, useState } from 'react'
import { ITaskItem } from '@/types/task.ts'

export function TaskForm({ taskList, setTaskList }: { taskList: ITaskItem[], setTaskList: React.Dispatch<any> }) {

  const [ taskInput, setTaskInput ] = useState('')

  const handlerClickEnter = (e: React.KeyboardEvent<Element>) => {
    if (e.keyCode === 13) {
      submitTask()
    }
  }

  const handlerSetTaskInput = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    setTaskInput(target.value)
  }

  const submitTask = () => {
    if (taskInput === '') {
      alert('请输入内容')
      return false
    }
    let currentId = 1
    if (taskList.length > 0) {
      currentId = taskList[taskList.length - 1]['id'] + 1
    }
    const taskObj = {
      id: currentId,
      content: taskInput,
      status: 0
    }
    setTaskList([ ...taskList, taskObj ])
    setTaskInput('')
  }

  return (
    <div className={style['task-form']}>
      <input placeholder="请输入内容" value={taskInput} onChange={handlerSetTaskInput} onKeyUp={handlerClickEnter}></input>
      <button onClick={submitTask}>submit</button>
    </div>
  )
}
