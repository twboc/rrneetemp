import React, {FC} from 'react'
import {
  googleOauth2URL,
  facebookOAuth2URL,
  dropboxOauth2URL,
} from './../../../shared/shared'
import config from '../../../config/config.dev.json'

const LoginIcons: FC = () => {
  return (
    <>
      {config.app.auth.facebook.allow && (
        <a href={facebookOAuth2URL()}>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fa fa-facebook-f"></i>
          </button>
        </a>
      )}

      {config.app.auth.google.allow && (
        <a href={googleOauth2URL()}>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fa fa-google"></i> Google
          </button>
        </a>
      )}

      {config.app.auth.dropbox.allow && (
        <a href={dropboxOauth2URL()}>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fa fa-dropbox"></i> Dropbox
          </button>
        </a>
      )}

      {config.app.auth.twitter.allow && (
        <button type="button" className="btn btn-link btn-floating mx-1">
          <i className="fa fa-twitter"></i>
        </button>
      )}

      {config.app.auth.github.allow && (
        <button type="button" className="btn btn-link btn-floating mx-1">
          <i className="fa fa-github"></i>
        </button>
      )}
    </>
  )
}

export default LoginIcons
