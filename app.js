
const e = require('express')
const express = require('express')
const app = express()
const fs = require('fs')

app.use(express.json())     // fire when get any request from front end // public parse all icoming request to js

let members = JSON.parse(fs.readFileSync("./members.json"))

let traniers = JSON.parse(fs.readFileSync("./trainers.json"))


//members




//1.get all members and traniers

app.get('/all_info', (req, res) => {

    const arrayOfMembers = members.map((member) => { // GET MEMBERS INFO new array

        const train = traniers.find((trainersid) => { // GET TRAINERS INFO by value
            return trainersid.Id == member.TrainerId


        })
        return {
            member,
            trainerInfo: train




        }
    })

    res.json(arrayOfMembers)

})







app.get('/members', (req, res) => {
    //get members


    res.json(members)

})
app.post('/members', (req, res) => { // 2. add mambers post

    req.body.id = members.length + 1 // unique id
    members.push(req.body)
    console.log(req.body);                // get data from post chunck
    res.status(201).json({ messege: "success", member: req.body })



})
//3- Get a specific Member (if hismembership expired return “this member is not allowed to enter the gym”)

app.get('/membership/:id', (req, res) => {

    let index = members.findIndex((e) => {
        return e.Id == req.params.id // get id from user

    })
    let expiration = members.map((e) => {  // expiration date
        return e.Membership.to









    })
    if (expiration[index] == 2024) {
        res.json({ messeg: "not allowed member-expired membership" })

    }
    else {
        res.json({ messeg: "allowed member" })

    }

})

//4.Update Member (name,membership, trainer id)




app.put('/members/:id', (req, res) => { // 3. update data  from post
    let index = members.findIndex((e) => {
        return e.Id == req.params.id

    })
    members[index].name = req.body.Name
    members[index].Membership = req.body.Membership
    members[index].TrainerId = req.body.TrainerId

    res.status(201).json({ messege: "update success", user: req.body })
})

//5.Delete Member



app.delete('/members/:id', (req, res) => { // 3. update data  from post
    let index = members.findIndex((e) => {
        return e.Id == req.params.id

    })
    members.splice(index, 1)
    res.status(200).json({ messege: "delete success", user: req.body })


})



//trainers
//get trainers

app.get('/trainers', (req, res) => {

    res.json(traniers)


})








//1- Add a trainer.






app.post('/trainers', (req, res) => { // 2. add trainers post

    req.body.id = members.length + 1 // unique id
    traniers.push(req.body)
    // get data from post chunck
    res.json({ messege: "success", trainer: req.body })



})





//2- Get all trainers and trainer’s members.


app.get('/all_trainersInfo', (req, res) => {

    const arrayOfTrainers = traniers.map((trainer) => {

        const memb = members.find((membersid) => {
            return membersid.Id == trainer.TrainerId


        })
        return {
            trainer, memb





        }
    })

    res.json(arrayOfTrainers)

})


//3- Update trainer.



app.put('/trainers/:id', (req, res) => { // 3. update data  from post
    let index = traniers.findIndex((e) => {
        return e.Id == req.params.id

    })
    traniers[index].Name = req.body.Name


    res.json({ messege: "update success", user: req.body })
})

//4- delete trainer.



app.delete('/trainers/:id', (req, res) => { // 
    let index = traniers.findIndex((e) => {
        return e.Id == req.params.id

    })

    traniers.splice(index, 1)

    res.json({ messege: "delet success", })
})





//5- Get a specific trainer and trainer’s members



app.get('/spec-trainer&member/:id', (req, res) => {

    let index = traniers.findIndex((e) => {
        return e.Id == req.params.id

    })
    const arrayOfspecT = traniers.map((t) => { // GET MEMBERS INFO new array

        const specMem = members.find((m) => { // GET TRAINERS INFO by value
            return m.Id == t.TrainerId


        })
        return {
            t,
            trainerInfo: specMem




        }
    })

    res.json(arrayOfspecT[index])
})















//Statistics APIs
//1- Get all revenues of all members.

app.get('/revenues', (req, res) => {



    const sum = members.reduce((accumulator, object) => {
        return accumulator + object.Membership.cost;
    }, 0);
    res.json(sum)

})


//2- Get the revenues of a specific trainer.

app.get('/trainer_rev/:id', (req, res) => {
    let index = members.findIndex((e) => {
        return e.Id == req.params.id

    })
    let rev = members.map((e) => {

        return e.Membership.cost
    })
    res.json({ messege: "revinue is " + rev[index] })
})










app.get('*', (req, res) => { res.status(404).json({ messege: "page not found" }) })

app.listen(4000, () => {

    console.log('server is running fine...')
})
