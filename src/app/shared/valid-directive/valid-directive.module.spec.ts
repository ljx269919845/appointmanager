import { ValidDirectiveModule } from './valid-directive.module';

describe('ValidDirectiveModule', () => {
  let validDirectiveModule: ValidDirectiveModule;

  beforeEach(() => {
    validDirectiveModule = new ValidDirectiveModule();
  });

  it('should create an instance', () => {
    expect(validDirectiveModule).toBeTruthy();
  });
});
