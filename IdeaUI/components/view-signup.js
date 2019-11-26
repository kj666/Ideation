import { LitElement, html } from "lit-element";
import { PageViewElement } from './page-view-element.js';

export class ViewSignUp extends PageViewElement{
    constructor(){
        super();
    }

    render(){
        return html`
      
      <p> sign up  </p>
            
            `;
    }
}

customElements.define('view-signup', ViewSignUp);