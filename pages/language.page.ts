
import { Page, Locator } from '@playwright/test';

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

  async switchToPolish() {
    await this.profileButton.click();

    if (await this.polishOption.isVisible()) {
      await this.polishOption.click();
      return;
    }

    if (await this.englishOption.isVisible()) {
      // Język polski jest już ustawiony.
      await this.profileButton.click();
      return;
    }

    throw new Error(
      'Nie znaleziono opcji zmiany języka PL ani EN.'
    );
  }

  async switchToEnglish() {
    await this.profileButton.click();

    if (await this.englishOption.isVisible()) {
      await this.englishOption.click();
      return;
    }

    if (await this.polishOption.isVisible()) {
      // Język angielski jest już ustawiony.
      await this.profileButton.click();
      return;
    }

    throw new Error(
      'Nie znaleziono opcji zmiany języka EN ani PL.'
    );
  }
}
