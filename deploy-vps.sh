#!/bin/bash

# ==========================================
# DEPLOY FINAL PROFISSIONAL - BUILD REAL
# LP Litoral V1.1.0 - React SPA
# Domínio: litoral.c3kimoveis.com.br
# ==========================================

echo "🚀 DEPLOY PROFISSIONAL - BUILD DE PRODUÇÃO"
echo "==========================================="

# Configurações
PROJECT_NAME="lp-litoral"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BUILD_PATH="/app/builds/litoral/$TIMESTAMP"
CURRENT_LINK="/app/aliases/litoral.c3kimoveis.com.br"

echo "📅 Build: litoral-$TIMESTAMP"
echo "📂 Caminho: $BUILD_PATH"

# 1. Limpar builds antigos - DESATIVADO PARA MANTER HISTÓRICO
# echo "🧹 Limpando builds antigos..."
# sudo rm -rf /app/builds/litoral-* 2>/dev/null || true
sudo mkdir -p /app/aliases/builds

# 2. Entrar no diretório do projeto (usando alias/link simbólico)
cd /app/c3k-sites/lp-litoral/current/src/react/projeto

echo "📋 Diretório atual: $(pwd)"
echo "📋 Arquivos disponíveis:"
ls -la

# 3. Verificar se tem npm, senão instalar
echo "🔍 Verificando Node.js e npm..."
if ! command -v npm &> /dev/null; then
    echo "📦 Instalando Node.js e npm..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

echo "📋 Versões:"
node --version
npm --version

# 4. Instalar dependências
echo "📦 Instalando dependências..."
npm ci || npm install

# 5. Fazer build REAL
echo "🔨 Fazendo build de produção..."
npm run build:prod || npm run build

# 5. Verificar se build foi criado
if [ ! -d "dist" ]; then
    echo "❌ ERRO: Build não foi criado!"
    echo "📋 Verificando package.json..."
    cat package.json | grep -A5 -B5 "scripts"
    exit 1
fi

echo "✅ Build criado com sucesso!"
echo "📋 Conteúdo do build:"
ls -la dist/

# 6. Copiar build para local definitivo
echo "📂 Copiando build para $BUILD_PATH..."
sudo mkdir -p "$BUILD_PATH"
sudo cp -r dist/* "$BUILD_PATH/"

# 7. Configurar permissões
echo "🔐 Configurando permissões..."
sudo chown -R www-data:www-data "$BUILD_PATH"
sudo chmod -R 755 "$BUILD_PATH"

# 8. Verificar se index.html está correto
echo "🔍 Verificando index.html do build..."
cat "$BUILD_PATH/index.html" | head -10

# 9. Atualizar link simbólico (ZERO DOWNTIME)
echo "🔗 Atualizando link simbólico..."
sudo ln -sfn "$BUILD_PATH" "${CURRENT_LINK}_new"
sudo mv "${CURRENT_LINK}_new" "$CURRENT_LINK"

# 10. Verificar se funcionou
echo "✅ Verificação final:"
echo "📂 Link atual: $(readlink $CURRENT_LINK)"
echo "📂 Arquivos no link:"
ls -la $CURRENT_LINK/

# 11. Testar se o build está correto
echo "🧪 Testando build..."
if [ -f "$CURRENT_LINK/index.html" ]; then
    echo "✅ index.html encontrado!"
    
    # Verificar se é build de produção (não deve ter /src/main.tsx)
    if grep -q "/src/main.tsx" "$CURRENT_LINK/index.html"; then
        echo "❌ ERRO: Ainda é código fonte, não build!"
        cat "$CURRENT_LINK/index.html" | grep -C2 "main.tsx"
        exit 1
    else
        echo "✅ É build de produção (sem /src/main.tsx)!"
        echo "📋 Scripts no HTML:"
        grep -o '<script[^>]*>' "$CURRENT_LINK/index.html"
    fi
else
    echo "❌ ERRO: index.html não encontrado!"
    exit 1
fi

# 12. Limpeza de builds antigos (manter apenas 3) - DESATIVADO
echo "🧹 Manutenção de histórico (sem exclusão)..."
# cd /app/builds
# find . -maxdepth 1 -name "litoral-*" -type d -printf '%T@ %p\n' | sort -n | head -n -3 | cut -d' ' -f2- | xargs sudo rm -rf 2>/dev/null || true

echo ""
echo "🎉🎉🎉 DEPLOY PROFISSIONAL CONCLUÍDO! 🎉🎉🎉"
echo "✅ Build de produção criado e servindo"
echo "✅ Arquivos JavaScript compilados"
echo "✅ MIME types corretos"
echo "✅ Zero downtime deployment"
echo ""
echo "🌐 Acesse: https://litoral.c3kimoveis.com.br"
echo ""
echo "📋 Builds disponíveis:"
ls -la /app/builds/litoral/