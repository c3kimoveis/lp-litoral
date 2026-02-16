import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { LeadForm } from "@/components/LeadForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  faUmbrellaBeach,
  faChartLine,
  faUsers,
  faMapMarkedAlt,
  faStar,
  faBuilding,
  faCoins,
  faPercentage,
  faCalendarAlt,
  faShieldAlt,
  faCheckCircle,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { HeroCarousel } from "@/components/HeroCarousel";

import beach68 from "@/assets/beach-68.webp";
import beach6b from "@/assets/beach-6b.webp";
import muro_alto from "@/assets/praia-do-muro-alto.webp";
import porto_de_galinhas from "@/assets/porto-de-galinhas-ipojuca.webp";
import beachFb from "@/assets/beach-fb.webp";
import beach51 from "@/assets/beach-51.webp";
import beach76 from "@/assets/beach-76.webp";
import costaAzulFachada from "@/assets/costa-azul-fachada.webp";
import costaAzulPiscina from "@/assets/costa-azul-piscina.webp";
import costaAzulAcademia from "@/assets/costa-azul-academia.webp";
import costaAzulKids from "@/assets/costa-azul-kids.webp";
import costaAzulBeach from "@/assets/costa-azul-beach.webp";
import costaAzulPlayground from "@/assets/costa-azul-playground.webp";
import costaAzulBeachLounge from "@/assets/costa-azul-beach-lounge.webp";
import costaAzulKidsArea from "@/assets/costa-azul-kids-area.webp";
import costaAzulPasseio from "@/assets/costa-azul-passeio.webp";
import costaAzulRooftop from "@/assets/costa-azul-rooftop.webp";
import costaCoqueirosFachada from "@/assets/costa-coqueiros-fachada.webp";
import costaCoqueirosPoolLounge from "@/assets/costa-coqueiros-pool-lounge.webp";
import costaCoqueirosPiscinaKids from "@/assets/costa-coqueiros-piscina-kids.webp";
import costaCoqueirosPlayground from "@/assets/costa-coqueiros-playground.webp";
import costaCoqueirosRedario from "@/assets/costa-coqueiros-redario.webp";
import costaCoqueirosAcademia from "@/assets/costa-coqueiros-academia.webp";
import costaCoqueirosAquaDrinks from "@/assets/costa-coqueiros-aqua-drinks.webp";
import costaCoqueirosAquaLounge from "@/assets/costa-coqueiros-aqua-lounge.webp";
import costaCoqueirosEspacoKids from "@/assets/costa-coqueiros-espaco-kids.webp";
import costaCoqueirosEspacoTeens from "@/assets/costa-coqueiros-espaco-teens.webp";
import beachFinalCta from "@/assets/acqua_ventura_carneiros.webp";
import kora01 from "@/assets/kora-01.webp";
import kora02 from "@/assets/kora-02.webp";
import kora03 from "@/assets/kora-03.webp";
import kora04 from "@/assets/kora-04.webp";
import kora05 from "@/assets/kora-05.webp";
import orlaFachadaBeachClub from "@/assets/orla-fachada-beach-club.webp";
import orlaFachadaTorre from "@/assets/orla-fachada-torre.webp";
import orlaPiscinaBeachClub from "@/assets/orla-piscina-beach-club.webp";
import orlaPoolLounge from "@/assets/orla-pool-lounge.webp";
import orlaBeachClub from "@/assets/orla-beach-club.webp";
import orlaLoungeGourmet from "@/assets/orla-lounge-gourmet.webp";
import boulevardFachada01 from "@/assets/boulevard-fachada-01.webp";
import boulevardFachada02 from "@/assets/boulevard-fachada-02.webp";
import boulevardPiscina from "@/assets/boulevard-piscina.webp";
import boulevardPoolLounge from "@/assets/boulevard-pool-lounge.webp";
import boulevardPasseio from "@/assets/boulevard-passeio.webp";

import boulevardRooftop from "@/assets/boulevard-rooftop.webp";

import pillBoulevard from "@/assets/valorizacoes/pill_boulevard.webp";
import pillCais from "@/assets/valorizacoes/pill_cais.webp";
import pillCostaAzul from "@/assets/valorizacoes/pill_costa_azul.webp";
import pillCostaDoMar from "@/assets/valorizacoes/pill_costa_do_mar.webp";
import pillCostaDosCoqueiros from "@/assets/valorizacoes/pill_costa_dos_coqueiros.webp";
import pillHabita from "@/assets/valorizacoes/pill_habita.webp";
import pillNature from "@/assets/valorizacoes/pill_nature.webp";
import pillNomar from "@/assets/valorizacoes/pill_nomar.webp";
import pillOrla from "@/assets/valorizacoes/pill_orla.webp";
import pillTropi from "@/assets/valorizacoes/pill_tropi.webp";

const koraImages = [
  { src: kora01, alt: "KÓRA Home Resort - Vista Geral" },
  { src: kora02, alt: "KÓRA Home Resort - Fachada" },
  { src: kora03, alt: "KÓRA Home Resort - Área de Lazer" },
  { src: kora04, alt: "KÓRA Home Resort - Piscinas" },
  { src: kora05, alt: "KÓRA Home Resort - Paisagismo" },
];

const costaCoqueirosImages = [
  { src: costaCoqueirosFachada, alt: "Costa dos Coqueiros - Fachada" },
  { src: costaCoqueirosPoolLounge, alt: "Costa dos Coqueiros - Pool Lounge" },
  { src: costaCoqueirosPiscinaKids, alt: "Costa dos Coqueiros - Piscina Kids" },
  { src: costaCoqueirosPlayground, alt: "Costa dos Coqueiros - Playground" },
  { src: costaCoqueirosRedario, alt: "Costa dos Coqueiros - Redário" },
  { src: costaCoqueirosAcademia, alt: "Costa dos Coqueiros - Academia" },
  { src: costaCoqueirosAquaDrinks, alt: "Costa dos Coqueiros - Aqua Drinks" },
  { src: costaCoqueirosAquaLounge, alt: "Costa dos Coqueiros - Aqua Lounge" },
  { src: costaCoqueirosEspacoKids, alt: "Costa dos Coqueiros - Espaço Kids" },
  { src: costaCoqueirosEspacoTeens, alt: "Costa dos Coqueiros - Espaço Teens" },
];

const costaAzulImages = [
  { src: costaAzulFachada, alt: "Costa Azul - Fachada" },
  { src: costaAzulPiscina, alt: "Costa Azul - Piscina" },
  { src: costaAzulKids, alt: "Costa Azul - Espaço Kids" },
  { src: costaAzulBeach, alt: "Costa Azul - Beach" },
  { src: costaAzulPlayground, alt: "Costa Azul - Playground" },
  { src: costaAzulBeachLounge, alt: "Costa Azul - Beach Lounge" },
  { src: costaAzulKidsArea, alt: "Costa Azul - Área Kids" },
  { src: costaAzulPasseio, alt: "Costa Azul - Passeio do Mar" },
  { src: costaAzulRooftop, alt: "Costa Azul - Rooftop" },
  { src: costaAzulAcademia, alt: "Costa Azul - Academia" },
];

const orlaImages = [
  { src: orlaFachadaBeachClub, alt: "Orla - Fachada Beach Club" },
  { src: orlaFachadaTorre, alt: "Orla - Fachada Torre" },
  { src: orlaPiscinaBeachClub, alt: "Orla - Piscina Beach Club" },
  { src: orlaPoolLounge, alt: "Orla - Pool Lounge" },
  { src: orlaBeachClub, alt: "Orla - Beach Club" },
  { src: orlaLoungeGourmet, alt: "Orla - Lounge Gourmet" },
];

const boulevardImages = [
  { src: boulevardFachada01, alt: "Boulevard - Fachada 01" },
  { src: boulevardFachada02, alt: "Boulevard - Fachada 02" },
  { src: boulevardPiscina, alt: "Boulevard - Piscina" },
  { src: boulevardPoolLounge, alt: "Boulevard - Pool Lounge" },
  { src: boulevardPasseio, alt: "Boulevard - Passeio Boulevard" },
  { src: boulevardRooftop, alt: "Boulevard - Rooftop" },
];

const Index = () => {

  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<{ src: string; alt: string }[]>([]);
  const [modalTitle, setModalTitle] = useState("");

  const openImageModal = (images: { src: string; alt: string }[], title: string) => {
    setModalImages(images);
    setModalTitle(title);
    setModalOpen(true);
  };

  const scrollToForm = (e?: React.MouseEvent) => {
    // Se for um evento de clique, previne o comportamento padrão se for um link
    if (e && e.currentTarget.tagName === 'A') e.preventDefault();

    // Função para detectar se está no mobile
    const isMobile = () => {
      // Verifica pela largura da tela
      if (window.innerWidth < 1024) return true;

      // Verifica se o formulário mobile está visível (display !== 'none')
      const mobileForm = document.querySelector("#lead_form_mobile") as HTMLElement;
      if (mobileForm) {
        const styles = window.getComputedStyle(mobileForm);
        return styles.display !== 'none';
      }

      return false;
    };

    // No mobile, prioriza o formulário mobile; no desktop, prioriza o final
    let targetElement = null;

    if (isMobile()) {
      // Mobile: tenta primeiro o formulário mobile, depois o final
      targetElement = document.querySelector("#lead_form_mobile") ||
        document.querySelector("#formulario-mobile") ||
        document.querySelector("#lead_form");
    } else {
      // Desktop: tenta primeiro o formulário final, depois o mobile (caso não exista)
      targetElement = document.querySelector("#lead_form") ||
        document.querySelector("#lead_form_mobile");
    }

    if (targetElement) {
      // Adiciona um pequeno delay para garantir que o layout esteja estável
      setTimeout(() => {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 50);
    } else {
      // Fallback final: tenta qualquer formulário
      const anyForm = document.querySelector("[id*='lead_form']") ||
        document.querySelector(".glass-effect-strong");
      if (anyForm) {
        anyForm.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }

  };

  const valorizacaoCards = [
    { id: 'costa-coqueiros', image: pillCostaDosCoqueiros, alt: 'Costa dos Coqueiros', vendido: '88%', valorizacao: '10%' },
    { id: 'nomar', image: pillNomar, alt: 'Nomar Carneiros Ecoliving', vendido: '99%', valorizacao: '51%' },
    { id: 'costa-azul', image: pillCostaAzul, alt: 'Costa Azul', vendido: '90%', valorizacao: '36%' },
    { id: 'costa-do-mar', image: pillCostaDoMar, alt: 'Costa do Mar', vendido: '93%', valorizacao: '35%' },
    { id: 'boulevard', image: pillBoulevard, alt: 'Boulevard Praia dos Carneiros', vendido: '92%', valorizacao: '31%' },
    { id: 'orla', image: pillOrla, alt: 'Orla Praia dos Carneiros', vendido: '86%', valorizacao: '26%' },
    // { id: 'cais', image: pillCais, alt: 'Cais', vendido: '0%', valorizacao: '0%' },
    // { id: 'habita', image: pillHabita, alt: 'Habita', vendido: '0%', valorizacao: '0%' },
    // { id: 'nature', image: pillNature, alt: 'Nature', vendido: '0%', valorizacao: '0%' },
    // { id: 'tropi', image: pillTropi, alt: 'Tropi', vendido: '0%', valorizacao: '0%' },
  ];
  return (
    <div className="min-h-screen">
      <Navbar />
      <WhatsAppButton />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      >
        <HeroCarousel className="absolute inset-0 z-0" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10 pointer-events-none">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center pointer-events-auto">
            <div className="text-white space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                🏝️ Conheça os <span className="text-primary">novos lançamentos</span> da DUE no litoral
              </h1>
              <p className="text-xl md:text-2xl opacity-90">
                💎 Um {" "}
                <span className="text-primary font-semibold">investimento inteligente</span> que une luxo, conforto e <span className="text-primary font-semibold">rentabilidade</span>. ✨
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-sm opacity-80 mb-1">A partir de</div>
                  <div className="text-3xl md:text-4xl font-bold text-primary">R$ 340 mil</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-sm opacity-80 mb-1">Somente</div>
                  <div className="text-3xl md:text-4xl font-bold text-primary">10% de entrada</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-sm opacity-80 mb-1">Opções de pagamento</div>
                  <div className="text-2xl md:text-3xl font-bold text-primary">Financiamento de até 90%</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-sm opacity-80 mb-1">Durante as obras</div>
                  <div className="text-2xl md:text-3xl font-bold text-primary">Sem correção do INCC</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <LeadForm
                showEmail={true}
                elementoOrigem="Formulário"
                variant="custom"
                className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/30 text-white shadow-luxury"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Form (below hero) */}
      <section className="lg:hidden py-12 bg-gradient-to-br from-blue-50 to-teal-50" id="lead_form_mobile">
        <div className="container mx-auto px-4 sm:px-6" id="formulario-mobile">
          <LeadForm showEmail={true} elementoOrigem="Formulário" />
        </div>
      </section>

      {/* Valorização Section */}
      <section id="valorizacao" className="py-16 md:py-24 bg-gradient-to-br from-background to-card">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
              Valorizações dos últimos empreendimentos <span className="text-primary">DUE</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Histórico comprovado de sucesso e rentabilidade
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {valorizacaoCards.map((card) => (
              <div key={card.id} className="bg-white rounded-2xl p-6 shadow-luxury hover:shadow-2xl transition-all hover:scale-105 duration-300">
                <div className="flex justify-center mb-6">
                  <img src={card.image} alt={card.alt} className="h-24 object-contain" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-2xl text-green-600" />
                      <span className="font-semibold text-muted-foreground">Vendido</span>
                    </div>
                    <span className="text-3xl font-bold text-green-600">{card.vendido}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon icon={faArrowTrendUp} className="text-2xl text-blue-600" />
                      <span className="font-semibold text-muted-foreground">Valorização</span>
                    </div>
                    <span className="text-3xl font-bold text-blue-600">{card.valorizacao}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section id="investimento" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
              Investimento Inteligente e Rentável
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Números que comprovam o potencial de retorno nas Praias do Litoral Sul de Pernambuco
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 text-center shadow-soft hover:shadow-luxury transition-shadow">
              <FontAwesomeIcon icon={faPercentage} className="text-5xl text-primary mb-4" />
              <div className="text-4xl font-bold text-foreground mb-2">10%+</div>
              <p className="text-muted-foreground font-medium">Valorização média anual</p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-soft hover:shadow-luxury transition-shadow">
              <FontAwesomeIcon icon={faChartLine} className="text-5xl text-cta mb-4" />
              <div className="text-4xl font-bold text-foreground mb-2">27%</div>
              <p className="text-muted-foreground font-medium">Rentabilidade anual em locação de temporada</p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-soft hover:shadow-luxury transition-shadow">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-5xl text-accent mb-4" />
              <div className="text-4xl font-bold text-foreground mb-2">56%</div>
              <p className="text-muted-foreground font-medium">Taxa média de ocupação anual</p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-soft hover:shadow-luxury transition-shadow">
              <FontAwesomeIcon icon={faCoins} className="text-5xl text-secondary mb-4" />
              <div className="text-4xl font-bold text-foreground mb-2">R$ 340k</div>
              <p className="text-muted-foreground font-medium">Preço inicial de investimento</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary to-accent rounded-3xl p-8 md:p-12 text-white shadow-luxury mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">Modelo DUE: Viva, Rentabilize e Valorize</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xl font-semibold mb-3">Benefícios do Sistema DUE:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">✓</span> Gestão 100% online da propriedade
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">✓</span> Atendimento 24h/7 dias ao hóspede
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">✓</span> Marketing ativo e precificação inteligente
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">✓</span> Serviços de manutenção e limpeza
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">✓</span> Seu imóvel nas maiores plataformas do mundo
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3">Facilidades de Pagamento:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">✓</span> Financiamento de até 90% pela Caixa Econômica
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">✓</span> Entrada de apenas 10%
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">✓</span> Sem correção de INCC na fase de obra
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">✓</span> Menores taxas de juros do mercado
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">✓</span> Seguro de quitação por morte ou invalidez
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <img
              src={beachFb}
              alt="Atividades aquáticas em Carneiros"
              className="rounded-2xl shadow-soft w-full h-[300px] object-cover"
            />
            <img
              src={beach51}
              alt="Vista panorâmica da praia"
              className="rounded-2xl shadow-soft w-full h-[300px] object-cover"
            />
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="gradient-cta text-white font-semibold text-lg px-8 py-6 hover:opacity-90 transition-opacity"
              onClick={scrollToForm}
            >
              <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
              Quero Saber Mais
            </Button>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section id="empreendimentos" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
              Empreendimentos <span className="text-primary">Exclusivos</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Conheça os lançamentos mais esperados das Praias do Litoral Sul de Pernambuco, projetados para máxima rentabilidade e
              conforto.
            </p>
          </div>

          {/* Properties Cards Carousel */}
          <div className="mb-16 max-w-7xl mx-auto">
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent className="-ml-4">
                {/* KÓRA Home Resort Card */}
                <CarouselItem className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-luxury hover:shadow-2xl transition-all h-full">
                    <div className="relative h-[300px] cursor-pointer" onClick={() => openImageModal(koraImages, "KÓRA Home Resort")}>
                      <Carousel className="w-full h-full">
                        <CarouselContent>
                          {koraImages.map((img, idx) => (
                            <CarouselItem key={idx}>
                              <img src={img.src} alt={img.alt} className="w-full h-[300px] object-cover" />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4" />
                        <CarouselNext className="right-4" />
                      </Carousel>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2 text-foreground">KÓRA Home Resort</h3>
                      <p className="text-muted-foreground mb-4 flex items-center">
                        <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2 text-primary" />
                        Praia dos Carneiros (PE)
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-border">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Área</p>
                          <p className="font-bold text-foreground">60m² - 219m²</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Tipologias</p>
                          <p className="font-bold text-foreground">2, 3 e 4 quartos</p>
                        </div>
                      </div>
                      <div className="mb-6">
                        <h4 className="font-bold text-foreground mb-3">Diferenciais</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start text-muted-foreground"><span className="text-primary mr-2">•</span><span>Frente-mar — um dos últimos terrenos disponíveis</span></li>
                          <li className="flex items-start text-muted-foreground"><span className="text-primary mr-2">•</span><span>11 hectares com 60% de área verde</span></li>
                          <li className="flex items-start text-muted-foreground"><span className="text-primary mr-2">•</span><span>75m entre torres — máxima privacidade</span></li>
                          <li className="flex items-start text-muted-foreground"><span className="text-primary mr-2">•</span><span>Complexo aquático e estrutura de resort</span></li>
                          <li className="flex items-start text-muted-foreground"><span className="text-primary mr-2">•</span><span>Encontro exclusivo de rio e mar</span></li>
                        </ul>
                      </div>
                      <Button size="lg" className="w-full gradient-cta text-white font-semibold hover:opacity-90 transition-opacity" onClick={scrollToForm}>
                        <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
                        Quero Saber Mais
                      </Button>
                    </div>
                  </div>
                </CarouselItem>

                {/* Costa dos Coqueiros Card */}
                <CarouselItem className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-luxury hover:shadow-2xl transition-all h-full">
                    <div className="relative h-[300px] cursor-pointer" onClick={() => openImageModal(costaCoqueirosImages, "Costa dos Coqueiros")}>
                      <Carousel className="w-full h-full">
                        <CarouselContent>
                          {costaCoqueirosImages.map((img, idx) => (
                            <CarouselItem key={idx}>
                              <img src={img.src} alt={img.alt} className="w-full h-[300px] object-cover" />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4" />
                        <CarouselNext className="right-4" />
                      </Carousel>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2 text-foreground">Costa dos Coqueiros</h3>
                      <p className="text-muted-foreground mb-4 flex items-center">
                        <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2 text-primary" />
                        Praia dos Carneiros
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-border">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Área</p>
                          <p className="font-bold text-foreground">25m² - 79m²</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Tipologias</p>
                          <p className="font-bold text-foreground">Studio e 2 quartos</p>
                        </div>
                      </div>
                      <div className="mb-6">
                        <h4 className="font-bold text-foreground mb-3">Diferenciais</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start text-muted-foreground"><span className="text-primary mr-2">•</span><span>Conceito moderno e inteligente</span></li>
                          <li className="flex items-start text-muted-foreground"><span className="text-primary mr-2">•</span><span>Valoriza encontros à beira-mar</span></li>
                          <li className="flex items-start text-muted-foreground"><span className="text-primary mr-2">•</span><span>Financiamento de até 90%</span></li>
                          <li className="flex items-start text-muted-foreground"><span className="text-primary mr-2">•</span><span>Entrada de apenas 10%</span></li>
                          <li className="flex items-start text-muted-foreground"><span className="text-primary mr-2">•</span><span>Gestão hoteleira profissional</span></li>
                        </ul>
                      </div>
                      <Button size="lg" className="w-full gradient-cta text-white font-semibold hover:opacity-90 transition-opacity" onClick={scrollToForm}>
                        <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
                        Quero Saber Mais
                      </Button>
                    </div>
                  </div>
                </CarouselItem>

                {/* Orla Praia dos Carneiros Card */}
                <CarouselItem className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-luxury hover:shadow-2xl transition-all h-full">
                    <div className="relative h-[300px] cursor-pointer" onClick={() => openImageModal(orlaImages, "Orla Praia dos Carneiros")}>
                      <Carousel className="w-full h-full">
                        <CarouselContent>
                          {orlaImages.map((img, idx) => (
                            <CarouselItem key={idx}>
                              <img src={img.src} alt={img.alt} className="w-full h-[300px] object-cover" />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4" />
                        <CarouselNext className="right-4" />
                      </Carousel>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2 text-foreground">Orla Praia dos Carneiros</h3>
                      <p className="text-muted-foreground mb-4 flex items-center">
                        <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2 text-primary" />
                        Praia dos Carneiros
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-border">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Conceito</p>
                          <p className="font-bold text-foreground">Frente-Mar Resort</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Tipologias</p>
                          <p className="font-bold text-foreground">2, 3 e 4 quartos</p>
                        </div>
                      </div>
                      <div className="mb-6">
                        <h4 className="font-bold text-foreground mb-3">Diferenciais</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start text-muted-foreground"><span className="text-primary mr-2">•</span><span>Piscina com borda infinita frente ao mar</span></li>
                          <li className="flex items-start text-muted-foreground"><span className="text-primary mr-2">•</span><span>Beach Club exclusivo integrado</span></li>
                          <li className="flex items-start text-muted-foreground"><span className="text-primary mr-2">•</span><span>SPA e academia com vista para o mar</span></li>
                          <li className="flex items-start text-muted-foreground"><span className="text-primary mr-2">•</span><span>Concierge 24h e Business Lounge</span></li>
                          <li className="flex items-start text-muted-foreground"><span className="text-primary mr-2">•</span><span>Pet Place e espaços kids/teens</span></li>
                        </ul>
                      </div>
                      <Button size="lg" className="w-full gradient-cta text-white font-semibold hover:opacity-90 transition-opacity" onClick={scrollToForm}>
                        <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
                        Quero Saber Mais
                      </Button>
                    </div>
                  </div>
                </CarouselItem>

                {/* Costa Azul Card */}
                <CarouselItem className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-luxury hover:shadow-2xl transition-all h-full">
                    <div className="relative h-[300px] cursor-pointer" onClick={() => openImageModal(costaAzulImages, "Costa Azul")}>
                      <Carousel className="w-full h-full">
                        <CarouselContent>
                          {costaAzulImages.map((img, idx) => (
                            <CarouselItem key={idx}>
                              <img src={img.src} alt={img.alt} className="w-full h-[300px] object-cover" />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4" />
                        <CarouselNext className="right-4" />
                      </Carousel>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2 text-foreground">Costa Azul</h3>
                      <p className="text-muted-foreground mb-4 flex items-center">
                        <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2 text-primary" />
                        Praia dos Carneiros
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-border">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Área</p>
                          <p className="font-bold text-foreground">24m² - 87m²</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Tipologias</p>
                          <p className="font-bold text-foreground">Studio, 2 e 3 quartos</p>
                        </div>
                      </div>
                      <div className="mb-6">
                        <h4 className="font-bold text-foreground mb-3">Diferenciais</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start text-muted-foreground"><span className="text-primary mr-2">•</span><span>+1.000m² de piscinas e acqua playkids</span></li>
                          <li className="flex items-start text-muted-foreground"><span className="text-primary mr-2">•</span><span>Gestão profissional Sintta Stay</span></li>
                          <li className="flex items-start text-muted-foreground"><span className="text-primary mr-2">•</span><span>Passeio do Mar com drinks bar na praia</span></li>
                          <li className="flex items-start text-muted-foreground"><span className="text-primary mr-2">•</span><span>Academia e espaço kids</span></li>
                          <li className="flex items-start text-muted-foreground"><span className="text-primary mr-2">•</span><span>Convention center</span></li>
                        </ul>
                      </div>
                      <Button size="lg" className="w-full gradient-cta text-white font-semibold hover:opacity-90 transition-opacity" onClick={scrollToForm}>
                        <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
                        Quero Saber Mais
                      </Button>
                    </div>
                  </div>
                </CarouselItem>

                {/* Boulevard Card */}
                <CarouselItem className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-luxury hover:shadow-2xl transition-all h-full">
                    <div className="relative h-[300px] cursor-pointer" onClick={() => openImageModal(boulevardImages, "Boulevard Carneiros")}>
                      <Carousel className="w-full h-full">
                        <CarouselContent>
                          {boulevardImages.map((img, idx) => (
                            <CarouselItem key={idx}>
                              <img src={img.src} alt={img.alt} className="w-full h-[300px] object-cover" />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4" />
                        <CarouselNext className="right-4" />
                      </Carousel>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2 text-foreground">Boulevard Carneiros</h3>
                      <p className="text-muted-foreground mb-4 flex items-center">
                        <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2 text-primary" />
                        Praia dos Carneiros (PE)
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-border">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Perfil</p>
                          <p className="font-bold text-foreground">Entrada Estratégica</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Estrutura</p>
                          <p className="font-bold text-foreground">4 Torres</p>
                        </div>
                      </div>
                      <div className="mb-6">
                        <h4 className="font-bold text-foreground mb-3">Diferenciais</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start text-muted-foreground"><span className="text-primary mr-2">•</span><span>Boulevard arborizado interno</span></li>
                          <li className="flex items-start text-muted-foreground"><span className="text-primary mr-2">•</span><span>Complexo aquático com pool lounge</span></li>
                          <li className="flex items-start text-muted-foreground"><span className="text-primary mr-2">•</span><span>Rooftop e academia equipada</span></li>
                          <li className="flex items-start text-muted-foreground"><span className="text-primary mr-2">•</span><span>Playground e espaço kids</span></li>
                          <li className="flex items-start text-muted-foreground"><span className="text-primary mr-2">•</span><span>Ideal para segunda residência e short stay</span></li>
                        </ul>
                      </div>
                      <Button size="lg" className="w-full gradient-cta text-white font-semibold hover:opacity-90 transition-opacity" onClick={scrollToForm}>
                        <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
                        Quero Saber Mais
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="-left-4 lg:-left-6 bg-white/90 hover:bg-white shadow-lg border-none" />
              <CarouselNext className="-right-4 lg:-right-6 bg-white/90 hover:bg-white shadow-lg border-none" />
            </Carousel>
          </div>

          {/* CTA Banner */}
          <div className="bg-gradient-to-r from-accent to-accent/80 text-white rounded-2xl p-8 md:p-12 text-center shadow-luxury max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Garanta as Melhores Unidades</h3>
            <p className="text-lg md:text-xl mb-6 opacity-90">
              Entre em contato agora e receba condições exclusivas de lançamento
            </p>
            <Button
              size="lg"
              className="gradient-cta text-white font-semibold text-lg px-8 py-6 hover:opacity-90 transition-opacity"
              onClick={scrollToForm}
            >
              <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
              Quero Saber Mais
            </Button>
          </div>
        </div>
      </section>

      {/* Tourism Section */}
      <section id="turismo" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
              Por Que as Praias do Litoral Sul?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              As praias mais bonitas do Brasil, com infraestrutura turística consolidada e alto potencial de
              valorização
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-luxury transition-shadow">
              <FontAwesomeIcon icon={faUmbrellaBeach} className="text-4xl text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Beleza Natural Incomparável</h3>
              <p className="text-muted-foreground">
                Areias claras e finas, mar calmo, águas mornas e piscinas naturais formadas pelos recifes de coral na maré
                baixa.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-luxury transition-shadow">
              <FontAwesomeIcon icon={faMapMarkedAlt} className="text-4xl text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Localização Estratégica</h3>
              <p className="text-muted-foreground">
                Próximas à capital Recife e com a construção do Aeroporto de Maragogi e duplicação da estrada,
                facilitando o acesso.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-luxury transition-shadow">
              <FontAwesomeIcon icon={faStar} className="text-4xl text-secondary mb-4" />
              <h3 className="text-xl font-bold mb-3">Destino Consolidado</h3>
              <p className="text-muted-foreground">
                Eleitas por anos consecutivos as praias mais bonitas do Brasil, com mihares de avaliações no
                TripAdvisor.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-luxury transition-shadow">
              <FontAwesomeIcon icon={faUsers} className="text-4xl text-accent mb-4" />
              <h3 className="text-xl font-bold mb-3">Alta Demanda Turística</h3>
              <p className="text-muted-foreground">
                Taxa de ocupação média superior a 70%, com forte procura durante todo o ano para locação de
                temporada.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-luxury transition-shadow">
              <FontAwesomeIcon icon={faBuilding} className="text-4xl text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Infraestrutura em Expansão</h3>
              <p className="text-muted-foreground">
                Novos empreendimentos de luxo e o primeiro parque aquático da região elevam o padrão e atraem mais
                investimentos.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-luxury transition-shadow">
              <FontAwesomeIcon icon={faShieldAlt} className="text-4xl text-cta mb-4" />
              <h3 className="text-xl font-bold mb-3">Primeira Rota Religiosa à Beira-Mar</h3>
              <p className="text-muted-foreground">
                Carneiros possui a primeira rota religiosa à beira-mar do Brasil, integrando turismo espiritual, esportivo
                e natural.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <img
              src={beach68}
              alt="Praia dos Carneiros vista aérea"
              className="rounded-2xl shadow-soft w-full h-[300px] object-cover"
            />
            <img
              src={beach6b}
              alt="Piscinas naturais de Carneiros"
              className="rounded-2xl shadow-soft w-full h-[300px] object-cover"
            />
            <img
              src={muro_alto}
              alt="Piscinas naturais de Carneiros"
              className="rounded-2xl shadow-soft w-full h-[300px] object-cover"
            />
            <img
              src={porto_de_galinhas}
              alt="Piscinas naturais de Carneiros"
              className="rounded-2xl shadow-soft w-full h-[300px] object-cover"
            />
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="gradient-cta text-white font-semibold text-lg px-8 py-6 hover:opacity-90 transition-opacity"
              onClick={scrollToForm}
            >
              <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
              Quero Saber Mais
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">Perguntas Frequentes</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tire suas dúvidas sobre investimento nas Praias do Litoral Sul de Pernambuco
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-xl px-6 shadow-soft">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Como funciona o modelo DUE?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  O modelo DUE combina o uso pessoal com alta rentabilidade. Você pode usar o imóvel quando quiser para
                  lazer próprio e, nos demais períodos, a DUE cuida de toda a gestão de locação de temporada, incluindo
                  marketing, atendimento, manutenção e limpeza. Isso reduz a ociosidade e otimiza o retorno sobre o
                  investimento.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-xl px-6 shadow-soft">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Qual é a rentabilidade esperada?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Com base no histórico dos empreendimentos DUE nas Praias do Litoral Sul de Pernambuco, a valorização média supera 30% ao ano. A
                  rentabilidade através de locação de temporada pode chegar a 27% ao ano, com taxa média de ocupação de
                  56% e diárias que variam de R$ 500 a R$ 1.500 dependendo da tipologia.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white rounded-xl px-6 shadow-soft">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Como funciona o financiamento?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  A DUE é parceira nacional da Caixa Econômica há 2 anos consecutivos. Você pode financiar até 90% do
                  valor do imóvel com entrada de apenas 10%. O financiamento oferece as menores taxas de juros do
                  mercado, sem correção de INCC na fase de obra, e inclui seguro de quitação por morte ou invalidez.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white rounded-xl px-6 shadow-soft">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Posso visitar o empreendimento?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Sim! Nossa equipe está à disposição para agendar uma visita ao local e apresentar pessoalmente todos
                  os diferenciais da região e do empreendimento. Entre em contato pelo WhatsApp para agendar sua visita.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-white rounded-xl px-6 shadow-soft">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Qual é o prazo de entrega?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  O prazo de entrega é de 36 meses após o início das obras. A Caixa Econômica acompanha mensalmente a
                  obra e garante a entrega no prazo estabelecido.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-white rounded-xl px-6 shadow-soft">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Posso comprar para investimento sem usar o imóvel?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Sim! Muitos investidores optam por deixar o imóvel 100% disponível para locação de temporada,
                  maximizando a rentabilidade. O modelo DUE é perfeito tanto para quem quer usar e rentabilizar quanto
                  para quem busca apenas retorno financeiro.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="gradient-cta text-white font-semibold text-lg px-8 py-6 hover:opacity-90 transition-opacity"
              onClick={scrollToForm}
            >
              <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
              Quero Saber Mais
            </Button>
          </div>
        </div>
      </section>

      {/* Final Form Section */}
      <section
        id="lead_form"
        className="relative py-16 md:py-24 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${beachFinalCta})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg">
                Não Perca Esta Oportunidade!
              </h2>
              <p className="text-xl text-white drop-shadow-md font-medium">
                O Parque Aquático Acqua Ventura já está em pleno funcionamento, atraindo ainda mais turistas para a região! Invista agora e
                aproveite toda a valorização futura!
              </p>
            </div>
            <LeadForm 
              showEmail={true} 
              elementoOrigem="Formulário" 
              variant="custom"
              className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/30 text-white shadow-luxury"
            />
          </div>
        </div>
      </section>

      {/* Image Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] w-full p-0 bg-black/95 border-none [&>button]:text-white [&>button]:hover:text-white/80 [&>button]:z-50">
          <DialogTitle className="sr-only">{modalTitle}</DialogTitle>
          <div className="flex items-center justify-center w-full h-[85vh]">
            <Carousel className="w-full max-w-5xl">
              <CarouselContent>
                {modalImages.map((img, idx) => (
                  <CarouselItem key={idx} className="flex items-center justify-center">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="max-w-full max-h-[80vh] object-contain rounded-lg"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 bg-white/20 hover:bg-white/40 text-white border-none" />
              <CarouselNext className="right-4 bg-white/20 hover:bg-white/40 text-white border-none" />
            </Carousel>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      {/* <footer className="bg-foreground text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm opacity-75">© 2025 Imóveis Invest. Todos os direitos reservados.</p>
        </div>
      </footer> */}
    </div>
  );
};
export default Index;
