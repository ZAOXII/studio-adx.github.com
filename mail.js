// Récupération du formulaire
const form = document.getElementById("contact-form");

form.addEventListener("submit", function(e) {
    e.preventDefault(); // Empêche l'envoi classique

    // Récupère les valeurs du formulaire
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Adresse mail de destination
    const toEmail = "avoxesportoff@gmail.com";

    // Sujet et corps du mail encodés pour URL
    const subject = encodeURIComponent("Message depuis ADX Studio");
    const body = encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    // Ouvre le client mail par défaut
    window.location.href = `mailto:${toEmail}?subject=${subject}&body=${body}`;

    // Réinitialise le formulaire
    form.reset();
});
