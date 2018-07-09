namespace crickit {

    const stepperPins = [19, 22, 18, 23]
    const driveStepperPins = [13, 12, 43, 42]

    const _CRICKIT_STEPPER_TYPE_SINGLE = 0
    const _CRICKIT_STEPPER_TYPE_DOUBLE = 1
    const _CRICKIT_STEPPER_TYPE_INTERLEAVE = 2

    let stepType = _CRICKIT_STEPPER_TYPE_DOUBLE
    let stepIndex = -1
    let stepperInitialized = 0

    let driveStepType = _CRICKIT_STEPPER_TYPE_DOUBLE
    let driveStepIndex = -1
    let driveStepperInitialized = 0

    const stepWaves = [
        [[0xFFFF, 0x0000, 0x0000, 0x0000], //single
        [0x0000, 0xFFFF, 0x0000, 0x0000],
        [0x0000, 0x0000, 0xFFFF, 0x0000],
        [0x0000, 0x0000, 0x0000, 0xFFFF]],

        [[0xFFFF, 0x0000, 0x0000, 0xFFFF], //double
        [0xFFFF, 0xFFFF, 0x0000, 0x0000],
        [0x0000, 0xFFFF, 0xFFFF, 0x0000],
        [0x0000, 0x0000, 0xFFFF, 0xFFFF]],

        [[0xFFFF, 0x0000, 0x0000, 0xFFFF], //interleave
        [0xFFFF, 0x0000, 0x0000, 0x0000],
        [0xFFFF, 0xFFFF, 0x0000, 0x0000],
        [0x0000, 0xFFFF, 0x0000, 0x0000],
        [0x0000, 0xFFFF, 0xFFFF, 0x0000],
        [0x0000, 0x0000, 0xFFFF, 0x0000],
        [0x0000, 0x0000, 0xFFFF, 0xFFFF],
        [0x0000, 0x0000, 0x0000, 0xFFFF]]
    ]

    /**
     * Move the stepper motor a number of steps. Positive 
     * numbers move the motor in one direction, while negative numbers move the motor in the opposite direction.
     */
    //% group="Stepper"
    //% blockId=sawstep block="crickit stepper move %count steps"
    //% weight=100
    //% blockGap=8
    //% count.defl=10
    export function step(count: number): void {
        const dev = saw()
        count = count | 0
        if(!stepperInitialized){
            for(let i=0; i<4; i++){
                dev.setPwmFreq(stepperPins[i], 2000)
            }
            stepperInitialized = 1
        }
        let inc = 1
        if(count < 0) inc = -1
        for(let c = Math.abs(count); c>0; c--){
            stepIndex = (stepIndex + inc)
            if(stepIndex < 0) stepIndex = stepWaves[stepType].length - 1
            else if(stepIndex >= stepWaves[stepType].length) stepIndex = 0
            for(let j=0; j<4; j++){
                dev.analogWrite(stepperPins[j], stepWaves[stepType][stepIndex][j])
            }
            if(stepType == 0){
                pause(10)
            }
        }
    }

    /**
     * Move the stepper motor on the drive pins a number of steps. Positive 
     * numbers move the motor in one direction, while negative numbers move the motor in the opposite direction.
     */
    //% group="Drive Stepper"
    //% blockId=sawdrivestep block="crickit drive stepper move %count steps"
    //% weight=100
    //% blockGap=8
    //% count.defl=10
    export function driveStep(count: number): void {
        const dev = saw()
        count = count | 0
        if(!driveStepperInitialized){
            for(let i=0; i<4; i++){
                dev.setPwmFreq(driveStepperPins[i], 2000)
            }
            driveStepperInitialized = 1
        }
        let inc = 1
        if(count < 0) inc = -1
        for(let c = Math.abs(count); c>0; c--){
            driveStepIndex = (driveStepIndex + inc)
            if(driveStepIndex < 0) driveStepIndex = stepWaves[driveStepType].length - 1
            else if(driveStepIndex >= stepWaves[driveStepType].length) driveStepIndex = 0
            for(let j=0; j<4; j++){
                dev.analogWrite(driveStepperPins[j], stepWaves[driveStepType][driveStepIndex][j])
            }
            if(driveStepIndex == 0){
                pause(10)
            }
        }
    }

    export function setStepType(type: number): void {
        if(type <= _CRICKIT_STEPPER_TYPE_INTERLEAVE){
            stepType = type
        }
    }

    export function setDriveStepType(type: number): void{
        if(type <= _CRICKIT_STEPPER_TYPE_INTERLEAVE){
            driveStepType = type
        }
    }

    export function release(): void {
        const dev = saw()
        for(let i=0; i<4; i++){
            dev.analogWrite(stepperPins[i], 0)
        }
    }
}
