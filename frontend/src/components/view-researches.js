/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import { increment, decrement } from '../actions/counter.js';

// We are lazy loading its reducer.
import counter from '../reducers/counter.js';
store.addReducers({
	counter
});

// These are the elements needed by this element.
import './counter-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class ViewResearches extends connect(store)(PageViewElement) {
	static get properties() {
		return {
			// // This is the data from the store.
			// _clicks: { type: Number },
			// _value: { type: Number }

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
		this.research = [
			'https://en.wikipedia.org/wiki/Steve_Jobs',
			'https://en.wikipedia.org/wiki/Bill_Gates',
			'https://en.wikipedia.org/wiki/Elon_Musk'
		];
		this.researchName = '';
		this.saveResearch = [];
	}

	render() {
		return html`
     <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
    
        <section>
          <h2>My Research</h2>
        </section>

      <div class = "container">
        <div class= "row ">
          <div class="col-8">
            <div class="form-group">
              <div class="input-layout" @keyup="${this.shortcutListener}">
                    <input id='addToResearch' class="form-control" type="text" placeholder="Give your Research a name" aria-label="Search">
              </div>	
            </div>
          </div>

          <div class="col-4 text-center">
						<button class="btn btn-secondary btn-block bg-dark" type="submit" @click=${this.addResearch}>Save</button>
					</div>
        </div>


        <div class = "row justify-content-center" style="padding-top: 50px; padding-bottom: 50px">
          <div class = "col-10 text-center">
            <div class="card" >
              <ul class="list-group list-group-flush">
              ${this.research.map(
					(i) => html`
                  <li class="list-group-item" style="font-size:30px;">
                      <a href="${i}">${i}</a>
                  </li>`
				)}               
              </ul>
            </div>
          </div>
        </div>
      </div>



      <!-- <section>
        <h2>My Researches</h2>
        <p>This is a text-only page.</p>
        <p>It doesn't do anything other than display some static text.</p>
      </section> -->
      <!-- <section>
        <h2>Redux example: simple counter</h2>
        <div class="circle">${this._value}</div>
        <p>This page contains a reusable <code>&lt;counter-element&gt;</code>. The
        element is not built in a Redux-y way (you can think of it as being a
        third-party element you got from someone else), but this page is connected to the
        Redux store. When the element updates its counter, this page updates the values
        in the Redux store, and you can see the current value of the counter reflected in
        the bubble above.</p>
        <br><br>
      </section> -->
      <!-- <section>
        <p>
          <counter-element
              value="${this._value}"
              clicks="${this._clicks}"
              @counter-incremented="${this._counterIncremented}"
              @counter-decremented="${this._counterDecremented}">
          </counter-element>
        </p>
      </section> -->
    `;
	}

	shortcutListener(e) {
		if (e.key === 'Enter') {
			this.addResearch();
		}
	}

	// clickHandler(e) {
	// 	console.log('save clicked');
	// 	this.addResearch();
	// }

	addResearch() {
		//console.log('add called');
		const input = this.shadowRoot.getElementById('addToResearch');
		const key = input.value;
		input.value = '';
		const value = this.research;
		this.saveResearch.push({ key, value });
		//console.log(this.saveResearch);
	}

	// _counterIncremented() {
	//   store.dispatch(increment());
	// }

	// _counterDecremented() {
	//   store.dispatch(decrement());
	// }

	// // This is called every time something is updated in the store.
	// stateChanged(state) {
	//   this._clicks = state.counter.clicks;
	//   this._value = state.counter.value;
	// }
}

window.customElements.define('view-researches', ViewResearches);