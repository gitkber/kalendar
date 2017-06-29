import { KalendarPage } from './app.po';

describe('kalendar App', () => {
  let page: KalendarPage;

  beforeEach(() => {
    page = new KalendarPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
