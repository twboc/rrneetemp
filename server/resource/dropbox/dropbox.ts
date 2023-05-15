import axios from 'axios'
import dropboxOauth2 from '../../../config/dropboxOAuth2.json'

const getAuth = () => 'Basic ' + Buffer.from(`${dropboxOauth2.client_id}:${dropboxOauth2.client_secret}`).toString('base64')

const token = async (code: string) => {
  let url = `https://www.dropbox.com/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${dropboxOauth2.redirect_uri}`

  const tokenRes = await axios({
    url,
    method: 'post',
    headers: {
      Authorization: getAuth()
    },
  })

  return tokenRes
}

const dropbox = {
  apis: {
    oauth: {
      token,
    },
  },
}

export {token}

export default dropbox