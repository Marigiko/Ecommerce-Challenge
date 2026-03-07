import { Injectable } from '@nestjs/common';

import { ProductRepository } from '../../infrastructure/repositories/product.repository';

@Injectable()
export class GetProductUseCase {
    constructor(
        private readonly productRepository: ProductRepository,
    ) { }

    async execute(productId: number) {
        return this.productRepository.findById(productId);
    }
}