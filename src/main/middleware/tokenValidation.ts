import {Request, Response, NextFunction} from "express";
import * as jwt from "jsonwebtoken";
import config from "@src/main/config";

export function tokenValidation(req: Request, res: Response, next: NextFunction){
  const receivedToken= String(req.headers.token);
  if(!receivedToken){
    return res.status(401).json({error: "Unauthorize access"});
  }
  const parts = receivedToken.split(" ");
  if(parts.length !== 2){
    return res.status(401).json({error: "Unauthorize access"});
  }
  const [scheme, token] = parts;
  // Retorna acesso negado se o token não começar com Bearer
  if(!/^Bearer$/i.test(scheme)){
    return res.status(401).json({error: "Unauthorize access"});
  }
  jwt.verify(token, config.JWT_SECRET, (err, decoded)=>{
    if(err){
      console.log(err)
      return res.status(401).json({error: "Unauthorize access"});
    }
    return next();
  })
}
