export function printLog(msg: string) {
    console.log('LOG:\n', msg)
}

export function printError(error: Error | string) {
    console.error('ERROR:\n', error)
}
