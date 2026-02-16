import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { X } from "lucide-react";
import { LeadForm } from "./LeadForm";

export const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-[#00c800] text-white shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
        aria-label="Abrir WhatsApp"
      >
        <div className="absolute inset-0 rounded-full bg-[#00c800] animate-ping opacity-75"></div>
        <FontAwesomeIcon icon={faWhatsapp} className="text-3xl relative z-10" />
      </button>

      {/* Modal */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-300"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[450px] glass-effect-strong border-l border-white/20 animate-in slide-in-from-right duration-300 overflow-y-auto">
            <div className="p-6">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-foreground hover:text-gray-600 transition-colors"
                aria-label="Fechar"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="mb-6 text-foreground">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
                  <FontAwesomeIcon icon={faWhatsapp} className="text-[#00c800]" />
                  Atendimento no WhatsApp
                </h2>
                <p className="text-base md:text-lg text-gray-700">
                  Informe seu contato para iniciar a conversa no WhatsApp:
                </p>
              </div>

              <LeadForm showEmail={false} elementoOrigem="Modal WhatsApp" />
            </div>
          </div>
        </>
      )}
    </>
  );
};
