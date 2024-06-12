import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from './../auth/guards/jwt-auth.guard';
import { CreateOrderSchema } from './schemas/create.order.schema';
import { UpdateOrderDTO } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async createOrder(@Body() input: CreateOrderSchema) {
    return this.orderService.createOrder(input);
  }
  @UseGuards(AuthGuard)
  @Post('update')
  async updateOrder(id: number, @Body() input: UpdateOrderDTO) {
    return this.orderService.updateOrder(id, input);
  }
  @UseGuards(AuthGuard)
  @Post('is-done')
  async orderIsDone(id: number) {
    return this.orderService.orderIsDone(id);
  }

  @UseGuards(AuthGuard)
  @Get('getOrder/:id')
  async getOrder(@Param('id') id: number) {
    return this.orderService.getOrder(id);
  }
  @UseGuards(AuthGuard)
  @Get('getOrdersForCustomer/:idCus')
  async getOrdersForCustomer(@Param('idCus') idCus: number) {
    return this.orderService.getOrdersForCustomer(idCus);
  }
  @UseGuards(AuthGuard)
  @Get('getOrdersForReceiver/:idRec')
  async getOrdersForReceiver(@Param('idRec') idRec: number) {
    return this.orderService.getOrdersForReceiver(idRec);
  }

  @UseGuards(AuthGuard)
  @Post('delete/:id')
  async deleteOrder(@Param('id') id: number) {
    return await this.orderService.deleteOrder(id);
  }
}
