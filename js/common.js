(function () {
    const CONTRAST_KEY = "pke_high_contrast";

    // Aplicar alto contraste al instante si estaba guardado
    function syncContrastState() {
        const isHighContrast = localStorage.getItem(CONTRAST_KEY) === "true";
        if (document.body) {
            document.body.classList.toggle("high-contrast", isHighContrast);
        }
        return isHighContrast;
    }

    syncContrastState();

    document.addEventListener("DOMContentLoaded", () => {
        const isHighContrast = syncContrastState();

        // 1. INYECTAR NAVBAR + BREADCRUMB EN PÁGINAS QUE NO LO TENGAN ESTÁTICO
        injectGlobalNavigation();

        // 2. ACTIVAR BOTÓN MODO ALTO CONTRASTE
        const contrastBtn = document.getElementById("btn-high-contrast");
        if (contrastBtn) {
            updateContrastButton(contrastBtn, isHighContrast);

            contrastBtn.addEventListener("click", () => {
                const active = document.body.classList.toggle("high-contrast");
                localStorage.setItem(CONTRAST_KEY, String(active));
                updateContrastButton(contrastBtn, active);
            });
        }

        // 3. ACTIVAR BOTÓN "ATZERA"
        const backBtn = document.getElementById("btn-atzera");
        if (backBtn) {
            backBtn.addEventListener("click", () => {
                if (window.history.length > 1 && document.referrer !== "") {
                    window.history.back();
                } else {
                    const inSubfolder = window.location.pathname.toLowerCase().includes("/aurrekourtekogralk/");
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

    function injectGlobalNavigation() {
        // Asegurar destino para el enlace de salto rápido
        const mainEl = document.querySelector("main");
        if (mainEl && !mainEl.id) {
            mainEl.id = "main-content";
        }

        if (!document.querySelector(".skip-link")) {
            const skipLink = document.createElement("a");
            skipLink.href = "#main-content";
            skipLink.className = "skip-link";
            skipLink.textContent = "Joan eduki nagusira";
            document.body.insertBefore(skipLink, document.body.firstChild);
        }

        // Si ya tiene el navbar modelo (como about-us.html), no duplicar
        if (document.getElementById("btn-high-contrast")) {
            return;
        }

        const path = window.location.pathname;
        const inSubfolder = path.toLowerCase().includes("/aurrekourtekogralk/");
        const p = inSubfolder ? "../" : "";
        const fileName = (path.split("/").pop() || "index.html").toLowerCase();

        const isHome = fileName === "index.html" || fileName === "";
        const isAraudia = fileName === "araudia.html";
        const isDeialdia = fileName === "deialdia-entregak.html";
        const isAbout = fileName === "about-us.html";

        const subPages = {
            "aurrekogralk.html": "Aurreko GrAL-k",
            "konputagailuen-ingeniaritza.html": "Konputagailuen ingeniaritza",
            "konputazioa.html": "Konputazioa",
            "software-ingeniaritza.html": "Software ingeniaritza",
            "adimen-artifiziala.html": "Adimen artifiziala",
            "poster.html": "Poster"
        };

        const activeAttr = (cond) => (cond ? ' active" aria-current="page' : "");

        const navHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top px-3" aria-label="Nabigazio nagusia">
            <div class="container-fluid">
                <a class="navbar-brand fw-bold me-4" href="${p}index.html">PKE-GrAL</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Menua ireki edo itxi">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
                        <li class="nav-item">
                            <a class="nav-link${activeAttr(isHome)}" href="${p}index.html">Hasiera</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link${activeAttr(isAraudia)}" href="${p}araudia.html">Araudia</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle${inSubfolder ? " active" : ""}" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Aurreko GrAL-k
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item${activeAttr(fileName === "aurrekogralk.html")}" href="${p}aurrekoUrtekoGrALk/AurrekoGrALk.html">Aurreko GrAL-k Hasiera</a></li>
                                <li><a class="dropdown-item${activeAttr(fileName === "konputagailuen-ingeniaritza.html")}" href="${p}aurrekoUrtekoGrALk/konputagailuen-ingeniaritza.html">Konputagailuen ingeniaritza</a></li>
                                <li><a class="dropdown-item${activeAttr(fileName === "konputazioa.html")}" href="${p}aurrekoUrtekoGrALk/konputazioa.html">Konputazioa</a></li>
                                <li><a class="dropdown-item${activeAttr(fileName === "software-ingeniaritza.html")}" href="${p}aurrekoUrtekoGrALk/software-ingeniaritza.html">Software ingeniaritza</a></li>
                                <li><a class="dropdown-item${activeAttr(fileName === "adimen-artifiziala.html")}" href="${p}aurrekoUrtekoGrALk/adimen-artifiziala.html">Adimen artifiziala</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item${activeAttr(fileName === "poster.html")}" href="${p}aurrekoUrtekoGrALk/poster.html">Poster</a></li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link${activeAttr(isDeialdia)}" href="${p}deialdia-entregak.html">Deialdia eta Entregak</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link${activeAttr(isAbout)}" href="${p}about-us.html">About us</a>
                        </li>
                        <li class="nav-item ms-lg-3">
                            <button type="button" id="btn-high-contrast" class="btn btn-outline-warning btn-sm btn-contrast" aria-pressed="false">
                                <i class="bi bi-circle-half me-1" aria-hidden="true"></i> Kontraste altua
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>`;

        // Construir Breadcrumb + Atzera (en todas menos en index.html)
        let breadcrumbHTML = "";
        if (!isHome) {
            let trail = `<li class="breadcrumb-item"><a href="${p}index.html">Hasiera</a></li>`;

            if (isAraudia) {
                trail += `<li class="breadcrumb-item active" aria-current="page">Araudia</li>`;
            } else if (isDeialdia) {
                trail += `<li class="breadcrumb-item active" aria-current="page">Deialdia eta Entregak</li>`;
            } else if (isAbout) {
                trail += `<li class="breadcrumb-item active" aria-current="page">About us</li>`;
            } else if (inSubfolder) {
                if (fileName === "aurrekogralk.html") {
                    trail += `<li class="breadcrumb-item active" aria-current="page">Aurreko GrAL-k</li>`;
                } else {
                    const subTitle = subPages[fileName] || document.title;
                    trail += `<li class="breadcrumb-item"><a href="AurrekoGrALk.html">Aurreko GrAL-k</a></li>`;
                    trail += `<li class="breadcrumb-item active" aria-current="page">${subTitle}</li>`;
                }
            }

            breadcrumbHTML = `
            <nav aria-label="Breadcrumb" class="breadcrumb-bar">
                <div class="container-fluid d-flex flex-wrap align-items-center gap-3">
                    <button type="button" id="btn-atzera" class="btn btn-outline-dark btn-sm btn-atzera" aria-label="Aurreko orrira itzuli">
                        <i class="bi bi-arrow-left" aria-hidden="true"></i> Atzera
                    </button>
                    <ol class="breadcrumb mb-0">
                        ${trail}
                    </ol>
                </div>
            </nav>`;
        }

        const wrapper = document.createElement("div");
        wrapper.innerHTML = navHTML + breadcrumbHTML;

        const existingNav = document.querySelector("nav.navbar");
        if (existingNav) {
            existingNav.replaceWith(...wrapper.childNodes);
        } else {
            const skip = document.querySelector(".skip-link");
            if (skip) {
                skip.after(...wrapper.childNodes);
            } else {
                document.body.prepend(...wrapper.childNodes);
            }
        }
    }
})();