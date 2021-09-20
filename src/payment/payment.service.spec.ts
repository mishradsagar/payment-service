/* eslint-disable no-undef */
import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { Model } from 'mongoose'
import { Payment, PaymentDocument } from './payment.model'
import { PaymentService } from './payment.service'

describe('PaymentService', () => {
  let service: PaymentService
  let model: Model<PaymentDocument>
  const user = {
    amount: 50.00,
    fiatCurrency: 'Dollar',
    cryptoCurrency: 'Ether',
    conversionRate: 0.00033,
    receiverAddress: 'receiver address',
    customerAddress: 'customer address',
    status: 'pending',
    transactionHash: 'hash'
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService,
        {
          provide: getModelToken(Payment.name),
          useValue: Model
        }
      ]
    }).compile()

    service = module.get<PaymentService>(PaymentService)
    model = module.get<Model<PaymentDocument>>(getModelToken(Payment.name))
  })

  it('service should be defined', () => {
    expect(service).toBeDefined()
  })

  it('model should be defined', () => {
    expect(model).toBeDefined()
  })

  it('should retrieve payment records', async () => {
    const spy = jest.spyOn(model, 'find').mockResolvedValue([])
    await service.retrieveAll()
    expect(spy).toBeCalled()
  })

  it('should create a new payment record', async () => {
    const spy = jest.spyOn(model, 'create').mockReturnValueOnce()
    await service.create(user)
    expect(spy).toBeCalledWith(user)
  })
})
