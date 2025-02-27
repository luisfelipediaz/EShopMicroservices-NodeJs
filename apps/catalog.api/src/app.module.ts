import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateProductEndpoint } from './Products/CreateProduct/CreateProductEndpoint';
import { CreateProductHandler } from './Products/CreateProduct/CreateProductHandler';

@Module({
  imports: [CqrsModule.forRoot()],
  controllers: [CreateProductEndpoint],
  providers: [CreateProductHandler],
})
export class AppModule {}
