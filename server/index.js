const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/test', (req, res) => res.send({
    "item1": "You reched the test endpoint",
    "item2": "I have all the creativity"
}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))