# Parking Lot Quiz

## Problem Statement
I own a parking lot that can hold up to ‘n’ cars at any given point in time. I want to create an automated ticketing system that allows my customers to use my parking lot without human intervention.
When a car enters my parking lot, I want to have a ticket issued to the driver. The ticket information contains the registration number (number plate) and the car size and allocated parking slot (we assume that our customers are nice enough to always park in the slots allocated to them). The customer should be allocated a parking slot which is nearest to the entry. At the exit the customer returns the ticket which then marks the slot they were using as being available.

## Progress
Design API and Maintain the state of the parking lot systems. The car info has only plate number and size (small, medium, large).
- [X] It should provide us with api to create parking lot
- [X] It should provide us with api to park the car
- [X] It should provide us with api to leave the slot
- [ ] It should provide us with api to get status of parking lot
- [X] It should provide us with api to get registration plate number list by car size
- [X] It should provide us with api to get registration allocated slot number list by car size
## Installation

Use the Docker to build

```bash
docker build -t parkinglot .
```

## Run

```bash
docker run -p 3000:3000 parkinglot
```

## API Endpoints Documentation (SWAGGER)

```bash
localhost:3000/api
```

## License
[MIT](https://choosealicense.com/licenses/mit/)