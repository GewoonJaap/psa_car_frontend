export function log(...args: any[]) {
	console.log('LOG:', ...args);
}
export function warn(...args: any[]) {
	console.warn('WARN:', ...args);
}
export function error(...args: any[]) {
	console.error('ERROR:', ...args);
}
export function debug(...args: any[]) {
	console.debug('DEBUG:', ...args);
}
export function info(...args: any[]) {
	console.info('INFO:', ...args);
}
export function trace(...args: any[]) {
	console.trace('TRACE:', ...args);
}
