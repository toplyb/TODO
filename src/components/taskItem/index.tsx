import style from '@/components/taskItem/index.module.less'
import { ITaskItem } from '@/types/task.ts'
import React, { useState } from 'react'

export function TaskItem(props: any) {

  const liHeight = 50

  const [ dragElement, setDragElement ] = useState<HTMLElement | null>(null)

  const deleteTask = (id: number) => {
    props.setTaskList(props.taskList.filter((item: ITaskItem) => {
      if (id !== item.id) {
        return item
      }
    }))
  }

  const changeTaskStatus = (task: ITaskItem) => {
    const data = props.taskList.map((item: ITaskItem) => {
      if (task.id === item.id) {
        return {
          ...item,
          status: item.status === 1 ? 0 : 1
        }
      }
      return item
    })
    props.setTaskList(data)
  }

  const mouseDown = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.currentTarget as HTMLElement
    setDragElement(target)
    const uiDom = props.dragElementList.current
    if (uiDom) {
      for (let i = 0; i < uiDom.children.length; i++) {
        const liDom = uiDom.children[i]
        if (liDom.id === target.id) {
          liDom.classList.add('moving')
        } else {
          liDom.classList.remove('moving')
        }
      }
    }
  }

  const mouseUp = (e: React.DragEvent<HTMLLIElement>) => {
    const ulDom = props.dragElementList.current
    console.log('目标位置到页面顶部的距离', e.target)
    console.log('整个 ul 到页面顶部的距离' + ulDom.offsetTop)
    console.log('移动结束后，移动目标距离 ul 的距离: ' + (e.pageY - ulDom.offsetTop))
    const endDistanceToUl = e.pageY - ulDom.offsetTop
    if (dragElement) {
      let index = 0
      // 拖拽到最开始
      if (endDistanceToUl > 0) {
        index = Math.floor(endDistanceToUl / liHeight)
      }
      // 拖拽到最后
      if (index > props.taskList.length - 1) {
        index = props.taskList.length - 1
      }

      const currentId = Number(dragElement.getAttribute('id'))
      const targetTask = props.taskList[index]
      const result = props.taskList.map((item: ITaskItem) => {
        if (item.id === currentId) {
          item.id = targetTask.id
          targetTask.id = currentId
        }
        return item
      })
      result.sort((prev: ITaskItem, next: ITaskItem) => {
        if (prev.id < next.id) {
          return -1
        }
      })
      props.setTaskList(result)

    }
  }

  return (
    <li style={props.style} className={`${style['task-item']}  ${props.task.status === 1 ? style['finished'] : ''}`} draggable="true" id={props.task.id + ''} onMouseDown={mouseDown} onDragEnd={mouseUp}>
      <div className={`${style['task-item-left']}`} onClick={() => changeTaskStatus(props.task)}>
        <input value={props.task.status} checked={props.task.status === 1} type="radio" onChange={() => changeTaskStatus(props.task)}/>
        <span>{props.task.id}.</span>
        <p>{props.task.content}</p>
      </div>
      <button onClick={() => deleteTask(props.task.id)}>x</button>
    </li>
  )
}
