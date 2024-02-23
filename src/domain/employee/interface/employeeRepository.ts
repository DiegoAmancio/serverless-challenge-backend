import { CreateEmployeeDTO, EmployeeDTO } from '../dto';

export interface EmployeeRepositoryImpl {
  create(employee: CreateEmployeeDTO): Promise<EmployeeDTO>;
}
