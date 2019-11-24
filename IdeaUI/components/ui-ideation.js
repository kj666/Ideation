import { LitElement, html, css } from 'lit-element';
import { HeaderElement } from './header-element';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-button';

class IdeationUI extends LitElement {
	static get styles() {
		return css`
			// #title {
			// 	text-align: center;
			// }

			.sample {
				border: 1px solid black;
				height: 50px;
			}

			.search-field {
				text-align: center;
			}

			.search-button {
				text-align: center;
			}
		`;
	}

	render() {
		return html`

		<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
		
		<div><header-element><header-element></div>
	
		<div class="container">

			<div class="jumbotron">
				<h1>Ideation Research Assistant</h1>	
			</div>

		<form>
  			<div class="form-group">
    			<input type="text" class="form-control" placeholder="Enter a word">
  			</div>
		</form>
		
        <!-- <div class="search-field">
            <vaadin-text-field placeholder="Example"></vaadin-text-field>       
		</div> -->
		
		<div class="container">	
			<div class="row">
				<div class="col-md-4 sample">Word</div>
				<div class="col-md-4 sample">Word</div>
				<div class="col-md-4 sample ">Word</div>
			</div>
			<div class="row">
				<div class="col-md-4 sample">Word</div>
				<div class="col-md-4 sample">Word</div>
				<div class="col-md-4 sample">Word</div>
			</div>
			<div class="row">
				<div class="col-md-4 sample">Word</div>
				<div class="col-md-4 sample">Word</div>
				<div class="col-md-4 sample">Word</div>
			</div>
		</div>

			<!-- <ui-table></ui-table> -->
			<div class="search-button">
            <vaadin-button theme="contrast primary">Search</vaadin-button>
        </div> 
		</div>
        `;
	}
}

customElements.define('ui-ideation', IdeationUI);
