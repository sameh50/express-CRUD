
const path = require('path')
const express = require('express')
const app = express()
const fs = require('fs')
//app.use(express.static("public"))     // fire when get any request from front end // public 
app.use(express.json())     // fire when get any request from front end // public parse all icoming request to js

let users = JSON.parse(fs.readFileSync("./public/test.json"))

app.get('/users', (req, res) => {


    //res.sendFile('C:/Users/sameh/OneDrive/Desktop/express/public/index.html') 
    res.json(users)                                        // 1.get or read data 

})
app.post('/users', (req, res) => { // 2. add data  from post

    req.body.id = users.length + 1 // unique id
    users.push(req.body)
    console.log(req.body);                // get data from post chunck
    res.status(201).json({ messege: "success", user: req.body })
})
app.put('/users/:id', (req, res) => { // 3. update data  from post
    let index = users.findIndex((e) => {
        return e.id == req.params.id

    })
    users[index].name = req.body.name
    res.status(201).json({ messege: "update success", user: req.body })
})
app.delete('/users/:id', (req, res) => { // 4. delete data  from post

    let index = users.findIndex((user) => {
        return user.id == req.params.id

    })
    users.splice(index, 1)
    res.status(200).json({ messege: "delete success", user: req.body })

})






app.get('*', (req, res) => { res.status(404).json({ messege: "page not found" }) })
const port = process.env.PORT || 3500
app.listen(port, () => {

    console.log('server is running fine...')
})
