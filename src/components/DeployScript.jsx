import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Card, CardBody, CardText } from 'reactstrap';
import { docco } from 'react-syntax-highlighter/styles/hljs';
import wrap from './Wrapper';
import './DeployScript.css';

const codeString = `CREATE TABLE "druzyna" (
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
`;

const label = 'Skrypt';
const content = (
  <div className="">
    <h2>Projekt bazy danych - skrypt SQL</h2>

    <Card className="script-container">
      <CardBody>
        <CardText>
          <SyntaxHighlighter language="sql" style={docco}>{codeString}</SyntaxHighlighter>
        </CardText>
      </CardBody>
    </Card>
    <div className="db-deploy-footer">
      <p /><a href="https://editor.ponyorm.com/user/mbalc/bd/postgres">Źródło</a>
      <p />
      <small>
        Skrypt wygenerowany za pomocą <a href="https://editor.ponyorm.com">edytora Pony ORM</a>
      </small>
    </div>
  </div>
);
export default [label, wrap(content, 'deploy')];

