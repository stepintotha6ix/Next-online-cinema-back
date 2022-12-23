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
exports.MovieController = void 0;
const mongoose_1 = require("mongoose");
const updateMovie_dto_1 = require("./updateMovie.dto");
const id_validation_pipe_1 = require("./../pipes/id.validation.pipe");
const common_1 = require("@nestjs/common");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const movie_service_1 = require("./movie.service");
let MovieController = class MovieController {
    constructor(MovieService) {
        this.MovieService = MovieService;
    }
    async bySlug(slug) {
        return this.MovieService.bySlug(slug);
    }
    async byActor(actorId) {
        return this.MovieService.byActor(actorId);
    }
    async byGenres(genreIds) {
        return this.MovieService.byGenres(genreIds);
    }
    async getAll(searchTerm) {
        return this.MovieService.getAll(searchTerm);
    }
    async getMostPopular() {
        return this.MovieService.getMostPopular();
    }
    async updateCountOpened(slug) {
        return this.MovieService.updateCountOpened(slug);
    }
    async get(id) {
        return this.MovieService.byId(id);
    }
    async update(id, dto) {
        return this.MovieService.update(id, dto);
    }
    async create() {
        return this.MovieService.create();
    }
    async delete(id) {
        return this.MovieService.delete(id);
    }
};
__decorate([
    (0, common_1.Get)('by-slug/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "bySlug", null);
__decorate([
    (0, common_1.Get)('by-actor/:actorId'),
    __param(0, (0, common_1.Param)('actorId', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "byActor", null);
__decorate([
    (0, common_1.Post)('by-genres'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)('genreIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "byGenres", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('searchTerm')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('most-popular'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "getMostPopular", null);
__decorate([
    (0, common_1.Put)('update-count-opened'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "updateCountOpened", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, auth_decorator_1.Auth)('admin'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "get", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(200),
    (0, auth_decorator_1.Auth)('admin'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateMovie_dto_1.UpdateMovieDto]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "update", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(200),
    (0, auth_decorator_1.Auth)('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(200),
    (0, auth_decorator_1.Auth)('admin'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "delete", null);
MovieController = __decorate([
    (0, common_1.Controller)('movies'),
    __metadata("design:paramtypes", [movie_service_1.MovieService])
], MovieController);
exports.MovieController = MovieController;
//# sourceMappingURL=movie.controller.js.map