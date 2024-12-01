const api = "https://api.frankfurter.dev";

type Currency = "THB" | "JPY" | "EUR" | "USD";

interface CurrencyResult {
    amount: number;
    base: string;
    date: string;
    rates: {
        [currencyAbb: string]: number;
    };
}

// @ts-ignore  // to force ignore typescript compile errors if needed
const convertCurrency = ({
    from,
    to,
    amount,
}: {
    amount: number;
    from: Currency;
    to: Currency;
}): Promise<CurrencyResult['rates']> => {
    return fetch(
        `${api}/v1/latest?base=${from}&symbols=${to}&amount=${amount}`
    ).then((x) => x.json()).then((a) => a.rates);
};

const main = async () => {
    const a = await convertCurrency({
        from: "THB",
        to: "USD",
        amount: 100,
    });
    const b = a['USD'];
    console.log(b);
};

main();
