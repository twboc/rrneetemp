import {Dispatch, SetStateAction} from 'react'

export const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

export const onChange = (method: Dispatch<SetStateAction<string>>, callback?: any) => (e: any) => {
  method(e.target.value);
  if (callback) { callback(e) }
}