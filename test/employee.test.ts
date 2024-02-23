import { Test, TestingModule } from '@nestjs/testing';
import {
  EMPLOYEE_REPOSITORY,
  EMPLOYEE_SERVICE,
  internalServerErrorResponse,
} from '@shared/index';
import { EmployeeDTO, EmployeeRepositoryImpl } from '@domain/employee';
import { EmployeeService } from '@service/index';
import { EmployeeController } from '@controller/employee';

describe('Employee', () => {
  let controller: EmployeeController;
  const defaultEmployee = new EmployeeDTO({
    Idade: '25',
    Nome: 'Top',
    Cargo: 'DEVELOP',
    Id: '123',
  });
  const mockRepository: EmployeeRepositoryImpl = {
    create: jest.fn().mockReturnValue(defaultEmployee),
    getEmployees: jest.fn().mockReturnValue([defaultEmployee]),
    update: jest.fn().mockReturnValue(null),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        {
          provide: EMPLOYEE_REPOSITORY,
          useValue: mockRepository,
        },
        {
          provide: EMPLOYEE_SERVICE,
          useClass: EmployeeService,
        },
      ],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('When create', () => {
    it('should be can create employee', async () => {
      const body = {
        Cargo: defaultEmployee.Cargo,
        Idade: defaultEmployee.Idade,
        Nome: defaultEmployee.Nome,
      };
      const employee = await controller.create(body);

      expect(mockRepository.create).toHaveBeenCalledWith({
        Idade: body.Idade,
        Nome: body.Nome,
        Cargo: body.Cargo,
      });
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(employee).toStrictEqual({
        statusCode: 201,
        body: defaultEmployee,
      });
    });
  });
  it('should be get employees', async () => {
    const employee = await controller.getEmployees('10');

    expect(mockRepository.getEmployees).toHaveBeenCalledWith({ limit: 10 });
    expect(mockRepository.getEmployees).toHaveBeenCalledTimes(1);
    expect(employee).toStrictEqual({
      statusCode: 200,
      body: [defaultEmployee],
    });
  });
  it('should be get 0 employees pass default Employee id', async () => {
    mockRepository.getEmployees = jest.fn().mockReturnValue([]);
    const employee = await controller.getEmployees('10', defaultEmployee.Id);

    expect(mockRepository.getEmployees).toHaveBeenCalledWith({
      limit: 10,
      lastIdFromList: defaultEmployee.Id,
    });
    expect(mockRepository.getEmployees).toHaveBeenCalledTimes(1);
    expect(employee).toStrictEqual({
      statusCode: 200,
      body: [],
    });
  });

  it('should be can update employee', async () => {
    const employee = await controller.update(defaultEmployee);

    expect(mockRepository.update).toHaveBeenCalledWith(defaultEmployee);
    expect(mockRepository.update).toHaveBeenCalledTimes(1);
    expect(employee).toStrictEqual({
      statusCode: 200,
      body: 'Employee Updated',
    });
  });

  it('can not update employee (not exist)', async () => {
    mockRepository.update = jest.fn().mockReturnValue(
      new Promise((_resolve, reject) => {
        reject('Item not found');
      }),
    );
    const response = await controller.update(defaultEmployee);

    expect(response).toStrictEqual(internalServerErrorResponse());
  });
});
