import React, {useState} from 'react';


type EditableTextProps = {
	text: string
	callback: (text: string) => void
}

export const EditableText = (props: EditableTextProps) => {
	const [inputValue, setInputValue] = useState(props.text)
	const [editMode, setEditMode] = useState(false)

	const editModeOn = () => {
		setEditMode(true)
	}

	const onBlurHandle = () => {
		if (inputValue.trim()) {
			props.callback(inputValue)
			setEditMode(false)
		}
	}


	return <div>{
		editMode
			? <input
				type="text"
				autoFocus
				value={inputValue}
				onChange={(e) => setInputValue(e.currentTarget.value)}
				onBlur={onBlurHandle}
				style={!inputValue.trim() ? {border: '1px solid red', outline: '1px solid red'} : {}}
			/>
			: <span onDoubleClick={editModeOn}>{props.text}</span>}</div>

};

