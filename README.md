<div style="margin: 50px 0">
  <img src="https://kenoby.com/wp-content/uploads/2019/10/kenoby-logo.svg" width="300px">
</div>

# Desafio Técnico - Senior Software Engineer

Na Kenoby, milhares de candidatos se candidatam diariamente as vagas de várias empresas clientes da Kenoby. Como uma empresa SaaS, além de termos que garantir alta disponibilidade, precisamos ser performáticos e consistentes com os nossos dados. 

Um dos nossos objetivos como empresa é garantir o melhor candidato para a melhor vaga. Aqui, ao invés de pensarmos como um usuário perdido, olhamos para esse problema como uma pessoa que pode perder a chance de recolocação e a empresa perder o funcionário ideal. Então prezamos muito por performance, alta disponibilidade e consistência.

## Proposta do desafio

Você deverá implementar uma interface (Pode ser um endpoint REST, GraphQL, Consumidor de fila ou o que achar melhor), que receberá um ou vários candidatos para uma vaga e deverá sincronizar a candidatura na base de dados e no ElasticSearch. A base de dados servirá como camada de persistência, enquanto as consultas deverão ser realizadas diretamente do ElasticSearch, então você também precisará de um endpoint de consulta que retorne as candidaturas de uma vaga, podendo filtrar por **Nome da Vaga** e **Email do candidato**. 

Cada vaga possuirá um limite máximo de contratação, então novas candidaturas deverão ser bloqueadas quando atingir esse limite.

A candidatura poderá possuir 3 estados: 

  - **ASSESSING**: Quando o candidato está sendo avaliado.
  - **HIRED**: Quando o candidato é contratado.
  - **INCOMPATIBLE**: Quando o candidato não é compatível com a vaga.

Você deverá considerar essa informação ao receber as informações.

### Linguagem e banco de dados

Você poderá escolher a linguagem de sua preferência para implementar a solução, assim como o banco de dados. 
Neste repositório, disponibilizamos a configuração de um `Postgres` e de um `MongoDB` para caso opte por uma solução `No SQL` ou `SQL`, mas você tem total liberdade para fazer sua escolha.

Nós também geramos dados mockados para que você possa alimentar a base, então dentro da pasta `data` possuimos dois arquivos json com dados de **candidatos** e **vagas**. (Caso opte por usar uma das soluções, esses dados já serão carregados na database por padrão).

### Definição de Pronto

  - A aplicação deverá ter uma interface (Pode ser um endpoint REST, GraphQL, Consumidor de fila ou o que achar melhor) para adicionar candidatura de 1 ou mais candidatos.
  - A aplicação deverá ter um endpoint para listar as candidaturas de uma vaga
  - A aplicação deverá trazer as candidaturas buscando pelo nome da vaga
  - A aplicação deverá trazer as candidaturas buscando pelo email do usuário
  - Os dados da candidatura deverão ser salvos na base de dados e no ElasticSearch

## O que será avaliado

  - Qualidade do código e confiabilidade do sistema
  - Uso de boas práticas de desenvolvimento
  - Coerência com a solução proposta
  - Escalabilidade da solução
  - Arquitetura do projeto

## Usando o boilerplate

Nós queremos que você foque no problema principal, então tentamos deixar o máximo preparado pra você. Neste repositório, configuramos um docker-compose com o `ElasticSearch` e o `Kibana`. Você poderá criar o indice necessário no arquivo `./docker/elastic/create-index`. 

Caso você opte por usar uma solução SQL ou No SQL, já possuimos também configurado uma instância de `Postgres` e do `MongoDB` com os dados mockados já sendo importados. 

**Para usar o Postgres**:
```
./run sql
```

**Para usar o MongoDB**:

```
./run
```

Ambos possuem as seguintes credenciais: 

 - User: kenoby
 - Password: 12345
 - Database: kenoby

Caso você opte por utilizar uma outra base de dados ou adicionar algum outro componente, sinta se livre. Os dados mockados também estão disponíveis em `./data/applicants.json` e `./data/positions.json`.

## Processo de submissão

O desafio deve ser entregue pelo GitHub. Não é obrigatório disponibilizar um link online para acesso do serviço, mas mantenha-se atento para que seja possível rodar o projeto em qualquer ambiente.

Qualquer dúvida em relação ao desafio, responderemos por e-mail.

Bom trabalho!

