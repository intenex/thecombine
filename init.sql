CREATE TABLE articles (
  ID SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  body JSON NOT NULL
);

INSERT INTO articles (title, body)
VALUES ('Intro to Programming', '{"content":"Welcome to programming!"}');