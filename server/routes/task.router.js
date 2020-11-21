const express = require('express');
const todoRouter = express.Router();
const pool = require('../modules/pool');

//GET ROUTE
todoRouter.get('/', (req, res) => {
    let sqlText = `SELECT * FROM "tasks" ORDER BY "tasks";`;
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

//DELETE ROUTE 
todoRouter.delete('/:id', (req, res) =>{
    let id = req.params.id;
    let sqlText = `DELETE FROM tasks WHERE id=$1;`;
    pool.query(sqlText, [id])
        .then((result) => {
            console.log('Got back', result.rows);
            //delete sends back an ok status, client will then ask for all the data with a GET
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error from db', error);
            res.sendStatus(500);
        })
})

//PUT ROUTE 
todoRouter.put('/:id', (req, res) => {
    let todo = req.body.taskStatus;
    let id = req.params.id;
    let sqlText = ``; 
    
    if (todo === 'Completed'){
        sqlText = `UPDATE tasks SET status='Incomplete' WHERE id=$1;`;
    } else { 
        sqlText = `UPDATE tasks SET status='Completed' WHERE id=$1;`;
    }
    
    pool.query(sqlText, [id])
    .then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error when changing transfer status', error)
        res.sendStatus(500);
    }) 
    console.log(`Updating task ${id} with`, todo);
})







module.exports = todoRouter;