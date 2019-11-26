import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import { controller } from '../services/api-controller.js';
import constants from '../constants.js';

import { SharedStyles } from './shared-styles.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';
import { searchActions } from '../actions/search.js' 

// const linkTemplate = html`
// 	<div class = container>
// 		<div class="row">
// 			<div class="col">
// 				<i class="fas fa-arrow-alt-circle-left" style="font-size: 50px; float: left; padding-top: 200px; padding-left: 50px"></i>
// 			</div>
// 			<div class="col-8">
// 				<iframe src="https://lit-element.polymer-project.org/guide/lifecycle" width="700" height="400"></iframe>
// 			</div>
// 			<div class="col">
// 				<i class="fas fa-arrow-alt-circle-right" style="font-size: 50px; float: right; padding-top: 200px; padding-right:50px "></i>
//     		</div>
// 	</div>
//       `;

class ViewSearch extends connect(store)(PageViewElement) {
	static get properties() {
		return {
			_words: {type: Array},
			current: { type: Number },
			randomWords: { type: Array },
			searchWords: { type: Array },
			task: { type: String },
			savedLinks: { type: Array },
			saveLink: { type: String },
			link: { type: String },
			linksArray: { type: Array }
		};
	}

	constructor() {
		super();
		this.current = 0;
		this.randomWords = [];
		controller.sendHttpRequest('GET', constants.RANDOM_URL).then((responseData) => {
			responseData.forEach((element) => {
				// console.log(element.word);
				this.randomWords.push(element.word);
			});
			// this.randomWords.push
			// this.randomWords = responseData.word;
			// console.log(responseData);
		});
		this.searchWords = [];
		this.task = '';
		this.savedLinks = [];
		this.saveLink = '';
		this.current = 0;
		this.linksArray = [
			'https://en.wikipedia.org/wiki/Steve_Jobs',
			'https://en.wikipedia.org/wiki/Bill_Gates',
			'https://en.wikipedia.org/wiki/Elon_Musk'
		];
		this.link = this.linksArray[this.current];
	}

	static get styles() {
		return [ SharedStyles ];
	}

	render() {
		return html`
    <!-- To include Bootstrap -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
    
    
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
			
				<div class = container>
		            <div class="row">
			            <div class="col">
				            <i class="fas fa-arrow-alt-circle-left" @click=${() =>
								this._removeLink(
									this.link
								)} style="font-size: 50px; float: left; padding-top: 200px; padding-left: 50px"></i> 
			            </div>
			            <div class="col-8">
				            <iframe src="${this.link}" width="700" height="400"></iframe>
			            </div>
			            <div class="col">
				            <i class="fas fa-arrow-alt-circle-right" @click=${this
								._nextLink} style="font-size: 50px; float: right; padding-top: 200px; padding-right:50px; padding-bottom: 20px "></i>
                                <i class="fas fa-heart" style="font-size: 50px; float: right; padding-right:50px "></i>
                        </div>
    		        </div> 
                </div>
        </div>	
    `;
	}

	firstUpdated(){
		super.firstUpdated();
		store.dispatch(searchActions.getRandomWords());
	}
	stateChanged(state){
		this._words = state.search.words;
	}
	_nextLink() {
		// console.log('next clicked');

		this.link = this.linksArray[this.current];

		if (this.current == this.linksArray.length - 1) {
			this.current = 0;
		} else {
			this.current++;
		}
		this.link = this.linksArray[this.current];
	}

	_removeLink(link) {
		console.log('previous clicked');
		this.linksArray = this.linksArray.filter((e) => e !== link);
		this._nextLink();
	}

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
			console.log(this.searchWords);
			this.task = '';
		}
	}

	onSearch() {
		console.log(this.randomWords);
	}
}

window.customElements.define('view-search', ViewSearch);
