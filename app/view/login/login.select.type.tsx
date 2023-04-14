import {Dispatch, SetStateAction} from 'react'

export default interface LoginSelectProps {
  pane: string
  setPane: Dispatch<SetStateAction<string>>
}
