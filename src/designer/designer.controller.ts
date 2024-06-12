import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from './../auth/guards/jwt-auth.guard';
import { DesignerService } from './../designer/designer.service';
import { IUpdateDesigner } from './interfaces/update-designer.interfase';

@Controller('designer')
export class DesignerController {
  constructor(private designerService: DesignerService) {}
  @UseGuards(AuthGuard)
  @Post('update/:id')
  async update(@Body() input: IUpdateDesigner, @Param('id') id: number) {
    return await this.designerService.update(id, input);
  }
}
