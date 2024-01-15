const request = require('supertest');
const testData = require("../db/data/test-data");
const db = require('../db/connection');
const seed = require("../db/seeds/seed");
const app = require('../app');
const endPointData = require('../endpoints.json')



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
        topics.forEach((topic) => {
          expect(topic.hasOwnProperty('slug'))
          expect(topic.hasOwnProperty('description'))
        })
        expect(response.status).toBe(200)
      })
    })
  })
  describe('GET/api', () => {
    test('returns status 200 and an object', () => {
      return request(app).get('/api').then((response) => {
        const endPoints = response.body.endPoint;
        expect(response.status).toBe(200);
        expect(typeof endPoints).toEqual('object');
      });
    });
    test('returns 200 and an object with the same structure as endpoint json file', () => {
      return request(app).get('/api').then((response) => {
        const endPoints = response.body.endPoint;
        expect(response.status).toBe(200);
        expect(endPoints).toEqual(endPointData);
      });
    });
  });