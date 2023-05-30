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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const avatar_schema_1 = require("./schemas/avatar.schema");
let AvatarRepository = class AvatarRepository {
    constructor(avatarModel) {
        this.avatarModel = avatarModel;
    }
    async findOne(userFilterQuery) {
        return this.avatarModel.findOne(userFilterQuery);
    }
    async createAvatar(avatar) {
        const newUser = new this.avatarModel(avatar);
        return newUser.save();
    }
    async findOneAndRemove(userFilterQuery) {
        return await this.avatarModel.findOneAndRemove(userFilterQuery);
    }
};
AvatarRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(avatar_schema_1.Avatar.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AvatarRepository);
exports.AvatarRepository = AvatarRepository;
//# sourceMappingURL=avatar.repository.js.map