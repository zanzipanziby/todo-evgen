import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./todolist";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistsType = {
	todolistId: string,
	title: string,
	filter: FilterValuesType
}

export type TaskType = { taskId: string, title: string, isDone: boolean }
export type TaskStateType = {
	[todolistId: string]: TaskType[]
}


function App() {
	const todolistId1 = v1()
	const todolistId2 = v1()


	const [todolists, setTodolists] = useState<TodolistsType[]>([
		{todolistId: todolistId1, title: 'What to learn', filter: 'all'},
		{todolistId: todolistId2, title: 'What to buy', filter: 'all'}
	])

	const [tasks, setTasks] = useState<TaskStateType>({
		[todolistId1]: [
			{taskId: v1(), title: 'HTML/CSS', isDone: true},
			{taskId: v1(), title: 'JS', isDone: true},
			{taskId: v1(), title: 'React', isDone: false},
			{taskId: v1(), title: 'Redux', isDone: false},
		],
		[todolistId2]: [
			{taskId: v1(), title: 'Beer', isDone: true},
			{taskId: v1(), title: 'Meat', isDone: true},
			{taskId: v1(), title: 'Fish', isDone: false},
			{taskId: v1(), title: 'Vodka', isDone: false},
		],
	})

	const removeTask = (todolistId: string, taskId: string) => {
		setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.taskId !== taskId)})
	}

	const changeTaskStatus = (todolistId: string, taskId: string, status: boolean) => {
		setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.taskId === taskId ? {...t, isDone: status} : t)})

	}
	const addTask = (todolistId: string, title: string) => {
		setTasks({...tasks, [todolistId]: [ {taskId: v1(), title: title, isDone: false}, ...tasks[todolistId]]})

	}

	return (
		<div className="App">
			{todolists.map(tl => {
				let tasksForTodolist = tasks[tl.todolistId]

				return (

					<>
						<Todolist
							addTask={addTask}
							changeTaskStatus={changeTaskStatus}
							key={tl.todolistId}
							todolistId={tl.todolistId}
							title={tl.title}
							tasks={tasksForTodolist}
							removeTask={removeTask}
						/>
					</>
				)
			})}
		</div>
	);
}

export default App;


