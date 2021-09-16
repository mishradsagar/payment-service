import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PaymentModule } from './payment/payment.module'

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), PaymentModule],
  controllers: [],
  providers: []
})
export default class AppModule {}
