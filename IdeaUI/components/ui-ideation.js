import { LitElement, html, css } from 'lit-element';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-button';

class IdeationUI extends LitElement {
	static get styles() {
		return css`
			#title {
				text-align: center;
				margin: 0 auto;
				padding-top: 150px;
				padding-bottom: 20px;
			}

			.search-field {
				text-align: center;
				padding-bottom: 200px;
			}

			.search-button {
				text-align: center;
			}
		`;
	}

	render() {
		return html`
        <div id="title">
            <h1>Ideation Research Assistant</h1>
        </div>
        <div class="search-field">
            <vaadin-text-field placeholder="Example"></vaadin-text-field>       
        </div>

        <div class="search-button">
            <vaadin-button theme="contrast primary">Search</vaadin-button>
        </div>   
        `;
	}
}

customElements.define('ui-ideation', IdeationUI);
