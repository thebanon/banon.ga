function init() {
    var host = window.location.host.split('.');
    if(host.length>2) { window.location.href = 'https://banon.cf/'+host[0]; }
}
