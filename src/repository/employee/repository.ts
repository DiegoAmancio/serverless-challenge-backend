import { Injectable, Logger } from "@nestjs/common";
import { CreateEmployeeDTO, EmployeeDTO, EmployeeRepositoryImpl } from "@domain/employee";
import {
    DynamoDB,
    PutItemCommandInput,
} from '@aws-sdk/client-dynamodb'
import { EmployeeEntity } from "./entity";
import { marshall } from '@aws-sdk/util-dynamodb'
import { v4 as uuid } from "uuid";

@Injectable()
export class EmployeeRepository implements EmployeeRepositoryImpl {
    private readonly logger;
    private readonly tableName;
    private readonly dynamoDB;

    constructor() {
        this.logger = new Logger(EmployeeRepository.name)
        this.dynamoDB = new DynamoDB();
        this.tableName = process.env.EMPLOYEE_TABLE_NAME
    }

    async create(employee: CreateEmployeeDTO): Promise<EmployeeDTO> {
        this.logger.log(`create`)

        const entity = new EmployeeEntity({ Id: uuid(), ...employee })
        const params: PutItemCommandInput = {
            TableName: this.tableName,
            Item: marshall({ ...entity }),
        }

        await this.dynamoDB.putItem(params)

        return new EmployeeDTO(entity)
    }
}