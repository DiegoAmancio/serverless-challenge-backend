import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateEmployeeDTO {
  @ApiProperty({
    example: '21',
    description: `Employee Age`,
  })
  @IsNumberString()
  Idade: string;
  @ApiProperty({
    example: 'John',
    description: `Employee name`,
  })
  @IsNotEmpty()
  @IsString()
  Nome: string;
  @ApiProperty({
    example: 'Software Engineer',
    description: `Employee Role`,
  })
  @IsNotEmpty()
  @IsString()
  Cargo: string;
}
