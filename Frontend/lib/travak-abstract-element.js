export default class DenTravakAbstractElement extends HTMLElement {

    connectedCallback() {
        this.initShadowDom();
    }

    initShadowDom() {
        if(this.shadowRoot) return;
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = this.template;
        shadowRoot.insertBefore(document.getElementById('styletemplate').content.cloneNode(true), shadowRoot.childNodes[0]);
        $(shadowRoot).bootstrapMaterialDesign();
    }

    app() {
        return document.querySelector('travak-app');
    }

    byId(id) {
        return this.shadowRoot.querySelector(`#${id}`);
    }

    byCss(cssSelector) {
        return this.shadowRoot.querySelector(cssSelector);
    }

    get template() {
        throw "You did not define a Template!!"
    }
}