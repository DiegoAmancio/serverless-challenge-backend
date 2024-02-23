import { Controller, Logger, Inject, Post, Body } from "@nestjs/common";
import { EmployeeServiceImpl, CreateEmployeeDTO, EmployeeDTO } from "src/domain/employee";
import { EMPLOYEE_SERVICE } from "src/shared";



@Controller('employee')
export class EmployeeController {
    private readonly logger = new Logger(EmployeeController.name);
    constructor(
        @Inject(EMPLOYEE_SERVICE)
        private readonly employeeService: EmployeeServiceImpl,
    ) { }


    @Post()
    async create(
        @Body() employee: CreateEmployeeDTO,
    ): Promise<EmployeeDTO> {
        this.logger.log(`Create ${JSON.stringify(employee)}`);

        return this.employeeService.create(employee)
    }


}