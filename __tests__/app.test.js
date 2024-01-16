const request = require("supertest");
const testData = require("../db/data/test-data");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const app = require("../app");
const endPointData = require("../endpoints.json");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(testData);
});

describe("GET/api", () => {
  test("returns status 200 and an object", () => {
    return request(app)
      .get("/api")
      .then((response) => {
        const endPoints = response.body.endPoints;
        expect(200);
        expect(typeof endPoints).toEqual("object");
      });
  });
})

describe("GET/api/topics", () => {
  test("returns status 200 and an array", () => {
    return request(app)
      .get("/api/topics")
      .then((response) => {
        const topics = response.body.topic;
        expect(200);
        expect(Array.isArray(topics)).toBe(true);
      });
  });
  test("Results Should contain a property of slug and description", () => {
    return request(app)
      .get("/api/topics")
      .then((response) => {
        const topics = response.body.topic;
        topics.forEach((topic) => {
          expect(topic.hasOwnProperty("slug"));
          expect(topic.hasOwnProperty("description"));
        });
        expect(200);
      });
  });
});
describe("GET/api", () => {
  test("returns status 200 and an object", () => {
    return request(app)
      .get("/api")
      .then((response) => {
        const endPoints = response.body.endPoints;
        expect(200);
        expect(typeof endPoints).toEqual("object");
      });
  });
  test("returns 200 and an object with the same structure and content as endpoint json file", () => {
    return request(app)
      .get("/api")
      .then((response) => {
        const endPoints = response.body.endPoints;
        expect(200);
        expect(endPoints).toEqual(endPointData);
      });
  });
});
describe("GET/api/articles/:article_id", () => {
  test("returns status 200 and an article object with correct properties", () => {
    return request(app)
      .get("/api/articles/1")
      .then((response) => {
        const article = response.body.article;
        expect(typeof article).toEqual("object");
        expect(200);
        expect(article).toEqual({
          article: {
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 100,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          },
        });
      });
  });
  test("returns status 404 when id number is not in the database", () => {
    return request(app)
      .get("/api/articles/10090")
      .then((response) => {
        expect(404);
        expect(response.body.msg).toBe("Not found");
      });
  });
  test("returns status 400 given an invalid article_id", () => {
    return request(app)
      .get("/api/articles/banana")
      .then((response) => {
        expect(400);
        expect(response.body.msg).toBe("article_id must be a number");
      });
  });
  test("returns status 200 and an article object with correct properties", () => {
    return request(app)
      .get("/api/articles/4")
      .then((response) => {
        const article = response.body.article;
        expect(200);
        expect(article).toEqual({
          article: {
            article_id: 4,
            title: "Student SUES Mitch!",
            topic: "mitch",
            author: "rogersop",
            body: "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
            created_at: "2020-05-06T01:14:00.000Z",
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            votes: 0,
          },
        });
      });
  });
  describe('GET/api/articles', () => {
    test("returns 200 and an array of objects with the objects containing correct keys", () => {
      return request(app)
        .get("/api/articles")
        .then((response) => {
          const articles = response.body.articles;
          expect(200);
          expect(Array.isArray(articles)).toEqual(true);
          expect(articles[0]).toEqual({
            author: "icellusedkars",
            title: "Eight pug gifs that remind me of mitch",
            article_id: 3,
            topic: "mitch",
            created_at: "2020-11-03T09:12:00.000Z",
            votes: 0,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            comment_count: "2",
          });
        });
    });

  })
});
xdescribe("GET/api/articles/:article_id/comments", () => {
  test("returns status 200 and an ", () => {
    return request(app)
      .get("/api/articles/:article_id/comments")
      .then((response) => {
        const endPoints = response.body.endPoints;
        expect(200);
        expect(typeof endPoints).toEqual("object");
      });
  });
})