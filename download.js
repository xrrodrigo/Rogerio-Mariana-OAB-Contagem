
async function download(event) {
    event.preventDefault();

    const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, 'image/jpeg', 1.0);
    });

    const anchor = window.document.createElement('a');
    anchor.href = window.URL.createObjectURL(blob);
    const i = Math.random() * 10;
    anchor.download = 'Rogerio&Mariana' + i + '.jpg';
    anchor.click();
    window.URL.revokeObjectURL(anchor.href);
}
