import React from "react";

export const GlobalStyles: React.FC = () => (
  <style>{`
    @import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap");
    
    :root {
      --color-primary: #006a78;
      --color-primary-light: #1a7984;
      --color-primary-dark: #043c42;
      --color-background: #f7f7f7;
      --color-gold: #c5a059;
      --color-danger: #e53e3e;
    }

    body {
      font-family: "Inter", sans-serif;
      background-color: var(--color-background);
    }
    
    .certificate-pattern {
      background-color: #fdfbf7;
      background-image: radial-gradient(#006a78 0.5px, transparent 0.5px), radial-gradient(#006a78 0.5px, #ffffff 0.5px);
      background-size: 20px 20px;
    }
    
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: rgba(200, 200, 200, 0.5);
      border-radius: 20px;
    }
  `}</style>
);
