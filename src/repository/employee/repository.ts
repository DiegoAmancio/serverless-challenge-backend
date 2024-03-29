import { Injectable, Logger } from '@nestjs/common';
import {
  CreateEmployeeDTO,
  EmployeeDTO,
  EmployeeRepositoryImpl,
  PaginationDto,
} from '@domain/employee';
import {
  DynamoDB,
  PutItemCommandInput,
  UpdateItemCommandInput,
  ScanCommandInput,
  DeleteItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import { EmployeeEntity } from './entity';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { v4 as uuid } from 'uuid';

@Injectable()
export class EmployeeRepository implements EmployeeRepositoryImpl {
  private readonly logger;
  private readonly tableName;
  private readonly dynamoDB;

  constructor() {
    this.logger = new Logger(EmployeeRepository.name);
    this.dynamoDB = new DynamoDB();
    this.tableName = process.env.EMPLOYEE_TABLE_NAME;
  }
  async delete(id: string): Promise<void> {
    this.logger.log(`delete`);

    const params: DeleteItemCommandInput = {
      TableName: this.tableName,
      Key: { Id: { S: id } },
    };

    await this.dynamoDB.deleteItem(params);
  }
  async update(employee: EmployeeDTO): Promise<void> {
    this.logger.log(`update`);

    const entity = new EmployeeEntity(employee);
    const params: UpdateItemCommandInput = {
      TableName: this.tableName,
      Key: { Id: { S: entity.Id } },
      UpdateExpression: 'set Idade = :Idade, Nome = :Nome, Cargo = :Cargo',
      ExpressionAttributeValues: {
        ':Idade': { S: entity.Idade },
        ':Nome': { S: entity.Nome },
        ':Cargo': { S: entity.Cargo },
      },
      ConditionExpression: 'attribute_exists(Id)',
    };

    await this.dynamoDB.updateItem(params);
  }

  async getEmployees({
    limit,
    lastIdFromList,
  }: PaginationDto): Promise<EmployeeDTO[]> {
    this.logger.log(`getEmployees`);

    const params: ScanCommandInput = {
      TableName: this.tableName,
      Limit: limit,
    };

    if (lastIdFromList !== undefined) {
      params.ExclusiveStartKey = { Id: { S: lastIdFromList } };
    }

    const { Items } = await this.dynamoDB.scan(params);

    return Items
      ? Items.map((item) => new EmployeeDTO(unmarshall(item) as EmployeeDTO))
      : [];
  }

  async create(employee: CreateEmployeeDTO): Promise<EmployeeDTO> {
    this.logger.log(`create`);

    const entity = new EmployeeEntity({ Id: uuid(), ...employee });
    const params: PutItemCommandInput = {
      TableName: this.tableName,
      Item: marshall({ ...entity }),
    };

    await this.dynamoDB.putItem(params);

    return new EmployeeDTO(entity);
  }
}
