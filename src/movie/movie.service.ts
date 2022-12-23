import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { MovieModel } from './movie.model'
import { UpdateMovieDto } from './updateMovie.dto'

@Injectable()
export class MovieService {
	constructor(
		@InjectModel(MovieModel) private readonly MovieModel: ModelType<MovieModel>
	) {}

	async getAll(searchTerm?: string) {
		let options = {}

		if (searchTerm)
			options = {
				$or: [
					{
						title: new RegExp(searchTerm, 'i'),
					},
				],
			}

		return this.MovieModel.find(options)
			.select('-password -updatedAt -__v')
			.sort({ createdAt: 'desc' })
			.populate('actors genres')
			.exec()
	}

	async bySlug(slug: string) {
		const doc = await this.MovieModel.findOne({ slug })
			.populate('actors genres')
			.exec()
		if (!doc) throw new NotFoundException('Movie not found')
		return doc
	}

	async byActor(actorId: Types.ObjectId) {
		const docs = await this.MovieModel.find({ actors: actorId }).exec()
		if (!docs) throw new NotFoundException('Movies not found')
		return docs
	}

	async byGenres(
		genreIds: Types.ObjectId[]
	): Promise<DocumentType<MovieModel>[]> {
		return this.MovieModel.find({ genres: { $in: genreIds } }).exec()
	}
	async getCollections() {
		const movies = await this.getAll()
		const collections = movies
		/*need will write */
		return collections
	}

	async getMostPopular() {
		return this.MovieModel.find({ countOpened: { $gt: 0 } })
			.populate('genres')
			.sort({ countOpened: -1 })
			.exec()
	}

	async updateCountOpened(slug: string) {
		const updateDoc = await this.MovieModel.findOneAndUpdate(
			{ slug },
			{
				$inc: { countOpened: 1 },
			},
			{
				new: true,
			}
		).exec()
		if (!updateDoc) throw new NotFoundException('Movie not found')
		return updateDoc
	}

	async updateRating(id: Types.ObjectId, newRating: number) {
		return this.MovieModel.findByIdAndUpdate(
			id,
			{ rating: newRating },
			{ new: true }
		).exec()
	}

	/*Admin place*/

	async byId(_id: string) {
		const doc = await this.MovieModel.findById(_id)
		if (!doc) throw new NotFoundException('Movie not found')
		return doc
	}
	async create() {
		const defaultValue: UpdateMovieDto = {
			bigPoster: '',
			actors: [],
			genres: [],
			poster: '',
			title: '',
			videoUrl: '',
			slug: '',
		}
		const actor = await this.MovieModel.create(defaultValue)
		return actor._id
	}

	async update(_id: string, dto: UpdateMovieDto) {
		const updateDoc = await this.MovieModel.findByIdAndUpdate(_id, dto, {
			new: true,
		}).exec()
		if (!updateDoc) throw new NotFoundException('Movie not found')
		return updateDoc
	}

	async delete(id: string) {
		const deleteDoc = await this.MovieModel.findByIdAndRemove(id).exec()

		if (!deleteDoc) throw new NotFoundException('Movie not found')

		return deleteDoc
	}
}
