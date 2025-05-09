document.addEventListener('DOMContentLoaded', () => {
    // Získanie elementov modalu a tlačidiel
    const modal = document.getElementById("consultation-modal");
    const openModalBtnTop = document.getElementById("open-consultation-modal");
    const openModalBtnBottom = document.getElementById("open-consultation-modal-bottom");
    const closeButton = document.getElementsByClassName("close-button")[0];

    // Funkcia na otvorenie modalu
    function openModal() {
        modal.style.display = "block";
        // Zakázať posúvanie tela stránky pod modalom
        document.body.style.overflow = "hidden";
    }

    // Funkcia na zatvorenie modalu
    function closeModal() {
        modal.style.display = "none";
        // Povoliť posúvanie tela stránky
        document.body.style.overflow = "auto";
    }

    // Otvoriť modal po kliknutí na tlačidlo v hero sekcii
    if (openModalBtnTop) {
        openModalBtnTop.onclick = openModal;
    }


    // Otvoriť modal po kliknutí na tlačidlo v kontakt sekcii
    if (openModalBtnBottom) { // Skontrolujeme, či tlačidlo existuje
        openModalBtnBottom.onclick = openModal;
    }

    // Zatvoriť modal po kliknutí na X
    if (closeButton) {
        closeButton.onclick = closeModal;
    }


    // Zatvoriť modal po kliknutí kdekoľvek mimo modal content
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    }

    // Aktualizácia hodnoty slidera pri posúvaní
    const klimaVykonSlider = document.getElementById('klima-vykon');
    const klimaVykonValueSpan = document.getElementById('klima-vykon-value');

    if (klimaVykonSlider && klimaVykonValueSpan) { // Skontrolujeme, či existujú
        klimaVykonValueSpan.textContent = klimaVykonSlider.value + ' kW'; // Nastavíme počiatočnú hodnotu
        klimaVykonSlider.oninput = function() {
            klimaVykonValueSpan.textContent = this.value + ' kW';
        }
    }

    // Plynulé posúvanie (Smooth Scrolling)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Zabráni predvolenému skoku
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 0; // Získame výšku hlavičky, ak existuje

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight, // Posunie na začiatok sekcie mínus výška hlavičky
                    behavior: 'smooth' // Plynulá animácia posúvania
                });
            }
        });
    });

    // Animácie pri posúvaní (Fade-in sections)
    const sections = document.querySelectorAll('section:not(#hero)'); // Vyberieme všetky sekcie okrem hero
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0; // Získame výšku hlavičky, ak existuje

    // Pridáme triedu 'section-hidden' všetkým sekciám pri načítaní
    sections.forEach(section => {
        section.classList.add('section-hidden');
    });

    const revealSection = (entries, observer) => {
        const [entry] = entries; // Získame prvý záznam

        if (!entry.isIntersecting) return; // Ak nie je vo viewporte, nič nerob

        entry.target.classList.remove('section-hidden'); // Odstráni skrytie
        entry.target.classList.add('section-visible'); // Pridá viditeľnosť (animácia)
        observer.unobserve(entry.target); // Prestaneme sledovať túto sekciu
    };

    // Vytvoríme Intersection Observer
    // rootMargin: '-HEADER_HEIGHTpx 0px -50px 0px' znamená, že element sa považuje za viditeľný,
    // keď je jeho horný okraj HEADER_HEIGHT px pod horným okrajom viewportu
    // a spodný okraj 50px nad spodným okrajom viewportu.
    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null, // Pozorujeme vo vzťahu k viewportu
        threshold: 0.1, // Spustí sa, keď je 10% sekcie viditeľných
        rootMargin: `-${headerHeight}px 0px -50px 0px`, // Spustíme skôr, aby animácia nebola prekrytá hlavičkou
    });

    // Sledujeme každú sekciu
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Spracovanie odoslania formulára (iba front-end ukážka)
    const consultationForm = document.getElementById('consultation-form');

    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Zabráni predvolenému odoslaniu formulára (načítaniu novej stránky)

            // Tu by si bežne posielal dáta na server
            // Napr. pomocou fetch API:
            /*
            const formData = new FormData(consultationForm);
            fetch('/vas-backend-skript', { // Zmeň '/vas-backend-skript' na adresu tvojho serverového skriptu
                method: 'POST',
                body: formData
            })
            .then(response => response.json()) // Alebo response.text()
            .then(data => {
                console.log('Success:', data);
                alert('Ďakujeme za vašu správu! Čoskoro sa vám ozveme.');
                closeModal(); // Zatvorí modal po úspešnom "odoslaní"
                consultationForm.reset(); // Vyčistí formulár
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Pri odosielaní správy nastala chyba. Skúste to prosím neskôr.');
            });
            */

            // Namiesto skutočného odoslania zobrazíme len správu a zatvoríme modal
            console.log('Formulár bol "odoslaný" (front-end simulácia).');
            alert('Ďakujeme za vašu správu! Čoskoro sa vám ozveme.');
            closeModal(); // Zatvorí modal
            consultationForm.reset(); // Vyčistí formulár
        });
    }
});
