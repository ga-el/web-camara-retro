const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  
  let cameraMode = 0;
  const filters = [
    'contrast(1.2) brightness(0.9) saturate(1.1)', // default
    'sepia(1) contrast(1.3)', // estilo retro 80s
    'grayscale(1) brightness(1.2)', // estilo 90s
    'hue-rotate(90deg) contrast(1.2)', // 2000s digital
  ];
  
  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
    } catch (e) {
      alert('No se pudo acceder a la cámara');
    }
  }
  
  function switchCamera() {
    cameraMode = (cameraMode + 1) % filters.length;
    video.style.filter = filters[cameraMode];
    const audio = new Audio('https://www.soundjay.com/button/sounds/button-16.mp3');
    audio.play();
  }
  
  function takePhoto() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.filter = video.style.filter;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'retro-photo.png';
    link.href = dataURL;
    link.click();
  }
  