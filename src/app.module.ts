import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { AppService } from './app.service';
import { AuthJwtModule } from './jwt.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { OrderModule } from './order/order.module';
import { UploaderModule } from './uploader/uploader.module';
import { PortfolioModule } from './portfolio/portfolio.module';

@Module({
  imports: [
    AuthModule,
    DbModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.example'],
    }),
    AuthJwtModule,
    UploaderModule,
    OrderModule,
    PortfolioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
