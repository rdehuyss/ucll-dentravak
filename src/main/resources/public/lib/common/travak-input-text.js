import DenTravakAbstractElement from '../travak-abstract-element.js';

class InputTextFormGroup extends DenTravakAbstractElement {
    
    connectedCallback() {
        if(!this.getAttribute('id')) throw 'id is required';
        if(!this.getAttribute('label')) throw 'label is required';
        if(!this.getAttribute('placeholder')) throw 'placeholder is required';
        super.connectedCallback();
    }

    get value() {
        return this.field().value;
    }

    set value(val) {
        this.field().value = val;
    }

    get template() {
        return `
            <div class="form-group">
                <label for="fg-${this.getAttribute('id')}">${this.getAttribute('label')}</label>
                <input type="text" class="form-control" id="fg-${this.getAttribute('id')}" placeholder="${this.getAttribute('placeholder')}">
            </div>
            `;
    }

    field() {
        return this.shadowRoot.querySelector(`#fg-${this.getAttribute('id')}`);
    }
  }
  customElements.define('travak-input-text', InputTextFormGroup);