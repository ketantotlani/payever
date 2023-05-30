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
exports.AvatarService = void 0;
const common_1 = require("@nestjs/common");
const avatar_repository_1 = require("./avatar.repository");
let AvatarService = class AvatarService {
    constructor(avatarRepository) {
        this.avatarRepository = avatarRepository;
    }
    async getAvatarById(userId) {
        const response = await this.avatarRepository.findOne({ userId });
        if (!response) {
            return null;
        }
        return response;
    }
    async createAvatar({ id, hash, avatar }) {
        const avatarDb = await this.avatarRepository.createAvatar({
            id,
            hash,
            avatar,
        });
        return avatarDb;
    }
    async deleteUserAvatar(userId) {
        return this.avatarRepository.findOneAndRemove(new Number(userId));
    }
};
AvatarService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [avatar_repository_1.AvatarRepository])
], AvatarService);
exports.AvatarService = AvatarService;
//# sourceMappingURL=avatar.services.js.map