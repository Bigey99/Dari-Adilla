// Foto dan puisi untuk setiap slide
const slides = [
  { img: 'imgfoto1.jpg.jpg', text: 'Kita pernah tertawa tanpa sebab, kalau tanpa sebab nanti di sangka gila.' },
  { img: 'imgfoto2.jpg.jpg', text: 'Langit tak selalu cerah, boleh ga minjem seratus?.' },
  { img: 'imgfoto3.jpg.jpg', text: 'Kenangan ini takkan pudar, bahkan saat kita dewasa nanti.' },
  { img: 'imgfoto4.jpg.jpg', text: 'Setiap langkah adalah cerita, kalian bagian terindahnya.' },
  { img: 'imgfoto5.jpg.jpg', text: 'Waktu boleh berlalu, tapi tawa kalian tinggal di kalbu.' },
  { img: 'imgfoto6.jpg.jpg', text: 'Kita saling menguatkan, bahkan saat dunia terasa berat.' },
  { img: 'imgfoto7.jpg.jpg', text: 'Perpisahan hanyalah jeda, bukan akhir dari segalanya.' },
];

let currentSlide = 0;
const photo = document.getElementById('photo');
const caption = document.getElementById('caption');
const finalMessage = document.getElementById('finalMessage');
const music = document.getElementById('music');

function showSlide(index) {
  if (index >= slides.length) {
    document.querySelector('.slider').style.display = 'none';
    finalMessage.classList.remove('hidden');
    animateFinalMessage();
    return;
  }
  photo.classList.add('fade-out');
  caption.classList.add('fade-out');
  setTimeout(() => {
    photo.src = slides[index].img;
    caption.textContent = slides[index].text;
    photo.classList.remove('fade-out');
    caption.classList.remove('fade-out');
    caption.classList.add('typewriter');
    setTimeout(() => caption.classList.remove('typewriter'), 3000);
  }, 500);
}

function nextSlide() {
  currentSlide++;
  showSlide(currentSlide);
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    showSlide(currentSlide);
  }
}

function sharePage() {
  if (navigator.share) {
    navigator.share({
      title: 'Untuk Teman-Temanku',
      text: 'Kenangan indah bersama sahabat tercinta.',
      url: window.location.href,
    });
  } else {
    alert('Fitur bagikan tidak tersedia di perangkat ini.');
  }
}

function animateFinalMessage() {
  const letter = document.querySelector('.letter');
  letter.classList.add('slide-up');
  setTimeout(() => {
    document.querySelector('.shareBtn').classList.add('pop');
  }, 2000);
}

// Efek hujan
const canvas = document.getElementById('rain');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let raindrops = [];
for (let i = 0; i < 100; i++) {
  raindrops.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    length: Math.random() * 20 + 10,
    speed: Math.random() * 5 + 2
  });
}

function drawRain() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'rgba(173,216,230,0.6)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  raindrops.forEach(drop => {
    ctx.moveTo(drop.x, drop.y);
    ctx.lineTo(drop.x, drop.y + drop.length);
  });
  ctx.stroke();
  updateRain();
  requestAnimationFrame(drawRain);
}

function updateRain() {
  raindrops.forEach(drop => {
    drop.y += drop.speed;
    if (drop.y > canvas.height) {
      drop.y = -drop.length;
      drop.x = Math.random() * canvas.width;
    }
  });
}

drawRain();
showSlide(currentSlide);

// Coba autoplay musik (beberapa browser perlu interaksi pengguna)
music.play().catch(() => {
  document.body.addEventListener('click', () => {
    music.play();
  }, { once: true });
});

// Tambahan elemen dekoratif bintang jatuh
const stars = document.createElement('div');
stars.classList.add('stars');
document.body.appendChild(stars);
for (let i = 0; i < 20; i++) {
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.left = `${Math.random() * 100}%`;
  star.style.animationDelay = `${Math.random() * 5}s`;
  stars.appendChild(star);
}