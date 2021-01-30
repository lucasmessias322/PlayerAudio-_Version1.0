
let player = {
    image: document.getElementById('Image'),
    title: document.getElementById('title'),
    audio: document.querySelector('audio'),
    volIcon: document.getElementById('volIcon'),
    volumeControl: document.getElementById('volumeControl'),
    ProgessBar: document.getElementById('ProgessBar'),
    TimerFinal: document.getElementById('TimerFinal'),
    timerinicial: document.getElementById('timerinicial'),
    IconRepeat: document.getElementById('IconRepeat'),
    Repeat: document.getElementById('Repeat')

}
function start(i) {
    player.image.src = DataAudio[i].image
    player.title.innerText = DataAudio[i].nome
    player.audio.src = DataAudio[i].musica
}

start(0)

function volume(value) {
    //valume em js vai de 0 a 1 sendo 1 100% e 0 Zero, divido por 100 par ter seu valor de 0 a 1
    let valumE = player.audio.volume = value / 100

    if (valumE <= 0) {
        player.volIcon.style.color = '#FF1616'
        player.volIcon.classList.remove('fa-volume-up')
        player.volIcon.classList.add('fa-volume-mute')
    } else {
        player.volIcon.style.color = 'white'
        player.volIcon.classList.remove('fa-volume-mute')
        player.volIcon.classList.add('fa-volume-up')
    }


}
function barraDeProgresso(value) {
    player.audio.currentTime = value

}

function SecontsToMinuts(time) {
    const minutos = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${("0" + minutos).slice(-2)}:${("0" + seconds).slice(-2)}`

}

function timeUpDate() {
    player.timerinicial.innerText = SecontsToMinuts(player.audio.currentTime)
    player.ProgessBar.value = player.audio.currentTime
}
function ajustarAudio() {
    player.ProgessBar.oninput = () => {
        barraDeProgresso(player.ProgessBar.value)
        player.ProgessBar.max = player.audio.duration

    }
    player.audio.ontimeupdate = () => {
        timeUpDate()
    };

    player.audio.onloadeddata = () => {
        console.log(player.audio.duration);
        player.TimerFinal.innerText = SecontsToMinuts(player.audio.duration)
    }


}
ajustarAudio()
function ajustarVolume() {
    player.volumeControl.oninput = () => {
        //passa o valor de volume para a funçao volume que vai dividir por 100
        volume(player.volumeControl.value)

    }

}
ajustarVolume()

function Mutar() {
    if (player.audio.muted == false) {
        player.audio.muted = true
        player.volIcon.style.color = '#FF1616'
        player.volIcon.classList.remove('fa-volume-up')
        player.volIcon.classList.add('fa-volume-mute')
    } else {
        player.audio.muted = false
        player.volIcon.style.color = 'white'
        player.volIcon.classList.remove('fa-volume-mute')
        player.volIcon.classList.add('fa-volume-up')
    }
}

function animate() {

    if (player.image.style.animation == "") {
        player.image.style.animation = 'spin 7s linear infinite'

    } else {
        player.image.style.animation = ''
    }
}

let Acresentar = 0
function ProximaMusica() {
    Acresentar++
    start(Acresentar)
    player.audio.play()
}
function VoltarMusicaAnterior() {
    Acresentar--
    start(Acresentar)
}
function ProximaMusicaAutomaticamente() {

    player.audio.addEventListener("ended", () => {
        ProximaMusica()
        player.audio.play()
    })



}

// function RepetirAMesmaMusica() {
//     player.audio.addEventListener("ended", () => {
//         player.audio.currentTime = 0
//         player.audio.play()
//     })
//     player.IconRepeat.style.color = 'red'

// }

function PlayOrPause() {
    let btn = document.getElementById("PlayPause")

    if (btn.classList == "fas fa-play") {
        btn.classList.remove("fa-play")
        btn.classList.add("fa-pause")
        player.audio.play()
    } else {
        btn.classList.remove("fa-pause")
        btn.classList.add("fa-play")
        player.audio.pause()
    }


}


// let btn = document.getElementById("PlayPause")
function AudioPlay(index) {

    animate()
    PlayOrPause()
    ProximaMusicaAutomaticamente() 
}
        
    

  



