const toggleButton = document.getElementById('lang-toggle');
const languageStorageKey = 'site_language';
let translatableNodes = document.querySelectorAll('[data-kn][data-en]');

let currentLanguage = 'kn';

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

// preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.4s ease';
        setTimeout(() => preloader.remove(), 400);
    }
});
