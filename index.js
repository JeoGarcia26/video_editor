let btnUpload = document.getElementById("btnUpload");
let file = document.createElement("input");
let canvas = document.createElement("canvas");
let video = document.createElement("video");

btnUpload.addEventListener("click", function () {
    file.type = "file";
    file.accept = "video/*";
    canvas.style.backgroundColor = "#ccc";
    canvas.style.border = "none";
    document.body.append(canvas);

    file.addEventListener("change", function () {
        if (file.files.length > 0) {
            console.log("Arquivo selecionado!");
            let url = URL.createObjectURL(file.files[0]);
            video.src = url;
            video.controls = true;

            // Ajustar o tamanho do canvas quando o vídeo é carregado
            video.addEventListener("loadedmetadata", function () {
                canvas.width = (video.videoWidth < window.innerWidth) ? video.videoWidth : window.innerWidth;
                canvas.height = (video.videoHeight < window.innerHeight) ? video.videoHeight: window.innerHeight;

            });

            video.oncanplay = () =>
                video.play();

            // Quando o vídeo começar a ser reproduzido, inicie o desenho no canvas
            video.addEventListener("play", function () {
                drawFrames();
            });
        }
    });

    file.click();
});

canvas.addEventListener("dblclick", function () {
    if (video.paused || video.ended)
        video.play();
    else
        video.pause();
});

function drawFrames() {
    if (!video.paused && !video.ended) {
        let g2d = canvas.getContext("2d");
        g2d.drawImage(video, 0, 0, canvas.width, canvas.height); // Ajuste o tamanho para cobrir o canvas
        requestAnimationFrame(drawFrames); // Continua chamando a função para manter o desenho
    }
}
