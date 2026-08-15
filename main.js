/* ==========================================================================
   APEX GLOBAL TALENT - INTERACTIVE UI SCRIPT (main.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Sticky Navbar Dynamic Scroll Effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // 2. Animated Counter for Stats Section (Index Page)
  const counters = document.querySelectorAll('.counter');
  let counterAnimated = false;

  const runCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1800; // 1.8 seconds duration
      const step = target / (duration / 16); // 60 FPS update

      let current = 0;
      const updateCount = () => {
        current += step;
        if (current < target) {
          counter.innerText = Math.ceil(current) + '+';
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target + '+';
        }
      };
      updateCount();
    });
  };

  const statsSection = document.querySelector('.stats-bar');
  if (statsSection) {
    window.addEventListener('scroll', () => {
      const sectionPos = statsSection.getBoundingClientRect().top;
      const screenPos = window.innerHeight;

      if (sectionPos < screenPos - 50 && !counterAnimated) {
        counterAnimated = true;
        runCounters();
      }
    });
  }

  // 3. Smooth Hover Split-Screen Animation Enhancements (Index Page)
  const splitPanes = document.querySelectorAll('.split-pane');
  splitPanes.forEach(pane => {
    pane.addEventListener('mouseenter', () => {
      pane.style.transition = 'flex 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    });
  });

  // 4. Client-side Interactive Job Search Filter (Jobs Page)
  const filterForm = document.querySelector('form');
  if (filterForm && window.location.pathname.includes('jobs.html')) {
    const searchInput = filterForm.querySelector('input[type="text"]');
    const jobCards = document.querySelectorAll('.glass-card');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        jobCards.forEach(card => {
          const title = card.querySelector('h3') ? card.querySelector('h3').innerText.toLowerCase() : '';
          const desc = card.querySelector('p') ? card.querySelector('p').innerText.toLowerCase() : '';
          
          if (title.includes(searchTerm) || desc.includes(searchTerm)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    }
  }

});

// ==========================================================================
  // BULLETPROOF FAQ ACCORDION INTERACTION
  // ==========================================================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation(); // Event bubbling stop karne ke liye
      
      const answer = item.querySelector('.faq-answer');
      const isCurrentlyOpen = item.classList.contains('active');

      // 1. Pehle saare FAQs ko band karo
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        if (otherAnswer) {
          otherAnswer.style.display = 'none';
        }
      });

      // 2. Agar clicked wala closed tha, toh sirf usko kholo (Toggle Effect)
      if (!isCurrentlyOpen) {
        item.classList.add('active');
        if (answer) {
          answer.style.display = 'block';
        }
      }
    });
  });