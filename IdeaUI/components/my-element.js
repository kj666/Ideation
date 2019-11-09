import { LitElement, html } from 'lit-element';

class MyElement extends LitElement{

    render(){

        return html `
        <!-- Template Content -->
        <p> A test </p>
        `;
    }
}

customElements.define('my-element', MyElement);