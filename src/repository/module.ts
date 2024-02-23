import { Module } from "@nestjs/common";
import { employeeRepositoryProvider } from "./providers";


@Module({
    imports: [],
    exports: [employeeRepositoryProvider],
    providers: [employeeRepositoryProvider]
})
export class RepositoryModule { }