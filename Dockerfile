FROM openjdk:23-jdk

COPY target/ztp_projekt.jar ztp_projekt.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "ztp_projekt.jar"]