const toggleButton = document.getElementById('lang-toggle');
const languageStorageKey = 'site_language';
let translatableNodes = document.querySelectorAll('[data-kn][data-en]');

let currentLanguage = 'kn';

const initGalleryLightbox = () => {
    const galleryImages = document.querySelectorAll('.event-gallery img');

    if (!galleryImages.length) {
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'lightbox';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
        <div class="lightbox-backdrop"></div>
        <div class="lightbox-dialog" role="dialog" aria-modal="true" aria-label="Event image viewer">
            <button type="button" class="lightbox-nav lightbox-prev" aria-label="Previous image">‹</button>
            <button type="button" class="lightbox-close" aria-label="Close image">×</button>
            <img src="" alt="Event image" />
            <button type="button" class="lightbox-nav lightbox-next" aria-label="Next image">›</button>
        </div>
    `;

    document.body.appendChild(modal);

    const lightboxImage = modal.querySelector('img');
    const closeButton = modal.querySelector('.lightbox-close');
    const prevButton = modal.querySelector('.lightbox-prev');
    const nextButton = modal.querySelector('.lightbox-next');
    let currentIndex = 0;

    const updateCurrentIndex = (index) => {
        currentIndex = (index + galleryImages.length) % galleryImages.length;
        const image = galleryImages[currentIndex];
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt || 'Event image';
    };

    const closeLightbox = () => {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        modal.setAttribute('aria-hidden', 'true');
    };

    const openLightbox = (image) => {
        currentIndex = Array.from(galleryImages).indexOf(image);
        updateCurrentIndex(currentIndex);
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        modal.setAttribute('aria-hidden', 'false');
    };

    galleryImages.forEach((image) => {
        image.addEventListener('click', () => openLightbox(image));
        image.style.cursor = 'pointer';
    });

    closeButton.addEventListener('click', closeLightbox);
    prevButton.addEventListener('click', () => updateCurrentIndex(currentIndex - 1));
    nextButton.addEventListener('click', () => updateCurrentIndex(currentIndex + 1));

    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.classList.contains('lightbox-backdrop')) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (!modal.classList.contains('show')) {
            return;
        }

        if (event.key === 'Escape') {
            closeLightbox();
        }

        if (event.key === 'ArrowLeft') {
            updateCurrentIndex(currentIndex - 1);
        }

        if (event.key === 'ArrowRight') {
            updateCurrentIndex(currentIndex + 1);
        }
    });
};

const ensureFooterContact = () => {
    const footerTexts = document.querySelectorAll('.footer-text');

    footerTexts.forEach((footerText) => {
        if (footerText.querySelector('.footer-contact')) {
            return;
        }

        const contact = document.createElement('p');
        contact.className = 'footer-contact';

        contact.dataset.kn = "<strong>ವಿಳಾಸ:</strong> ಯೆಲ್ಲಮ್ಮ ವೆಂಕಟೇಶ್ವರ ದೇವಸ್ಥಾನದ ಬಳಿ, ಭೋವಿಪಾಳ್ಯ, ಅಂತರಸನಹಳ್ಳಿ, ಅರಕೆರೆ ಪೋಸ್ಟ್, ತುಮಕೂರು, ಕರ್ನಾಟಕ – 572106, ಭಾರತ <br>ದೂರವಾಣಿ: <a href='tel:+917022229419'>7022229419</a>";

        contact.dataset.en = "<strong>Address:</strong> Near Yellamma Venkateshwara Temple,  Bhovipalya, Antharasanahalli, Arakere Post, Tumakuru, Karnataka 572106, India <br>Ph: <a href='tel:+917022229419'>7022229419</a>";

        contact.innerHTML = contact.dataset.kn;
        footerText.appendChild(contact);
    });
};

const getSavedLanguage = () => {
    try {
        const savedLanguage = localStorage.getItem(languageStorageKey);
        return savedLanguage === 'en' || savedLanguage === 'kn'
            ? savedLanguage
            : 'kn';
    } catch {
        return 'kn';
    }
};

const saveLanguage = (language) => {
    try {
        localStorage.setItem(languageStorageKey, language);
    } catch { }
};

const applyLanguage = (language) => {
    translatableNodes = document.querySelectorAll('[data-kn][data-en]');

    translatableNodes.forEach((node) => {
        node.innerHTML = node.dataset[language];
    });

    document.documentElement.lang = language;
    currentLanguage = language;
    toggleButton.textContent = language === 'kn' ? 'English' : 'ಕನ್ನಡ';
    saveLanguage(language);
};

toggleButton.addEventListener('click', () => {
    applyLanguage(currentLanguage === 'kn' ? 'en' : 'kn');
});

ensureFooterContact();
applyLanguage(getSavedLanguage());
initGalleryLightbox();

// preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.4s ease';
        setTimeout(() => preloader.remove(), 400);
    }
});
