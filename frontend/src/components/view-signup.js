import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import { SharedStyles } from './shared-styles.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';

import user from '../reducers/user.js';
import { controller } from '../services/api-controller.js';

class ViewSignUp extends PageViewElement {
    static get properties() {
        return {
          // This is the data from the store.
          _email: { type: String },
          _username: { type: String },
          _fullname: { type: String },
          _password: { type: String },
        };
      }

      constructor(){
          super();
          this.addEventListener('iron-form-submit', this.signup);
      }

  static get styles() {
    return [
      SharedStyles
    ];
  }

  render() {
    return html`
     <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
    
    <div class="container" style="padding-top: 50px;">
        <iron-form id="signup-form">
            <form is="ajax-form">
                <div class="form-group">
                    <paper-input type="email" required label ="Email" id="email-input" placeholder="Enter email"></paper-input>
                    <paper-input type="text" required id="username-input"  placeholder="Enter username"></paper-input>
                    <paper-input type="text" required id="name-input" placeholder="Enter fullname"></paper-input>
                    <paper-input type="password" required id="password-input" placeholder="Password"></paper-input>
                </div>
                    <paper-button  @click="${this.submitForm}" id="signup-button" class="btn btn-primary">Submit</paper-button>
                </div>
            </form>
        </iron-form>
    </div>
    `;
  }

  
submitForm(){
    this.shadowRoot.querySelector("#signup-form").submit();
  }

  signup(){
      var email = this.shadowRoot.querySelector("#email-input").value;
      var user = this.shadowRoot.querySelector("#username-input").value;
      var name = this.shadowRoot.querySelector("#name-input").value;
      var password = this.shadowRoot.querySelector("#password-input").value;
      controller.postUser(email, user, name, password);
      console.log(email);
  }
}

window.customElements.define('view-signup', ViewSignUp);
