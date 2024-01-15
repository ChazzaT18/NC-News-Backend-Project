const request = require('supertest');
const testData = require("../db/data/test-data");
const db = require('../db/connection');
const seed = require("../db/seeds/seed");
const app = require('../app');



afterAll(() => {
    return db.end();
  });
  
  beforeEach(() => {
    return seed(testData);
  });

  describe('GET/api/topics',() => {
    test('returns status 200 and an array', () => {
      return request(app).get("/api/topics")
      .then((response) => {
        const topics = response.body.topic;
        expect(response.status).toBe(200)
        expect(Array.isArray(topics)).toBe(true)
      })
    })
    test('Results Should contain a property of slug and description', () => {
      return request(app).get("/api/topics")
      .then((response) => {
        const topics = response.body.topic;
        expect(response.status).toBe(200)
        expect(topics.every((topic) => {
          return topic.hasOwnProperty('slug') && topic.hasOwnProperty('description')
        })).toBe(true)
      })
    })
  })
