import { LitElement, html } from 'lit-element';
import { HeaderElement } from './header-element';
import { SavedUI } from './ui-saved';

const linkTemplate = html`
	<div class = container>
		<div class="row">
			<div class="col text-center" style="background:red;">
				<i class="fas fa-arrow-alt-circle-left" style="font-size: 50px; float: left;"></i> 
			</div>
			<div class="col-8">
				<iframe src="https://lit-element.polymer-project.org/guide/lifecycle" width="700" height="400"></iframe>
			</div>
			<div class="col" style="background:yellow">
				<i class="fas fa-arrow-alt-circle-right" style="font-size: 50px; float: right"></i>
    		</div>
	</div>
      `;

export class MainUI extends LitElement {
	static get properties() {
		return {
			searchWords: { type: Array },
			task: { type: String },
			savedLinks: { type: Array },
			saveLink: { type: String },
			link: { type: String }
		};
	}

	constructor() {
		super();
		this.searchWords = [];
		this.task = '';
		this.savedLinks = [];
		this.saveLink = '';
		this.link = '';
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
		  <div>
			  <header-element></header-element>
		  </div>
			   
		  <div class="container" style="padding-top: 50px;">
			<div class="container" style="padding-top: 50px;">
				<div class="row justify-content-center">
					<div class="col-6">
						<div class="form-group">
							<div class="input-layout" @keyup="${this.shortcutListener}">
								<input class="form-control" type="text" placeholder="Search" aria-label="Search" value="${this
									.task}" @change="${this.updateTask}" >
							</div>	
						</div>
					</div>
				</div>
			</div>
					

			<div class="row justify-content-center">
				${this.searchWords.map(
					(i) => html`
					<div class="col-2">
						<div class="card" style="width:8rem; text-align:center; background:green">
						${i.task}
						</div>
					</div>
				`
				)}
			</div>		

					
				<div class="row justify-content-center" style="padding-top: 50px;">
					<div class="col-6 text-center">
						<button class="btn btn-secondary btn-block bg-dark" type="submit">Search</button>
					</div>
				</div>

				<div class="row justify-content-center" style="padding-top: 50px;">
					<div class="col-6 text-center">
						<h1>Search Result</h1>
					</div>
				</div>

			
				${linkTemplate}
				
			
							
				<!-- <div class="row justify-content-center" style="padding-top: 50px;">
					<div class="col-6 text-center">
						<h1>Search Results</h1>
							<div class="cardList" style="padding-top: 20px">
								<div class="card">
									<ul class="list-group list-group-flush">${this.searchWords.map(
										(i) =>
											html`<li class="list-group-item" style="font-size:30px;">
												 <i class="fas fa-arrow-alt-circle-left" style="font-size: 50px; float: left"></i>
												 	${i.task}
												 <i class="fas fa-arrow-alt-circle-right" value="${i.task}"
												style="font-size: 50px; float: right"></i>
												</li>`
									)}</ul>
								</div>
							</div>
					</div>
				</div> -->
			</div>	
        `;
	}

	clickHandler(e) {
		console.log(e.target.value);
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
}

customElements.define('ui-main', MainUI);
