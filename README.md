# Testy automatyczne – Telemedi

Projekt zawiera dwa testy automatyczne aplikacji Telemedi, napisane w **Playwright + TypeScript**. 
- Testowana jest funkcja umawiania wizyty z receptą, do momentu przekierowania do płatności. 
- Nieopłacone wizyty są anulowane pod koniec testu (cleanup). 
- Drugi test sprawdza funkcjonalność tłumaczenia na język angielski. 

**Testowana aplikacja:** [Telemedi – środowisko testowe](https://testyautomatyczne.telemedi.com)



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
npx playwright test tests/m_judycka_test.spec.ts
```

Wyświetl raport HTML:
```bash
npx playwright show-report
```

Przeglądarka domyślnie uruchamia się w trybie widocznym. (headless=false)

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

**Uwaga:** test rezerwacji sprawdza przekierowanie do operatora płatności Tpay, ale nie wykonuje płatności. Może utworzyć nieopłaconą rezerwację. Po teście wykonywana jest próba anulowania wizyt, które aplikacja pozwala anulować.

