let isDebugEnabled: boolean = false

/**
 * Main function for logging debug statements to the console.
 *
 * @param {*} val The object to be logged.
 */
function log (val: any) {
    if (isDebugEnabled) {
        console.log(val)
    }
}

/**
 * Turns on/off logging of debug statements to the Javascript console.
 *
 * @param {boolean} isEnabled Indicates whether or not to turn on debug logging to the javascript
 * console.
 */
function setDebugEnabled (isEnabled: boolean) {
    isDebugEnabled = isEnabled
}

export default {
    log,
    setDebugEnabled
}
