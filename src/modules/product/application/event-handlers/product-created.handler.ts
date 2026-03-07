import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { ProductCreatedEvent } from '../../domain/events/product-created.event';

@Injectable()
export class ProductCreatedHandler {
    @OnEvent('product.created')
    handle(event: ProductCreatedEvent) {
        console.log('Product created:', event.productId);

        // audit log
        // create inventory
        // send notifications
    }
}