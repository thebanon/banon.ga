function init() {
    var host = window.location.host.split('.');
    if(host.length>2) { 
        fetch('https://banon.cf/'+host[0]).then(e => console.log(e));
    }
}
