import { QLTiepCDSharedModule } from './ql-tiep-cd-shared.module';

describe('SharedModule', () => {
  let sharedModule: QLTiepCDSharedModule;

  beforeEach(() => {
    sharedModule = new QLTiepCDSharedModule();
  });

  it('should create an instance', () => {
    expect(sharedModule).toBeTruthy();
  });
});
