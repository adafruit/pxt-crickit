/**
 * CRICKIT board support
 */
//% weight=90 color="#03AA74" icon="\uf111"
//% groups='["Motors", "Signals"]'
namespace crickit {
    const _ADC_INPUT_0_PIN_CRICKIT = 2
    const _ADC_INPUT_1_PIN_CRICKIT = 3
    const _ADC_INPUT_2_PIN_CRICKIT = 40
    const _ADC_INPUT_3_PIN_CRICKIT = 41
    const _ADC_INPUT_4_PIN_CRICKIT = 11
    const _ADC_INPUT_5_PIN_CRICKIT = 10
    const _ADC_INPUT_6_PIN_CRICKIT = 9
    const _ADC_INPUT_7_PIN_CRICKIT = 8
    const _CRICKIT_S4 = 14
    const _CRICKIT_S3 = 15
    const _CRICKIT_S2 = 16
    const _CRICKIT_S1 = 17
    const _CRICKIT_M1_A1 = 18
    const _CRICKIT_M1_A2 = 19
    const _CRICKIT_M1_B1 = 22
    const _CRICKIT_M1_B2 = 23
    const _CRICKIT_DRIVE1 = 42
    const _CRICKIT_DRIVE2 = 43
    const _CRICKIT_DRIVE3 = 12
    const _CRICKIT_DRIVE4 = 13
    const _CRICKIT_CT1 = 0
    const _CRICKIT_CT2 = 1
    const _CRICKIT_CT3 = 2
    const _CRICKIT_CT4 = 3

    const crickitPinmap = new seesaw.SeesawPinmap()
    crickitPinmap.analogPins = [_ADC_INPUT_0_PIN_CRICKIT, _ADC_INPUT_1_PIN_CRICKIT, _ADC_INPUT_2_PIN_CRICKIT, _ADC_INPUT_3_PIN_CRICKIT, _ADC_INPUT_4_PIN_CRICKIT, _ADC_INPUT_5_PIN_CRICKIT, _ADC_INPUT_6_PIN_CRICKIT, _ADC_INPUT_7_PIN_CRICKIT]
    crickitPinmap.pwmWidth = 16
    crickitPinmap.pwmPins = [_CRICKIT_S4, _CRICKIT_S3, _CRICKIT_S2, _CRICKIT_S1, _CRICKIT_M1_A1, _CRICKIT_M1_A2, _CRICKIT_M1_B1, _CRICKIT_M1_B2, _CRICKIT_DRIVE1, _CRICKIT_DRIVE2, _CRICKIT_DRIVE3, _CRICKIT_DRIVE4]
    crickitPinmap.touchPins = [_CRICKIT_CT1, _CRICKIT_CT2, _CRICKIT_CT3, _CRICKIT_CT4]

    let _dev: seesaw.Seesaw;
    export function saw(): seesaw.Seesaw {
        if (!_dev)
            _dev = new seesaw.Seesaw(crickitPinmap);
        return _dev;
    }
}