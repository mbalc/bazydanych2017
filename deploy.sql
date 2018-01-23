DROP TABLE IF EXISTS "druzyna" CASCADE;
DROP TABLE IF EXISTS "gracz" CASCADE;
DROP TABLE IF EXISTS "mecz" CASCADE;
DROP TABLE IF EXISTS "organizator" CASCADE;
DROP TABLE IF EXISTS "sklad" CASCADE;
DROP TABLE IF EXISTS "czlonek" CASCADE;
DROP TABLE IF EXISTS "udzial" CASCADE;
DROP TABLE IF EXISTS "set" CASCADE;



CREATE TABLE "druzyna" (
  "id" SERIAL CONSTRAINT "pk_druzyna" PRIMARY KEY,
  "nazwa" TEXT NOT NULL
);

CREATE TABLE "gracz" (
  "id" SERIAL CONSTRAINT "pk_gracz" PRIMARY KEY,
  "imie" TEXT NOT NULL,
  "nazwisko" TEXT NOT NULL,
  "druzyna" INTEGER NOT NULL
);

CREATE INDEX "idx_gracz__druzyna" ON "gracz" ("druzyna");

ALTER TABLE "gracz" ADD CONSTRAINT "fk_gracz__druzyna" FOREIGN KEY ("druzyna") REFERENCES "druzyna" ("id");

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

CREATE TABLE "mecz" (
  "id" SERIAL CONSTRAINT "pk_mecz" PRIMARY KEY,
  "skladgosci" INTEGER NOT NULL,
  "skladgospodarzy" INTEGER NOT NULL
);

CREATE INDEX "idx_mecz__skladgosci" ON "mecz" ("skladgosci");

CREATE INDEX "idx_mecz__skladgospodarzy" ON "mecz" ("skladgospodarzy");

ALTER TABLE "mecz" ADD CONSTRAINT "fk_mecz__skladgosci" FOREIGN KEY ("skladgosci") REFERENCES "sklad" ("id");

ALTER TABLE "mecz" ADD CONSTRAINT "fk_mecz__skladgospodarzy" FOREIGN KEY ("skladgospodarzy") REFERENCES "sklad" ("id");

CREATE TABLE "set" (
  "id" SERIAL CONSTRAINT "pk_set" PRIMARY KEY,
  "mecz" INTEGER NOT NULL,
  "punktygosci" SMALLINT NOT NULL,
  "punktygospodarzy" SMALLINT NOT NULL
);

CREATE INDEX "idx_set__mecz" ON "set" ("mecz");

ALTER TABLE "set" ADD CONSTRAINT "fk_set__mecz" FOREIGN KEY ("mecz") REFERENCES "mecz" ("id")
