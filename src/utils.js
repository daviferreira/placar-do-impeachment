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

export function getValues(data, { party, state }) {
  const items = {
    favor: 0,
    against: 0,
    neutral: 0,
  };

  let filtered = data;
  if (party !== "all" || state !== "all") {
    filtered = filtered.filter(
      ({ node: { Partido, UF } }) =>
        (party === "all" || Partido === party) &&
        (state === "all" || UF === state)
    );
  }

  filtered.forEach(({ node: { Posicao } }) => {
    if (Posicao === FAVOR) {
      items.favor++;
    } else if (Posicao === AGAINST) {
      items.against++;
    } else if (Posicao === NEUTRAL) {
      items.neutral++;
    }
  });

  return items;
}
