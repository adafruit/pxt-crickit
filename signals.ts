namespace crickit {
    //% fixedInstances
    export class Signal {
        private _id: number;
        private _pin: number;

        constructor(id: number, pin: number) {
            this._id = id;
            this._pin = pin;
        }

        /**
         * set the signal
         */
        //% group="Signals"
        //% weight=100
        //% blockId=sawpinwrite block="crickit digital write %pin to %value=toggleHighLow"
        //% pin.fieldEditor="gridpicker"
        //% pin.fieldOptions.width=220
        //% pin.fieldOptions.columns=2
        digitalWrite(value: boolean) {
            const dev = saw();
            dev.pinMode(this._pin, 1);
            dev.digitalWrite(this._pin, value);
        }

        /**
         * Read a pin or connector as either 0 or 1
         * @param pin pin to read from
         */
        //% blockId=sawpinread block="crickit digital read pin %pin" blockGap=8
        //% pin.fieldEditor="gridpicker"
        //% pin.fieldOptions.width=220
        //% pin.fieldOptions.columns=2
        digitalRead(): boolean {
            const dev = saw();
            dev.pinMode(this._pin, 0);
            return dev.digitalRead(this._pin);
        }

        /**
         * Read a pin or connector as a value from 0 to 1023
         * @param pin pin to read from
         */
        //% blockId=sawpinreadanalog block="crickit analog read pin %pin" blockGap=8
        //% pin.fieldEditor="gridpicker"
        //% pin.fieldOptions.width=220
        //% pin.fieldOptions.columns=2
        analogRead(): number {
            const dev = saw();
            return dev.analogRead(this._pin);
        }
    }

    //% fixedInstance block="signal 1"
    export const signal1 = new Signal(1, 2);
    //% fixedInstance block="signal 2"
    export const signal2 = new Signal(2, 3);
    //% fixedInstance block="signal 3"
    export const signal3 = new Signal(3, 40);
    //% fixedInstance block="signal 4"
    export const signal4 = new Signal(4, 41);
    //% fixedInstance block="signal 5"
    export const signal5 = new Signal(5, 11);
    //% fixedInstance block="signal 6"
    export const signal6 = new Signal(6, 10);
    //% fixedInstance block="signal 7"
    export const signal7 = new Signal(7, 9);
    //% fixedInstance block="signal 8"
    export const signal8 = new Signal(8, 8);
}