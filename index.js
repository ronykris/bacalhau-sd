import express from 'express'
import { bacalhauSD } from './utils.js'
const app = express()
    /*
    app.get('/', (req, res) => {
            res.send('API Active...')
        })*/


app.get('/', (req, res) => {
    const prompt = req.query.prompt || undefined
        //console.log(prompt)
    const result = bacalhauSD(prompt)
    res.send(result)
})


app.get('*', (req, res) => {
    res.send('API Active...')
})

app.listen(3080, () =>
    console.log('Bacalhau listening on port 3080!')
);