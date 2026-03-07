import { ConflictException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { errorMessages } from '@errors/custom';
import { ProductValidatorService } from '../services/product-validator.service';
import { ProductRepository } from '../../infrastructure/repositories/product.repository';

@Injectable()
export class ActivateProductUseCase {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly validator: ProductValidatorService,
        private readonly eventEmitter: EventEmitter2,
    ) { }

    async execute(productId: number, merchantId: number) {
        const isValid = await this.validator.validate(productId);

        if (!isValid)
            throw new ConflictException(errorMessages.product.notFulfilled);

        const product = await this.productRepository.activate(
            productId,
            merchantId,
        );

        this.eventEmitter.emit('product.activated', {
            productId: product.id,
            merchantId,
        });

        return product;
    }
}