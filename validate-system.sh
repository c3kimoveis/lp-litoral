#!/bin/bash

echo "🔍 VALIDAÇÃO FINAL DO SISTEMA"
echo "============================="

# Carregar .env
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
    echo "✅ Variáveis do .env carregadas"
    echo "📋 REACT_PROJECT_VERSION: $REACT_PROJECT_VERSION"
else
    echo "⚠️ Arquivo .env não encontrado"
    REACT_PROJECT_VERSION="2.2"
fi

CURRENT_LINK="/app/carneiros.c3kimoveis.com.br"
EXPECTED_BUILD="/app/builds/lp-carneiros-v${REACT_PROJECT_VERSION}"

echo ""
echo "🎯 VERIFICAÇÕES:"
echo "=================="

# 1. Verificar se link existe
if [ -L "$CURRENT_LINK" ]; then
    TARGET=$(readlink "$CURRENT_LINK")
    echo "✅ Link simbólico existe: $CURRENT_LINK -> $TARGET"
    
    # Verificar se aponta para o local correto
    if [ "$TARGET" = "$EXPECTED_BUILD" ]; then
        echo "✅ Link aponta para o local correto!"
    else
        echo "❌ Link aponta para local INCORRETO!"
        echo "   Esperado: $EXPECTED_BUILD"
        echo "   Atual: $TARGET"
    fi
else
    echo "❌ Link simbólico não existe!"
fi

# 2. Verificar build
if [ -d "$EXPECTED_BUILD" ]; then
    echo "✅ Diretório de build existe: $EXPECTED_BUILD"
    
    if [ -f "$EXPECTED_BUILD/index.html" ]; then
        echo "✅ index.html encontrado"
        
        # Verificar se é build de produção
        if grep -q "/src/main.tsx" "$EXPECTED_BUILD/index.html"; then
            echo "❌ ERRO: index.html contém /src/main.tsx (não é build de produção)"
        else
            echo "✅ É build de produção (sem /src/main.tsx)"
        fi
    else
        echo "❌ index.html não encontrado no build"
    fi
else
    echo "❌ Diretório de build não existe: $EXPECTED_BUILD"
fi

# 3. Verificar se site está acessível (teste simples)
if [ -f "$CURRENT_LINK/index.html" ]; then
    echo "✅ Site está servindo corretamente"
else
    echo "❌ Site não está acessível"
fi

echo ""
echo "🌐 URL para teste: https://carneiros.c3kimoveis.com.br"
echo ""
echo "📋 Para fazer novo deploy: ./deploy-docker.sh"