import express from 'express';
import bodyParser from "body-parser";
import { AddDiseaseController, GetDiseaseController, getDiseaseByTextController, UpdateDiseaseController, RemoveDiseaseController } from "@src/delivery/controller/disease";
import { DiseaseGateway } from "@src/infrastructure/db/mongoose";
import { adaptRoute } from "../../adapter";

const jsonParser = bodyParser.json();

const router = express.Router();

/* pesquisa artigos dado um texto como filtro */
router.get('/searchDisease', jsonParser, adaptRoute(new getDiseaseByTextController(new DiseaseGateway())));
/* pega todos os artigos ou um artigo especifico caso venha com o id parametro*/
router.get('/:id?', jsonParser, adaptRoute(new GetDiseaseController(new DiseaseGateway())));
/* adiciona novo artigo */
router.post('/', jsonParser, adaptRoute(new AddDiseaseController(new DiseaseGateway())));
/* atualiza um artigo especificando o id */
router.put('/:id', jsonParser, adaptRoute(new UpdateDiseaseController(new DiseaseGateway())));
/* remove um artigo especificando um id */
router.delete('/:id?', jsonParser, adaptRoute(new RemoveDiseaseController(new DiseaseGateway())));

export const diseaseRoute = router;
