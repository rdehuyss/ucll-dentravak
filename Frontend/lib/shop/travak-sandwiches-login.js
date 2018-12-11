import DenTravakAbstractElement from '../travak-abstract-element.js';

class DenTravakSandwichesLogin extends DenTravakAbstractElement {

    connectedCallback() {
        super.connectedCallback();
        this.initEventListeners();
    }

    init(sandwich) {
        this.sandwich = sandwich;
    }

    initEventListeners() {
        //this.byId('show-sandwich-list').addEventListener('click', e => this.app().dispatchEvent(new Event('show-sandwich-list')));
    }

    get template() {
        return `
            <style>
                @import url("https://cdnjs.cloudflare.com/ajax/libs/css-social-buttons/1.3.0/css/zocial.css");
                .zocial.google:before {
                    content: url(/lib/icons/google.svg);
                }
                .form-group {
                    margin-bottom: 2rem!important;
                }
                .dt-header {
                    display: flex;
                }
                .dt-header button {
                    margin-left: auto;
                }
                div.dt-sandwich-info {
                    margin-left: auto;
                }
            </style>
            <div class="animate">
                <div class="dt-header">
                    <h3>Welkom bij den Travak</h3>
                </div>
                <h4>Bijna klaar!</h4>
                <p>Hallo, we kennen elkaar nog niet...</p>
                <p>Kan je even inloggen zodanig dat we je broodje voor jou aan de kant kunnen leggen?</p>
                <div>
                    <button class="zocial google" onclick="hello('google').login()">Google</button>
                    <button class="zocial facebook" onclick="hello('facebook').login()">Facebook</button>
                </div>
            </div>
        `;
    }
}

customElements.define('travak-sandwiches-login', DenTravakSandwichesLogin);