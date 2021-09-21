/* eslint-disable no-useless-constructor */
import { Controller, Get } from '@nestjs/common'
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
    return this.paymentService.retrieveAll()
  }
}
