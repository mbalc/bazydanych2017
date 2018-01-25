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
  "komentarz" TEXT,
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






CREATE VIEW widok_setow
  AS SELECT
    p.mecz, p.numerseta as "id", p.punkty as "punkty gospodarzy",
    q.punkty as "punkty gości"
  FROM 
    mecz m 
    JOIN wynik p ON m.id = p.mecz AND p.sklad = m.skladGospodarzy
    JOIN wynik q ON m.id = q.mecz AND q.sklad = m.skladGosci AND p.numerseta = q.numerseta;

CREATE VIEW widok_meczy 
  AS SELECT
    t.id,
    t1.druzyna AS gospodarze,
    t2.druzyna AS goście,
    (SELECT COUNT(*) FROM set) as sety,
    (SELECT COUNT(*) FROM wynik WHERE mecz=t.id AND sklad=t1.id AND punkty = 21) as "wynik gospodarzy",
    (SELECT COUNT(*) FROM wynik WHERE mecz=t.id AND sklad=t2.id AND punkty = 21) as "wynik gości",
    
    (CASE WHEN (SELECT COUNT(*) FROM udzial WHERE sklad=t.skladGosci OR sklad=t.skladGospodarzy)=12
      THEN CASE WHEN (SELECT COUNT(*) FROM wynik WHERE mecz=t.id) > 0
        THEN CASE WHEN (3 IN (
          (SELECT COUNT(*) FROM wynik WHERE mecz=t.id AND sklad=t1.id AND punkty = 21),
          (SELECT COUNT(*) FROM wynik WHERE mecz=t.id AND sklad=t2.id AND punkty = 21)
        ))
          THEN 'zakończony'
          ELSE CASE WHEN (select count(*) from widok_setow 
            where mecz=t.id and "punkty gospodarzy" != 21 and "punkty gości" != 21) > 0
            THEN 'w trakcie'
            ELSE 'przerwa'
          END
        END
        ELSE 'nierozegrany'
      END
      ELSE 'bez składów'
    END) as status,
    t.komentarz
  FROM mecz t 
    JOIN sklad t1 ON t.skladGospodarzy=t1.id
    JOIN sklad t2 ON t.skladGosci=t2.id; 

INSERT INTO termin (termin) VALUES ('5432-01-24 00:31:59');

ALTER TABLE mecz ADD CHECK (skladGosci != skladGospodarzy);

CREATE OR REPLACE FUNCTION wstaw_seta(mId int) RETURNS void AS $$
  DECLARE
    g integer;
    h integer;
    m integer;
  BEGIN
    select skladGosci from mecz where id=mId into g;
    select skladGospodarzy  from mecz where id=mId into h;
    select coalesce(max(id) + 1, 1) from widok_setow where mecz=mId into m;
    INSERT INTO wynik (punkty, numerseta, sklad, mecz) VALUES (0, m, g, mId);
    INSERT INTO wynik (punkty, numerseta, sklad, mecz) VALUES (0, m, h, mId);
  END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION ustaw_wynik(mId int, pg int, ph int) RETURNS void AS $$
  DECLARE
    g integer;
    h integer;
    m integer;
  BEGIN
    select skladGosci from mecz where id=mId into g;
    select skladGospodarzy  from mecz where id=mId into h;
    select max(id) from widok_setow where mecz=mId into m;
    update wynik set punkty = pg where numerseta = m and sklad = g and mecz=mId;
    update wynik set punkty = ph where numerseta = m and sklad = h and mecz=mId;
  END;
$$ LANGUAGE plpgsql;

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
        raise exception 'Zgłoszenia zostaly juz zamkniete!';
      end if;
    end if;
    return new;
  END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION limit_skladu()
RETURNS trigger AS $$
  DECLARE
    i integer;
    p integer;
    q integer;
  BEGIN
    select count(*) from udzial where sklad=NEW.sklad into i;
    if i > 6 then
      raise exception 'Skład jest już pełny!';
    end if;
    select count(*) from wynik where sklad=NEW.sklad into i;
    if i > 0 then
      raise exception 'Nie wolno zmieniać składu już rozpoczętego meczu!';
    end if;
    select druzyna from gracz where id=NEW.gracz into p;
    select druzyna from sklad where id=NEW.sklad into q;
    if p != q then
      raise exception 'Gracz nie należy do drużyny tego składu!';
    end if;
    raise notice 'Value i: %', i;
    raise notice 'Value p: %', p;
    raise notice 'Value q: %', q;
    return new;
  END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION edycja_skladu()
RETURNS trigger AS $$
  DECLARE
    i integer;
  BEGIN
    select count(*) from wynik where sklad=OLD.sklad into i;
    if i > 0 then
      raise exception 'Nie wolno zmieniać składu już rozpoczętego meczu!';
    end if;
    return OLD;
  END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION jeden_set_naraz()
RETURNS trigger AS $$
  DECLARE
    i integer;
  BEGIN
    select count(*) from widok_setow 
      where mecz=NEW.mecz and "punkty gospodarzy" != 21 and "punkty gości" != 21
      into i;
    if i > 1 then
      raise exception 'Nie można rozgrywać więcej niż jednego seta jednocześnie!';
    end if;
    if (select count(status) from widok_meczy where id=NEW.mecz and status='rozegrany') > 0 then
      raise exception 'Mecz już się skończył!';
    end if;
    if (select count(*) from widok_meczy where "wynik gości" = 3 and "wynik gospodarzy" = 3) > 0 then
      raise exception 'Remis?!?!?!?!?!?!?!?!';
    end if;
    if (select count(*) from widok_setow where "punkty gości" = 21 and "punkty gospodarzy" = 21) > 0 then
      raise exception 'Remis?!?!?!';
    end if;
    if NEW.punkty < 0 or NEW.punkty > 21 then
      raise exception 'Nieprawidłowa liczba punktów!';
    end if;
    select coalesce(max(id), 0) from widok_setow where mecz=NEW.mecz into i;
    if NEW.numerseta < i then
      raise exception 'Nieprawidłowy numer seta! (można modyfikować tylko największe elementy - zachowanie jak na stosie)';
    end if;
    return NEW;
  END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS limituj_rozgrywane_sety ON czlonek; 
DROP TRIGGER IF EXISTS limituj_sklady ON czlonek; 
DROP TRIGGER IF EXISTS edycja_skladow ON czlonek; 
DROP TRIGGER IF EXISTS blokuj_zgloszenia_graczy ON gracz; 
DROP TRIGGER IF EXISTS blokuj_zgloszenia_druzyn ON druzyna; 

CREATE TRIGGER limituj_rozgrywane_sety 
  AFTER INSERT OR UPDATE
  ON wynik
  FOR EACH ROW
  execute procedure jeden_set_naraz();

CREATE TRIGGER limituj_sklady 
  AFTER INSERT OR UPDATE
  ON udzial
  FOR EACH ROW
  execute procedure limit_skladu();

CREATE TRIGGER edycja_skladow 
  AFTER DELETE OR UPDATE
  ON udzial
  FOR EACH ROW
  execute procedure edycja_skladu();

CREATE TRIGGER blokuj_zgloszenia_druzyn
  AFTER INSERT OR UPDATE
  ON druzyna
  execute procedure blokuj_zgloszenia();

CREATE TRIGGER blokuj_zgloszenia_graczy
  AFTER INSERT OR UPDATE
  ON gracz 
  execute procedure blokuj_zgloszenia();
