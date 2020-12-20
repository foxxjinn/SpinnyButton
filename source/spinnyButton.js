;(function(){
    
    class SpinnyButton {
        constructor(link, animationTimeSec = 1, revolutions = 1) {

            let currentTimeSec = 0
            let href = ''
            let blankLink
            let copyLink
            let buttonTopLeft
            let buttonCenter

            const body = document.querySelector('body')
            const bodyPaddingTop = parseFloat(window.getComputedStyle(body, null).paddingTop)
            const bodyPaddingLeft = parseFloat(window.getComputedStyle(body, null).paddingLeft)
            const bodyMarginTop = parseFloat(window.getComputedStyle(body, null).marginTop)
            const bodyMarginLeft = parseFloat(window.getComputedStyle(body, null).marginLeft)
             


            function lerp(initial, final, factor) {
                return initial + (final - initial) * factor
            }

            function animate() {
                if (currentTimeSec <= animationTimeSec) {
                    currentTimeSec += (1/60)
                    // V(t) = V(i) + (V(f) - V(i)) * (t / T)
                    const factor = currentTimeSec / animationTimeSec

                    let newButtonCenterX = lerp(buttonCenter.x, window.innerWidth / 2, factor) 
                    let newButtonCenterY = lerp(buttonCenter.y, window.innerHeight / 2, factor)
                    let translateX = newButtonCenterX - buttonCenter.x
                    let translateY = newButtonCenterY - buttonCenter.y

                    copyLink.style.transform = blankLink.style.transform =  `
                        translate(${translateX}px, ${translateY}px) 
                        rotate(0deg) 
                        scale(1, 1)
                    `

                    copyLink.style.opacity = lerp(1, 0, factor)

                    console.log(factor, translateX, translateY)
                    
                    requestAnimationFrame(animate)
                } else {
                    // load hyperlink
                }
            }

            if (link.tagName === 'A') {                   

                this.href = link.href
    
                link.href = ''

                link.addEventListener('click', (e) => {
                    e.preventDefault()

                    buttonTopLeft = {
                        x: link.getBoundingClientRect().left - (bodyPaddingLeft + bodyMarginLeft),
                        y: link.getBoundingClientRect().top - (bodyPaddingTop + bodyMarginTop),
                    }
            
                    buttonCenter = {
                        x: buttonTopLeft.x + (link.getBoundingClientRect().width / 2),
                        y: buttonTopLeft.y + (link.getBoundingClientRect().height /2)
                    }
                    
                    copyLink = link.cloneNode(true)
                    copyLink.style.pointerEvents = 'none'
                    link.style.pointerEvents = 'none'
                    link.style.opacity = 0
                    copyLink.style.position = 'fixed'
        
                    copyLink.style.top = `${buttonTopLeft.y}px`
                    copyLink.style.left = `${buttonTopLeft.x}px`
                    copyLink.style.background = 'blue'
        
                    blankLink = copyLink.cloneNode(true)
                    blankLink.style.background = 'green'
                    blankLink.style.borderColor = 'green'
                    // blankLink.style.transform = "rotate(50deg)"
                        
                    document.querySelector('body').appendChild(blankLink)
                    document.querySelector('body').appendChild(copyLink)
        
                    requestAnimationFrame(animate)        

                    
                }) 


            } else {
                throw new TypeError('SpinnyButton only accepts HTML link')
            }
        } // end of constructor


    }

            /*
                Listen for click
                If Clicked, Start Animation
                When Animation ends, load href
            */

    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

        // AMD. Register as an anonymous module.
        define(function() {
          return SpinnyButton;
        });
      } else if (typeof module !== 'undefined' && module.exports) {
            module.exports = SpinnyButton;
            module.exports.SpinnyButton = SpinnyButton;
      } else {
            window.SpinnyButton = SpinnyButton;
      }
}());