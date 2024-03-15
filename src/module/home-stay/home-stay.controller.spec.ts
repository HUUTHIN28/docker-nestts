import { Test, TestingModule } from '@nestjs/testing';
import { HomeStayController } from './home-stay.controller';

describe('HomeStayController', () => {
  let controller: HomeStayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeStayController],
    }).compile();

    controller = module.get<HomeStayController>(HomeStayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
