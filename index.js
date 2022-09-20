const express = require('express');
const app = express();
var cors = require('cors')


var test = require('./v1/test')
var createCode = require('./v1/createCode')

app.use(cors())
app.use('/v1/test', test)
app.use('/v1/create', createCode)

app.use(express.json());

module.exports = app