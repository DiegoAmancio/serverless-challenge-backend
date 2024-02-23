import { CreateEmployeeDTO, EmployeeDTO, PaginationDto } from '../dto';

export interface EmployeeRepositoryImpl {
  update(employee: EmployeeDTO): Promise<void>;
  create(employee: CreateEmployeeDTO): Promise<EmployeeDTO>;
  getEmployees(paginationDto: PaginationDto): Promise<EmployeeDTO[]>;
}
