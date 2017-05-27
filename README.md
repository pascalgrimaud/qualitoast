# QualiToast

[![qualitoast-project][qualitoast-project-image]][qualitoast-project-url] [![Build Status][travis-image-master]][travis-url] [![codecov][codecov-image]][codecov-url]


## Description

This application was generated using JHipster 4.3.0, with the following options:
- Angular
- Maven
- PostgreSQL
- ElasticSearch

It added:

- bootswatch theme: [pulse](https://bootswatch.com/4-alpha/pulse/)
- [PrimeNG](https://www.primefaces.org/primeng/#/) for chart


## Development

Before you can build this project, you must install and configure the following dependencies on your machine:

1. [Node.js][]: We use Node to run a development web server and build the project.
   Depending on your system, you can install Node either from source or as a pre-packaged bundle.
2. [Yarn][]: We use Yarn to manage Node dependencies.
   Depending on your system, you can install Yarn either from source or as a pre-packaged bundle.

After installing Node, you should be able to run the following command to install development tools.
You will only need to run this command when dependencies change in [package.json](package.json).

    yarn install

We use yarn scripts and [Webpack][] as our build system.


Run the following commands in two separate terminals to create a blissful development experience where your browser
auto-refreshes when files change on your hard drive.

    ./mvnw
    yarn start

[Yarn][] is also used to manage CSS and JavaScript dependencies used in this application. You can upgrade dependencies by
specifying a newer version in [package.json](package.json). You can also run `yarn update` and `yarn install` to manage dependencies.
Add the `help` flag on any command to see how you can use it. For example, `yarn help update`.

The `yarn run` command will list all of the scripts available to run for this project.

## Building for production

To optimize the QualiToast application for production, run:

    ./mvnw -Pprod clean package

This will concatenate and minify the client CSS and JavaScript files. It will also modify `index.html` so it references these new files.
To ensure everything worked, run:

    java -jar target/*.war

Then navigate to [http://localhost:8080](http://localhost:8080) in your browser.

Refer to [Using JHipster in production][] for more details.


## Testing

### Backend tests

To launch your application's tests, run:

    ./mvnw clean test

### Frontend tests

Unit tests are run by [Karma][] and written with [Jasmine][]. They're located in [src/test/javascript/](src/test/javascript/) and can be run with:

    yarn test

### End-to-End tests

UI end-to-end tests are powered by [Protractor][], which is built on top of WebDriverJS. They're located in [src/test/javascript/e2e](src/test/javascript/e2e)
and can be run by starting Spring Boot in one terminal (`./mvnw spring-boot:run`) and running the tests (`yarn run e2e`) in a second one.

### Other tests

Performance tests are run by [Gatling][] and written in Scala. They're located in [src/test/gatling](src/test/gatling) and can be run with:

    ./mvnw gatling:execute

For more information, refer to the [Running tests page][].

## Using Docker to simplify development (optional)

You can use Docker to improve your JHipster development experience. A number of docker-compose configuration are available in the [src/main/docker](src/main/docker) folder to launch required third party services.
For example, to start a PostgreSQL database in a docker container, run:

    docker-compose -f src/main/docker/postgresql.yml up -d

To stop it and remove the container, run:

    docker-compose -f src/main/docker/postgresql.yml down

To start a ElasticSearch in a docker container, run:

    docker-compose -f src/main/docker/elasticsearch.yml up -d

To stop it and remove the container, run:

    docker-compose -f src/main/docker/elasticsearch.yml down

You can also fully dockerize your application and all the services that it depends on.
To achieve this, first build a docker image of your app by running:

    ./mvnw package -Pprod docker:build

Then run:

    docker-compose -f src/main/docker/app.yml up -d

For more information refer to [Using Docker and Docker-Compose][], this page also contains information on the docker-compose sub-generator (`yo jhipster:docker-compose`), which is able to generate docker configurations for one or several JHipster applications.


## Docker Hub

This project build this automated Docker image at:

[![qualitoast-docker-hub][qualitoast-docker-image]][qualitoast-docker-url]

Try this image with dev profile:

    docker run -d -p 8080:8080 -e SPRING_PROFILES_ACTIVE=dev,swagger pascalgrimaud/qualitoast


Or, you can use the following docker-compose file to run:

- the application: QualiToast
- the database: PostgreSQL
- the search engine: ElasticSearch

```
version: '2'
services:
    qualitoast-app:
        image: pascalgrimaud/qualitoast
        environment:
            - SPRING_PROFILES_ACTIVE=prod,swagger
            - SPRING_DATASOURCE_URL=jdbc:postgresql://qualitoast-postgresql:5432/QualiToast
            - JHIPSTER_SLEEP=10
            - SPRING_DATA_ELASTICSEARCH_CLUSTER_NODES=qualitoast-elasticsearch:9300
        ports:
            - 8080:8080
    qualitoast-postgresql:
        image: postgres:9.6.2
        #volumes:
        #    - ~/volumes/jhipster/QualiToast/postgresql/:/var/lib/postgresql/
        environment:
            - POSTGRES_USER=QualiToast
            - POSTGRES_PASSWORD=
    qualitoast-elasticsearch:
        image: elasticsearch:2.4.1
        #volumes:
        #    - ~/volumes/jhipster/QualiToast/elasticsearch/:/usr/share/elasticsearch/data/
``` 

[JHipster Homepage and latest documentation]: https://jhipster.github.io
[JHipster 4.3.0 archive]: https://jhipster.github.io/documentation-archive/v4.3.0

[Using JHipster in development]: https://jhipster.github.io/documentation-archive/v4.3.0/development/
[Using Docker and Docker-Compose]: https://jhipster.github.io/documentation-archive/v4.3.0/docker-compose
[Using JHipster in production]: https://jhipster.github.io/documentation-archive/v4.3.0/production/
[Running tests page]: https://jhipster.github.io/documentation-archive/v4.3.0/running-tests/
[Setting up Continuous Integration]: https://jhipster.github.io/documentation-archive/v4.3.0/setting-up-ci/

[Gatling]: http://gatling.io/
[Node.js]: https://nodejs.org/
[Yarn]: https://yarnpkg.org/
[Webpack]: https://webpack.github.io/
[Angular CLI]: https://cli.angular.io/
[BrowserSync]: http://www.browsersync.io/
[Karma]: http://karma-runner.github.io/
[Jasmine]: http://jasmine.github.io/2.0/introduction.html
[Protractor]: https://angular.github.io/protractor/
[Leaflet]: http://leafletjs.com/
[DefinitelyTyped]: http://definitelytyped.org/

[travis-image-master]: https://travis-ci.org/pascalgrimaud/qualitoast.svg?branch=master
[travis-image-dev]: https://travis-ci.org/pascalgrimaud/qualitoast.svg?branch=dev
[travis-url]: https://travis-ci.org/pascalgrimaud/qualitoast/branches

[codecov]: https://codecov.io
[codecov-image]: https://codecov.io/gh/pascalgrimaud/qualitoast/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/pascalgrimaud/qualitoast

[qualitoast-docker-image]: https://img.shields.io/badge/docker%20hub-pascalgrimaud%2Fqualitoast-blue.svg?style=flat 
[qualitoast-docker-url]: https://hub.docker.com/r/pascalgrimaud/qualitoast/

[qualitoast-project-image]: https://img.shields.io/badge/project-qualitoast-593196.svg
[qualitoast-project-url]: https://github.com/pascalgrimaud/qualitoast
