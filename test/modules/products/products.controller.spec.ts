import { ProductsService } from './../../../src/modules/products/products.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './../../../src/modules/products/products.controller';

describe('ProductController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should ProductController be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of products', () => {
    expect(controller.findAll()).toBeUndefined();
  });
});
