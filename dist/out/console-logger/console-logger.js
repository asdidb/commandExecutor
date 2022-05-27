"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
class ConsoleLogger {
    constructor() { }
    static getInstance() {
        if (!ConsoleLogger.consoleLogger) {
            ConsoleLogger.consoleLogger = new ConsoleLogger();
        }
        return ConsoleLogger.consoleLogger;
    }
    ;
    log(...args) {
        console.log(args);
    }
    error(...args) {
        console.log(`Ошибка: ${args}`);
    }
    end() {
        console.log('Готово');
    }
}
exports.ConsoleLogger = ConsoleLogger;
