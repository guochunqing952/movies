import Mongoose from 'mongoose';
import { Movie } from '../entities/Movie';

// 接口同时拥有Movie和mongoose的属性，便于类型检查
export interface IMovie extends Movie, Mongoose.Document {}

// 范型是代码书写中进行类型检查，定义的类型是在运行中进行类型检查
const movieSchema = new Mongoose.Schema<IMovie>(
  {
    name: String,
    types: [String],
    areas: [String],
    timeLong: Number,
    isHot: Boolean,
    isComing: Boolean,
    pisClassic: Boolean,
    description: String,
    poster: String,
  },
  {
    versionKey: false,
  }
);

// 导出的是一个movie
export default Mongoose.model<IMovie>('Movie', movieSchema);
