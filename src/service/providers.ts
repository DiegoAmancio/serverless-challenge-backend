import { EMPLOYEE_SERVICE } from "src/shared";
import { EmployeeService } from "./employee";
import { Provider } from "@nestjs/common";

export const employeeServiceProvider: Provider = {
    provide: EMPLOYEE_SERVICE,
    useClass: EmployeeService,
};

