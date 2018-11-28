export default class DenTravakAbstractElement extends HTMLElement {

    constructor(appName = "travak-app") {
        super();
        this.appName = appName;
    }

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
        return document.querySelector(this.appName);
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