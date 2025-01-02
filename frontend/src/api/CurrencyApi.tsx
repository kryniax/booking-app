import { useQuery } from "@tanstack/react-query";

const BASE_CURRENCY = import.meta.env.VITE_BASE_CURRENCY;

type ExchangeRatesResponse = {
  rates: {
    [key: string]: number;
  };
  base: string;
  timestamp: number;
};

export const useFetchExchangesRates = () => {
  const fetchExchangeRates = async (): Promise<ExchangeRatesResponse> => {
    try {
      const response = await fetch(
        `https://open.exchangerate-api.com/v6/latest/${BASE_CURRENCY}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      throw error;
    }
  };

  const {
    data: exchangeRates,
    isSuccess,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["exchangeRates"],
    queryFn: fetchExchangeRates,
  });

  return {
    exchangeRates,
    isSuccess,
    isError,
    isLoading,
    baseCurrency: BASE_CURRENCY,
  };
};
