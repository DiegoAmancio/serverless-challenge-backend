import { IsNotEmpty } from 'class-validator';
import { CreateEmployeeDTO } from './createEmployee';
import { ApiProperty } from '@nestjs/swagger';

export class EmployeeDTO extends CreateEmployeeDTO {
  @ApiProperty({
    example: 'EMPLOYEE-2131231312',
    description: `Employee Id`,
  })
  @IsNotEmpty()
  Id: string;

  constructor(values: EmployeeDTO) {
    super();
    Object.assign(this, values);
  }
}
