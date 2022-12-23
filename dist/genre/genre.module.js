"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreModule = void 0;
const movie_module_1 = require("../movie/movie.module");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const common_1 = require("@nestjs/common");
const genre_controller_1 = require("./genre.controller");
const genre_service_1 = require("./genre.service");
const genre_model_1 = require("./genre.model");
let GenreModule = class GenreModule {
};
GenreModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: genre_model_1.GenreModel,
                    schemaOptions: {
                        collection: 'Genre',
                    },
                },
            ]),
            movie_module_1.MovieModule,
        ],
        controllers: [genre_controller_1.GenreController],
        providers: [genre_service_1.GenreService],
    })
], GenreModule);
exports.GenreModule = GenreModule;
//# sourceMappingURL=genre.module.js.map