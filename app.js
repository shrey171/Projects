const container = document.querySelector(".container");
const projectsList = document.getElementById("projects-list");
const mobileProjectList = document.querySelector(".mobile");
const imageStrip = document.getElementById("image-strip");
const list = [...projects.main, ...projects.bonus];

const initDesktopProjectList = () => {
  list.forEach((item, idx) => {
    const projectItem = document.createElement("a");
    projectItem.href = item.url;
    projectItem.className = "projects-item border-b";
    projectItem.innerHTML = `<p class='project-name'>${item.name}</p><p class='project-type f-sans'>${item.type}</p>`;

    const projectItemTween = gsap.to(projectItem.children, {
      x: gsap.utils.wrap([30, -30]),
      color: "#999D9E",
      duration: 0.3,
      ease: "power2.inOut",
      paused: true
    });

    projectItem.addEventListener("mouseenter", e => {
      const yPercent = (idx / list.length) * -100;
      gsap.to(".image-strip", {
        yPercent,
        ease: "power1.inOut",
        duration: 0.4,
      });
      projectItemTween.play();
    });

    projectItem.addEventListener("mouseleave", e => {
      const target = e.currentTarget.children;
      projectItemTween.reverse();
    });

    projectsList.appendChild(projectItem);
    const imageWrapper = document.createElement("div");
    imageWrapper.className = "image-wrapper";
    imageWrapper.style.backgroundColor = item.color;
    imageWrapper.innerHTML = `<img src='${item.image}' alt='${item.name}'>`;
    imageStrip.appendChild(imageWrapper);
  });
};

const initMobileProjectList = () => {
  list.forEach((item, idx) => {
    const projectItem = document.createElement("div");
    projectItem.className = "projects-item";
    projectItem.innerHTML = `
      <a href="${item.url}" class="image-wrapper" style='background-color: ${item.color}'>
        <img src='${item.image}' alt="${item.name}-image" />
      </a>
      <div class="content">
        <p class="project-name border-b">${item.name}</p>
        <p class="project-type">${item.type}</p>
      </div>`;
    mobileProjectList.appendChild(projectItem);
  });
};

const initProjectWindow = () => {
  gsap.set(".window-move", { scale: 0, xPercent: -50, yPercent: -50 });

  const moveWindow = (e, isInstant) => {
    let duration = gsap.utils.wrap([0.6, 0.3, 0.2]);
    if (isInstant) duration = 0;
    const { clientX, clientY } = e;
    gsap.to(".window-move", {
      x: clientX,
      y: clientY,
      ease: "power2",
      duration,
    });
  };

  projectsList.addEventListener("mouseenter", e => {
    moveWindow(e, true);
    gsap.to(".window-move", { scale: 1, ease: "power2.out" });
  });
  projectsList.addEventListener("mousemove", moveWindow);
  projectsList.addEventListener("mouseleave", e => {
    gsap.to(".window-move", {
      scale: 0,
      overwrite: "auto",
      duration: 0.3,
      ease: "power1.in",
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(Flip, ScrollTrigger, MotionPathPlugin, CustomEase);
  initDesktopProjectList();
  initMobileProjectList();
  initProjectWindow();
});
