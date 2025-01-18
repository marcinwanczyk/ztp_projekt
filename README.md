# ZTP Project

## Opis projektu

Ten projekt to aplikacja webowa zbudowana przy użyciu Java, Spring Boot i Angular. Umożliwia użytkownikom zarządzanie rezerwacjami boisk.

## Użytkowanie
Rezerwacje boisk
Użytkownicy mogą przeglądać dostępne boiska i dokonywać rezerwacji.
Użytkownicy mogą przeglądać i usuwać swoje rezerwacje.
Okna potwierdzeń
Okna potwierdzeń są używane do działań takich jak usuwanie rezerwacji.

## Użyte technologie

- Java
- Spring Boot
- Maven
- MySQL
- Angular
- TypeScript
- PrimeNG
- Docker

## Wymagania wstępne

- Java 21
- Node.js i npm
- Docker i Docker Compose
- Maven

## Uruchamianie

### Zbuduj projekt

mvn clean install
docker-compose up --build
To uruchomi aplikację Spring Boot i bazę danych MySQL.

Przejdź do katalogu frontend:
cd ztp-projekt-frontend

npm install
ng serve

### Adres aplikacji
Aplikacja będzie dostępna pod adresem http://localhost:4200/.

## Właściwości aplikacji
Właściwości aplikacji Spring Boot są skonfigurowane w pliku src/main/resources/application.properties.

## Struktura projektu
Backend
src/main/java: Kod źródłowy Java
src/main/resources: Właściwości aplikacji i inne zasoby
Frontend
ztp-projekt-frontend/src/app: Kod źródłowy aplikacji Angular

## Widoki aplikacji
![Login](https://github.com/user-attachments/assets/8c663a2c-00d7-447a-88be-dbba6e62d235)
![Sing in](https://github.com/user-attachments/assets/a9957003-bf1a-4713-9411-1833c067f942)
![Fields](https://github.com/user-attachments/assets/e759a0f7-6a93-4f9d-8a79-615e38bc6ec7)
![Reservation](https://github.com/user-attachments/assets/f90d7917-9937-4ca9-8288-963c91d5a5bc)
![Hours](https://github.com/user-attachments/assets/c2fe3152-aeaa-4c1e-89f3-8e534e21dd7e)
