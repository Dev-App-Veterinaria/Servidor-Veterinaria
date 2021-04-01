import express from 'express';
import bodyParser from "body-parser";
import { AddUserController, AuthenticateUserController, GetUserController, UpdateUserController, RemoveUserController } from "@src/delivery/controller/user";
import { UserGateway } from "@src/infrastructure/db/mongoose";
import { adaptRoute } from "../../adapter";
import {tokenValidation} from "../../middleware/tokenValidation";

const jsonParser = bodyParser.json();

const router = express.Router();

/* pega todos os artigos ou um artigo especifico caso venha com o id parametro*/
router.get('/:id?', jsonParser, tokenValidation, adaptRoute(new GetUserController(new UserGateway())));
/* adiciona novo artigo */
router.post('/', jsonParser, tokenValidation, adaptRoute(new AddUserController(new UserGateway())));
/* atualiza um artigo especificando o id */
router.put('/:id', jsonParser, tokenValidation, adaptRoute(new UpdateUserController(new UserGateway())));
/* remove um artigo especificando um id */
router.delete('/:id?', jsonParser, tokenValidation, adaptRoute(new RemoveUserController(new UserGateway())));
/* faz o login do usuário ao retornar um token se a senha estiver correta*/
router.post('/login', jsonParser, adaptRoute(new AuthenticateUserController(new UserGateway)));

export const userRoute = router;
