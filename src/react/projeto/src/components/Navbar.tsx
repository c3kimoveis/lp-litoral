import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logoImoveis from "@/assets/logo_c3k.png";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Início", href: "#hero" },
    { label: "Valorizações", href: "#valorizacao" },
    { label: "Investimento", href: "#investimento" },
    { label: "Empreendimentos", href: "#empreendimentos" },
    { label: "Turismo", href: "#turismo" },
    { label: "FAQ", href: "#faq" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToForm = () => {
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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass-effect-strong shadow-soft bg-white/95" : "glass-effect"
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#hero" onClick={(e) => handleNavClick(e, "#hero")} className="flex items-center">
            <div className="bg-white/95 backdrop-blur-sm p-2 rounded-sm shadow-sm hover:shadow-md transition-all duration-300">
              <img src={logoImoveis} alt="C3K Imóveis" className="h-6 md:h-10" />
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`transition-colors font-medium ${isScrolled ? "text-foreground hover:text-primary" : "text-white hover:text-secondary drop-shadow-sm"
                  }`}
              >
                {item.label}
              </a>
            ))}
            <Button
              className="gradient-cta text-white font-semibold px-6 hover:opacity-90 transition-opacity"
              onClick={scrollToForm}
            >
              <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
              Quero Saber Mais
            </Button>
          </div>

          {/* Mobile Menu Button & CTA */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              size="sm"
              className="gradient-cta text-white font-semibold hover:opacity-90 transition-opacity"
              onClick={scrollToForm}
            >
              <FontAwesomeIcon icon={faWhatsapp} className="mr-1" />
              Saber Mais
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="glass-effect-strong border-white/20 text-foreground w-[280px] sm:w-[320px]">
                <div className="flex flex-col space-y-6 mt-8">
                  {menuItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="text-foreground hover:text-primary transition-colors font-medium text-lg"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
