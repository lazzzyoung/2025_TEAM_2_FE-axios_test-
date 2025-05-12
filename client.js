const express = require('express')
const axios = require('axios')
const app = express()

app.listen(3001, ()=>{
    console.log("클라이언트 연결 성공")
    
    setTimeout(async()=>{
        try{
            const loginRes = await axios.post("http://server:8080/auth/login", {
                email : "jaewook2400@khu.ac.kr",
                password : "qwer"
            })
            
            
            const token = loginRes.data.token
            console.log(`로그인 성공, 발급 받은 토큰 : ${token}`)

            const postRes = await axios.post("http://server:8080/group/create",{
                title : "Docker 테스트2",
                maxPeople : 4,
                note : "도커 너무 신기하다",
                hashtags : ["같이먹어요", "흡연자만"],
                location: "경희대학교 제2기숙사",
                cost: 19500,
                hopeCost : 30000
            }, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })

            console.log(postRes.data.message)

            const groupRes = await axios.get("http://server:8080/group/get/home",{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })

            console.log(groupRes.data)
            
        } catch(err) {
            
            console.error("에러 내용 : ", err.message)
        }
    }, 1500)
    
})


// app.get('/test/login', async(req,res)=>{
//     try{
//         const response = await axios.post("http://server:8080/auth/login", {
//             email : "jaewook2400@khu.ac.kr",
//             password : "qwer"
//         })
//         console.log(JSON.stringify(response.data))
//         res.send("수신 응답 : " + JSON.stringify(response.data))
//     } catch(err) {
//         res.status(500).send('에러 내용 : ' + err.message)
//     }
// })

