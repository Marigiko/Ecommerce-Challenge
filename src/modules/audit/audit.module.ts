import { Module, Global } from '@nestjs/common';
import { AuditService } from './application/services/audit.service';

@Global()
@Module({
    providers: [AuditService],
    exports: [AuditService],
})
export class AuditModule { }