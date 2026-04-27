Yes — save this as:

```text
js/script.js
```

```javascript
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const bookingForm = document.getElementById("bookingForm");
  const contactForm = document.getElementById("contactForm");
  const bookingSuccess = document.getElementById("bookingSuccess");
  const contactSuccess = document.getElementById("contactSuccess");
  const heroVideo = document.getElementById("heroVideo");
  const videoLabel = document.getElementById("videoLabel");

  // Hide success messages on page load
  if (bookingSuccess) bookingSuccess.style.display = "none";
  if (contactSuccess) contactSuccess.style.display = "none";

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        event.preventDefault();
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // Booking form
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!bookingForm.checkValidity()) {
        bookingForm.reportValidity();
        return;
      }

      const bookingData = {
        name: document.getElementById("name")?.value.trim() || "",
        email: document.getElementById("email")?.value.trim() || "",
        classType: document.getElementById("classType")?.value || "",
        date: document.getElementById("date")?.value || "",
        message: document.getElementById("message")?.value.trim() || "",
        submittedAt: new Date().toISOString()
      };

      const savedBookings = JSON.parse(localStorage.getItem("activeStepsBookings") || "[]");
      savedBookings.push(bookingData);
      localStorage.setItem("activeStepsBookings", JSON.stringify(savedBookings));

      if (bookingSuccess) {
        bookingSuccess.style.display = "block";
        bookingSuccess.textContent = "Thank you. Your booking request has been saved.";
      }

      bookingForm.reset();
    });
  }

  // Contact form
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      const contactData = {
        name: document.getElementById("contactName")?.value.trim() || "",
        email: document.getElementById("contactEmail")?.value.trim() || "",
        message: document.getElementById("contactMessage")?.value.trim() || "",
        submittedAt: new Date().toISOString()
      };

      const savedMessages = JSON.parse(localStorage.getItem("activeStepsMessages") || "[]");
      savedMessages.push(contactData);
      localStorage.setItem("activeStepsMessages", JSON.stringify(savedMessages));

      if (contactSuccess) {
        contactSuccess.style.display = "block";
        contactSuccess.textContent = "Thank you. Your message has been saved.";
      }

      contactForm.reset();
    });
  }

  // Hero video safety
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.playsInline = true;

    const playPromise = heroVideo.play();

    if (playPromise !== undefined) {
      playPromise.catch(function () {
        if (videoLabel) {
          videoLabel.textContent = "Video ready";
        }
      });
    }
  }

  // Fade-up animation when sections enter the screen
  const fadeItems = document.querySelectorAll(".fade-up, .class-card, .price-card, .testimonial, .faq-card");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15
      }
    );

    fadeItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    fadeItems.forEach(function (item) {
      item.classList.add("visible");
    });
  }

  // Set minimum booking date to today
  const dateInput = document.getElementById("date");

  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }
});
```
