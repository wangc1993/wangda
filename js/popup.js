var videoStatus = true
var vidioRace = 1
var docRace = 50

window.onload = function () {
    var status = localStorage.getItem('videoStatus')
    if(status) {
        videoStatus = status === 'true'
    } else {
        videoStatus = true
    }
    vidioRace = localStorage.getItem('vidioRace') || 1
    docRace = localStorage.getItem('docRace') || 50

    var status1 = document.getElementById('status1')
    status1.checked = videoStatus
    var status2 = document.getElementById('status2')
    if(!videoStatus) status2.checked = true
    var race = document.getElementById('race')
    race.value = vidioRace
    var doc = document.getElementById('doc')
    doc.value = docRace
    var confirm = document.getElementById('confirm')
    function videoChange() {
        videoStatus = status1.checked
    }

    function raceChange() {
        vidioRace = race.value
    }

    function docChange() {
        docRace = doc.value
    }

    function bindEvent(doc, func, type = 'change') {
        doc.addEventListener(type, func, false)
    }

    function confirmEvent() {
        localStorage.setItem('videoStatus', videoStatus)
        localStorage.setItem('vidioRace', vidioRace)
        localStorage.setItem('docRace', docRace)

        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, (tabs) => {
            let message = {
                videoStatus,
                vidioRace,
                docRace
            }
            chrome.tabs.sendMessage(tabs[0].id, message, res => {
                console.log('popup=>content')
            })
        })
    }

    bindEvent(status1, videoChange)
    bindEvent(status2, videoChange)
    bindEvent(race, raceChange)
    bindEvent(doc, docChange)
    bindEvent(confirm, confirmEvent, 'click')
}