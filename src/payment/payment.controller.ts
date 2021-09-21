/* eslint-disable no-useless-constructor */
import { Controller, Get, Logger } from '@nestjs/common'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { Payment } from './payment.model'
import { PaymentService } from './payment.service'

@Controller('payment')
export class PaymentController {
  constructor (private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: 'Get Payment Records' })
  @ApiOkResponse({ type: Payment, description: 'Get All Payment Records', isArray: true })
  @Get('/')
  getPayments (): Promise<Payment[]> {
    Logger.debug('getPayments called')
    try {
      return this.paymentService.retrieveAll()
    } catch (err) {
      Logger.error(err)
      return err
    }
  }
}
