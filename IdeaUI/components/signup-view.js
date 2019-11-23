import { LitElement, html } from "lit-element";

export class SignUpView extends LitElement{
    constructor(){
        super();
    }

    render(){
        return html`
      
      <p> sign up  </p>
            
            `;
    }
}

customElements.define('signup-view', SignUpView);