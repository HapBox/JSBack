const {sequelize, Sequelize} = require('./Db');

const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const ToDo = require('./ToDo');
const router = express.Router();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function strt(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await ToDo.sync();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

strt();

app.post('/todo',(req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    ToDo.create({ title: title, description: description});
    res.status(200).json({Info: "Created"})
});

app.get('/todo/:index', (req, res) => {
    ToDo.findByPk(req.params.index).then((data)=>{
        if (data == null) res.status(200).json({message: "wrong id"});
        else res.status(200).json({Info: data})
    });
})

app.put('/todo/:index', (req, res) =>{
    let doc = {};
    title = req.body.title;
    description = req.body.description;

    if (title) doc.title = title;
    if (description) doc.description = description;

    ToDo.update(doc, {
        where: {
            id: req.params.index
        }
    })
    res.status(200).json({message: "Updated"})
})

app.delete('/todo/:index', (req, res) => {
    ToDo.destroy({
        where:{
            id: req.params.index
        }
    });
    res.status(200).json({message: "deleted"});
})

app.use((req, res, next) => {
  console.log('URL = ', req.url);
  console.log('Original_URL = ', req.originalUrl);
  console.log('METHOD = ', req.method);
  console.log('HOST = ', req.headers.host);
  console.log('IsSecure = ', req.secure);
  console.log('BODY', req.body);
  console.log('QUERY', req.query);

  next();
});

http.createServer(app).listen(3001, () => {
  console.log('Server is working on port 3001');
})