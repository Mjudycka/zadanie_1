
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { CookiesPage } from '../pages/cookies.page';

// TEST — FUNKCJONALNOŚĆ STRONY W JĘZYKU ANGIELSKIM

// Nazwy przypadłości nie mają angielskiej wersji lub 
// nie jest sprawna. Z tego powodu nie uwzględniłam tego na razie
// w teście. Test sprawdza podstawowe elementy strony, moze zostać rozwinięty.

test('Funkcjonalność strony w języku angielskim', async ({ page }) => {

  // KROK 1: Otwarcie strony logowania
  await page.goto('/pl/login/user-profile');

  // KROK 2: Akceptacja cookies w języku polskim
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

  // KROK 5: Sprawdzenie poprawnego logowania
  await loginPage.expectLoggedIn();

  // KROK 6: Otwarcie profilu użytkownika
  await page.getByRole('button', {
    name: 'Profil użytkownika',
  }).click();

  // KROK 7: Otwarcie ustawień języka
  await page.getByRole('menuitem', {
    name: /Język: Polski/,
  }).click();

  // KROK 8: Zmiana języka na angielski
  await page.getByRole('button', {
    name: 'English',
    exact: true,
  }).click();

  // KROK 9: Sprawdzenie przycisku Book a visit
  await expect(
    page.getByRole('button', { name: /Book a visit/ })
  ).toBeVisible();

  // KROK 10: Sprawdzenie linku Consultations
  await expect(
    page.getByRole('link', { name: /Consultations/ })
  ).toBeVisible();

  // KROK 11: Sprawdzenie linku Documentation
  await expect(
    page.getByRole('link', { name: /Documentation/ })
  ).toBeVisible();

  // KROK 12: Otwarcie menu Book a visit
  await page.getByRole('button', {
    name: /Book a visit/,
  }).click();

  // KROK 13: Sprawdzenie opcji Order a prescription
  await expect(
    page.getByRole('button', { name: /Order a prescription/ })
  ).toBeVisible();

  // KROK 14: Sprawdzenie opcji Remote visit Online
  await expect(
    page.getByRole('button', { name: /Remote visit Online/ })
  ).toBeVisible();

  // KROK 15: Sprawdzenie opcji Stationary visit
  await expect(
    page.getByRole('button', { name: /Stationary visit/ })
  ).toBeVisible();

  // KROK 16: Sprawdzenie opcji Examinations Laboratory
  await expect(
    page.getByRole('button', { name: /Examinations Laboratory/ })
  ).toBeVisible();

  // KROK 17: Sprawdzenie opcji Referral For
  await expect(
    page.getByRole('button', { name: /Referral For/ })
  ).toBeVisible();
});
