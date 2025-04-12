import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

// me da información de la petición y respuesta y el next es una función que se llama para pasar al siguiente middleware
export const authRequired = (req, res, next) => {
  const { token } = req.cookies; //Se obtiene el token de la cookie

  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" }); //Si no hay token, manda un error de no autorizado

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = user; //De usuario que etoy decodificando voy a estar guardando todo dentro de req.user

    next();
  });
};
