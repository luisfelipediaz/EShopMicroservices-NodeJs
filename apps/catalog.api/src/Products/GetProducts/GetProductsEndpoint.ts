import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Product } from 'src/Models/Product';
import { GetProductsQuery } from './GetProductsHandler';

interface GetProductsResponse {
  products: Product[];
}

@Controller('products')
export class GetProductsEndpoint {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async createProduct(): Promise<GetProductsResponse> {
    return await this.queryBus.execute(new GetProductsQuery());
  }
}
