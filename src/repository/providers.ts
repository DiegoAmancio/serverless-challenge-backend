import { EMPLOYEE_REPOSITORY } from "@shared/index";
import { EmployeeRepository } from "./employee";
import { Provider } from "@nestjs/common";

export const employeeRepositoryProvider: Provider = {
    provide: EMPLOYEE_REPOSITORY,
    useClass: EmployeeRepository,
};

