// accordion
const accordion = document.querySelector(".accordion")
const accordionBtns = document.querySelectorAll(".accordion-btn, .przycisk123")
const categoryBtn = document.querySelectorAll(".accordion-btn-category")
const specialButton = document.querySelector(".przycisk123")

function openAccordionItems() {
	if (this.nextElementSibling && this.nextElementSibling.classList) {
		const isActive = this.nextElementSibling.classList.contains("active")
		closeAccordionItem()
		if (!isActive) {
			this.nextElementSibling.classList.add("active")
		}
	}
}
function openCategory() {
	if (this.nextElementSibling) {
		this.nextElementSibling.classList.toggle("active")
	}
	const przycisk123 = this.querySelector(".przycisk123")
	przycisk123.classList.toggle("rotate")
}
const closeAccordionItem = () => {
	const allActiveItems = document.querySelectorAll(".accordion-info")
	allActiveItems.forEach((item) => item.classList.remove("active"))
}

const clickOutsideAccordion = (e) => {
	if (
		e.target.classList.contains("accordion-btn") ||
		e.target.classList.contains("accordion-info") ||
		e.target.classList.contains("accordion-info-text") ||
		e.target.classList.contains("przycisk123")
	)
		return

	closeAccordionItem()
}

accordionBtns.forEach((btn) =>
	btn.addEventListener("click", openAccordionItems)
)
categoryBtn.forEach((btn) => btn.addEventListener("click", openCategory))

window.addEventListener("click", clickOutsideAccordion)

// burger menu

const burger = document.querySelector(".burger")
const toggleMenu = () => {
	const menu = document.querySelector(".navbar__list")
	const body = document.querySelector("body")
	menu.classList.toggle("burger-active")
	body.classList.toggle("no-scroll")
}

const navbarItems = document.querySelectorAll(".navbar__list-item")
navbarItems.forEach((link) => {
	link.addEventListener("click", function () {
		const menu = document.querySelector(".navbar__list")
		if (menu.classList.contains("burger-active")) {
			menu.classList.remove("burger-active")
			document.querySelector("body").classList.remove("no-scroll")
		}
	})
})

burger.addEventListener("click", toggleMenu)

// fade in
const cardSection = document.querySelector(".portfolio")
const cards = cardSection.querySelectorAll(".fade-in")

const options = {
	rootMargin: "-110px",
}

const observer = new IntersectionObserver((entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			cards.forEach((card, index) => {
				setTimeout(() => {
					card.style.opacity = 1
				}, index * 500) // Delay for each card
			})
			observer.unobserve(entry.target)
		}
	})
}, options)

observer.observe(cardSection)

// slider
let slideIndex = 1
let mouseDown = false
let startX
let sliderContainer = document.querySelector(".slider")
let slider = document.querySelector(".slider")
let autoSlideInterval;
const prevBtn = document.querySelector(".arrow-prev")
const nextBtn = document.querySelector(".arrow-next")
const arrows = document.querySelectorAll('.arrow')
sliderContainer.addEventListener("mousedown", handleMouseDown)
sliderContainer.addEventListener("mouseup", handleMouseUp)
sliderContainer.addEventListener("mousemove", handleMouseMove)

function handleMouseMove(event) {
	if (mouseDown) {
		const currentX = event.clientX || event.pageX
		const diffX = startX - currentX

		if (Math.abs(diffX) > 50) {
			if (diffX > 0) {
				nextSlide()
			} else {
				prevSlide()
			}
			mouseDown = false
		}
	}
}

function handleMouseDown(event) {
	mouseDown = true
	startX = event.clientX || event.pageX
}

function handleMouseUp() {
	mouseDown = false
}

function nextSlide() {
	showSlides((slideIndex += 1))
}

function prevSlide() {
	showSlides((slideIndex -= 1))
}

function currentSlide(n) {
	showSlides((slideIndex = n))
}

function showSlides(n) {
	let i
	let slides = document.getElementsByClassName("slide")
	let dots = document.getElementsByClassName("dot")

	if (n > slides.length) {
		slideIndex = 1
	}

	if (n < 1) {
		slideIndex = slides.length
	}

	for (i = 0; i < slides.length; i++) {
		slides[i].style.transform = "translateX(-" + (slideIndex - 1) * 100 + "%)"
		slides[i].classList.remove("active")
	}

	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "")
	}
	slides[slideIndex - 1].classList.add("active")
	dots[slideIndex - 1].className += " active"
}
function startAutoSlide() {
	autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 3000);
}
showSlides(slideIndex)
startAutoSlide()


nextBtn.addEventListener("click", nextSlide)
prevBtn.addEventListener("click", prevSlide)
arrows.forEach(btn=>{
	btn.addEventListener('mouseenter',()=>{
		clearInterval(autoSlideInterval);
	})
	btn.addEventListener('mouseleave',()=>{
		startAutoSlide();
	})
})