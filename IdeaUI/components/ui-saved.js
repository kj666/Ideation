import { LitElement, html, css } from 'lit-element';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';

// object with different filter options
const VisibilityFilters = {
	SHOW_ALL: 'All',
	SHOW_ACTIVE: 'Active',
	SHOW_COMPLETED: 'Completed'
};

export class SavedUI extends LitElement {
	static get styles() {
		return css`
			#container {
				width: 360px;
				margin: 0 auto;
				border: 2px solid gray;
			}
		`;
	}
	// returns an object that defines the property names and types
	static get properties() {
		return {
			saveditems: { type: Array },
			filter: { type: String },
			task: { type: String }
		};
	}

	constructor() {
		super();
		this.saveditems = [];
		this.filter = VisibilityFilters.SHOW_ALL;
		this.task = '';
	}

	render() {
		return html`
		<!-- <style>
			ui-saved{ 
    			display: block;
    			max-width: 800px;
    			margin: 0 auto;
  			}
  			ui-saved .input-layout {
   				width: 100%;
    			display: flex;
  			}
  			ui-saved .input-layout vaadin-text-field {
    			flex: 1;
    			margin-right: var(--spacing); 
  			}
  			ui-saved .saved-list {
    			margin-top: var(--spacing);
  			}
  			ui-saved .visibility-filters {
    			margin-top: calc(4 * var(--spacing));
			  }	
			  <!-- <div class="col-sm-6 text-center">
						<h1>Saved Ideas</h1>
						<div class="cardList" style="padding-top: 20px">
								<div class="card">
									<ul class="list-group list-group-flush">${this.searchWords.map(
										(i) => html`<li class="list-group-item">${i.task} </li>`
									)}</ul>
								</div>
						</div>
					</div>	 -->
		</style>	  -->
		<div id="container">

			<div class ="input-layout" @keyup="${this.shortcutListener}">
				<vaadin-text-field
					placeholder= "Task"
					value="${this.task}"
					@change="${this.updateTask}">
				</vaadin-text-field>

				<vaadin-button
					theme="primary"
					@click="${this.addItem}">
					Save Item
				</vaadin-button>
			</div>

			<div class="saved-list">
				${this.applyFilter(this.saveditems).map(
					(item) => html`
				<div class="saved-item">
					<vaadin-checkbox
						?checked="${item.complete}"
						@change="${(e) => this.updateItemStatus(item, e.target.checked)}">
						${item.task}
					</vaadin-checkbox>
				</div>
				`
				)}
			</div>
			<vaadin-radio-group 
				class="visibility-filters"
				value ="${this.filter}"
				@value-changed= "${this.filterChanged}"
			>
				${Object.values(VisibilityFilters).map(
					(filter) => html`
					<vaadin-radio-button value="${filter}">
					${filter}
					</vaadin-radio-button>
				`
				)}
			</vaadin-radio-group>

			<vaadin-button @click="${this.clearCompleted}">Clear Completed</vaadin-button>
		</div>	

		`;
	}

	clearCompleted() {
		this.saveditems = this.saveditems.filter((item) => !item.complete);
	}

	filterChanged(e) {
		this.filter = e.target.value;
	}

	applyFilter(saveditems) {
		switch (this.filter) {
			case VisibilityFilters.SHOW_ACTIVE:
				return saveditems.filter((item) => !item.complete);
			case VisibilityFilters.SHOW_COMPLETED:
				return saveditems.filter((item) => item.complete);
			default:
				return saveditems;
		}
	}

	updateItemStatus(updatedItem, complete) {
		this.saveditems = this.saveditems.map((item) => (updatedItem === item ? { ...updatedItem, complete } : item));
	}

	// save item by pressing enter
	shortcutListener(e) {
		if (e.key === 'Enter') {
			this.addItem();
		}
	}

	updateTask(e) {
		this.task = e.target.value;
	}

	addItem() {
		if (this.task) {
			this.saveditems = [
				...this.saveditems,
				{
					task: this.task,
					complete: false
				}
			];

			this.task = '';
		}
	}

	// createRenderRoot() {
	// 	return this;
	// }
}

customElements.define('ui-saved', SavedUI);
