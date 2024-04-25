export const getFormattedDateStr = (str: string) => {
    const date = new Date(str);
    const dayNum = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');

    return `${dayNum}.${month}.${date.getFullYear()}`;
};
