(function () {
    const CONTRAST_KEY = "pke_high_contrast";

    function syncContrastState() {
        const isHighContrast = localStorage.getItem(CONTRAST_KEY) === "true";
        if (document.body) {
            document.body.classList.toggle("high-contrast", isHighContrast);
        }
        return isHighContrast;
    }

    document.addEventListener("DOMContentLoaded", () => {
        const isHighContrast = syncContrastState();

        // 1. BOTÓN MODO ALTO CONTRASTE
        const contrastBtn = document.getElementById("btn-high-contrast");
        if (contrastBtn) {
            updateContrastButton(contrastBtn, isHighContrast);

            contrastBtn.addEventListener("click", () => {
                const active = document.body.classList.toggle("high-contrast");
                localStorage.setItem(CONTRAST_KEY, String(active));
                updateContrastButton(contrastBtn, active);
            });
        }

        // 2. BOTÓN "ATZERA" (VOLVER ATRÁS)
        const backBtn = document.getElementById("btn-atzera");
        if (backBtn) {
            backBtn.addEventListener("click", () => {
                if (window.history.length > 1 && document.referrer !== "") {
                    window.history.back();
                } else {
                    const inSubfolder = window.location.pathname.includes("/aurrekoUrtekoGrALk/");
                    window.location.href = inSubfolder ? "../index.html" : "index.html";
                }
            });
        }
    });

    function updateContrastButton(button, isActive) {
        button.setAttribute("aria-pressed", String(isActive));
        button.innerHTML = isActive
            ? '<i class="bi bi-circle-half me-1" aria-hidden="true"></i> Kontraste normala'
            : '<i class="bi bi-circle-half me-1" aria-hidden="true"></i> Kontraste altua';
    }
})();