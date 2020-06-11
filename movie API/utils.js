/* delay the request until finish typing. */

// let timeoutId;
// const onInput = (event) => {
//     if (timeoutId)
//         clearTimeout(timeoutId);
//     timeoutId = setTimeout(() =>
//         fetchData(event.target.value)
//         , 500);
// }

/* now we have a function that can be used to debounce
 any kind of dom element not only with inputs. */
// the debounce function return a function that accepts arguments
const debounce = (func, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId)
            clearTimeout(timeoutId);
        timeoutId = setTimeout(() =>
            func.apply(null, args)
            , delay);
    }
}

