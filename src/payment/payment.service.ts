/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { PaymentDTO } from './payment.input'
import { Payment, PaymentDocument } from './payment.model'

@Injectable()
export class PaymentService {
  constructor (@InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>) {}

  async retrieveAll (sortBy?, order?, filters?) {
    return this.paymentModel.find(filters).sort([[sortBy, order === 'ASC' ? 1 : -1]])
  }

  async retrieve (id) {
    return this.paymentModel.findById(id)
  }

  async create (payment) {
    return this.paymentModel.create(payment)
  }

  async delete (id: string) {
    return this.paymentModel.deleteOne({ id })
  }

  async update (id: string, payment: PaymentDTO) {
    return this.paymentModel.findOneAndUpdate({ id }, { $set: { ...payment } }, { new: true })
  }
}
