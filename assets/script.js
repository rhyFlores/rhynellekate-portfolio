function initializeDrawingPad() {
  const canvasElement = document.getElementById("drawCanvas");
  const clearButton = document.getElementById("clearBtn");

  if (!canvasElement || !clearButton || !window.fabric) return;

  const canvas = new fabric.Canvas(canvasElement, {
    isDrawingMode: true,
    backgroundColor: "#ffffff",
  });
  canvas.freeDrawingBrush.width = 4;
  canvas.freeDrawingBrush.color = "#7C83FD";
  const colors = ["#7C83FD", "#FF6F59", "#FFC857", "#2B2640"];
  let colorIndex = 0;

  canvas.on("path:created", () => {
    colorIndex = (colorIndex + 1) % colors.length;
    canvas.freeDrawingBrush.color = colors[colorIndex];
  });
  clearButton.addEventListener("click", () => {
    canvas.clear();
    canvas.backgroundColor = "#ffffff";
    canvas.renderAll();
  });
}

// scroll reveal
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 },
);
revealEls.forEach((el) => io.observe(el));

function initializeVideoModal() {
  const videoModal = document.getElementById("videoModal");
  const projectVideo = document.getElementById("projectVideo");
  const videoTrigger = document.querySelector("[data-video-trigger]");
  const videoModalClose = document.querySelector(".video-modal-close");

  if (!videoModal || !projectVideo || !videoTrigger || !videoModalClose) return;

  let lastFocusedElement = videoTrigger;
  const focusableElements = [videoModalClose, projectVideo];
  const closeVideoModal = () => {
    projectVideo.pause();
    projectVideo.currentTime = 0;
    videoModal.hidden = true;
    document.body.style.overflow = "";
    lastFocusedElement.focus();
  };

  videoTrigger.addEventListener("click", (event) => {
    event.preventDefault();
    lastFocusedElement = event.currentTarget;
    videoModal.hidden = false;
    document.body.style.overflow = "hidden";
    videoModalClose.focus();
  });
  videoModalClose.addEventListener("click", closeVideoModal);
  videoModal.addEventListener("click", (event) => {
    if (event.target === videoModal) closeVideoModal();
  });
  document.addEventListener("keydown", (event) => {
    if (videoModal.hidden) return;
    if (event.key === "Escape") {
      closeVideoModal();
      return;
    }
    if (event.key !== "Tab") return;
    event.preventDefault();
    const currentIndex = focusableElements.indexOf(document.activeElement);
    const direction = event.shiftKey ? -1 : 1;
    const nextIndex = (currentIndex + direction + focusableElements.length) % focusableElements.length;
    focusableElements[nextIndex].focus();
  });
}

initializeDrawingPad();
initializeVideoModal();