;(function(){
    
    let currentTimeSec = 0
    let href
    let blankLink
    let copyLink
    let buttonTopLeft
    let buttonCenter
    let animationTimeSec
    let revolutions
    let buttonSize
    let maxScale
    let linkColor


    const body = document.querySelector('body')
    const bodyPaddingTop = parseFloat(window.getComputedStyle(body, null).paddingTop)
    const bodyPaddingLeft = parseFloat(window.getComputedStyle(body, null).paddingLeft)
    const bodyMarginTop = parseFloat(window.getComputedStyle(body, null).marginTop)
    const bodyMarginLeft = parseFloat(window.getComputedStyle(body, null).marginLeft)
    

    function spinnyButton (link, seconds = 1, numRevolutions = 1) {

        if (link.tagName === 'A') {                   

            href = link.href
            link.href = ''

            animationTimeSec = seconds
            revolutions = numRevolutions

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

                buttonSize = {
                    width: link.getBoundingClientRect().width,
                    height: link.getBoundingClientRect().height
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

                // Set MaxScale 110% larger than largest viewpoint parameter
                if (window.innerWidth <= window.innerHeight) {
                    maxScale = (window.innerWidth / buttonSize.width) * 1.1
                } else {
                    maxScale = (window.innerHeight / buttonSize.height) * 1.1
                }

                // returns 'rbg(###, ###, ###)' slice to get '###, ###, ###' ; split to get [###, ###, ###]
                let backgroundRGB = getComputedStyle(link, null).backgroundColor.slice(4,-1).split(',')
                let textRGB = getComputedStyle(link, null).color.slice(4, -1).split(',')

                linkColor = {
                    backgroundR: Number(backgroundRGB[0]),
                    backgroundG: Number(backgroundRGB[1]),
                    backgroundB: Number(backgroundRGB[2]),
                    textR: Number(textRGB[0]),
                    textG: Number(textRGB[1]),
                    textB: Number(textRGB[2]),
                }
    
                requestAnimationFrame(animate)        
            }) 


        } else {
            throw new TypeError('SpinnyButton only accepts HTML link')
        }
    }

    function animate() {
        if (currentTimeSec <= animationTimeSec) {
            currentTimeSec += (1/60)
            // V(t) = V(i) + (V(f) - V(i)) * (t / T)
            const factor = currentTimeSec / animationTimeSec

            // Calculate Translation
            let newButtonCenterX = lerp(buttonCenter.x, window.innerWidth / 2, factor) 
            let newButtonCenterY = lerp(buttonCenter.y, window.innerHeight / 2, factor)
            let translateX = newButtonCenterX - buttonCenter.x
            let translateY = newButtonCenterY - buttonCenter.y

            // Caculate Rotation
            let degrees = lerp(0, revolutions * 360, factor)

            // Caculate Scale
            let scale = lerp(1, maxScale, factor)

            // Update everything
            copyLink.style.transform = blankLink.style.transform =  `
                translate(${translateX}px, ${translateY}px) 
                rotate(${degrees}deg) 
                scale(${scale}, ${scale})
            `

            copyLink.style.backgroundColor = blankLink.style.backgroundColor =
                `rgb(${lerp(linkColor.backgroundR, 0, factor)}, ${lerp(linkColor.backgroundG, 0, factor)}, ${lerp(linkColor.backgroundB, 0, factor)})`

            copyLink.style.color = blankLink.style.color =
                `rgb(${lerp(linkColor.textR, 0, factor)}, ${lerp(linkColor.textG, 0, factor)}, ${lerp(linkColor.textB, 0, factor)})`
         
            copyLink.style.opacity = lerp(1, 0, factor)
            
            requestAnimationFrame(animate)
        } else {
            console.log('hi ' + href)
            window.location.href = href
        }
    }

    function lerp(initial, final, factor) {
        return initial + (final - initial) * factor
    }

    // Export spinnyButton Function
    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

        // AMD. Register as an anonymous module.
        define(function() {
          return spinnyButton;
        });
      } else if (typeof module !== 'undefined' && module.exports) {
            module.exports = spinnyButton;
            module.exports.spinnyButton = spinnyButton;
      } else {
            window.spinnyButton = spinnyButton;
      }
}());