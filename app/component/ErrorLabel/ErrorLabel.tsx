import React, {FC} from 'react'
import ErrorLabelProps from './ErrorLabel.type'


const ErrorLabel: FC<ErrorLabelProps> = (props) => { return <p>{props.text}</p>}

export default ErrorLabel