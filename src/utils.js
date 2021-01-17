import { FAVOR, AGAINST, NEUTRAL } from "./constants";

export function getAbbreviation(name) {
  const nameArray = name.split(" ");
  const firstName = nameArray[0];
  const lastName = nameArray.pop();

  return `${firstName ? firstName[0] : ""}${lastName ? lastName[0] : ""}`;
}

export function getSorted(edges, stance) {
  return edges
    .filter(({ node: { Posicao } }) => Posicao === stance)
    .sort((a, b) =>
      a.node.Nome_Parlamentar.localeCompare(b.node.Nome_Parlamentar)
    );
}

export function getValues(data, party) {
  const items = {
    favor: 0,
    against: 0,
    neutral: 0,
  };

  data.forEach(({ node: { Partido, Posicao } }) => {
    if (Posicao === FAVOR && (party === "all" || Partido === party)) {
      items.favor++;
    } else if (Posicao === AGAINST && (party === "all" || Partido === party)) {
      items.against++;
    } else if (Posicao === NEUTRAL && (party === "all" || Partido === party)) {
      items.neutral++;
    }
  });

  return items;
}
