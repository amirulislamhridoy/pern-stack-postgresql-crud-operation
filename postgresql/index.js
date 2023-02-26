const express = require('express')
const app = express()
const port = process.envPORT || 5000
var cors = require('cors')
var bodyParser = require('body-parser')
const pool = require('./db.js')

app.use(cors())
app.use(express.json())
// app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})
// insert data
app.post('/add', async (req, res) => {
    try {
        const { name, email } = req.body
        const data = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
        res.json(data)
    } catch (err) {
        console.log('error', err.message)
    }
})
// get All users 
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
// get by id
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
// update by id and data
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
// delete by id 
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})