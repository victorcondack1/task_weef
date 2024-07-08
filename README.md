Bem-vindo ao Weeef Events!

A aplicação Weeef Events permite gerenciar eventos de forma eficiente, fornecendo uma interface amigável para criar, atualizar e excluir eventos. Este projeto foi desenvolvido utilizando HTML, CSS e JavaScript no frontend, e Laravel no backend.

Referência da API e implantação do projeto
Para detalhes sobre a API e informações de implantação do projeto, consulte a documentação completa em Weeef Events API Documentation.

Início rápido
Para começar a usar a aplicação localmente, siga estas instruções:

Pré-requisitos:
Certifique-se de ter o Docker instalado e configurado em seu ambiente de desenvolvimento.

Instalação
Clone o repositório do projeto

cd task_weef

Construa e execute o contêiner Docker:

docker-compose up 

Isso irá configurar e iniciar o ambiente de desenvolvimento, incluindo o servidor nginx e o banco de dados.

Executar as migrations:
Após a criação dos contêiners, acesse: http://localhost:8000/api/v1/migrate, você deverá ver a mensagem: "Migrações executadas com sucesso!".

Acesse a aplicação em seu navegador:

Acesse: http://localhost:8080/index.html para visualizar a aplicação.
