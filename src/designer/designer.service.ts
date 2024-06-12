import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DesignerEntity } from './designer.entity';
import { IUpdateDesigner } from './interfaces/update-designer.interfase';

@Injectable()
export class DesignerService {
  constructor(
    @InjectRepository(DesignerEntity)
    private designerRepository: Repository<DesignerEntity>,
  ) {}

  async getDesigner(id: number): Promise<DesignerEntity> {
    try {
      return this.designerRepository.findOneBy({ id });
    } catch (e) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
  async getAllDesigner(): Promise<DesignerEntity[]> {
    return await this.designerRepository.find();
  }
  async createDesigner(): Promise<DesignerEntity> {
    const country = 'Ukraine';
    const category = '';
    const salary = 0;
    const major = '';
    const experience = 0;
    const description = '';
    const sex = '';
    const age = 0;
    try {
      return this.designerRepository.save({
        country,
        category,
        salary,
        major,
        experience,
        description,
        sex,
        age,
      });
    } catch (error) {
      console.log('Error:' + error);
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    }
  }
  async update(id: number, data: IUpdateDesigner): Promise<void> {
    await this.designerRepository.update(id, data);
  }
  async delete(id: number): Promise<void> {
    await this.designerRepository.delete(id);
  }
}
