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
exports.ActorController = void 0;
const actor_dto_1 = require("./actor.dto");
const actor_service_1 = require("./actor.service");
const common_1 = require("@nestjs/common");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const id_validation_pipe_1 = require("../pipes/id.validation.pipe");
let ActorController = class ActorController {
    constructor(actorService) {
        this.actorService = actorService;
    }
    async bySlug(slug) {
        return this.actorService.bySlug(slug);
    }
    async getAll(searchTerm) {
        return this.actorService.getAll(searchTerm);
    }
    async get(id) {
        return this.actorService.byId(id);
    }
    async update(id, dto) {
        return this.actorService.update(id, dto);
    }
    async create() {
        return this.actorService.create();
    }
    async delete(id) {
        return this.actorService.delete(id);
    }
};
__decorate([
    (0, common_1.Get)('by-slug/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ActorController.prototype, "bySlug", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('searchTerm')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ActorController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, auth_decorator_1.Auth)('admin'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ActorController.prototype, "get", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(200),
    (0, auth_decorator_1.Auth)('admin'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, actor_dto_1.ActorDto]),
    __metadata("design:returntype", Promise)
], ActorController.prototype, "update", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(200),
    (0, auth_decorator_1.Auth)('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ActorController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(200),
    (0, auth_decorator_1.Auth)('admin'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ActorController.prototype, "delete", null);
ActorController = __decorate([
    (0, common_1.Controller)('actors'),
    __metadata("design:paramtypes", [actor_service_1.ActorService])
], ActorController);
exports.ActorController = ActorController;
//# sourceMappingURL=actor.controller.js.map