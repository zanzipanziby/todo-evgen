import {combineReducers, createStore} from 'redux'
import {tasksReducer} from "./reducers/tasks-reducer";
import {todolistReducer} from "./reducers/todolist-reducer";


const rootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todolistReducer
})

export type RootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)