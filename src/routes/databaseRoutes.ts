import { Router } from 'express';
import { body} from 'express-validator';
import { handleErrors } from '../middleware/Validation';
import { dataController } from '../controllers/databaseController';

const router=Router()
    router.post('/data',
        body('database')
        .isString().withMessage('El nombre de la base de datos no puede ser un numero')
        .notEmpty().withMessage('El nombre de la base de datos es necesario'),
        body('data')
        .isArray({min:1}).withMessage('Al menos un campo ingresado'),
        handleErrors,
        dataController.updateData)
export default router
