class AlertNotification extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({ mode: 'open'});

        this.shadowRoot.innerHTML = `
            <style>
                .alert {
                    width: 100%;
                      display: flex;
                      align-items: center;
                      position: relative;
                      overflow: hidden;
                      padding: .75rem 1rem;
                }
                
                .alert__icon-wrapper {
                    width: 24px;
                    height: 24px;
                    margin-right: 1rem;
                }
             
                .alert__icon {
                    width: 100%;
                    height: 100%;
                }
             
                .alert--error {
                    background: rgb(254, 215, 215);
                }
             
                .alert--success {
                    background: rgb(198, 246, 213);
                }
             
                .alert--warning {
                    background: rgb(254, 235, 200);
                }
             
                .alert--info {
                    background: rgb(190, 227, 248);
                }
            </style>
            <div class="alert" role="alert">
              <span class="alert__icon-wrapper">
                <img class="alert__icon" />
              </span>
              <slot />
            </div>
        `;
    }

    connectedCallback() {
        this.type = this.getAttribute("type") || "error";
        this.shadowRoot.querySelector(".alert").classList.add(`alert--${this.type}`);

        this.setIcon();
    }

    setIcon() {
        let icon = "";

        switch (this.type) {
            case "error":
                icon = "assets/error-icon.svg";
                break;
            case "warning":
                icon = "assets/error-icon.svg";
                break;
            case "info":
                icon = "assets/info-icon.svg";
                break;
            case "success":
                icon = "assets/check-icon.svg";
                break;
            default:
                icon = "assets/error-icon.svg";
        }

        this.shadowRoot.querySelector(".alert__icon").src = icon;
    }
}
customElements.define("alert-notification", AlertNotification);
