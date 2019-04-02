import { KetthucTtktTinhModule } from './ketthuc-ttkt-tinh.module';

describe('KetthucTtktTinhModule', () => {
  let ketthucTtktTinhModule: KetthucTtktTinhModule;

  beforeEach(() => {
    ketthucTtktTinhModule = new KetthucTtktTinhModule();
  });

  it('should create an instance', () => {
    expect(ketthucTtktTinhModule).toBeTruthy();
  });
});
