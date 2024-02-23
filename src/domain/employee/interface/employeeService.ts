import { CreateEmployeeDTO, EmployeeDTO, PaginationDto } from '../dto';

export interface EmployeeServiceImpl {
  create(employee: CreateEmployeeDTO): Promise<EmployeeDTO>;
  getEmployees(paginationDto: PaginationDto): Promise<EmployeeDTO[]>;
}
