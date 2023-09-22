# Gizmo (productivity software)

A web based application that offers organizational tools for work or study.

[See it live](http://gizmo-client.s3-website.eu-central-1.amazonaws.com) via AWS

## 1) Setup

### Run with docker

The application is fully dockerized with multi-staged Dockerfiles.

````
git clone https://github.com/hamza-aloglu/gizmo.git
cd gizmo
docker compose -f docker-compose.dev.yml up --build
````

Go to [127.0.0.1:3000](http://127.0.0.1:3000) in your browser.

## 2) Tech Features

### App Architecture

Constructed the application by making use of [OAuth2 architecture](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-05\#name-protocol-flow) with the integration of 4 different services :

- Created an authorization server that is responsible for generation and distrubtion of JWTs according to OAuth2 principles with [Spring authorization server](https://spring.io/projects/spring-authorization-server).

- Implemented a Spring boot REST API that accepts JWTs created in spring authorization server.

- PostgreSQL database. see [database schema](https://raw.githubusercontent.com/hamza-aloglu/gizmo/main/gizmo-db-ERD.png?token=GHSAT0AAAAAACEMKCWDGXGNRYAGI7DVBECGZH3JQ2Q)

- Constructed React frontend that can receive JWT with [Authorization Code Grant](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-05#name-authorization-code-grant) method

### Kanban board

Created Kanban board with drag and drop feature between cards and between columns on Kanban board with the help of [React-DnD](https://github.com/react-dnd/react-dnd) library.


### Scheduler

- With [ScheduledExecutorService](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ScheduledExecutorService.html) and [ConcurrentHashMap](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ConcurrentHashMap.html), I ensured that requests can be executed after a given time and can be cancelled at any time.

User is able to schedule the card' column replacement for tomorrow.

## 3) Database

Entity relationship diagram of resource server

<img width=800 alt="185167091-6c7c6466-6743-4d79-a493-17f8d863700d" src="https://github.com/hamza-aloglu/gizmo/blob/main/gizmo-db-ERD.png?raw=true">
