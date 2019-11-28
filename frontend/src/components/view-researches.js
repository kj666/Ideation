import { html, css } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';
import { searchActions } from '../actions/search.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class ViewResearches extends connect(store)(PageViewElement) {
	static get properties() {
		return {
			_researches: {type: Array},
			words: { type: Array },
			research: { type: Array },
			researchName: { type: String },
			saveResearch: { type: Array }
		};
	}

	static get styles() {
		return [ SharedStyles ];
	}

	constructor() {
		super();
		this.words = [ 'apple, mango, orange', 'black,white' ];
		this.research = [
			'https://en.wikipedia.org/wiki/Steve_Jobs',
			'https://en.wikipedia.org/wiki/Bill_Gates',
			'https://en.wikipedia.org/wiki/Elon_Musk'
		];
		this.researchName = '';
		this.saveResearch = [];
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
     <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
    
        <section>
          <h2>My Researches</h2>
        </section>

      <div class = "container">
        <div class= "row justify-content-center">
          <div class="col-6">
            <div class="form-group">
              <div class="input-layout" @keyup="${this.shortcutListener}">
                    <input id='addToResearch' class="form-control" type="text" placeholder="Give your Research a name" aria-label="Search">
              </div>	
            </div>
          </div>

          <div class="col-2 text-center">
						<button class="btn btn-secondary btn-block bg-dark" type="submit" @click=${this.addResearch}>Save</button>
					</div>
        </div>


        <div class = "row justify-content-center" style="padding-top: 50px; padding-bottom: 50px">
          <div class = "col-8 text-center">
            <div class="card" >
              <ul class="list-group list-group-flush">

              ${this._researches.map(
					(item) => html`                 
                  <li class="list-group-item">
                  <h4>${item.research_name}</h4>
                      <div>${item.timestamp}</div>
                      <div class=" row d-flex justify-content-center">
					  ${item.keywords.map(
						  (i) => html`<a class="badge badge-dark tag-space" style="color: #fff;">${i}</a>`
					  )}
                      </div>
                  </li>`
				)}               

              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
	}

	firstUpdated() {
		super.firstUpdated();
		store.dispatch(searchActions.getAllResearches(JSON.parse(localStorage.getItem('user'))));
	}
	stateChanged(state){
		this._researches = state.search.researches;
		console.log(state.search.researches);
	}
	shortcutListener(e) {
		if (e.key === 'Enter') {
			this.addResearch();
		}
	}

	addResearch() {
		//console.log('add called');
		const input = this.shadowRoot.getElementById('addToResearch');
		const key = input.value;
		input.value = '';
		const value = this.research;
		this.saveResearch.push({ key, value });
		//console.log(this.saveResearch);
	}
}

window.customElements.define('view-researches', ViewResearches);
