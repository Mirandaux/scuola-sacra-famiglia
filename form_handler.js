export function handleForms() {

    document.addEventListener('submit', (e) => {
        if (e.target.id === 'contact-form') {
            e.preventDefault();
            const form = e.target;
            const btn = form.querySelector('button');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<span class="flex items-center justify-center gap-2"><i data-lucide="loader-2" class="animate-spin w-5 h-5"></i> Invio...</span>';
            lucide.createIcons();
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = 'Inviato con successo! ✓';
                btn.classList.add('bg-[#1A6B5A]');
                btn.classList.remove('bg-[#F5A623]');
                form.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.classList.add('bg-[#F5A623]');
                    btn.classList.remove('bg-[#1A6B5A]');
                    lucide.createIcons();
                }, 3000);
            }, 1500);
        }
    });
}
