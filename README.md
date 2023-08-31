![](https://i.imgur.com/xG74tOh.png)

# Desafio Módulo 3 - Backend

Seu papel é construir uma RESTful API que permita:

-   Cadastrar Usuário
-   Fazer Login
-   Detalhar Perfil do Usuário Logado
-   Editar Perfil do Usuário Logado
-   Listar categorias
-   Listar transações
-   Detalhar transação
-   Cadastrar transação
-   Editar transação
-   Remover transação
-   Obter extrato de transações
-   [Extra] Filtrar transações por categoria

**Importante: Lembre-se sempre que cada usuário só pode ver e manipular seus próprios dados e suas próprias transações. Não atender a este pré-requisito é uma falha de segurança gravíssima!**

**Importante 2: Sempre que a validação de uma requisição falhar, responda com código de erro e mensagem adequada à situação, ok?**

**Importante 3: O link de acesso a esta API se encontra no final deste README. Este link é somente para testes!**

**Exemplo:**

```javascript
// Quando é informado um id de transação que não existe:
// HTTP Status 404
{
    "mensagem": "Transação não encontrada!"
}
```

## **Banco de dados**

Você precisa criar um Banco de Dados PostgreSQL chamado `dindin` contendo as seguintes tabelas e colunas:  
**ATENÇÃO! Os nomes das tabelas e das colunas a serem criados devem seguir exatamente os nomes listados abaixo.**

-   usuarios
    -   id
    -   nome
    -   email (campo único)
    -   senha
-   categorias
    -   id
    -   descricao
-   transacoes
    -   id
    -   descricao
    -   valor
    -   data
    -   categoria_id
    -   usuario_id
    -   tipo

**IMPORTANTE: Deverá ser criado no projeto o(s) arquivo(s) SQL que deverá ser o script que cria as tabelas corretamente.**

As categorias a seguir precisam ser previamente cadastradas para que sejam listadas no endpoint de listagem das categorias.

## **Categorias**

-   Alimentação
-   Assinaturas e Serviços
-   Casa
-   Mercado
-   Cuidados Pessoais
-   Educação
-   Família
-   Lazer
-   Pets
-   Presentes
-   Roupas
-   Saúde
-   Transporte
-   Salário
-   Vendas
-   Outras receitas
-   Outras despesas

**IMPORTANTE: Deverá ser criado no projeto o arquivo SQL que deverá ser o script de inserção das categorias acima na tabela.**

## **Requisitos obrigatórios**

-   A API a ser criada deverá acessar o banco de dados a ser criado "dindin" para persistir e manipular os dados de usuários, categorias e transações utilizados pela aplicação.
-   O campo `id` das tabelas no banco de dados deve ser auto incremento, chave primária e não deve permitir edição uma vez criado.
-   Seu código deverá estar organizado, delimitando as responsabilidades de cada arquivo adequadamente. Ou seja, é esperado que ele tenha, no mínimo:
    -   Um arquivo index.js
    -   Um arquivo conexao.js
    -   Um arquivo de rotas
    -   Um pasta com controladores
-   Qualquer valor monetário deverá ser representado em centavos (Ex.: R$ 10,00 reais = 1000)
-   Evite códigos duplicados. Antes de copiar e colar, pense se não faz sentido esse pedaço de código estar centralizado numa função.

## **Status Codes**

Abaixo, listamos os possíveis **_status codes_** esperados como resposta da API.

```javascript
// 200 (OK) = requisição bem sucedida
// 201 (Created) = requisição bem sucedida e algo foi criado
// 204 (No Content) = requisição bem sucedida, sem conteúdo no corpo da resposta
// 400 (Bad Request) = o servidor não entendeu a requisição pois está com uma sintaxe/formato inválido
// 401 (Unauthorized) = o usuário não está autenticado (logado)
// 403 (Forbidden) = o usuário não tem permissão de acessar o recurso solicitado
// 404 (Not Found) = o servidor não pode encontrar o recurso solicitado
```

## **Endpoints**

### **Cadastrar usuário**

#### `POST` `/usuario`

Essa é a rota que será utilizada para cadastrar um novo usuario no sistema.

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   nome
    -   email
    -   senha

-   **Resposta**  
    Em caso de **sucesso**, deveremos enviar no corpo (body) da resposta o conteúdo do usuário cadastrado, incluindo seu respectivo `id` e excluindo a senha criptografada.
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

-   **REQUISITOS OBRIGATÓRIOS**
    -   Validar os campos obrigatórios:
        -   nome
        -   email
        -   senha
    -   Validar se o e-mail informado já existe
    -   Criptografar a senha antes de persistir no banco de dados
    -   Cadastrar o usuário no banco de dados

#### **Exemplo de requisição**

```javascript
// POST /usuario
{
    "nome": "José",
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Já existe usuário cadastrado com o e-mail informado."
}
```

### **Login do usuário**

#### `POST` `/login`

Essa é a rota que permite o usuario cadastrado realizar o login no sistema.

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   email
    -   senha

-   **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um objeto com a propriedade **token** que deverá possuir como valor o token de autenticação gerado e uma propriedade **usuario** que deverá possuir as informações do usuário autenticado, exceto a senha do usuário.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

-   **REQUISITOS OBRIGATÓRIOS**

    -   Validar os campos obrigatórios:
        -   email
        -   senha
    -   Verificar se o e-mail existe
    -   Validar e-mail e senha
    -   Criar token de autenticação com id do usuário

#### **Exemplo de requisição**

```javascript
// POST /login
{
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "usuario": {
        "id": 1,
        "nome": "José",
        "email": "jose@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Usuário e/ou senha inválido(s)."
}
```

---

## **ATENÇÃO**: Todas as funcionalidades (endpoints) a seguir, a partir desse ponto, deverão exigir o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token. Portanto, em cada funcionalidade será necessário validar o token informado.

---

### **Validações do token**

-   **REQUISITOS OBRIGATÓRIOS**
    -   Validar se o token foi enviado no header da requisição (Bearer Token)
    -   Verificar se o token é válido
    -   Consultar usuário no banco de dados pelo id contido no token informado

### **Detalhar usuário**

#### `GET` `/usuario`

Essa é a rota que será chamada quando o usuario quiser obter os dados do seu próprio perfil.  
**Atenção!:** O usuário deverá ser identificado através do ID presente no token de autenticação.

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    Não deverá possuir conteúdo no corpo da requisição.

-   **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um objeto que representa o usuário encontrado, com todas as suas propriedades (exceto a senha), conforme exemplo abaixo, acompanhado de **_status code_** apropriado.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.  
    **Dica:** neste endpoint podemos fazer uso do status code 401 (Unauthorized).

#### **Exemplo de requisição**

```javascript
// GET /usuario
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Para acessar este recurso um token de autenticação válido deve ser enviado."
}
```

### **Atualizar usuário**

#### `PUT` `/usuario`

Essa é a rota que será chamada quando o usuário quiser realizar alterações no seu próprio usuário.  
**Atenção!:** O usuário deverá ser identificado através do ID presente no token de autenticação.

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   nome
    -   email
    -   senha

-   **Resposta**  
    Em caso de **sucesso**, não deveremos enviar conteúdo no corpo (body) da resposta.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

-   **REQUISITOS OBRIGATÓRIOS**
    -   Validar os campos obrigatórios:
        -   nome
        -   email
        -   senha
    -   Validar se o novo e-mail já existe no banco de dados para outro usuário
        -   Caso já exista o novo e-mail fornecido para outro usuário no banco de dados, a alteração não deve ser permitida (o campo de email deve ser sempre único no banco de dados)
    -   Criptografar a senha antes de salvar no banco de dados
    -   Atualizar as informações do usuário no banco de dados

#### **Exemplo de requisição**

```javascript
// PUT /usuario
{
    "nome": "José de Abreu",
    "email": "jose_abreu@email.com",
    "senha": "j4321"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O e-mail informado já está sendo utilizado por outro usuário."
}
```

### **Listar categorias**

#### `GET` `/categoria`

Essa é a rota que será chamada quando o usuario logado quiser listar todas as categorias cadastradas.

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    Não deverá possuir conteúdo no corpo (body) da requisição.

-   **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um array dos objetos (categorias) encontrados.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

-   **REQUISITOS OBRIGATÓRIOS**
    -   O endpoint deverá responder com um array de todas as categorias cadastradas.

#### **Exemplo de requisição**

```javascript
// GET /categoria
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
    {
        id: 1,
        descricao: "Roupas",
    },
    {
        id: 2,
        descricao: "Mercado",
    },
]
```

```javascript
// HTTP Status 200 / 201 / 204
[]
```

### **Listar transações do usuário logado**

#### `GET` `/transacao`

Essa é a rota que será chamada quando o usuario logado quiser listar todas as suas transações cadastradas.  
**Lembre-se:** Deverão ser retornadas **apenas** transações associadas ao usuário logado, que deverá ser identificado através do ID presente no token de validação.

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    Não deverá possuir conteúdo no corpo (body) da requisição.

-   **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um array dos objetos (transações) encontrados.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

-   **REQUISITOS OBRIGATÓRIOS**
    -   O usuário deverá ser identificado através do ID presente no token de validação
    -   O endpoint deverá responder com um array de todas as transações associadas ao usuário. Caso não exista nenhuma transação associada ao usuário deverá responder com array vazio.

#### **Exemplo de requisição**

```javascript
// GET /transacao
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
    {
        id: 1,
        tipo: "saida",
        descricao: "Sapato amarelo",
        valor: 15800,
        data: "2022-03-23T15:35:00.000Z",
        usuario_id: 5,
        categoria_id: 4,
        categoria_nome: "Roupas",
    },
    {
        id: 3,
        tipo: "entrada",
        descricao: "Salário",
        valor: 300000,
        data: "2022-03-24T15:30:00.000Z",
        usuario_id: 5,
        categoria_id: 6,
        categoria_nome: "Salários",
    },
]
```

```javascript
// HTTP Status 200 / 201 / 204
[]
```

### **Detalhar uma transação do usuário logado**

#### `GET` `/transacao/:id`

Essa é a rota que será chamada quando o usuario logado quiser obter uma das suas transações cadastradas.  
**Lembre-se:** Deverá ser retornado **apenas** transação associada ao usuário logado, que deverá ser identificado através do ID presente no token de validação.

-   **Requisição**  
    Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
    O corpo (body) da requisição não deverá possuir nenhum conteúdo.

-   **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um objeto que representa a transação encontrada, com todas as suas propriedades, conforme exemplo abaixo, acompanhado de **_status code_** apropriado.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

-   **REQUISITOS OBRIGATÓRIOS**
    -   Validar se existe transação para o id enviado como parâmetro na rota e se esta transação pertence ao usuário logado.

#### **Exemplo de requisição**

```javascript
// GET /transacao/2
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 3,
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "usuario_id": 5,
    "categoria_id": 6,
    "categoria_nome": "Salários",
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Transação não encontrada."
}
```

### **Cadastrar transação para o usuário logado**

#### `POST` `/transacao`

Essa é a rota que será utilizada para cadastrar uma transação associada ao usuário logado.  
**Lembre-se:** Deverá ser possível cadastrar **apenas** transações associadas ao próprio usuário logado, que deverá ser identificado através do ID presente no token de validação.

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) da requisição deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   descricao
    -   valor
    -   data
    -   categoria_id
    -   tipo (campo que será informado se a transação corresponde a uma saída ou entrada de valores)

-   **Resposta**
    Em caso de **sucesso**, deveremos enviar, no corpo (body) da resposta, as informações da transação cadastrada, incluindo seu respectivo `id`.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

-   **REQUISITOS OBRIGATÓRIOS**
    -   Validar os campos obrigatórios:
        -   descricao
        -   valor
        -   data
        -   categoria_id
        -   tipo
    -   Validar se existe categoria para o id enviado no corpo (body) da requisição.
    -   Validar se o tipo enviado no corpo (body) da requisição corresponde a palavra `entrada` ou `saida`, exatamente como descrito.
    -   Cadastrar a transação associada ao usuário logado.

#### **Exemplo de requisição**

```javascript
// POST /transacao
{
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "categoria_id": 6
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 3,
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "usuario_id": 5,
    "categoria_id": 6,
    "categoria_nome": "Salários",
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Todos os campos obrigatórios devem ser informados."
}
```

### **Atualizar transação do usuário logado**

#### `PUT` `/transacao/:id`

Essa é a rota que será chamada quando o usuario logado quiser atualizar uma das suas transações cadastradas.  
**Lembre-se:** Deverá ser possível atualizar **apenas** transações associadas ao próprio usuário logado, que deverá ser identificado através do ID presente no token de validação.

-   **Requisição**  
    Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
    O corpo (body) da requisição deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   descricao
    -   valor
    -   data
    -   categoria_id
    -   tipo (campo que será informado se a transação corresponde a uma saída ou entrada de valores)

-   **Resposta**  
    Em caso de **sucesso**, não deveremos enviar conteúdo no corpo (body) da resposta.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

-   **REQUISITOS OBRIGATÓRIOS**
    -   Validar se existe transação para o id enviado como parâmetro na rota e se esta transação pertence ao usuário logado.
    -   Validar os campos obrigatórios:
        -   descricao
        -   valor
        -   data
        -   categoria_id
        -   tipo
    -   Validar se existe categoria para o id enviado no corpo (body) da requisição.
    -   Validar se o tipo enviado no corpo (body) da requisição corresponde a palavra `entrada` ou `saida`, exatamente como descrito.
    -   Atualizar a transação no banco de dados

#### **Exemplo de requisição**

```javascript
// PUT /transacao/2
{
	"descricao": "Sapato amarelo",
	"valor": 15800,
	"data": "2022-03-23 12:35:00",
	"categoria_id": 4,
	"tipo": "saida"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Todos os campos obrigatórios devem ser informados."
}
```

### **Excluir transação do usuário logado**

#### `DELETE` `/transacao/:id`

Essa é a rota que será chamada quando o usuario logado quiser excluir uma das suas transações cadastradas.  
**Lembre-se:** Deverá ser possível excluir **apenas** transações associadas ao próprio usuário logado, que deverá ser identificado através do ID presente no token de validação.

-   **Requisição**  
    Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
    O corpo (body) da requisição não deverá possuir nenhum conteúdo.

-   **Resposta**  
    Em caso de **sucesso**, não deveremos enviar conteúdo no corpo (body) da resposta.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

-   **REQUISITOS OBRIGATÓRIOS**:
    -   Validar se existe transação para o id enviado como parâmetro na rota e se esta transação pertence ao usuário logado.
    -   Excluir a transação no banco de dados.

#### **Exemplo de requisição**

```javascript
// DELETE /transacao/2
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Transação não encontrada."
}
```

### **Obter extrato de transações**

#### `GET` `/transacao/extrato`

Essa é a rota que será chamada quando o usuario logado quiser obter o extrato de todas as suas transações cadastradas.
**Lembre-se:** Deverá ser possível consultar **apenas** transações associadas ao próprio usuário logado, que deverá ser identificado através do ID presente no token de validação.

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) da requisição não deverá possuir nenhum conteúdo.

-   **Resposta**  
    Em caso de **sucesso**, deveremos enviar no corpo (body) da resposta um objeto contendo a soma de todas as transações do tipo `entrada` e a soma de todas as transações do tipo `saida`.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

-   **REQUISITOS OBRIGATÓRIOS**:
    -   Em caso de não existir transações do tipo `entrada` cadastradas para o usuário logado, o valor retornado no corpo (body) da resposta deverá ser 0.
    -   Em caso de não existir transações do tipo `saida` cadastradas para o usuário logado, o valor retornado no corpo (body) da resposta deverá ser 0.

**Importante: A criação desta rota, no arquivo `rotas.js`, deverá acontecer antes da criação da rota de detalhamento de uma transação (`GET /transacao/:id`), caso contrário, esta rota nunca será possível ser acessada.**

#### **Exemplo de requisição**

```javascript
// DELETE /transacao/extrato
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
	"entrada": 300000,
	"saida": 15800
}
```

---

## **EXTRA**

**ATENÇÃO!:** Esta parte extra não é obrigatória e recomendamos que seja feita apenas quando terminar toda a parte obrigatória acima.

### **Filtrar transações por categoria**

Na funcionalidade de listagem de transações do usuário logado (**GET /transacao**), deveremos incluir um parâmetro do tipo query **filtro** para que seja possível consultar apenas transações das categorias informadas.

**Lembre-se:** Deverão ser retornadas **apenas** transações associadas ao usuário logado, que deverá ser identificado através do ID presente no token de validação.

-   **Requisição**  
    Parâmetro opcional do tipo query **filtro**.
    Não deverá possuir conteúdo no corpo (body) da requisição.

-   **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um array dos objetos (transações) encontradas.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

-   **REQUISITOS OBRIGATÓRIOS**
    -   O usuário deverá ser identificado através do ID presente no token de validação
    -   O parâmetro opcional do tipo query **filtro**, quando enviado, deverá ser sempre um array contendo a descrição de uma ou mais categorias.
    -   O endpoint deverá responder com um array de todas as transações associadas ao usuário que sejam da categorias passadas no parâmetro query. Caso não exista nenhuma transação associada ao usuário deverá responder com array vazio.

#### **Exemplo de requisição**

```javascript
// GET /transacao?filtro[]=roupas&filtro[]=salários
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
    {
        id: 1,
        tipo: "saida",
        descricao: "Sapato amarelo",
        valor: 15800,
        data: "2022-03-23T15:35:00.000Z",
        usuario_id: 5,
        categoria_id: 4,
        categoria_nome: "Roupas",
    },
    {
        id: 3,
        tipo: "entrada",
        descricao: "Salário",
        valor: 300000,
        data: "2022-03-24T15:30:00.000Z",
        usuario_id: 5,
        categoria_id: 6,
        categoria_nome: "Salários",
    },
]
```

```javascript
// HTTP Status 200 / 201 / 204
[]
```

---

Link do deploy da API somente para testes: [ link](https://desafio-backend-03-dindin.pedagogico.cubos.academy/)

**Este link é somente para testes (ou seja, será possível realizar requisições a esta API através deste link)**

---

## **Aulas úteis:**

-   [CRUD SQL](https://aulas.cubos.academy/turma/503b31f6-db13-4a79-8c3f-132b3d44e96f/aulas/f2553afa-b145-44f6-aefb-a2ab86a7b0ca)
-   [Modelagem de Dados](https://aulas.cubos.academy/turma/503b31f6-db13-4a79-8c3f-132b3d44e96f/aulas/4a01da6c-699c-424e-b7fc-c659a173df13)
-   [Conexão NodeJs com PostgreSQL](https://aulas.cubos.academy/turma/503b31f6-db13-4a79-8c3f-132b3d44e96f/aulas/f88649a8-b3f2-411e-af52-220414c88912)
-   [Autenticação e Criptografia](https://aulas.cubos.academy/turma/503b31f6-db13-4a79-8c3f-132b3d44e96f/aulas/9304a09d-960c-4888-b121-b7e1915da406)
-   [Revisão Parte I](https://aulas.cubos.academy/turma/503b31f6-db13-4a79-8c3f-132b3d44e96f/aulas/da922db0-1521-4c47-9d3d-29f644a3f491)
-   [Revisão Parte II](https://aulas.cubos.academy/turma/503b31f6-db13-4a79-8c3f-132b3d44e96f/aulas/d7197ed2-f15f-4d43-9675-075a02287859)
---

**LEMBRE-SE**: Feito é melhor que perfeito!!!

###### tags: `back-end` `módulo 3` `nodeJS` `PostgreSQL` `API REST` `desafio`
