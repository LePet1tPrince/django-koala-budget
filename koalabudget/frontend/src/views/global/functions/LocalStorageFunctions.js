//pass in a function. If debut is true, the function will execute
export function ifDebug(func) {
    const debugSetting = localStorage.getItem('debugSetting')
    if (debugSetting === 'true') {
      func()
    }

}