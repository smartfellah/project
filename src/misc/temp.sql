-- Database: hh

CREATE DATABASE hh
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE TABLE "users" (
  "id" bigserial,
  "username" varchar(255),
  "email" varchar(255) UNIQUE,
  "password" varchar(255),
  "role_id" int,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "roles" (
  "id" bigserial,
  "title" varchar(255)
);

CREATE TABLE "permissions" (
  "id" bigserial,
  "title" varchar(255)
);

CREATE TABLE "role_permission" (
  "role_id" int,
  "permission_id" int
);

CREATE TABLE "replies" (
  "id" bigserial,
  "user_id" int,
  "message" text,
  "created_at" timestamp
);

CREATE TABLE "dialog" (
  "id" bigserial,
  "first_user_id" int,
  "second_user_id" int,
  "reply_id" int,
  "created_at" timestamp
);

CREATE TABLE "messages" (
  "id" bigserial,
  "message" text,
  "dialog_id" int,
  "user_id" int
);

CREATE TABLE "companies" (
  "id" bigserial,
  "title" varchar(255),
  "description" text,
  "logo" varchar(255),
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "vacancies" (
  "id" bigserial,
  "user_id" int,
  "company_id" int,
  "title" varchar(255),
  "content" varchar(255),
  "experience" int,
  "location" varchar(255),
  "is_active" bool,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "resumes" (
  "id" bigserial,
  "user_id" int,
  "title" varchar(255),
  "content" varchar(255),
  "experience" int,
  "location" varchar(255),
  "is_active" bool,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "vacancy_tags" (
  "id" bigserial,
  "vacancy_id" int,
  "title" varchar(100)
);

CREATE UNIQUE INDEX ON "role_permission" ("role_id", "permission_id");

CREATE UNIQUE INDEX ON "dialog" ("first_user_id", "second_user_id");

CREATE INDEX ON "dialog" ("reply_id");

ALTER TABLE "resumes" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "companies" ADD FOREIGN KEY ("id") REFERENCES "vacancies" ("company_id");

ALTER TABLE "vacancy_tags" ADD FOREIGN KEY ("vacancy_id") REFERENCES "vacancies" ("id");

ALTER TABLE "vacancies" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");

ALTER TABLE "role_permission" ADD FOREIGN KEY ("permission_id") REFERENCES "permissions" ("id");

ALTER TABLE "role_permission" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");

ALTER TABLE "replies" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "dialog" ("first_user_id");

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "dialog" ("second_user_id");

ALTER TABLE "messages" ADD FOREIGN KEY ("dialog_id") REFERENCES "dialog" ("id");

ALTER TABLE "dialog" ADD FOREIGN KEY ("reply_id") REFERENCES "replies" ("id");

ALTER TABLE "messages" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
