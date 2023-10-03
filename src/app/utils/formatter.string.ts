export function capitalizeString(str: string): string{
    const arrWords = str.toLowerCase().trim().split(' ');
    let resultStr = '';

    arrWords.forEach(strArray => {
        resultStr+= strArray.replace(strArray.charAt(0),strArray.charAt(0).toUpperCase())+' ';
    });
    console.log(resultStr);
    return resultStr.trim();
}