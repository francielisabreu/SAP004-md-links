const mdLinks = require("../index.js");

describe("Retorno para a função mdLinks", () => {
  test("É uma função", () => {
    expect(typeof mdLinks).toBe("function");
  });
  test("Função retorna: texto e URL", (done) => {
    mdLinks("./test/teste/test-md-link.md", "true")
      .then((result) => {
        expect(result).toEqual([{
          "href": "http://google.com/",
          "title": "Google"
        }]);
        done();
      });
  });
  test("Função retorna: texto, URL e status", (done) => {
    mdLinks("./test/teste/test-md-link.md", "true")
      .then((result) => {
        expect(result).toEqual([{
          "href": "http://google.com/",
          "txto": "Google",
          "status": 200
        }]);
        done();
      });
  });
  test("Teste de erro", (done) => {
    mdLinks(['./naotemnada.md', "false"])
      .catch((error) => {
        expect(error)
          .toEqual("ERROR: Não foi possível localizar o arquivo ou diretório './naotemnada.md'");
        done();
      });
  });
})