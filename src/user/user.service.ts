import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { DesignerService } from './../designer/designer.service';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private designerService: DesignerService,
  ) {}

  async getUser(email: string): Promise<UserEntity> {
    try {
      return this.userRepository.findOneBy({ email });
    } catch (e) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
  async getUserByID(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['idDesigner'],
    });

    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }
  async getAllDesigners(): Promise<object> {
    try {
      const userDes = await this.userRepository.findBy({ role: 'designer' });
      const des = await this.designerService.getAllDesigner();
      try {
        userDes.sort((a, b) => a.id - b.id);
        console.log('userDes sorted');
        des.sort((a, b) => a.id - b.id);
        console.log('des sorted');
      } catch (err) {
        console.error(
          'нич не добре\nelement des\t' +
            des +
            '\nuser Des\t' +
            userDes +
            '\n' +
            err,
        );
      }
      return { userDes, des };
    } catch (e) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
  async getAllUsers(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find();
    } catch (e) {
      throw new HttpException('No one such user', HttpStatus.NOT_FOUND);
    }
  }

  async createUser(
    email: string,
    firstName: string,
    password: string,
    avatarURL: string,
    role: string,
    phoneNumber: string,
    country: string,
    age: number,
  ): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(password, 10);
    if (avatarURL === null) avatarURL = '';

    const lastName = ''; // comment
    let idDesigner = null;
    if (role === '') {
      role = 'user';
    } else if (role === 'designer') {
      const designer = await this.designerService.createDesigner();
      idDesigner = designer.id;
    }
    try {
      return this.userRepository.save({
        email,
        firstName,
        lastName,
        hashedPassword,
        avatarURL,
        role,
        phoneNumber,
        country,
        age,
        idDesigner,
      });
    } catch (error) {
      console.log('Error:' + error);
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, data: UpdateUserDTO): Promise<void> {
    await this.userRepository.update(id, data);
    //! if (data.role === 'designer') {
    // await this.designerService.update(id, data.idDesigner);
    // }
  }
  async updateAvatar(id: number, imgURL: string): Promise<void> {
    try {
      await this.userRepository.update(id, { avatarURL: imgURL });
    } catch (error) {
      throw new HttpException('Something wront', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number): Promise<void> {
    const userToDelete = await this.userRepository.findOne({
      where: { id },
      relations: ['idDesigner'],
    });
    if (!userToDelete) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    console.log('ID user to delete: ' + userToDelete.idDesigner.id);
    if (userToDelete.role === 'designer') {
      if (await this.designerService.getDesigner(userToDelete.idDesigner.id)) {
        await this.userRepository.delete(id);
      }
    }
    await this.designerService.delete(userToDelete.idDesigner.id);
  }
  async removeAvatar(id: number): Promise<void> {
    try {
      await this.userRepository.update(id, { avatarURL: '' });
    } catch (error) {
      throw new HttpException('Something wront', HttpStatus.BAD_REQUEST);
    }
  }

  async createAdmin(): Promise<UserEntity> {
    const email = 'tsipinoartemii@gmail.com';
    const firstName = 'admin';
    const lastName = 'Artemii';
    const password = 'q2w3e4r5';
    const avatarURL = '.';
    const role = 'admin';
    const phoneNumber = '';
    const country = 'Ukraine';
    const age = 19;

    const userEmail = await this.getUser(email);
    if (userEmail) {
      throw new HttpException('Admin already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      return this.userRepository.save({
        email,
        firstName,
        lastName,
        hashedPassword,
        avatarURL,
        role,
        phoneNumber,
        country,
        age,
      });
    } catch (error) {
      console.log('Error:' + error);
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    }
  }
}
