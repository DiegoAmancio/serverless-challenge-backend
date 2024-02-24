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
  HttpCode,
  InternalServerErrorException,
  Res,
} from '@nestjs/common';
import {
  EmployeeServiceImpl,
  CreateEmployeeDTO,
  EmployeeDTO,
} from '@domain/employee';
import { EMPLOYEE_SERVICE } from '@shared/index';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('employee')
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
  @HttpCode(201)
  @ApiCreatedResponse({
    description: 'The employee has been successfully created.',
    type: EmployeeDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
  })
  async create(
    @Body() employee: CreateEmployeeDTO,
    @Res() response: Response,
  ): Promise<any> {
    this.logger.log(`Create ${JSON.stringify(employee)}`);
    try {
      const employeeCreated = await this.employeeService.create(employee);
      response.status(201).json(employeeCreated);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  @Get()
  @ApiCreatedResponse({
    type: [EmployeeDTO],
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: true,
    description: 'Limit results',
  })
  @ApiQuery({
    name: 'lastIdFromList',
    type: 'string',
    required: false,
    description: 'Last item ID from previous list',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
  })
  async getEmployees(
    @Res() response: Response,
    @Query('limit') limit: string,
    @Query('lastIdFromList') lastIdFromList?: string,
  ): Promise<any> {
    this.logger.log(`getEmployees ${limit}`);

    try {
      const employees = await this.employeeService.getEmployees({
        limit: Number.parseInt(limit),
        lastIdFromList: lastIdFromList,
      });
      response.status(200).json(employees);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  @Put()
  @ApiOkResponse({
    description: 'Success',
    schema: {
      type: 'string',
      example: 'Employee Updated',
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
  })
  async update(
    @Body() employee: EmployeeDTO,
    @Res() response: Response,
  ): Promise<any> {
    this.logger.log(`update ${JSON.stringify(employee)}`);
    try {
      await this.employeeService.update(employee);
      response.status(200).json('Employee Updated');
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'Employee Id',
  })
  @ApiOkResponse({
    description: 'Success',
  })
  async delete(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<any> {
    this.logger.log(`delete ${id}`);
    try {
      await this.employeeService.delete(id);
      response.status(200).send();
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }
}
