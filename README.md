# Desafio Empacotamento L2Code


## 📝 Notas importantes

- A API Key de teste é: `test-api-key-123`
- A porta padrão é `3000`, mas pode ser alterada via variável de ambiente `PORT`
- O arquivo `entradaTeste.json` contém 10 pedidos de exemplo para teste
- A documentação Swagger está disponível em `/api-docs`
- Todos os endpoints requerem autenticação via API Key

## 📋 Pré-requisitos

### Usando NPM/PNPM
- Node.js 18 ou superior
- NPM ou PNPM

### Usando Docker
- Docker
- Docker Compose

## 🚀 Como rodar o projeto

### 1. Usando Docker

```bash
# Build e execução com Docker Compose
docker-compose up --build

```
### 2. Instalação das dependências (NPM/PNPM)

```bash
# Com NPM
npm install

# Com PNPM
pnpm install
```

### 3. Executando em modo desenvolvimento

```bash
# Com NPM
npm run start:dev

# Com PNPM
pnpm run start:dev

O serviço estará disponível em `http://localhost:3000` (ou na porta especificada).

## 🧪 Executando os testes

### Testes unitários

```bash
# Executar todos os testes
npm run test

### Testes end-to-end (e2e)

```bash
npm run test:e2e
```

### Autenticação
Todos os endpoints requerem autenticação via API Key no header:
```
x-api-key: test-api-key-123
```

### Endpoints disponíveis

#### 1. Health Check
- **GET** `/empacotamento/healthcheck`
- **Descrição**: Verifica se a API está funcionando
- **Resposta**: Status da aplicação

#### 2. Processamento de Empacotamento
- **POST** `/empacotamento/processamento`
- **Descrição**: Processa pedidos para determinar o melhor empacotamento
- **Content-Type**: `application/json`
- **Body**: Estrutura de pedidos com produtos e dimensões

### Documentação Swagger
Acesse a documentação interativa da API em:
```
http://localhost:3000/api-docs
```

## 🧪 Testando a API

### Usando o arquivo de teste fornecido

O projeto inclui um arquivo `entradaTeste.json` com dados de exemplo para testar o endpoint de processamento.

#### Exemplo de uso com curl:

```bash
# Health check
curl -X GET http://localhost:3000/empacotamento/healthcheck \
  -H "x-api-key: test-api-key-123"

# Processamento usando o arquivo de teste
curl -X POST http://localhost:3000/empacotamento/processamento \
  -H "Content-Type: application/json" \
  -H "x-api-key: test-api-key-123" \
  -d @entradaTeste.json

# Exemplo com dados inline
curl -X POST http://localhost:3000/empacotamento/processamento \
  -H "Content-Type: application/json" \
  -H "x-api-key: test-api-key-123" \
  -d '{
    "pedidos": [
      {
        "pedido_id": 1,
        "produtos": [
          {
            "produto_id": "PS5",
            "dimensoes": {
              "altura": 40,
              "largura": 10,
              "comprimento": 25
            }
          }
        ]
      }
    ]
  }'
```

### Estrutura do JSON de entrada

```json
{
  "pedidos": [
    {
      "pedido_id": 1,
      "produtos": [
        {
          "produto_id": "Nome do produto",
          "dimensoes": {
            "altura": 40,
            "largura": 10,
            "comprimento": 25
          }
        }
      ]
    }
  ]
}
```

## 🏗️ Estrutura do projeto

```
src/
├── auth/              # Módulos de autenticação
├── controllers/       # Controllers
├── dtos/              # DTOs
├── guards/            # Guards de autenticação/autorização
├── services/          # Serviços para os controllers
├── app.module.ts      # Módulo principal
└── main.ts          # Ponto de entrada da aplicação

test/                 # Testes
```

## 🔧 Tecnologias utilizadas

- **NestJS** - Framework Node.js
- **TypeScript** - Linguagem
- **Swagger** - Documentação da API
- **Jest** - Framework de testes
- **ESLint** - Linting
- **Prettier** - Formatação de código
- **Docker** - Containerização