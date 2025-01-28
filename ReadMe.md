# SalesAPI

SalesAPI é um projeto completo que consiste em um backend desenvolvido em **.NET 8** e um frontend desenvolvido em **Angular**. Este README explica como configurar, rodar e usar ambas as partes do sistema.

---

## **Requisitos**

### **Para rodar o backend:**
- **.NET 8 SDK** (ou superior): [Baixar aqui](https://dotnet.microsoft.com/download)
- **Banco de dados PostgreSQL** (configurações no `appsettings.json`)

### **Para rodar o frontend:**
- **Node.js** (versão 16 ou superior): [Baixar aqui](https://nodejs.org/)
- **Angular CLI** (instalar globalmente via npm):
  ```bash
  npm install -g @angular/cli
  ```

---

## **Configuração do Backend**

1. Clone o repositório e navegue até a pasta do backend:
   ```bash
   git clone https://github.com/seu-repositorio/salesapi.git
   cd salesapi/backend
   ```

2. Configure o banco de dados no arquivo `appsettings.json`:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Host=localhost;Port=5432;Database=salesdb;Username=sales_user;Password=sua_senha"
     }
   }
   ```

3. Execute as migrações do banco de dados:
   ```bash
   dotnet ef database update
   ```

4. Inicie o servidor:
   ```bash
   dotnet run
   ```

5. O backend estará rodando em `https://localhost:7119` por padrão.

---

## **Configuração do Frontend**

1. Navegue até a pasta do frontend:
   ```bash
   cd salesapi/frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o arquivo `environment.ts` para apontar para o backend:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'https://localhost:7119/api'
   };
   ```

4. Inicie o servidor do Angular:
   ```bash
   ng serve
   ```

5. O frontend estará rodando em `http://localhost:4200`.

---

## **Como Usar**

1. Acesse o frontend em `http://localhost:4200`.
2. Use as funcionalidades do sistema para gerenciar produtos e vendas. As chamadas serão feitas para o backend em `https://localhost:7119/api`.
3. Certifique-se de que tanto o backend quanto o frontend estão rodando para um funcionamento completo.

---

## **Comandos Resumidos**

### Backend:
- **Executar o backend:**
  ```bash
  dotnet run
  ```
- **Atualizar o banco de dados:**
  ```bash
  dotnet ef database update
  ```

### Frontend:
- **Executar o frontend:**
  ```bash
  ng serve
  ```

---

## **Possíveis Problemas**

### Erro de CORS (Cross-Origin Resource Sharing):
Se encontrar problemas de CORS ao fazer chamadas do frontend para o backend, verifique se o backend está configurado corretamente com as diretivas de CORS no arquivo `Program.cs`.

### Certificado HTTPS autoassinado:
Se estiver usando HTTPS localmente, você pode precisar confiar no certificado autoassinado gerado pelo .NET ou configurar o frontend para ignorá-lo (somente em desenvolvimento).