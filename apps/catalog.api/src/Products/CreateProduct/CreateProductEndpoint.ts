import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateProductCommand } from './CreateProductHandler';

interface CreateProductRequest {
  name: string;
  price: number;
  description: string;
  category: string[];
  imageFile: string;
}

interface CreateProductResponse {
  id: string;
}

@Controller('products')
export class CreateProductEndpoint {
  constructor(private commandBus: CommandBus) {}

  @Post()
  async createProduct(
    @Body() createProductRequest: CreateProductRequest,
  ): Promise<CreateProductResponse> {
    return this.commandBus.execute(
      new CreateProductCommand(
        createProductRequest.name,
        createProductRequest.price,
        createProductRequest.description,
        createProductRequest.category,
        createProductRequest.imageFile,
      ),
    );
  }
}
