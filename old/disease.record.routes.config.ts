import express from 'express';
import { body } from 'express-validator';
import diseaseRecordController from '../controllers/disease.record.controller';
import bodyValidationMiddleware from '../middlewares/body.validation.middleware';
import diseaseRecordMiddleware from '../middlewares/disease.record.middleware';
import { CommonRoutesConfig } from './common.routes.config';

export class DiseaseRecordRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'DiseaseRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route('/api/disease-records')
      .get(diseaseRecordController.readAll)
      .post(
        // veterinaryMiddleware.validateVeterinaryExistsByBody,
        body('name').isString(),
        body('description').isString().optional(),
        bodyValidationMiddleware.verifyBodyFieldsErrors,
        diseaseRecordController.create,
      )
      .delete(diseaseRecordController.deleteAll);

    this.app
      .route('/api/disease-records/:id')
      .all(diseaseRecordMiddleware.validateDiseaseRecordExistsByParams)
      .get(diseaseRecordController.read)
      .put(
        // veterinaryMiddleware.validateVeterinaryExistsByBody,
        body('name').isString(),
        body('description').isString(),
        bodyValidationMiddleware.verifyBodyFieldsErrors,
        diseaseRecordController.update,
      )
      .patch(
        body('name').isString().optional(),
        body('description').isString().optional(),
        bodyValidationMiddleware.verifyBodyFieldsErrors,
        diseaseRecordController.update,
      )
      .delete(diseaseRecordController.delete);

    return this.app;
  }
}
