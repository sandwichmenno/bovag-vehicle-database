class SpecCard extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({ mode: 'open' });

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
                
                .spec-card {
                  position: relative;
                  display: flex;
                  flex-direction: column;
                  background-color: var(--white);
                  border-radius: .5rem;
                  border: 1px solid var(--lightGray);
                  color: inherit;
                  text-decoration: none;
                }
                
                .spec-card__body {
                    padding: 1rem;
                }
                
                .spec-card__title {
                    color: var(--muted);
                    font-weight: 400;
                    margin-bottom: 0.5rem;
                    font-size: 0.8rem;
                }
                
                .spec-card__content {
                    font-weight: 600;
                    font-size: 1rem;
                    margin-bottom: 0;
                }
            </style>
            <div class="spec-card">
                <div class="spec-card__body">
                  <h6 class="spec-card__title title"></h6>
                  <h5 class="spec-card__content content"><slot /></h5>
                </div>
              </div>
        `;
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.title').innerText = this.getAttribute("title") || "";
    }
}
customElements.define("spec-card", SpecCard);
