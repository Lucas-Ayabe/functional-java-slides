class SnapScroll {
  constructor(elements, initialIndex = 0) {
    if (initialIndex >= elements.length) {
      throw new Error("provided initial index doesn't exists.");
    }

    /**
     * @type {HTMLCollection&NodeList}
     * @private
     */
    this.elements = elements;
    this.index = initialIndex;
    this.scrolling = false;

    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.moveTo = this.moveTo.bind(this);
  }

  next() {
    if (this.index + 1 < this.elements.length) {
      this.index++;
      this.moveTo(this.index);
    }
  }

  prev() {
    if (this.index - 1 >= 0) {
      this.index--;
      this.moveTo(this.index);
    }
  }

  moveTo(index) {
    this.elements[index].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  init() {
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("wheel", ({ deltaY }) => {
      const isScrollingUp = deltaY < 0;
      const scroll = isScrollingUp ? this.prev : this.next;
      scroll();
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown" || event.key === "ArrowRight") this.next();
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") this.prev();
    });
  }
}

function app() {
  const sections = document.querySelectorAll("[data-snap]");
  const snapScroll = new SnapScroll(sections);
  snapScroll.init();
}

document.addEventListener("DOMContentLoaded", app);
