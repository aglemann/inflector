define([
    'src/inflector'
], function(inflector) {    
    module('Inflector');
    
    test('toPast', function() {
        equal(inflector.toPast('agree'), 'agreed');
        equal(inflector.toPast('believe'), 'believed');
        equal(inflector.toPast('ban'), 'banned');
        equal(inflector.toPast('flow'), 'flowed');
        equal(inflector.toPast('display'), 'displayed');
        equal(inflector.toPast('occur'), 'occurred');
        equal(inflector.toPast('cancel'), 'cancelled');
        equal(inflector.toPast('cry'), 'cried');
        equal(inflector.toPast('frolic'), 'frolicked');
        
        inflector.toPast.exceptions.extend({ frolic: 'test' });
        equal(inflector.toPast('frolic'), 'test');
    });

    test('toPresent', function() {
        equal(inflector.toPresent('hope'), 'hoping');
        equal(inflector.toPresent('agree'), 'agreeing');
        equal(inflector.toPresent('hop'), 'hopping');
        equal(inflector.toPresent('flow'), 'flowing');
        equal(inflector.toPresent('admit'), 'admitting');
        equal(inflector.toPresent('cancel'), 'cancelling');
        equal(inflector.toPresent('beep'), 'beeping');
        equal(inflector.toPresent('fry'), 'frying');
        equal(inflector.toPresent('die'), 'dying');
        equal(inflector.toPresent('shoe'), 'shoeing');
        equal(inflector.toPresent('frolic'), 'frolicking');
        
        inflector.toPresent.exceptions.extend({ frolic: 'test' });
        equal(inflector.toPresent('frolic'), 'test');
    });
});