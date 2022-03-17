class VehicleCard extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({ mode: 'open'});

        this.shadowRoot.innerHTML = `
            <style>
                h5, h6 {
                    margin-top: 0;
                    margin-bottom: .5rem;
                    font-weight: 500;
                    line-height: 1.2;
                }
                
                h5 {
                    font-size: 1.25rem;
                }
                
                h6 {
                    font-size: 1rem;
                }
            
                .vehicle-card {
                  position: relative;
                  display: flex;
                  flex-direction: column;
                  background-color: #fff;
                  border-radius: 1rem;
                  box-shadow: var(--box-shadow-xl);
                  overflow: hidden;
                  color: inherit;
                  text-decoration: none;
                  transition: all .35s;
                  cursor: pointer;
                }
                
                .vehicle-card:hover {
                    box-shadow: var(--box-shadow-xxl);
                    transform: translateY(-6px);
                  }
                
                .vehicle-card__image-wrapper {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    height: 160px;
                    overflow: hidden;
                  }
                
                .vehicle-card__image {
                    display: block;
                    min-width: 100%;
                    max-width: 100%;
                    height: auto;
                    object-fit: contain;
                  }
                
                .vehicle-card__body {
                    padding: 1rem;
                  }
                
                .vehicle-card__title {
                    font-weight: 600;
                    font-size: 1.25rem;
                    margin-bottom: .5rem;
                
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                
                .vehicle-card__type {
                    color: var(--gray);
                    font-weight: 400;
                    margin-top: -.25rem;
                
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                
                .vehicle-card__specs {
                    display: flex;
                    align-items: center;
                    flex-direction: row;
                    margin-top: 1rem;
                  }
                
                .vehicle-card__price {
                    font-weight: 600;
                    margin-top: .5rem;
                  }
            </style>
            
            <div class="vehicle-card" role="button">
                <div class="vehicle-card__image-wrapper">
                    <img class="vehicle-card__image image" />
                </div>
            
                <div class="vehicle-card__body">
                    <h5 class="vehicle-card__title title"></h5>
                    <h6 class="vehicle-card__type type"></h6>
                    <div class="vehicle-card__specs specs">
                        <info-badge class="transmission" icon="assets/gearstick.svg"></info-badge>
                        <info-badge class="seats" icon="assets/car-seat.svg"></info-badge>
                    </div>
                    <h5 class="vehicle-card__price price"></h5>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.title').innerText = this.getAttribute("title") || "";
        this.shadowRoot.querySelector('.type').innerText = this.getAttribute("type") || "";
        this.shadowRoot.querySelector('.price').innerText = this.formatPrice(this.getAttribute("price") || "0");
        this.shadowRoot.querySelector('.image').src = this.getAttribute("image") || "";

        this.shadowRoot.querySelector('.transmission').innerText = this.getAttribute("transmission") || "";
        this.shadowRoot.querySelector('.seats').innerText = this.getAttribute("seats") || "";
    }

    formatPrice(price) {
        return "€ " + price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
}
customElements.define("vehicle-card", VehicleCard);
