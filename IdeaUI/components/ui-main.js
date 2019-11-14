import { LitElement, html } from 'lit-element';
import { HeaderElement } from './header-element';
import { SavedUI } from './ui-saved';

export class MainUI extends LitElement {
	constructor() {
		super();
	}

	render() {
		return html`
        <!-- To include Bootstrap -->
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        
          <!-- Include Header -->
          <div><header-element></header-element></div>
        
        <!-- This is the search bar -->
        <div class="container">
           <div class="row">
              <div class="col-md-6">
                  <div class="input-group mb-3">
                     <div class="input-group-prepend">
                        <span class="input-group-text">Your Word</span>
                     </div>
                     <input class="form-control" type="text" placeholder="Our Magic"></input>
                  </div>
               </div>
            </div>
         </div>

         <!-- This is where the searches will be displayed -->
        <div class="container">
            <div class="row">
               <div class="col-md-6" style="border:1px solid #333">
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                     Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                     when an unknown printer took a galley of type and scrambled it to make a type 
                     specimen book. It has survived not only five centuries, but also the leap into electronic 
                     typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
                      of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing 
                      software like Aldus PageMaker including versions of Lorem Ipsum.</p>
               </div>
               <!-- This is to display saved items -->
               <div class="col-lg-3 offset-md-3" style="border:1px solid #333">
                  <p>This is where saved items will come</p>
                  <ui-saved></ui-saved>
               </div>
         </div>
        `;
	}
}

customElements.define('ui-main', MainUI);
