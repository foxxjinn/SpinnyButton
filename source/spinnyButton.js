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
        console.log(link.tagName)
        if (link.tagName === 'A') {   
            const href = link.href
            console.log(href)

            link.href = ''

            link.addEventListener('click', (e)=> {
                const copyLink = link.cloneNode(true)
                copyLink.style.pointerEvents = 'none'
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