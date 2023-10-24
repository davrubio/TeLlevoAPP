export function capitalizeString(str: string): string{
    if(str == '')
        return 'Alumno DuocUC';

    const arrWords = str.toLowerCase().trim().split(' ');
    let resultStr = '';

    arrWords.forEach(strArray => {
        resultStr+= strArray.replace(strArray.charAt(0),strArray.charAt(0).toUpperCase())+' ';
    });
    return resultStr.trim();
}