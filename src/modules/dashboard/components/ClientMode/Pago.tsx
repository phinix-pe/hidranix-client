// src/modules/dashboard/components/Pago.tsx
import { useEffect, useState } from "react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import YapePayment from "../ClientMode/YapePayment";
import CreditCardPayment from "../ClientMode/CreditCardPayment";
import { MP_PUBLIC_KEY } from "../../../services/config";

declare global {
  interface Window {
    mercadoPagoInitialized?: boolean;
  mercadoPagoPromise?: Promise<void>;
  }
}

const Pago = () => {
  const [mercadoPagoInitialized, setMercadoPagoInitialized] = useState(
    !!window.mercadoPagoInitialized
  );

  useEffect(() => {
    const initializeMercadoPago = async () => {
      if (!window.mercadoPagoInitialized && MP_PUBLIC_KEY) {
        if (!window.mercadoPagoPromise) {
          initMercadoPago(MP_PUBLIC_KEY, {
            locale: "es-PE",
          });
          window.mercadoPagoInitialized = true;
          window.mercadoPagoPromise = Promise.resolve();
        }
        
        await window.mercadoPagoPromise;
        setMercadoPagoInitialized(true);
      }
    };

    initializeMercadoPago();
  }, []);

  if (!mercadoPagoInitialized) {
    return <div>Cargando MercadoPago...</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold">Pagar Servicio</h2>
      <p>Realiza pagos para tus servicios activos.</p>
      <YapePayment />
      <CreditCardPayment />
    </div>
  );
};

export default Pago;