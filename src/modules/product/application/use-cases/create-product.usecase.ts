import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { ProductRepository } from '../../infrastructure/repositories/product.repository';
import { ProductCreatedEvent } from '../../domain/events/product-created.event';
import { CreateProductDto } from '../dto/product.dto';

@Injectable()
export class CreateProductUseCase {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly eventEmitter: EventEmitter2,
    ) { }

    async execute(data: CreateProductDto, merchantId: number) {

        const product = await this.productRepository.create({
            categoryId: data.categoryId,
            merchantId,
            title: data.title,
            code: data.code,
            variationType: data.variationType,

            details: data.details,

            about: data.about ?? [],
            description: data.description
        });

        this.eventEmitter.emit(
            'product.created',
            new ProductCreatedEvent(product.id, merchantId),
        );

        return product;
    }
}