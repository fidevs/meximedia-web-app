import { myaxios } from '../lib/constants'

export function login(user, password) {
    const response = myaxios({
      url : 'oauth/token',
      method : 'post',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      params : {
        client_id : 'meximedia',
        client_secret : 'password',
        username : user,
        password : password,
        grant_type : 'password'
      }
    })

    if(response.then(res => res.status) === 200) {
        console.log("Bienvenido")
    }
}