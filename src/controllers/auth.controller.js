import User from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js'

export const register = async (req, res) => {
    const {email, password, username} = req.body;

    try {
        // Entra un hast
        const passwordHash = await bcrypt.hash(password, 10) //Pra encriptar la contraseña

        // Se crea un nuevo usuario
        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });

        // Se guarda el nuevo usuario en la base de datos
        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id }) //Se crea un token para el nuevo usuario
        
        res.cookie('token', token);
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }   
};

export const login = (req, res) => res.send('Login');