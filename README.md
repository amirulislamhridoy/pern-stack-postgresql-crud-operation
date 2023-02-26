# pern-stack or postgresql-crud-operation

## first install postgress in pc
### normal command to postgresql change terminl command
psql -U postgres
### database creating command
create database practise;
CREATE DATABASE practise;
### its for table(relation) creating command
create table users (
-- CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(30)
);
### connect with postgresql and nodejs
const {Pool} = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'practise', [postgresql database name]
    port: 5432
    ,
    password: '.....' [useing my password what I set install time]
    // without password use this error give from server => error SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string
})

module.exports = pool
#### insert data
app.post('/add', async (req, res) => {
    try {
        const { name, email } = req.body
        const data = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
        res.json(data)
    } catch (err) {
        console.log('error', err.message)
    }
})
#### get All users 
app.get('/getAll', async (req, res) => {
    try {
        const users = await pool.query('SELECT * FROM users')
        console.log(users.rows)
        res.json(users.rows)
    } catch (e) {
        console.log(e.message)
        res.json(e.message)
    }
})
#### get by id
app.get('/byId/:id', async (req, res) => {
    try {
        const user = await pool.query('SELECT * FROM users where id = 1')
        console.log(user.rows)
        res.json(user.rows)
    } catch (e) {
        console.log(e.message)
        res.json(e.message)
    }
})
#### update by id and data
app.put('/updateFn/:id', async (req, res) => {
    try {
        const id = req.params.id
        const name = 'zzz';
        const email = 'eeee';
        const user = await pool.query(
            'UPDATE users SET name = $1, email = $2 WHERE id = $3',
            [name, email, id]
        )
        console.log(user)
        res.json(user)
    } catch (e) {
        console.log(e.message)
        res.status(400).json(e.message)
    }
})
#### delete by id 
app.delete('/delete/:id', async (req, res) =>{
    try{
        const id = req.params.id
        console.log(id)
        await pool.query('DELETE FROM users WHERE id = $1', [id])
        .then(() => {
            console.log('user is deleted')
            res.status(200).json('user is deleted')
        })
        .catch(err => {
            console.log(err.message)
            res.json(400).json(err.message)
        })
    }catch(error){
        console.log(error.message)
        res.status(400).json(error.message)
    }
})