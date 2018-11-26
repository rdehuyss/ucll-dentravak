import DenTravakAbstractElement from './travak-abstract-element.js';

class DenTravakSandwichesList extends DenTravakAbstractElement {

    connectedCallback() {
        super.connectedCallback();
        fetch('/api/sandwiches.json')
            .then(resp => resp.json())
            .then(json => this.updateSandwichesList(json));
    }

    updateSandwichesList(sandwiches) {
        let sandwichesList = this.byId('sandwiches');
        //sandwichesList.innerHTML = ``;
        sandwiches.forEach(sandwich => {
            let sandwichEl = htmlToElement(this.getSandwichTemplate(sandwich));
            sandwichEl.addEventListener('click', () => this.app().dispatchEvent(new CustomEvent('checkout', {detail: sandwich})));
            sandwichesList.appendChild(sandwichEl);
        });
    }

    get template() {
        return `
            <style>
                div.dt-sandwich-info {
                    margin-left: auto;
                }
            </style>
            <div class="animate">
                <h3>Welkom bij den Travak</h3>
                <h4>Kies je broodje</h4>
                <div>
                <ul id="sandwiches" class="list-group">
                    </ul>
                </div>
            </div>
        `;
    }

    getSandwichTemplate(sandwich) {
        return `
            <a class="list-group-item">
                <button type="button" class="btn btn-primary bmd-btn-fab">
                    ${sandwich.name.charAt(0)}
                </button>
                <div class="bmd-list-group-col">
                    <p class="list-group-item-heading">${sandwich.name}</p>
                    <p class="list-group-item-text">${sandwich.ingredients}</p>
                </div>
                <div class="dt-sandwich-info">
                    <p class="list-group-item-text">${sandwich.price}</p>
                </div>
            </a>
        `;
    }
}

customElements.define('travak-sandwiches-list', DenTravakSandwichesList);