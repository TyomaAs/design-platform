import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './order.entity';
import { UserService } from './../user/user.service';
import { UpdateOrderDTO } from './dto/update-order.dto';
import { CreateOrderSchema } from './schemas/create.order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    private userService: UserService,
  ) {}
  async createOrder(payload: CreateOrderSchema): Promise<OrderEntity> {
    if (payload.idCus === payload.idRec)
      throw new HttpException(
        "User can't make order for yourself",
        HttpStatus.BAD_REQUEST,
      );
    const time = new Date();
    console.log(time);
    const checkCardNum = await this.checkCardNumber(payload.cardNumber);
    const checkCardDate = await this.checkCardDate(
      payload.cardMM,
      payload.cardYY,
      time,
    );
    if (
      !checkCardNum ||
      !checkCardDate ||
      !(payload.cardCVV < 1000) ||
      !(payload.cardCVV >= 100)
    )
      throw new HttpException(
        'Card info have uncorrect data',
        HttpStatus.BAD_REQUEST,
      );

    const customer = await this.userService.getUserByID(payload.idCus);
    const receiver = await this.userService.getUserByID(payload.idRec);
    if (!customer || !receiver)
      throw new HttpException('Not found somebody user', HttpStatus.NOT_FOUND);
    if (!(receiver.role === 'designer')) {
      throw new HttpException(
        'Receiver is not designer',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isDone = false;
    try {
      return this.orderRepository.save({
        customer,
        receiver,
        isDone,
        ...payload,
      });
    } catch (error) {
      console.log('Error:' + error);
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    }
  }

  async updateOrder(id: number, data: UpdateOrderDTO): Promise<void> {
    console.log('Updating order: ' + data);
    const orderToUpdate = await this.orderRepository.findOneBy({ id });
    console.log('Order updated: ' + orderToUpdate);
    try {
      await this.orderRepository.update(orderToUpdate.id, data);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Unsuccesful update of order',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async orderIsDone(id: number): Promise<void> {
    const orderToUpdate = await this.orderRepository.findOneBy({ id });
    orderToUpdate.isDone = true;
    await this.orderRepository.update(orderToUpdate.id, orderToUpdate);
  }

  async getOrder(id: number): Promise<OrderEntity> {
    try {
      return await this.orderRepository.findOneBy({ id });
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
  async getOrdersForCustomer(idCustomer: number): Promise<OrderEntity[]> {
    const customer = await this.userService.getUserByID(idCustomer);
    try {
      return await this.orderRepository.findBy({ idCus: customer.id });
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
  async getOrdersForReceiver(idReceiver: number): Promise<OrderEntity[]> {
    const receiver = await this.userService.getUserByID(idReceiver);
    console.log(idReceiver);
    try {
      return await this.orderRepository.findBy({ idRec: receiver.id });
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async deleteOrder(id: number): Promise<void> {
    try {
      await this.orderRepository.delete(id);
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async checkCardNumber(cardNumber: string): Promise<boolean> {
    let checksum = 0; // running checksum total
    let j = 1; // takes value of 1 or 2
    // Process each digit one by one starting from the last
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let calc = 0;
      // Extract the next digit and multiply by 1 or 2 on alternative digits.
      calc = Number(cardNumber.charAt(i)) * j;
      // If the result is in two digits add 1 to the checksum total
      if (calc > 9) {
        checksum += 1;
        calc -= 10;
      }
      // Add the units element to the checksum total
      checksum += calc;
      // Switch the value of j
      if (j == 1) j = 2;
      else j = 1;
    }
    //Check if it is divisible by 10 or not.
    return checksum % 10 == 0;
  }
  async checkCardDate(
    cardMM: number,
    cardYY: number,
    time: Date,
  ): Promise<boolean> {
    if (cardYY < time.getFullYear() - (time.getFullYear() % 100))
      cardYY += time.getFullYear() - (time.getFullYear() % 100);

    if (cardYY > time.getFullYear()) return true;
    if (cardYY == time.getFullYear())
      if (cardMM > time.getMonth() + 1) return true;
      else return false;
    else return false;
  }
}
