import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ timestamps: true })
export class Payment {
  @Prop()
  amount: number;

  @Prop()
  fiatCurrency: string;

  @Prop()
  cryptoCurrency: string;

  @Prop()
  conversionRate: number;

  @Prop()
  receiverAddress: string;

  @Prop()
  customerAddress: string;

  @Prop()
  status: [string];

  @Prop()
  transactionHash: string;
}

export type PaymentDocument = Payment & Document;

export const PaymentSchema = SchemaFactory.createForClass(Payment)
