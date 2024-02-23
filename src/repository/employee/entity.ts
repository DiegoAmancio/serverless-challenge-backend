import { EmployeeDTO } from '@domain/employee';

export class EmployeeEntity {
  private static readonly PK_PREFIX = 'EMPLOYEE-';
  Id: string;
  Idade: string;
  Nome: string;
  Cargo: string;

  constructor({ Cargo, Id, Idade, Nome }: EmployeeDTO) {
    this.Id = EmployeeEntity.getPK(Id);
    this.Idade = Idade;
    this.Cargo = Cargo;
    this.Nome = Nome;
  }

  static readonly getPK = (uuid: string) =>
    `${EmployeeEntity.PK_PREFIX}${uuid}`;
}
