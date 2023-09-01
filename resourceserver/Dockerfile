# syntax=docker/dockerfile:1
FROM eclipse-temurin:17-jdk-jammy as base
WORKDIR /app
COPY gradlew ./
COPY gradle ./gradle
COPY build.gradle settings.gradle ./
RUN ./gradlew dependencies
COPY src ./src

FROM base as development
CMD ["./gradlew", "bootRun", "--args='--spring-boot.run.jvmArguments=-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:8000'"]

FROM base as build

RUN ./gradlew build
FROM eclipse-temurin:17-jre-jammy as production
EXPOSE 8081
COPY --from=build /app/build/libs/resourceserver-*.jar /resourceserver.jar
CMD ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/resourceserver.jar"]