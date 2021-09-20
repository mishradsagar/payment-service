/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Payment, PaymentDocument } from './payment.model'

@Injectable()
export class PaymentService {
  constructor (@InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>) {}

  async retrieveAll (): Promise<PaymentDocument[]> {
    return await this.paymentModel.find()
  }
}
