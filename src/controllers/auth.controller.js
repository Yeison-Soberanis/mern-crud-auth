import User from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

        // Se crea un token para el nuevo usuario
        jwt.sign(
            {
                id: userSaved._id,
            },
            "secret123",
            {
                expiresIn: "1d",
            },
            (err, token) => {
                if (err) console.log(err);
                res.cookie('token', token)
                res.json({
                    mensaje: 'user created successfully',
                })
            }
        );

        // res.json({
        //     id: userSaved._id,
        //     username: userSaved.username,
        //     email: userSaved.email,
        //     createdAt: userSaved.createdAt,
        //     updatedAt: userSaved.updatedAt,
        // });
    } catch (error) {
        console.log(error);
    }
    
}

export const login = (req, res) => res.send('Login');