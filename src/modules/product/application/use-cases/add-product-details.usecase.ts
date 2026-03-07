import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';

import { errorMessages } from '@errors/custom';
import { Product } from '../../domain/entities/product.entity';
import { ProductDetailsDto } from '../dto/product.dto';

@Injectable()
export class AddProductDetailsUseCase {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) { }

    async execute(productId: number, body: ProductDetailsDto, merchantId: number) {
        const result = await this.entityManager
            .createQueryBuilder()
            .update<Product>(Product)
            .set({ ...body })
            .where('id = :id', { id: productId })
            .andWhere('merchantId = :merchantId', { merchantId })
            .returning(['id'])
            .execute();

        if (result.affected < 1)
            throw new NotFoundException(errorMessages.product.notFound);

        return result.raw[0];
    }
}