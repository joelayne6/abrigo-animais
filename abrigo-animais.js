class AbrigoAnimais {
  constructor() {
    this.animais = {
      Rex: { tipo: "cão", brinquedos: ["RATO", "BOLA"] },
      Mimi: { tipo: "gato", brinquedos: ["BOLA", "LASER"] },
      Fofo: { tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
      Zero: { tipo: "gato", brinquedos: ["RATO", "BOLA"] },
      Bola: { tipo: "cão", brinquedos: ["CAIXA", "NOVELO"] },
      Bebe: { tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"] },
      Loco: { tipo: "jabuti", brinquedos: ["SKATE", "RATO"] },
    };
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    try {
      const pessoa1 = this.#validaEntrada(brinquedosPessoa1, "brinquedo");
      const pessoa2 = this.#validaEntrada(brinquedosPessoa2, "brinquedo");
      const ordem = this.#validaEntrada(ordemAnimais, "animal");

      let resultado = [];
      let adotados = { pessoa1: [], pessoa2: [] };

      for (let animalNome of ordem) {
        const animal = this.animais[animalNome];
        if (!animal) {
          return { erro: "Animal inválido" };
        }

        let p1Pode = this.#verificaAdocao(animal, pessoa1);
        let p2Pode = this.#verificaAdocao(animal, pessoa2);

        if (animalNome === "Loco") {
          if ((p1Pode && adotados.pessoa1.length > 0) && adotados.pessoa1.length < 3) {
            adotados.pessoa1.push(animalNome);
            resultado.push(`${animalNome} - pessoa 1`);
            continue;
          }
          if ((p2Pode && adotados.pessoa2.length > 0) && adotados.pessoa2.length < 3) {
            adotados.pessoa2.push(animalNome);
            resultado.push(`${animalNome} - pessoa 2`);
            continue;
          }
          resultado.push(`${animalNome} - abrigo`);
          continue;
        }

        if (p1Pode && p2Pode) {
          resultado.push(`${animalNome} - abrigo`);
          continue;
        }

        if (p1Pode && adotados.pessoa1.length < 3) {
          adotados.pessoa1.push(animalNome);
          resultado.push(`${animalNome} - pessoa 1`);
          continue;
        }

        if (p2Pode && adotados.pessoa2.length < 3) {
          adotados.pessoa2.push(animalNome);
          resultado.push(`${animalNome} - pessoa 2`);
          continue;
        }

        resultado.push(`${animalNome} - abrigo`);
      }

      return {
        lista: resultado.sort((a, b) => a.localeCompare(b)),
      };

    } catch (e) {
      return { erro: e.message };
    }
  }

  #validaEntrada(str, tipo) {
    if (!str || typeof str !== "string") {
      throw new Error(tipo === "animal" ? "Animal inválido" : "Brinquedo inválido");
    }

    let itens = str.split(",").map(s => s.trim().toUpperCase());
    let set = new Set(itens);
    if (set.size !== itens.length) {
      throw new Error(tipo === "animal" ? "Animal inválido" : "Brinquedo inválido");
    }

    if (tipo === "brinquedo") {
      let validos = new Set(["RATO", "BOLA", "LASER", "CAIXA", "NOVELO", "SKATE"]);
      for (let i of itens) {
        if (!validos.has(i)) {
          throw new Error("Brinquedo inválido");
        }
      }
    }
    return itens;
  }

  #verificaAdocao(animal, brinquedosPessoa) {
    const favoritos = animal.brinquedos;

    if (animal.tipo === "gato") {
      let idx = 0;
      for (let brinquedo of brinquedosPessoa) {
        if (brinquedo === favoritos[idx]) {
          idx++;
          if (idx === favoritos.length) return true;
        }
      }
      return false;
    }

    let idx = 0;
    for (let brinquedo of brinquedosPessoa) {
      if (brinquedo === favoritos[idx]) {
        idx++;
        if (idx === favoritos.length) return true;
      }
    }
    return false;
  }
}

export { AbrigoAnimais as AbrigoAnimais };