# Open Hockey
Utilizing the NHL's API to develop a hockey statisitcs platform. A modern looking web app that provide quick player lookup and data visualization.

## Current Todo ##
#### V0.1.0 - Completed Initial GraphQL API #### 
- [X] Apollo Server Setup
- [X] Initial Entities / GraphQL Objects
- [ ] Initial GraphQL Resolvers
- [X] Docker Setup
- [ ] Docker Production Deployment (Heroku?)
- [ ] PostgreSQL Database Hosted

#### V0.2.0 - Completed Initial Vue.js Client #### 
- [ ] Search View and Results
- [ ] Player View

## Objectives ##
#### Current Objectives #### 
* Develop a database that stores all player personal information and yearly statistics.
* Create a search engine page that queries this database and returns results through a GraphQL API
* When a player is selected through a search, retrieve and display their statistics.

#### Future Objectives ####
* Develop additional features, such as: live scores, team statistics, contract information, custom visualiztion feautes (charts, graphs...) etc.

## Technology Stack ##
#### GraphQL TS API ####
* https://nodejs.org/en/
* https://www.apollographql.com/docs/apollo-server/
* https://www.typescriptlang.org/
* https://typeorm.io/
* https://typegraphql.com/

#### PostegreSQL ####
* https://www.postgresql.org/

#### Vue.js ####
* https://vuejs.org/

## Author(s) ##
* Andrew Greenan - [GitHub](https://github.com/greenan8) - [LinkedIn](https://www.linkedin.com/in/andrewbgreenan/)

## Acknowledgments ##
* Drew Hynes
  * [NHL API Documentation](https://gitlab.com/dword4/nhlapi)
  * Drew has done a great job at breaking down and documenting the NHL's API! He has made my life much easier.
