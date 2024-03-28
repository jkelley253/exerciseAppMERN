// assignment9/exercise-rest/ut.mjs
/**
* @param {string} date
*/
function isDateValid(date) {
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

export { isDateValid };
