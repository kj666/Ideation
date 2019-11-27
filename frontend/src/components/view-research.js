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

class ViewResearch extends connect(store)(PageViewElement) {
	static get properties() {
		return {
			research: { type: Array }
		};
	}

	static get styles() {
		return [ SharedStyles ];
	}
	constructor() {
		super();
		this.research = [
			{
				link:
					'https://www.researchgate.net/publication/225776573_Descriptions_of_the_larva_and_pupa_of_the_short_palped_crane_fly_Rhipidia_uniseriata_Schiner_1864_Diptera_Limoniidae',
				title: 'Descriptions of the larva and pupa of the short palped crane fly ...',
				snippet:
					'Descriptions of the larva and pupa of the short palped crane fly Rhipidia ... living \nin saturated rotten wood, confined to fallen timber and coarse wooden debris in ...'
			},
			{
				link: 'http://nora.nerc.ac.uk/7499/1/Long-palpedCraneflies.pdf',
				title: 'Provisional atlas of the long-palped craneflies (Diptera: Tipulinae) of ...',
				snippet:
					'continuity of large dead timber are now rare in the British countryside. The site \nwith the largest recorded number of species of Tipulidae is. Wisley Common in ...'
			}
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
          <h2>Research 1</h2>
    </section>

    <div class="container">
    <div class = "row justify-content-center" style="padding-top: 50px; padding-bottom: 50px">
          <div class = "col-10 text-center">
            <div class="card" >
              <ul class="list-group list-group-flush">
              ${this.research.map(
					(item) => html`
                  <li class="list-group-item" style="font-size:20px;">
                      <a href="${item.link}">${item.title}</a>
                      <p>${item.snippet}</p>
                  </li>`
				)}               
              </ul>
            </div>
          </div>
        </div>
      </div>


      
      
    `;
	}
}

window.customElements.define('view-research', ViewResearch);
