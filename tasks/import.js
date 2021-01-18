const csv = require("csvtojson");
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

const url =
  "https://docs.google.com/spreadsheets/d/1eXXnTiPr8I-KuRyV82p5rKXo8EVaoCybuuVuR9wp4A0/export?format=csv";

const settings = { method: "GET" };

const header =
  "Nome Parlamentar,UF,Partido,Titular_Suplente_Efetivado,Telefone,Email,Twitter,Posicao,Link";
const validFields = header.split(",");

fetch(url, settings)
  .then((res) => res.text())
  .then((text) => {
    const parsed = text.split("\n").slice(3).join("\n");
    const csvStr = `${header}\n${parsed}`;

    csv()
      .fromString(csvStr)
      .then((votes) => {
        votes.forEach((vote, index) => {
          Object.keys(vote).forEach((key) => {
            if (!validFields.includes(key)) {
              delete votes[index][key];
            }
          });

          if (vote.Twitter === "-") {
            vote.Twitter = "";
          } else if (vote.Twitter.startsWith("IG: ")) {
            vote.Instagram = vote.Twitter.replace("IG: ", "");
            vote.Twitter = "";
          } else if (vote.Twitter.startsWith("FB: ")) {
            vote.Facebook = vote.Twitter.replace("FB: ", "");
            vote.Twitter = "";
          }
        });

        fs.writeFileSync(
          path.join(__dirname, "../", "src", "data", "votes.json"),
          prettier.format(
            JSON.stringify(
              votes.sort((a, b) =>
                a["Nome Parlamentar"].localeCompare(b["Nome Parlamentar"])
              )
            ),
            {
              parser: "json",
            }
          )
        );
      });
  });
