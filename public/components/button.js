class Button extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
            <style>
                .button {
                    outline: none;
                      border: none;
                      padding: .65rem 1rem;
                      margin: 0;
                      background: none;
                      display: flex;
                      cursor: pointer;
                }
                
                .button--solid {
                    background: var(--blue);
                    color: var(--white);
                    cursor: pointer;
                    font-size: 1rem;
                    border-radius: .5rem;
                }
                
                .button--solid:hover, .button--solid:active {
                    background var(--lightBlue);
                }
                
                .button--link {
                    color: var(--blue);
                    cursor: pointer;
                    font-size: 1rem;
                    text-decoration: underline;
                }
                
                .button:hover, .button:active {
                    color: var(--lightBlue);
                }
                
                .button__icon {
                    width: 18px;
                    height: 18px;
                    margin-right: .75rem;
                }
            </style>
            <button
                type="button"
                class="button"
              >
                <slot />
              </button>
        `;
    }

    connectedCallback() {
        this.variant = this.getAttribute("variant") || null;
        this.icon = this.getAttribute("icon") || null;

        this.setStyle();
        this.showIcon();
    }

    showIcon() {
        if(!this.icon) return;

        const icon = document.createElement("img");
        icon.classList.add("button__icon");
        icon.alt = "Back arrow"
        icon.src = this.icon;

        this.shadowRoot.querySelector(".button").prepend(icon);
    }

    setStyle() {
        this.shadowRoot.querySelector(".button").classList.add(`button--${this.variant}`);
    }
}
customElements.define("custom-button", Button);
