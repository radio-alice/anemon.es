import Rellax from 'rellax'
import Tone from 'tone'
import throttle from 'lodash.throttle'
new Rellax('.rellax')

const limiter = new Tone.Limiter(-20).toMaster()
const synth = new Tone.PolySynth(4, Tone.Synth, {
  oscillator: {
    type: 'fattriangle',
    partials: [0, 2, 3, 4],
    partialCount: 2,
    spread: 60,
    count: 10
  },
  envelope: {
    attack: 0.2,
    decay: 0.1,
    sustain: 1,
    release: 3
  }
})
const ppDelay = new Tone.PingPongDelay(0.5, 0.5).connect(limiter)
synth.connect(ppDelay)

const arpA = new Tone.Pattern(
  (time, note) => {
    synth.triggerAttackRelease(note, 0.5, time)
  },
  ['D4', 'C4', 'G3', 'E3', 'D3', 'C3'],
  'random'
)
arpA.playbackRate = 1
arpA.start(1)
Tone.Transport.start()

window.addEventListener(
  'scroll',
  throttle(() => {
    let speed = checkScrollSpeed()
    arpA.playbackRate = Math.sqrt(speed)
    setTimeout(() => {
      arpA.playbackRate = 0
    }, 500)
  }, 200)
)

const checkScrollSpeed = (() => {
  var lastPos, newPos, delta
  const maxScroll = document.body.scrollHeight

  const clear = () => {
    lastPos = null
    delta = 0
  }

  clear()

  return () => {
    newPos = window.scrollY
    if (lastPos != null) {
      delta = Math.abs(newPos - lastPos)
    }
    lastPos = newPos

    if (delta < 30 || newPos > maxScroll - 800 || newPos < 1) {
      delta = 0
    }
    return delta
  }
})()
