

export const hsv2rgb = (h, s, v) => { 
  h = boundValue(h, 360)
  s = boundValue(s * 100, 100)
  v = boundValue(v * 100, 100)

  const i = ~~(h*6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)
  let r = 0,g = 0,b = 0;
    switch(i % 6){
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

  const round = (value) => Math.round(value * 255)

  return {
    r: round(r),
    g: round(g),
    b: round(b)
  }
}

function boundValue(value, max) {
  value = Math.min(max, Math.max(0, value))
  if ((Math.abs(value - max) < 0.000001)) {
    return 1
  }
  return (value % max) / (~~max)
}

export const rgb2hsv = (r, g, b) => {
  r = boundValue(r, 255)
  g = boundValue(g, 255)
  b = boundValue(b, 255)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s
  let v = max

  const d = max - min
  s = max === 0 ? 0 : d / max

  if (max === min) {
    h = 0
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return {
    h: h * 360,
    s: s,
    v: v
  }
}

export const rgb2Hex = (r, g, b) => {
	let o = (r << 16 | g << 8 | b).toString(16)
	return o.length < 6 ? ("#".concat("0".repeat(6 - o.length)).concat(o)):"#".concat(o);
}


export default {
	hsv2rgb,
	rgb2hsv,
	rgb2Hex
}