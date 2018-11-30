namespace crickit {
    function createBufferFromArray(bytes: number[]) {
        let buf = pins.createBuffer(bytes.length)
        for (let i = 0; i < bytes.length; ++i)
            buf[i] = bytes[i]
        return buf
    }

    const _CRICKIT_NEOPIXEL_PIN = 27

    let brightness = 20;

    /**
     * Set the on-board pixel to a given color.
     * @param color RGB color of the LED
     */
    //% group="NeoPixel"
    //% blockId=sawsetpixelcolor block="crickit set pixel color %rgb=colorNumberPicker"
    //% weight=30
    //% blockGap=8
    export function setPixelColor(color: number): void {
        if (brightness < 255)
            color = fade(color, brightness);

        const offset = 0;
        const red = unpackR(color);
        const green = unpackG(color);
        const blue = unpackB(color);

        const dev = saw();
        const buffer: Buffer = createBufferFromArray([
            offset >> 8, offset & 0xff,
            green,
            red,
            blue
        ]);
        dev.neopixelSendBuffer(_CRICKIT_NEOPIXEL_PIN, buffer);
    }

    /**
     * Turns off the NeoPixel
     */
    //% group="NeoPixel"
    //% blockId=sawsetpixeloff block="crickit set pixel off"
    //% weight=29
    export function setPixelOff() {
        setPixelColor(0);
    }

    /**
     * Set the brightness of the neopixel. This flag only applies to future operations.
     * @param brightness a measure of LED brightness in 0-255. eg: 20
     */
    //% group="NeoPixel"
    //% blockId="sawsetbrightness" block="crickit set pixel brightness %brightness"
    //% weight=28
    //% brightness.min=0 brightness.max=255
    export function setPixelBrightness(brightness: number): void {
        brightness = Math.max(0, Math.min(0xff, brightness >> 0));
    }
    
    function rgb(red: number, green: number, blue: number): number {
        return ((red & 0xFF) << 16) | ((green & 0xFF) << 8) | (blue & 0xFF);
    }
    function fade(color: number, brightness: number): number {
        brightness = Math.max(0, Math.min(255, brightness >> 0));
        if (brightness < 255) {
            let red = unpackR(color);
            let green = unpackG(color);
            let blue = unpackB(color);

            red = (red * brightness) >> 8;
            green = (green * brightness) >> 8;
            blue = (blue * brightness) >> 8;

            color = rgb(red, green, blue);
        }
        return color;
    }
    function unpackR(rgb: number): number {
        let r = (rgb >> 16) & 0xFF;
        return r;
    }
    function unpackG(rgb: number): number {
        let g = (rgb >> 8) & 0xFF;
        return g;
    }
    function unpackB(rgb: number): number {
        let b = (rgb >> 0) & 0xFF;
        return b;
    }
}
