/* eslint-disable no-undef */
import { MongooseModule } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { closeInMongodConnection, rootMongooseTestModule } from '../../test/utils/mongoose.module'
import { Payment, PaymentSchema } from './payment.model'
import { PaymentService } from './payment.service'

describe('PaymentService', () => {
  let service: PaymentService
  let payment: Payment
  const paymentInfo = {
    amount: 50.00,
    fiatCurrency: 'Dollar',
    cryptoCurrency: 'Ether',
    conversionRate: 0.00033,
    receiverAddress: 'receiver address',
    customerAddress: 'customer address',
    status: 'pending',
    transactionHash: 'hash'
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }])
      ],
      providers: [PaymentService]
    }).compile()

    service = module.get<PaymentService>(PaymentService)
  })

  afterAll(async () => {
    await closeInMongodConnection()
  })

  it('service should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a payment record', async () => {
    payment = await service.create(paymentInfo)
    expect(payment).toHaveProperty('_id')
  })

  it('should retrieve payment records', async () => {
    const result = await service.retrieveAll()
    expect(result).toHaveLength(1)
  })

  it('should retrieve payment record by Id', async () => {
    const result = await service.retrieve(payment._id)
    expect(result).toHaveProperty('_id')
  })

  it('should update a payment record', async () => {
    await service.update(payment._id, { status: 'completed' })
    const result = await service.retrieve(payment._id)
    expect(result.status).toEqual('completed')
  })

  it('should delete a payment record', async () => {
    await service.delete(payment._id)
    const result = await service.retrieve(payment._id)
    expect(result).toBeNull()
  })
})
