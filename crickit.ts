
/**
 * CRICKIT board support
 */
//% weight=90 color="#03AA74" icon="\uf111"
namespace crickit {
    const dev = new seesaw.Seesaw();

    /**
     * A speed picker
     * @param speed the speed, eg: 50
     */
    //% blockId=motorSpeedPicker block="%speed" shim=TD_ID
    //% speed.min=-100 speed.max=100
    //% weight=0 blockHidden=1 speed.fieldOptions.decompileLiterals=1
    export function __speedPicker(speed: number): number {
        return speed;
    }

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
        //% blockId=sawmotorrun block="run %motor at %speed=motorSpeedPicker \\%"
        run(speed: number) {
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
        //% blockId=sawmotorstop block="stop %motor"
        stop() {
            this.run(0);
        }

        /**
         * Inverts the motor controls
         */
        //% group="Motors"
        //% blockId=sawmotorinverted block="set %motor inverted %inverted=toggleOnOff"
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
    export const motor1 = new Motor(1, [18, 19]);

    //% fixedInstance block="motor 2"
    export const motor2 = new Motor(2, [22, 23]);
}