namespace crickit {
    //% fixedInstances
    export class Motor {
        private _id: number;
        private _pins: number[];

        private _inverted: boolean;

        constructor(id: number, pins: number[]) {
            this._id = id;
            this._pins = pins;
            this._inverted = false;
        }

        /**
         * Runs the motor at the given speed
         */
        //% group="Motors"
        //% weight=100
        //% blockId=sawmotorrun block="crickit run %motor at %speed=speedPicker \\%"
        //% blockGap=8
        run(speed: number) {
            const dev = saw();
            speed = Math.clamp(-100, 100, speed);
            let pwm = Math.abs((speed * (1 << 15) / 100) | 0);
            if (speed > 0) {
                dev.analogWrite(this._pins[0], 0);
                dev.analogWrite(this._pins[1], pwm);
            } else {
                dev.analogWrite(this._pins[0], pwm);
                dev.analogWrite(this._pins[1], 0);
            }
        }

        /**
         * Stops the motor
         */
        //% group="Motors"
        //% weight=99
        //% blockId=sawmotorstop block="crickit stop %motor"
        stop() {
            this.run(0);
        }

        /**
         * Inverts the motor controls
         */
        //% group="Motors"
        //% blockId=sawmotorinverted block="crickit set %motor inverted %inverted=toggleOnOff"
        setInverted(inverted: boolean) {
            if (this._inverted != inverted) {
                const tmp = this._pins[0];
                this._pins[0] = this._pins[1];
                this._pins[1] = tmp;
                this._inverted = inverted;
            }
        }
    }

    //% fixedInstance block="motor 1"
    export const motor1 = new Motor(1, [22, 23]);

    //% fixedInstance block="motor 2"
    export const motor2 = new Motor(2, [18, 19]);

    /**
     * Make a robot drive forward, backward, turn, or stop. 
     * @param speedLeft the speed on the left motor, eg: 50
     * @param speedRight the speed on the right motor, eg: 50
     */
    //% blockId=crickitmotortank block="crickit tank %speed1=speedPicker|\\% %speed2=speedPicker|\\%"
    //% weight=96
    //% group="Motors"
    export function tank(speed1: number, speed2: number) {
        crickit.motor1.run(speed1);
        crickit.motor2.run(speed2);
    }
}