import { Movie } from '../entities/Movie';
import { IMovie } from '../db/MovieSchema';
import { MovieModel } from '../db';
import { SearchCondition } from '../entities/SearchCondition';
import { ISearchResult } from '../entities/CommonTypes';

// 电影的增删改查功能
export class MovieService {
  // 增加一条电影功能
  public static async add(movie: Movie): Promise<IMovie | string[]> {
    // 1、转换类型
    movie = Movie.transform(movie);

    // 2、数据验证(异步的)
    const errors = await movie.validateThis();
    // 有错误的时候返回如下
    if (errors.length > 0) {
      return errors;
    }
    // 3、添加到数据库(异步)
    // 返回的正常的电影
    const result = await MovieModel.create(movie);
    return result;
  }

  // 修改一条电影
  public static async edit(id: string, movie: Movie): Promise<string[]> {
    // 1、转换类型
    movie = Movie.transform(movie);
    console.log(movie);

    // 2、数据验证(异步的)
    const errors = await movie.validateThis(true);
    // 有错误的时候返回如下
    if (errors.length > 0) {
      return errors;
    }
    // 3、修改电影信息到数据库(异步)
    // 返回的正常的电影
    await MovieModel.updateOne({ _id: id }, movie);
    return [];
  }

  // 删除一条电影
  public static async delete(id: string): Promise<void> {
    await MovieModel.deleteOne({ _id: id });
  }
  // 查找一条电影
  public static async findById(id: string): Promise<IMovie | null> {
    return await MovieModel.findById(id);
  }

  // 查找多条电影数据
  public static async find(
    condition: SearchCondition
  ): Promise<ISearchResult<Movie>> {
    // 1、条件转换类型
    const newCondition = SearchCondition.transform(condition);

    // 2、条件数据验证(异步的)
    const errors = await newCondition.validateThis(true);
    // 有错误的时候返回如下
    if (errors.length > 0) {
      return {
        count: 0,
        data: [],
        errors,
      };
    }

    // 3、进行查询
    // 先关键字查询，然后分页
    const movies = await MovieModel.find({
      name: { $regex: new RegExp(newCondition.key) },
    })
      .skip((newCondition.page - 1) * newCondition.limit)
      .limit(newCondition.limit);

    const count = await MovieModel.find({
      name: { $regex: new RegExp(newCondition.key) },
    }).countDocuments();

    return {
      count,
      data: movies,
      errors: [],
    };
  }
}
