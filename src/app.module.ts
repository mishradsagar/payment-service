import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PaymentModule } from './payment/payment.module'

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    PaymentModule
  ],
  controllers: [],
  providers: []
})
export default class AppModule {}
