import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const ThankYou = () => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const realtor = sessionStorage.getItem("realtor") || "nosso corretor";
    const realtorWpp = sessionStorage.getItem("realtor_wpp") || "";

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          const message = encodeURIComponent(
            `Olá, ${realtor}! Vim através do site e gostaria de saber mais informações sobre oportunidades de investimento no Litoral.`
          );
          window.location.href = `https://wa.me/${realtorWpp}?text=${message}`;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-accent to-secondary p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-[#00c800] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <FontAwesomeIcon icon={faWhatsapp} className="text-4xl text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Sua conversa no WhatsApp está sendo iniciada...
          </h1>
          <div className="text-6xl md:text-7xl font-bold text-[#00c800] my-8">
            {countdown}
          </div>
          <p className="text-muted-foreground">
            Você será redirecionado em alguns segundos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
