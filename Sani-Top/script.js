// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
	navLinks.classList.toggle('active');
	menuToggle.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
	link.addEventListener('click', () => {
		navLinks.classList.remove('active');
		menuToggle.classList.remove('active');
	});
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		const href = this.getAttribute('href');
		if (href !== '#' && document.querySelector(href)) {
			e.preventDefault();
			const target = document.querySelector(href);
			const offsetTop = target.offsetTop - 80;
			window.scrollTo({
				top: offsetTop,
				behavior: 'smooth'
			});
		}
	});
});

// ===== CONTACT FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
	contactForm.addEventListener('submit', async (e) => {
		e.preventDefault();

		// Récupérer les données du formulaire
		const formData = {
			name: document.getElementById('name').value,
			email: document.getElementById('email').value,
			phone: document.getElementById('phone').value,
			service: document.getElementById('service').value,
			message: document.getElementById('message').value,
			date: new Date().toLocaleDateString('fr-FR')
		};

		// Validation simple
		if (!formData.name || !formData.email || !formData.service || !formData.message) {
			showNotification('Veuillez remplir tous les champs obligatoires', 'error');
			return;
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			showNotification('Veuillez entrer une adresse email valide', 'error');
			return;
		}

		try {
			// Simuler l'envoi (en production, vous enverrez à un serveur)
			console.log('Formulaire soumis:', formData);

			// Afficher un message de succès
			showNotification('Merci! Votre demande a été envoyée avec succès. Nous vous recontacterons sous 24h.', 'success');

			// Réinitialiser le formulaire
			contactForm.reset();

			// Scroll vers le message de confirmation
			setTimeout(() => {
				window.scrollTo({
					top: 0,
					behavior: 'smooth'
				});
			}, 1000);
		} catch (error) {
			showNotification('Une erreur s\'est produite. Veuillez réessayer.', 'error');
			console.error('Erreur:', error);
		}
	});
}

// ===== NEWSLETTER FORM =====
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
	newsletterForm.addEventListener('submit', (e) => {
		e.preventDefault();

		const email = newsletterForm.querySelector('input[type="email"]').value;

		if (email) {
			showNotification('Vous avez été ajouté à notre newsletter!', 'success');
			newsletterForm.reset();
		}
	});
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'success') {
	const notification = document.createElement('div');
	notification.className = `notification notification-${type}`;
	notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '✕'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;

	// Ajouter les styles pour les notifications
	const style = document.createElement('style');
	if (!document.getElementById('notification-styles')) {
		style.id = 'notification-styles';
		style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                z-index: 1000;
                animation: slideIn 0.3s ease;
                max-width: 400px;
            }
            
            .notification-success {
                background: #10b981;
                color: white;
            }
            
            .notification-error {
                background: #ef4444;
                color: white;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            
            .notification-icon {
                font-weight: bold;
                font-size: 1.2rem;
            }
            
            .notification-message {
                font-size: 0.95rem;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
            
            @media (max-width: 480px) {
                .notification {
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;
		document.head.appendChild(style);
	}

	document.body.appendChild(notification);

	// Retirer la notification après 4 secondes
	setTimeout(() => {
		notification.style.animation = 'slideOut 0.3s ease';
		setTimeout(() => notification.remove(), 300);
	}, 4000);
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
	threshold: 0.1,
	rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.style.opacity = '1';
			entry.target.style.transform = 'translateY(0)';
		}
	});
}, observerOptions);

// Observer les éléments qui doivent être animés
document.querySelectorAll('.service-card, .benefit-item, .testimonial-card').forEach(el => {
	el.style.opacity = '0';
	el.style.transform = 'translateY(20px)';
	el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
	observer.observe(el);
});

// ===== NAVBAR SHADOW ON SCROLL =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
	if (window.scrollY > 0) {
		navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
	} else {
		navbar.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
	}
});

// ===== FORM FIELD VALIDATION =====
const form = document.getElementById('contactForm');
if (form) {
	const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');

	inputs.forEach(input => {
		input.addEventListener('change', () => {
			if (input.value.trim()) {
				input.style.borderColor = '#10b981';
			}
		});

		input.addEventListener('invalid', (e) => {
			e.preventDefault();
			input.style.borderColor = '#ef4444';
		});
	});
}

// ===== LAZY LOADING IMAGES =====
if ('IntersectionObserver' in window) {
	const imageObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const img = entry.target;
				img.src = img.dataset.src;
				img.classList.add('loaded');
				observer.unobserve(img);
			}
		});
	});

	document.querySelectorAll('img[data-src]').forEach(img => {
		imageObserver.observe(img);
	});
}

// ===== ANALYTICS TRACKING =====
function trackEvent(eventName, eventData = {}) {
	console.log(`Event: ${eventName}`, eventData);
	// Remplacer avec votre solution d'analytics (Google Analytics, etc.)
}

// Tracker les clics sur les CTA
document.querySelectorAll('.btn-primary, .cta-nav').forEach(btn => {
	btn.addEventListener('click', () => {
		trackEvent('CTA_Click', {
			text: btn.textContent,
			location: btn.closest('section')?.id || 'unknown'
		});
	});
});

// Console message
console.log('%c🌱 Bienvenue sur Sani-Top', 'color: #0891b2; font-size: 16px; font-weight: bold;');
console.log('%cSolutions de chauffage écologiques - Énergies renouvelables', 'color: #10b981; font-size: 12px;');