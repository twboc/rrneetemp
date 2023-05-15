import dropboxOauth2 from '../../../config/dropboxOAuth2.json'

const getAuth = () => 'Basic ' + Buffer.from(`${dropboxOauth2.client_id}:${dropboxOauth2.client_secret}`).toString('base64')

export {
    getAuth
}