zombie = require 'zombie'
assert = require 'assert'

browser = new zombie.Browser

console.log zombie

browser.visit 'http://localhost:3001', -> 
	browser
		.fill('#bug-name', 'hello')
		.pressButton '#search-bugs', ->
			assert.ok browser.success

