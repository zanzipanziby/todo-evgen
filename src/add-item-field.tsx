import React, {ChangeEvent, useState} from 'react';

type AddItemFieldPropsType = {
	callback: (value: string) => void
}

export const AddItemField = (props: AddItemFieldPropsType) => {
	const [inputValue, setInputValue] = useState('')
	const [error, setError] = useState(null as null | string)
	const onChangeInputHandle = (e: ChangeEvent<HTMLInputElement>) => {
		setError(null)
		setInputValue(e.currentTarget.value)
	}
	const addItem = () => {
		if (inputValue.trim()) {
			props.callback(inputValue.trim())
			setInputValue('')
		} else {
			setError('Enter value')
		}

	}
	return (
		<>
			<input onChange={onChangeInputHandle} value={inputValue}
				   style={error ? {border: '1px solid red', outline: 'red'} : {}}
				   placeholder={error ? error : ''}/>
			<button onClick={addItem}>+</button>
		</>
	);
};

