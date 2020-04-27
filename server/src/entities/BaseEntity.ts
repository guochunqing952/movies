import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';

export class BaseEntity {
  // 验证电影对象,如果有错误，将错误放在一个数组中一起显示
  public async validateThis(skipMissing = false): Promise<string[]> {
    const errors = await validate(this, {
      skipMissingProperties: skipMissing,
    });
    const temp = errors.map((err) => {
      if (err.constraints) {
        return Object.values(err.constraints);
      }
    });
    const result: string[] = [];
    temp.forEach((t) => {
      if (t) {
        return result.push(...t);
      }
    });
    return result;
  }
}
