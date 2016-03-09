/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**************************!*\
  !*** ./app/jsx/main.jsx ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 2);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Poll = _react2.default.createClass({
	  displayName: "Poll",
	  getInitialState: function getInitialState() {
	    return {
	      questions: [{
	        id: 1,
	        q: "Do you support the efforts of organizations like the UN Refugee Agency to serve people around the world who have been forced to flee their homes due to war, persecution and threats",
	        answers: ["Yes", "No", "I don't know"]
	      }, {
	        id: 2,
	        q: "Do you support or oppose the following statement?  The United States government and businesses can do more to develop innovative ways of solving the refugee crisis?",
	        answers: ["Strongly oppose", "Somewhat oppose", "Neither support nor oppose", "Somewhat support", "Strongly support"]
	      }, {
	        id: 3,
	        q: "Do you support the following statement? The US can increase the amount of money budgeted to help refugees and communities in countries that are hosting a large number of refugees.",
	        answers: ["Strongly oppose", "Somewhat oppose", "Neither support nor oppose", "Somewhat support", "Strongly support"]
	      }, {
	        id: 4,
	        q: "What types of actions are you willing to take to help refugees around the world?",
	        answers: ["Advocacy", "Donate", "Attend an event", "Buy a product", "Other"]
	      }, {
	        id: 5,
	        q: "What types of groups are you currently connected with in your community?",
	        answers: ["Community group", "Religious group", "Recreational sports league", "Business/trade association", "Other"]
	      }],
	      currentQuestion: 0
	    };
	  },
	
	
	  update: function update() {
	    setState(function (previousState) {
	      currentQuestion: previousState.currentQuestion + 1;
	    });
	  },
	
	  makeQuestion: function makeQuestion() {
	    console.log('making question');
	  },
	
	  introText: function introText() {
	    return _react2.default.createElement(
	      "p",
	      { className: "intro-text", onClick: this.update.bind(this) },
	      "How much do you know about the Refugee Crisis? Click to take the quiz."
	    );
	  },
	
	  render: function render() {
	    return _react2.default.createElement(
	      "div",
	      { className: "container" },
	      this.state.currentQuestion === 0 ? introText() : makeQuestion()
	    );
	  }
	});
	
	ReactDOM.render(_react2.default.createElement(Poll, null), document.getElementById('wrapper'));

/***/ },
/* 1 */
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map