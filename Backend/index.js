const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv')

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json())

mongoose.connect(process.env.mongodbUri)
.then(function(db){
  console.log('Conectado Correctamente');
})
.catch(function(err){
  console.log(err);
});

let Pass = require('./src/models/pass');

app.post('/password', async function(req,res){
  let datos = req.body;
  let nuevapass = new Pass(datos);
  await nuevapass.save();
  res.send({mensaje:"OK"});
});

// listado
app.get('/passwords', async function(req,res){
  let listado = await Pass.find();
  res.send(listado)
})
// modificar 
app.put("/passwordel/:id", async function(req,res){
  let datosmod = req.body;
  let id_enviado = req.params.id
  await Pass.updateOne({_id:id_enviado}, datosmod)
  res.send({
    mensaje:'Modificado Correctamente'
  })
});

app.delete('/passwords/:id', async (req,res) =>{
  let id = req.params.id;
  await Pass.findByIdAndRemove(id);
  res.send({
    mensaje: 'Contraseña Eliminada'
  })
})

app.listen(3100);