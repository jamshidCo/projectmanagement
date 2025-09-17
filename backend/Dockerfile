## Stage 1: Build layered jar
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /workspace
COPY pom.xml .
RUN mvn -q -DskipTests dependency:go-offline
COPY src ./src
RUN mvn -q -DskipTests package \
 && cp target/*-SNAPSHOT.jar app.jar \
 && java -Djarmode=layertools -jar app.jar extract

## Stage 2: Create trimmed JRE
FROM eclipse-temurin:21-jdk AS jre-build
WORKDIR /gen
COPY --from=build /workspace/app.jar ./app.jar
RUN jdeps --print-module-deps --ignore-missing-deps app.jar > deps.txt \
 && printf '%s\n' \
     java.base \
     java.logging \
     java.xml \
     java.naming \
     java.sql \
     java.management \
     java.instrument \
     java.desktop \
     jdk.unsupported \
     jdk.crypto.ec \
     java.security.jgss > base.txt \
 && cat deps.txt | tr ',' '\n' > deps_expanded.txt \
 && cat deps_expanded.txt base.txt | sed '/^$/d' | sort -u > modules.txt \
 && echo "Using modules: $(paste -sd, modules.txt)" \
 && jlink --add-modules $(paste -sd, modules.txt) \
     --strip-debug --no-man-pages --no-header-files --compress=2 \
     --output /opt/minijre

## Stage 3: Runtime (execute fat jar)
FROM gcr.io/distroless/base-debian12:nonroot
ENV JAVA_HOME=/opt/minijre PATH=/opt/minijre/bin:$PATH \
    SPRING_DATASOURCE_URL=jdbc:sqlite:/data/pm.db
WORKDIR /app
COPY --from=jre-build /opt/minijre /opt/minijre
COPY --from=build /workspace/app.jar /app/app.jar
VOLUME ["/data"]
EXPOSE 8080
USER nonroot
ENTRYPOINT ["java","-jar","/app/app.jar"]
