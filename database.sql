CREATE TABLE tasks(
	"id" SERIAL PRIMARY KEY,
	"tasks" VARCHAR (250) NOT NULL,
  "status" VARCHAR (30) DEFAULT 'Incomplete'
);

INSERT INTO "tasks" ("tasks") VALUES('Cry');

DELETE FROM tasks WHERE id=1;