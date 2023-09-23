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


export const todolistReducer = (state: TodolistsType[] = initialState, action: any) => {
	switch (action.type) {
		default:
			return state
	}

}

