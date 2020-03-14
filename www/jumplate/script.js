window.fn = () => {

    window.elems = {
        cams: document.getElementsByClassName("cams__Wrapper")[0]
    }

    new MutationObserver(waitElem).observe(elems.cams, { childList: true, attributes: true, subtree: true });           
    function waitElem(mutationList, observer) {
        return new Promise(function(resolve, reject) {
            mutationList.forEach((mutation) => {
                switch(mutation.type) {
                    case 'childList': log({type:mutation.type,children:elems.cams.children.length});
                        var video = mutation.target, added = mutation.addedNodes;
                        elems.cams.dataset.cams = elems.cams.children.length;
                        var a = 0; do { a++; }  while(a<added.length);
                        resolve({added,video});
                    break;
                }
            });
        });
    }

};
setTimeout(fn,3000);
function log(obj) {
    document.getElementsByClassName("ReactModalPortal")[0].insertAdjacentHTML('beforeend',JSON.stringify(obj));
}