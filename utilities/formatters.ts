export const shortText = (text: string | undefined, length: number) => {
    if (!text) return '';
    return text?.length > length ? text?.substring(0, length) + '.' : text;
}