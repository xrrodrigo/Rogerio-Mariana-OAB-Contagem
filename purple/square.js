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

        // Primeiro, desenha a imagem do input
        var imgInput = new Image();
        imgInput.src = croppedImage.src; // Imagem do input
        imgInput.onload = function() {
            canvas.width = imgInput.naturalWidth;
            canvas.height = imgInput.naturalHeight;
            context.drawImage(imgInput, 0, 0);

            // Depois, desenha a canvaimage por cima
            var img1 = new Image();
            img1.src = 'canvaimage.png'; // Caminho da imagem canvaimage
            img1.onload = function() {
                context.drawImage(img1, 0, 0, canvas.width, canvas.height);

                // Finalmente, desenha o overlay por cima de tudo
                var imgOverlay = new Image();
                imgOverlay.src = 'overlay.png'; // Caminho da imagem overlay
                imgOverlay.onload = function() {
                    context.drawImage(imgOverlay, 0, 0);
                };
            };
        };
    });
});
