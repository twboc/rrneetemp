import React, {FC} from 'react'
import InputLabelProps from './inputLabel.type'

const InputLabel: FC<InputLabelProps> = props => {
  return (
    <>
      <label className="form-label" htmlFor={props.id}>
        {props.name}
      </label>
      <input
        id={props.id}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        className="form-control"
      />
    </>
  )
}

export default InputLabel
