(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{610:function(e,t,n){"use strict";n.r(t);var o=n(50),a=n.n(o),l=n(51),i=n.n(l),r=n(52),s=n.n(r),u=n(20),c=n.n(u),d=n(53),p=n.n(d),m=n(5),f=n.n(m),k=n(0),g=n.n(k),b=n(15),D=n(72),h=n.n(D),w=function(e){function t(){var e,n;a()(this,t);for(var o=arguments.length,l=new Array(o),r=0;r<o;r++)l[r]=arguments[r];return n=i()(this,(e=s()(t)).call.apply(e,[this].concat(l))),f()(c()(n),"state",{pages:[],ids:[]}),f()(c()(n),"componentDidMount",(function(){n.dialogDelete=h.a.modal("#dialogDelete_".concat(n.props.id),{bgClose:!0,escClose:!0,stack:!1})})),f()(c()(n),"componentWillUnmount",(function(){n.dialogDelete.$destroy(!0)})),f()(c()(n),"show",(function(e,t){n.setState({pages:e,ids:t}),n.dialogDelete.show()})),f()(c()(n),"hide",(function(){n.dialogDelete.hide()})),f()(c()(n),"onDeleteButtonClick",(function(e){e.preventDefault(),n.props.onDeleteButtonClickHandler&&"function"==typeof n.props.onDeleteButtonClickHandler&&n.props.onDeleteButtonClickHandler(n.state.ids),n.hide()})),f()(c()(n),"render",(function(){return g.a.createElement("div",null,g.a.createElement("div",{id:"dialogDelete_".concat(n.props.id),style:{display:"none"}},g.a.createElement("div",{className:"uk-modal-dialog"},g.a.createElement("div",{className:"uk-modal-body"},g.a.createElement("p",null,n.props.i18n._({id:"The following page(s) will be permanently deleted:"})),g.a.createElement("div",{"uk-alert":"true"},n.state.pages.join(", "))),g.a.createElement("div",{className:"uk-modal-footer uk-text-right"},g.a.createElement("button",{className:"uk-button uk-button-default uk-modal-close uk-margin-small-right",type:"button"},n.props.i18n._({id:"Cancel"})),g.a.createElement("button",{className:"uk-button uk-button-primary",type:"button",onClick:n.onDeleteButtonClick},n.props.i18n._({id:"Delete"}))))))})),n}return p()(t,e),t}(k.Component);t.default=Object(b.c)((function(e){return{pagesList:e.pagesList}}),(function(){return{}}),null,{forwardRef:!0})(w)}}]);