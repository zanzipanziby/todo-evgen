import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./todolist";
import {AddItemField} from "./add-item-field";

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
	const todolistId1 = v1() ///qwerqwer
	const todolistId2 = v1() ///qwewersdfsdf


	const [todolists, setTodolists] = useState<TodolistsType[]>([
		{todolistId: todolistId1, title: 'What to learn', filter: 'all'},
		{todolistId: todolistId2, title: 'What to buy', filter: 'all'},
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
	const updateTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
		setTasks({
			...tasks,
			[todolistId]: tasks[todolistId].map((t) => t.taskId === taskId ? {...t, title: newTitle} : t)
		})
	}

	const addTodolist = (title: string) => {
		let todoId = v1()
		setTodolists([{todolistId: todoId, title: title, filter: 'all'}, ...todolists])
		setTasks({...tasks, [todoId]: []})

	}
	const updateTodolistTitle = (todolistId: string, newTitle: string) => {

		setTodolists(todolists.map(tl => tl.todolistId === todolistId ? {...tl, title: newTitle} : tl))

		// const newFunction = (tl: TodolistsType) => {
		// 	if (tl.todolistId === todolistId) {
		// 		return {...tl, title: newTitle}
		// 	} else {
		// 		return tl
		// 	}
		// }
		// const newTodolists = todolists.map(newFunction)
		// setTodolists(newTodolists)
	}

	const removeTask = (todolistId: string, taskId: string) => {
		setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.taskId !== taskId)})
	}

	const changeFilterForTodolist = (todolistId: string, value: FilterValuesType) => {
		setTodolists(todolists.map((tl) => todolistId === tl.todolistId ? {...tl, filter: value} : tl))

		// ES 5
		// setTodolists(todolists.map(tl => {
		// 	if (todolistId === tl.todolistId) {
		// 	 		return  {...tl, filter: value}
		// 	 	} else {
		// 			return  tl
		// 	 	}
		//
		// 	 }
		// ))
	}

	const changeTaskStatus = (todolistId: string, taskId: string, status: boolean) => {
		setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.taskId === taskId ? {...t, isDone: status} : t)})

	}
	const addTask = (todolistId: string, title: string) => {
		setTasks({...tasks, [todolistId]: [{taskId: v1(), title: title, isDone: false}, ...tasks[todolistId]]})

	}


	const filteredTask = (tasks: TaskType[], filter: FilterValuesType) => {
		if (filter === 'active') {
			return tasks.filter(t => !t.isDone)
		}
		if (filter === 'completed') {
			return tasks.filter(t => t.isDone)
		}
		return tasks
	}


	return (

		<>

			<div style={{display: 'flex', gap: '10px', margin: '100px 0 0 100px'}}>
				<AddItemField callback={addTodolist}/>
			</div>


			<div className="App">

				{todolists.map(tl => {
					return (
						<>
							<Todolist
								updateTodolistTitle={updateTodolistTitle}
								addTask={addTask}
								changeFilterForTodolist={changeFilterForTodolist}
								changeTaskStatus={changeTaskStatus}
								updateTaskTitle={updateTaskTitle}
								key={tl.todolistId}
								todolistId={tl.todolistId}
								title={tl.title}
								tasks={filteredTask(tasks[tl.todolistId], tl.filter)}
								removeTask={removeTask}
							/>
						</>
					)
				})}
			</div>
		</>
	);
}

export default App;


