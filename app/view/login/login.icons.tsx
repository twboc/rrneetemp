import React, {FC} from 'react'

const LoginIcons: FC = () => {
  return (
    <>
      <button type="button" className="btn btn-link btn-floating mx-1">
        <i className="fa fa-facebook-f"></i>
      </button>
      <button type="button" className="btn btn-link btn-floating mx-1">
        <i className="fa fa-google"></i>
      </button>
      <button type="button" className="btn btn-link btn-floating mx-1">
        <i className="fa fa-twitter"></i>
      </button>
      <button type="button" className="btn btn-link btn-floating mx-1">
        <i className="fa fa-github"></i>
      </button>
    </>
  )
}

export default LoginIcons
