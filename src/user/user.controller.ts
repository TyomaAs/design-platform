import {
  Body,
  Controller,
  Delete,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Param,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { AuthGuard } from './../auth/guards/jwt-auth.guard';
import { UploaderService } from './../uploader/uploader.service';
import { PortfolioService } from './../portfolio/portfolio.service';
import { UPLOAD_FOLDER_PATHS } from './../common/constants/upload-folder-paths.constant';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private uploaderService: UploaderService,
    private portfolioService: PortfolioService,
  ) {}

  @Post('createAdmin') async createAdmin() {
    return await this.userService.createAdmin();
  }
  @UseGuards(AuthGuard)
  @Delete('delete')
  async deleteUser(@Body('id') id: number) {
    return await this.userService.delete(id);
  }
  @Post('info/:id') async getInfo(@Param('id') id: number) {
    console.log(id);
    return await this.userService.getUserByID(id);
  }
  @UseGuards(AuthGuard)
  @Post('update')
  async updateUser(@Body() input: UpdateUserDTO, @Req() request: any) {
    return await this.userService.update(request.user.sub, input);
  }
  @Get('getDesigners') async getDesigners() {
    return await this.userService.getAllDesigners();
  }
  @UseGuards(AuthGuard)
  @Post('uploadAvatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar(
    @UploadedFile() avatar: Express.Multer.File,
    @Req() request: any,
  ): Promise<string> {
    const avatarToken = await this.uploaderService.uploadImage(
      avatar,
      UPLOAD_FOLDER_PATHS.AVATARS,
    );
    this.userService.updateAvatar(request.user.sub, avatarToken);
    return avatarToken;
  }
  @UseGuards(AuthGuard)
  @Post('removeAvatar')
  async removeAvatar(@Req() request: any) {
    this.userService.removeAvatar(request.user.sub);
  }
  @UseGuards(AuthGuard)
  @Post('uploadPhotoPortfolio')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadPhotoPortfolio(
    @UploadedFile() avatar: Express.Multer.File,
    @Req() request: any,
  ): Promise<string> {
    const avatarToken = await this.uploaderService.uploadImage(
      avatar,
      UPLOAD_FOLDER_PATHS.PORTFOLIO,
    );
    const userDesigner = await this.userService.getUserByID(request.user.sub);
    if (!userDesigner) {
      return null;
    }

    const idDesigner = userDesigner.idDesigner;
    await this.portfolioService.savePhoto(idDesigner, avatarToken);

    return avatarToken;
  }

  @UseGuards(AuthGuard)
  @Get('getPortfolio/:idDesigner')
  async getPortfolio(@Param('idDesigner') idDesigner: number) {
    return await this.portfolioService.getImages(idDesigner);
  }

  @UseGuards(AuthGuard)
  @Delete('removePhotoPortfolio/:id') // id from portfolio entity
  async deletePhotoPortfolio(@Param('id') id: number) {
    await this.portfolioService.deletePhoto(id);
  }
}
