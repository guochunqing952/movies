"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
require("reflect-metadata");
const BaseEntity_1 = require("./BaseEntity");
class Movie extends BaseEntity_1.BaseEntity {
    static transform(plainObject) {
        if (plainObject instanceof Movie) {
            return plainObject;
        }
        return class_transformer_1.plainToClass(Movie, plainObject);
    }
}
__decorate([
    class_validator_1.IsNotEmpty({ message: '名称不可以为空' }),
    class_transformer_1.Type(() => String),
    __metadata("design:type", String)
], Movie.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: '类型不可以为空' }),
    class_validator_1.ArrayMinSize(1, { message: '电影类型>=1' }),
    class_validator_1.IsArray({ message: '电影类型必须是数组' }),
    class_transformer_1.Type(() => String),
    __metadata("design:type", Array)
], Movie.prototype, "types", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: '地区不可以为空' }),
    class_validator_1.ArrayMinSize(1, { message: '地区>=1' }),
    class_validator_1.IsArray({ message: '电影地区必须是数组' }),
    class_transformer_1.Type(() => String),
    __metadata("design:type", Array)
], Movie.prototype, "areas", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: '时长不可以为空' }),
    class_validator_1.IsInt({ message: '时长必须是整数' }),
    class_validator_1.Min(1, { message: '时长最小1分钟' }),
    class_validator_1.Max(99999, { message: '时长过长' }),
    class_transformer_1.Type(() => Number),
    __metadata("design:type", Number)
], Movie.prototype, "timeLong", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: '是否热映不可以为空' }),
    class_transformer_1.Type(() => Boolean),
    __metadata("design:type", Boolean)
], Movie.prototype, "isHot", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: '是否即将热映不可以为空' }),
    class_transformer_1.Type(() => Boolean),
    __metadata("design:type", Boolean)
], Movie.prototype, "isComing", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: '是否经典影片不可以为空' }),
    class_transformer_1.Type(() => Boolean),
    __metadata("design:type", Boolean)
], Movie.prototype, "isClassic", void 0);
__decorate([
    class_transformer_1.Type(() => String),
    __metadata("design:type", String)
], Movie.prototype, "description", void 0);
__decorate([
    class_transformer_1.Type(() => String),
    __metadata("design:type", String)
], Movie.prototype, "poster", void 0);
exports.Movie = Movie;
