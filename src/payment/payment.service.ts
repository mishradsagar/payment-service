/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Payment, PaymentDocument } from './payment.model'

@Injectable()
export class PaymentService {
  constructor (@InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>) {}

  async retrieveAll () {
    return this.paymentModel.find()
  }

  async retrieve (id: string) {
    return this.paymentModel.findById(id)
  }

  async create (payment) {
    return this.paymentModel.create(payment)
  }

  async delete (id: string) {
    return this.paymentModel.deleteOne({ id })
  }

  async update (id: string, payment) {
    return this.paymentModel.updateOne({ id }, { $set: { ...payment } }, { new: true })
  }
}
