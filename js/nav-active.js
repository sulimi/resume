! function () {
    let liTags = document.querySelectorAll('nav.menu> ul > li')
    for (let i = 0; i < liTags.length; i++) {
        liTags[i].onmouseenter = function (x) {
            x.target.classList.add('active')
        }
        liTags[i].onmouseleave = function (x) {
            x.target.classList.remove('active')
        }
    }
}.call()