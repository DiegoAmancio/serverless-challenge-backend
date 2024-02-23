import {
  Controller,
  Logger,
  Inject,
  Post,
  Body,
  Get,
  Query,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import {
  EmployeeServiceImpl,
  CreateEmployeeDTO,
  EmployeeDTO,
} from '@domain/employee';
import {
  EMPLOYEE_SERVICE,
  formatJSONResponse,
  internalServerErrorResponse,
  onlyOkResponse,
} from '@shared/index';

@Controller('employee')
export class EmployeeController {
  private readonly logger;
  constructor(
    @Inject(EMPLOYEE_SERVICE)
    private readonly employeeService: EmployeeServiceImpl,
  ) {
    this.logger = new Logger(EmployeeController.name);
  }

  @Post()
  async create(@Body() employee: CreateEmployeeDTO): Promise<any> {
    this.logger.log(`Create ${JSON.stringify(employee)}`);
    try {
      const response = await this.employeeService.create(employee);
      return formatJSONResponse(response, 201);
    } catch (error) {
      this.logger.error(error);
      return internalServerErrorResponse();
    }
  }

  @Get()
  async getEmployees(
    @Query('limit') limit: string,
    @Query('lastIdFromList') lastIdFromList?: string,
  ): Promise<any> {
    this.logger.log(`getEmployees ${limit}`);
    try {
      const response = await this.employeeService.getEmployees({
        limit: Number.parseInt(limit),
        lastIdFromList: lastIdFromList,
      });
      return formatJSONResponse(response, 200);
    } catch (error) {
      this.logger.error(error);
      return internalServerErrorResponse();
    }
  }

  @Put()
  async update(@Body() employee: EmployeeDTO): Promise<any> {
    this.logger.log(`update ${JSON.stringify(employee)}`);
    try {
      await this.employeeService.update(employee);
      return formatJSONResponse('Employee Updated', 200);
    } catch (error) {
      this.logger.error(error);
      return internalServerErrorResponse();
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    this.logger.log(`delete ${id}`);
    try {
      await this.employeeService.delete(id);
      return onlyOkResponse();
    } catch (error) {
      this.logger.error(error);
      return internalServerErrorResponse();
    }
  }
}
