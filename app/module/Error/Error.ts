interface ErrorObject {
  type: string
  error: Error
}

const assignError = (e: Error): ErrorObject => {
  console.log('Error: ', e)
  return {
    type: 'error',
    error: e
  }
}

export {
  type ErrorObject,
  assignError
}
