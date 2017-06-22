import { PlanPage } from './app.po';

describe('plan App', () => {
  let page: PlanPage;

  beforeEach(() => {
    page = new PlanPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
