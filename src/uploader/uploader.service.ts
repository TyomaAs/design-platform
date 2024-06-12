import { Injectable } from '@nestjs/common';
import { extname, join } from 'path';
import { randomUUID } from 'node:crypto';
import { existsSync, unlinkSync, writeFileSync } from 'fs';
import { UploaderError } from './errors/uploader.error';
import { SUPPORTED_IMAGE_MIMETYPES } from '../common/constants/supported-image-mimetype.constant';

@Injectable()
export class UploaderService {
  public async uploadImage(
    file: Express.Multer.File,
    uploadFolderPath: string,
    fileName: string = randomUUID(),
  ): Promise<string> {
    const { buffer, originalname, mimetype } = await file;

    if (!SUPPORTED_IMAGE_MIMETYPES.includes(mimetype)) {
      throw UploaderError.UnsupportedMediaType();
    }

    const fullFilename = fileName + extname(originalname);
    const filePath = join(uploadFolderPath, fullFilename);

    try {
      await writeFileSync(filePath, buffer);

      return fullFilename;
    } catch (error) {
      await this.deleteFile(filePath);
      throw new error();
    }
  }

  public async deleteFile(filePath: string): Promise<void> {
    if (existsSync(filePath)) unlinkSync(filePath);
  }
}
