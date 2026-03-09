import { OnEvent } from '@nestjs/event-emitter';
import { Injectable, Logger } from '@nestjs/common';
import { ProductCreatedEvent } from '../../domain/events/product-created.event';
import { InventoryService } from '@/modules/inventory/application/services/inventory.service';
import { AuditService } from '@/modules/audit/application/services/audit.service';

@Injectable()
export class ProductCreatedHandler {

    private readonly logger = new Logger(ProductCreatedHandler.name);

    constructor(
        private readonly inventoryService: InventoryService,
        private readonly auditService: AuditService,
    ) { }

    @OnEvent('product.created')
    async handle(event: ProductCreatedEvent) {

        this.logger.log(`Product created: ${event.productId}`);

        await this.inventoryService.createInventoryForProduct(
            event.productId,
        );

        await this.auditService.log({
            action: 'PRODUCT_CREATED',
            entityId: event.productId,
            timestamp: new Date(),
        });

        this.logger.log(`Notification sent for product ${event.productId}`);
    }
}