class Spinner extends HTMLElement{
    static get observedAttributes() { return ['visible']; }

    constructor(){
        super();
        this.attachShadow({ mode: 'open'});

        this.shadowRoot.innerHTML = `
            <style>
                @keyframes spinner {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            
                .spinner {
                    margin: 3rem auto;
                    font-size: 0.375rem;
                    position: relative;
                    text-indent: -9999em;
                    border-top: 0.5rem solid rgba(49, 130, 206, 0.2);
                    border-right: 0.5rem solid rgba(49, 130, 206, 0.2);
                    border-bottom: 0.5rem solid rgba(49, 130, 206, 0.2);
                    border-left: 0.5rem solid var(--blue);
                    transform: translateZ(0);
                    animation: spinner .65s infinite linear;
                    overflow: hidden;
                }
                
                .spinner, .spinner:after {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                }
                
                .spinner--hidden {
                    display: none;
                }
            </style>
            <div class="spinner"><slot /></div>
        `;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.toggleVisibility(newValue);
    }

    toggleVisibility(visibility) {
        const spinner = this.shadowRoot.querySelector(".spinner");

        if(visibility === "true") {
            spinner.classList.remove("spinner--hidden");
        } else {
            spinner.classList.add("spinner--hidden");
        }
    }
}
customElements.define("loading-spinner", Spinner);
