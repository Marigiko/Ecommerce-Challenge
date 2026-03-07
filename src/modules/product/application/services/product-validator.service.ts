import { Injectable } from '@nestjs/common';

import { ProductRepository } from '../../infrastructure/repositories/product.repository';

@Injectable()
export class ProductValidatorService {
    constructor(
        private readonly productRepository: ProductRepository,
    ) { }

    async validate(productId: number) {
        const product = await this.productRepository.findById(productId);

        if (!product) return false;

        return (
            !!product.title &&
            !!product.code &&
            !!product.description &&
            !!product.details
        );
    }
}
