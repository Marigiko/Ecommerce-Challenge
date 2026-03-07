import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { RoleIds } from '@api/role/enum/role.enum';
import { Auth } from '@api/auth/guards/auth.decorator';
import { CurrentUser } from '@api/auth/guards/user.decorator';

import { CreateProductDto, ProductDetailsDto } from '../../application/dto/product.dto';

import { CreateProductUseCase } from '../../application/use-cases/create-product.usecase';
import { GetProductUseCase } from '../../application/use-cases/get-product.usecase';
import { AddProductDetailsUseCase } from '../../application/use-cases/add-product-details.usecase';
import { ActivateProductUseCase } from '../../application/use-cases/activate-product.usecase';
import { DeleteProductUseCase } from '../../application/use-cases/delete-product.usecase';

import { FindOneParams } from '@helpers/findOneParams.dto';
import { User } from '@database/entities/user.entity';

@Controller('product')
export class ProductController {
  constructor(
    private readonly getProductUseCase: GetProductUseCase,
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly addProductDetailsUseCase: AddProductDetailsUseCase,
    private readonly activateProductUseCase: ActivateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) { }

  @Get(':id')
  getProduct(@Param() params: FindOneParams) {
    return this.getProductUseCase.execute(params.id);
  }

  @Auth(RoleIds.Admin, RoleIds.Merchant)
  @Post('create')
  createProduct(
    @Body() body: CreateProductDto,
    @CurrentUser() user: User,
  ) {
    return this.createProductUseCase.execute(body, user.id);
  }

  @Auth(RoleIds.Admin, RoleIds.Merchant)
  @Post(':id/details')
  addProductDetails(
    @Param() params: FindOneParams,
    @Body() body: ProductDetailsDto,
    @CurrentUser() user: User,
  ) {
    return this.addProductDetailsUseCase.execute(
      params.id,
      body,
      user.id,
    );
  }

  @Auth(RoleIds.Admin, RoleIds.Merchant)
  @Post(':id/activate')
  activateProduct(
    @Param() params: FindOneParams,
    @CurrentUser() user: User,
  ) {
    return this.activateProductUseCase.execute(params.id, user.id);
  }

  @Auth(RoleIds.Admin, RoleIds.Merchant)
  @Delete(':id')
  deleteProduct(
    @Param() params: FindOneParams,
    @CurrentUser() user: User,
  ) {
    return this.deleteProductUseCase.execute(params.id, user.id);
  }
}