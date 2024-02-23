import { Inject, Injectable, Logger } from "@nestjs/common";
import { CreateEmployeeDTO, EmployeeDTO, EmployeeRepositoryImpl, EmployeeServiceImpl } from "@domain/employee";
import { EMPLOYEE_REPOSITORY } from "@shared/injects";

@Injectable()
export class EmployeeService implements EmployeeServiceImpl {
    private readonly logger;
    constructor(
        @Inject(EMPLOYEE_REPOSITORY)
        private readonly employeeRepository: EmployeeRepositoryImpl,
    ) {
        this.logger = new Logger(EmployeeService.name);
    }
    create(employee: CreateEmployeeDTO): Promise<EmployeeDTO> {
        this.logger.log(`create`)

        return this.employeeRepository.create(employee)

    }
}