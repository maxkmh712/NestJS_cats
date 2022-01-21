import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';

// 이 spec.ts는 테스트를 위한 파일

describe('CatsController', () => {
  let controller: CatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
    }).compile();

    controller = module.get<CatsController>(CatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
