import { Logger } from '@nestjs/common';
import { IQueryHandler, Query, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/Models/Product';
import { Repository } from 'typeorm';

export interface GetProductsResponse {
  products: Product[];
}

export class GetProductsQuery extends Query<GetProductsResponse> {}

@QueryHandler(GetProductsQuery)
export class GetProductsQueryHandler
  implements IQueryHandler<GetProductsQuery>
{
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private logger: Logger,
  ) {}

  async execute(query: GetProductsQuery): Promise<GetProductsResponse> {
    this.logger.log(
      `GetProductsQueryHandler.execute with query: ${JSON.stringify(query)}`,
    );

    const products: Product[] = await this.productRepository.find();

    return { products };
  }
}
