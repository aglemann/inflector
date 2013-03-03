define([
    'underscore'
], 
function(_) {
    var Inflector = function(options) {
        var self = this;
        _.extend(self, { exceptions: {} }, options);        
        var parse = function(verb) {
            
            // First check if there is an exception case for the verb.
            // If so, return the exception.
            if (verb in self.exceptions) {
                return self.exceptions[verb];
            }
            
            // If no exceptions, see if a rule case exists.
            // If so, transform the verb according to the rule.
            for (var rule in self.rules) {
                var re = new RegExp(rule);
                if (re.test(verb)) {
                    return verb.replace(re, self.rules[rule]);
                }
            }
            
            // If no exceptions or rules, append the base transform.
            return verb + self.base;
        };
        
        // Add exceptions by using the `.extend()` method of the inflector:
        // `inflector.toPresent.exceptions.extend({ verb: 'transformedVerb' });`
        parse.exceptions = {
            extend: function(exceptions) {
                _.extend(self.exceptions, exceptions);
            }
        };
        return parse;
    };  
    _.extend(Inflector, {
        
        // Past Form
        // -------------
        toPast: new Inflector({            
            base: 'ed',
            rules: {

                // For verbs ending in "e", add "d".
                'e$': 'ed',

                // For verbs ending in "ic", change the "c" to "ck" and add "ed".
                'ic$': 'icked',

                // For verbs ending in a _consonant_ plus "y", change the "y" to "i" and add "ed".
                '([^aeiou])y$': '$1ied',

                // For verbs ending in a _vowel_ plus a _consonant_ other than "w", "x", or "y", double the last consonant and add "ed".
                '([aeiou])([^aeiouwxy])$': '$1$2$2ed'
            } 
        }),
        
        // Present Participle
        // -------------
        toPresent: new Inflector({            
            base: 'ing',
            rules: {
                
                // For verbs ending in a _consonant_ plus "e", drop the "e" and add "ing".
                '([^aeiou])e$': '$1ing', 
                
                // For verbs ending in "c", change the "c" to "ck" and add "ing".
                'c$': 'cking',
                
                // For verbs ending in "ie", change the "ie" to "y" and add "ing".
                'ie$': 'ying',
                
                // For verbs ending in two _vowels_ plus a _consonant_, add "ing".
                '([aeiou]{2})([^aeiou])$': '$1$2ing',
                
                // For verbs ending in a _vowel_ plus a _consonant_ other than "w", "x", or "y", double the last consonant and add "ing".
                '([aeiou])([^aeiouwxy])$': '$1$2$2ing' 
            }
        })
    });
    return Inflector;
});