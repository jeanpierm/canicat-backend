import debug from 'debug';
import express from 'express';
import userService from '../services/user.service';

const log: debug.IDebugger = debug('app:user-controller');

class UserMiddleware {
  async validateUserExistsByParams(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const { id } = req.params;
    const record = await userService.getById(id);
    if (!record) {
      return res
        .status(404)
        .send({ error: `El usuario ${id} no fue encontrado` });
    }
    res.locals.user = record;
    next();
  }
}

export default new UserMiddleware();
