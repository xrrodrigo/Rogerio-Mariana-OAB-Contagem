const upload = document.querySelector("#arquivo");
const imgContainer = document.querySelector('#croppieContainer');
const croppedImage = document.querySelector('#croppedImage');
const cropButton = document.querySelector('#btnCrop');
const container = document.querySelector("#container");
const section = document.querySelector('#section');
const controls = document.querySelector("#controls");

var croppieInstance = new Croppie(imgContainer, {
    viewport: { width: 300, height: 300, type: 'square' },
    boundary: { width: 300, height: 300 },
    enableResize: false
});

upload.addEventListener('change', function (e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
        croppieInstance.bind({
            url: event.target.result
        });
    };
    reader.readAsDataURL(file);
    imgContainer.style.display = 'block';
    cropButton.style.display = 'flex';
    container.style.display = "flex";
    section.style.display = "none";
    controls.style.display = "none";
});

cropButton.addEventListener('click', function () {
    croppieInstance.result({
        type: 'canvas',
        size: { width: 1080, height: 1080 } // Tamanho de download
    }).then(function (result) {
        croppedImage.src = result;
        imgContainer.style.display = 'none';
        upload.style.display = 'none';
        cropButton.style.display = 'none';
        section.style.display = "flex";
        controls.style.display = "flex";
        container.style.display = "none";

        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');

        // Primeiro, configuramos o tamanho do canvas
        var baseImage = new Image();
        baseImage.src = 'canvaimage.png'; // Caminho da imagem base (canvaimage)
        baseImage.onload = function() {
            canvas.width = baseImage.naturalWidth;
            canvas.height = baseImage.naturalHeight;

            // Depois, desenhamos a imagem base
            context.drawImage(baseImage, 0, 0, canvas.width, canvas.height);

            // Depois, desenhamos a imagem do input
            var imgInput = new Image();
            imgInput.src = croppedImage.src; // Imagem do input
            imgInput.onload = function() {
                context.drawImage(imgInput, 0, 0); // Ajustar a posição conforme necessário

                // Finalmente, desenhamos a imagem de overlay
                var imgOverlay = new Image();
                imgOverlay.src =
