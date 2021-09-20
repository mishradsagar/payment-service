import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ timestamps: true })
export class Payment {
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  fiatCurrency: string;

  @Prop()
  cryptoCurrency: string;

  @Prop()
  conversionRate: number;

  @Prop({ required: true })
  receiverAddress: string;

  @Prop({ required: true })
  customerAddress: string;

  @Prop({ required: true })
  status: [string];

  @Prop({ required: true })
  transactionHash: string;
}

export type PaymentDocument = Payment & Document;

export const PaymentSchema = SchemaFactory.createForClass(Payment)
