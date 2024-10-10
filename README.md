# BoxIdea

## Descrição

**BoxIdea** é um sistema colaborativo onde os colaboradores podem submeter suas ideias relacionadas ao ambiente de trabalho. As informações enviadas são armazenadas em um banco de dados, permitindo que outros usuários consultem essas ideias, promovendo um ambiente de inovação e troca de conhecimento.

## Funcionalidades

- **Submissão de Ideias**: Usuários podem enviar suas ideias, incluindo título, descrição detalhada e nome (opcional).
- **Consulta de Ideias**: Usuários podem pesquisar ideias com base em palavras-chave no título e na descrição.
- **Visualização de Ideias**: Os usuários podem visualizar as ideias, incluindo título, nome do autor e descrição.

## Demonstração

Aqui estão algumas imagens da interface do BoxIdea:

**Página Inicial:**

![Página Inicial](/frontend/images/readme/preview-home.png)

**Página de Colaboração:**

![Página de Colaboração](/frontend/images/readme/preview-contribuir.png)
**Página de Aprendizado:**

![Página de Aprendizado 1](/frontend/images/readme/preview-learn-1.png)
![Página de Aprendizado 2](/frontend/images/readme/preview-learn-2.png)


## Requisitos

### Requisitos Funcionais

1. **Submissão de Ideias**:  
   - Permitir que os usuários enviem suas ideias, incluindo título e descrição detalhada. O nome do autor é opcional.

2. **Consulta de Ideias**:  
   - Implementar uma ferramenta de busca para localizar ideias com base em palavras-chave no título e na descrição.

3. **Visualização de Ideias**:  
   - Exibir as ideias encontradas na busca, mostrando o título, nome do autor (se fornecido) e a descrição.

### Requisitos Não Funcionais

1. **Disponibilidade**:  
   - O sistema deve estar disponível 24/7, com o mínimo de tempo de inatividade possível.

2. **Segurança**:
   - Implementar medidas de segurança para proteger as informações dos usuários. *(TODO: Detalhar medidas de segurança específicas)*

3. **Escalabilidade**:  
   - O sistema deve ser capaz de lidar com um aumento no número de usuários e no volume de dados. *(TODO: Descrever estratégias de escalabilidade)*

4. **Usabilidade**:  
   - A interface deve ser simples e intuitiva, facilitando a navegação e o uso.

5. **Manutenibilidade**:  
   - O código deve ser bem estruturado e documentado para facilitar a manutenção e futuras atualizações.

6. **Compatibilidade**:  
   - O sistema deve ser compatível com diferentes navegadores e dispositivos. *(TODO: Especificar navegadores e dispositivos suportados)*


## Tecnologias

- **Backend**: Java com Spring Boot
- **Banco de Dados**: PostgreSQL
- **Frontend**: HTML, CSS e JavaScript


## Instalação e Execução

**Pré-requisitos:**

- Java Development Kit (JDK) 17 ou superior
- Maven
- PostgreSQL (e ter um banco de dados configurado)

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seuusuario/boxidea.git 
   ```
2. **Navegue até o diretório do projeto:**
   ```bash
   cd boxidea
   ```
3. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env` na raiz do projeto com as seguintes configurações (adapte para o seu ambiente):
     ```
     SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/seu_banco_de_dados
     SPRING_DATASOURCE_USERNAME=seu_usuario
     SPRING_DATASOURCE_PASSWORD=sua_senha
     ```
4. **Instale as dependências:**
   ```bash
   mvn install
   ```
5. **Execute o projeto:**
   ```bash
   mvn spring-boot:run
   ```

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch com sua funcionalidade: `git checkout -b feature/nova-funcionalidade`.
3. Faça o commit das suas alterações: `git commit -m "Adiciona nova funcionalidade"`.
4. Envie suas alterações para o repositório original: `git push origin feature/nova-funcionalidade`.
5. Abra um pull request.

## TODO

- Implementar feedback visual para o usuário na submissão da ideia (sucesso ou erro).
- Implementar validação de dados no backend e frontend para garantir que título e descrição não sejam vazios.
- Implementar retorno de lista vazia no backend caso não haja ideias.
- Adicionar autenticação e autorização para proteger o acesso ao sistema.
- Melhorar a segurança do sistema. (ex.: adicionar proteção contra CSRF, XSS).
- Definir e documentar as estratégias de escalabilidade da aplicação.
- Especificar os navegadores e dispositivos suportados pela aplicação.
- Adicionar testes unitários e de integração.
- Criar um Dockerfile para facilitar a implantação.


## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).