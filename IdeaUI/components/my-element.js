import { LitElement, html } from 'lit-element';
import '@vaadin/vaadin-text-field';

class MyElement extends LitElement {
	static get properties() {
		return {
			elements: { type: Array },
			task: { type: String }
		};
	}

	constructor() {
		super();
		this.elements = [];
		this.task = '';
	}

	render() {
		return html`
        <div class="input-layout">
            <vaadin-text-field
                placeholder="Search"
                value="${this.task}"
                @change="${this.updateTask}"
            ></vaadin-text-field> 
        </div>
        `;
	}

	updateTask(e) {
		this.task = e.target.value;
	}
}

customElements.define('my-element', MyElement);
