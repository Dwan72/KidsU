import moment from 'moment';

export function formatDateTime(dateString) {
    console.log(dateString);
    const parsed = moment(new Date(dateString));
    

    if (!parsed.isValid()) {
        return dateString;
    }
    return parsed.format('DDDD MMM, H A');   
}

export function formatDate(dateString) {
    const parsed = moment(new Date(dateString));

    if (!parsed.isValid()) {
        return dateString;
    }

    return parsed.format('D MMM YYYY');
}

export function findTotalTime(startString, endString) {
    const startParsed = moment(new Date(startString));
    const endParsed = moment(new Date(endString));

    if (!startParsed.isValid()){
        return "Not Found"
    }
    if (!endParsed.isValid()){
        return "Not Found"
    }
    const totalTime = endParsed.subtract(startParsed);
    return parsed.format('DDDD MMM, H A');
}

// export function endTimeGreater(startString, endString) {
//     const startParsed = moment(new Date(startString));
//     const endParsed = moment(new Date(endString));

//     if 
// }