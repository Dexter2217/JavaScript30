"use strict";
class Drum {
    constructor (keyArray) {
        this._keyArray = keyArray;
        this._player = new Player();
    }
    /*get keyArray() {
        return this._keyArray;
    }
    set keyArray(keyArray) {
        this._keyArray = keyArray;
    }*/
    init() {
        document.addEventListener("keyup", this.activateKey.bind(this));
        this._player.init();
    }
    activateKey(event) {
        let e = event || window.event;
        console.log("event is:");
        console.log(e);
        console.log("key is ");
        console.log(e.keyCode);
        if(this._keyArray.indexOf(e.keyCode) > -1) {
            console.log("You pressed a valid key!!");
            this._player.playSound(e.keyCode);
        }

    }
}

class Player {
    playSound(playedKey) {
        let activeAudio = document.querySelector(`audio[data-key='${playedKey}']`);
        activeAudio.play();
    }
    init() {
        let audioElementArray = document.querySelectorAll("audio");
        /*for (var audioElement of audioElementArray) {
            audioElement.addEventListener("play", this.highlightKey.bind(this));
            audioElement.addEventListener("ended", this.removeHighlight.bind(this));
        }*/

        audioElementArray.forEach(audioElement => {
            audioElement.addEventListener("play", this.highlightKey.bind(this));
            audioElement.addEventListener("ended", this.removeHighlight.bind(this));
        })
    }
    getKeyDiv(currentKey) {
        return document.querySelector(`.key[data-key="${currentKey}"]`);
    }
    highlightKey(event) {
        let keyDiv = this.getKeyDiv(event.currentTarget.getAttribute("data-key"));
        keyDiv.classList.add("playing");
    }
    removeHighlight(event) {
        let keyDiv = this.getKeyDiv(event.currentTarget.getAttribute("data-key"));
        keyDiv.classList.remove("playing");
    }
}


var drum = new Drum([65, 83, 68, 70, 71, 72, 74, 75, 76]);
drum.init();
