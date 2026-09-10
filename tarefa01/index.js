const express = require('express')
const path = require('path')
const app = express()
const port = 8000


app.use(express.urlencoded({ extended: true }))

app.get('/',(req,res)=>{
    res.send('Sistema OK')
})

app.get('/formulario',(req,res) =>{
    res.sendFile(path.join(__dirname, 'formulario.html'))    
})    

app.post('/enviar', (req, res) => {
    console.log(req.body)

    const nome = req.body.nome
    const endereco = req.body.endereco
    const telefone = req.body.telefone

    console.log('Nome:', nome)
    console.log('Endereço:', endereco)
    console.log('Telefone:', telefone)

    res.send(`Dados informados \n
        Nome: ${nome}\n,
        Email: ${endereco}\n,
        Telefone: ${telefone}`)
})

app.use((req,res) =>{
    res.status(400).send('Página não encontrada')
})

app.listen(port, () =>{
    console.log(`Server is running on https://localhost:${port}`)
})
