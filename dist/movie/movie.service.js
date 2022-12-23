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
exports.MovieService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const movie_model_1 = require("./movie.model");
let MovieService = class MovieService {
    constructor(MovieModel) {
        this.MovieModel = MovieModel;
    }
    async getAll(searchTerm) {
        let options = {};
        if (searchTerm)
            options = {
                $or: [
                    {
                        title: new RegExp(searchTerm, 'i'),
                    },
                ],
            };
        return this.MovieModel.find(options)
            .select('-password -updatedAt -__v')
            .sort({ createdAt: 'desc' })
            .populate('actors genres')
            .exec();
    }
    async bySlug(slug) {
        const doc = await this.MovieModel.findOne({ slug })
            .populate('actors genres')
            .exec();
        if (!doc)
            throw new common_1.NotFoundException('Movie not found');
        return doc;
    }
    async byActor(actorId) {
        const docs = await this.MovieModel.find({ actors: actorId }).exec();
        if (!docs)
            throw new common_1.NotFoundException('Movies not found');
        return docs;
    }
    async byGenres(genreIds) {
        return this.MovieModel.find({ genres: { $in: genreIds } }).exec();
    }
    async getCollections() {
        const movies = await this.getAll();
        const collections = movies;
        return collections;
    }
    async getMostPopular() {
        return this.MovieModel.find({ countOpened: { $gt: 0 } })
            .populate('genres')
            .sort({ countOpened: -1 })
            .exec();
    }
    async updateCountOpened(slug) {
        const updateDoc = await this.MovieModel.findOneAndUpdate({ slug }, {
            $inc: { countOpened: 1 },
        }, {
            new: true,
        }).exec();
        if (!updateDoc)
            throw new common_1.NotFoundException('Movie not found');
        return updateDoc;
    }
    async updateRating(id, newRating) {
        return this.MovieModel.findByIdAndUpdate(id, { rating: newRating }, { new: true }).exec();
    }
    async byId(_id) {
        const doc = await this.MovieModel.findById(_id);
        if (!doc)
            throw new common_1.NotFoundException('Movie not found');
        return doc;
    }
    async create() {
        const defaultValue = {
            bigPoster: '',
            actors: [],
            genres: [],
            poster: '',
            title: '',
            videoUrl: '',
            slug: '',
        };
        const actor = await this.MovieModel.create(defaultValue);
        return actor._id;
    }
    async update(_id, dto) {
        const updateDoc = await this.MovieModel.findByIdAndUpdate(_id, dto, {
            new: true,
        }).exec();
        if (!updateDoc)
            throw new common_1.NotFoundException('Movie not found');
        return updateDoc;
    }
    async delete(id) {
        const deleteDoc = await this.MovieModel.findByIdAndRemove(id).exec();
        if (!deleteDoc)
            throw new common_1.NotFoundException('Movie not found');
        return deleteDoc;
    }
};
MovieService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(movie_model_1.MovieModel)),
    __metadata("design:paramtypes", [Object])
], MovieService);
exports.MovieService = MovieService;
//# sourceMappingURL=movie.service.js.map