/* ===================== Portfolio / Modale Video ===================== */
const videoModal = document.getElementById("videoModal");
const videoPlayer = document.getElementById("video-player");
const videoTitle = document.getElementById("video-title");
const videoList = document.getElementById("video-list");

const videos = {
    series: [
        {title: "Demo Série 1", src: "assets/videos/series1.mp4"},
        {title: "Demo Série 2", src: "assets/videos/series2.mp4"}
    ],
    montage: [
        {title: "Montage 1", src: "assets/videos/montage1.mp4"},
        {title: "Montage 2", src: "assets/videos/montage2.mp4"}
    ]
};

function openModal(project) {
    if(!videoModal || !videoPlayer || !videoTitle || !videoList) return;
    if(!videos[project]) return;

    videoModal.style.display = "flex";
    videoList.innerHTML = "";

    videoPlayer.src = videos[project][0].src;
    videoTitle.textContent = videos[project][0].title;

    videos[project].forEach(video => {
        const btn = document.createElement("button");
        btn.textContent = video.title;
        btn.onclick = () => {
            videoPlayer.src = video.src;
            videoTitle.textContent = video.title;
            videoPlayer.play();
        };
        videoList.appendChild(btn);
    });
}

function closeModal() {
    if(!videoModal || !videoPlayer) return;
    videoModal.style.display = "none";
    videoPlayer.pause();
    videoPlayer.src = "";
}

window.onclick = function(event) {
    if(videoModal && event.target == videoModal) closeModal();
};

/* ===================== Recherche interne ===================== */
const searchInput = document.getElementById("site-search");
const resultsContainer = document.getElementById("search-results");

const siteContents = [
    {title: "Montage Vidéo Professionnel", description: "Découvrez mes services de montage vidéo et storytelling."},
    {title: "Création de Sites Web", description: "Je crée des sites web modernes, responsives et interactifs."},
    {title: "Player Vidéo", description: "Intégration de lecteurs vidéo pour vos projets multimédias."},
    {title: "Backend & CMS", description: "Gestion de contenu et fonctionnalités sur mesure."},
    {title: "Portfolio", description: "Visualisez tous mes projets et créations."},
    {title: "Contact", description: "Prenez contact pour vos projets ou questions."}
];

if(searchInput) {
    searchInput.addEventListener("keyup", e => {
        if(e.key === "Enter") filterResults();
    });
}

function filterResults() {
    if(!searchInput || !resultsContainer) return;
    const query = searchInput.value.trim().toLowerCase();
    resultsContainer.innerHTML = "";

    if(!query){
        resultsContainer.innerHTML = "<p>Veuillez entrer un mot-clé pour la recherche.</p>";
        return;
    }

    const filtered = siteContents.filter(item =>
        item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)
    );

    if(filtered.length === 0){
        resultsContainer.innerHTML = "<p>Aucun résultat trouvé.</p>";
        return;
    }

    filtered.forEach(item => {
        const div = document.createElement("div");
        div.className = "search-card";
        div.innerHTML = `<h3>${item.title}</h3><p>${item.description}</p>`;
        resultsContainer.appendChild(div);
    });
}

/* ===================== Formulaire Contact ===================== */
const form = document.getElementById("contact-form");
const response = document.getElementById("form-response");

if(form) {
    form.addEventListener("submit", e => {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if(!name || !email || !message) {
            response.textContent = "Veuillez remplir tous les champs.";
            response.style.color = "red";
            return;
        }

        console.log({name, email, message});
        response.textContent = "Message envoyé avec succès !";
        response.style.color = "green";
        form.reset();
    });
}

/* ===================== Auth / Connexion & Inscription ===================== */
let users = JSON.parse(localStorage.getItem("adxUsers")) || [];

// --- Inscription ---
const signupForm = document.getElementById("signup-form");
const signupResponse = document.getElementById("signup-response");

if(signupForm){
    signupForm.addEventListener("submit", e => {
        e.preventDefault();
        const name = document.getElementById("signup-name").value.trim();
        const email = document.getElementById("signup-email").value.trim();
        const password = document.getElementById("signup-password").value.trim();

        if(!name || !email || !password){
            signupResponse.textContent = "Veuillez remplir tous les champs.";
            signupResponse.style.color = "red";
            return;
        }

        if(users.find(user => user.email === email)){
            signupResponse.textContent = "Cet email est déjà utilisé.";
            signupResponse.style.color = "red";
            return;
        }

        const newUser = {name, email, password, videos: []};
        users.push(newUser);
        localStorage.setItem("adxUsers", JSON.stringify(users));

        signupResponse.textContent = "Inscription réussie ! Vous pouvez maintenant vous connecter.";
        signupResponse.style.color = "green";
        signupForm.reset();
    });
}

// --- Connexion ---
const loginForm = document.getElementById("login-form");
const loginResponse = document.getElementById("login-response");

if(loginForm){
    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value.trim();

        const user = users.find(u => u.email === email && u.password === password);
        if(!user){
            loginResponse.textContent = "Email ou mot de passe incorrect.";
            loginResponse.style.color = "red";
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify(user));
        loginResponse.textContent = `Bienvenue ${user.name} !`;
        loginResponse.style.color = "green";

        setTimeout(() => {
            window.location.href = "panel.html";
        }, 1000);
    });
}

/* ===================== Panel Client ===================== */
const currentUserPanel = JSON.parse(localStorage.getItem("currentUser"));
const userNamePanel = document.getElementById("user-name");
const userEmailPanel = document.getElementById("user-email");
const userFilesEl = document.getElementById("user-files");
const dropZonePanel = document.getElementById("drop-zone");
const fileInputPanel = document.getElementById("file-input");
const uploadResponsePanel = document.getElementById("upload-response");
const passwordResponsePanel = document.getElementById("password-response");

if(!currentUserPanel && window.location.href.includes("panel.html")){
    window.location.href = "Connexion.html";
} else if(currentUserPanel){
    if(userNamePanel) userNamePanel.textContent = currentUserPanel.name;
    if(userEmailPanel) userEmailPanel.textContent = currentUserPanel.email;
}

function logoutPanel(){
    localStorage.removeItem("currentUser");
    window.location.href = "Connexion.html";
}

// Drag & Drop pour panel
if(dropZonePanel && fileInputPanel){
    dropZonePanel.addEventListener("click", () => fileInputPanel.click());
    dropZonePanel.addEventListener("dragover", e => {
        e.preventDefault();
        dropZonePanel.classList.add("dragover");
    });
    dropZonePanel.addEventListener("dragleave", () => dropZonePanel.classList.remove("dragover"));
    dropZonePanel.addEventListener("drop", e => {
        e.preventDefault();
        dropZonePanel.classList.remove("dragover");
        fileInputPanel.files = e.dataTransfer.files;
    });
}

// Upload fichiers pour panel
function uploadFilesPanel(){
    if(!fileInputPanel || !uploadResponsePanel || !currentUserPanel) return;
    const files = fileInputPanel.files;
    if(!files.length){
        uploadResponsePanel.textContent = "Veuillez sélectionner au moins un fichier.";
        uploadResponsePanel.style.color = "red";
        return;
    }

    let users = JSON.parse(localStorage.getItem("adxUsers")) || [];
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e){
            const fileData = {title:file.name, src:e.target.result, type:file.type, date:new Date().toLocaleString()};
            currentUserPanel.videos = currentUserPanel.videos || [];
            currentUserPanel.videos.push(fileData);

            users = users.map(u => {
                if(u.email === currentUserPanel.email) u.videos = currentUserPanel.videos;
                return u;
            });

            localStorage.setItem("adxUsers", JSON.stringify(users));
            localStorage.setItem("currentUser", JSON.stringify(currentUserPanel));
            displayFilesPanel();
        }
        reader.readAsDataURL(file);
    });

    uploadResponsePanel.textContent = "Fichiers uploadés avec succès !";
    uploadResponsePanel.style.color = "green";
    fileInputPanel.value = "";
}

// Afficher fichiers pour panel
function displayFilesPanel(){
    if(!userFilesEl || !currentUserPanel) return;
    userFilesEl.innerHTML = "";
    if(!currentUserPanel.videos || !currentUserPanel.videos.length){
        userFilesEl.innerHTML = "<p>Aucun fichier pour le moment.</p>";
        return;
    }

    currentUserPanel.videos.forEach(file => {
        const div = document.createElement("div");
        div.className = "video-card";
        let mediaHTML = '';
        if(file.type.startsWith("video/")){
            mediaHTML = `<video controls>
                <source src="${file.src}" type="${file.type}">
                Votre navigateur ne supporte pas la lecture vidéo.
            </video>`;
        } else if(file.type.startsWith("audio/")){
            mediaHTML = `<audio controls>
                <source src="${file.src}" type="${file.type}">
                Votre navigateur ne supporte pas la lecture audio.
            </audio>`;
        }
        div.innerHTML = `${mediaHTML}<h4>${file.title}</h4><p>Déposé le : ${file.date}</p>`;
        userFilesEl.appendChild(div);
    });
}

// Modifier le mot de passe
function changePasswordPanel(){
    const newPasswordInput = document.getElementById("new-password");
    if(!newPasswordInput || !passwordResponsePanel || !currentUserPanel) return;
    const newPass = newPasswordInput.value.trim();
    if(!newPass){
        passwordResponsePanel.textContent = "Veuillez entrer un nouveau mot de passe.";
        passwordResponsePanel.style.color = "red";
        return;
    }

    let users = JSON.parse(localStorage.getItem("adxUsers")) || [];
    users = users.map(u => {
        if(u.email === currentUserPanel.email){
            u.password = newPass;
            currentUserPanel.password = newPass;
        }
        return u;
    });

    localStorage.setItem("adxUsers", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(currentUserPanel));

    passwordResponsePanel.textContent = "Mot de passe modifié avec succès !";
    passwordResponsePanel.style.color = "green";
    newPasswordInput.value = "";
}

// Initialiser l'affichage du panel
displayFilesPanel();


const partnersContainer = document.querySelector(".partners-logos");
const partners = [
    {name: "Partner 1", logo: "assets/partners/partner1.png", url: "https://partner1.com"},
    {name: "Partner 2", logo: "assets/partners/partner2.png", url: "https://partner2.com"},
    {name: "Partner 3", logo: "assets/partners/partner3.png", url: "https://partner3.com"}
];

if(partnersContainer){
    partners.forEach(p => {
        const a = document.createElement("a");
        a.href = p.url;
        a.target = "_blank";
        a.innerHTML = `<img src="${p.logo}" alt="${p.name}">`;
        partnersContainer.appendChild(a);
    });
}
