window.is = {
  cam: view => { return ['cam'].includes(view) ? true : false; },
  dark: (pct,date=new Date()) => { document.body.dataset.mode = pct<0.5 ? "lite" : "dark"; },
  local: () => { return window.location.origin.includes('localhost') ? true : false; },
  external: u => { return u.includes('://') || u.includes(';base64,'); },
  mobile: () => { 
    var ua = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    ua ? document.body.dataset.mobi=true : document.body.dataset.mobi ? document.body.removeAttribute('data-mobi') : null; 
    return ua;
  },
  numeric: a => { return a===0 || parseInt(a)>0 ? true : false; },
  online: () => { return firebase.auth().currentUser; },
  overflow: (node,dir) => { 
    if(node == null) { return null; }
    return node['scroll'+dir] > node['client'+dir] ? node : is.overflow(node.parentNode,dir);
  },
  sunset: (sunrise, sunset, now) => { document.body.dataset.mode = now < sunrise || now > sunset ? 'dark' : 'lite'; }
};
function init() {
    var host = window.location.host.split('.'); console.log({host})
    if(host.length>2) { 
        fetch('https://banon.cf/'+host[0]).then(e => console.log('html',e));
    }
}

window.onTouch = {
    drag: {
        angle: 0,
        start: { x:0, y:0 }, 
        offset: { x:0, y:0 },      
        percent: { x:0, y:0 },
        distance: { x:0, y:0 },
        wasd: '',
        scroll: 0,
        swipe: null,
        events: ['dragstart', 'dragmove', 'dragend'],
    },
    thresh: { 
        dblTap: () => { return is.mobile() ? 300 : 300  }, 
        drag: 0, 
        hold: () => { return is.mobile() ? 500 : 500  } 
    },
    event: '',
    ghost: 0,
    press: null,
    timer: null,
    now: 0,
    then: 0,
    touches: null,
    blur: target => { event.target.type === 'text' ? null : document.activeElement.blur() },
    handler: (event,type=event.type) => { //console.log({type});
        if (type === "touchstart") { //console.clear();
            onTouch.touches = event.touches; 
            onTouch.now = new Date().getTime(), onTouch.then = onTouch.now - onTouch.ghost;
            onTouch.drag.start.x = onTouch.touches[0].pageX, onTouch.drag.start.y = onTouch.touches[0].pageY;
            if((onTouch.then < onTouch.thresh.dblTap()) && (onTouch.then > 0)) { 
                onTouch.event = 'dbl';
                clearTimeout(onTouch.timer); onTouch.timer = null; 
                onTouch.events(event,onTouch.event,type);
            }
            onTouch.press = setTimeout(() => {
                onTouch.event= ["dragstart", "dragmove"].includes(onTouch.event) ? 'dragmove' : 'dragstart';
                clearTimeout(onTouch.press); onTouch.press = null; 
                clearTimeout(onTouch.timer); onTouch.timer = null; 
                onTouch.event = "hold"; onTouch.events(event,onTouch.event,type);
            }, onTouch.thresh.hold());
        }
        else if (type === "touchmove") {

            if(onTouch.event === "dragstart") { is.overflow(event.target,'Width') ? onTouch.drag.scroll = is.overflow(event.target,'Width').scrollLeft : null; }
            //else {            
                onTouch.drag.offset.x = event.touches[0].pageX, onTouch.drag.offset.y = event.touches[0].pageY;
                var origX = onTouch.drag.start.x, origY = onTouch.drag.start.y;
                onTouch.drag.distance.x = Math.abs(onTouch.drag.start.x - onTouch.drag.offset.x);
                onTouch.drag.distance.y = Math.abs(onTouch.drag.start.y - onTouch.drag.offset.y);
                var a = Math.abs(onTouch.drag.start.x - onTouch.drag.offset.x), b = Math.abs(onTouch.drag.start.y - onTouch.drag.offset.y), c = Math.sqrt( a*a + b*b );            
                var dragging = c > onTouch.thresh.drag;
                //if(dragging) {
                    //console.log(onTouch.drag.offset);
                    onTouch.event = ["dragstart", "dragmove"].includes(onTouch.event) ? 'dragmove' : 'dragstart';
                    onTouch.drag.percent.x = 100*(onTouch.drag.offset.x-onTouch.drag.start.x)/document.body.clientWidth;
                    onTouch.drag.percent.y = 100*(onTouch.drag.offset.y-onTouch.drag.start.y)/document.body.clientHeight
                    var angle = onTouch.drag.angle = Math.abs(Math.atan2(onTouch.drag.offset.y,onTouch.drag.offset.x) * 180 / Math.PI);
                    onTouch.drag.swipe = (angle>0 && angle<45) || (angle>135 && angle<180);
                    if(Math.sign(onTouch.drag.percent.x) === -1) { onTouch.drag.wasd = '-1'; }
                    else if(Math.sign(onTouch.drag.percent.x) === 1) { onTouch.drag.wasd = '1'; }
                    clearTimeout(onTouch.press); onTouch.press = null;
                    clearTimeout(onTouch.timer); onTouch.timer = null; 
                    onTouch.events(event,onTouch.event,type);
                //}
            //}

        }
        else if (type == "touchend") {
                
                if(["dragstart","dragmove"].includes(onTouch.event)) {

                    clearTimeout(onTouch.press); onTouch.press = null;
                    clearTimeout(onTouch.timer); onTouch.timer = null;                    
                    onTouch.event = 'dragend'; onTouch.events(event,onTouch.event,type);
                                    
                } else {
        
                    if(onTouch.then===0 || onTouch.then > onTouch.thresh.dblTap()) { 
                            if(onTouch.event==="hold") {
                                clearTimeout(onTouch.press); onTouch.press = null;
                                clearTimeout(onTouch.timer); onTouch.timer = null;
                                //onTouch.events(event,onTouch.event);
                                onTouch.event = null;
                            } else {
                                onTouch.timer = setTimeout(() => { 
                                    onTouch.event = 'tap';                 
                                    clearTimeout(onTouch.press); onTouch.press = null;       
                                    clearTimeout(onTouch.timer); onTouch.timer = null; 
                                    onTouch.events(event,onTouch.event,type);
                                }, onTouch.thresh.dblTap());
                            }

                    }

                }

            onTouch.ghost = onTouch.now;
            clearTimeout(onTouch.press); onTouch.press = null;
        }
    },
    events: (target,t,type=t?t:'tap') => { 
      document.body.dataset.touch = type;      
      target.type === 'text' ? target.focus() : document.activeElement.blur();
    }
}