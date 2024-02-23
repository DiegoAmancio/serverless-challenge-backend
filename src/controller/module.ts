import { Module } from "@nestjs/common";
import { EmployeeController } from "./employee";
import { ServiceModule } from "@service/module";


@Module({
    imports: [ServiceModule],
    controllers: [
        EmployeeController
    ],
})
export class ControllerModule { }