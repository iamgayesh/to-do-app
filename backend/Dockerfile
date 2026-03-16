# Stage 1: Build the JAR inside Docker
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
#  pom.xml first — layer cache means deps only re-download when pom changes
COPY pom.xml .
RUN mvn dependency:go-offline -q
COPY src ./src
RUN mvn package -DskipTests -q

# Stage 2: Minimal runtime image
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]