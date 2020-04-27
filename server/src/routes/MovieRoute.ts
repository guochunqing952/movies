import Express from 'express';
import { MovieService } from '../services/MovieServices';
import { ResponseHelper } from './ResponseHelper';

const router = Express.Router();

router.get('/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await MovieService.findById(movieId);
    // 响应：服务器的响应格式，往往是一种标准格式
    ResponseHelper.sendData(movie, res);
  } catch {
    ResponseHelper.sendData(null, res);
  }
});

router.get('/', async (req, res) => {
  console.log(req.query);
  const conditon: any = req.query;
  const result = await MovieService.find(conditon);
  ResponseHelper.sendPageData(result, res);
});

router.post('/', async (req, res) => {
  const result = await MovieService.add(req.body);
  if (Array.isArray(result)) {
    ResponseHelper.sendError(result, res);
  } else {
    ResponseHelper.sendData(result, res);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const result = await MovieService.edit(req.params.id, req.body);
    if (result.length > 0) {
      ResponseHelper.sendError(result, res);
    } else {
      ResponseHelper.sendData(true, res);
    }
  } catch {
    ResponseHelper.sendError('id错误', res);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await MovieService.delete(req.params.id);
    ResponseHelper.sendData(true, res);
  } catch {
    ResponseHelper.sendError('id错误', res);
  }
});

export default router;
