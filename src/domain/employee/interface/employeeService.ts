import { CreateEmployeeDTO, EmployeeDTO } from "../dto";

export interface EmployeeServiceImpl {
    create(employee: CreateEmployeeDTO): Promise<EmployeeDTO>
}