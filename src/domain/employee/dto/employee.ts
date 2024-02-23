import { CreateEmployeeDTO } from "./createEmployee";

export class EmployeeDTO extends CreateEmployeeDTO {
    Id: string;

    constructor(values: EmployeeDTO) {
        super();
        Object.assign(this, values)
    }
}