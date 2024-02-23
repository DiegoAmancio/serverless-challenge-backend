import { CreateEmployeeDTO, EmployeeDTO, PaginationDto } from '../dto';

export interface EmployeeRepositoryImpl {
  delete(id: string): Promise<void>;
  update(employee: EmployeeDTO): Promise<void>;
  create(employee: CreateEmployeeDTO): Promise<EmployeeDTO>;
  getEmployees(paginationDto: PaginationDto): Promise<EmployeeDTO[]>;
}
