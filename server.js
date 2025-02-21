const express = require('express');
const app = express();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

app.use(express.json());





app.get('/', async(req, res, next) => {
    res.status(200).send('welcome to prismatic employees!')
})

app.get('/employees', async(req,res,next) => {
    try{
        const employees =  await prisma.employee.findMany();
        res.status(201).json(employees);
    }catch(err){
        console.log(err);
        res.status(400).json('couldnt create a user because the name is not provided ')
    }
})

app.get('/employees/:id', async(req,res,next) => {
    const {id} = req.params;
    try{
        const employee = await prisma.employee.findUnique({
            where: {id: +id}
        })
        if(!employee){
            return res.status(404).send('user does not exist')
        }
        res.status(200).json(employee)
    }catch(err){
        console.log(err);
        
    }
})

app.put('/employees/:id', async(req,res,next) => {
    const {name} = req.body;
    const {id} = req.params;
    try{
        const updatedEmployee = await prisma.employee.update({
            where: {id: +id},
            data: {name}
        })
        if(!name)return res.status(400).json('name not provided')
        if(!updatedEmployee) return res.status(404).json('employee not found');
        res.status(201).json(updatedEmployee);
    }catch(err){
        console.log(err);
    }
})

app.delete('/employees/:id', async(req,res,next) => {
    const {id} = req.params;
    try{
        await prisma.employee.delete({
            where: {id: +id}
        });
res.status(204).json('employee deleted')
    }catch(err){
        console.log(err); 
    res.status(404).json('employee doesnt exist')   }
})


app.post('/employees', async(req,res,next) => {
    const {name} = req.body;
    try{
        const newEmployee = await prisma.employee.create({
            data: {name}
        })
        res.status(201).json(newEmployee)
    }catch(err){
        console.log(err)
    }
})


app.listen(3000, ()=> {
    console.log('listening on port 3000');
})