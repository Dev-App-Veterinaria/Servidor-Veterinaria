import express from 'express';
import bodyParser from "body-parser";
import { AddUserController, GetUserController, UpdateUserController, RemoveUserController } from "@src/delivery/controller/user";
import { UserGateway } from "@src/infrastructure/db/mongoose";
import { adaptRoute } from "../../adapter";

const jsonParser = bodyParser.json();

const router = express.Router();

/* pega todos os artigos ou um artigo especifico caso venha com o id parametro*/
router.get('/:id?', jsonParser, adaptRoute(new GetUserController(new UserGateway())));
/* adiciona novo artigo */
router.post('/', jsonParser, adaptRoute(new AddUserController(new UserGateway())));
/* atualiza um artigo especificando o id */
router.put('/:id', jsonParser, adaptRoute(new UpdateUserController(new UserGateway())));
/* remove um artigo especificando um id */
router.delete('/:id?', jsonParser, adaptRoute(new RemoveUserController(new UserGateway())));

export const userRoute = router;
