class VehicleOverview extends HTMLElement{
    static get observedAttributes() { return ['vehicle']; }

    constructor(){
        super();
        this.attachShadow({ mode: 'open'});

        this.shadowRoot.innerHTML = `
            <style>
                h3, h5, h6 {
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
                
                .vehicle__header {
                    margin-bottom: 2rem;
                }
                
                .vehicle__header-title {
                    margin-top: 1rem;
                }
                
                .vehicle__header-price {
                    font-weight: 600;
                }
                
                .vehicle__image-wrapper {
                    width: 100%;
                    height: auto;
                    margin: 0 auto;
                }
                
                .vehicle__block {
                    display: grid;
                    margin-top: 2rem;
                }
                
                .vehicle__block--border {
                    border-radius: .5rem;
                    border: 1px solid var(--lightGray);
                    padding: 1rem;
                }
                
                .vehicle__block--cards {
                    grid-template-columns: repeat(2, 1fr);
                    grid-column-gap: 1rem;
                    grid-row-gap: 1rem;
                }
                
                .vehicle__block--collapsed {
                    display: none;
                }
                
                .vehicle__block-header {
                    width: 100%;
                    grid-column-start: 1;
                    grid-column-end: 3;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                  }
                  
                .vehicle__block-title {
                    margin-bottom: 0;
                }
                  
                .vehicle__block-body {
                    margin-top: 0.rem;
                }
                
                .vehicle__info {
                    width: 100%;
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    grid-column-gap: 1rem;
                    grid-row-gap: 1rem;
                  }
                
                .vehicle__info-header {
                    color: var(--muted);
                    display: block;
                }
                
                .vehicle__info-content {
                    display: block;
                }
                
                /* Large screens */
                @media only screen and (min-width: 992px) {
                    .vehicle__block--cards {
                        grid-template-columns: repeat(4, 1fr);
                    }
                    
                    .vehicle__block-header {
                        grid-column-end: 5;
                    }
                    
                    .vehicle__info {
                          grid-template-columns: repeat(3, 1fr);
                          grid-row-gap: 2rem;
                      }
                }
            </style>

            <div class="vehicle">
                <div class="vehicle__header">
                      <custom-button class="vehicle__block-button button-back" variant="solid" icon="assets/arrow-left.svg">
                        Alle voertuigen
                      </custom-button>
                    <h1 class="vehicle__header-title title"></h1>
                    <h2 class="vehicle__header-price price"></h2>
                  </div>
                  
                  <div class="vehicle__image-wrapper">
                    <slide-show class="slider"></slide-show>
                  </div>
                  
                  <div class="vehicle__block vehicle__block--cards">
                    <div class="vehicle__block-header">
                      <h3 class="vehicle__block-title">Specificaties</h3>
                      <custom-button class="vehicle__block-button button-spec" variant="link">
                        Bekijk meer
                      </custom-button>
                    </div>
                    
                    <spec-card title="Kilometerstand" class="mileage"></spec-card>
                    <spec-card title="Transmissie" class="transmission"></spec-card>
                    <spec-card title="Brandstof" class="fuel"></spec-card>
                    <spec-card title="Bouwjaar" class="year"></spec-card>
                  </div>
                  
                  <div id="specs" class="vehicle__block vehicle__block--border vehicle__block--collapsed">
                      <div class="vehicle__info">
                        <div class="vehicle__info-row">
                          <span class="vehicle__info-header">Body</span>
                          <span class="vehicle__info-content type"></span>
                        </div>
            
                        <div class="vehicle__info-row">
                          <span class="vehicle__info-header">Deuren</span>
                          <span class="vehicle__info-content doors"></span>
                        </div>
            
                        <div class="vehicle__info-row">
                          <span class="vehicle__info-header">Stoelen</span>
                          <span class="vehicle__info-content seats"></span>
                        </div>
            
                        <div class="vehicle__info-row">
                          <span class="vehicle__info-header">Versnellingen</span>
                          <span class="vehicle__info-content gears"></span>
                        </div>
            
                        <div class="vehicle__info-row">
                          <span class="vehicle__info-header">Kleur</span>
                          <span class="vehicle__info-content color"></span>
                        </div>
                      </div>
                    </div>
                  
                   <div class="vehicle__block">
                    <div class="vehicle__block-header">
                      <h3 class="vehicle__block-title">Accessories</h3>
                    </div>
            
                    <div class="vehicle__block-body accessories"></div>
                  </div>
            </div>
        `;
    }

    connectedCallback() {
        this.expandSpecifications = false;

        this.shadowRoot.querySelector(".button-spec").shadowRoot.querySelector(".button").onclick = () => this.toggleSpecifications();
        this.shadowRoot.querySelector(".button-back").shadowRoot.querySelector(".button").onclick = () => this.hide();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.vehicle = JSON.parse(this.getAttribute("vehicle") || null);
        this.expandSpecifications = false;

        if(!this.vehicle) return;

        const { id, brand, model, images, bodyType, price, doorCount, seatCount, color, gearCount, accessories, transmission, yearOfManufacture, fuelType, mileage } = this.vehicle;

        this.shadowRoot.querySelector('.title').innerText = `${brand} ${model}`
        this.shadowRoot.querySelector('.price').innerText = this.formatPrice(price.toString());
        this.shadowRoot.querySelector('.type').innerText = bodyType;
        this.shadowRoot.querySelector('.doors').innerText = doorCount;
        this.shadowRoot.querySelector('.seats').innerText = seatCount;
        this.shadowRoot.querySelector('.gears').innerText = gearCount;
        this.shadowRoot.querySelector('.color').innerText = color;
        this.shadowRoot.querySelector('.mileage').innerText = this.formatDistance(mileage.toString());
        this.shadowRoot.querySelector('.fuel').innerText = fuelType;
        this.shadowRoot.querySelector('.year').innerText = yearOfManufacture;
        this.shadowRoot.querySelector('.transmission').innerText = transmission;
        this.shadowRoot.querySelector('.slider').setAttribute("slides", images);

        this.renderAccessories(accessories);
    }

    hide() {
        document.querySelector("#vehicles").classList.remove("vehicles-list--hidden");
        document.querySelector("#vehicle").classList.add("vehicle-overview--hidden");

        const vehicleOverview = document.querySelector("#vehicle");
        vehicleOverview.setAttribute("vehicle", null);

        this.reset();
    }

    reset() {
        this.expandSpecifications = false;

        this.shadowRoot.querySelector("#specs").classList.add("vehicle__block--collapsed");
        this.shadowRoot.querySelector(".button-spec").textContent = "Bekijk meer";
        this.shadowRoot.querySelector(".accessories").innerHTML = "";
    }

    toggleSpecifications() {
        if(this.expandSpecifications) {
            this.shadowRoot.querySelector("#specs").classList.add("vehicle__block--collapsed");
            this.shadowRoot.querySelector(".button-spec").textContent = "Bekijk meer";
        } else {
            this.shadowRoot.querySelector("#specs").classList.remove("vehicle__block--collapsed");
            this.shadowRoot.querySelector(".button-spec").textContent = "Bekijk minder";
        }

        this.expandSpecifications = !this.expandSpecifications;
    }

    renderAccessories(accessories) {
        accessories.forEach((accessorie) => {
            const element = document.createElement('info-badge');
            element.innerText = accessorie;

            this.shadowRoot.querySelector(".accessories").appendChild(element);
        });
    }

    formatPrice(price) {
        return "€ " + price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }

    formatDistance(distance) {
        return distance.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ") + " km";
    }
}
customElements.define("vehicle-overview", VehicleOverview);
