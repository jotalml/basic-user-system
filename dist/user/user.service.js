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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const pagedResponse_1 = require("../models/entity/pagedResponse");
const user_1 = require("../models/entity/user");
const typeorm_2 = require("typeorm");
let UserService = class UserService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async getAllUsers(page, count) {
        const totalElements = await this.usersRepository.count({
            take: count,
            skip: count * (page - 1)
        });
        const result = await this.usersRepository.find({
            take: count,
            skip: count * (page - 1)
        });
        if (count > result.length)
            count = result.length;
        if (!(result.length > 0))
            throw new common_1.BadRequestException('No Users Found');
        const totalPages = Math.ceil(totalElements / count);
        const pagedResponse = new pagedResponse_1.PagedResponse();
        pagedResponse.page = page;
        pagedResponse.count = count;
        pagedResponse.totalElements = totalElements;
        pagedResponse.totalPages = totalPages;
        pagedResponse.content = result;
        return pagedResponse;
    }
    async getUserById(id) {
        try {
            const user = await this.usersRepository.findOneBy({ id: id });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            return user;
        }
        catch (e) {
            throw new common_1.BadRequestException(e.detail);
        }
    }
    async createUser(user) {
        try {
            return this.usersRepository.save(user);
        }
        catch (e) {
            throw new common_1.BadRequestException(e.detail);
        }
    }
    async updateUser(id, user) {
        try {
            const updatedUser = await this.usersRepository.findOneBy({ id: id });
            if (!updatedUser) {
                throw new common_1.NotFoundException('User not found');
            }
            await this.usersRepository.update(id, user);
            return await this.usersRepository.findOneBy({ id: id });
        }
        catch (e) {
            throw new common_1.BadRequestException(e.detail);
        }
    }
    async deleteUser(id) {
        try {
            const user = await this.usersRepository.findOneBy({ id: id });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            this.usersRepository.delete({ id: id });
            return {
                message: `user ${user.username} has been deleted`
            };
        }
        catch (e) {
            throw new common_1.BadRequestException(e.detail);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map