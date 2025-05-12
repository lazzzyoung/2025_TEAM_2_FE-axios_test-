const express = require('express')
const axios = require('axios')
const app = express()

app.listen(3000, ()=>{
    console.log("Port 3000 에서 Client 실행중")
})


app.get('/test/login', async(req,res)=>{
    try{
        const response = await axios.post("http://server:8080/auth/login", {
            email : "jaewook2400@khu.ac.kr",
            password : "qwer"
        })
        console.log(JSON.stringify(response.data))
        res.send("수신 응답 : " + JSON.stringify(response.data))
    } catch(err) {
        res.status(500).send('에러 내용 : ' + err.message)
    }
})

