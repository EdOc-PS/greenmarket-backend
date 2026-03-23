# GreenMarket Backend

<p align="center">
  <strong>API REST para gerenciamento de e-commerce de produtos verdes</strong>
</p>

<p align="center">
  <img alt="NestJS" src="https://img.shields.io/badge/NestJS-11.0-ea2845?style=flat-square&logo=nestjs" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square&logo=typescript" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-15-336791?style=flat-square&logo=postgresql" />
  <img alt="Prisma" src="https://img.shields.io/badge/Prisma-7.4-2d3748?style=flat-square&logo=prisma" />
  <img alt="License" src="https://img.shields.io/badge/License-UNLICENSED-blue?style=flat-square" />
</p>

---

## 📋 Sobre o Projeto

O **GreenMarket Backend** é uma API REST desenvolvida com **NestJS** para gerenciar uma plataforma de e-commerce especializada em produtos sustentáveis e orgânicos. A aplicação fornece funcionalidades completas para autenticação, gerenciamento de usuários, catálogo de produtos, carrinho de compras e processamento de pedidos.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| **NestJS** | 11.0.1 | Framework Node.js progressivo e modular |
| **TypeScript** | 5.x | Tipagem estática e desenvolvimento seguro |
| **PostgreSQL** | 15 | Banco de dados relacional |
| **Prisma** | 7.4.2 | ORM para gerenciamento de dados |
| **JWT (JSON Web Tokens)** | 11.0.2 | Autenticação e autorização |
| **Bcrypt** | 6.0.0 | Criptografia de senhas |
| **Swagger/OpenAPI** | 11.2.6 | Documentação interativa de API |
| **Class Validator** | 0.15.1 | Validação de dados com decoradores |
| **Class Transformer** | 0.5.1 | Transformação de objetos |
| **Passport** | 0.7.0 | Autenticação estratégica |

---

## 📁 Estrutura de Pastas

```
greenmarket-backend/
├── src/
│   ├── common/
│   │   ├── dto/                    # Data Transfer Objects reutilizáveis
│   │   ├── enums/                  # Enumerações da aplicação
│   │   ├── filters/                # Filtros de exceção globais
│   │   ├── interfaces/             # Interfaces customizadas
│   │   └── swagger/                # Documentação Swagger dos endpoints
│   ├── database/
│   │   ├── prisma.module.ts        # Módulo de configuração Prisma
│   │   └── prisma.service.ts       # Serviço de integração com Prisma
│   ├── modules/                    # Módulos da aplicação
│   │   ├── auth/                   # Autenticação e autorização
│   │   │   ├── dto/                # DTOs de login e criação de usuário
│   │   │   ├── jwt-auth.guard.ts   # Guard para proteção de rotas
│   │   │   ├── jwt.strategy.ts     # Estratégia JWT do Passport
│   │   │   └── repositories/       # Camada de dados
│   │   ├── users/                  # Gerenciamento de usuários
│   │   ├── products/               # Catálogo de produtos
│   │   ├── categories/             # Categorias de produtos
│   │   ├── cart/                   # Carrinho de compras
│   │   ├── order/                  # Processamento de pedidos
│   │   └── address/                # Gerenciamento de endereços
│   ├── app.module.ts               # Módulo raiz da aplicação
│   └── main.ts                     # Ponto de entrada da aplicação
├── prisma/
│   ├── schema.prisma               # Schema do banco de dados
│   └── migrations/                 # Histórico de migrações do banco
├── test/
│   ├── app.e2e-spec.ts            # Testes end-to-end
│   └── jest-e2e.json              # Configuração Jest para E2E
├── docker-compose.yml              # Orquestração de containers
├── package.json                    # Dependências do projeto
├── tsconfig.json                   # Configuração TypeScript
└── nest-cli.json                   # Configuração NestJS CLI
```

### Padrão Arquitetural

Cada módulo segue a arquitetura em camadas:

```
Module/
├── <module>.controller.ts     # Endpoints HTTP
├── <module>.service.ts        # Lógica de negócios
├── <module>.module.ts         # Configuração do módulo
├── dto/                       # Classes de transferência de dados
└── repositories/              # Abstração de acesso a dados
```

---

## 🚀 Como Começar

### Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** 9+ ou **yarn** (vem com Node.js)
- **Docker** e **Docker Compose** ([Download](https://www.docker.com/))
- **Git**

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/greenmarket-backend.git
cd greenmarket-backend
```

### 2️⃣ Instalar Dependências

```bash
npm install
```

### 3️⃣ Configurar o Banco de Dados

#### Iniciando o PostgreSQL com Docker:

```bash
docker-compose up -d
```

Isso iniciará um container PostgreSQL com as seguintes credenciais:
- **Usuário**: postgres
- **Senha**: postgres
- **Database**: greenhousedb
- **Porta**: 8080

#### Executar Migrações:

```bash
npx prisma migrate dev
```

#### (Opcional) Visualizar Dados com Prisma Studio:

```bash
npx prisma studio
```

### 4️⃣ Criar Arquivo `.env`

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:8080/greenhousedb"

# JWT
JWT_SECRET="sua_chave_secreta_muito_segura_aqui"
JWT_EXPIRATION="7d"

# Application
NODE_ENV="development"
PORT=3000
```

### 5️⃣ Executar a Aplicação

```bash
# Modo desenvolvimento (com hot-reload)
npm run start:dev

# Modo produção
npm run start:prod

# Debug mode
npm run start:debug
```

A API estará disponível em: **http://localhost:3000**

---

## 📚 Documentação da API

Com a aplicação rodando, acesse a documentação interativa:

- **Swagger UI**: http://localhost:3000/api-docs
- **OpenAPI JSON**: http://localhost:3000/api-json

> A documentação é gerada automaticamente pelo Swagger/OpenAPI baseada nos decoradores do código.

---

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start          # Iniciar aplicação
npm run start:dev      # Iniciar com watch mode (recarrega automático)
npm run start:debug    # Iniciar com debugger ativo

# Build
npm run build          # Compilar TypeScript para JavaScript

# Linting & Formatting
npm run lint           # Executar ESLint com fix automático
npm run format         # Formatar código com Prettier

# Testes
npm run test           # Executar testes unitários
npm run test:watch     # Executar testes em watch mode
npm run test:cov       # Gerar relatório de cobertura
npm run test:e2e       # Executar testes end-to-end
npm run test:debug     # Debugar testes

# Database
npx prisma migrate dev       # Criar nova migração
npx prisma migrate deploy    # Aplicar migrações
npx prisma db push          # Sincronizar schema (desenvolvimento)
npx prisma studio           # Abrir UI do Prisma
```

---

## 🔐 Autenticação

A aplicação utiliza **JWT (JSON Web Tokens)** para autenticação. 

### Fluxo de Login:

1. Usuário faz POST em `/auth/login` com email e senha
2. API valida credenciais e retorna um token JWT
3. Token é armazenado no cliente (localStorage, cookies, etc)
4. Nas requisições subsequentes, include o token no header: `Authorization: Bearer <token>`

### Exemplo de Uso:

```bash
# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "senha123"}'

# Resposta:
# {
#   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
#   "user": { ... }
# }

# Usar token em requisições protegidas
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## 🗄️ Modelo de Dados

### Principais Entidades:

- **User**: Usuários cadastrados na plataforma
- **Address**: Endereços de entrega associados aos usuários
- **Product**: Catálogo de produtos disponíveis
- **Category**: Categorias de produtos
- **Cart**: Carrinho de compras do usuário
- **CartItem**: Itens individual no carrinho
- **Order**: Pedidos realizados
- **OrderItem**: Itens de cada pedido

Para mais detalhes, veja [prisma/schema.prisma](prisma/schema.prisma)

---

## ✅ Validação de Dados

A aplicação utiliza **class-validator** para validação automática. Exemplo:

```typescript
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsPhoneNumber()
  phone: string;
}
```

Erros de validação retornam resposta padronizada com detalhes.

---

## 🔄 Fluxo de CI/CD

Recomendações para deploy:

1. **Testes**: Execute testes antes de fazer deploy
2. **Build**: Compile o TypeScript
3. **Migrations**: Aplique migrações ao banco
4. **Deploy**: Rode a aplicação em produção

```bash
# Exemplo de workflow
npm run lint           # Validar código
npm run test           # Testes unitários
npm run build          # Build
npx prisma migrate deploy  # Aplicar migrações
npm run start:prod     # Iniciar em produção
```

---

## 🐛 Troubleshooting

### Erro de Conexão com Banco de Dados

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solução**: 
- Verifique se o Docker está rodando: `docker ps`
- Reinicie os containers: `docker-compose down && docker-compose up -d`
- Confirme a `DATABASE_URL` no `.env`

### Porta 3000 já está em uso

```bash
# Mude a porta no .env
PORT=3001
```

### Erro ao rodar migrações

```bash
# Reset seguro do banco (desenvolvimento apenas)
npx prisma migrate reset
```

---

## 📝 Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `DATABASE_URL` | String de conexão PostgreSQL | `postgresql://user:pass@localhost:5432/db` |
| `JWT_SECRET` | Chave secreta para assinar JWTs | Qualquer string aleatória segura |
| `JWT_EXPIRATION` | Tempo de expiração do token | `7d`, `24h`, `3600s` |
| `NODE_ENV` | Ambiente da aplicação | `development`, `production` |
| `PORT` | Porta de execução da API | `3000` |

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

- Use **TypeScript** com tipagem forte
- Siga o **ESLint** (execute `npm run lint`)
- Escreva **testes** para novas funcionalidades
- Use **camelCase** para variáveis e **PascalCase** para classes

---

## 📄 Licença

Este projeto está sob a licença **UNLICENSED**. Veja [LICENSE](LICENSE) para mais detalhes.

---

## 📞 Suporte

Para dúvidas, abra uma **issue** no repositório ou entre em contato através do email.

---

<p align="center">
  Desenvolvido com ❤️ usando <a href="https://nestjs.com/">NestJS</a>
</p>
