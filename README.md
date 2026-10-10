# API Restaurante – Sistema de Autoatendimento

## 1. Nome e descrição do projeto

**Restaurant Ordering System** é uma API REST para um sistema de autoatendimento de restaurante.

- **Problema:** restaurantes precisam organizar o cardápio (categorias e produtos) para que o cliente consiga consultar e escolher o que quer pedir sem depender de um atendente.
- **Contexto:** projeto desenvolvido na disciplina de Desenvolvimento Back-End (Engenharia de Software), construído em sala de aula e concluído de forma individual na APS.
- **Objetivo da API:** fornecer endpoints para cadastrar, consultar, atualizar e remover categorias e produtos do cardápio, salvando tudo em um banco de dados no Supabase/PostgreSQL.

## 2. Identificação do estudante

**Nome:** Erick Yuri Maba Silva

## 3. Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- Supabase
- PostgreSQL
- Git

## 4. Entidades e relacionamentos

### Category (categorias)

| Atributo | Tipo | Descrição |
|---|---|---|
| id | UUID | Identificador (chave primária) |
| name | texto | Nome da categoria (obrigatório) |
| description | texto | Descrição da categoria |
| icon | texto | Ícone da categoria |
| display_order | inteiro | Ordem de exibição |
| active | booleano | Se a categoria está ativa |

### Product (produtos)

| Atributo | Tipo | Descrição |
|---|---|---|
| id | UUID | Identificador (chave primária) |
| name | texto | Nome do produto (obrigatório) |
| description | texto | Descrição do produto |
| price | número | Preço do produto (obrigatório, maior ou igual a 0) |
| category_id | UUID | Chave estrangeira para `categories.id` |

### Relacionamento

Uma **categoria** possui vários **produtos** e cada **produto** pertence a uma categoria (1 : N).

```
categories (1) ───────< (N) products
   id                       category_id (FK)
```

## 5. Estrutura do projeto

```
src/
├── config/
│   └── supabase.ts            # conexão com o Supabase
├── controller/
│   ├── CategoryController.ts  # recebe as requisições e devolve as respostas HTTP
│   └── ProductController.ts
├── models/
│   ├── Category.ts            # acesso e persistência dos dados no Supabase
│   └── Product.ts
├── routes/
│   ├── categoryRoutes.ts      # definição dos endpoints
│   └── productRoutes.ts
├── app.ts                     # configuração do Express e registro das rotas
└── server.ts                  # inicia o servidor
```

- **config:** configuração do cliente Supabase usando variáveis de ambiente.
- **models:** funções de cada entidade que fazem o CRUD no banco (conforme feito em sala).
- **controller:** valida os dados recebidos, chama o model e define o código HTTP da resposta.
- **routes:** liga cada método HTTP + caminho a uma função do controller.

## 6. Configuração e execução

```bash
# 1. Clonar o repositório
git clone https://github.com/joaoramos14/restaurant_ordering_system.git
cd restaurant_ordering_system

# 2. Instalar as dependências
npm install

# 3. Criar o arquivo .env (veja a seção 7)
cp .env.example .env

# 4. Iniciar a aplicação em modo desenvolvimento
npm run dev
```

O servidor sobe em `http://localhost:3000`.

## 7. Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto (use o `.env.example` como modelo):

| Variável | Descrição |
|---|---|
| SUPABASE_URL | URL do projeto no Supabase |
| SUPABASE_SECRET_KEY | Chave secreta do projeto no Supabase |

Exemplo (`.env.example`):

```
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SECRET_KEY=sua-chave-secreta-aqui
```

> O arquivo `.env` contém dados sensíveis e está no `.gitignore`. Ele **não** é enviado ao repositório.

## 8. Banco de dados

O banco usa Supabase/PostgreSQL com duas tabelas: `categories` e `products`.
O script para criar a estrutura está em [`database/schema.sql`](database/schema.sql). Para usar, abra o **SQL Editor** do Supabase, cole o conteúdo do arquivo e execute.

```sql
create table if not exists categories (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    description text,
    icon text,
    display_order integer default 0,
    active boolean default true
);

create table if not exists products (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    description text,
    price numeric(10, 2) not null check (price >= 0),
    category_id uuid references categories(id) on delete set null
);
```

- Os IDs são **UUID**.
- `products.category_id` é uma **chave estrangeira** para `categories.id`.

## 9. Documentação dos endpoints

### Categories

| Método | Endpoint | Descrição |
|---|---|---|
| GET | /categories | Lista todas as categorias |
| GET | /categories/search/:keyword | Pesquisa categorias por palavra-chave |
| GET | /categories/:id | Consulta uma categoria pelo ID |
| POST | /categories | Cadastra uma categoria |
| PUT | /categories/:id | Atualiza uma categoria |
| DELETE | /categories/:id | Remove uma categoria |

### Products

| Método | Endpoint | Descrição |
|---|---|---|
| GET | /products | Lista todos os produtos |
| GET | /products/search/:keyword | Pesquisa produtos por palavra-chave (nome ou descrição) |
| GET | /products/:id | Consulta um produto pelo ID |
| POST | /products | Cadastra um produto |
| PUT | /products/:id | Atualiza um produto |
| DELETE | /products/:id | Remove um produto |

### Códigos de resposta (categorias e produtos)

| Código | Quando acontece |
|---|---|
| 200 | Consulta, atualização ou remoção realizada com sucesso |
| 201 | Registro criado com sucesso |
| 400 | Dados inválidos (nome vazio, preço inválido, etc.) |
| 404 | Registro não encontrado (consulta por ID) |
| 500 | Erro interno ao acessar o banco |

## 10. Exemplos de requisições

### Criar categoria – `POST /categories`

```json
{
  "name": "Pizzas",
  "description": "Pizzas tradicionais e especiais",
  "icon": "🍕",
  "display_order": 1,
  "active": true
}
```

### Criar produto – `POST /products`

```json
{
  "name": "Pizza Margherita",
  "description": "Molho de tomate, mussarela e manjericão",
  "price": 39.9,
  "category_id": "COLOQUE-AQUI-O-UUID-DA-CATEGORIA"
}
```

### Atualizar produto – `PUT /products/:id`

```json
{
  "name": "Pizza Margherita Grande",
  "description": "Molho de tomate, mussarela e manjericão",
  "price": 49.9,
  "category_id": "COLOQUE-AQUI-O-UUID-DA-CATEGORIA"
}
```

### Pesquisar produto – `GET /products/search/pizza`

Retorna os produtos cujo nome ou descrição contenham "pizza".

### Exemplo de erro de validação – `POST /products` com preço inválido

```json
{
  "name": "Pizza",
  "price": -5
}
```

Resposta (`400`):

```json
{
  "message": "O preço deve ser um número maior ou igual a zero."
}
```
