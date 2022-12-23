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
exports.ActorService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const actor_model_1 = require("./actor.model");
let ActorService = class ActorService {
    constructor(ActorModel) {
        this.ActorModel = ActorModel;
    }
    async bySlug(slug) {
        const doc = await this.ActorModel.findOne({ slug }).exec();
        if (!doc)
            throw new common_1.NotFoundException('not found');
        return doc;
    }
    async getAll(searchTerm) {
        let options = {};
        if (searchTerm)
            options = {
                $or: [
                    {
                        name: new RegExp(searchTerm, 'i'),
                    },
                    {
                        slug: new RegExp(searchTerm, 'i'),
                    },
                ],
            };
        return this.ActorModel.aggregate()
            .match(options)
            .lookup({
            from: 'Movie',
            foreignField: 'actors',
            localField: '_id',
            as: 'movies',
        })
            .addFields({
            countMovies: {
                $size: '$movies',
            },
        })
            .project({ __v: 0, updatedAt: 0, movies: 0 })
            .sort({ createdAt: -1 })
            .exec();
    }
    async getCollections() {
        const actors = await this.getAll();
        const collections = actors;
        return collections;
    }
    async byId(_id) {
        const actor = await this.ActorModel.findById(_id);
        if (!actor)
            throw new common_1.NotFoundException('Genre not found');
        return actor;
    }
    async create() {
        const defaultValue = {
            name: '',
            slug: '',
            photo: '',
        };
        const actor = await this.ActorModel.create(defaultValue);
        return actor._id;
    }
    async update(_id, dto) {
        const updateDoc = await this.ActorModel.findByIdAndUpdate(_id, dto, {
            new: true,
        }).exec();
        if (!updateDoc)
            throw new common_1.NotFoundException('Genre not found');
        return updateDoc;
    }
    async delete(id) {
        const deleteDoc = await this.ActorModel.findByIdAndRemove(id).exec();
        if (!deleteDoc)
            throw new common_1.NotFoundException('Genre not found');
        return deleteDoc;
    }
};
ActorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(actor_model_1.ActorModel)),
    __metadata("design:paramtypes", [Object])
], ActorService);
exports.ActorService = ActorService;
//# sourceMappingURL=actor.service.js.map