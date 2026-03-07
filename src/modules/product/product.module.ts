import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductController } from './interface/controllers/product.controller';

import { UserModule } from '@api/user/user.module';

import { Product } from './domain/entities/product.entity';
import { Category } from '@database/entities/category.entity';
import { User } from '@database/entities/user.entity';

import { CreateProductUseCase } from './application/use-cases/create-product.usecase';
import { GetProductUseCase } from './application/use-cases/get-product.usecase';
import { AddProductDetailsUseCase } from './application/use-cases/add-product-details.usecase';
import { ActivateProductUseCase } from './application/use-cases/activate-product.usecase';
import { DeleteProductUseCase } from './application/use-cases/delete-product.usecase';

import { ProductValidatorService } from './application/services/product-validator.service';

import { ProductCreatedHandler } from './application/event-handlers/product-created.handler';
import { ProductRepository } from './infrastructure/repositories/product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, User]),
    UserModule,
  ],

  controllers: [ProductController],

  providers: [
    // repositories
    ProductRepository,

    // services
    ProductValidatorService,

    // use cases
    CreateProductUseCase,
    GetProductUseCase,
    AddProductDetailsUseCase,
    ActivateProductUseCase,
    DeleteProductUseCase,

    // event handlers
    ProductCreatedHandler,
  ],

  exports: [ProductRepository],
})
export class ProductModule { }