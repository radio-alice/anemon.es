import Rellax from 'rellax'
import {
  Limiter,
  PolySynth,
  PingPongDelay,
  Synth,
  Pattern,
  Transport
} from 'tone'
import throttle from 'lodash.throttle'
new Rellax('.rellax')

const limiter = new Limiter(-20).toMaster()
const synth = new PolySynth(4, Synth, {
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
const ppDelay = new PingPongDelay(0.5, 0.5).connect(limiter)
synth.connect(ppDelay)
let arpA
document.getElementById('tones').addEventListener('click', () => {
  arpA = new Pattern(
    (time, note) => {
      synth.triggerAttackRelease(note, 0.5, time)
    },
    ['D4', 'C4', 'G3', 'E3', 'D3', 'C3'],
    'random'
  )
  arpA.playbackRate = 0
  arpA.start(1)
  Transport.start()
  document.getElementById('tones').remove()

  window.addEventListener(
    'scroll',
    throttle(() => {
      let speed = checkScrollSpeed()
      arpA.playbackRate = Math.sqrt(speed)
      setTimeout(() => {
        arpA.playbackRate = 0
      }, 400)
    }, 200)
  )
})

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
