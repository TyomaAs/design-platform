import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PortfolioEntity } from './portfolio.entity';
import { DesignerEntity } from './../designer/designer.entity';
import { UploaderService } from './../uploader/uploader.service';
import { UPLOAD_FOLDER_PATHS } from './../common/constants/upload-folder-paths.constant';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(PortfolioEntity)
    private portfolioRepository: Repository<PortfolioEntity>,
    private uploaderService: UploaderService,
  ) {}

  async savePhoto(
    idDesigner: DesignerEntity,
    imgURL: string,
  ): Promise<PortfolioEntity> {
    {
      try {
        const photoToSave = await this.portfolioRepository.save({
          imgURL,
          designer: idDesigner,
          idDesigner: idDesigner.id,
        });
        console.log('Good');

        return photoToSave;
      } catch (error) {
        console.log('Error: ' + error);
        throw new HttpException('Error send to DB', HttpStatus.BAD_REQUEST);
      }
    }
  }

  async getImages(idDesigner: number): Promise<PortfolioEntity[]> {
    return this.portfolioRepository.findBy({ idDesigner });
  }

  async deletePhoto(id: number): Promise<void> {
    const photo = await this.portfolioRepository.findOneBy({ id });
    this.uploaderService.deleteFile(
      `${UPLOAD_FOLDER_PATHS.PORTFOLIO}/${photo.imgURL}`,
    );
    console.log(id);
    try {
      await this.portfolioRepository.delete(id);
    } catch (error) {
      console.log('Error: ' + error);
      throw new HttpException('Not found this photo', HttpStatus.NOT_FOUND);
    }
  }
}
