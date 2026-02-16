#!/bin/bash

# Carrega as variáveis de ambiente do arquivo .env
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Verifica se REACT_PROJECT_NAME está definido
if [ -z "$REACT_PROJECT_NAME" ]; then
  echo "Erro: REACT_PROJECT_NAME não está definido no arquivo .env"
  exit 1
fi

# Verifica se o diretório do projeto já existe
if [ ! -d "$REACT_PROJECT_NAME" ]; then
  echo "Criando novo projeto Vite: $REACT_PROJECT_NAME"
  npm install -g create-vite
  create-vite "$REACT_PROJECT_NAME" --template react-ts
  cd "$REACT_PROJECT_NAME"
  npm install
  # Modifica o package.json para adicionar --host ao script dev
  sed -i 's/"dev": "vite"/"dev": "vite --host"/' package.json
else
  echo "Projeto $REACT_PROJECT_NAME já existe, entrando no diretório"
  cd "$REACT_PROJECT_NAME"
  # Instala dependências caso node_modules não esteja presente
  [ ! -d "node_modules" ] && npm install
fi

# Executa o comando passado (npm run dev)
exec "$@"