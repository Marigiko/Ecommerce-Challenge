import { Test } from '@nestjs/testing';
import { getEntityManagerToken } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { errorMessages } from '@errors/custom';
import { ProductValidatorService } from '@/modules/product/application/services/product-validator.service';
import { ActivateProductUseCase } from '@/modules/product/application/use-cases/activate-product.usecase';

describe('ActivateProductUseCase', () => {
    let usecase: ActivateProductUseCase;
    let entityManager: Partial<EntityManager>;
    let validator: Partial<ProductValidatorService>;

    const fulfilledProduct = {
        id: 1,
        isActive: true,
    };

    beforeEach(async () => {
        entityManager = {
            createQueryBuilder: jest.fn().mockReturnValue({
                update: jest.fn(),
            }),
        };

        validator = {
            validate: jest.fn(),
        };

        const module = await Test.createTestingModule({
            providers: [
                ActivateProductUseCase,
                {
                    provide: getEntityManagerToken(),
                    useValue: entityManager,
                },
                {
                    provide: ProductValidatorService,
                    useValue: validator,
                },
            ],
        }).compile();

        usecase = module.get(ActivateProductUseCase);
    });

    describe('activate product', () => {
        it('should throw if product not fulfilled', async () => {
            validator.validate = jest.fn().mockResolvedValue(false);

            const result = usecase.execute(1, 1);

            await expect(result).rejects.toThrow(
                errorMessages.product.notFulfilled.message,
            );
        });

        it('should activate product', async () => {
            validator.validate = jest.fn().mockResolvedValue(true);

            entityManager.createQueryBuilder().update = jest.fn().mockReturnValue({
                set: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                andWhere: jest.fn().mockReturnThis(),
                returning: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValue({
                    affected: 1,
                    raw: [fulfilledProduct],
                }),
            });

            const result = await usecase.execute(1, 1);

            expect(entityManager.createQueryBuilder().update).toBeCalled();
            expect(result.id).toBe(1);
            expect(result.isActive).toBe(true);
        });
    });
});