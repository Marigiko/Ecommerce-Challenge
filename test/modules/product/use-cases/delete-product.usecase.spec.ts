import { Test } from '@nestjs/testing';
import { getEntityManagerToken } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { successObject } from '@helpers/sucess-response.interceptor';
import { errorMessages } from '@errors/custom';
import { DeleteProductUseCase } from '@/modules/product/application/use-cases/delete-product.usecase';

describe('DeleteProductUseCase', () => {
    let usecase: DeleteProductUseCase;
    let entityManager: Partial<EntityManager>;

    beforeEach(async () => {
        entityManager = {
            createQueryBuilder: jest.fn().mockReturnValue({
                delete: jest.fn(),
            }),
        };

        const module = await Test.createTestingModule({
            providers: [
                DeleteProductUseCase,
                {
                    provide: getEntityManagerToken(),
                    useValue: entityManager,
                },
            ],
        }).compile();

        usecase = module.get(DeleteProductUseCase);
    });

    describe('delete product', () => {
        it('should throw not found product', async () => {
            entityManager.createQueryBuilder().delete = jest.fn().mockReturnValue({
                from: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                andWhere: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValue({
                    affected: 0,
                    raw: [],
                }),
            });

            const result = usecase.execute(1, 1);

            await expect(result).rejects.toThrow(
                errorMessages.product.notFound.message,
            );
        });

        it('should delete product', async () => {
            entityManager.createQueryBuilder().delete = jest.fn().mockReturnValue({
                from: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                andWhere: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValue({
                    affected: 1,
                    raw: [],
                }),
            });

            const result = await usecase.execute(1, 1);

            expect(entityManager.createQueryBuilder().delete).toBeCalled();
            expect(result.message).toBe(successObject.message);
        });
    });
});