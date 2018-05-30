namespace crickit {

    //% fixedInstances
    export class Touch {
        private _id: number;
        private _pin: number;

        constructor(id: number, pin: number) {
            this._id = id;
            this._pin = pin;
        }

        /**
         * Read a touch pin as a value from 0 to 1023
         * @param pin pin to read from
         */
        //% group="Touch"
        //% blockId=sawtouchread block="crickit touch read pin %pin" blockGap=8
        //% pin.fieldEditor="gridpicker"
        //% pin.fieldOptions.width=220
        //% pin.fieldOptions.columns=2
        touchRead(): number {
            const dev = saw();
            return dev.touchRead(this._pin);
        }
    }

    //% fixedInstance block="touch 1"
    export const touch1 = new Touch(1, 0);
    //% fixedInstance block="touch 2"
    export const touch2 = new Touch(2, 1);
    //% fixedInstance block="touch 3"
    export const touch3 = new Touch(3, 2);
    //% fixedInstance block="touch 4"
    export const touch4 = new Touch(4, 3);
}