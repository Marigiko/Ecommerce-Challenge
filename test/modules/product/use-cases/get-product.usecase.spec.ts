import { GetProductUseCase } from "@/modules/product/application/use-cases/get-product.usecase";
import { Test } from "@nestjs/testing";
import { getEntityManagerToken } from "@nestjs/typeorm";
import { createEntityManagerMock } from "@test/mocks/entity-manager.mock";

describe('GetProductUseCase', () => {
    let usecase: GetProductUseCase;
    let entityManager;

    const product = { id: 1 };

    beforeEach(async () => {
        entityManager = createEntityManagerMock();

        const module = await Test.createTestingModule({
            providers: [
                GetProductUseCase,
                {
                    provide: getEntityManagerToken(),
                    useValue: entityManager,
                },
            ],
        }).compile();

        usecase = module.get(GetProductUseCase);
    });

    it('should throw if product not found', async () => {
        entityManager.findOne.mockResolvedValue(null);

        const result = usecase.execute(1);

        await expect(result).rejects.toThrow();
    });

    it('should return product', async () => {
        entityManager.findOne.mockResolvedValue(product);

        const result = await usecase.execute(1);

        expect(result.id).toBe(1);
    });
});