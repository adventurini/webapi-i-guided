const express = require('express');

const db= require('./data/db.js')

const server = express();

server.use(express.json()); //add this to make POST and PUT work

server.get('/', (req, res) => {
    res.send('Hello Web XVII')
})

//write a Get /now endpoint that returns current date and time as a string

server.get('/now', (req, res)=> {
const now = new Date().toISOString();
    res.send(now)
})

server.get('/hubs/', (req,res) => {
    db.hubs
    .find()
    .then(hubs => {
        // 200-299 success
        // 300-399 redirect
        // 400-499 client error
        // 500-599 server error
        res.status(200).json(hubs);
    })
    .catch(error =>{
        res.status(500).json( {message: 'Error retrieving hubs'})
    })
})

server.post('/hubs', (req, res)=> {
    // read the data for the hub
    const hubInfo=req.body;
    console.log('hub information', hubInfo)

    // add the hub to our db
    db.hubs
        .add(hubInfo)
        .then (hub => {
            // let the client know what happened
            res.status(201).json(hub)
        })
        .catch(err=> {
            res.status(500).json( {message: 'Error retrieving hubs'})
        })
})

server.delete('/hubs:id', (req, res) => {
    const id = req.params.id;
    db.hubs
        .remove(id).then(deleted => {
            res.status(204).end()
        })
})

server.put('/hubs/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    db.hubs.update(id, changes).then(updated => {
        if (updated){
            res.status(200).json(updated)
        }
        else {
            res.status(404).json( { message: 'hub not found'}) // not found
        }
    })
})

server.listen(4000, () => {
    console.log('\n** API up and running on port 4k **')
})



// yarn
// yarn add express
// add index.js

