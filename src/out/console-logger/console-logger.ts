import { IStreamLogger } from "../../core/handler/stream-logger.interface";
export class ConsoleLogger implements IStreamLogger{
    private static consoleLogger: ConsoleLogger;
    public static getInstance(){
        if (!ConsoleLogger.consoleLogger){
            ConsoleLogger.consoleLogger=new ConsoleLogger();
        }
        return ConsoleLogger.consoleLogger;
    }
    private constructor(){};   

    log(...args: any[]): void {
        console.log(args);
    }
    error(...args: any[]): void {
        console.log(`Ошибка: ${args}`);
    }
    end(): void {
        console.log('Готово');
    }
}