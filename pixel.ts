namespace crickit {
    const _CRICKIT_NEOPIXEL_PIN = 27

    let brightness = 20;

    /**
     * Set the on-board pixel to a given color.
     * @param color RGB color of the LED
     */
    //% group="NeoPixel"
    //% blockId=sawsetpixelcolor block="crickit set color %rgb=colorNumberPicker"
    //% weight=99
    //% blockGap=8
    export function setColor(color: number): void {
        if (brightness < 255)
            color = fade(color, brightness);

        let red = unpackR(color);
        let green = unpackG(color);
        let blue = unpackB(color);

        const dev = saw();

        const buffer: Buffer = pins.createBufferFromArray([
            0,
            5,
            green,
            red,
            blue]);
        dev.neopixelSendBuffer(_CRICKIT_NEOPIXEL_PIN, buffer);
    }

    /**
     * Set the brightness of the neopixel. This flag only applies to future operations.
     * @param brightness a measure of LED brightness in 0-255. eg: 20
     */
    //% group="NeoPixel"
    //% blockId="pixel_set_brightness" block="set brightness %brightness"
    //% weight=98
    //% parts="pixel"
    //% brightness.min=0 brightness.max=255
    export function setBrightness(brightness: number): void {
        brightness = Math.max(0, Math.min(0xff, brightness >> 0));
    }

    /**
     * Converts red, green, blue channels into a RGB color
     * @param red value of the red channel between 0 and 255. eg: 255
     * @param green value of the green channel between 0 and 255. eg: 255
     * @param blue value of the blue channel between 0 and 255. eg: 255
     */
    //% group="NeoPixel"
    //% blockId=sawpixelrgb block="red %red|green %green|blue %blue"
    //% red.min=0 red.max=255 green.min=0 green.max=255 blue.min=0 blue.max=255
    //% weight=19
    //% blockGap=8
    export function rgb(red: number, green: number, blue: number): number {
        return ((red & 0xFF) << 16) | ((green & 0xFF) << 8) | (blue & 0xFF);
    }

    /**
     * Fade the color by the brightness
     * @param color color to fade
     * @param brightness the amount of brightness to apply to the color, eg: 128
     */
    //% group="NeoPixel"
    //% blockId=sawpixelfade block="fade %color=pixel_colors|by %brightness"
    //% brightness.min=0 brightness.max=255
    //% weight=18
    //% blockGap=8
    export function fade(color: number, brightness: number): number {
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