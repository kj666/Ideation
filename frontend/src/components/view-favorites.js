
import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { store } from '../store.js';
import { searchActions } from '../actions/search.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class ViewFavorites extends connect(store)(PageViewElement) {
	static get properties() {
		return {
			_favorites: {type: Array}
		};
	}

	static get styles() {
		return [ SharedStyles ];
	}
	constructor() {
		super();
	}

	render() {
		return html`
     <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
    

    <section>
          <h2>My Favorites</h2>
    </section>

    <div class="container">
    <div class = "row justify-content-center" style="padding-top: 50px; padding-bottom: 50px">
          <div class = "col-10 text-center">
            <div class="card" >
              <ul class="list-group list-group-flush">
			  ${this._favorites.map(
					(item) => html`
                  <li class="list-group-item" style="font-size:20px;">
                      <a href="${item.results.link}">${item.results.title}</a>
                      <p>${item.results.snippet}</p>
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
		store.dispatch(searchActions.getAllFavorites(JSON.parse(localStorage.getItem('user'))));
	}
	stateChanged(state){
		this._favorites = state.search.favoriteLinks;
		console.log(state.search.favoriteLinks);
	}
}

window.customElements.define('view-favorites', ViewFavorites);
