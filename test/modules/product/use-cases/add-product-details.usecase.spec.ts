import { Test } from '@nestjs/testing';
import { getEntityManagerToken } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import {
    Categories,
} from '@database/entities/category.entity';

import { errorMessages } from '@errors/custom';
import { AddProductDetailsUseCase } from '@/modules/product/application/use-cases/add-product-details.usecase';
import { ComputerDetails } from '@/modules/product/application/dto/productDetails/computer.details';
import { ProductDetailsDto } from '@/modules/product/application/dto/product.dto';
import { VariationTypes } from '@/modules/product/domain/entities/product.entity';


describe('AddProductDetailsUseCase', () => {
    let usecase: AddProductDetailsUseCase;
    let entityManager: Partial<EntityManager>;

    const testProduct = { id: 1 };

    const computerDetails: ComputerDetails = {
        category: Categories.Computers,
        capacity: 2,
        capacityUnit: 'TB',
        capacityType: 'HD',
        brand: 'Dell',
        series: 'XPS',
    };

    const productDetails: ProductDetailsDto = {
        details: computerDetails,
        about: ['about 1'],
        description: 'test description',
        code: 'test UPC code',
        title: 'test title',
        variationType: VariationTypes.NONE,
    };

    beforeEach(async () => {
        entityManager = {
            createQueryBuilder: jest.fn().mockReturnValue({
                update: jest.fn(),
            }),
        };

        const module = await Test.createTestingModule({
            providers: [
                AddProductDetailsUseCase,
                {
                    provide: getEntityManagerToken(),
                    useValue: entityManager,
                },
            ],
        }).compile();

        usecase = module.get(AddProductDetailsUseCase);
    });

    describe('addProductDetails', () => {
        it('should throw not found product', async () => {
            entityManager.createQueryBuilder().update = jest.fn().mockReturnValue({
                set: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                andWhere: jest.fn().mockReturnThis(),
                returning: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValue({
                    affected: 0,
                    raw: [],
                }),
            });

            const result = usecase.execute(1, productDetails, 1);

            await expect(result).rejects.toThrow(
                errorMessages.product.notFound.message,
            );
        });

        it('should update product details', async () => {
            entityManager.createQueryBuilder().update = jest.fn().mockReturnValue({
                set: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                andWhere: jest.fn().mockReturnThis(),
                returning: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValue({
                    affected: 1,
                    raw: [testProduct],
                }),
            });

            const result = await usecase.execute(1, productDetails, 1);

            expect(entityManager.createQueryBuilder().update).toBeCalled();
            expect(result.id).toBe(testProduct.id);
        });
    });
});