# Fabacus Tech Test
## Steve Coleman-Williams

### Getting started
1. Clone the repo locally
2. Run `yarn build`
3. Run `docker-compuse up [-d]`

### Configuration
All configuration options are exposed in the `docker-compose` file

### Functionality
Not all requirements from the brief have been implemented due to time. I have however attempted to architect in a way that show cases my abilities across the board using the technologies chosen.

#### Items implements
* Fetch all events
* Fetch event by ID
* Place hold, for specific user on specific event for defined duration (see docker-compose, default 60s)

#### Technology used
* NodeJS
* TypeScript
* REDIS
* PostGres

#### Things I'd do differently
* Use some kind of ORM Mapping library to communicate with the database - i started but the bootstrapping was taking too long, for such a simple DB
* implement auth properly
* finish the brief
* I wasn't sure how to lay seats out (rows/cols, etc) so the system just has the concept of available seats