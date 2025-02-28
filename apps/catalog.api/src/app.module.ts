import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './Models/Product';
import { CreateProductEndpoint } from './Products/CreateProduct/CreateProductEndpoint';
import { CreateProductCommandHandler } from './Products/CreateProduct/CreateProductHandler';
import { GetProductsEndpoint } from './Products/GetProducts/GetProductsEndpoint';
import { GetProductsQueryHandler } from './Products/GetProducts/GetProductsHandler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    CqrsModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT as string, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Product],
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [CreateProductEndpoint, GetProductsEndpoint],
  providers: [CreateProductCommandHandler, GetProductsQueryHandler, Logger],
})
export class AppModule {}
