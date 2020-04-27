import {
  IsNotEmpty,
  MinLength,
  ArrayMinSize,
  IsInt,
  Min,
  Max,
  IsArray,
  validate,
} from 'class-validator';
import { Type, plainToClass } from 'class-transformer';
import 'reflect-metadata';
import { BaseEntity } from './BaseEntity';

export class Movie extends BaseEntity {
  // 电影名称
  @IsNotEmpty({ message: '名称不可以为空' })
  @Type(() => String)
  public name: string;

  // 电影类型
  @IsNotEmpty({ message: '类型不可以为空' })
  @ArrayMinSize(1, { message: '电影类型>=1' })
  @IsArray({ message: '电影类型必须是数组' })
  @Type(() => String)
  public types: string[];

  // 电影上映地区
  @IsNotEmpty({ message: '地区不可以为空' })
  @ArrayMinSize(1, { message: '地区>=1' })
  @IsArray({ message: '电影地区必须是数组' })
  @Type(() => String)
  public areas: string[];

  // 电影时长
  @IsNotEmpty({ message: '时长不可以为空' })
  @IsInt({ message: '时长必须是整数' })
  @Min(1, { message: '时长最小1分钟' })
  @Max(99999, { message: '时长过长' })
  @Type(() => Number)
  public timeLong: number;

  // 电影是否热映
  @IsNotEmpty({ message: '是否热映不可以为空' })
  @Type(() => Boolean)
  public isHot: boolean;

  // 电影是否即将上映
  @IsNotEmpty({ message: '是否即将热映不可以为空' })
  @Type(() => Boolean)
  public isComing: boolean;

  // 是否是经典影片
  @IsNotEmpty({ message: '是否经典影片不可以为空' })
  @Type(() => Boolean)
  public isClassic: boolean;

  // 电影简介
  @Type(() => String)
  public description?: string;

  // 海报
  @Type(() => String)
  public poster?: string;

  // 将一个平面对象转换成movie对象;
  public static transform(plainObject: object): Movie {
    if (plainObject instanceof Movie) {
      return plainObject;
    }
    return plainToClass(Movie, plainObject);
  }
}
