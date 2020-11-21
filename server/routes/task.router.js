const express = require('express');
const todoRouter = express.Router();
const pool = require('../modules/pool');
const moment = require('moment');

//GET ROUTE

todoRouter.get('/', (req, res) => {
    let sqlText = `SELECT * FROM "tasks" ORDER BY "tasks";`;
    //how we communicate to the database
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
    //req.body refers to taskToSend from client side
    let newTask = req.body;
    let sqlText = `INSERT INTO "tasks" ("tasks") 
                   VALUES($1);`
    //send sqlText, and value of $1
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
    //formating for time stamp on dom
    let remove = ``;
    let time_completed = moment().format('lll');
    //refers to data being sent over, accessing value of key taskStatus
    let todo = req.body.taskStatus;
    //accessing ${taskId} from url in PUT-want id to be the 
    //value of variable from ${taskId}
    let id = req.params.id;
    //set sql to empty 
    let sqlText = ``; 
    if (todo === 'Completed'){
        sqlText = `UPDATE tasks SET status='Incomplete', time_completed=$1 WHERE id=$2;`;
        pool.query(sqlText, [remove, id])
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error when changing transfer status', error)
            res.sendStatus(500);
        }) 
    } else { 
        sqlText = `UPDATE tasks SET status='Completed', time_completed=$1 WHERE id=$2;`;
        pool.query(sqlText, [time_completed, id])
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error when changing transfer status', error)
            res.sendStatus(500);
        }) 
    }

  
})








module.exports = todoRouter;