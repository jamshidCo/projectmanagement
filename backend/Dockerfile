FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -q -e -DskipTests dependency:go-offline
COPY src ./src
RUN mvn -q -DskipTests package

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/projectmanagement-0.0.1-SNAPSHOT.jar app.jar
VOLUME ["/data"]
ENV SPRING_DATASOURCE_URL=jdbc:sqlite:/data/pm.db
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
