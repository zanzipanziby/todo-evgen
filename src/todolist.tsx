import {AddItemField} from "./add-item-field";
import {EditableText} from "./editable-text";
import {FilterValuesType} from "./redux/reducers/todolist-reducer";
import {TaskType} from "./redux/reducers/tasks-reducer";


type TodolistPropsType = {
	todolistId: string
	title: string
	tasks: TaskType[]
	removeTask: (todolistId: string, taskId: string) => void
	changeTaskStatus: (todolistId: string, taskId: string, status: boolean) => void
	updateTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
	addTask: (todolistId: string, title: string) => void
	changeFilterForTodolist: (todolistId: string, value: FilterValuesType) => void
	updateTodolistTitle: (todolistId: string, newTitle: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

	const removeTaskHandle = (taskId: string) => {
		//проверка
		props.removeTask(props.todolistId, taskId)
	}

	const changeTaskStatusHandle = (taskId: string, status: boolean) => {
		props.changeTaskStatus(props.todolistId, taskId, status)
	}

	const changeFilterForTodolistHandle = (value: FilterValuesType) => {
		return () => props.changeFilterForTodolist(props.todolistId, value)
	}
	const addTaskHandle = (newTitle: string) => {
		props.addTask(props.todolistId, newTitle)
	}

	const updateTodolistTitleHandle = (text: string) => {
		props.updateTodolistTitle(props.todolistId, text)
	}
	return (
		<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 50px'}}>
			<h2><EditableText text={props.title} callback={updateTodolistTitleHandle}/></h2>
			<div style={{display: 'flex', gap: '10px'}}>
				<AddItemField callback={addTaskHandle}/>
			</div>
			<ul>
				{props.tasks.map(t => {
					return (
						<li key={t.taskId} style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
							<input type={'checkbox'} checked={t.isDone}
								   onChange={e => changeTaskStatusHandle(t.taskId, e.currentTarget.checked)}/>
							<button style={{marginRight: "20px"}} onClick={() => removeTaskHandle(t.taskId)}>x</button>

							<EditableText text={t.title}
										  callback={text => props.updateTaskTitle(props.todolistId, t.taskId, text)}/>
						</li>
					)
				})}

			</ul>
			<div>
				<button onClick={changeFilterForTodolistHandle('all')}>All</button>
				<button onClick={changeFilterForTodolistHandle('active')}>Active</button>
				<button onClick={changeFilterForTodolistHandle('completed')}>Completed</button>
			</div>

		</div>
	);
};

