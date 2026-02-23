const toggleButton = document.getElementById('lang-toggle');
const translatableNodes = document.querySelectorAll('[data-kn][data-en]');
const languageStorageKey = 'site_language';

let currentLanguage = 'kn';

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