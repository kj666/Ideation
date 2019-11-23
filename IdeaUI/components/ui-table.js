import { LitElement, html, css } from 'lit-element';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-ordered-layout';

export class TableUI extends LitElement {
	static get styles() {
		return css`
			// table {
			// 	margin: auto;
			// 	border-spacing: 60px 20px;
			// }
			// td {
			// 	width: 100px;
			// 	height: 100px;
			// 	text-align: center;
			// 	vertical-align: middle;
			// 	border: 1px solid black;
			// }

			.block {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 4em;
				height: 4em;
				background-color: rgba(0, 0, 0, 0.1);
				border: 1px solid rgba(0, 0, 0, 0.1);
			}
		`;
	}

	render() {
		return html`
        <!-- <table>
            <tr>
            <td>1</td><td>2</td><td>3</td>
            </tr>

            <tr>
            <td>4</td><td>5</td><td>6</td>
            </tr>

            <tr>
            <td>7</td><td>8</td><td>9</td>
            </tr>
        </table> -->


       
        <vaadin-horizontal-layout>
            <div class="block">Item 1</div>
            <div class="block">Item 2</div>
            <div class="block">Item 3</div>
        </vaadin-horizontal-layout>
        <vaadin-horizontal-layout>
            <div class="block">Item 1</div>
            <div class="block">Item 2</div>
            <div class="block">Item 3</div>
        </vaadin-horizontal-layout>
        <vaadin-horizontal-layout>
            <div class="block">Item 1</div>
            <div class="block">Item 2</div>
            <div class="block">Item 3</div>
        </vaadin-horizontal-layout>
        
        
        `;
	}
}

customElements.define('ui-table', TableUI);
