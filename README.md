# Markdown Links

### O que é?

_Biblioteca que oferece uma CLI que retorna uma lista dos links contidos em um arquivo Markdown(.md), como ela você pode verificar e validade os mesmos._

## Índice

- [1. Resumo do Projeto](#1-resumo-do-projeto)
- [2. Como Instalar](#2-como-instalar)
- [3. Como Usar](#3-como-usar)
- [4. Considerações Gerais](#5-consideracoes-gerais)

---

## 1. Resumo do projeto

![mark-down](https://user-images.githubusercontent.com/61169584/87254374-94c00600-c458-11ea-8468-599d397634a3.png)

---

[Markdown](https://pt.wikipedia.org/wiki/Markdown) é **uma linguagem de marcação**
muito popular entre os programadores. É usada em muitas plataformas que
manipulam texto (GitHub, fórum, blogs e etc) e é muito comum encontrar arquivos
com este formato em qualquer repositório (começando pelo tradicional
`README.md`).

Os arquivos `Markdown` normalmente contém _links_ que podem estar
quebrados, ou que já não são válidos, prejudicando muito o valor da
informação que está ali.

Uma comunidade open source nos propôs criar uma ferramenta, usando
[Node.js](https://nodejs.org/), que leia e analise arquivos no formato
`Markdown`, para verificar os arquivos que contenham links e mostrar algumas
estatísticas.

---

## 2. Como Instalar

**Primeiro passo**

- \$ npm install -g francielisabreu/SAP004-md-links (instalação global)
- \$ npm install francielisabreu/SAP004-md-links (instalação local )

---

## 3. Como Usar

#### **Já no Projeto - JavaScript API**

O módulo deve poder ser importado em outros scripts Node.js e deve oferecer a
seguinte interface:

#### `mdLinks(path, options)`

##### Argumentos

- `path`: Rota absoluta ou relativa ao arquivo ou diretório. Se a rota passada é
  relativa, deve resolver como sendo relativa ao diretório onde foi chamada -
  _current working directory_
- `options`: Um objeto com a seguinte propriedade:
  - `validate`: Um booleano que determina se deseja validar os links
    encontrados.##### Valor de retorno

A função deve retornar uma promessa (`Promise`) que resolve um array (`Array`) e
objetos(`Object`), onde cada objeto representa um link, contendo as seguintes
propriedades:

- `href`: URL encontrada.
- `text`: Texto que irá aparecer dentro de um link (`<a>`).
- `file`: Rota do arquivo onde foi encontrado o link.

#### Exemplo

```js
const mdLinks = require("md-links");

mdLinks("./some/example.md")
  .then((links) => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then((links) => {
    // => [{ href, text, file, status, ok }]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then((links) => {
    // => [{ href, text, file }]
  })
  .catch(console.error);
```

### CLI

O executável da nossa aplicação deve poder ser executado da seguinte maneira,
através do terminal:
`md-links <path-to-file> [options]`
**Por exemplo:**

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link de algo
./some/example.md https://outra-coisa-.net/algum-doc.html algum doc
./some/example.md http://google.com/ Google
```

#### Options

##### `--validate`

Se passamos a opção `--validate`, o módulo deve fazer uma requisição HTTP para
verificar se o link funciona ou não. Se o link resultar em um redirecionamento a
uma URL que responde ok, então consideraremos o link como ok.

Por exemplo:

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link de algo
./some/example.md https://outra-coisa-.net/algum-doc.html fail 404 algum doc
./some/example.md http://google.com/ ok 301 Google
```

Vemos que o _output_ neste caso inclui a palavra `ok` e `fail` depois da URL,
assim como o status da resposta recebida à requisição HTTP feita pela URL.

##### `--stats`

Se passamos a opção `--stats` o output (saída) será um texto com estatísticas
básicas sobre os links.

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

Também podemos combinar `--stats` e `--validate` para obter estatísticas que
necessitem dos resultados da validação.

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```

## 4. Considerações Gerais

### Arquivos do Projeto:

- `README.md`
- `index.js`
- `cli.js`
- `package.json`
- `package-lock.json`
- `.editorconfig`
- `.eslintrc`
- `.gitignore`
- `test/md-links.spec.js`
- `test/test-md-link.md`
- `image/mark-down.png`

### Tecnologias e bibliotecas utilizadas:

Recursos utilizados para desenvolver o projeto _MD-LINKS_:

- Visual Studio Code
- Jest
- Javascrip
- Eslint + config airbnb
- Path
- Fetch
- FS
