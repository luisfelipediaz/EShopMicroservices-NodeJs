import { Command, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Product } from 'src/Models/Product';

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
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  execute(command: CreateProductCommand): Promise<CreateProductResponse> {
    const product: Product = { ...command, id: '1' };

    return Promise.resolve({ id: product.id });
  }
}
