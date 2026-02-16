import React, { createContext, useContext, useEffect, useState } from 'react';

interface GTMContextType {
  sendEvent: (eventName: string, data?: object) => void;
}

const GTMContext = createContext<GTMContextType | undefined>(undefined);

interface GTMProviderProps {
  gtmId: string;
  children: React.ReactNode;
}

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const GTMProvider: React.FC<GTMProviderProps> = ({ gtmId, children }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isInitialized) return;

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];

    // GTM Script (Head)
    const script = document.createElement('script');
    script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`;
    document.head.appendChild(script);

    // GTM NoScript (Body)
    const noscript = document.createElement('noscript');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
    iframe.height = "0";
    iframe.width = "0";
    iframe.style.display = "none";
    iframe.style.visibility = "hidden";
    noscript.appendChild(iframe);
    document.body.insertBefore(noscript, document.body.firstChild);

    setIsInitialized(true);

    return () => {
      // Cleanup if necessary (usually GTM scripts persist)
    };
  }, [gtmId, isInitialized]);

  const sendEvent = (eventName: string, data?: object) => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...data,
      });
    } else {
      console.warn("GTM dataLayer not initialized yet.");
    }
  };

  return (
    <GTMContext.Provider value={{ sendEvent }}>
      {children}
    </GTMContext.Provider>
  );
};

export const useGTM = () => {
  const context = useContext(GTMContext);
  if (context === undefined) {
    throw new Error('useGTM must be used within a GTMProvider');
  }
  return context;
};
