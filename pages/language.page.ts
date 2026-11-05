import { Page, Locator, expect } from '@playwright/test';

export class LanguagePage {
  readonly page: Page;
  readonly profileButton: Locator;
  readonly polishOption: Locator;
  readonly englishOption: Locator;

  constructor(page: Page) {
    this.page = page;

    // Nazwa profilu zależy od języka interfejsu.
    this.profileButton = page.locator(
      '[aria-label="Profil użytkownika"], [aria-label="User profile"]'
    );

    // Przyciski językowe mają wspólną strukturę HTML.
    this.polishOption = page.locator('button').filter({
      has: page.locator('span.MuiTypography-h5', {
        hasText: /^PL$/,
      }),
    });

    this.englishOption = page.locator('button').filter({
      has: page.locator('span.MuiTypography-h5', {
        hasText: /^EN$/,
      }),
    });
  }

  // Otwiera menu profilu i czeka, aż pojawi się przynajmniej jedna opcja językowa.
  // isVisible() nie czeka, więc bez tego test zależy od tempa renderowania.
  private async openLanguageMenu() {
    await this.profileButton.click();

    await expect(
      this.polishOption.or(this.englishOption).first()
    ).toBeVisible();
  }

  async switchToPolish() {
    await this.openLanguageMenu();

    if (await this.polishOption.isVisible()) {
      await this.polishOption.click();
      return;
    }

    // Menu jest otwarte, a opcji PL brak – język polski jest już ustawiony.
    await expect(this.englishOption).toBeVisible();
    await this.profileButton.click();
  }

  async switchToEnglish() {
    await this.openLanguageMenu();

    if (await this.englishOption.isVisible()) {
      await this.englishOption.click();
      return;
    }

    // Menu jest otwarte, a opcji EN brak – język angielski jest już ustawiony.
    await expect(this.polishOption).toBeVisible();
    await this.profileButton.click();
  }
}
