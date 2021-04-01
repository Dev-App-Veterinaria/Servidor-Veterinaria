import {Request, Response, NextFunction} from 'express'

export function tokenValidation(request: Request, res: Response, next: NextFunction){
  const receivedToken = request.headers.token;
  if(receivedToken !== "test"){
    console.error(`invalid token: ${receivedToken}`)
    return res.status(401).json({error: "Unauthorize access"});
  }else{
    next();
  }
}
