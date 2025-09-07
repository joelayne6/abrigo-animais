import { AbrigoAnimais } from "./abrigo-animais.js";

describe("AbrigoAnimais", () => {
  let abrigo;

  beforeEach(() => {
    abrigo = new AbrigoAnimais();
  });

  test("Pessoa 1 adota Rex, Fofo fica no abrigo", () => {
    const result = abrigo.encontraPessoas(
      "RATO,BOLA",
      "RATO,NOVELO",
      "Rex,Fofo"
    );

    expect(result).toEqual({
      lista: ["Fofo - abrigo", "Rex - pessoa 1"],
    });
  });

  test("Animal inválido", () => {
    const result = abrigo.encontraPessoas(
      "CAIXA,RATO",
      "RATO,BOLA",
      "Lulu"
    );

    expect(result).toEqual({
      erro: "Animal inválido",
    });
  });

  test("Brinquedo inválido", () => {
    const result = abrigo.encontraPessoas(
      "BOLA,CORDA",
      "RATO,NOVELO",
      "Rex"
    );

    expect(result).toEqual({
      erro: "Brinquedo inválido",
    });
  });

  test("Pessoa 2 adota Bola, Rex vai pro abrigo", () => {
    const result = abrigo.encontraPessoas(
      "LASER,RATO,BOLA",
      "CAIXA,NOVELO",
      "Rex,Bola"
    );

    expect(result).toEqual({
      lista: ["Bola - pessoa 2", "Rex - abrigo"],
    });
  });

  test("Loco só pode ir se pessoa já tiver outro animal", () => {
    const result = abrigo.encontraPessoas(
      "RATO,BOLA,SKATE",
      "RATO,BOLA",
      "Rex,Loco"
    );

    expect(result).toEqual({
      lista: ["Loco - pessoa 1", "Rex - pessoa 1"],
    });
  });

  test("Dois podem adotar o mesmo animal → vai pro abrigo", () => {
    const result = abrigo.encontraPessoas(
      "RATO,BOLA",
      "RATO,BOLA",
      "Rex"
    );

    expect(result).toEqual({
      lista: ["Rex - abrigo"],
    });
  });

  test("Pessoa não pode adotar mais de 3 animais", () => {
    const result = abrigo.encontraPessoas(
      "RATO,BOLA,CAIXA,NOVELO,LASER,SKATE",
      "LASER",
      "Rex,Bola,Fofo,Mimi,Loco"
    );

    expect(result).toEqual({
      lista: [
        "Bola - pessoa 1",
        "Fofo - pessoa 1",
        "Loco - abrigo",
        "Mimi - pessoa 1",
        "Rex - pessoa 1",
      ],
    });
  });
});
