import React from 'react';
import './App.css';
import {Todolist} from "./todolist";
import {AddItemField} from "./add-item-field";
import {
	addTodolistAC,
	changeFilterForTodolistAC,
	FilterValuesType, removeTodolistAC,
	updateTodolistTitleAC
} from "./redux/reducers/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, TaskType, updateTaskTitleAC} from "./redux/reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./redux/store";


function App() {


	const dispatch = useDispatch()

	const todolistsWithStore = useSelector((state: RootStateType) => state.todolists)
	const tasksWithStore = useSelector((state: RootStateType) => state.tasks)


	const updateTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
		dispatch(updateTaskTitleAC(todolistId, taskId, newTitle))
	}

	const addTodolist = (title: string) => {
		dispatch(addTodolistAC(title))

	}
	const updateTodolistTitle = (todolistId: string, newTitle: string) => {
		dispatch(updateTodolistTitleAC(todolistId, newTitle))
	}

	const removeTask = (todolistId: string, taskId: string) => {
		dispatch(removeTaskAC(todolistId, taskId))
	}

	const changeFilterForTodolist = (todolistId: string, value: FilterValuesType) => {
		dispatch(changeFilterForTodolistAC(todolistId, value))
	}

	const changeTaskStatus = (todolistId: string, taskId: string, status: boolean) => {
		dispatch(changeTaskStatusAC(todolistId, taskId, status))
	}

	const addTask = (todolistId: string, title: string) => {
		dispatch(addTaskAC(todolistId, title))
	}

	const removeTodolist = (todolistId: string) => {
		dispatch(removeTodolistAC(todolistId))
		console.log(tasksWithStore)
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

				{todolistsWithStore.map(tl => {
					return (
						<>
							<Todolist
								updateTodolistTitle={updateTodolistTitle}
								addTask={addTask}
								changeFilterForTodolist={changeFilterForTodolist}
								changeTaskStatus={changeTaskStatus}
								updateTaskTitle={updateTaskTitle}
								removeTodolist={removeTodolist}
								key={tl.todolistId}
								todolistId={tl.todolistId}
								title={tl.title}
								tasks={filteredTask(tasksWithStore[tl.todolistId], tl.filter)}
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


