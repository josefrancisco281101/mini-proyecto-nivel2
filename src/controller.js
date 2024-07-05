import path from 'node:path'
import fs from 'node:fs/promises'
import { pool } from './bd.js'

export const index = async (request, response) => {
  try {
    const data = await fs.readFile('index.html')

    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })
    response.write(data)
    response.end()
  } catch (error) {
    console.error('Error al leer el archivo:', error)
    response.writeHead(500, { 'Content-Type': 'text/plain' })
    response.end('Error interno del servidor')
  }
}
export const list = async (request, response) => {
  try {
    const usuarios = await pool.execute('SELECT * FROM usuarios')
    response.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8'
    })
    response.end(JSON.stringify(usuarios[0]))
  } catch (error) {
    console.log(error)
    response.writeHead(500, {
      'Content-Type': 'application/json; charset=utf-8'
    })
    response.end(JSON.stringify({ menssage: 'Error interno' }))
  }
}
export const usuariosExport = async (request, response) => {
  try {
    const [usuarios] = await pool.execute('SELECT * FROM usuarios')
    // console.log(usuarios);
    const rutaArchivo = path.resolve('./public/usuarios.csv')
    const csvHeaders =
      'id,nombre,apellidos,email,password,direccion,dni,edad,fechaCreacion,telefono\n'
    const csvData = usuarios
      .map(
        (usuario) =>
          `${usuario.id},${usuario.nombre},${usuario.apellidos},${usuario.email},${usuario.password},${usuario.direccion},${usuario.dni},${usuario.edad},${usuario.fechaCreacion},${usuario.telefono}`
      )
      .join('\n')
    const csvContent = csvHeaders + csvData

    await fs.writeFile(rutaArchivo, csvContent, 'utf-8')
    response.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8'
    })
    response.end(
      JSON.stringify({ message: 'Usuarios exportados correctamente' })
    )
  } catch (error) {
    console.log(error)
    response.writeHead(500, {
      'Content-Type': 'application/json; charset=utf-8'
    })
    response.end(JSON.stringify({ menssage: 'Error interno' }))
  }
}

export const insert = async (request, response) => {
  try {
    const rutaArchivo = path.resolve('./public/usuarios.csv')
    // validad correo
    const validarEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return regex.test(email)
    }
    // validad que los campos no esten vacios o indefinidos
    const validarUsuario = (usuario) => {
      if (!usuario.id || !usuario.nombre || !usuario.apellidos || !usuario.email || !usuario.password || !usuario.direccion || !usuario.dni || !usuario.edad || !usuario.fechaCreacion || !usuario.telefono) {
        return false
      }
      if (!validarEmail(usuario.email)) {
        return false
      }
      return true
    }

    const data = await fs.readFile(rutaArchivo, 'utf-8')

    // acomodar los datos para insertarlos
    const usuarios = []
    data.split('\n').slice(1).forEach(line => {
      const [id, nombre, apellidos, email, password, direccion, dni, edad, fechaCreacion, telefono] = line.split(',')
      const usuario = { id, nombre, apellidos, email, password, direccion, dni, edad, fechaCreacion, telefono }
      if (validarUsuario(usuario)) {
        usuarios.push(usuario)
      } else {
        console.error(`Datos inválidos para el usuario: ${JSON.stringify(usuario)}`)
      }
    })
    // verificar duplicados
    for (const usuario of usuarios) {
      const [rows] = await pool.execute('SELECT * FROM usuarios WHERE id = ? OR email = ?', [usuario.id, usuario.email])
      if (rows.length === 0) {
        await pool.execute(
          'INSERT INTO usuarios (id, nombre, apellidos, email, password, direccion, dni, edad, fechaCreacion, telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [usuario.id, usuario.nombre, usuario.apellidos, usuario.email, usuario.password, usuario.direccion, usuario.dni, usuario.edad, usuario.fechaCreacion, usuario.telefono]
        )
      } else {
        console.log(`Usuario duplicado encontrado: ${usuario.email}`)
      }
    }

    response.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8'
    })
    response.end(JSON.stringify({ message: 'Usuarios importados correctamente' }))
  } catch (error) {
    console.error('Hubo un error al importar los usuarios:', error)
    response.writeHead(500, {
      'Content-Type': 'application/json; charset=utf-8'
    })
    response.end(JSON.stringify({ error: 'Error interno del servidor' }))
  }
}
