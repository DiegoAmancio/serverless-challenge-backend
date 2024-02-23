import { IsNotEmpty } from 'class-validator';
import { CreateEmployeeDTO } from './createEmployee';

export class EmployeeDTO extends CreateEmployeeDTO {
  @IsNotEmpty()
  Id: string;

  constructor(values: EmployeeDTO) {
    super();
    Object.assign(this, values);
  }
}
