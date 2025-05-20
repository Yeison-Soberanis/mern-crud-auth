import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const userFound = await User.findOne({ email }); //Busca el usuario por el email
    if (userFound) return res.status(400).json(["The email is already in use"]); //Si lo encuentra, manda un error

    // Entra un hast
    const passwordHash = await bcrypt.hash(password, 10); //Pra encriptar la contraseña

    // Se crea un nuevo usuario
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    // Se guarda el nuevo usuario en la base de datos
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id }); //Se crea un token para el nuevo usuario

    res.cookie("token", token);
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

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email }); //Busca el usuario por el email
    if (!userFound) return res.status(400).json({ message: "User not found" }); //Si no lo encuentra, manda un error
    // Entra un hast
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" }); //Si no coincide la contraseña, manda un error

    const token = await createAccessToken({ id: userFound._id }); //Se crea un token para el nuevo usuario

    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound) return res.status(400).json({ message: "User not found" }); //Si no lo encuentra, manda un error

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};
