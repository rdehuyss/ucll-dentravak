import DenTravakAbstractElement from '../travak-abstract-element.js';
import './travak-order-list.js';
import './travak-sandwiches-list.js';
import './travak-edit-sandwich.js';

class DenTravakAdminApp extends DenTravakAbstractElement {

    connectedCallback() {
        super.connectedCallback();
        this.showOrderList();
        this.initEventListeners();
    }

    initEventListeners() {
        this.addEventListener('edit-sandwiches', (e) => this.showSandwichList());
        this.addEventListener('edit-sandwich', (e) => this.showEditSandwich(e.detail));
        this.addEventListener('new-sandwich', (e) => this.showEditSandwich());
        this.addEventListener('save-succeeded', (e) => {
            $(this.byId('save-succeeded-snackbar')).snackbar("show");
            this.showSandwichList();
        });

    }

    showOrderList() {
        this.byCss(`travak-order-list`).classList.remove('hidden');
        this.byCss(`travak-sandwiches-list`).classList.add('hidden');
        this.byCss(`travak-edit-sandwich`).classList.add('hidden');
    }

    showSandwichList() {
        this.byCss(`travak-order-list`).classList.add('hidden');
        this.byCss(`travak-sandwiches-list`).classList.remove('hidden');
        this.byCss(`travak-edit-sandwich`).classList.add('hidden');
    }

    showEditSandwich(sandwich) {
        this.byCss(`travak-edit-sandwich`).init(sandwich);
        this.byCss(`travak-sandwiches-list`).classList.add('hidden');
        this.byCss(`travak-edit-sandwich`).classList.remove('hidden');
    }

    get template() {
        return `
            <style>
                .hidden {display: none;}
                .top {margin-top: 20px;}
            </style>
            <div class="top"></div>
            <travak-order-list></travak-order-list>
            <travak-sandwiches-list></travak-sandwiches-list>
            <travak-edit-sandwich></travak-edit-sandwich>
            <span id="save-succeeded-snackbar" data-toggle=snackbar data-content="Save succeeded!"></span>
        `;
    }

}

customElements.define('travak-admin-app', DenTravakAdminApp);