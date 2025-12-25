// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle")
const navLinks = document.getElementById("navLinks")

menuToggle.addEventListener("click", () => {
	navLinks.classList.toggle("active")

	// Animate hamburger
	const spans = menuToggle.querySelectorAll("span")
	if (navLinks.classList.contains("active")) {
		spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
		spans[1].style.opacity = "0"
		spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
	} else {
		spans[0].style.transform = "none"
		spans[1].style.opacity = "1"
		spans[2].style.transform = "none"
	}
})

// Close mobile menu when clicking on a link
navLinks.querySelectorAll("a").forEach((link) => {
	link.addEventListener("click", () => {
		navLinks.classList.remove("active")
		const spans = menuToggle.querySelectorAll("span")
		spans[0].style.transform = "none"
		spans[1].style.opacity = "1"
		spans[2].style.transform = "none"
	})
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault()
		const target = document.querySelector(this.getAttribute("href"))
		if (target) {
			target.scrollIntoView({
				behavior: "smooth",
				block: "start",
			})
		}
	})
})

// Contact form submission
const contactForm = document.getElementById("contactForm")
const notification = document.getElementById("notification")

function showNotification(message, isError = false) {
	notification.textContent = message
	notification.classList.toggle("error", isError)
	notification.classList.add("show")

	setTimeout(() => {
		notification.classList.remove("show")
	}, 4000)
}

contactForm.addEventListener("submit", async (e) => {
	e.preventDefault()

	const formData = new FormData(contactForm)
	const data = Object.fromEntries(formData)

	// Validation
	if (!data.name || !data.email || !data.phone || !data.service) {
		showNotification("Veuillez remplir tous les champs obligatoires.", true)
		return
	}

	// Email validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	if (!emailRegex.test(data.email)) {
		showNotification("Veuillez entrer une adresse email valide.", true)
		return
	}

	// Simulate form submission
	console.log("[v0] Form submitted:", data)

	// Show success message
	showNotification("Votre demande a été envoyée avec succès ! Nous vous contacterons sous 24h.")

	// Reset form
	contactForm.reset()
})

// Scroll animations
const observerOptions = {
	threshold: 0.1,
	rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.style.opacity = "1"
			entry.target.style.transform = "translateY(0)"
		}
	})
}, observerOptions)

// Animate elements on scroll
document.querySelectorAll(".trust-item, .service-block, .testimonial-card, .brand-logo").forEach((el) => {
	el.style.opacity = "0"
	el.style.transform = "translateY(30px)"
	el.style.transition = "all 0.6s ease-out"
	observer.observe(el)
})

// Track CTA clicks
document.querySelectorAll(".btn-primary, .btn-phone, .btn-arrow").forEach((btn) => {
	btn.addEventListener("click", (e) => {
		const btnText = e.target.textContent || e.target.getAttribute("href")
		console.log("[v0] CTA clicked:", btnText)
	})
})
