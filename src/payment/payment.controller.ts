/* eslint-disable no-useless-constructor */
import { Body, Controller, Get, Logger, NotFoundException, Param, Post } from '@nestjs/common'
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { PaymentDTO, PaymentIDDTO } from './payment.input'
import { Payment } from './payment.model'
import { PaymentService } from './payment.service'

@Controller('payment')
export class PaymentController {
  constructor (private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: 'Get Payment Records' })
  @ApiOkResponse({ type: Payment, description: 'Get All Payment Records', isArray: true })
  @Get()
  getPayments (): Promise<Payment[]> {
    Logger.debug('getPayments called')
    try {
      return this.paymentService.retrieveAll()
    } catch (err) {
      Logger.error(err)
      throw err
    }
  }

  @ApiOperation({ summary: 'Create Payment Record' })
  @ApiCreatedResponse({ type: Payment, description: 'Create Payment Record' })
  @Post()
  createPaymentRecord (@Body() payment: PaymentDTO): Promise<Payment> {
    Logger.debug('getPayments called')
    try {
      return this.paymentService.create(payment)
    } catch (err) {
      Logger.error(err)
      throw err
    }
  }

  @ApiOperation({ summary: 'Get Payment Record Info' })
  @ApiOkResponse({ type: Payment, description: 'Get Payment Record' })
  @ApiNotFoundResponse({ description: 'Payment record with given Id is not present'})
  @Get(':id')
  async getPaymentInfo (@Param() { id }: PaymentIDDTO): Promise<Payment> {
    Logger.debug('getPayments called')
    try {
      const record = await this.paymentService.retrieve(id)

      if (!record) {
        throw new NotFoundException('Payment record with given Id is not present')
      }

      return record
    } catch (err) {
      Logger.error(err)
      throw err
    }
  }
}
