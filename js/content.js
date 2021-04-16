window.onload = function () {
    console.log('网大神器')
    var statusSetinterval = null
    var scrollSetinterval = null
    //加快视频播放速度
    function increaseSpeed(race) {
        var doc = document.getElementsByClassName('vjs-tech')[0]
        if(doc) {
            doc.playbackRate = Number(race)
        }
    }
    //防止视频暂停
    function vidioClick(status) {
        if(!statusSetinterval && status) {
            statusSetinterval = setInterval(function(){
                var doc = document.querySelector('button.vjs-paused')
                if(doc){
                    doc.click()
                }
            },5000)
        }
        if(!status) {
            window.clearInterval(statusSetinterval)
            statusSetinterval = null
        }
    }
    //加快文档滚动速度
    function documentScroll(race) {
        window.clearInterval(scrollSetinterval)
        scrollSetinterval = null

        var doc = document.getElementsByClassName('fullScreen-content')[0]
        if(!scrollSetinterval && doc) {
            scrollSetinterval = setInterval(function(){
                doc.scrollTop += Number(race)
            },3000)
        }
    }

    chrome.extension.onMessage.addListener((info, sender, sendResponse) => {
        increaseSpeed(info.vidioRace)
        vidioClick(info.videoStatus)
        documentScroll(info.docRace)
        alert('神器运行中，请点击确定即可')
    })
}