import { Module } from "@nestjs/common";
import { employeeServiceProvider } from "./providers";
import { RepositoryModule } from "@repository/module";


@Module({
    imports: [RepositoryModule],
    exports: [employeeServiceProvider],
    providers: [employeeServiceProvider]
})
export class ServiceModule { }