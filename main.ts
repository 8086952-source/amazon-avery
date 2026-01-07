input.onButtonPressed(Button.A, function () {
    Passcode = "" + Passcode + "A"
})
input.onButtonPressed(Button.B, function () {
    Passcode = "" + Passcode + "B"
})
let Passcode = ""
basic.clearScreen()
servos.P0.setAngle(0)
Passcode = ""
pins.digitalWritePin(DigitalPin.P1, 0)
basic.forever(function () {
    if (Passcode.length == 4) {
        if (Passcode == "BABA") {
            for (let index = 0; index < 5; index++) {
                basic.clearScreen()
                basic.showLeds(`
                    # . # . .
                    . # # # .
                    . . # . #
                    . # . # .
                    # . . . #
                    `)
                basic.pause(200)
                basic.showLeds(`
                    . . # . #
                    . # # # .
                    # . # . .
                    . # . # .
                    . # . # .
                    `)
                basic.pause(200)
            }
            basic.clearScreen()
            servos.P0.setAngle(90)
            while (pins.digitalReadPin(DigitalPin.P1) != 1) {
                pins.digitalWritePin(DigitalPin.P2, 1)
                basic.pause(500)
                pins.digitalWritePin(DigitalPin.P2, 0)
                basic.pause(500)
                pins.digitalWritePin(DigitalPin.P2, 1)
                basic.pause(500)
                pins.digitalWritePin(DigitalPin.P2, 0)
                basic.pause(500)
            }
            basic.pause(5000)
            servos.P0.setAngle(0)
            if (pins.digitalReadPin(DigitalPin.P1) == 1) {
                pins.digitalWritePin(DigitalPin.P2, 1)
                servos.P0.setAngle(90)
                basic.pause(5000)
                servos.P0.setAngle(0)
            }
            Passcode = ""
        } else {
            basic.clearScreen()
            music.play(music.tonePlayable(988, music.beat(BeatFraction.Whole)), music.PlaybackMode.InBackground)
            basic.showLeds(`
                . # . # .
                . # . # .
                . . . . .
                . # # # .
                # . . . #
                `)
            basic.pause(2000)
            basic.clearScreen()
            Passcode = ""
        }
    }
    if (pins.digitalReadPin(DigitalPin.P1) == 0) {
        pins.digitalWritePin(DigitalPin.P2, 0)
    }
})
