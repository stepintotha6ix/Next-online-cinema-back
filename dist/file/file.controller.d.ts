/// <reference types="multer" />
import { FileService } from './file.service';
import { FileResponse } from './file.interface';
export declare class FileController {
    private readonly filesService;
    constructor(filesService: FileService);
    uploadFile(file: Express.Multer.File, folder?: string): Promise<FileResponse[]>;
}
