import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PhoneNumberUtil, PhoneNumberFormat } from "google-libphonenumber";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import "flag-icons/css/flag-icons.min.css";

const phoneUtil = PhoneNumberUtil.getInstance();

const countries = [
  { code: "AF", name: "Afeganistão", dial: "+93" },
  { code: "ZA", name: "África do Sul", dial: "+27" },
  { code: "AL", name: "Albânia", dial: "+355" },
  { code: "DE", name: "Alemanha", dial: "+49" },
  { code: "AD", name: "Andorra", dial: "+376" },
  { code: "AO", name: "Angola", dial: "+244" },
  { code: "AI", name: "Anguila", dial: "+1264" },
  { code: "AG", name: "Antígua e Barbuda", dial: "+1268" },
  { code: "SA", name: "Arábia Saudita", dial: "+966" },
  { code: "DZ", name: "Argélia", dial: "+213" },
  { code: "AR", name: "Argentina", dial: "+54" },
  { code: "AM", name: "Armênia", dial: "+374" },
  { code: "AW", name: "Aruba", dial: "+297" },
  { code: "AU", name: "Austrália", dial: "+61" },
  { code: "AT", name: "Áustria", dial: "+43" },
  { code: "AZ", name: "Azerbaijão", dial: "+994" },
  { code: "BS", name: "Bahamas", dial: "+1242" },
  { code: "BD", name: "Bangladesh", dial: "+880" },
  { code: "BB", name: "Barbados", dial: "+1246" },
  { code: "BH", name: "Bahrein", dial: "+973" },
  { code: "BY", name: "Bielorrússia", dial: "+375" },
  { code: "BE", name: "Bélgica", dial: "+32" },
  { code: "BZ", name: "Belize", dial: "+501" },
  { code: "BJ", name: "Benin", dial: "+229" },
  { code: "BM", name: "Bermudas", dial: "+1441" },
  { code: "BO", name: "Bolívia", dial: "+591" },
  { code: "BA", name: "Bósnia e Herzegovina", dial: "+387" },
  { code: "BW", name: "Botsuana", dial: "+267" },
  { code: "BR", name: "Brasil", dial: "+55" },
  { code: "BN", name: "Brunei", dial: "+673" },
  { code: "BG", name: "Bulgária", dial: "+359" },
  { code: "BF", name: "Burkina Faso", dial: "+226" },
  { code: "BI", name: "Burundi", dial: "+257" },
  { code: "BT", name: "Butão", dial: "+975" },
  { code: "CV", name: "Cabo Verde", dial: "+238" },
  { code: "CM", name: "Camarões", dial: "+237" },
  { code: "KH", name: "Camboja", dial: "+855" },
  { code: "CA", name: "Canadá", dial: "+1" },
  { code: "QA", name: "Catar", dial: "+974" },
  { code: "KZ", name: "Cazaquistão", dial: "+7" },
  { code: "TD", name: "Chade", dial: "+235" },
  { code: "CL", name: "Chile", dial: "+56" },
  { code: "CN", name: "China", dial: "+86" },
  { code: "CY", name: "Chipre", dial: "+357" },
  { code: "CO", name: "Colômbia", dial: "+57" },
  { code: "KM", name: "Comores", dial: "+269" },
  { code: "CG", name: "Congo", dial: "+242" },
  { code: "CD", name: "Congo (RDC)", dial: "+243" },
  { code: "KP", name: "Coreia do Norte", dial: "+850" },
  { code: "KR", name: "Coreia do Sul", dial: "+82" },
  { code: "CI", name: "Costa do Marfim", dial: "+225" },
  { code: "CR", name: "Costa Rica", dial: "+506" },
  { code: "HR", name: "Croácia", dial: "+385" },
  { code: "CU", name: "Cuba", dial: "+53" },
  { code: "CW", name: "Curaçao", dial: "+599" },
  { code: "DK", name: "Dinamarca", dial: "+45" },
  { code: "DJ", name: "Djibouti", dial: "+253" },
  { code: "DM", name: "Dominica", dial: "+1767" },
  { code: "EG", name: "Egito", dial: "+20" },
  { code: "SV", name: "El Salvador", dial: "+503" },
  { code: "AE", name: "Emirados Árabes Unidos", dial: "+971" },
  { code: "EC", name: "Equador", dial: "+593" },
  { code: "ER", name: "Eritreia", dial: "+291" },
  { code: "SK", name: "Eslováquia", dial: "+421" },
  { code: "SI", name: "Eslovênia", dial: "+386" },
  { code: "ES", name: "Espanha", dial: "+34" },
  { code: "US", name: "Estados Unidos", dial: "+1" },
  { code: "EE", name: "Estônia", dial: "+372" },
  { code: "SZ", name: "Eswatini", dial: "+268" },
  { code: "ET", name: "Etiópia", dial: "+251" },
  { code: "FJ", name: "Fiji", dial: "+679" },
  { code: "PH", name: "Filipinas", dial: "+63" },
  { code: "FI", name: "Finlândia", dial: "+358" },
  { code: "FR", name: "França", dial: "+33" },
  { code: "GA", name: "Gabão", dial: "+241" },
  { code: "GM", name: "Gâmbia", dial: "+220" },
  { code: "GH", name: "Gana", dial: "+233" },
  { code: "GE", name: "Geórgia", dial: "+995" },
  { code: "GI", name: "Gibraltar", dial: "+350" },
  { code: "GR", name: "Grécia", dial: "+30" },
  { code: "GD", name: "Granada", dial: "+1473" },
  { code: "GL", name: "Groenlândia", dial: "+299" },
  { code: "GP", name: "Guadalupe", dial: "+590" },
  { code: "GU", name: "Guam", dial: "+1671" },
  { code: "GT", name: "Guatemala", dial: "+502" },
  { code: "GG", name: "Guernsey", dial: "+44" },
  { code: "GY", name: "Guiana", dial: "+592" },
  { code: "GF", name: "Guiana Francesa", dial: "+594" },
  { code: "GN", name: "Guiné", dial: "+224" },
  { code: "GW", name: "Guiné-Bissau", dial: "+245" },
  { code: "GQ", name: "Guiné Equatorial", dial: "+240" },
  { code: "HT", name: "Haiti", dial: "+509" },
  { code: "NL", name: "Holanda", dial: "+31" },
  { code: "HN", name: "Honduras", dial: "+504" },
  { code: "HK", name: "Hong Kong", dial: "+852" },
  { code: "HU", name: "Hungria", dial: "+36" },
  { code: "YE", name: "Iêmen", dial: "+967" },
  { code: "IN", name: "Índia", dial: "+91" },
  { code: "ID", name: "Indonésia", dial: "+62" },
  { code: "IQ", name: "Iraque", dial: "+964" },
  { code: "IR", name: "Irã", dial: "+98" },
  { code: "IE", name: "Irlanda", dial: "+353" },
  { code: "IS", name: "Islândia", dial: "+354" },
  { code: "IL", name: "Israel", dial: "+972" },
  { code: "IT", name: "Itália", dial: "+39" },
  { code: "JM", name: "Jamaica", dial: "+1876" },
  { code: "JP", name: "Japão", dial: "+81" },
  { code: "JE", name: "Jersey", dial: "+44" },
  { code: "JO", name: "Jordânia", dial: "+962" },
  { code: "KW", name: "Kuwait", dial: "+965" },
  { code: "LA", name: "Laos", dial: "+856" },
  { code: "LS", name: "Lesoto", dial: "+266" },
  { code: "LV", name: "Letônia", dial: "+371" },
  { code: "LB", name: "Líbano", dial: "+961" },
  { code: "LR", name: "Libéria", dial: "+231" },
  { code: "LY", name: "Líbia", dial: "+218" },
  { code: "LI", name: "Liechtenstein", dial: "+423" },
  { code: "LT", name: "Lituânia", dial: "+370" },
  { code: "LU", name: "Luxemburgo", dial: "+352" },
  { code: "MO", name: "Macau", dial: "+853" },
  { code: "MK", name: "Macedônia do Norte", dial: "+389" },
  { code: "MG", name: "Madagascar", dial: "+261" },
  { code: "MY", name: "Malásia", dial: "+60" },
  { code: "MW", name: "Malawi", dial: "+265" },
  { code: "MV", name: "Maldivas", dial: "+960" },
  { code: "ML", name: "Mali", dial: "+223" },
  { code: "MT", name: "Malta", dial: "+356" },
  { code: "MA", name: "Marrocos", dial: "+212" },
  { code: "MQ", name: "Martinica", dial: "+596" },
  { code: "MU", name: "Maurício", dial: "+230" },
  { code: "MR", name: "Mauritânia", dial: "+222" },
  { code: "MX", name: "México", dial: "+52" },
  { code: "MM", name: "Mianmar", dial: "+95" },
  { code: "FM", name: "Micronésia", dial: "+691" },
  { code: "MZ", name: "Moçambique", dial: "+258" },
  { code: "MD", name: "Moldávia", dial: "+373" },
  { code: "MC", name: "Mônaco", dial: "+377" },
  { code: "MN", name: "Mongólia", dial: "+976" },
  { code: "ME", name: "Montenegro", dial: "+382" },
  { code: "MS", name: "Montserrat", dial: "+1664" },
  { code: "NA", name: "Namíbia", dial: "+264" },
  { code: "NP", name: "Nepal", dial: "+977" },
  { code: "NI", name: "Nicarágua", dial: "+505" },
  { code: "NE", name: "Níger", dial: "+227" },
  { code: "NG", name: "Nigéria", dial: "+234" },
  { code: "NO", name: "Noruega", dial: "+47" },
  { code: "NC", name: "Nova Caledônia", dial: "+687" },
  { code: "NZ", name: "Nova Zelândia", dial: "+64" },
  { code: "OM", name: "Omã", dial: "+968" },
  { code: "PW", name: "Palau", dial: "+680" },
  { code: "PA", name: "Panamá", dial: "+507" },
  { code: "PG", name: "Papua Nova Guiné", dial: "+675" },
  { code: "PK", name: "Paquistão", dial: "+92" },
  { code: "PY", name: "Paraguai", dial: "+595" },
  { code: "PE", name: "Peru", dial: "+51" },
  { code: "PF", name: "Polinésia Francesa", dial: "+689" },
  { code: "PL", name: "Polônia", dial: "+48" },
  { code: "PR", name: "Porto Rico", dial: "+1" },
  { code: "PT", name: "Portugal", dial: "+351" },
  { code: "KE", name: "Quênia", dial: "+254" },
  { code: "KG", name: "Quirguistão", dial: "+996" },
  { code: "GB", name: "Reino Unido", dial: "+44" },
  { code: "CF", name: "República Centro-Africana", dial: "+236" },
  { code: "DO", name: "República Dominicana", dial: "+1" },
  { code: "CZ", name: "República Tcheca", dial: "+420" },
  { code: "RE", name: "Reunião", dial: "+262" },
  { code: "RO", name: "Romênia", dial: "+40" },
  { code: "RW", name: "Ruanda", dial: "+250" },
  { code: "RU", name: "Rússia", dial: "+7" },
  { code: "WS", name: "Samoa", dial: "+685" },
  { code: "SM", name: "San Marino", dial: "+378" },
  { code: "LC", name: "Santa Lúcia", dial: "+1758" },
  { code: "KN", name: "São Cristóvão e Nevis", dial: "+1869" },
  { code: "ST", name: "São Tomé e Príncipe", dial: "+239" },
  { code: "VC", name: "São Vicente e Granadinas", dial: "+1784" },
  { code: "SN", name: "Senegal", dial: "+221" },
  { code: "SL", name: "Serra Leoa", dial: "+232" },
  { code: "RS", name: "Sérvia", dial: "+381" },
  { code: "SC", name: "Seychelles", dial: "+248" },
  { code: "SG", name: "Singapura", dial: "+65" },
  { code: "SY", name: "Síria", dial: "+963" },
  { code: "SO", name: "Somália", dial: "+252" },
  { code: "LK", name: "Sri Lanka", dial: "+94" },
  { code: "SD", name: "Sudão", dial: "+249" },
  { code: "SS", name: "Sudão do Sul", dial: "+211" },
  { code: "SE", name: "Suécia", dial: "+46" },
  { code: "CH", name: "Suíça", dial: "+41" },
  { code: "SR", name: "Suriname", dial: "+597" },
  { code: "TJ", name: "Tajiquistão", dial: "+992" },
  { code: "TH", name: "Tailândia", dial: "+66" },
  { code: "TW", name: "Taiwan", dial: "+886" },
  { code: "TZ", name: "Tanzânia", dial: "+255" },
  { code: "TL", name: "Timor-Leste", dial: "+670" },
  { code: "TG", name: "Togo", dial: "+228" },
  { code: "TO", name: "Tonga", dial: "+676" },
  { code: "TT", name: "Trinidad e Tobago", dial: "+1868" },
  { code: "TN", name: "Tunísia", dial: "+216" },
  { code: "TM", name: "Turcomenistão", dial: "+993" },
  { code: "TR", name: "Turquia", dial: "+90" },
  { code: "TV", name: "Tuvalu", dial: "+688" },
  { code: "UA", name: "Ucrânia", dial: "+380" },
  { code: "UG", name: "Uganda", dial: "+256" },
  { code: "UY", name: "Uruguai", dial: "+598" },
  { code: "UZ", name: "Uzbequistão", dial: "+998" },
  { code: "VU", name: "Vanuatu", dial: "+678" },
  { code: "VA", name: "Vaticano", dial: "+39" },
  { code: "VE", name: "Venezuela", dial: "+58" },
  { code: "VN", name: "Vietnã", dial: "+84" },
  { code: "ZM", name: "Zâmbia", dial: "+260" },
  { code: "ZW", name: "Zimbábue", dial: "+263" },
];

const formSchema = z.object({
  fullName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100),
  country: z.string().min(2),
  phone: z.string().min(8, "Telefone inválido"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;


interface LeadFormProps {
  showEmail?: boolean;
  elementoOrigem: string;
  className?: string;
  variant?: "default" | "custom";
}


export const LeadForm = ({ showEmail = true, elementoOrigem, className, variant = "default" }: LeadFormProps) => {
  const [selectedCountry, setSelectedCountry] = useState(countries.find((c) => c.code === "BR") || countries[0]);
  const [phonePlaceholder, setPhonePlaceholder] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "BR",
    },
  });

  const phoneValue = watch("phone");

  useEffect(() => {
    try {
      const exampleNumber = phoneUtil.getExampleNumber(selectedCountry.code);
      if (exampleNumber) {
        const formatted = phoneUtil.format(exampleNumber, PhoneNumberFormat.NATIONAL);
        setPhonePlaceholder(formatted);
      }
    } catch (error) {
      setPhonePlaceholder("Número de telefone");
    }
  }, [selectedCountry]);

  const formatPhoneNumber = (value: string, countryCode: string) => {
    try {
      const phoneNumber = phoneUtil.parse(value, countryCode);
      return phoneUtil.format(phoneNumber, PhoneNumberFormat.NATIONAL);
    } catch {
      return value;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const formatted = formatPhoneNumber(value, selectedCountry.code);
    setValue("phone", formatted);
  };

  const parseFullName = (fullName: string) => {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) {
      return { first_name: parts[0], middle_name: null, last_name: null };
    } else if (parts.length === 2) {
      return { first_name: parts[0], middle_name: null, last_name: parts[1] };
    } else {
      return {
        first_name: parts[0],
        middle_name: parts.slice(1, -1).join(" "),
        last_name: parts[parts.length - 1],
      };
    }
  };

  const getUTMParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_id: params.get("utm_id") || "",
      utm_source: params.get("utm_source") || "orgânico",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "litoral",
      utm_term: params.get("utm_term") || "",
      utm_content: params.get("utm_content") || "1.1.0",
      gclid: params.get("gclid") || "",
    };
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // console.log("Iniciando envio do formulário...", data);

      // Validação e parsing do telefone
      let countryCode = "";
      let areaCode = "";
      let restOfNumber = "";

      try {
        const phoneNumber = phoneUtil.parse(data.phone, selectedCountry.code);
        countryCode = phoneNumber.getCountryCode()?.toString() || "";
        const nationalNumber = phoneNumber.getNationalNumber()?.toString() || "";

        // Extract area code - for Brazil it's first 2 digits, for US it's first 3
        const areaCodeLength = selectedCountry.code === "BR" ? 2 : 3;
        areaCode = nationalNumber.slice(0, areaCodeLength);
        restOfNumber = nationalNumber.slice(areaCodeLength);
      } catch (phoneError) {
        // console.warn("Erro no parsing do telefone:", phoneError);
        // Fallback: usar o telefone como está
        countryCode = selectedCountry.dial.replace("+", "");
        const cleanPhone = data.phone.replace(/\D/g, "");
        areaCode = cleanPhone.slice(0, 2);
        restOfNumber = cleanPhone.slice(2);
      }

      const nameParts = parseFullName(data.fullName);
      const utmParams = getUTMParams();

      const payload = {
        first_name: nameParts.first_name,
        middle_name: nameParts.middle_name,
        last_name: nameParts.last_name,
        email: data.email || "",
        country_code: countryCode,
        area_code: areaCode,
        national_number: restOfNumber,
        landing_url: window.location.href,
        elemento_origem: elementoOrigem,
        ...utmParams,
        user_agent: navigator.userAgent,
        conversion_value: 1.0,
        currency_code: "BRL",
      };

      // console.log("Payload preparado:", payload);

      const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL_NOVO_LEAD || "https://yxidyvfgkymsefmcnpwx.supabase.co/functions/v1/insert-lead";
      // console.log("URL do webhook:", WEBHOOK_URL);

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload),
      });

      // console.log("Resposta recebida:", response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        // console.error("Erro na resposta:", errorText);
        throw new Error(`Erro ao enviar formulário: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      // console.log("Resultado do webhook:", result);

      // GTM: Disparar evento de conversão
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'generate_lead',
        'value': 1,
        'currency': 'BRL'
      });

      // Extract redirect_url from response (API returns an array: [{ redirect_url: "..." }])
      const leadData = Array.isArray(result) ? result[0] : result;
      const redirectUrl = leadData?.redirect_url;

      if (redirectUrl) {
        toast.success("Seu atendimento está sendo iniciado!");
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 1000);
      } else {
        // Se não tem redirect_url, ainda considera sucesso
        toast.success("Seu atendimento está sendo iniciado! Em breve entraremos em contato.");
        // console.warn("Resposta sem redirect_url:", result);
      }
    } catch (error) {
      // console.error("Erro completo no envio:", error);
      toast.error(`Erro ao enviar formulário: ${error.message || "Tente novamente."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultStyles = "glass-effect-strong rounded-2xl p-6 md:p-8 shadow-luxury";
  const finalClass = variant === "default" ? cn(defaultStyles, className) : className;

  return (
    <div id="lead_form" className={finalClass}>
      <h3 className="text-2xl md:text-3xl font-bold mb-4">
        Aproveite para Garantir os Melhores Benefícios!
      </h3>


      <div className="space-y-2 mb-6 text-sm md:text-base text-left">
        <p className="flex items-start gap-2">💵 Financiamento de até 90%.</p>
        <p className="flex items-start gap-2">💰 Preços a partir de R$ 340.000,00.</p>
        <p className="flex items-start gap-2">🏖️ Uso Pessoal + Renda Passiva.</p>
        <p className="flex items-start gap-2">🎯 Escolha das Melhores Unidades.</p>
        <p className="flex items-start gap-2">📅 Entrada de 10% e Parcelas Facilitadas.</p>
        <p className="flex items-start gap-2">📈 Alta Valorização.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="fullName" className="font-semibold">
            Nome*
          </Label>
          <Input
            id="fullName"
            {...register("fullName")}
            placeholder="Digite seu nome"
            className="bg-white border-gray-300 text-foreground placeholder:text-gray-500"
          />
          {errors.fullName && <p className="text-red-600 text-sm mt-1 font-medium">{errors.fullName.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="country" className="font-semibold">
              País
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between bg-white border-gray-300 text-foreground hover:bg-gray-50 hover:text-foreground"
                >
                  <span className="flex items-center gap-2">
                    <span className={`fi fi-${selectedCountry.code.toLowerCase()}`}></span>
                    <span className="text-gray-600">{selectedCountry.dial}</span>
                    <span className="hidden sm:inline">{selectedCountry.name}</span>
                  </span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Buscar país..." value={searchValue} onValueChange={setSearchValue} />
                  <CommandList>
                    <CommandEmpty>Nenhum país encontrado.</CommandEmpty>
                    <CommandGroup>
                      {countries
                        .filter(
                          (country) =>
                            country.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                            country.dial.includes(searchValue),
                        )
                        .map((country) => (
                          <CommandItem
                            key={country.code}
                            value={country.name}
                            onSelect={() => {
                              setSelectedCountry(country);
                              setValue("country", country.code);
                              setOpen(false);
                              setSearchValue("");
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedCountry.code === country.code ? "opacity-100" : "opacity-0",
                              )}
                            />
                            <span className={`fi fi-${country.code.toLowerCase()} mr-2`}></span>
                            {country.name} ({country.dial})
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="phone" className="font-semibold">
              WhatsApp*
            </Label>
            <Input
              id="phone"
              {...register("phone")}
              onChange={handlePhoneChange}
              placeholder={phonePlaceholder}
              className="bg-white border-gray-300 text-foreground placeholder:text-gray-500"
            />
          </div>
        </div>
        {errors.phone && <p className="text-red-600 text-sm font-medium">{errors.phone.message}</p>}

        {showEmail && (
          <div>
            <Label htmlFor="email" className="font-semibold">
              E-mail (não obrigatório)
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="seu@email.com"
              className="bg-white border-gray-300 text-foreground placeholder:text-gray-500"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1 font-medium">{errors.email.message}</p>}
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full gradient-cta text-white font-semibold text-lg py-6 hover:opacity-90 transition-opacity"
        >
          <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
          {isSubmitting ? "Enviando..." : showEmail ? "Quero Saber Mais" : "Iniciar a conversa"}
        </Button>
      </form>
    </div>
  );
};
