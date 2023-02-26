const {Pool} = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'practise',
    port: 5432
    ,
    password: '32202910'
    // without password use this error give from server => error SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string
})

module.exports = pool