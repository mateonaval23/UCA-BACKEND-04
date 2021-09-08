const express = require('express');
const cors = require('cors');
const server = express();


const usuarioAutorizado = {
    nombre: "matias",
    clave: "password"
}

var autor = [{
    id: 1,
    nombre: "Jorge Luis",
    apellido: "Borges",
    fechaDeNacimiento: "24/08/1899",
    libros: [
        {
            id: 1,
            titulo: "Ficciones",
            descripcion: "Se trata de uno de sus mas...",
            anioPublicacion: 1944
        },
        {
            id: 2,
            titulo: "El Aleph",
            descripcion: "Otra recopilacion de cuentos...",
            anioPublicacion: 1949
        }
    ]
}]

var libro = [ 
    {
        id: 1,
        titulo: "Ficciones",
        descripcion: "Se trata de uno de sus mas...",
        anioPublicacion: 1944
    }
]

var listadoUsuario = []

// Podemos parsear los json que llegan en request
server.use(express.json({extend: true}));


// Creacion de funcion middleware (intermedia entre server y rutas)
const validar = (req, res, next) => {
    console.log("La ruta accedida es: " + req.path)
    if(req.query.usuario.tolowerCase() != usuarioAutorizado.nombre.tolowerCase()){
        res.statusCode = 401;    
        res.send("Usuario no autorizado")
    }else{
        next()
    }
}

//server.use(cors)
// const mostrarSaludo = (req, res, next) => {
//     console.log("Chau a todos")
//     next()
// }

// Uso de middleware global a todas las rutas
//server.use(validar)
// server.use(mostrarSaludo)


// Rutas de autores GET
server.get('/autores', (req, res) => {

})

// Ingresar autor
server.post('/autores', (req, res) => {
    
})

// Devolver un autor por id
server.get('/autores/:id', (req, res) => {

})

// Eliminar un autor por id
server.delete('/autores/:id', (req, res) => {
    
})


// Modificar un autor por id y que debe llevar un body con los datos a modificar sin el id
server.put('/autores/:id', (req, res) => {
    
})




// Ruta o Routes
server.get('/api/users',  (req, res) => {
    res.json(listadoUsuario)
})

// Ruta o Routes
server.post('/api/users',  (req, res) => {
    console.log(req.body)
    const { nombre } = req.body

    listadoUsuario.push({nombre})
    res.statusCode = 201
    res.send(nombre)
})

server.delete('/api/users/:nombre',  (req, res) => {
    const nombre = req.params.nombre
    if(listadoUsuario.length != 0){
        listadoUsuario = listadoUsuario.filter(usuario => usuario.nombre !== nombre)
        res.statusCode = 204
        res.json()
    }else{
        res.statusCode = 404
        res.send("No hay elementos para eliminar")
    }
        
})

server.get('/api/photos', validar,  (req, res) => {
    res.send("Foto")
})

server.get('/api/books', (req, res) => {
    res.send("Libros")
})

server.get('/api/catalogo', (req, res) => {
    res.send("Libros")
})


// server.use((err, req, res, next) =>{
//     if(!err) return next()
//     console.log('Error, algo salio mal', err)
//     res.statusCode = 500
//     res.send('Error')
// })

server.listen(3000, () => {
    console.log("Servidor corriendo")
})