import express from 'express';
import apiController from '../controllers/apiController';
import checks from '../middleware/checks';
import validarCheck from '../middleware/validarCheck';
import validarToken from "../middleware/validarJWT";
const router = express.Router();

router.get('/ver/proyecto-a',validarToken,apiController.verComidas);
router.post('/crear/proyecto-a',validarToken ,checks ,validarCheck ,apiController.guardarComida);
router.get('/ver/proyecto-b', apiController.apiVerComidas);
router.post('/crear/proyecto-b', apiController.apiCrearComidas);


export default router;