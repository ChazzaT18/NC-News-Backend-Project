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
});

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
        expect(topics.length > 0).toBe(true);
        topics.forEach((topic) => {
          expect(typeof topic.slug).toBe("string");
          expect(typeof topic.description).toBe("string");
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
        expect(article).toHaveProperty("article_id", 1);
        expect(article).toHaveProperty(
          "title",
          "Living in the shadow of a great man"
        );
        expect(article).toHaveProperty("topic", "mitch");
        expect(article).toHaveProperty("author", "butter_bridge");
        expect(article).toHaveProperty(
          "body",
          "I find this existence challenging"
        );
        expect(article).toHaveProperty(
          "created_at",
          "2020-07-09T20:11:00.000Z"
        );
        expect(article).toHaveProperty("votes", 100);
        expect(article).toHaveProperty(
          "article_img_url",
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
      });
  });
});
test("returns status 404 when id number is not in the database", () => {
  return request(app)
    .get("/api/articles/10090")
    .then((response) => {
      expect(404);
      expect(response.body.msg).toBe("Article not found");
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
      expect(article).toHaveProperty("article_id", 4);
      expect(article).toHaveProperty("title", "Student SUES Mitch!");
      expect(article).toHaveProperty("topic", "mitch");
      expect(article).toHaveProperty("author", "rogersop");
      expect(article).toHaveProperty(
        "body",
        "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages"
      );
      expect(article).toHaveProperty("created_at", "2020-05-06T01:14:00.000Z");
      expect(article).toHaveProperty(
        "article_img_url",
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
      );
      expect(article).toHaveProperty("votes", 0);
    });
});
test("returns status 200 and an article object with comment_count", () => {
  return request(app)
    .get(`/api/articles/3`)
    .expect(200)
    .then((response) => {
      const article = response.body.article;
      expect(article).toHaveProperty("comment_count", 2);
    });
});
describe("GET/api/articles", () => {
  test("returns 200 and an array of objects with the objects containing correct keys", () => {
    return request(app)
      .get("/api/articles")
      .then((response) => {
        const articles = response.body.articles;
        expect(200);
        expect(Array.isArray(articles)).toEqual(true);
        expect(articles.length > 0).toBe(true);
        articles.forEach((article) => {
          expect(article).toHaveProperty("comment_count", expect.any(Number));
          expect(article).toHaveProperty("votes", expect.any(Number));
          expect(article).toHaveProperty("article_id", expect.any(Number));
          expect(article).toHaveProperty("created_at", expect.any(String));
          expect(article).toHaveProperty("author", expect.any(String));
          expect(article).toHaveProperty("title", expect.any(String));
          expect(article).toHaveProperty("article_img_url", expect.any(String));
        });
      });
  });
});
test("Returned array is ordered by created_at and sorted by newest first", () => {
  return request(app)
    .get("/api/articles")
    .then((response) => {
      expect(200);
      expect(response.body.articles).toBeSortedBy("created_at", {
        descending: true,
      });
    });
});
test("Returned array is ordered by created_at and sorted by older first", () => {
  return request(app)
    .get("/api/articles?sort_by=ASC")
    .then((response) => {
      expect(200);
      expect(response.body.articles).toBeSortedBy("created_at", {
        descending: false,
      });
    });
});
test("Returned array is ordered by author", () => {
  return request(app)
    .get("/api/articles?order_by=author")
    .then((response) => {
      expect(200);
      expect(response.body.articles).toBeSortedBy("author", {
        descending: true,
      });
    });
});
test("Returned array is ordered by author and ascending order", () => {
  return request(app)
    .get("/api/articles?order_by=author&sort_by=ASC")
    .then((response) => {
      expect(200);
      expect(response.body.articles).toBeSortedBy("author", {
        descending: false,
      });
    });
});
test("Filters articles by topics query", () => {
  return request(app)
    .get("/api/articles?topic=cats")
    .expect(200)
    .then((response) => {
      const articles = response.body.articles;
      expect(articles).toHaveLength(1);
    });
});
// });
test("Returns 404 when given a no existent topic", () => {
  return request(app)
    .get("/api/articles?topic=dogs")
    .expect(404)
    .then((response) => {
      expect(response.body.msg).toBe("No articles with given topic");
    });
});
describe("GET/api/articles/:article_id/comments", () => {
  test("returns status 200 and an array", () => {
    return request(app)
      .get("/api/articles/4/comments")
      .then((response) => {
        expect(200);
        expect(Array.isArray(response.body.comments)).toEqual(true);
      });
  });
  test("Returns and empty array if there are no comments", () => {
    return request(app)
      .get("/api/articles/4/comments")
      .then((response) => {
        expect(200);
        expect(response.body.comments).toEqual([]);
      });
  });
  test("returned objects has required keys and correct data types", () => {
    return request(app)
      .get("/api/articles/3/comments")
      .then((response) => {
        const comments = response.body.comments;
        expect(comments.length).toBe(2);
        comments.forEach((comment) => {
          expect(comment).toHaveProperty("comment_id", expect.any(Number));
          expect(comment).toHaveProperty("votes", expect.any(Number));
          expect(comment).toHaveProperty("article_id", expect.any(Number));
          expect(comment).toHaveProperty("created_at", expect.any(String));
          expect(comment).toHaveProperty("author", expect.any(String));
          expect(comment).toHaveProperty("body", expect.any(String));
        });
      });
  });
  test("Returned array is ordered by created_at and sorted by newest first", () => {
    return request(app)
      .get("/api/articles/3/comments")
      .then((response) => {
        expect(200);
        expect(response.body.comments).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
  test("returns status 404 when id number is not in the database", () => {
    return request(app)
      .get("/api/articles/10090/comments")
      .then((response) => {
        expect(404);
        expect(response.body.msg).toEqual("Article not found");
      });
  });
  test("returns status 400 given an invalid article_id", () => {
    return request(app)
      .get("/api/articles/banana/comments")
      .then((response) => {
        expect(400);
        expect(response.body.msg).toEqual("article_id must be a number");
      });
  });
});
describe("POST/api/articles/:article_id/comments", () => {
  test("Returns statusCode 201 and responds with comment", () => {
    const postCommentData = {
      body: "You should try coding",
      username: "rogersop",
    };

    return request(app)
      .post("/api/articles/1/comments")
      .send(postCommentData)
      .then((response) => {
        const comment = response.body.comment;
        console.log(comment)
        
        expect(201);
        expect(comment).toHaveProperty("comment_id", expect.any(Number));
        expect(comment).toHaveProperty("votes", 0);
        expect(comment).toHaveProperty("created_at", expect.any(String));
        expect(comment).toHaveProperty("author", "rogersop");
        expect(comment).toHaveProperty("body", "You should try coding");
        expect(comment).toHaveProperty("article_id", 1);
      });
  });
  test("returns error 400 if post does not include username", () => {
    const postCommentData = { body: "You should try coding" };
    return request(app)
      .post("/api/articles/1/comments")
      .send(postCommentData)
      .then((response) => {
        expect(400);
        expect(response.body.msg).toEqual("must have a username");
      });
  });
  test("returns error 400 if post does not include body", () => {
    const postCommentData = { username: "ChazzaT18" };
    return request(app)
      .post("/api/articles/1/comments")
      .send(postCommentData)
      .then((response) => {
        expect(400);
        expect(response.body.msg).toEqual("must have a body");
      });
  });
  test("returns error 400 if given invalid article number", () => {
    const postCommentData = { username: "ChazzaT18" };
    return request(app)
      .post("/api/articles/poo/comments")
      .send(postCommentData)
      .then((response) => {
        expect(400);
        expect(response.body.msg).toEqual("article_id must be a number");
      });
  });
  test("returns error 404 if given an article id that is not on the database", () => {
    const postCommentData = { username: "ChazzaT18", body: "Hello world" };
    return request(app)
      .post("/api/articles/10202/comments")
      .send(postCommentData)
      .then((response) => {
        expect(404);
        expect(response.body.msg).toEqual("Article not found");
      });
  });
});
describe("POST/api/articles/:article_id", () => {
  test("Returns statusCode 201 and responds with comment", () => {
    const patchVotes = { inc_votes: 1 };

    return request(app)
      .patch("/api/articles/4")
      .send(patchVotes)
      .then((response) => {
        const article = response.body.article;

        expect(201);
        expect(article).toHaveProperty("votes", 1);
        expect(article).toHaveProperty("article_id", 4);
        expect(article).toHaveProperty(
          "created_at",
          "2020-05-06T01:14:00.000Z"
        );
        expect(article).toHaveProperty("topic", "mitch");
        expect(article).toHaveProperty(
          "body",
          "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages"
        );
        expect(article).toHaveProperty("author", "rogersop");
        expect(article).toHaveProperty("title", "Student SUES Mitch!");
        expect(article).toHaveProperty(
          "article_img_url",
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
      });
  });
  test("Returns statusCode 400 when article_id is not a number", () => {
    const patchVotes = { inc_votes: 1 };

    return request(app)
      .patch("/api/articles/banana")
      .send(patchVotes)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual("article_id must be a number");
      });
  });

  test("Returns statusCode 400 when inc_votes is not a number", () => {
    const patchVotes = { inc_votes: "not_a_number" };

    return request(app)
      .patch("/api/articles/4")
      .send(patchVotes)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual("inc_votes must be a number");
      });
  });

  test("Returns statusCode 404 when article is not found", () => {
    const patchVotes = { inc_votes: 1 };

    return request(app)
      .patch("/api/articles/999")
      .send(patchVotes)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toEqual("Article not found");
      });
  });
});
describe("DELETE/api/comments/:comments_id", () => {
  test("Returns status 204 and no content", () => {
    return request(app)
      .delete("/api/comments/1")
      .expect(204)
      .then(() => {});
  });
  test("Comment is actually deleted from the database", () => {
    return request(app)
      .delete("/api/comments/1")
      .expect(204)
      .then(() => {
        return db.query("SELECT * FROM comments WHERE comment_id = 1;");
      })
      .then((result) => {
        expect(result.rows.length).toBe(0);
      });
  });
  test("Returns status 404 and correct error message when comment not found on database", () => {
    return request(app)
      .delete("/api/comments/10909")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toEqual("Comment not found");
      });
  });
  test("Returns status 400 and when comment id is not a number", () => {
    return request(app)
      .delete("/api/comments/northcoders")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual("comment_id must be a number");
      });
  });
});
describe("GET/api/users", () => {
  test("Returns status 200 and an array", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body.users)).toBe(true);
      });
  });
  test("Returns status 200 and an array with correct properties and value data types", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((response) => {
        expect(response.body.users.length).toBe(4);
        response.body.users.forEach((user) => {
          expect(user).toHaveProperty("username", expect.any(String));
          expect(user).toHaveProperty("name", expect.any(String));
          expect(user).toHaveProperty("avatar_url", expect.any(String));
        });
      });
  });
});
