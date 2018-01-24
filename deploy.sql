DROP TABLE IF EXISTS "druzyna" CASCADE;
DROP TABLE IF EXISTS "gracz" CASCADE;
DROP TABLE IF EXISTS "sklad" CASCADE;
DROP TABLE IF EXISTS "udzial" CASCADE;
DROP TABLE IF EXISTS "mecz" CASCADE;
DROP TABLE IF EXISTS "wynik" CASCADE;
DROP TABLE IF EXISTS "termin" CASCADE;


DROP VIEW IF EXISTS widok_meczy;




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

CREATE TABLE "mecz" (
  "id" SERIAL CONSTRAINT "pk_mecz" PRIMARY KEY,
  "skladgosci" INTEGER NOT NULL,
  "skladgospodarzy" INTEGER NOT NULL
);

CREATE INDEX "idx_mecz__skladgosci" ON "mecz" ("skladgosci");

CREATE INDEX "idx_mecz__skladgospodarzy" ON "mecz" ("skladgospodarzy");

ALTER TABLE "mecz" ADD CONSTRAINT "fk_mecz__skladgosci" FOREIGN KEY ("skladgosci") REFERENCES "sklad" ("id");

ALTER TABLE "mecz" ADD CONSTRAINT "fk_mecz__skladgospodarzy" FOREIGN KEY ("skladgospodarzy") REFERENCES "sklad" ("id");

CREATE TABLE "termin" (
  "id" SERIAL CONSTRAINT "pk_termin" PRIMARY KEY,
  "termin" TIMESTAMP NOT NULL
);

CREATE TABLE "udzial" (
  "sklad" INTEGER NOT NULL,
  "gracz" INTEGER NOT NULL,
  CONSTRAINT "pk_udzial" PRIMARY KEY ("sklad", "gracz")
);

CREATE INDEX "idx_udzial__gracz" ON "udzial" ("gracz");

ALTER TABLE "udzial" ADD CONSTRAINT "fk_udzial__gracz" FOREIGN KEY ("gracz") REFERENCES "gracz" ("id");

ALTER TABLE "udzial" ADD CONSTRAINT "fk_udzial__sklad" FOREIGN KEY ("sklad") REFERENCES "sklad" ("id");

CREATE TABLE "wynik" (
  "punkty" SMALLINT NOT NULL,
  "numerseta" SMALLINT NOT NULL,
  "sklad" INTEGER NOT NULL,
  "mecz" INTEGER NOT NULL,
  CONSTRAINT "pk_wynik" PRIMARY KEY ("numerseta", "sklad", "mecz")
);

CREATE INDEX "idx_wynik__mecz" ON "wynik" ("mecz");

CREATE INDEX "idx_wynik__sklad" ON "wynik" ("sklad");

ALTER TABLE "wynik" ADD CONSTRAINT "fk_wynik__mecz" FOREIGN KEY ("mecz") REFERENCES "mecz" ("id");

ALTER TABLE "wynik" ADD CONSTRAINT "fk_wynik__sklad" FOREIGN KEY ("sklad") REFERENCES "sklad" ("id");






CREATE VIEW widok_meczy 
  AS SELECT
    t.id,
    t1.druzyna AS gospodarze,
    t2.druzyna AS goście,
    (SELECT COUNT(*) FROM set) as sety
  FROM mecz t 
    JOIN sklad t1 ON t.skladGospodarzy=t1.id
    JOIN sklad t2 ON t.skladGosci=t2.id; 

INSERT INTO termin (termin) VALUES ('5432-01-24 00:31:59');

ALTER TABLE mecz ADD CHECK (skladGosci != skladGospodarzy);

CREATE OR REPLACE FUNCTION blokuj_zgloszenia()
RETURNS trigger AS $$
  DECLARE
    i integer;
    t timestamp;
  BEGIN
    select count(*) from termin into i;
    if i > 0 then
      select termin as kiedy from (
        select * from termin
          order by termin asc
          limit 1) as daty
        into t;
      if (t < now()) then
        raise exception 'Zgłoszenia zostaly juz zamkniete';
      end if;
    end if;
    return new;
  END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS blokuj_zgloszenia_graczy ON gracz; 
DROP TRIGGER IF EXISTS blokuj_zgloszenia_druzyn ON druzyna; 

CREATE TRIGGER blokuj_zgloszenia_druzyn
  AFTER INSERT OR UPDATE
  ON druzyna
  execute procedure blokuj_zgloszenia();

CREATE TRIGGER blokuj_zgloszenia_graczy
  AFTER INSERT OR UPDATE
  ON gracz 
  execute procedure blokuj_zgloszenia();
