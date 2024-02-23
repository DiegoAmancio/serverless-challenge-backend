import { Module } from "@nestjs/common";
import { employeeServiceProvider } from "./providers";


@Module({
    imports: [],
    exports: [employeeServiceProvider],
    providers: [employeeServiceProvider]
})
export class ServiceModule { }