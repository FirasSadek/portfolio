const PROJECTS = [
  {
    id: "weather-app",
    title: "Weather App",
    label: "Personal project",
    year: "2025",
    description:
      "A simple, responsive weather app that lets you search any city and instantly see the current weather conditions — temperature, description, humidity, and wind speed — with an animated icon that matches the forecast.",
    tech: ["HTML", "CSS", "JavaScript", "Weather API"],
    live: "",
    github: "",
    images: [
      {
        src: "images/projects/weather-app/1.png",
        alt: "Weather App home screen with the current temperature",
      },
      {
        src: "images/projects/weather-app/2.png",
        alt: "Weather App search results for a city",
      },
      {
        src: "images/projects/weather-app/3.png",
        alt: "Weather App multi-day forecast",
      },
      {
        src: "images/projects/weather-app/4.png",
        alt: "Weather App on a mobile screen",
      },
    ],
  },
  {
    id: "tashkila",
    title: "TASHKILA",
    label: "Personal project",
    year: "2025",
    description:
      "Is a modern sports web application landing page designed to help users easily book sports fields, create teams, and participate in exciting tournaments.",
    tech: ["HTML", "CSS", "JavaScript", "Responsive Design", "Bootstrap"],
    live: "",
    github: "",
    images: [
      {
        src: "images/projects/tashkila/1.png",
        alt: "TASHKILA landing page",
      },
      {
        src: "images/projects/tashkila/2.png",
        alt: "TASHKILA main content section",
      },
      {
        src: "images/projects/tashkila/3.png",
        alt: "TASHKILA details page",
      },
      {
        src: "images/projects/tashkila/4.png",
        alt: "TASHKILA details page",
      },
      {
        src: "images/projects/tashkila/5.png",
        alt: "TASHKILA details page",
      },
      {
        src: "images/projects/tashkila/6.png",
        alt: "TASHKILA details page",
      },
      {
        src: "images/projects/tashkila/7.png",
        alt: "TASHKILA details page",
      },
    ],
  },
  // {
  //   id: "guess-the-word",
  //   title: "Guess the Word",
  //   label: "Personal project",
  //   year: "2025",
  //   description:
  //     "..............................................................................................",
  //   tech: ["HTML", "CSS", "JavaScript", "DOM"],
  //   live: "",
  //   github: "",
  //   images: [
  //     {
  //       src: "images/projects/guess-the-word/1.png",
  //       alt: "Guess the Word start screen",

  //     },
  //     {
  //       src: "images/projects/guess-the-word/2.png",
  //       alt: "Guess the Word game in progress",

  //     },
  //     {
  //       src: "images/projects/guess-the-word/3.png",
  //       alt: "Guess the Word win screen",

  //     },
  //     {
  //       src: "images/projects/guess-the-word/4.png",
  //       alt: "Guess the Word game over screen",

  //     },
  //   ],
  // },
];

(function () {
  "use strict";

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* =========================================================
     HELPERS
     ========================================================= */

  // Create an element with an optional class and text
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  // Decorative dim HTML tag (hidden from screen readers)
  function tagSpan(text) {
    const s = el("span", "tag", text);
    s.setAttribute("aria-hidden", "true");
    return s;
  }

  // 1 -> "01"
  const pad2 = (n) => String(n).padStart(2, "0");

  // Create an <img> inside a ".imgbox"; on error the box gets ".failed" and shows the fallback text
  function makeImg(data, box, lazy) {
    const img = document.createElement("img");
    img.alt = (data && data.alt) || "";
    if (lazy) img.loading = "lazy";
    img.addEventListener("error", () => box.classList.add("failed"));
    if (data && data.src) img.src = data.src;
    else box.classList.add("failed");
    return img;
  }

  /* =========================================================
     MOBILE MENU (hamburger)
     ========================================================= */
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");

  function setMenu(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  toggle.addEventListener("click", () =>
    setMenu(!nav.classList.contains("open")),
  );
  nav
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", () => setMenu(false)));

  /* =========================================================
     TYPING ANIMATION (hero heading)
     ========================================================= */
  function typeHeading() {
    const lines = [
      { el: document.getElementById("line1"), text: "Hi,", hl: -1 },
      { el: document.getElementById("line2"), text: "I'm Firas", hl: 4 }, // index of the cyan "F"
      {
        el: document.getElementById("line3"),
        text: "Front-End developer",
        hl: -1,
      },
    ];
    lines.forEach((l) => (l.el.textContent = ""));

    let lineIndex = 0;
    let charIndex = 0;

    function step() {
      if (lineIndex >= lines.length) return;
      const line = lines[lineIndex];
      const ch = line.text[charIndex];

      if (charIndex === line.hl) {
        const span = document.createElement("span");
        span.className = "hl";
        span.textContent = ch;
        line.el.appendChild(span);
      } else {
        line.el.appendChild(document.createTextNode(ch));
      }

      charIndex++;
      if (charIndex >= line.text.length) {
        lineIndex++;
        charIndex = 0;
      }
      setTimeout(step, 70);
    }
    step();
  }
  if (!reduceMotion) typeHeading(); // otherwise the full heading stays visible

  /* =========================================================
     FADE-IN ON SCROLL
     ========================================================= */
  const fadeEls = document.querySelectorAll(".fade");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    fadeEls.forEach((elm) => fadeObserver.observe(elm));
  } else {
    fadeEls.forEach((elm) => elm.classList.add("visible"));
  }

  /* =========================================================
     ACTIVE NAV LINK WHILE SCROLLING
     ========================================================= */
  const navLinks = document.querySelectorAll("#mainNav a");
  const sections = ["skills", "work", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function updateActive() {
    const marker = window.scrollY + window.innerHeight * 0.35;
    let current = null;
    sections.forEach((s) => {
      if (s.offsetTop <= marker) current = s.id;
    });
    navLinks.forEach((a) =>
      a.classList.toggle("active", a.getAttribute("href") === "#" + current),
    );
  }
  window.addEventListener("scroll", updateActive, { passive: true });
  updateActive();

  /* =========================================================
     PROJECT ROWS (generated from the PROJECTS array)
     ========================================================= */
  function renderProjects() {
    const list = document.getElementById("projectList");

    PROJECTS.forEach((p, i) => {
      const li = el("li", "proj-item");
      li.appendChild(tagSpan("<article>"));

      const article = el("article", "proj-row");

      // LEFT: cover screenshot (a real button that opens the gallery)
      const cover = el("button", "proj-shot imgbox");
      cover.type = "button";
      cover.setAttribute("aria-label", "Open " + p.title + " gallery");
      cover.appendChild(makeImg(p.images[0], cover, true));
      cover.appendChild(el("span", "fallback", "Screenshot coming soon"));
      cover.addEventListener("click", () => openGallery(i, cover));

      // RIGHT: meta, title, description, tech tags, actions
      const info = el("div", "proj-info");

      const meta = el("p", "proj-meta");
      meta.appendChild(el("span", "idx", pad2(i + 1)));
      meta.appendChild(document.createTextNode(p.label + " · " + p.year));

      const tech = el("ul", "tech");
      p.tech.forEach((t) => tech.appendChild(el("li", "", t)));

      const actions = el("div", "proj-actions");
      const galleryBtn = el("button", "btn", "View gallery");
      galleryBtn.type = "button";
      galleryBtn.addEventListener("click", () => openGallery(i, galleryBtn));

      // Dim decorative <button> tags above and below the button
      const btnWrap = el("div", "proj-btn");
      btnWrap.append(tagSpan("<button>"), galleryBtn, tagSpan("</button>"));
      actions.appendChild(btnWrap);

      // Live and GitHub links are only rendered when a URL exists
      [
        ["Live", p.live],
        ["GitHub", p.github],
      ].forEach(([name, url]) => {
        if (!url) return;
        const a = el("a", "proj-link", name);
        a.href = url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.setAttribute("aria-label", name + " link for " + p.title);
        actions.appendChild(a);
      });

      // Dim decorative <p> tags above and below the description
      info.append(
        meta,
        el("h3", "proj-title", p.title),
        tagSpan("<p>"),
        el("p", "proj-desc", p.description),
        tagSpan("</p>"),
        tech,
        actions,
      );
      article.append(cover, info);
      li.appendChild(article);
      li.appendChild(tagSpan("</article>"));
      list.appendChild(li);
    });
  }
  renderProjects();

  /* =========================================================
     GALLERY MODAL
     ========================================================= */
  const modal = document.getElementById("galleryModal");
  const modalInner = document.getElementById("modalInner");
  const closeBtn = document.getElementById("modalClose");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const stage = document.getElementById("stage");
  const modalImg = document.getElementById("modalImg");
  const thumbsBox = document.getElementById("thumbs");

  const state = { project: null, index: 0, trigger: null };
  const isOpen = () => modal.classList.contains("open");

  // The main image is reused, so its handlers are attached once
  modalImg.addEventListener("error", () => stage.classList.add("failed"));
  modalImg.addEventListener("load", () => stage.classList.remove("failed"));

  // Build the thumbnail strip for the current project
  function buildThumbs() {
    thumbsBox.textContent = "";
    const total = state.project.images.length;
    state.project.images.forEach((data, k) => {
      const b = el("button", "thumb imgbox");
      b.type = "button";
      b.setAttribute("aria-label", "Show image " + (k + 1) + " of " + total);
      b.appendChild(makeImg({ src: data.src, alt: "" }, b, true));
      b.appendChild(el("span", "fallback", "Screenshot coming soon"));
      b.addEventListener("click", () => showImage(k));
      thumbsBox.appendChild(b);
    });
  }

  // Show image n (wraps around at both ends)
  function showImage(n) {
    const imgs = state.project.images;
    const total = imgs.length;
    state.index = (n + total) % total;
    const data = imgs[state.index];

    stage.classList.remove("failed");
    if (data.src) {
      modalImg.src = data.src;
    } else {
      modalImg.removeAttribute("src");
      stage.classList.add("failed");
    }
    modalImg.alt = data.alt || "";
    document.getElementById("modalCaption").textContent = data.caption || "";
    document.getElementById("modalCount").textContent =
      state.index + 1 + " / " + total;

    // Active thumbnail: cyan border, full opacity, aria-current
    Array.from(thumbsBox.children).forEach((b, k) => {
      if (k === state.index) {
        b.setAttribute("aria-current", "true");
        b.scrollIntoView({
          block: "nearest",
          inline: "center",
          behavior: reduceMotion ? "auto" : "smooth",
        });
      } else {
        b.removeAttribute("aria-current");
      }
    });

    // Preload the neighbour images
    [state.index - 1, state.index + 1].forEach((k) => {
      const d = imgs[(k + total) % total];
      if (d && d.src) new Image().src = d.src;
    });
  }

  function openGallery(projectIndex, trigger) {
    const p = PROJECTS[projectIndex];
    state.project = p;
    state.trigger = trigger;

    document.getElementById("modalMeta").textContent = p.label + " · " + p.year;
    document.getElementById("modalTitle").textContent = p.title;
    document.getElementById("modalTech").textContent = p.tech.join(" · ");
    prevBtn.hidden = nextBtn.hidden = p.images.length < 2;

    buildThumbs();
    showImage(0);

    modal.scrollTop = 0;
    modal.classList.add("open");
    document.body.classList.add("modal-open"); // lock page scroll
    requestAnimationFrame(() => closeBtn.focus());
  }

  function closeGallery() {
    if (!isOpen()) return;
    modal.classList.remove("open");
    document.body.classList.remove("modal-open"); // restore page scroll
    if (state.trigger) state.trigger.focus(); // return focus to the opener
  }

  // Keep Tab focus inside the modal while it is open
  function trapFocus(e) {
    const items = Array.from(modal.querySelectorAll("button")).filter(
      (b) => !b.hidden,
    );
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (!modal.contains(document.activeElement)) {
      e.preventDefault();
      first.focus();
    } else if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  closeBtn.addEventListener("click", closeGallery);
  prevBtn.addEventListener("click", () => showImage(state.index - 1));
  nextBtn.addEventListener("click", () => showImage(state.index + 1));

  // Click on the dark backdrop closes the modal
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target === modalInner) closeGallery();
  });

  // Keyboard: Esc closes, arrows change image, Tab is trapped
  document.addEventListener("keydown", (e) => {
    if (!isOpen()) return;
    if (e.key === "Escape") closeGallery();
    else if (e.key === "ArrowLeft") showImage(state.index - 1);
    else if (e.key === "ArrowRight") showImage(state.index + 1);
    else if (e.key === "Tab") trapFocus(e);
  });

  // Touch swipe on the main image
  let touchX = null;
  let touchY = null;
  stage.addEventListener(
    "touchstart",
    (e) => {
      touchX = e.changedTouches[0].clientX;
      touchY = e.changedTouches[0].clientY;
    },
    { passive: true },
  );
  stage.addEventListener(
    "touchend",
    (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      const dy = e.changedTouches[0].clientY - touchY;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy))
        showImage(state.index + (dx < 0 ? 1 : -1));
      touchX = null;
    },
    { passive: true },
  );

  /* =========================================================
     CONTACT CARD: COPY TO CLIPBOARD
     ========================================================= */
  const copyStatus = document.getElementById("copyStatus");

  // Modern clipboard API first, then an older fallback for insecure contexts
  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (err) {
      /* fall through to the fallback */
    }

    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (err) {
      ok = false;
    }
    ta.remove();
    return ok;
  }

  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const ok = await copyText(btn.dataset.copy);
      btn.focus(); // the fallback may have moved focus
      btn.textContent = ok ? "Copied!" : "Failed";
      btn.classList.toggle("done", ok);
      copyStatus.textContent = ok
        ? "Copied to clipboard: " + btn.dataset.copy
        : "Copy failed. Please copy it manually.";
      setTimeout(() => {
        btn.textContent = "copy";
        btn.classList.remove("done");
        copyStatus.textContent = "";
      }, 1800);
    });
  });
})();
