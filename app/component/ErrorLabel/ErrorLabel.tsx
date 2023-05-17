import React, {FC} from 'react'
import ErrorLabelProps from './ErrorLabel.type'


const ErrorLabel: FC<ErrorLabelProps> = (props) => { return <p style={{ color: '#a82308'}}>{props.text}</p>}

export default ErrorLabel