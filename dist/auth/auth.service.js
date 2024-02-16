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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const exceptions_handler_1 = require("@nestjs/core/exceptions/exceptions-handler");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async validateUser(login) {
        try {
            if (!(login.password.length > 8))
                throw new common_1.BadRequestException('Your password must be more than 8 characters');
            const existingUser = await this.userService.getUserByEmailOrUsername(login.username);
            if (!existingUser)
                throw new common_1.BadRequestException(`Username: ${login.username} doesn't exist`);
            const passwordIsValid = await bcrypt.compare(login.password, existingUser.password);
            if (!passwordIsValid)
                throw new common_1.BadRequestException(`Invalid Password`);
            const payload = { username: existingUser.username, id: existingUser.id };
            const options = {
                secret: 'secret-key',
                expiresIn: '1h'
            };
            return this.jwtService.sign(payload, options);
        }
        catch (e) {
            throw new exceptions_handler_1.ExceptionsHandler(e.message || e.detail);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map