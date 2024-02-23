import { EMPLOYEE_SERVICE } from "@shared/index";
import { EmployeeService } from "./employee";
import { Provider } from "@nestjs/common";

export const employeeServiceProvider: Provider = {
    provide: EMPLOYEE_SERVICE,
    useClass: EmployeeService,
};

