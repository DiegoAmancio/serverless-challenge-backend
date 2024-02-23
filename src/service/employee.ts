import { Injectable, Logger } from "@nestjs/common";
import { CreateEmployeeDTO, EmployeeDTO, EmployeeServiceImpl } from "src/domain/employee";

@Injectable()
export class EmployeeService implements EmployeeServiceImpl {
    private readonly logger = new Logger(EmployeeService.name);

    create(employee: CreateEmployeeDTO): Promise<EmployeeDTO> {
        this.logger.log(`create`)

        return new Promise((resolve) => {
            resolve(
                new EmployeeDTO({ Id: '1', ...employee })
            )
        })

    }
}