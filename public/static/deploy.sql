DROP TABLE IF EXISTS "druzyna" CASCADE;
DROP TABLE IF EXISTS "gracz" CASCADE;
DROP TABLE IF EXISTS "mecz" CASCADE;
DROP TABLE IF EXISTS "organizator" CASCADE;
DROP TABLE IF EXISTS "sklad" CASCADE;
DROP TABLE IF EXISTS "czlonek" CASCADE;
DROP TABLE IF EXISTS "udzial" CASCADE;
DROP TABLE IF EXISTS "set" CASCADE;

CREATE TABLE "druzyna" (
  "id" SERIAL CONSTRAINT "pk_druzyna" PRIMARY KEY
);

CREATE TABLE "gracz" (
  "id" SERIAL CONSTRAINT "pk_gracz" PRIMARY KEY,
  "druzyna" INTEGER NOT NULL
);

CREATE INDEX "idx_gracz__druzyna" ON "gracz" ("druzyna");

ALTER TABLE "gracz" ADD CONSTRAINT "fk_gracz__druzyna" FOREIGN KEY ("druzyna") REFERENCES "druzyna" ("id");

CREATE TABLE "mecz" (
  "id" SERIAL CONSTRAINT "pk_mecz" PRIMARY KEY
);

CREATE TABLE "organizator" (
  "login" TEXT CONSTRAINT "pk_organizator" PRIMARY KEY,
  "salt" TEXT NOT NULL,
  "hash" TEXT NOT NULL
);

CREATE TABLE "set" (
  "id" SERIAL CONSTRAINT "pk_set" PRIMARY KEY,
  "mecz" INTEGER NOT NULL,
  "punktygosci" SMALLINT NOT NULL,
  "punktygospodarzy" SMALLINT NOT NULL
);

CREATE INDEX "idx_set__mecz" ON "set" ("mecz");

ALTER TABLE "set" ADD CONSTRAINT "fk_set__mecz" FOREIGN KEY ("mecz") REFERENCES "mecz" ("id");

CREATE TABLE "sklad" (
  "id" SERIAL CONSTRAINT "pk_sklad" PRIMARY KEY,
  "druzyna" INTEGER NOT NULL
);

CREATE INDEX "idx_sklad__druzyna" ON "sklad" ("druzyna");

ALTER TABLE "sklad" ADD CONSTRAINT "fk_sklad__druzyna" FOREIGN KEY ("druzyna") REFERENCES "druzyna" ("id");

CREATE TABLE "czlonek" (
  "gracz" INTEGER NOT NULL,
  "sklad" INTEGER NOT NULL,
  CONSTRAINT "pk_czlonek" PRIMARY KEY ("gracz", "sklad")
);

CREATE INDEX "idx_czlonek__sklad" ON "czlonek" ("sklad");

ALTER TABLE "czlonek" ADD CONSTRAINT "fk_czlonek__gracz" FOREIGN KEY ("gracz") REFERENCES "gracz" ("id");

ALTER TABLE "czlonek" ADD CONSTRAINT "fk_czlonek__sklad" FOREIGN KEY ("sklad") REFERENCES "sklad" ("id");

CREATE TABLE "udzial" (
  "sklad" INTEGER NOT NULL,
  "mecz" INTEGER NOT NULL,
  CONSTRAINT "pk_udzial" PRIMARY KEY ("sklad", "mecz")
);

CREATE INDEX "idx_udzial__mecz" ON "udzial" ("mecz");

ALTER TABLE "udzial" ADD CONSTRAINT "fk_udzial__mecz" FOREIGN KEY ("mecz") REFERENCES "mecz" ("id");

ALTER TABLE "udzial" ADD CONSTRAINT "fk_udzial__sklad" FOREIGN KEY ("sklad") REFERENCES "sklad" ("id")


