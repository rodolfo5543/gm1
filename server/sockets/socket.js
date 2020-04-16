const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios')
const usuarios = new Usuarios
const { crearMensaje } = require('../utilidades/utilidades')

io.on('connection', (client) => {
    client.broadcast.emit('crearMensaje', {
        nombre: 'MAGIA',
        mensaje: 'TE HAS CONECTADO EXITOSAMENTE'
    })

    client.on('entrarChat', (data, callback) => {

        if (!data.nombre) {
            return callback({
                error: true,
                mensaje: 'El nombre es necesario'
            });
        }

        let personas = usuarios.agregarPersona(client.id, data.nombre);
        client.broadcast.emit('listaPersona', usuarios.getPersonas());

        callback(personas);
    })

    client.on('crearMensaje', (data) => {
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.emit('crearMensaje', {
                nombre: 'MAGIA',
                mensaje
            })
            //console.log(data);
    })
    client.on('add user', (data) => {
            // let persona = usuarios.getPersona(client.id);
            // let mensaje = crearMensaje(persona.nombre, data.mensaje);
            // client.broadcast.emit('crearMensaje', mensaje)
            console.log(data);
        })
        // client.on('disconnect', () => {
        //     let personaBorrada = usuarios.borrarPersona(client.id);
        //     client.broadcast.emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salió`))
        //     client.broadcast.emit('listaPersona', usuarios.getPersonas());
        // })

    // client.on('mensajePrivado', data => {
    //     let persona = usuarios.getPersona(client.id)
    //     client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.id, data.mensaje))
    // })

});