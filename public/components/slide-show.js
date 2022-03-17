class SlideShow extends HTMLElement{
    static get observedAttributes() { return ['slides']; }

    constructor(){
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
            <style>
                .slider {
                    width: 100%;
                    overflow: hidden;
                }
                
                .slider__container {
                    white-space: nowrap;
                    transition: ease 1000ms;
                }
                
                .slider__slide {
                    display: inline-block;
                    width: 100%;
                }
                
                .slider__slide-image {
                    max-width: 100%;
                    max-height: 100%;
                }
                
                .slider__thumbs {
                    width: 100%;
                    display: grid;
                    overflow-x: auto;
                    grid-template-columns: repeat(auto-fit, 160px);
                    grid-column-gap: 1rem;
                }
                
                .slider__thumb {
                    flex: 0 0 160px;
                    width: 160px;
                    cursor: pointer;
                }
                
                .slider__thumb--active {
                    opacity: 0.5;
                }
                
                .slider__thumb-image {
                    max-width: 100%;
                    max-height: 100%;
                }
            </style>
            
            <div class="slider" role="tablist">
              <div class="slider__container images"></div>
              <div class="slider__thumbs thumbs"></div>
            </div>
        `;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.slides = newValue.split(",") || [];
        this.currentSlide = 0;
        this.shadowRoot.querySelector(".images").innerHTML = "";
        this.shadowRoot.querySelector(".thumbs").innerHTML = "";

        this.renderSlides();
        this.renderThumbs();
        this.showSlide();
    }

    handleThumbClick(index) {
        this.currentSlide = index;

        this.showSlide();
        this.setActiveThumb();
    }

    showSlide() {
        this.shadowRoot.querySelector(".images").style.transform = `translate3d(${-this.currentSlide * 100}%, 0, 0)`;
    }

    setActiveThumb() {
        this.shadowRoot.querySelector(".slider__thumb--active").classList.remove("slider__thumb--active");
        this.shadowRoot.querySelector(`[data-slide="${this.currentSlide}"]`).classList.add("slider__thumb--active");
    }

    renderSlides() {
        this.getChunksFromArray(this.slides, 4).forEach((image, index) => {
            const srcSet = image.map((img, inx) => `${API_URL}${img} ${IMAGE_SIZES[inx]}`);

            const slide = document.createElement("div");
            slide.setAttribute("role", "tabpanel");
            slide.classList.add("slider__slide");
            slide.innerHTML = `
                <img
                    alt="Image of the car"
                    srcSet="${srcSet}"
                    sizes="(min-width: 1200px) 1920w,
                        (min-width: 992px) 1280w,
                        (min-width: 768px) 640w,
                        320w"
                    class="slider__slide-image"
                />`

            this.shadowRoot.querySelector(".images").appendChild(slide);
        });
    }

    renderThumbs() {
        this.getChunksFromArray(this.slides, 4).forEach((image, index) => {
            const srcSet = image.map((img, inx) => `${API_URL}${img} ${IMAGE_SIZES[inx]}`);

            const thumb = document.createElement("div");
            thumb.classList.add("slider__thumb");
            thumb.setAttribute("role", "tab");
            thumb.dataset.slide = index.toString();
            thumb.onclick = () => this.handleThumbClick(index);

            if(index === 0) thumb.classList.add("slider__thumb--active");

            thumb.innerHTML = `
                 <img
                    alt="Thumbnail of the car"
                    class="slider__thumb-image"
                    src="${API_URL}${image[0]}"
                  />`

            this.shadowRoot.querySelector(".thumbs").appendChild(thumb);
        });
    }

    getChunksFromArray(arr, len) {
        const chunks = [];
        let i = 0;
        let n = arr.length;

        while (i < n) {
            chunks.push(arr.slice(i, (i += len)));
        }

        return chunks;
    }
}
customElements.define("slide-show", SlideShow);
