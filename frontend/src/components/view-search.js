import { html, css } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import { controller } from '../services/api-controller.js';
import constants from '../constants.js';

import { SharedStyles } from './shared-styles.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';
import { searchActions } from '../actions/search.js';

class ViewSearch extends connect(store)(PageViewElement) {
	static get properties() {
		return {
			_words: { type: Array },
			_haveLinks: false,
			_nextIndex:{ type: Number},
			_user: {},
			linksArray: { type: Array },
			size:{ type: Number},

			current: { type: Number },
			task: { type: String },
			savedLinks: { type: Array },
			saveFavorites: { type: Array },
			link: { type: String },
		};
	}

	constructor() {
		super();
		this.task = '';
		this.savedLinks = [];
		this.current = 0;
		this.size = 3;
		this.linksArray = [
				{
					"link": "https://en.wikipedia.org/wiki/Elon_Musk",
					"title": 'Descriptions of the larva and pupa of the short palped crane fly ...',
					"snippet":
						'Descriptions of the larva and pupa of the short palped crane fly Rhipidia ... living \nin saturated rotten wood, confined to fallen timber and coarse wooden debris in ...'
				}];
		this.link = this.linksArray[this.current].link;
	}

	static get styles() {
		return [
			SharedStyles,
			css`
				.tag-space {
					margin: 8px;
					font-size: 14px;
				}
			`
		];
	}

	render() {
		return html`
    <!-- To include Bootstrap -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
    
    
	<div class="container" style="padding-top: 50px; ">
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

            <div class=" row d-flex justify-content-center">
				${this._words.map(
					(i) => html`
					<a class="badge badge-dark tag-space" style="color: #fff;">${i.word}</a>
				`
				)}
			</div>			

            <div class="row justify-content-center" style="padding-top: 50px;">
					<div class="col-6 text-center">
						<button class="btn btn-secondary btn-block bg-dark" @click=${()=>this.onSearch(0,3)}>Search</button>
					</div>
				</div>
	${this._haveLinks
		? html`
			<div>	
                <div class="row justify-content-center" style="padding-top: 50px;">
					<div class="col-sm-2 text-center">
					<i class="fas fa-heart" @click=${() =>
						this._saveFavorites(this.link)} style="font-size: 50px; float: right; padding-right:50px;"></i>
					</div>
                	<div class = 'col-sm-4 text-center'>
						<button class="btn btn-secondary btn-large bg-dark" type="submit" 
						@click=${this.saveMyResearch}>Save My Research</button>
                	</div>
				</div>
			
				<div class = container style="padding-bottom: 50px;">
		            <div class="row align-items-center">
			            <div class="col-sm-1">
				            <i class="fas fa-thumbs-down" @click=${() =>
								this._removeLink(this.link)} style="font-size: 50px; float: left;"></i> 
			            </div>

			            <div class="col-sm-10">
						<div>
							<a href="${this.link}">${this.linksArray[this.current].title}</a>
                      		<p>${this.linksArray[this.current].snippet}</p>
							</div>
							<div class="embed-responsive embed-responsive-4by3">
				            	<iframe src="${this.link}"></iframe>
							</div>
			            </div>

			            <div class="col-sm-1">
				            <i class="fas fa-thumbs-up" @click=${this._nextLink} style="font-size: 50px; float: right;"></i>
                        </div>
    		        </div> 
				</div>
			</div>`
		: ''}
        </div>	
    `;
	}

	saveMyResearch() {
		var _keywords = [];
			for(var i = 0; i < this._words.length; i++){
				_keywords.push(this._words[i].word);
			}
		let researchName = prompt('Give this research a Name', 'Research 1');
		if (researchName != null) {
			store.dispatch(
				searchActions.postResearch(this._user.username, {
					research_name: researchName,
					keywords: _keywords,
					results: this.savedLinks
				})
			);
		}
	}

	firstUpdated() {
		super.firstUpdated();
		store.dispatch(searchActions.getRandomWords());
	}
	stateChanged(state) {
		this._words = state.search.words;
		this.linksArray = state.search.links;
		this._haveLinks = state.search.haveLinks;
		this._user = state.user.user;
		this._nextIndex = state.search.nextIndex;
		console.log(this.linksArray);
		console.log(state.search.links);
		console.log(this._nextIndex);
	}

	_nextLink() {
		if(this.linksArray.length == 0){
			if(this.nextIndex == 0){
				this.onSearch(0,this.size -1 );
				console.log('no more index');
			}
			else{
				this.onSearch(this.nextIndex, this.size);
				console.log('no more');
			}
		}
		else{
		console.log('next clicked');
		this.link = this.linksArray[this.current].link;
		this.savedLinks.push(this.linksArray[this.current]);
		console.log(this.savedLinks);

		this.linksArray.shift();
		console.log(this.linksArray);
		}
	}

	_removeLink(link) {
		if(this.linksArray.length == 0){
			console.log('no more');
		}
		else{
			console.log('previous clicked');
			this.link = this.linksArray[this.current].link;
			this.linksArray.shift();
		}
	}

	_removeWord(){

	}

	_saveFavorites() {
		var fav ={"results": this.linksArray[this.current]};
		console.log(fav);
		store.dispatch(searchActions.postFavorite(JSON.parse(localStorage.getItem('user')), fav))
	}

	shortcutListener(e) {
		if (e.key === 'Enter') {
			this.addWord();
		}
	}

	updateTask(e) {
		this.task = e.target.value;
		e.target.value = '';
	}

	addWord() {
		var newWord = { id: 0, word: this.task };
		store.dispatch(searchActions.addWord(newWord));
	}

	onSearch(page, size) {
		console.log(this._words);
		var concatword = '';
		// todo change length of for loop
		for (var i = 0; i < size; i++) {
			concatword += this._words[i].word + ' ';
		}
		console.log(concatword);
		console.log(this._nextIndex);
		store.dispatch(searchActions.getSearchLinks(concatword, (page).toString()));
	}
}

window.customElements.define('view-search', ViewSearch);
