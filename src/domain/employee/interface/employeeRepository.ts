import { CreateEmployeeDTO, EmployeeDTO, PaginationDto } from '../dto';

export interface EmployeeRepositoryImpl {
  create(employee: CreateEmployeeDTO): Promise<EmployeeDTO>;
  getEmployees(paginationDto: PaginationDto): Promise<EmployeeDTO[]>;
}
