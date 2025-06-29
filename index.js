// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initNavigation()
  initAnimatedCounters()
  initScrollAnimations()
  initSmoothScrolling()
  initParallaxEffects()
  initGlowEffects()
})

// Navigation functionality
function initNavigation() {
  const navbar = document.querySelector(".navbar")
  const navToggle = document.querySelector(".nav-toggle")
  const navMenu = document.querySelector(".nav-menu")

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(10, 10, 10, 0.95)"
      navbar.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.3)"
    } else {
      navbar.style.background = "rgba(10, 10, 10, 0.9)"
      navbar.style.boxShadow = "none"
    }
  })

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      navToggle.classList.toggle("active")

      // Animate hamburger menu
      const spans = navToggle.querySelectorAll("span")
      if (navToggle.classList.contains("active")) {
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
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
        navToggle.classList.remove("active")

        const spans = navToggle.querySelectorAll("span")
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      })
    })
  }
}

// Animated counters for statistics
function initAnimatedCounters() {
  const counters = document.querySelectorAll(".stat-number")
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target)
        counterObserver.unobserve(entry.target)
      }
    })
  }, observerOptions)

  counters.forEach((counter) => {
    counterObserver.observe(counter)
  })
}

function animateCounter(element) {
  const target = Number.parseInt(element.getAttribute("data-target"))
  const duration = 2500 // 2.5 seconds
  const increment = target / (duration / 16) // 60fps
  let current = 0

  const updateCounter = () => {
    current += increment
    if (current < target) {
      element.textContent = Math.floor(current).toLocaleString("pt-BR")
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = target.toLocaleString("pt-BR")

      // Add special formatting
      const label = element.parentElement.querySelector(".stat-label").textContent
      if (label.includes("%")) {
        element.textContent += "%"
      } else if (label.includes("Corridas") || label.includes("Usuários") || label.includes("Cidades")) {
        element.textContent = "+" + element.textContent
      }

      // Add glow effect when animation completes
      element.style.textShadow = "0 0 20px rgba(255, 107, 53, 0.5)"
      setTimeout(() => {
        element.style.textShadow = "none"
      }, 1000)
    }
  }

  updateCounter()
}

// Scroll animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".service-card-modern, .stat-card-modern, .app-section")

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 100) // Stagger animation
      }
    })
  }, observerOptions)

  animatedElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(50px)"
    element.style.transition = "opacity 0.8s ease, transform 0.8s ease"
    animationObserver.observe(element)
  })
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()

      const targetId = link.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80 // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

// Parallax effects
function initParallaxEffects() {
  const glowOrbs = document.querySelectorAll(".glow-orb")
  const floatingElements = document.querySelectorAll(".float-element")

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const rate = scrolled * -0.3

    glowOrbs.forEach((orb, index) => {
      const speed = (index + 1) * 0.2
      orb.style.transform = `translateY(${rate * speed}px)`
    })

    floatingElements.forEach((element, index) => {
      const speed = (index + 1) * 0.1
      element.style.transform = `translateY(${rate * speed}px)`
    })
  })
}

// Glow effects on hover
function initGlowEffects() {
  const cards = document.querySelectorAll(".service-card-modern, .stat-card-modern")

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.boxShadow = "0 0 60px rgba(255, 107, 53, 0.3)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.boxShadow = "none"
    })
  })

  // Button glow effects
  const buttons = document.querySelectorAll(".btn-primary-glow, .btn-driver-glow, .btn-passenger-glow")

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      button.style.boxShadow = "0 0 80px rgba(255, 107, 53, 0.6)"
    })

    button.addEventListener("mouseleave", () => {
      button.style.boxShadow = "0 0 40px rgba(255, 107, 53, 0.3)"
    })
  })
}

// Phone mockup interactions
function initPhoneMockups() {
  const phones = document.querySelectorAll(".phone-mockup")

  phones.forEach((phone) => {
    phone.addEventListener("mouseenter", () => {
      phone.style.transform += " scale(1.05)"
      phone.style.boxShadow = "0 0 80px rgba(255, 107, 53, 0.4)"
    })

    phone.addEventListener("mouseleave", () => {
      phone.style.transform = phone.style.transform.replace(" scale(1.05)", "")
      phone.style.boxShadow = "0 0 60px rgba(0, 0, 0, 0.8), inset 0 0 0 1px rgba(255, 255, 255, 0.1)"
    })
  })
}

// Initialize phone mockups
document.addEventListener("DOMContentLoaded", () => {
  initCitiesMarquee();
});

function initCitiesMarquee() {
  const marquee = document.querySelector('.cities-marquee');
  if (!marquee) return;

  // (Opcional) Duplica o conteúdo para garantir loop visual suave, se faltar.
  // Mas seu HTML já tem as cidades duplicadas.

  // Responsivo: recalcula velocidade se o conteúdo for menor que o container
  const container = marquee.parentElement;
  function resetMarqueeAnimation() {
    // Remove animação para recalcular
    marquee.style.animation = "none";
    // Força reflow
    void marquee.offsetWidth;
    // Aplica a animação novamente
    marquee.style.animation = "";
  }

  // Recalcula na resize
  window.addEventListener("resize", resetMarqueeAnimation);
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
  // Additional scroll-based animations can be added here
}, 10)

window.addEventListener("scroll", debouncedScrollHandler)

// Add click tracking for analytics
function trackButtonClick(buttonName) {
  console.log(`Button clicked: ${buttonName}`)
  // Integration with analytics service would go here
}

// Add event listeners for app download buttons
document.addEventListener("DOMContentLoaded", () => {
  const appButtons = document.querySelectorAll(".app-button-modern")
  appButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const buttonText = button.querySelector(".app-store-name").textContent
      trackButtonClick(buttonText)

      // Add click animation
      button.style.transform = "scale(0.95)"
      setTimeout(() => {
        button.style.transform = "translateY(-2px)"
      }, 150)
    })
  })

  const ctaButtons = document.querySelectorAll(".btn")
  ctaButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      trackButtonClick(button.textContent.trim())

      // Add ripple effect
      const ripple = document.createElement("span")
      ripple.style.position = "absolute"
      ripple.style.borderRadius = "50%"
      ripple.style.background = "rgba(255, 255, 255, 0.3)"
      ripple.style.transform = "scale(0)"
      ripple.style.animation = "ripple 0.6s linear"
      ripple.style.left = "50%"
      ripple.style.top = "50%"
      ripple.style.width = "20px"
      ripple.style.height = "20px"
      ripple.style.marginLeft = "-10px"
      ripple.style.marginTop = "-10px"

      button.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })
})

// Add CSS for ripple animation
const style = document.createElement("style")
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .keyboard-navigation .btn:focus,
    .keyboard-navigation .nav-link:focus,
    .keyboard-navigation .app-button-modern:focus {
        outline: 2px solid #FF6B35;
        outline-offset: 2px;
    }
`
document.head.appendChild(style)

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("keyboard-navigation")
  }
})

document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-navigation")
})

// Loading animation
function addLoadingAnimation() {
  const body = document.body
  body.style.opacity = "0"
  body.style.transition = "opacity 0.8s ease"

  window.addEventListener("load", () => {
    body.style.opacity = "1"
  })
}

// Initialize loading animation
addLoadingAnimation()

// Add intersection observer for hero elements
function initHeroAnimations() {
  const heroElements = document.querySelectorAll(".hero-badge, .hero-title, .hero-subtitle, .hero-stats, .hero-cta")

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 200)
      }
    })
  }, observerOptions)

  heroElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    element.style.transition = "opacity 0.8s ease, transform 0.8s ease"
    heroObserver.observe(element)
  })
}

// Initialize hero animations
document.addEventListener("DOMContentLoaded", initHeroAnimations)
