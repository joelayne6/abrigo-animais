import { AbrigoAnimais } from "./abrigo-animais.js";

describe("AbrigoAnimais", () => {
  test("deve iniciar vazio", () => {
    const abrigo = new AbrigoAnimais();
    expect(abrigo.listarAnimais()).toEqual([]);
  });

  test("deve adicionar um animal", () => {
    const abrigo = new AbrigoAnimais();
    abrigo.adicionarAnimal({ nome: "Rex", tipo: "Cachorro" });
    expect(abrigo.listarAnimais()).toEqual([{ nome: "Rex", tipo: "Cachorro" }]);
  });

  test("deve buscar um animal pelo nome", () => {
    const abrigo = new AbrigoAnimais();
    abrigo.adicionarAnimal({ nome: "Mimi", tipo: "Gato" });
    const encontrado = abrigo.buscarPorNome("Mimi");
    expect(encontrado).toEqual({ nome: "Mimi", tipo: "Gato" });
  });

  test("deve remover um animal pelo nome", () => {
    const abrigo = new AbrigoAnimais();
    abrigo.adicionarAnimal({ nome: "Rex", tipo: "Cachorro" });
    abrigo.removerAnimal("Rex");
    expect(abrigo.listarAnimais()).toEqual([]);
  });
});
