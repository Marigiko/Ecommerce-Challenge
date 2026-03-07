import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { Product } from '../../domain/entities/product.entity';
import { errorMessages } from '@errors/custom';

@Injectable()
export class ProductRepository {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) { }

    async findById(productId: number) {
        const product = await this.entityManager.findOne(Product, {
            where: { id: productId },
        });

        if (!product)
            throw new NotFoundException(errorMessages.product.notFound);

        return product;
    }

    async create(product: Partial<Product>) {
        const entity = this.entityManager.create(Product, product);
        return this.entityManager.save(entity);
    }

    async updateDetails(
        productId: number,
        merchantId: number,
        data: Partial<Product>,
    ) {
        const result = await this.entityManager
            .createQueryBuilder()
            .update(Product)
            .set(data)
            .where('id = :id', { id: productId })
            .andWhere('merchantId = :merchantId', { merchantId })
            .returning(['id'])
            .execute();

        if (result.affected < 1)
            throw new NotFoundException(errorMessages.product.notFound);

        return result.raw[0];
    }

    async activate(productId: number, merchantId: number) {
        const result = await this.entityManager
            .createQueryBuilder()
            .update(Product)
            .set({ isActive: true })
            .where('id = :id', { id: productId })
            .andWhere('merchantId = :merchantId', { merchantId })
            .returning(['id', 'isActive'])
            .execute();

        if (result.affected < 1)
            throw new NotFoundException(errorMessages.product.notFound);

        return result.raw[0];
    }

    async delete(productId: number, merchantId: number) {
        const result = await this.entityManager
            .createQueryBuilder()
            .delete()
            .from(Product)
            .where('id = :productId', { productId })
            .andWhere('merchantId = :merchantId', { merchantId })
            .execute();

        if (result.affected < 1)
            throw new NotFoundException(errorMessages.product.notFound);

        return true;
    }
}