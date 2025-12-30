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

// Reset le formulaire au chargement de la page
window.addEventListener('pageshow', function(event) {
	const form = document.querySelector('form');
	if (form) {
		form.reset();
	}
});