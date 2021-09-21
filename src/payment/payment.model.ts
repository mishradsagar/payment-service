import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { Document } from 'mongoose'

@Schema({ timestamps: true })
export class Payment {
  @ApiProperty({ required: true, example: 50.00 })
  @Prop({ required: true })
  amount: number;

  @ApiProperty({ required: true, example: 'USD' })
  @Prop({ required: true })
  fiatCurrency: string;

  @ApiProperty({ required: false, example: 'Ether' })
  @Prop()
  cryptoCurrency: string;

  @ApiProperty({ required: false, example: 0.00033 })
  @Prop()
  conversionRate: number;

  @ApiProperty({ required: true, example: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B' })
  @Prop({ required: true })
  receiverAddress: string;

  @ApiProperty({ required: true, example: '0xab5801a7d398351b8be11c439e05c5b3259aec9b' })
  @Prop({ required: true })
  customerAddress: string;

  @ApiProperty({ required: true, example: 'started' })
  @Prop({ required: true, type: String, enum: ['started', 'pending', 'completed'] })
  status: string;

  @ApiProperty({ required: true, example: 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad' })
  @Prop({ required: true })
  transactionHash: string;
}

export type PaymentDocument = Payment & Document;

export const PaymentSchema = SchemaFactory.createForClass(Payment)
