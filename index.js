import Rellax from 'rellax'
new Rellax('.rellax')

import Tone from 'Tone'

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
    decay: 0.01,
    sustain: 1,
    release: 4
  }
})
const ppDelay = new Tone.PingPongDelay(0.5, 0.5).toMaster()
synth.connect(ppDelay)
const arpA = new Tone.Pattern(
  (time, note) => {
    synth.triggerAttackRelease(note, 0.5, time)
  },
  ['D4', 'C4', 'G3', 'E3', 'D3', 'C3'],
  'upDown'
)
arpA.playbackRate = 0
arpA.start(0)
Tone.Transport.start()

window.onscroll = () => {
  arpA.playbackRate = Math.sqrt(checkScrollSpeed()) * 2
}

const checkScrollSpeed = (() => {
  var lastPos,
    newPos,
    timer,
    delta,
    delay = 30
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
    clearTimeout(timer)
    timer = setTimeout(clear, delay)

    if (delta < 3 || newPos > maxScroll - 800 || newPos < 1) {
      delta = 0
    }
    return delta
  }
})()
