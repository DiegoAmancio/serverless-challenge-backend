import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateEmployeeDTO {
  @IsNumberString()
  Idade: string;
  @IsNotEmpty()
  Nome: string;
  @IsNotEmpty()
  Cargo: string;
}
