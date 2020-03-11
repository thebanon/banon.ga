function init() {
    var host = window.location.host.split('.'); console.log({host})
    if(host.length>2) { 
        fetch('https://banon.cf/'+host[0]).then(e => console.log('html',e));
    }
}
