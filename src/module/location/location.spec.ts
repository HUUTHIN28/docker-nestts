import { Test, TestingModule } from '@nestjs/testing';
import { Location } from './location';

describe('Location', () => {
  let provider: Location;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Location],
    }).compile();

    provider = module.get<Location>(Location);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
