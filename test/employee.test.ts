import { Test, TestingModule } from '@nestjs/testing';
import { EMPLOYEE_REPOSITORY, EMPLOYEE_SERVICE } from '@shared/injects';
import { EmployeeRepositoryImpl } from '@domain/employee';
import { EmployeeService } from '@service/index';
import { EmployeeController } from '@controller/employee';
import { EmployeeEntity } from '@repository/employee/entity';

describe('Employee', () => {
  let controller: EmployeeController;
  const defaultEmployee = {
    Idade: '25',
    Nome: 'Top',
    Cargo: 'DEVELOP',
    id: EmployeeEntity.getPK('123'),
  };
  const mockRepository: EmployeeRepositoryImpl = {
    create: jest.fn().mockReturnValue(defaultEmployee),
    getEmployees: jest.fn().mockReturnValue([defaultEmployee]),
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
    const employee = await controller.getEmployees('10', defaultEmployee.id);

    expect(mockRepository.getEmployees).toHaveBeenCalledWith({
      limit: 10,
      lastIdFromList: defaultEmployee.id,
    });
    expect(mockRepository.getEmployees).toHaveBeenCalledTimes(1);
    expect(employee).toStrictEqual({
      statusCode: 200,
      body: [],
    });
  });
});
