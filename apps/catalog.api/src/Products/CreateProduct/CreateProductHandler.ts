import { Command, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/Models/Product';
import { Repository } from 'typeorm';

export interface CreateProductResponse {
  id: string;
}

export class CreateProductCommand extends Command<CreateProductResponse> {
  constructor(
    public readonly name: string,
    public readonly price: number,
    public readonly description: string,
    public readonly category: string[],
    public readonly imageFile: string,
  ) {
    super();
  }
}

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async execute(command: CreateProductCommand): Promise<CreateProductResponse> {
    const product = this.productRepository.create({
      name: command.name,
      price: command.price,
      description: command.description,
      category: command.category,
      imageFile: command.imageFile,
    });

    await this.productRepository.save(product);

    return { id: product.id };
  }
}
