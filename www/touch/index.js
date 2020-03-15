if('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) { registration.unregister(); }
    navigator.serviceWorker.register('sw.js');
  });
}
window.touch = {
    drag: {
        start: { x:0, y:0 }, 
        offset: {},        
        threshold: 50
    },
    event: '',
    ghost: 0,
    press: null,
    timer: null,
    now: 0,
    then: 0,
    handler: (event,type=event.type) => { //console.log({type});
        if (type === "touchstart") {
            touch.now = new Date().getTime(), touch.then = touch.now - touch.ghost;
            if((touch.then < 300) && (touch.then > 0)) { 
                touch.event = 'dbl';
                clearTimeout(touch.timer); touch.timer = null; 
                touch.events(event.target,touch.event);
                console.log(touch.event);
            } 
            touch.press = setTimeout(() => { 
                clearTimeout(touch.press); touch.press = null; 
                clearTimeout(touch.timer); touch.timer = null; 
                touch.event = "hold"; console.log(touch.event);
                touch.events(event.target,touch.event);
            }, 500);
        }
        else if (type === "touchmove") {
          clearTimeout(touch.press); touch.press = null;
          clearTimeout(touch.timer); touch.timer = null;
          touch.drag.offset = {},
          touch.drag.offset.x = Math.abs(touch.drag.start.x - event.touches[0].pageX),
          touch.drag.offset.y = Math.abs(touch.drag.start.y - event.touches[0].pageY);
          touch.event = touch.event==='dragstart' ? 'dragmove' : 'dragstart'; console.log('dragstart');
          if(
            (touch.drag.offset.x > touch.drag.threshold) || 
            (touch.drag.offset.y > touch.drag.threshold)) { 
            touch.events(event.target,touch.event);
          } 
          else { touch.event = null; }
        }
        else if (type == "touchend") {


                if(["dragstart","dragmove"].includes(touch.event)) {

                    clearTimeout(touch.press); touch.press = null;
                    clearTimeout(touch.timer); touch.timer = null;                    
                    touch.event = 'dragend'; console.log(touch.event);
                                    
                } else {
        
                    if(touch.then===0 || touch.then > 300) { 
                            if(touch.event==="hold") {
                                clearTimeout(touch.press); touch.press = null;
                                clearTimeout(touch.timer); touch.timer = null;
                                touch.events(event.target,touch.event);
                                touch.event = null;
                            } else {
                                touch.timer = setTimeout(() => { 
                                    touch.event = 'tap';                 
                                    clearTimeout(touch.press); touch.press = null;       
                                    clearTimeout(touch.timer); touch.timer = null; 
                                    touch.events(event.target,touch.event);
                                    console.log(touch.event);
                                }, 300);
                            }

                    }

                }

            touch.ghost = touch.now;
            clearTimeout(touch.press); touch.press = null;
        }
    },
    events: (target,t,type=t?t:'tap') => {
        var id = target.closest('[id]').id;
        var elem = target.closest('[data-evt]');
        var evt = elem && elem.dataset && elem.dataset.evt ? elem.dataset.evt : null;
        //console.log({target,type,id,elem,evt});
        if(type === "tap") {
            if(evt === "dock") {
                if(["icon", "logo"].includes(id)) { (document.body.dataset.view === 'home' ? '/' : '/home/').router(); }
                else if(id === "query") { target.focus(); }
                else if(id === "avi") { is.online() ? mvc.v.profile() : '/'.router(); }
            }
            else if(evt === "menu") {
                if(id === "mall") { '/mall/'.router(); }
                if(id === "chat") { '/chat/'.router(); }
                if(id === "feed") { '/feed/'.router(); }
                if(id === "cart") { '/cart/'.router(); }
                if(id === "make") { '/make/'.router(); }
            }
        }
        else if(type === "press") {
            if(evt === "dock") {
                if(id === "logo") { (document.body.dataset.view === 'home' ? '/' : '/home/').router(); }
            }
            else if(evt === "menu") {
                if(id === "shop") { '/mall/zones/'.router(); }
                if(id === "feed") { '/feed/alerts/'.router(); }
            }
        }
    }
}

function init(url) { TouchEmulator();
  document.body.addEventListener("touchstart",touch.handler,{passive:true});
  document.body.addEventListener("touchmove",touch.handler,{passive:true});
  document.body.addEventListener("touchcancel",touch.handler,false);
  document.body.addEventListener("touchend",touch.handler,false);
}