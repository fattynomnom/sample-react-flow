import axios from 'axios'

export default axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_PATH,
    headers: { 'Content-Type': 'application/json' }
})
