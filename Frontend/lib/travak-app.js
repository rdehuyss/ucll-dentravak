import DenTravakAbstractElement from './travak-abstract-element.js';
import './travak-sandwiches-list.js';
import './travak-sandwiches-checkout.js';
import './travak-sandwiches-order-confirmation.js';

class DenTravakApp extends DenTravakAbstractElement {

    connectedCallback() {
        super.connectedCallback();
        this.showSandwichList();
        this.initEventListeners();
    }

    initEventListeners() {
        this.addEventListener('checkout', (e) => this.showCheckoutPage(e.detail));
        this.addEventListener('order-succeeded', (e) => this.showOrderConfirmationPage(e.detail));
        this.addEventListener('show-sandwich-list', (e) => this.showSandwichList());
    }

    showSandwichList() {
        this.byCss(`travak-sandwiches-list`).classList.remove('hidden');
        this.byCss(`travak-sandwiches-checkout`).classList.add('hidden');
        this.byCss(`travak-sandwiches-order-confirmation`).classList.add('hidden');
    }

    showCheckoutPage(sandwich) {
        this.byCss(`travak-sandwiches-checkout`).init(sandwich);
        this.byCss(`travak-sandwiches-list`).classList.add('hidden');
        this.byCss(`travak-sandwiches-checkout`).classList.remove('hidden');
        this.byCss(`travak-sandwiches-order-confirmation`).classList.add('hidden');
    }

    showOrderConfirmationPage(sandwich) {
        this.byCss(`travak-sandwiches-order-confirmation`).init(sandwich);
        this.byCss(`travak-sandwiches-list`).classList.add('hidden');
        this.byCss(`travak-sandwiches-checkout`).classList.add('hidden');
        this.byCss(`travak-sandwiches-order-confirmation`).classList.remove('hidden');
    }

    get template() {
        return `
            <style>
                .hidden {display: none;}
            </style>
            <travak-sandwiches-list></travak-sandwiches-list>
            <travak-sandwiches-checkout></travak-sandwiches-checkout>
            <travak-sandwiches-order-confirmation></travak-sandwiches-order-confirmation>
        `;
    }

}

customElements.define('travak-app', DenTravakApp);