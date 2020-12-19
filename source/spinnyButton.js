;(function(){
    
    // const SpinButton = function(href, animationTime, revolutions) {
    //     this.href = href
    //     this.animationTime = animationTime
    //     this.revolutions = revolutions 
    // }

            /*
                Listen for click
                If Clicked, Start Animation
                When Animation ends, load href
            */

    function spinnyButton(link, animationTime = 1, revolutions = 1) {
        if (link.tagName === 'A') {   
            const href = link.href

            link.href = ''

            link.addEventListener('click', (e)=> {
                const copyLink = link.cloneNode(true)
                copyLink.style.pointerEvents = 'none'
                link.style.pointerEvents = 'none'
                link.style.opacity = 0
                copyLink.style.position = 'fixed'

                const body = document.querySelector('body')
                const bodyPaddingTop = parseFloat(window.getComputedStyle(body, null).paddingTop)
                const bodyPaddingLeft = parseFloat(window.getComputedStyle(body, null).paddingLeft)
                const bodyMarginTop = parseFloat(window.getComputedStyle(body, null).marginTop)
                const bodyMarginLeft = parseFloat(window.getComputedStyle(body, null).marginLeft)

                copyLink.style.top = `${link.getBoundingClientRect().top - (bodyPaddingTop + bodyMarginTop)}px`
                copyLink.style.left = `${link.getBoundingClientRect().left - (bodyPaddingLeft + bodyMarginLeft)}px`
                console.log(copyLink.style.top, copyLink.style.left)
                copyLink.style.background = 'blue'
                document.querySelector('body').appendChild(copyLink)
                e.preventDefault()
            })

            

        } else {
            throw new TypeError('SpinnyButton only accepts HTML link')
        }
    }

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