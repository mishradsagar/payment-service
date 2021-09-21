import { IsNotEmpty, IsEthereumAddress, IsString, IsNumber, IsHash, IsIn, IsOptional, IsMongoId } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class PaymentDTO {
  @ApiProperty({ required: true, example: 50.00 })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ required: true, example: 'USD' })
  @IsString()
  @IsNotEmpty()
  fiatCurrency: string;

  @ApiProperty({ required: false, example: 'Ether' })
  @IsOptional()
  @IsString()
  cryptoCurrency: string;

  @ApiProperty({ required: false, example: 0.00033 })
  @IsOptional()
  @IsNumber()
  conversionRate: number;

  @ApiProperty({ required: true, example: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B' })
  @IsString()
  @IsEthereumAddress()
  receiverAddress: string;

  @ApiProperty({ required: true, example: '0xab5801a7d398351b8be11c439e05c5b3259aec9b' })
  @IsString()
  @IsEthereumAddress()
  customerAddress: string;

  @ApiProperty({ required: true, example: 'started' })
  @IsString()
  @IsIn(['started', 'pending', 'completed'])
  status: string;

  @ApiProperty({ required: true, example: 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad' })
  @IsString()
  @IsHash('sha256')
  transactionHash: string;
}

export class PaymentIDDTO {
  @ApiProperty({ required: true })
  @IsMongoId()
  id: string;
}

export class ListPayments {
  @ApiProperty({ required: false, example: 'amount' })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiProperty({ required: false, example: 'ASC' })
  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
  order?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEthereumAddress()
  receiverAddress: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEthereumAddress()
  customerAddress: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsIn(['started', 'pending', 'completed'])
  status: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  fiatCurrency: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cryptoCurrency: string;
}
