const wEls = document.querySelectorAll(".window");
const wLinks = document.querySelectorAll(".open-window");
const wCloseBtn = [...wEls].map((el) =>
  el.querySelector(".window__close")
);
const pairCloseW = [...wLinks].map((el, index) => [el, wCloseBtn[index]]);
const wStatusBar = [...wEls].map((el) =>
  el.querySelector(".window__status-bar")
);

pairCloseW.forEach((arr, index) => {
  const windowStatusBar = wStatusBar[index]
  arr.forEach((el) => {
    let active = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    function dragStart(e) {
      wEls.forEach(w => w.style.zIndex = "auto")
      e.path[1].style.zIndex = "100"
      if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
      } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
      }

      if (e.target === windowStatusBar) {
        active = true;
      }
    }

    function dragEnd(e) {
      initialX = currentX;
      initialY = currentY;
      active = false;
      e.path[1].style.zIndex = "20"
    }

    function drag(e) {
      if (active) {
        e.preventDefault();

        if (e.type === "touchmove") {
          currentX = e.touches[0].clientX - initialX;
          currentY = e.touches[0].clientY - initialY;
        } else {
          currentX = e.clientX - initialX;
          currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, wEls[index]);
      }
    }

    function setTranslate(xPos, yPos, el) {
      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }

    wEls[index].addEventListener("touchstart", dragStart, false);
    wEls[index].addEventListener("touchend", dragEnd, false);
    wEls[index].addEventListener("touchmove", drag, false);

    wEls[index].addEventListener("mousedown", dragStart, false);
    wEls[index].addEventListener("mouseup", dragEnd, false);
    wEls[index].addEventListener("mousemove", drag, false);

    el.addEventListener("click", () => {
      wEls[index].classList.toggle("visible");
      console.log(el);
    });
  });
});
