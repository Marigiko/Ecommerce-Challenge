import { Test } from '@nestjs/testing';
import { getEntityManagerToken } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { CreateProductUseCase } from '@/modules/product/application/use-cases/create-product.usecase';
import { createEntityManagerMock } from '@test/mocks/entity-manager.mock';

import { Category } from '@database/entities/category.entity';
import { Product } from '@modules/product/domain/entities/product.entity';
import { errorMessages } from '@errors/custom';

describe('CreateProductUseCase', () => {
    let usecase: CreateProductUseCase;
    let entityManager;
    let eventEmitter;

    const category = { id: 1 } as Category;
    const product = { id: 1 } as Product;

    beforeEach(async () => {
        entityManager = createEntityManagerMock();
        eventEmitter = { emit: jest.fn() };

        const module = await Test.createTestingModule({
            providers: [
                CreateProductUseCase,
                {
                    provide: getEntityManagerToken(),
                    useValue: entityManager,
                },
                {
                    provide: EventEmitter2,
                    useValue: eventEmitter,
                },
            ],
        }).compile();

        usecase = module.get(CreateProductUseCase);
    });

    it('should throw if category not found', async () => {
        entityManager.findOne.mockResolvedValue(null);

        const result = usecase.execute({ categoryId: 1 }, 1);

        await expect(result).rejects.toThrow(
            errorMessages.category.notFound.message,
        );
    });

    it('should create product and emit event', async () => {
        entityManager.findOne.mockResolvedValue(category);
        entityManager.create.mockReturnValue(product);
        entityManager.save.mockResolvedValue(product);

        const result = await usecase.execute({ categoryId: 1 }, 1);

        expect(entityManager.save).toBeCalled();
        expect(eventEmitter.emit).toBeCalledWith(
            'product.created',
            expect.anything(),
        );
        expect(result.id).toBe(1);
    });
});