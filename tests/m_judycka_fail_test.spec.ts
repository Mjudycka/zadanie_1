
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { CookiesPage } from '../pages/cookies.page';

// Test FAIL
// Test sprawdza, czy nazwy specjalistów są poprawne
// (czyli w języku angielskim) po zmianie języka na angielski.

// Notka: nie wiem, jakie powinny być nazwy specjalistów, ani
// ilu dokładnie powinno ich być. 
// Ten test wymaga oczywiście poprawy. 

// Wyłączenie ponawiania dla testów w tej grupie
test.describe('Weryfikacja tłumaczenia nazw specjalistów', () => {
  test.describe.configure({ retries: 0 });

  test('Poprawność tłumaczenia nazw specjalistów na język angielski', async ({ page }) => {
    // KROK 1: Otwarcie strony logowania
    await page.goto('/pl/login');

    // KROK 2: Akceptacja cookies
    const cookiesPage = new CookiesPage(page);
    await cookiesPage.acceptCookies();

    // KROK 3: Pobranie danych logowania z pliku .env
    const email = process.env.TEST_EMAIL;
    const password = process.env.TEST_PASSWORD;

    if (!email || !password) {
      throw new Error(
        'Uzupełnij TEST_EMAIL i TEST_PASSWORD w pliku .env'
      );
    }

    // KROK 4: Logowanie
    const loginPage = new LoginPage(page);
    await loginPage.login(email, password);
    await loginPage.expectLoggedIn();

    // KROK 5: Otwarcie menu umawiania wizyty
    await page.getByRole('button', { name: /Umów się/ }).click();

    // KROK 6: Wybór wizyty zdalnej
    await page.getByRole('button', { name: /Wizyta zdalna/ }).click();

    // KROK 7: Otwarcie profilu użytkownika
    await page.getByRole('button', { name: 'Profil użytkownika' }).click();

    // KROK 8: Otwarcie ustawień języka
    await page.getByRole('menuitem', { name: /Język: Polski/ }).click();

    // KROK 9: Zmiana języka na angielski
    await page.getByRole('button', {
      name: 'English',
      exact: true,
    }).click();

    // KROK 10: Wybór specjalizacji
    const specialistSelect = page.getByRole('combobox');

    await expect(specialistSelect).toBeVisible();
    await specialistSelect.click();

    await page
      .getByRole('option', { name: /Automatisierte Tests - Internisten/ })
      .click();

    // KROK 11: Otwarcie listy specjalistów
    await specialistSelect.click();

    // Granice słów (\b) – żeby niemieckie "Internisten" nie zaliczało się jako "Internist".

    // KROK 12: Weryfikacja angielskiej nazwy Dermatologist
    await expect.soft(
      page.getByRole('option', { name: /\bDermatologist\b/ })
    ).toBeVisible();

    // KROK 13: Weryfikacja angielskiej nazwy Internist
    await expect.soft(
      page.getByRole('option', { name: /\bInternist\b/ })
    ).toBeVisible();
  });
});
