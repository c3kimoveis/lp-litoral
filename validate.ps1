#!/usr/bin/env pwsh
# ==========================================
# Script de Validação Pré-Deploy
# LP Carneiros V2
# ==========================================

Write-Host "`n🔍 VALIDAÇÃO PRÉ-DEPLOY - LP CARNEIROS V2`n" -ForegroundColor Cyan

$errors = 0
$warnings = 0

# Função auxiliar
function Test-FileExists {
    param([string]$path, [string]$name)
    if (Test-Path $path) {
        Write-Host "✅ $name encontrado" -ForegroundColor Green
        return $true
    } else {
        Write-Host "❌ $name NÃO encontrado: $path" -ForegroundColor Red
        $script:errors++
        return $false
    }
}

function Test-FileContent {
    param([string]$path, [string]$pattern, [string]$name)
    if (Test-Path $path) {
        $content = Get-Content $path -Raw
        if ($content -match $pattern) {
            Write-Host "✅ $name configurado corretamente" -ForegroundColor Green
            return $true
        } else {
            Write-Host "⚠️  $name pode precisar de ajuste" -ForegroundColor Yellow
            $script:warnings++
            return $false
        }
    }
    return $false
}

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "1. VERIFICANDO ARQUIVOS ESSENCIAIS" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray

Test-FileExists "docker-compose.yml" "docker-compose.yml"
Test-FileExists "docker-compose.prod.yml" "docker-compose.prod.yml"
Test-FileExists ".env" ".env"
Test-FileExists "src\react\Dockerfile" "Dockerfile"
Test-FileExists "src\react\Dockerfile.dev" "Dockerfile.dev"
Test-FileExists "src\react\Dockerfile.prod" "Dockerfile.prod"
Test-FileExists "src\react\nginx.conf" "nginx.conf"
Test-FileExists "src\react\.dockerignore" ".dockerignore"
Test-FileExists "src\react\projeto\package.json" "package.json"
Test-FileExists "src\react\projeto\vite.config.ts" "vite.config.ts"
Test-FileExists "src\react\projeto\.env" ".env (Vite)"

Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "2. VERIFICANDO CONFIGURAÇÕES" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray

# Verificar .env
if (Test-Path ".env") {
    $env_content = Get-Content ".env" -Raw
    
    if ($env_content -match "REACT_PROJECT_NAME") {
        Write-Host "✅ REACT_PROJECT_NAME definido" -ForegroundColor Green
    } else {
        Write-Host "❌ REACT_PROJECT_NAME não encontrado em .env" -ForegroundColor Red
        $errors++
    }
    
    if ($env_content -match "REACT_HOST_PORT") {
        Write-Host "✅ REACT_HOST_PORT definido" -ForegroundColor Green
    } else {
        Write-Host "⚠️  REACT_HOST_PORT não encontrado em .env" -ForegroundColor Yellow
        $warnings++
    }
}

# Verificar vite.config.ts
if (Test-Path "src\react\projeto\vite.config.ts") {
    $vite_config = Get-Content "src\react\projeto\vite.config.ts" -Raw
    
    if ($vite_config -match "host.*0\.0\.0\.0") {
        Write-Host "✅ Vite host configurado para Docker (0.0.0.0)" -ForegroundColor Green
    } else {
        Write-Host "❌ Vite host NÃO configurado corretamente" -ForegroundColor Red
        $errors++
    }
    
    if ($vite_config -match "usePolling.*true") {
        Write-Host "✅ Vite usePolling habilitado (hot-reload)" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Vite usePolling não habilitado (hot-reload pode não funcionar)" -ForegroundColor Yellow
        $warnings++
    }
}

# Verificar nginx.conf
if (Test-Path "src\react\nginx.conf") {
    $nginx_config = Get-Content "src\react\nginx.conf" -Raw
    
    if ($nginx_config -match "gzip on") {
        Write-Host "✅ Nginx Gzip habilitado" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Nginx Gzip não encontrado" -ForegroundColor Yellow
        $warnings++
    }
    
    if ($nginx_config -match "try_files.*index\.html") {
        Write-Host "✅ Nginx SPA routing configurado" -ForegroundColor Green
    } else {
        Write-Host "❌ Nginx SPA routing NÃO configurado" -ForegroundColor Red
        $errors++
    }
}

Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "3. VERIFICANDO DOCKER" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray

# Verificar Docker instalado
$dockerInstalled = $null -ne (Get-Command docker -ErrorAction SilentlyContinue)
if ($dockerInstalled) {
    Write-Host "✅ Docker instalado" -ForegroundColor Green
    
    # Verificar se Docker está rodando
    try {
        docker ps | Out-Null
        Write-Host "✅ Docker rodando" -ForegroundColor Green
    } catch {
        Write-Host "❌ Docker NÃO está rodando" -ForegroundColor Red
        $errors++
    }
    
    # Verificar versão
    $dockerVersion = docker --version
    Write-Host "ℹ️  $dockerVersion" -ForegroundColor Cyan
} else {
    Write-Host "❌ Docker NÃO instalado" -ForegroundColor Red
    $errors++
}

# Verificar Docker Compose
$composeInstalled = $null -ne (Get-Command docker-compose -ErrorAction SilentlyContinue)
if ($composeInstalled) {
    Write-Host "✅ Docker Compose instalado" -ForegroundColor Green
    $composeVersion = docker-compose --version
    Write-Host "ℹ️  $composeVersion" -ForegroundColor Cyan
} else {
    # Tentar docker compose (V2)
    try {
        docker compose version | Out-Null
        Write-Host "✅ Docker Compose V2 instalado" -ForegroundColor Green
        $composeVersion = docker compose version
        Write-Host "ℹ️  $composeVersion" -ForegroundColor Cyan
    } catch {
        Write-Host "❌ Docker Compose NÃO instalado" -ForegroundColor Red
        $errors++
    }
}

Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "4. VERIFICANDO PORTAS" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray

$ports = @(5173, 80)
foreach ($port in $ports) {
    $portInUse = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($portInUse) {
        Write-Host "⚠️  Porta $port em uso" -ForegroundColor Yellow
        $warnings++
    } else {
        Write-Host "✅ Porta $port disponível" -ForegroundColor Green
    }
}

Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "5. VERIFICANDO DOCUMENTAÇÃO" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray

$docs = @(
    "README.md",
    "INDEX.md",
    "DOCKER_GUIDE.md",
    "SUMMARY.md",
    "EXAMPLES.md",
    "QUICK_REFERENCE.md",
    "DEPLOY_CHECKLIST.md",
    "ARCHITECTURE.md"
)

foreach ($doc in $docs) {
    Test-FileExists $doc $doc | Out-Null
}

Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "6. TESTES RECOMENDADOS" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray

Write-Host "
Recomendações de testes antes do deploy:

1. Build local (sem Docker):
   cd src\react\projeto
   npm install
   npm run build

2. Lint:
   npm run lint

3. Build Docker desenvolvimento:
   docker-compose build

4. Build Docker produção:
   docker-compose -f docker-compose.prod.yml build

5. Teste manual:
   docker-compose up -d
   # Acessar http://localhost:5173
   docker-compose down
" -ForegroundColor Cyan

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "RESULTADO DA VALIDAÇÃO" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray

Write-Host "`n📊 Estatísticas:" -ForegroundColor Cyan
Write-Host "   Erros: $errors" -ForegroundColor $(if ($errors -eq 0) { "Green" } else { "Red" })
Write-Host "   Avisos: $warnings" -ForegroundColor $(if ($warnings -eq 0) { "Green" } else { "Yellow" })

if ($errors -eq 0 -and $warnings -eq 0) {
    Write-Host "`n✅ VALIDAÇÃO PASSOU! Projeto pronto para deploy." -ForegroundColor Green
    exit 0
} elseif ($errors -eq 0) {
    Write-Host "`n⚠️  VALIDAÇÃO PASSOU COM AVISOS. Revise os avisos acima." -ForegroundColor Yellow
    exit 0
} else {
    Write-Host "`n❌ VALIDAÇÃO FALHOU! Corrija os erros antes de fazer deploy." -ForegroundColor Red
    exit 1
}
