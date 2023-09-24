import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./todolist-reducer";


export type TaskType = { taskId: string, title: string, isDone: boolean }
export type TaskStateType = {
	[todolistId: string]: TaskType[]
}

const initialState: TaskStateType = {
	['1']: [
		{taskId: v1(), title: 'HTML/CSS', isDone: true},
		{taskId: v1(), title: 'JS', isDone: true},
		{taskId: v1(), title: 'React', isDone: false},
		{taskId: v1(), title: 'Redux', isDone: false},
	],
	['2']: [
		{taskId: v1(), title: 'Beer', isDone: true},
		{taskId: v1(), title: 'Meat', isDone: true},
		{taskId: v1(), title: 'Fish', isDone: false},
		{taskId: v1(), title: 'Vodka', isDone: false},
	],
}


export const tasksReducer = (state: TaskStateType = initialState, action: TasksReducerActionsType): TaskStateType => {
	switch (action.type) {
		case "REMOVE_TASKS":
			return {
				...state,
				[action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.taskId !== action.payload.taskId)
			}
		case "UPDATE_TASK_TITLE":
			return {
				...state,
				[action.payload.todolistId]: state[action.payload.todolistId]
					.map(el => el.taskId === action.payload.taskId
						? {...el, title: action.payload.title}
						: el)
			}
		case "CHANGE_TASK_STATUS":
			return {
				...state,
				[action.payload.todolistId]: state[action.payload.todolistId]
					.map(el => el.taskId === action.payload.taskId
						? {...el, isDone: action.payload.status}
						: el)
			}
		case "ADD_TASK":

			return {
				...state,
				[action.payload.todolistId]: [
					{
						taskId: v1(),
						title: action.payload.title,
						isDone: false
					},
					...state[action.payload.todolistId],

				]

			}
		case "ADD_TODO":
			return {...state, [action.payload.todolistId]: []}

		case "REMOVE_TODO":
			// delete state[action.payload.todolistId]
			//return state
			const {[action.payload.todolistId]: _, ...rest} = state
			return rest

		default:
			return state
	}
}


type TasksReducerActionsType =
	| RemoveTaskACType
	| UpdateTaskTitleACType
	| ChangeTaskStatusACType
	| AddTaskACType
	| AddTodolistACType
	| RemoveTodolistACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskId: string) => {
	return (
		{
			type: 'REMOVE_TASKS',
			payload: {
				todolistId,
				taskId
			}
		} as const
	)
}

type UpdateTaskTitleACType = ReturnType<typeof updateTaskTitleAC>
export const updateTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
	return {
		type: 'UPDATE_TASK_TITLE',
		payload: {
			todolistId,
			taskId,
			title
		}
	} as const
}


type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistId: string, taskId: string, status: boolean) => {
	return {
		type: "CHANGE_TASK_STATUS",
		payload: {
			todolistId,
			taskId,
			status
		}
	} as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, title: string) => {
	return {
		type: "ADD_TASK",
		payload: {
			todolistId,
			title
		}
	} as const
}


