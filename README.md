# Open Hockey

Utilizing the NHL's API to develop a hockey statisitcs platform. A modern looking web app that provide quick player lookup and data visualization.

## Current Todo

#### Release #1 - Initial GraphQL API

- [x] Apollo Server Setup
- [x] Initial Entities / GraphQL Objects
  - Player, Team, Conference, Divsion, Statistics
- [ ] Initial GraphQL Resolvers
  - Creating, updating and finding
  - Player search
- [x] Middleware
  - Admin Authorization and Rate Limit
- [x] Docker Initial Setup

#### Release #2 - Data Transfer

- [ ] Host Server and Postgres Database (Heroku??)
- [ ] Script to transfer data from NHL's API to Open Hockey's Database
- [ ] Daily/Hourly Cron jobs to check for completed games and players to update.

#### Release #3 - Vue Client

- [ ] Search View
- [ ] Player View

## Objectives

#### Current Objectives

- Develop a database that stores all player personal information and yearly statistics.
- Create a search engine page that queries this database and returns results through a GraphQL API
- When a player is selected through a search, retrieve and display their statistics.

#### Future Objectives

- Develop additional features, such as: live scores, team statistics, contract information, custom visualiztion features (charts, graphs...) etc.

## Technology Stack

#### GraphQL TS API

- https://nodejs.org/en/
- https://www.apollographql.com/docs/apollo-server/
- https://www.typescriptlang.org/
- https://typeorm.io/
- https://typegraphql.com/

#### PostegreSQL

- https://www.postgresql.org/

#### Vue.js

- https://vuejs.org/

## Author(s)

- Andrew Greenan - [GitHub](https://github.com/greenan8) - [LinkedIn](https://www.linkedin.com/in/andrewbgreenan/)

## Acknowledgments

- Drew Hynes
  - [NHL API Documentation](https://gitlab.com/dword4/nhlapi)
  - Drew has done a great job at breaking down and documenting the NHL's API! He has made my life much easier.
