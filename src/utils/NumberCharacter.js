export const numberCharacterHandler = (number) => {
    const num = +number;
    if (num >= 1000 && num < 1000000) {
        return (num / 1000).toLocaleString("en-US") + "K";
    } else if (num >= 1000000 && num < 1000000000) {
        return (num / 1000000).toLocaleString("en-US") + "M";
    } else if (num >= 1000000000) {
        return (num / 1000000000).toLocaleString("en-US") + "B";
    } else {
        return num.toLocaleString("en-US");
    }
}