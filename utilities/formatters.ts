export const shortText = (text: string | undefined, length: number) => {
    if (!text) return '';
    return text?.length > length ? text?.substring(0, length) + '.' : text;
}

export const pascalCase = (text: string) => {
    return text.replace(/(\w)(\w*)/g, function (g0, g1, g2) { return g1.toUpperCase() + g2.toLowerCase(); });
}