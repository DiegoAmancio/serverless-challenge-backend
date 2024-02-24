import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeDTO, EmployeeRepositoryImpl } from '@domain/employee';
import { EmployeeService } from '@service/employee';
import { EMPLOYEE_REPOSITORY } from '@shared/injects';

describe('Employee', () => {
  let service: EmployeeService;
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
    delete: jest.fn().mockReturnValue(null),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: EMPLOYEE_REPOSITORY,
          useValue: mockRepository,
        },
        EmployeeService,
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When create', () => {
    it('should be can create employee', async () => {
      const body = {
        Cargo: defaultEmployee.Cargo,
        Idade: defaultEmployee.Idade,
        Nome: defaultEmployee.Nome,
      };
      const employee = await service.create(body);

      expect(mockRepository.create).toHaveBeenCalledWith({
        Idade: body.Idade,
        Nome: body.Nome,
        Cargo: body.Cargo,
      });
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(employee).toStrictEqual(defaultEmployee);
    });
  });
  it('should be get employees', async () => {
    const employee = await service.getEmployees({ limit: 10 });

    expect(mockRepository.getEmployees).toHaveBeenCalledWith({ limit: 10 });
    expect(mockRepository.getEmployees).toHaveBeenCalledTimes(1);
    expect(employee).toStrictEqual([defaultEmployee]);
  });
  it('should be get 0 employees pass default Employee id', async () => {
    mockRepository.getEmployees = jest.fn().mockReturnValue([]);
    const employee = await service.getEmployees({
      limit: 10,
      lastIdFromList: defaultEmployee.Id,
    });

    expect(mockRepository.getEmployees).toHaveBeenCalledWith({
      limit: 10,
      lastIdFromList: defaultEmployee.Id,
    });
    expect(mockRepository.getEmployees).toHaveBeenCalledTimes(1);
    expect(employee).toStrictEqual([]);
  });

  it('should be can update employee', async () => {
    await service.update(defaultEmployee);

    expect(mockRepository.update).toHaveBeenCalledWith(defaultEmployee);
    expect(mockRepository.update).toHaveBeenCalledTimes(1);
  });

  it('should be can delete employee', async () => {
    await service.delete(defaultEmployee.Id);

    expect(mockRepository.delete).toHaveBeenCalledWith(defaultEmployee.Id);
    expect(mockRepository.delete).toHaveBeenCalledTimes(1);
  });
});
