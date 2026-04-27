"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const bookingForm = document.getElementById("bookingForm");
  const contactForm = document.getElementById("contactForm");
  const bookingSuccess = document.getElementById("bookingSuccess");
  const contactSuccess = document.getElementById("contactSuccess");
  const heroVideo = document.getElementById("heroVideo");
  const videoLabel = document.getElementById("videoLabel");
  const dateInput = document.getElementById("date");

  const videos = [
    {
      src: "video/community-workout.mp4",
      label: "Community Fitness"
    },
    {
      src: "video/parkrun.mp4",
      label: "Park Run"
    },
    {
      src: "video/wellbeing-yoga.mp4",
      label: "Wellbeing Yoga"
    }
  ];

  let currentVideoIndex = 0;
  let videoTimer = null;

  if (bookingSuccess) {
    bookingSuccess.style.display = "none";
  }

  if (contactSuccess) {
    contactSuccess.style.display = "none";
  }

  function playHeroVideo(index) {
    if (!heroVideo || !videos[index]) return;

    heroVideo.pause();
    heroVideo.src = videos[index].src;
    heroVideo.muted = true;
    heroVideo.playsInline = true;
    heroVideo.loop = false;
    heroVideo.load();

    if (videoLabel) {
      videoLabel.textContent = videos[index].label;
    }

    const playPromise = heroVideo.play();

    if (playPromise !== undefined) {
      playPromise.catch(function () {
        if (videoLabel) {
          videoLabel.textContent = "Video ready";
        }
      });
    }
  }

  function nextHeroVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    playHeroVideo(currentVideoIndex);
  }

  if (heroVideo) {
    playHeroVideo(currentVideoIndex);

    heroVideo.addEventListener("ended", function () {
      nextHeroVideo();
    });

    videoTimer = window.setInterval(function () {
      nextHeroVideo();
    }, 12000);
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (!targetElement) return;

      event.preventDefault();

      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  if (dateInput) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    dateInput.min = `${year}-${month}-${day}`;
  }

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

      const savedBookings = JSON.parse(
        localStorage.getItem("activeStepsBookings") || "[]"
      );

      savedBookings.push(bookingData);

      localStorage.setItem(
        "activeStepsBookings",
        JSON.stringify(savedBookings)
      );

      if (bookingSuccess) {
        bookingSuccess.style.display = "block";
        bookingSuccess.textContent =
          "Thank you. Your booking request has been saved.";
      }

      bookingForm.reset();
    });
  }

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

      const savedMessages = JSON.parse(
        localStorage.getItem("activeStepsMessages") || "[]"
      );

      savedMessages.push(contactData);

      localStorage.setItem(
        "activeStepsMessages",
        JSON.stringify(savedMessages)
      );

      if (contactSuccess) {
        contactSuccess.style.display = "block";
        contactSuccess.textContent =
          "Thank you. Your message has been saved.";
      }

      contactForm.reset();
    });
  }

  const fadeItems = document.querySelectorAll(
    ".fade-up, .class-card, .price-card, .testimonial, .faq-card, .gallery-item, .stat-card"
  );

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

  window.addEventListener("beforeunload", function () {
    if (videoTimer) {
      window.clearInterval(videoTimer);
    }
  });
});
