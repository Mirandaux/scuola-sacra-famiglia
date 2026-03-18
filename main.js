import { initRouter } from './router.js';
import { setupNavigation } from './navigation.js';
import { handleForms } from './form_handler.js';

document.addEventListener('DOMContentLoaded', () => {

    lucide.createIcons();
    setupNavigation();
    

    initRouter();


    const header = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled-header');
        } else {
            header.classList.remove('scrolled-header');
        }
    });


    handleForms();
});
