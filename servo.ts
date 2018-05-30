namespace crickit {
    const SERVO_DC_MIN = 3277;
    const SERVO_DC_MAX = 6554;

    //% fixedInstances
    export class Servo {
        private _id: number;
        private _pin: number;

        constructor(id: number, pin: number) {
            this._id = id;
            this._pin = pin;
        }

        /**
         * set the servo angle
         */
        //% group="Servos"
        //% weight=100
        //% blockId=sawservosetangle block="crickit set %pin angle to %value=number"
        //% value.min=0 value.max=180
        //% pin.fieldEditor="gridpicker"
        //% pin.fieldOptions.width=220
        //% pin.fieldOptions.columns=2
        setAngle(value: number) {
            const dev = saw();
            value = value | 0;
            value = Math.clamp(0, 180, value);
            value = Math.map(value, 0, 180, SERVO_DC_MIN, SERVO_DC_MAX);
            value = Math.clamp(SERVO_DC_MIN, SERVO_DC_MAX, value);
            dev.setPwmFreq(this._pin, 50);
            dev.analogWrite(this._pin, value);
        }
    }

    //% fixedInstance block="servo 1"
    export const servo1 = new Servo(1, 17);
    //% fixedInstance block="servo 2"
    export const servo2 = new Servo(2, 16);
    //% fixedInstance block="servo 3"
    export const servo3 = new Servo(3, 15);
    //% fixedInstance block="servo 4"
    export const servo4 = new Servo(4, 14);
}