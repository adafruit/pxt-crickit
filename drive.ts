namespace crickit {
    export const CRICKIT_PWM_MIN = 0;
    export const CRICKIT_PWM_MAX = 65535;

    //% fixedInstances
    export class Drive {
        private _id: number;
        private _pin: number;

        constructor(id: number, pin: number) {
            this._id = id;
            this._pin = pin;
        }

        /**
         * set the drive duty cycle
         */
        //% group="Drives"
        //% weight=100
        //% blockId=driveanalogwrite block="analog write pin %pin to %value"
        //% value.min=0 value.max=1023
        //% pin.fieldEditor="gridpicker"
        //% pin.fieldOptions.width=220
        //% pin.fieldOptions.columns=2
        analogWrite(value: number) {
            const dev = saw();
            value = value | 0;
            value = Math.clamp(0, 1023, value);
            value = Math.map(value, 0, 1023, CRICKIT_PWM_MIN, CRICKIT_PWM_MAX);
            value = Math.clamp(CRICKIT_PWM_MIN, CRICKIT_PWM_MAX, value);
            dev.analogWrite(this._pin, value);
        }

        /**
         * set the drive frequency
         */
        //% group="Drives"
        //% weight=10
        //% blockId=drivesetfreq block="crickit set %pin frequency to %value"
        //% value.min=0 value.max=2000
        //% pin.fieldEditor="gridpicker"
        //% pin.fieldOptions.width=220
        //% pin.fieldOptions.columns=2
        setFrequency(value: number) {
            const dev = saw();
            value = Math.clamp(0, 2000, value);
            dev.setPwmFreq(this._pin, value);
        }
    }

    //% fixedInstance block="drive 1"
    export const drive1 = new Drive(1, 13);
    //% fixedInstance block="drive 2"
    export const drive2 = new Drive(2, 12);
    //% fixedInstance block="drive 3"
    export const drive3 = new Drive(3, 43);
    //% fixedInstance block="drive 4"
    export const drive4 = new Drive(4, 42);
}