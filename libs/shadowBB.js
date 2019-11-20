// by Zach (zach@anemon.es)
// do whatever you want with this
// make sure the element's width and height are only as big as the text
// (e.g. width: max-content)

const getElementLocation = element => {
  const { top, left, width, height } = element.getBoundingClientRect()
  return {
    x: left + width / 2,
    y: top + height / 2
  }
}

const getMousePosition = e => ({
  x: e.clientX,
  y: e.clientY
})
const getDistanceToElement = (e, elementLocation) => {
  const mousePosition = getMousePosition(e)
  return {
    x: mousePosition.x - elementLocation.x,
    y: mousePosition.y - elementLocation.y
  }
}

const adjustOffsets = distance => {
  const magnitude = Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2))

  return {
    x: distance.x / magnitude,
    y: distance.y / magnitude
  }
}

// could convert to ES6 module here
const applyShadow = (event, element, color, scalar) => {
  const elementLocation = getElementLocation(element)
  const { x, y } = adjustOffsets(getDistanceToElement(event, elementLocation))
  element.style.textShadow = `${x * scalar}px ${y * scalar}px ${color}`
}
