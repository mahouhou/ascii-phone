export default function Animate() {
    const cols = 200
    const rows = 60
    const chars = 'Do the right thing.  '.split('')  
    // const colors = ['red', 'blue']
    const NUM_FRAMES = 5500

    const target = document.querySelectorAll('pre')[0]
    // const functions = [baseline, a, b, c]
    const functions = [baseline]

    let frame = 0
    let step = 0
    let t0
    let fun

    fun = functions[step]

    const loop = (t) => {

      const af = requestAnimationFrame(loop)

      if (this.state.onCall === false) {
        cancelAnimationFrame(af);
      }

      if (frame === 0) t0 = performance.now();

      fun(target, frame)
      frame++

      if (frame === NUM_FRAMES) {
        const elapsed = performance.now() - t0

        frame = 0
        step++

        if (step < functions.length) {
          fun = functions[step]
        } else {
          cancelAnimationFrame(af)
        }
      }
    }

    requestAnimationFrame(loop)

    // ---------------------------------------------------------------------

    // Unstyled; should run at 60fps
    // Direct write to innerHTML
    function baseline(target, frame) {
      let html = ''
      for (let j=0; j<rows; j++) {
        for (let i=0; i<cols; i++) {
          const idx = (i + j * rows + frame) % chars.length
          html += chars[idx]
        }
        html += '<br>'
      }
      target.innerHTML = html
    }

    // ---------------------------------------------------------------------

    // Every char is wrapped in a span, same style
    // Direct write to innerHTML
    // function a(target, frame) {
    //   let html = ''
    //   for (let j=0; j<rows; j++) {
    //     for (let i=0; i<cols; i++) {
    //       const idx = (i + j * rows + frame) % chars.length
    //       html += `<span>${chars[idx % chars.length]}</span>`
    //     }
    //     html += '<br>'
    //   }
    //   target.innerHTML = html
    // }

    // ---------------------------------------------------------------------

    // Every char is wrapped in a span, foreground and background change
    // Direct write to innerHTML
    // function b(target, frame) {
    //   let html = ''
    //   for (let j=0; j<rows; j++) {
    //     for (let i=0; i<cols; i++) {
    //       const idx = (i + j * rows + frame)
    //       const style = `color:${colors[idx % colors.length]};background-color:${colors[(idx+1) % colors.length]};`
    //       html += `<span style="${style}">${chars[idx % chars.length]}</span>`
    //     }
    //     html += '<br>'
    //   }
    //   target.innerHTML = html
    // }

    // ---------------------------------------------------------------------

    // Direct write to innerHTML of each span
    // Re-use of <spans>
    // const r = new Array(rows).fill(null).map(function(e) {
    //   const span = document.createElement('span')
    //   span.style.display = 'block'
    //   return span
    // })

    // function c(target, frame) {
    //   if (frame == 0) {
    //     target.innerHTML = ''
    //     for (let j=0; j<rows; j++) {
    //       target.appendChild(r[j])
    //     }
    //   }

    //   for (let j=0; j<rows; j++) {
    //     let html = ''
    //     for (let i=0; i<cols; i++) {
    //       const idx = (i + j * rows + frame)
    //       const style = `color:${colors[idx % colors.length]};background-color:${colors[(idx+1) % colors.length]};`
    //       html += `<span style="${style}">${chars[idx % chars.length]}</span>`
    //     }
    //     r[j].innerHTML = html
    //   }
    // }
  }
