let btnUpload = document.getElementById("btnUpload");
let file = document.createElement("input");
let canvas = document.createElement("canvas");
let video = document.createElement("video");

// Adiciona o atributo tabindex para permitir foco
canvas.setAttribute("tabindex", "0");

btnUpload.addEventListener("click", function () {
    file.type = "file";
    file.accept = "video/*";
    canvas.id = "canvasID";
    canvas.style.backgroundColor = "#ccc";
    canvas.style.border = "none";
    document.body.append(canvas);

    // Garante que o canvas receba foco ao ser clicado
    canvas.addEventListener("", () => {
        canvas.focus();
    });

    file.addEventListener("change", function () {
        if (file.files.length > 0) {
            console.log("Arquivo selecionado!");
            let url = URL.createObjectURL(file.files[0]);
            video.src = url;
            video.controls = true;

            // Ajustar o tamanho do canvas quando o vídeo é carregado
            video.addEventListener("loadedmetadata", function () {
                canvas.width = (video.videoWidth < window.innerWidth) ? video.videoWidth : window.innerWidth;
                canvas.height = (video.videoHeight < window.innerHeight) ? video.videoHeight : window.innerHeight;
            });

            video.oncanplay = () =>
                video.play();

            video.addEventListener("play", () => drawFrames()
            );
        }
    });

    file.click();
    canvas.focus();
});

canvas.addEventListener("dblclick", function () {
    if (video.paused || video.ended)
        video.play();
    else
        video.pause();
});

// Evento de tecla
canvas.addEventListener("keydown", (e) => {
    let tecla = e.key;
    switch (tecla) {
        case "ArrowRight":
            video.currentTime += 5;
            break;
        case "ArrowLeft":
            video.currentTime -= 5;
            break;
        case "ArrowUp":
            controlVolume(.1);
            break;
        case "ArrowUp":
            controlVolume(-.1);
            break;
    }
    console.log("Tecla pressionada:", tecla);
});

function drawFrames() {
    if (!video.paused && !video.ended) {
        let g2d = canvas.getContext("2d");
        g2d.drawImage(video, 0, 0, canvas.width, canvas.height); // Ajuste o tamanho para cobrir o canvas
        requestAnimationFrame(drawFrames); // Continua chamando a função para manter o desenho
        console.log(video.volume);
    }
}

function controlVolume(num) {
    if ((num + video.volume <= 0.0) || (num + video.volume >= 1.0))
        video.volume = Math.min(Math.max(video.volume + num, 1.0), 0.0);
    else
        video.volume += num;
}
