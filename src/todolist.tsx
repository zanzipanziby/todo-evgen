import {TaskType} from "./App";
import {ChangeEvent, useState} from "react";


type TodolistPropsType = {
	todolistId: string
	title: string
	tasks: TaskType[]
	removeTask: (todolistId: string, taskId: string) => void
	changeTaskStatus: (todolistId: string, taskId: string, status: boolean) => void
	addTask: (todolistId: string, title: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

	const removeTaskHandle = (taskId: string) => {
		//проверка
		props.removeTask(props.todolistId, taskId)
	}

	const changeTaskStatusHandle = (taskId: string, status: boolean) => {
		props.changeTaskStatus(props.todolistId, taskId, status)
	}

	const [inputValue, setInputValue] = useState('')
	const [error, setError] = useState(null as null | string)
	const onChangeInputHandle = (e: ChangeEvent<HTMLInputElement>) => {
		setError(null)
		setInputValue(e.currentTarget.value)
	}
	const addTaskHandle = () => {
		if (inputValue.trim()) {
			props.addTask(props.todolistId, inputValue)
			setInputValue('')
		} else {
			setError('Enter value')
		}

	}


	return (
		<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
			<h2>{props.title}</h2>
			<div style={{display: 'flex', gap: '10px'}}>
				<input onChange={onChangeInputHandle} value={inputValue}
					   style={error ? {border: '1px solid red', outline:'red'} : {}}
					   placeholder={error ? error : ''}

				/>
				<button onClick={addTaskHandle}>+</button>
			</div>
			<ul>
				{props.tasks.map(t => {
					return (
						<li key={t.taskId} style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
							<input type={'checkbox'} checked={t.isDone}
								   onChange={e => changeTaskStatusHandle(t.taskId, e.currentTarget.checked)}/>
							<button style={{marginRight: "20px"}} onClick={() => removeTaskHandle(t.taskId)}>x</button>
							<span>{t.title}</span>
						</li>
					)
				})}

			</ul>
			<div>
				<button>All</button>
				<button>Active</button>
				<button>Completed</button>
			</div>

		</div>
	);
};

