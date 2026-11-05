# Testy automatyczne – Telemedi

Projekt zawiera trzy testy automatyczne aplikacji Telemedi, napisane w **Playwright + TypeScript**.

**Testowana aplikacja:** [Telemedi – środowisko testowe](https://testyautomatyczne.telemedi.com)

- Test rezerwacji wizyty z receptą – od logowania do przekierowania do operatora płatności.
- Test zmiany języka interfejsu na angielski.
- Test poprawności tłumaczenia nazw specjalistów na język angielski - Umawianie wizyty online. Ten test MA PRAWO FAILOWAĆ. 

**Uwaga:** Test rezerwacji sprawdza przekierowanie do operatora płatności Tpay, ale nie wykonuje płatności. Może utworzyć nieopłaconą rezerwację. Pod koniec testu wykonywana jest próba anulowania wizyt, które aplikacja pozwala anulować.

**Uwaga dotycząca testu tłumaczenia specjalistów:** Test sprawdza obecność angielskich nazw specjalistów, m.in. „Dermatologist” i „Internist”. Może zakończyć się niepowodzeniem, jeśli aplikacja nie wyświetla oczekiwanych tłumaczeń. Jest to zamierzone — test ma wykrywać błędy tłumaczenia, a nie pomijać je.

## Wymagania

- Node.js (wersja LTS)
- npm
- Git

## Instalacja i konfiguracja

1. Sklonuj repozytorium:

   ```bash
   git clone https://github.com/Mjudycka/zadanie_1.git
   cd zadanie_1
   ```

2. Zainstaluj zależności i przeglądarkę Chromium:

   ```bash
   npm ci
   npx playwright install chromium
   ```

3. Skopiuj `.env.example` do `.env` i uzupełnij dane konta testowego (`TEST_EMAIL`, `TEST_PASSWORD`). Adres aplikacji określa `BASE_URL`. Plik `.env` nie jest dodawany do repozytorium.

## Uruchamianie testów

Uruchom wszystkie testy:

```bash
npx playwright test
```

Uruchom wybrany test:

```bash
npx playwright test tests/m_judycka_booking_test.spec.ts
npx playwright test tests/m_judycka_language_test.spec.ts
npx playwright test tests/m_judycka_fail_test.spec.ts
```

Wyświetl raport HTML:

```bash
npx playwright show-report
```

Tryb przeglądarki ustawia stała `HEADLESS` na początku pliku `playwright.config.ts`. Domyślnie jest to `true` (headless, bez okna); zmień na `false`, aby zobaczyć okno przeglądarki. Testy działają w obu trybach.

## Tworzenie testów – Codegen

Playwright Codegen rejestruje czynności wykonywane w przeglądarce i automatycznie generuje odpowiadający im kod testu.

Uruchomienie:

```bash
npx playwright codegen https://testyautomatyczne.telemedi.com
```

Wygenerowany kod można wykorzystać w plikach `.spec.ts` w folderze `tests/`. Przed użyciem należy go sprawdzić i dostosować, szczególnie lokatory i asercje.

## Struktura projektu

- `tests/` – scenariusze testowe
- `pages/` – klasy Page Object i współdzielone czynności
- `playwright.config.ts` – konfiguracja testów
- `.env.example` – wzór konfiguracji środowiska

**Uwaga:** Test rezerwacji sprawdza przekierowanie do operatora płatności Tpay, ale nie wykonuje płatności. Może utworzyć nieopłaconą rezerwację. Pod koniec testu wykonywana jest próba anulowania wizyt, które aplikacja pozwala anulować.

**Uwaga dotycząca testu tłumaczenia specjalistów:** Test sprawdza obecność angielskich nazw specjalistów, m.in. „Dermatologist” i „Internist”. Może zakończyć się niepowodzeniem, jeśli aplikacja nie wyświetla oczekiwanych tłumaczeń. Jest to zamierzone — test ma wykrywać błędy tłumaczenia, a nie pomijać je.
