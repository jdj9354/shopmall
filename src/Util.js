export const dateFromISO8601 = (isoStr) =>{
    let parts = isoStr.match(/\d+/g);
    return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
};