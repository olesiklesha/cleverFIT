export type TariffPeriod = {
    text: string;
    cost: number;
    days: number;
};

export type Tariff = {
    _id: string;
    name: string;
    periods: TariffPeriod[];
};

export type PostTariffBody = {
    tariffId: string;
    days: number;
};
