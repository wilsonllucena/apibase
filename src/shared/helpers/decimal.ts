import { isNumber } from 'class-validator';

export const convertNumberToDecimal = (value: any): string => {
  if (isNumber(value)) {
    return value.toFixed(2);
  }
  const currency = Number(value.replace(/[^0-9\.]+/g, ''));
  return currency.toFixed(2);
};

export const convertNumberToCurrencyBRL = (value: any): string => {
  if (isNumber(value)) {
    return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }
  const currency = Number(value.replace(/[^0-9\.]+/g, ''));
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(currency);
};
