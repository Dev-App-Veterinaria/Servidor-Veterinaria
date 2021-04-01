import express from 'express';
import bodyParser from "body-parser";
import { AddArticleController, GetArticleController, getArticleByTextController, UpdateArticleController, RemoveArticleController } from "@src/delivery/controller/article";
import { ArticleGateway } from "@src/infrastructure/db/mongoose";
import { adaptRoute } from "../../adapter";
import {tokenValidation} from "../../middleware/tokenValidation";

const jsonParser = bodyParser.json();

const router = express.Router();

/* pesquisa artigos dado um texto como filtro */
router.get('/searchArticle', jsonParser, adaptRoute(new getArticleByTextController(new ArticleGateway())));
/* pega todos os artigos ou um artigo especifico caso venha com o id parametro*/
router.get('/:id?', jsonParser, adaptRoute(new GetArticleController(new ArticleGateway())));
/* adiciona novo artigo */
router.post('/', jsonParser, tokenValidation, adaptRoute(new AddArticleController(new ArticleGateway())));
/* atualiza um artigo especificando o id */
router.put('/:id', jsonParser, tokenValidation, adaptRoute(new UpdateArticleController(new ArticleGateway())));
/* remove um artigo especificando um id */
router.delete('/:id?', jsonParser, tokenValidation, adaptRoute(new RemoveArticleController(new ArticleGateway())));

export const articleRoute = router;
