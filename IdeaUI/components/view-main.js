import { LitElement, html } from 'lit-element';
import { SavedUI } from './ui-saved';
import { ServiceElement } from '../services/data-service';
import { PageViewElement } from './page-view-element.js';

export class ViewMain extends PageViewElement {

	static get properties() {
		return {
			searchWords: { type: Array },
			task: { type: String },
			savedLinks: { type: Array },
			saveLink: { type: String }
		};
	}

	constructor() {
		super();
		this.searchWords = [];
		this.task = '';
		this.savedLinks = [];
		this.saveLink = '';
	}

	render() {
		return html`
        <!-- To include Bootstrap -->
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
		  
		
		<!-- Include Header -->
			<div class="container" style="padding-top: 50px;">
				<div class="row" style="width: 50%;">
					<div class="col">
						<div class="form-group">
							<div class="input-layout" @keyup="${this.shortcutListener}">
								<input class="form-control" type="text" placeholder="Search" aria-label="Search" value="${this
									.task}" @change="${this.updateTask}" >
							</div>	
						</div>
					</div>
				</div>	

				<div class="row" style="width: 50%">
				${this.searchWords.map(
					(i) => html`
					<div class="col-sm-3">
						<div class="card" style="width:8rem;">
						${i.task}
						</div>
					</div>
				`
				)}
				</div>		

					
				<div class="row" style="width: 50%; padding-top: 50px;">
					<div class="col text-center">
						<button class="btn btn-secondary btn-block bg-dark" type="submit">Search</button>
					</div>
				</div>
				
						
				<div class="row" style="padding-top: 50px;">
					<div class="col-sm-6 text-center">
					<h1>Search Results</h1>
						<div class="cardList" style="padding-top: 20px">
								<div class="card">
									<ul class="list-group list-group-flush">${this.searchWords.map(
										(i) =>
											html`<li class="list-group-item">
												<i class="fas fa-arrow-alt-circle-left" style="font-size: 30px;"></i>${i.task}<i class="fas fa-arrow-alt-circle-right" style="font-size: 30px;"></i>
												</li>`
									)}</ul>
								</div>
						</div>
					</div>
					<div class="col-sm-6 text-center">
						<h1>Saved Ideas</h1>
						<div class="cardList" style="padding-top: 20px">
								<div class="card">
									<ul class="list-group list-group-flush">${this.searchWords.map(
										(i) => html`<li class="list-group-item">${i.task} </li>`
									)}</ul>
								</div>
						</div>
					</div>	
					</div>
				</div>
			</div>	
        `;
	}

	// save item by pressing enter
	shortcutListener(e) {
		if (e.key === 'Enter') {
			this.addItem();
		}
	}

	updateTask(e) {
		this.task = e.target.value;
		e.target.value = '';
	}

	addItem() {
		if (this.task) {
			this.searchWords = [
				...this.searchWords,
				{
					task: this.task
				}
			];

			this.task = '';
		}
	}

	addSavedItems() {}

	getResearch(){

	}
}

customElements.define('view-main', ViewMain);
