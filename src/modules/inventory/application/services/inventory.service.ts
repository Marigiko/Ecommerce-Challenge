import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class InventoryService {

    private readonly logger = new Logger(InventoryService.name);

    async createInventoryForProduct(productId: number) {

        this.logger.log(`Inventory created for product ${productId}`);

        return {
            productId,
            stock: 0
        };
    }
}