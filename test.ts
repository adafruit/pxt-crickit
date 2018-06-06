for (let i = 0; i < 100; ++i) {
    crickit.motor1.run(50)
    crickit.motor2.run(50)
    crickit.signal1.digitalWrite(true)
    basic.pause(500)
    crickit.motor1.run(-50)
    crickit.motor2.run(-50)
    crickit.signal2.digitalWrite(true)
    basic.pause(500)
}