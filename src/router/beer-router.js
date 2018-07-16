import multer from 'multer';
import { Router } from 'express';
import HttpErrors from 'http-errors';
import bearerAuthMiddleware from '../lib/middleware/bearer-auth-middleware';
import Beer from '../model/beer';
import { s3Upload } from '../lib/s3';
import logger from '../lib/logger';

const multerUpload = multer({ dest: `${__dirname}/../temp` });

const beerRouter = new Router();

beerRouter.post('/api/beer', bearerAuthMiddleware, multerUpload.any(), (request, response, next) => {
  if (!request.account) return next(new HttpErrors(401, 'beer ROUTER POST ERROR: not authorized'));

  if (!request.body.title || request.files.length > 1) {
    return next(new HttpErrors(400, 'beer ROUTER POST ERROR: invalid request'));
  }

  const [file] = request.files;

  logger.log(logger.INFO, `beer ROUTER POST: valid file ready to to upload: ${JSON.stringify(file, null, 2)}`);

  const key = `${file.filename}.${file.originalname}`;
  return s3Upload(file.path, key)
    .then((url) => {
      logger.log(logger.INFO, `beer ROUTER POST: received a valid URL from Amazon S3: ${url}`);

      return new Beer({
        title: request.body.title,
        accountId: request.account._id,
        fileName: key,
        url,
      }).save();
    })
    .then((newBeer) => {
      logger.log(logger.INFO, `beer ROUTER POST: new beer created: ${JSON.stringify(newBeer, null, 2)}`);
      return response.json(newBeer);
    })
    .catch(next); 
});

beerRouter.get('/api/beer/:id?', bearerAuthMiddleware, (request, response, next) => {
  if (!request.account) return next(new HttpErrors(401), 'beer ROUTER GET: invalid request');
  if (!request.params.id) return next(new HttpErrors(400, 'beer ROUTER GET: no id provided'));

  return Beer.findById(request.params.id)
    .then((beer) => {
      if (!beer) return next(new HttpErrors(404, 'beer ROUTER GET: no beer found'));
      logger.log(logger.INFO, `beer ROUTER GET: successfully found beer ${JSON.stringify(beer, null, 2)}`);
      return response.json(beer);
    })
    .catch(next);
});

export default beerRouter;
