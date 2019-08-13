# HT Blockchain Sync Service

Caches blockchain operation transfers made on Token for Hope project from DCore into the HT Engine Service PostgreSQL database.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

The project is written in Kotlin with the usage of Spring Framework and Reactive Extention of Kotlin RxKotlin. Also official DECENT DCore SDK used.

```
Java 8
Gradle
Docker
```

### Installing

Just run the main method and embedded Tomcat server will start scheduled job according to the configuration. Set spring profile to "local" in your IDE. For example, in IntelliJ, you can set your profile in Run Configurations.

```
Run -> Edit Configuration -> Kotlin -> com.decent.t4h.T4hApplication
```

Set the VM options to

```
-Dspring.profiles.active=local
```

### Coding style - SOLID

SOLID is a term describing a collection of design principles for good code that was invented by Robert C. Martin, also known as Uncle Bob.

```
https://en.wikipedia.org/wiki/SOLID
```

## Deployment

You need to declare a set of env variables at first.

```
DB_CONNECTION_URL - Whole JDBC connection url to PostgreSQL DB with username and password.

MAX_BLOCKS_SYNC - Maximal number of blocks that will be reached on one run.

BLOCKCHAIN_URL - URL to the DCore blockchain node.

SYNC_EVERY_MS - Time in ms for a delay between every job run.

ASSET_SYMBOL - UIA asset symbol to sync e.g.: T4H
```

You need to build Docker image with this command:

```
./gradlew build docker
```
This command will build and push image to your local Docker with this name:
```
com.decent.t4h/t4h-sync-service
```
After that you can start your image with docker run command. Don't forget to set your environment.
```
SPRING_PROFILE=local
```
Full command:
```
docker run --env SPRING_PROFILE=local --net=host -it com.decent.t4h/t4h-sync-service
```

## Built With

* [Gradle](https://gradle.org/) - https://gradle.org/
