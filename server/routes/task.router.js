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







module.exports = todoRouter;