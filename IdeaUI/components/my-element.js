import { LitElement, css, html } from 'lit-element';
import { HeaderElement } from './header-element';
import '@vaadin/vaadin-text-field';

class MyElement extends LitElement {
	static get properties() {
		return {
			message: { type: String },
			myBool: { type: Boolean },
			myArray: { type: Array }
		};
	}

	static get styles() {
		return css`
			p {
				font-family: Roboto;
				font-size: 16px;
				font-weight: 500;
			}
			.red {
				color: red;
			}
			.blue {
				color: blue;
			}
		`;
	}

	// TODO: Import the css helper function
	constructor() {
		super();
		this.message = 'Hello world! From my-element';
		this.myArray = [ 'an', 'array', 'of', 'test', 'data' ];
		this.myBool = true;
	}
	render() {
		return html`
		<header-element><header-element>
        <div class="input-layout">
            <vaadin-text-field
                placeholder="Search"
                value="${this.task}"
                @change="${this.updateTask}"
            ></vaadin-text-field> 
        </div>
        `;
	}
	// TODO: Add an event handler

	clickHandler(event) {
		console.log(event.target);
		this.myBool = !this.myBool;
	}
}
customElements.define('my-element', MyElement);
