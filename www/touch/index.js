window.touch = {
    drag: {
        start: { x:0, y:0 }, 
        offset: { x:0, y:0 },      
        threshold: 86
    },
    event: '',
    ghost: 0,
    press: null,
    timer: null,
    now: 0,
    then: 0,
    touches: null,
    handler: (event,type=event.type) => { //console.log({type});
        if (type === "touchstart") { console.clear();
            touch.touches = event.touches; 
            touch.now = new Date().getTime(), touch.then = touch.now - touch.ghost;
            touch.drag.offset.x = this.offsetLeft, touch.drag.offset.y = this.offsetTop;
            touch.drag.start.x = touch.touches[0].pageX, touch.drag.start.y = touch.touches[0].pageY;
            if((touch.then < 300) && (touch.then > 0)) { 
                touch.event = 'dbl';
                clearTimeout(touch.timer); touch.timer = null; 
                touch.events(event.target,touch.event);
            }
            touch.press = setTimeout(() => {
                touch.event= ["dragstart", "dragmove"].includes(touch.event) ? 'dragmove' : 'dragstart';
                clearTimeout(touch.press); touch.press = null; 
                clearTimeout(touch.timer); touch.timer = null; 
                touch.event = "hold"; touch.events(event.target,touch.event);
            }, 500);
        }
        else if (type === "touchmove") {
            var moveX = event.touches[0].pageX, moveY = event.touches[0].pageY;
            var origX = touch.drag.start.x, origY = touch.drag.start.y;
            var dragMove = Math.abs(touch.drag.start - moveX);
            var a = Math.abs(touch.drag.start.x - moveX), b = Math.abs(touch.drag.start.y - moveY), c = Math.sqrt( a*a + b*b );            
            var dragging = c > touch.drag.threshold;
            if(dragging) {
                console.log({c,dragging})
                touch.event= ["dragstart", "dragmove"].includes(touch.event) ? 'dragmove' : 'dragstart';
                clearTimeout(touch.press); touch.press = null;
                clearTimeout(touch.timer); touch.timer = null; 
                touch.events(event.target,touch.event);
            }
        }
        else if (type == "touchend") {

                if(["dragstart","dragmove"].includes(touch.event)) {

                    clearTimeout(touch.press); touch.press = null;
                    clearTimeout(touch.timer); touch.timer = null;                    
                    touch.event = 'dragend'; touch.events(event.target,touch.event);
                                    
                } else {
        
                    if(touch.then===0 || touch.then > 300) { 
                            if(touch.event==="hold") {
                                clearTimeout(touch.press); touch.press = null;
                                clearTimeout(touch.timer); touch.timer = null;
                                //touch.events(event.target,touch.event);
                                touch.event = null;
                            } else {
                                touch.timer = setTimeout(() => { 
                                    touch.event = 'tap';                 
                                    clearTimeout(touch.press); touch.press = null;       
                                    clearTimeout(touch.timer); touch.timer = null; 
                                    touch.events(event.target,touch.event);
                                }, 300);
                            }

                    }

                }

            touch.ghost = touch.now;
            clearTimeout(touch.press); touch.press = null;
        }
    },
    events: (target,t,type=t?t:'tap') => { 
      document.body.dataset.touch = type;      
      target.type === 'text' ? target.focus() : document.activeElement.blur();
    }
}