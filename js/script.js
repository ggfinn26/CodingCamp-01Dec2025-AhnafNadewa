const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');
const dots = document.querySelectorAll('.dot');
const horizontalContainer = document.querySelector('.horizontal-carousel');

let currentIndex = 0;

const sectionMap = {
    'Home': 0,
    'OurProfile': 1,
    'Portofolio': 2,
    'MessageUs': 3
};

function goToSection(index) {
    if (index < 0 || index >= sections.length) return;
    if (index === currentIndex) return;

    currentIndex = index;

    const offset = index * -100;
    horizontalContainer.style.transform = `translateX(${offset}vw)`;

    navLinks.forEach((link, i) => {
        link.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    sections.forEach((section, i) => {
        section.classList.toggle('active', i === index);
    });
}

navLinks.forEach((link, index) => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        goToSection(index);
    });
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', function () {
        goToSection(index);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    sections[0].classList.add('active');
    currentIndex = 0;
    const hash = window.location.hash;
    if (hash) {
        const index = sectionMap[hash.slice(1)];
        if (index !== undefined) {
            goToSection(index);
        }
    }

    const profileSlides = document.querySelectorAll('.profile-slide');
    const legendItems = document.querySelectorAll('.legend-item');
    const prevBtn = document.querySelector('.legend-prev');
    const nextBtn = document.querySelector('.legend-next');

    let currentSlide = 0;
    const totalSlides = profileSlides.length;

    function showSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;

        profileSlides.forEach((slide) => {
            slide.classList.remove('active');
        });

        profileSlides[index].classList.add('active');

        legendItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });

        currentSlide = index;
    }

    legendItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            showSlide(index);
        });
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });
    }

    const thumbnails = document.querySelectorAll('.thumbnail-item');
    const mainImg = document.getElementById('portfolio-main-img');
    const mainTitle = document.getElementById('portfolio-main-title');
    const mainDesc = document.getElementById('portfolio-main-desc');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function () {
            thumbnails.forEach(t => t.classList.remove('active'));

            this.classList.add('active');

            const newSrc = this.getAttribute('data-img');
            const newTitle = this.getAttribute('data-title');
            const newDesc = this.getAttribute('data-desc');

            mainImg.style.opacity = '0';

            setTimeout(() => {
                mainImg.src = newSrc;
                mainTitle.textContent = newTitle;
                mainDesc.textContent = newDesc;

                mainImg.style.opacity = '1';
            }, 300);
        });
    });

    const messageForm = document.querySelector('#MessageUs form');
    const outputTime = document.getElementById('current-date-and-time');
    const outputName = document.getElementById('output-name');
    const outputBirth = document.getElementById('output-tanggal-lahir');
    const outputGender = document.getElementById('output-gender');
    const outputMessage = document.getElementById('output-pesan');

    function updateTime() {
        const now = new Date();
        outputTime.textContent = 'Current Time: ' + now.toLocaleString('id-ID', {
            dateStyle: 'full',
            timeStyle: 'medium'
        });
    }
    setInterval(updateTime, 1000);
    updateTime();

    if (messageForm) {
        messageForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const birth = document.getElementById('tanggal-lahir-input').value;
            const gender = document.querySelector('input[name="gender"]:checked')?.value || '-';
            const message = document.getElementById('pesan-input').value;

            outputName.textContent = 'Nama: ' + name;
            outputBirth.textContent = 'Tanggal Lahir: ' + birth;
            outputGender.textContent = 'Gender: ' + gender;
            outputMessage.textContent = 'Pesan: ' + message;

            alert('Pesan berhasil terkirim! (Simulasi)');
            messageForm.reset();
        });
    }

    const welcomeModal = document.getElementById('welcome-modal');
    const welcomeForm = welcomeModal ? welcomeModal.querySelector('form') : null;
    const nameSpan = document.querySelector('.home-content .name');

    if (welcomeModal) {
        welcomeModal.showModal();

        if (welcomeForm) {
            welcomeForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const nameInput = this.querySelector('input[name="name"]');
                const name = nameInput.value.trim();

                if (name) {
                    if (nameSpan) nameSpan.textContent = name;

                    const messageName = document.getElementById('name');
                    if (messageName && !messageName.value) {
                        messageName.value = name;
                    }

                    welcomeModal.close();
                }
            });
        }
    }
});