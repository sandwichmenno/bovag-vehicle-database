class Badge extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({ mode: 'open'});

        this.shadowRoot.innerHTML = `
            <style>
                .badge {
                    width: auto;
                      display: inline-flex;
                      flex-grow: 0;
                      align-items: center;
                      padding: .5em .75em;
                      margin-right: .5rem;
                      margin-bottom: .5rem;
                      font-size: .9em;
                      font-weight: 700;
                      line-height: 1;
                      color: var(--white);
                      text-align: center;
                      white-space: nowrap;
                      vertical-align: baseline;
                      border-radius: .5rem;
                      background-color: var(--blue);
                }
                
                .badge__icon-wrapper {
                    width: 18px;
                    height: 18px;
                    margin-right: 0.5rem;
                }
                
                .badge__icon {
                    width: 100%;
                    max-width: 18px;
                    height: auto;
                }
            </style>
            <div class="badge">
                <span class="badge__content"><slot /></span>
              </div>
        `;
    }

    connectedCallback() {
        this.icon = this.getAttribute("icon") || null;

        this.showIcon();
    }

    showIcon() {
        if(!this.icon) return;

        const icon = document.createElement("span");
        icon.classList.add("badge__icon-wrapper");
        icon.innerHTML = `<img class="badge__icon" src="${this.icon}" alt="icon" />`;

        this.shadowRoot.querySelector(".badge").prepend(icon);
    }
}
customElements.define("info-badge", Badge);
