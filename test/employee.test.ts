import { Test, TestingModule } from '@nestjs/testing';
import { EMPLOYEE_REPOSITORY, EMPLOYEE_SERVICE } from '@shared/injects';
import { EmployeeRepositoryImpl } from '@domain/employee';
import { EmployeeService } from '@service/index';

describe('EmployeeService', () => {
  let service: EmployeeService;

  const mockRepository: EmployeeRepositoryImpl = {
    create: jest.fn().mockReturnValue(null),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [

        {
          provide: EMPLOYEE_REPOSITORY,
          useValue: mockRepository,
        },
        EmployeeService
      ],
    }).compile();
    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When create', () => {
    it('should be login in system (is registered)', async () => {
      const body = {
        Idade: "21",
        Nome: "Pops5",
        Cargo: "DEVELOP"
      }
      const employee = await service.create(body);

      expect(mockRepository.create).toHaveBeenCalledWith({
        Idade: body.Idade,
        Nome: body.Nome,
        Cargo: body.Cargo,
      });
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
    });
  });
});