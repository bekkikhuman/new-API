const Joi = require('joi');
const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());

const listOfNames = [
    {id: 1, name : "Bekki Khuman"},
    {id: 2, name : "Hijam Bala" },
    {id: 3, name : "Kaiku"},
    {id: 4, name : "kamala"}];

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/api/listOfNames', (req, res) => {
    res.send(listOfNames);
});

app.post('/api/listOfNames', (req, res) => {
    const {error} = validateListOfName(req.body);
    if (error){
        res.status(400).send(error.details[0].message);
        return;    
        }

    const listOfName = {
        id: listOfNames.length + 1,
        name: req.body.name
    };
    listOfNames.push(listOfName);
    res.send(listOfName);
});

app.put('/api/listOfNames/:id', (req, res) => {
    const listOfName = listOfNames.find(c => c.id === parseInt(req.params.id));
    if (!listOfName) res.status(404).send('404 error!');
    
    const {error} = validateListOfName(req.body);
    if (error){
        res.status(400).send(error.details[0].message);
        return;    
    }
    
    listOfName.name = req.body.name;
    res.send(listOfName);
});

function validateListOfName(listOfName) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const validation = schema.validate(listOfName);
    return validation;
}

app.delete('/api/listOfNames/:id', (req,res) =>{
    const listOfName = listOfNames.find(c => c.id === parseInt(req.params.id));
    if (!listOfName) res.status(404).send('404 error!');

    const index = listOfNames.indexOf(listOfName);
    listOfNames.splice(index, 1);

    res.send(listOfName);
});


app.get('/api/listOfNames/:id', (req, res) => {
    const listOfName = listOfNames.find(c => c.id === parseInt(req.params.id));
    if (!listOfName) res.status(404).send('404 error!');
    res.send(listOfName);
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
