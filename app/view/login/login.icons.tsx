import React, {FC} from 'react'
import {googleOauth2URL} from './../../../shared/shared'

const LoginIcons: FC = () => {
  return (
    <>
      <button type="button" className="btn btn-link btn-floating mx-1">
        <i className="fa fa-facebook-f"></i>
      </button>
      <a href={googleOauth2URL()}>
        <button type="button" className="btn btn-link btn-floating mx-1">
          <i className="fa fa-google"></i>
        </button>
      </a>
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
