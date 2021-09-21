/* eslint-disable no-useless-constructor */
import { BadRequestException, Body, Controller, Delete, Get, Logger, NotFoundException, Param, Post, Put } from '@nestjs/common'
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger'
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
    Logger.debug('getPaymentInfo called')
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

  @ApiOperation({ summary: 'Update payment' })
  @ApiOkResponse({ type: Payment, description: 'Update payment record' })
  @ApiBadRequestResponse({ description: 'Payment Record with the given id does not exists.' })
  @Put(':id')
  async updatePaymentInfo (@Param() { id }: PaymentIDDTO, @Body() payment: PaymentDTO): Promise<Payment> {
    Logger.debug('updatePaymentInfo called')
    try {
      const record = await this.paymentService.retrieve(id)

      if (!record) {
        throw new BadRequestException('Payment Record with the given id does not exists.')
      }

      return this.paymentService.update(id, payment)
    } catch (err) {
      Logger.error(err)
      throw err
    }
  }

  @ApiOperation({ summary: 'Delete payment' })
  @ApiOkResponse({ type: Payment, description: 'Delete payment record' })
  @ApiBadRequestResponse({ description: 'Payment Record with the given id does not exists.' })
  @Delete(':id')
  async deletePaymentRecord (@Param() { id }: PaymentIDDTO): Promise<Payment> {
    Logger.debug('deletePaymentRecord called')
    try {
      const record = await this.paymentService.retrieve(id)

      if (!record) {
        throw new BadRequestException('Payment Record with the given id does not exists.')
      }

      await this.paymentService.delete(id)
      return record
    } catch (err) {
      Logger.error(err)
      throw err
    }
  }
}
