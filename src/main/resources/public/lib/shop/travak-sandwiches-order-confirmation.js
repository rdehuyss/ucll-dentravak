import DenTravakAbstractElement from '../travak-abstract-element.js';

class DenTravakSandwichesOrderConfirmation extends DenTravakAbstractElement {

    connectedCallback() {
        super.connectedCallback();
        this.initEventListeners();
    }

    init(order) {
        this.order = order;
    }

    initEventListeners() {
        this.byId('show-sandwich-list').addEventListener('click', e => this.app().dispatchEvent(new Event('show-sandwich-list')));
        this.shadowRoot.querySelectorAll('button.score')
            .forEach(scoreBtn => scoreBtn.addEventListener('click', e => {

                let recommendedItem = {};
                recommendedItem.emailAddress = this.order.phoneNumber;
                recommendedItem.ratedItem = this.order.sandwichId;
                recommendedItem.rating = scoreBtn.dataset.score;

                fetch('http://localhost:8081/recommend/', {
                    method: "POST", // *GET, POST, PUT, DELETE, etc.
                    mode: "cors", // no-cors, cors, *same-origin
                    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    body: JSON.stringify(recommendedItem),
                })
                .then(response => response.json())
                .then(resAsJson => alert('Thanks for the rating'));
                
            }));
    }

    get template() {
        return `
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            <style>
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
                    <button id="show-sandwich-list" type="button" class="btn btn-primary">Nieuwe bestelling</button>
                </div>
                <h4>Bedankt!</h4>
                <p>Wij hebben je bestelling goed ontvangen en je kan je broodje komen ophalen vanaf 11u45.</p>
                <p>Tot zo dadelijk!</p>

                <h4>Hoe vond je het broodje?</h4>
                <button type="button" class="btn btn-primary bmd-btn-fab score" data-score="1">1</button>    
                <button type="button" class="btn btn-primary bmd-btn-fab score" data-score="2">2</button>
                <button type="button" class="btn btn-primary bmd-btn-fab score" data-score="3">3</button>    
                <button type="button" class="btn btn-primary bmd-btn-fab score" data-score="4">4</button>    
                <button type="button" class="btn btn-primary bmd-btn-fab score" data-score="5">5</button>    
            </div>
        `;
    }
}

customElements.define('travak-sandwiches-order-confirmation', DenTravakSandwichesOrderConfirmation);