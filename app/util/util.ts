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


const removeTrailingSlash = (url: string): string => url.endsWith('/') ? url.slice(0, -1) : url
const removeHttps = (url: string): string => url.replace('https://', '')
const removeHttp = (url: string): string => url.replace('http://', '')
const prependHttp = (url: string): string => 'https://' + url

const decodeHTMLEntities = (text: string): string => {
  const textArea = document.createElement('textarea')
  textArea.innerHTML = text
  return textArea.value
}

export {
  removeTrailingSlash,
  removeHttps,
  removeHttp,
  prependHttp,
  decodeHTMLEntities
}
