// Pagamento Asaas

export const addPaymentIdAsaas = (PaymentId: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('PaymentIdAsaas', JSON.stringify(PaymentId));
    }
  };
  
  export const getPaymentIdAsaas = () => {
    if (typeof window === 'undefined') return null;
  
    const PaymentId = localStorage.getItem('PaymentIdAsaas');
  
    if (!PaymentId || PaymentId === 'undefined') {
      removePaymentIdAsaas();
      return null;
    }
  
    try {
      return JSON.parse(PaymentId);
    } catch (error) {
      console.error('Erro ao fazer parse do PaymentIdAsaas:', error);
      return null;
    }
  };
  
  export const removePaymentIdAsaas = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('PaymentIdAsaas');
    }
  };
  
  export const setPaymentStartTimeAsaas = () => {
    if (typeof window !== 'undefined') {
      const startTime = Date.now();
      localStorage.setItem('PaymentStartTimeAsaas', JSON.stringify(startTime));
    }
  };
  
  export const getPaymentStartTimeAsaas = () => {
    if (typeof window === 'undefined') return null;
  
    const startTime = localStorage.getItem('PaymentStartTimeAsaas');
    return startTime ? JSON.parse(startTime) : null;
  };
  
  export const removePaymentStartTimeAsaas = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('PaymentStartTimeAsaas');
    }
  };
  
  // Pagamento EFI
  
  export const addPaymentEFI = (payment: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('Payment', JSON.stringify(payment));
    }
  };
  
  export const getPaymentEFI = () => {
    if (typeof window === 'undefined') return null;
  
    const Payment = localStorage.getItem('Payment');
    const PaymentId = Payment === undefined ? null : Payment;
    return PaymentId ? JSON.parse(PaymentId) : null;
  };
  
  export const removePaymentEFI = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('Payment');
    }
  };
  
  export const addQrCode = (qr: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('QrCode', JSON.stringify(qr));
    }
  };
  
  export const getQrCode = () => {
    if (typeof window === 'undefined') return null;
  
    const PaymentId = localStorage.getItem('QrCode');
    return PaymentId ? JSON.parse(PaymentId) : null;
  };
  
  export const removeQrCode = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('QrCode');
    }
  };
  
  export const addPaymentIdEFI = (PaymentId: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nutritionAppPaymentIdEFI', JSON.stringify(PaymentId));
    }
  };
  
  export const getPaymentIdEFI = () => {
    if (typeof window === 'undefined') return null;
  
    const PaymentId = localStorage.getItem('nutritionAppPaymentIdEFI');
    return PaymentId ? JSON.parse(PaymentId) : null;
  };
  
  export const removePaymentIdEFI = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('nutritionAppPaymentIdEFI');
    }
  };
  
  export const addStatusIdEFI = (PaymentId: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nutritionAppStatusIdEFI', JSON.stringify(PaymentId));
    }
  };
  
  export const getStatusIdEFI = () => {
    if (typeof window === 'undefined') return null;
  
    const PaymentId = localStorage.getItem('nutritionAppStatusIdEFI');
    return PaymentId ? JSON.parse(PaymentId) : null;
  };
  
  export const removeStatusIdEFI = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('nutritionAppStatusIdEFI');
    }
  };
  
  export const setPaymentStartTimeEFI = () => {
    if (typeof window !== 'undefined') {
      const startTime = Date.now();
      localStorage.setItem('nutritionAppPaymentStartTimeEFI', JSON.stringify(startTime));
    }
  };
  
  export const getPaymentStartTimeEFI = () => {
    if (typeof window === 'undefined') return null;
  
    const startTime = localStorage.getItem('nutritionAppPaymentStartTimeEFI');
    return startTime ? JSON.parse(startTime) : null;
  };
  
  export const removePaymentStartTimeEFI = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('nutritionAppPaymentStartTimeEFI');
    }
  };
  