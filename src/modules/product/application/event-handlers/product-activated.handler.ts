import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ProductActivatedEvent } from '../../domain/events/product-activated.event';
import { AuditService } from '@/modules/audit/application/services/audit.service';

@Injectable()
export class ProductActivatedHandler {

    private readonly logger = new Logger(ProductActivatedHandler.name);

    constructor(
        private readonly auditService: AuditService,
    ) { }

    @OnEvent('product.activated')
    async handle(event: ProductActivatedEvent) {

        this.logger.log(
            `Product activated: ${event.productId}`,
        );

        await this.auditService.log({
            action: 'PRODUCT_CREATED',
            entityId: event.productId,
            timestamp: new Date(),
        });

        this.logger.log(`Notification sent for product ${event.productId}`);
    }
}