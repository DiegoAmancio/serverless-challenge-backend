import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  CreateEmployeeDTO,
  EmployeeDTO,
  EmployeeRepositoryImpl,
  EmployeeServiceImpl,
  PaginationDto,
} from '@domain/employee';
import { EMPLOYEE_REPOSITORY } from '@shared/injects';

@Injectable()
export class EmployeeService implements EmployeeServiceImpl {
  private readonly logger;
  constructor(
    @Inject(EMPLOYEE_REPOSITORY)
    private readonly employeeRepository: EmployeeRepositoryImpl,
  ) {
    this.logger = new Logger(EmployeeService.name);
  }
  update(employee: EmployeeDTO): Promise<void> {
    this.logger.log(`update`);

    return this.employeeRepository.update(employee);
  }
  getEmployees(paginationDto: PaginationDto): Promise<EmployeeDTO[]> {
    this.logger.log(`getEmployees`);

    return this.employeeRepository.getEmployees(paginationDto);
  }
  create(employee: CreateEmployeeDTO): Promise<EmployeeDTO> {
    this.logger.log(`create`);

    return this.employeeRepository.create(employee);
  }
}
