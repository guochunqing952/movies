import { IsInt, Min, validate } from 'class-validator';
import { Type, plainToClass } from 'class-transformer';
import 'reflect-metadata';
import { BaseEntity } from './BaseEntity';

// 对电影的搜索条件进行限制
export class SearchCondition extends BaseEntity {
  // 当前页码
  @IsInt({ message: '页码必须是整数' })
  @Min(1, { message: '页码最小是1' })
  @Type(() => Number)
  public page: number = 1;

  // 每页显示信息
  @IsInt({ message: '页容量必须是整数' })
  @Min(1, { message: '页码最小是1' })
  @Type(() => Number)
  public limit: number = 10;

  // 搜索关键字
  @Type(() => String)
  public key: string = '';

  // 将一个平面对象转换成SearchCondition对象;
  public static transform(plainObject: object): SearchCondition {
    if (plainObject instanceof SearchCondition) {
      return plainObject;
    }
    return plainToClass(SearchCondition, plainObject);
  }
}
