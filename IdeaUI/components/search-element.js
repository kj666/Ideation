import { LitElement, html } from 'lit-element';

import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-button';
const VisibilityFilters = {
	SHOW_ALL: 'All',
	SHOW_ACTIVE: 'Active',
	SHOW_COMPLETED: 'Completed'
};

class SearchElement extends LitElement {
	static get properties() {
		return {
			words: { type: Array },
			filter: { type: String },
			task: { type: String }
		};
	}

	constructor() {
		super();
		this.words = [];
		this.filter = VisibilityFilters.SHOW_ALL;
		this.task = '';
	}

	render() {
		return html`
        <div class="input-layout" @keyup=${this.shortcutListener}>
            <vaadin-text-field placeholder="Give me a word" value="${this.task}" @change="${this
			.updateTask}"></vaadin-text-field>
            
            
            <vaadin-button theme="primary" @click="${this.search}">Search</vaadin-button>
        </div>

        <div class="word-list">
                ${this.words.map((word) => html`<li>${word}</li>`)}
        </div>
        `;
	}

	shortcutListener(e) {
		if (e.key === 'Enter') {
			this.search;
		}
	}

	updateTask(e) {
		this.task = e.target.value;
	}

	search() {
		if (this.task) {
			this.words = [
				...this.words,
				{
					task: this.task,
					complete: false
				}
			];
			this.task = '';
		}
	}
}

customElements.define('search-element', SearchElement);
