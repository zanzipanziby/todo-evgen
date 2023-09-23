import {v1} from "uuid";


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
		case('REMOVE_TASKS'):
			return {
				...state,
				[action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.taskId !== action.payload.taskId)
			}
		default:
			return state
	}
}

///{ type: "REMOVE_TASK, payload:{todolistId: '1', taskId: '123' }  }

type TasksReducerActionsType =
	| RemoveTaskACType



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
