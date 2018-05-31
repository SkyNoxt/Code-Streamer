const React = require ("react");
const ReactDOM = require('react-dom');

window.React = React;
window.ReactDOM = ReactDOM;

const $ = require('jquery');
window.$ = $;
const GoldenLayout = require('golden-layout');

var myLayout = new GoldenLayout({
	content: [{
	  type: 'row',
	  content:[{
		type:'react-component',
		component: 'test-component',
		props: { label: 'A' }
	  },{
		type: 'column',
		content:[{
		  type:'react-component',
		  component: 'test-component',
		  props: { label: 'B' }
		},{
		  type:'react-component',
		  component: 'test-component',
		  props: { label: 'C' }
		}]
	  }]
	}]
  });
 
class TestComponent extends React.Component {
   render() {
	 return null;
   }
 };
 
 myLayout.registerComponent( 'test-component', TestComponent );
 
 //Once all components are registered, call
 myLayout.init();

// Rendering
ReactDOM.render( <TestComponent />, document.getElementById('CodeStreamer') );
