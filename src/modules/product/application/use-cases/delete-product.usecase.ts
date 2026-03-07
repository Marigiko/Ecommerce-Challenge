import { Injectable } from '@nestjs/common';

import { ProductRepository } from '../../infrastructure/repositories/product.repository';

@Injectable()
export class DeleteProductUseCase {
    constructor(
        private readonly productRepository: ProductRepository,
    ) { }

    async execute(productId: number, merchantId: number) {
        await this.productRepository.delete(productId, merchantId);

        return {
            success: true,
        };
    }
}