//This is our Api layer

// Is file me bas authentication wagera sara kaaam jo backend me hoga uska code likhenge
// sirf yehi file backend se communicate krne wla code rakhega
//backend se communicate krne pe agar kuch error aya toh wo error ko kaise show krna h wo UI layer hi karegi

//Backend se communicate krne k liye hame axios xhaiye hota hai
import axios from 'axios'

//To avoid repetetive code axios provide us to use this and just use api instead of axios.post 
const api = axios.create({
    baseURL : 'http://127.0.0.1:3000/api/auth',
    withCredentials : true
})

//Aunthetication me user ko register krte hai, login krte hai

export async function register(username, email, password) {
    try {
        const response = await api
            .post(
                '/register',{
                    username: username,
                    email: email,
                    password
                })
                return response.data
    } catch (err) {
        console.error(err)
        throw err
    }
}

export async function login(username, password) {
    try {
        const response = await api
            .post(
                '/login',
                {
                    username: username,
                    password
                })
                return response.data
    } catch (err) {
        console.error(err)
        throw err
    }
}

export async function getMe() {
    try{
        const response = await api.get("/get-me")
        return response.data
    }
    catch(err){
        console.log(err);
        throw err;       
    }
}