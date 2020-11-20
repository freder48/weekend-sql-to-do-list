const express = require('express');
const todoRouter = express.Router();
const pool = require('../modules/pool');

//GET ROUTE
todoRouter.get('/', (req, res) => {
    let sqlText = `SELECT * FROM "tasks" ORDER BY "status";`;
    pool.query(sqlText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('Error in getting tasks', error);
            res.sendStatus(500);
        });
})

//POST ROUTE
todoRouter.post('/', (req, res) => {
    let newTask = req.body;
    let sqlText = `INSERT INTO "tasks" ("tasks") 
                   VALUES($1);`
    pool.query(sqlText, [newTask.tasks])
        .then( (result) => {
            res.sendStatus(201);
        })
        .catch( (error) => {
            console.log('Error in posting Tasks', error);
            res.sendStatus(500);
        })
})







module.exports = todoRouter;