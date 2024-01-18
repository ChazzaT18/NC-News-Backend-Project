# Northcoders News API

PROJECT OVERVIEW 

This project serves as the backend for the NorthCoders News application. It provides RESTful API endpoints for various operations, such as retrieving articles, comments, users, and topics, as well as posting comments and voting on articles. The API is built using Node.js, Express, and interacts with a PostgreSQL database.

HOSTED VERSION 

You can find the hosted version of the project at https://chazzat18-nc-news.onrender.com

GETTING STARTED

Follow these steps to set up the project locally:

Install dependencies:
(copy these into terminal one at a time)

npm install

npm install -D jest

npm install -D supertest

npm install -D jest-sorted

npm install -D pg

npm install -D pg-format

npm install -D express

npm i dotnev

SETTING UP DATABASE ENVIRONMENTS 

To be able to run this repo locally, you must create the following files in the root directory:

.env.test with the content 'PGDATABASE=<database_name_test>' (do you not write in the quotes)

.env.development with the content 'PGDATABASE=<DATABASE_NAME>' (do you not write in the quotes)

Add these files to your .gitignore to keep sensitive information secure.

CREATING AND RUNNING DATABASE

Create database:
npm run setup-dbs

Seed the local database:
npm run seed

ENDPOINTS

The API exposes the following endpoints:

/api/topics: Get all topics.
/api/articles: Get all articles, optionally filtered by topic.
/api/articles/:article_id: Get a specific article by ID.
/api/articles/:article_id/comments: Get comments for a specific article.
/api/users: Get all users.
/api/comments/:comment_id: Delete a comment by comment ID.
/api/articles/:article_id: Patch votes for a specific article.
/api/articles/:article_id/comments: Post a comment for a specific article.
For more details on the available endpoints, refer to the endpoints documentation.

TESTING:

to run the given test:
npm test app.test.js

Minimum Requirements
Make sure you have the following installed:

Node.js (minimum version: ^14.0.0)
PostgreSQL (minimum version: ^12.0.0)