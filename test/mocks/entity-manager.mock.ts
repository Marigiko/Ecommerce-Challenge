import { EntityManager } from 'typeorm';

export const createEntityManagerMock = (): Partial<EntityManager> => ({
    findOne: jest.fn(),
    find: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
    createQueryBuilder: jest.fn(),
});