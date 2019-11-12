<<<<<<< HEAD
// TODO: Import the css helper function
import { LitElement, html, css } from 'lit-element';
=======
import { LitElement, html } from 'lit-element';
import { HeaderElement}  from './header-element';
import '@vaadin/vaadin-text-field';
>>>>>>> mybranch

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
<<<<<<< HEAD
		<p class="${this.myBool ? 'red' : 'blue'}">styled paragraph</p>
      <p>${this.message}</p>
      <ul>${this.myArray.map((item) => html`<li>${item}</li>`)}</ul>
      ${this.myBool
			? html`<p>Render some HTML if myBool is true</p>`
			: html`<p>Render some other HTML if myBool is false</p>`}
	  <!-- TODO: Add a button with an event listener -->
	  <button @click=${this.clickHandler}>Click</button>
    `;
=======
		<header-element><header-element>
        <div class="input-layout">
            <vaadin-text-field
                placeholder="Search"
                value="${this.task}"
                @change="${this.updateTask}"
            ></vaadin-text-field> 
        </div>
        `;
>>>>>>> mybranch
	}
	// TODO: Add an event handler

	clickHandler(event) {
		console.log(event.target);
		this.myBool = !this.myBool;
	}
}
customElements.define('my-element', MyElement);
