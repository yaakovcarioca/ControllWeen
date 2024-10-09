document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    // Gerar o QR Code com o primeiro nome
    const firstName = name.split(' ')[0];
    const qrCode = new QRCode(document.getElementById("qrcode"), {
        text: firstName,
        width: 128,
        height: 128,
        colorDark: "#ff4500",
        colorLight: "#ffffff"
    });

    // Mostrar botão de compartilhar
    document.getElementById('shareBtn').style.display = 'block';

    // Armazenar dados no banco via AJAX
    fetch('php/store.php', {
        method: 'POST',
        body: new URLSearchParams({
            'name': name,
            'phone': phone,
            'qr_code': firstName
        })
    });
});

// Função para compartilhar o QR Code
document.getElementById('shareBtn').addEventListener('click', function () {
    const qrImage = document.querySelector('#qrcode img').src;
    navigator.share({
        title: 'QR Code',
        text: 'Aqui está o QR Code para o cadastro',
        files: [new File([qrImage], 'qrcode.png', { type: 'image/png' })]
    });
});
