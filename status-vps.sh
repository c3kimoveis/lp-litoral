#!/bin/bash

# ==========================================
# Script de Status/Monitoramento - VERSÃO FINAL
# LP Carneiros V2.1
# ==========================================

# Carregar variáveis de ambiente
if [ -f ".env" ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

PROJECT_NAME="lp-carneiros"
CURRENT_LINK="/app/carneiros.c3kimoveis.com.br"
BUILD_PATH="/app/builds/lp-carneiros-v${REACT_PROJECT_VERSION:-2.2}"

echo "📊 Status $PROJECT_NAME"
echo "=================================="

# Informações básicas
echo "🌐 Domínio: carneiros.c3kimoveis.com.br"
echo "🖥️  IP: 145.223.29.235"
echo "📂 Projeto: $PROJECT_NAME"
echo ""

# Versão atual
if [ -L "$CURRENT_LINK" ]; then
    CURRENT_VERSION=$(readlink $CURRENT_LINK | xargs basename)
    echo "📂 Versão atual: $CURRENT_VERSION"
    echo "📍 Path: $(readlink $CURRENT_LINK)"
else
    echo "❌ Link simbólico 'current' não encontrado!"
fi

echo ""

# Status do Nginx
echo "🌐 Status Nginx:"
if systemctl is-active --quiet nginx; then
    echo "   ✅ Nginx está rodando"
else
    echo "   ❌ Nginx não está rodando"
fi

# Teste de conectividade
echo ""
echo "🔍 Teste de conectividade:"

# Teste local
LOCAL_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/ 2>/dev/null)
if [ "$LOCAL_STATUS" = "200" ]; then
    echo "   ✅ Local (localhost): OK"
else
    echo "   ❌ Local (localhost): Falha ($LOCAL_STATUS)"
fi

# Teste por domínio
DOMAIN_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://carneiros.c3kimoveis.com.br/ 2>/dev/null)
if [ "$DOMAIN_STATUS" = "200" ]; then
    echo "   ✅ Domínio: OK"
else
    echo "   ❌ Domínio: Falha ($DOMAIN_STATUS)"
fi

# Teste por IP
IP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://145.223.29.235/ 2>/dev/null)
if [ "$IP_STATUS" = "200" ]; then
    echo "   ✅ IP: OK"
else
    echo "   ❌ IP: Falha ($IP_STATUS)"
fi

echo ""

# Versões disponíveis
echo "📚 Versões disponíveis:"
if [ -d "$BASE_PATH" ]; then
    cd "$BASE_PATH"
    ls -lt v* 2>/dev/null | head -10 || echo "   Nenhuma versão encontrada"
else
    echo "   ❌ Diretório base não encontrado"
fi

echo ""

# Uso de espaço
echo "💾 Uso de espaço:"
du -sh "$BASE_PATH" 2>/dev/null || echo "   ❌ Não foi possível verificar uso de espaço"

echo ""

# Logs recentes
echo "📋 Logs recentes (últimas 5 linhas):"
if [ -f "/var/log/nginx/lp-carneiros-access.log" ]; then
    echo "   📥 Access log:"
    tail -5 /var/log/nginx/lp-carneiros-access.log | sed 's/^/      /'
else
    echo "   ❌ Log de acesso não encontrado"
fi

if [ -f "/var/log/nginx/lp-carneiros-error.log" ]; then
    echo "   🚨 Error log:"
    tail -5 /var/log/nginx/lp-carneiros-error.log | sed 's/^/      /' 2>/dev/null || echo "      (vazio)"
else
    echo "   ❌ Log de erro não encontrado"
fi

echo ""
echo "🛠️  Comandos úteis:"
echo "   Deploy: ./deploy-vps.sh"
echo "   Rollback: ./rollback-vps.sh"
echo "   Status: ./status-vps.sh"
echo "   Logs: tail -f /var/log/nginx/lp-carneiros-*.log"