

const isDOMElement = (o) => {
    return (
        typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
        o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
    )
}


const breakdownSourceValue = (rawValue) => {
    if(rawValue === undefined) return;

    let value;
    let type = 'number';
    let suffix = '';

    value = parseFloat(rawValue)

    if(!isNaN(value)) {
        if(typeof rawValue == 'string') {
            type = 'string'
            suffix = ('' + rawValue).replace(/\d|\.|\+|\-/g,'')
        }
    } else {
        // Check if its a hex color code, rgb code, hsl code
        return;
    }

    return {
        raw: rawValue,
        type: type,
        value: value,
        suffix: suffix
    }
}



export default {
    isDOMElement: isDOMElement,
    breakdownSourceValue: breakdownSourceValue
}