/// <reference types="multer" />
import { FileResponse } from './file.interface';
export declare class FileService {
    saveFiles(files: Express.Multer.File[], folder?: string): Promise<FileResponse[]>;
}
