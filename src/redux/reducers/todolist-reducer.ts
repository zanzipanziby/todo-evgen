import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistsType = {
	todolistId: string,
	title: string,
	filter: FilterValuesType
}


const initialState: TodolistsType[] = [
	{todolistId: '1', title: 'What to learn', filter: 'all'},
	{todolistId: '2', title: 'What to buy', filter: 'all'},
]


export const todolistReducer = (state: TodolistsType[] = initialState, action: TodolistReducerActionsType): TodolistsType[] => {
	switch (action.type) {
		case "UPDATE_TODO_TITLE":
			return state
				.map(tl => tl.todolistId === action.payload.todolistId
					? {...tl, title: action.payload.newTitle}
					: tl)
		case "CHANGE_TODO_FILTER":
			return state
				.map(tl => tl.todolistId === action.payload.todolistId
					? {...tl, filter: action.payload.value}
					: tl)
		case "ADD_TODO":
			return [...state, {todolistId: action.payload.todolistId, title: action.payload.title, filter: 'all'}]
		case "REMOVE_TODO":
			return state.filter(tl => tl.todolistId !== action.payload.todolistId)
		default:
			return state
	}

}


type TodolistReducerActionsType =
	| UpdateTodolistTitleACType
	| ChangeFilterForTodolistAC
	| AddTodolistACType
	| RemoveTodolistACType


type UpdateTodolistTitleACType = ReturnType<typeof updateTodolistTitleAC>
export const updateTodolistTitleAC = (todolistId: string, newTitle: string) => {
	return {
		type: 'UPDATE_TODO_TITLE',
		payload: {
			todolistId,
			newTitle,
		}
	} as const
}


type ChangeFilterForTodolistAC = ReturnType<typeof changeFilterForTodolistAC>
export const changeFilterForTodolistAC = (todolistId: string, value: FilterValuesType) => {
	return {
		type: "CHANGE_TODO_FILTER",
		payload: {
			todolistId,
			value
		}
	} as const
}


export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
	const todolistId = v1()
	return {
		type: "ADD_TODO",
		payload: {
			title,
			todolistId
		}
	} as const
}


export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
	return {
		type: "REMOVE_TODO",
		payload: {
			todolistId
		}

	} as const
}


