import axios from 'axios';


export default axios.create({
	baseURL: 'https://obscure-waters-40252.herokuapp.com/api'
})


// export default axios.create({
// 	baseURL: 'http://localhost:8080/api'
// })
