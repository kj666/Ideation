import { LitElement, html, css } from 'lit-element';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

import { store } from '../store.js';

import { 
    navigate,
    updateOffline
 } from '../actions/app.js';

 class MyApp extends connect(store)(LitElement){
     static get properties(){
         return{
             appTitle: { type: String},
             _page: { type: String },
             _offline: {type: Boolean}
         };
     }

     static get styles(){
        return css`
        .left-title{
            position: relative;
            left: 30px;
        }`;
    }

     render(){
         return html`
           <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#">Ideaation</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Researches <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="#">Favorites <span class="sr-only">(current)</span></a>
                </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Sign Up</button>
                </form>
            </div>
            </nav>

            <main role="main">
                <view-main ?active="${this._page == 'main'}"></view-main>
                <view-signup ?active="${this._page == 'signup'}"></view-signup>
            </main>
        `;
     }

     constructor(){
         super();

         setPassiveTouchGestures(true);
     }

     firstUpdated(){
         installRouter((location) => store.dispatch(navigate(decodeURIComponent(location.pathname))));
         installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
         installMediaQueryWatcher(`(min-width: 460px)`,
         () => store.dispatch(updateDrawerState(false)));
     }

     updated(changedProps){
         if(changedProps.has('_page')){
             const pageTitle = this.appTitle + ' - ' +this._page;
             updateMetadata({
                 title: pageTitle,
                 description: pageTitle
             });
         }
     }

     stateChanged(state){
         this._page = state.app.page;
         this._offline = state.app.offline;
     }
 }

 window.customElements.define('my-app', MyApp);