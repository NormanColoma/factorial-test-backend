# Project Structure

The project contains both, the backend and the frontend. I've decided to put them together in the same repository as it is a small project, 
and it is easier to run it locally.

## Backend

Inside the src folder you will find the following DDD structure:

* **Application**: This layer contains the application services. It is responsible for the coordination of the domain layer and the infrastructure layer.
* **Domain**: This layer contains the domain model entities, it is the core of the application
* **Infrastructure**: This layer contains the implementation of the domain repositories and the external services.

Aside from those principal folders, you'll find the test folder, which contains the unit tests for all layers.
In the container.js file you'll find the IoC container, which is used to inject the dependencies.

## Frontend

The fronted contains the typical React structure. But also a certain degree of DDD, as I've tried to decouple the UI logic from the framework.
Thus, we're reducing the coupling between the UI and the framework, hence, we can change the framework without having to rewrite the UI logic.

Inside the src folder you will find the following structure:

* **Components**: This folder contains the React components. They are dumb components, which means that they don't have any logic, just the UI.
* **Containers**: This folder contains the React containers, which are responsible for the logic of the components. They are smart, so
they can have state, and they can communicate with the backend by dispatching actions.
* **Actions**: This folder contains the actions that are dispatched by the containers.
* **Reducers**: This folder contains the reducers that are used to update the state of the application.
* **Domain**: This folder contains the domain model entities. They are used to map the data that is returned by the backend and
for handling the logic regarding how to display the data in the UI. This way, we can decouple our ui logic from the
framework that we are using (React in this case).
* **Infrastructure**: This folder contains the services that are used to communicate with the backend. Once again, 
we are decoupling the framework from the logic of the application.

Unlike the backend, all the test are in the same folder, as it's a common practice in front applications.

# Language and Frameworks

For the backend, I've used Node.js (vanilla javascript) with Express.js as a framework for the application. I've chosen Node.js because is the language that I'm most familiar with
and I think it is a good fit for this kind of application. 

For the frontend, I've used React.js. I've chosen React.js due to its simplicity and the fact that it is a good fit for this kind of application.

# Code Style

The code style for the backend is base on the Google JavaScript Style Guide, with some modifications. You can find the rules in the .eslintrc.json file.

# Decisions regarding the solution

Since the test requirements are quite simple and up to the candidate, I've decided to implement a simple solution, but with some extra features that I think are important
for showing my knowledge and skills regarding DDD, decoupling, testing, logging and monitoring, communication between microservices, etc.

So my solution consists in a backend service that exposes an API for creating and fetching weather metrics. Each metric has a name, a value and a timestamp
(as required in the test). I've decided to use the name of each metric as the type of the metric, so we can have three different types of metrics (temperature, wind speed and precipitation).
As mentioned before the backend is implemented guided by DDD principles, so it is divided in three layers: Application, Domain and Infrastructure. 
I persist the metrics in a mongo database. Also, I've added RabbitMQ as a message broker for emulate the common scenario when having an event-driven 
architecture or for communicating between different bounded contexts within a monolithic application. In this case, I've used it for communicating between the backend and the frontend. So, when a metric is created, a message is published by our
EventBus service (which in this case is implemented with RabbitMQ). Typically, those events would be consumed by other services, but in this case, I've implemented it just
for showing how it would work. 

At the frontend, I've implemented a simple UI for fetching and displaying the metrics. I've used React.js for the UI, React hooks for the state management 
and React effects for handling the side effects. The metrics are displayed in a timeline chart, for the date time ranges selected, so you can see the evolution of the metrics
by minutes/hours/days. On behalf of simplicity, I've created three different charts, one for each metric.

![alt text](https://i.imgur.com/mGXtACS.png)

## API

The API basically consists in two endpoints:

**POST /api/v1/weather-metrics**

This POST endpoint is used to create a new weather metric. It receives the following body:

```json
{
  "name": "Temperature",
  "value": 20,
  "timestamp": "2024-01-18T00:00:00.000Z"
}
```

It returns 201 if the metric was created successfully, 400 if the body is not valid, 422 if some domain validation fails and 
500 if there was an internal server error.

**GET /api/v1/weather-metrics**

This GET endpoint is used to search for weather metrics between two dates. It receives the following query params:

```json
{
  "from": "2024-01-18T00:00:00.000Z",
  "to": "2024-01-18T00:00:00.000Z"
}
```

It returns 200 if the metrics were found successfully, 400 if the query params are not valid and 500 if there was an internal server error.

The response is as follows:

```json
{
  "average": {
    "temperature": 12,
    "windSpeed": 5,
    "precipitation": 15
  },
  "metrics": {
    "temperature": [
      {
        "name": "temperature",
        "timestamp": 1705276920000,
        "value": 12
      },
      {
        "name": "temperature",
        "timestamp": 1705279200000,
        "value": 12
      }
    ],
    "windSpeed": [
      {
        "name": "wind_speed",
        "timestamp": 1705290720000,
        "value": 5
      }
    ],
    "precipitation": [
      {
        "name": "precipitation",
        "timestamp": 1705290720000,
        "value": 15
      }
    ]
  }
}
```

It contains the average of the metrics between the two dates and the metrics themselves in each array per metric type.

# Logging and monitoring

I've implemented a logger for logging errors, info messages and specially requests, something that we usually sink in a log management system such Kibana.
Besides, I've added Sentry for error tracking, which is a good tool for monitoring errors in a real production environment.

![alt text](https://i.imgur.com/Vp12DY9.png)

For monitoring, I've added New Relic, which allows us to monitor the performance of the application, the response times, the throughput, etc.

![alt text](https://i.imgur.com/0ASSnZn.png)

# How to run the project

## Requirements

* Docker
* Docker Compose

## Steps

1. Clone the repository
2. Run `docker-compose up` in the root folder. It will build the docker images (node.js backend, mongo, rabbitmq and frontend) and run them.
3. The frontend will be running on `http://localhost:3001` and the backend on `http://localhost:3000`
