# Wybieramy obraz bazowy z OpenJDK
FROM openjdk:21-jdk

# Ustalamy katalog roboczy
WORKDIR /app

# Kopiujemy pliki projektu do kontenera
COPY . /app

# Ustawiamy port, na którym aplikacja będzie nasłuchiwać
EXPOSE 8080

# Uruchamiamy aplikację
CMD ["java", "-jar", "target/ztp_projekt.jar"]