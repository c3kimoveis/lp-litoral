# ==========================================
# Script de Gerenciamento Docker
# LP Carneiros V2
# ==========================================

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet('dev', 'prod', 'build', 'stop', 'restart', 'logs', 'clean', 'help')]
    [string]$Action = 'help'
)

$ProjectName = "lp-carneiros-v3.0.2"

function Show-Help {
    Write-Host "`n🚀 LP Carneiros V2 - Docker Manager`n" -ForegroundColor Cyan
    Write-Host "Uso: .\docker-manager.ps1 [action]`n"
    Write-Host "Actions disponíveis:" -ForegroundColor Yellow
    Write-Host "  dev      - Inicia ambiente de desenvolvimento" -ForegroundColor Green
    Write-Host "  prod     - Inicia ambiente de produção" -ForegroundColor Green
    Write-Host "  build    - Rebuild completo" -ForegroundColor Green
    Write-Host "  stop     - Para todos os containers" -ForegroundColor Green
    Write-Host "  restart  - Reinicia containers" -ForegroundColor Green
    Write-Host "  logs     - Mostra logs em tempo real" -ForegroundColor Green
    Write-Host "  clean    - Limpeza completa (imagens, volumes, etc)" -ForegroundColor Green
    Write-Host "  help     - Mostra esta ajuda`n" -ForegroundColor Green
    
    Write-Host "Exemplos:" -ForegroundColor Yellow
    Write-Host "  .\docker-manager.ps1 dev      # Inicia desenvolvimento"
    Write-Host "  .\docker-manager.ps1 prod     # Deploy produção"
    Write-Host "  .\docker-manager.ps1 logs     # Ver logs`n"
}

function Start-Dev {
    Write-Host "`n🔧 Iniciando ambiente de DESENVOLVIMENTO...`n" -ForegroundColor Cyan
    docker-compose up -d
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Ambiente iniciado com sucesso!" -ForegroundColor Green
        Write-Host "🌐 Acesse: http://localhost:5173`n" -ForegroundColor Yellow
        Write-Host "📝 Para ver logs: .\docker-manager.ps1 logs`n" -ForegroundColor Gray
    } else {
        Write-Host "`n❌ Erro ao iniciar ambiente" -ForegroundColor Red
    }
}

function Start-Prod {
    Write-Host "`n🚀 Iniciando ambiente de PRODUÇÃO...`n" -ForegroundColor Cyan
    docker-compose -f docker-compose.prod.yml up -d --build
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Produção iniciada com sucesso!" -ForegroundColor Green
        Write-Host "🌐 Acesse: http://localhost`n" -ForegroundColor Yellow
        Write-Host "📝 Para ver logs: .\docker-manager.ps1 logs prod`n" -ForegroundColor Gray
    } else {
        Write-Host "`n❌ Erro ao iniciar produção" -ForegroundColor Red
    }
}

function Build-Containers {
    Write-Host "`n🔨 Rebuild completo dos containers...`n" -ForegroundColor Cyan
    Write-Host "Qual ambiente?" -ForegroundColor Yellow
    Write-Host "1 - Desenvolvimento"
    Write-Host "2 - Produção"
    $choice = Read-Host "Escolha (1 ou 2)"
    
    if ($choice -eq "1") {
        docker-compose build --no-cache
        docker-compose up -d
    } elseif ($choice -eq "2") {
        docker-compose -f docker-compose.prod.yml build --no-cache
        docker-compose -f docker-compose.prod.yml up -d
    } else {
        Write-Host "Opção inválida!" -ForegroundColor Red
        return
    }
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Build concluído!" -ForegroundColor Green
    }
}

function Stop-Containers {
    Write-Host "`n🛑 Parando containers...`n" -ForegroundColor Cyan
    docker-compose down
    docker-compose -f docker-compose.prod.yml down
    Write-Host "`n✅ Containers parados!" -ForegroundColor Green
}

function Restart-Containers {
    Write-Host "`n🔄 Reiniciando containers...`n" -ForegroundColor Cyan
    docker-compose restart
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Containers reiniciados!" -ForegroundColor Green
    }
}

function Show-Logs {
    Write-Host "`n📋 Mostrando logs...`n" -ForegroundColor Cyan
    Write-Host "Qual ambiente?" -ForegroundColor Yellow
    Write-Host "1 - Desenvolvimento"
    Write-Host "2 - Produção"
    $choice = Read-Host "Escolha (1 ou 2)"
    
    if ($choice -eq "1") {
        docker-compose logs -f react
    } elseif ($choice -eq "2") {
        docker-compose -f docker-compose.prod.yml logs -f react-prod
    } else {
        Write-Host "Opção inválida!" -ForegroundColor Red
    }
}

function Clean-Docker {
    Write-Host "`n🧹 Limpeza do Docker`n" -ForegroundColor Cyan
    Write-Host "⚠️  ATENÇÃO: Isso vai remover:" -ForegroundColor Yellow
    Write-Host "  - Containers parados"
    Write-Host "  - Imagens não utilizadas"
    Write-Host "  - Volumes não utilizados"
    Write-Host "  - Networks não utilizadas"
    
    $confirm = Read-Host "`nTem certeza? (s/n)"
    
    if ($confirm -eq "s") {
        Write-Host "`nParando containers do projeto..." -ForegroundColor Gray
        docker-compose down -v
        docker-compose -f docker-compose.prod.yml down -v
        
        Write-Host "Removendo imagens..." -ForegroundColor Gray
        docker image prune -a -f
        
        Write-Host "Removendo volumes..." -ForegroundColor Gray
        docker volume prune -f
        
        Write-Host "Removendo networks..." -ForegroundColor Gray
        docker network prune -f
        
        Write-Host "`n✅ Limpeza concluída!" -ForegroundColor Green
        docker system df
    } else {
        Write-Host "`nOperação cancelada." -ForegroundColor Yellow
    }
}

# Executar ação
switch ($Action) {
    'dev'     { Start-Dev }
    'prod'    { Start-Prod }
    'build'   { Build-Containers }
    'stop'    { Stop-Containers }
    'restart' { Restart-Containers }
    'logs'    { Show-Logs }
    'clean'   { Clean-Docker }
    'help'    { Show-Help }
    default   { Show-Help }
}
