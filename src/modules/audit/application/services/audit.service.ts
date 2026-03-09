import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AuditService {

    private readonly logger = new Logger(AuditService.name);

    async log(data: any) {

        this.logger.log(
            `AUDIT -> ${data.action} : ${data.entityId}`
        );

    }
}