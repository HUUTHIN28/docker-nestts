import { Test, TestingModule } from '@nestjs/testing';
import { HomeStayService } from './home-stay.service';

describe('HomeStayService', () => {
  let service: HomeStayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeStayService],
    }).compile();

    service = module.get<HomeStayService>(HomeStayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
