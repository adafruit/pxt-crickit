input.buttonA.onEvent(ButtonEvent.Click, function () {
    light.showRing(
    "red red red red red red red red red red"
    )
    crickit.motor1.run(50)
    crickit.motor2.run(50)
    crickit.signal1.digitalWrite(true)
})
input.buttonB.onEvent(ButtonEvent.Click, function () {
    light.showRing(
    `blue blue blue blue blue blue blue blue blue blue`
    )
    crickit.motor1.run(-50)
    crickit.motor2.run(-50)
    crickit.signal2.digitalWrite(true)
})
light.showAnimation(light.rainbowAnimation, 500)
