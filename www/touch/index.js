if('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) { registration.unregister(); }
    navigator.serviceWorker.register('sw.js');
  });
}
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
        if (type === "touchstart") {
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
                clearTimeout(touch.press); touch.press = null; 
                clearTimeout(touch.timer); touch.timer = null; 
                touch.event = "hold"; touch.events(event.target,touch.event);
            }, 500);
        }
        else if (type === "touchmove") {
            ["dragstart", "dragmove"].includes(touch.event) ? touch.event='dragmove' : touch.event='dragstart';
            clearTimeout(touch.press); touch.press = null;
            clearTimeout(touch.timer); touch.timer = null; touch.events(event.target,touch.event);
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
    events: (target,t,type=t?t:'tap') => { document.body.dataset.touch = type; }
}

function init(url) { TouchEmulator();
  document.body.addEventListener("touchstart",touch.handler,{passive:true});
  document.body.addEventListener("touchmove",touch.handler,{passive:true});
  document.body.addEventListener("touchcancel",touch.handler,false);
  document.body.addEventListener("touchend",touch.handler,false);
}