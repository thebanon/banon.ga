if('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) { registration.unregister(); }
    navigator.serviceWorker.register('sw.js');
  });
}
window.touch = {
    local: {
      dbl: null, 
      drag: {
        start: { x:0, y:0 }, 
        offset: {}
      },
      press: null, 
      threshold: {
        drag: 25
      },
      type: null
    },
    handler: (event,type=event.type) => {
        if(type === 'touchstart') {          
            touch.local.drag.start.x = event.touches[0].pageX, touch.local.drag.start.y = event.touches[0].pageY;
            if(touch.local.dbl) { clearTimeout(touch.local.dbl); touch.local.dbl = null;  touch.local.type = 'dbltap'; touch.events(event.target,touch.local.type); } 
            else { touch.local.type = 'press'; touch.local.dbl = setTimeout(() => { touch.local.dbl = null;  touch.events(event.target,touch.local.type); },300); }
        }
        else if (type === "touchmove") { clearTimeout(touch.local.dbl);
          touch.local.drag.offset = {},
          touch.local.drag.offset.x = Math.abs(touch.local.drag.start.x - event.touches[0].pageX),
          touch.local.drag.offset.y = Math.abs(touch.local.drag.start.y - event.touches[0].pageY);   
          touch.local.dbl = null; 
          touch.local.type = 'drag'; 
          if(
            (touch.local.drag.offset.x > touch.local.threshold.drag) || 
            (touch.local.drag.offset.y > touch.local.threshold.drag)) { 
            touch.events(event.target,'drag');
          }
        }
        else if (type === "touchend") { 
          clearTimeout(touch.local.press); touch.local.press = null; touch.local.type = null; 
          setTimeout(() => { document.body.removeAttribute('error'); }, 3000);
        }
    },
    events: (target,t,touch=t?t:'tap') => { document.body.dataset.touch = touch; }
}
function init(url) { TouchEmulator();
  document.body.addEventListener("touchstart",touch.handler,{passive:true});
  document.body.addEventListener("touchmove",touch.handler,{passive:true});
  document.body.addEventListener("touchcancel",touch.handler,false);
  document.body.addEventListener("touchend",touch.handler,false);
}