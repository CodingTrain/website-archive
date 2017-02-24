/**
 * @author Kate Compton
 */

var tracery = {
  utilities: {}
};

(function() {

  function inQuotes(s) {
    return '"' + s + '"';
  };

  function parseAction(action) {
    return action;
  };

  // tag format
  // a thing to expand, plus actions

  function parseTag(tag) {
    var errors = [];
    var prefxns = [];
    var postfxns = [];

    var lvl = 0;
    var start = 0;

    var inPre = true;

    var symbol,
      mods;

    function nonAction(end) {
      if (start !== end) {
        var section = tag.substring(start, end);
        if (!inPre) {
          errors.push("multiple possible expansion symbols in tag!" + tag);
        } else {
          inPre = false;
          var split = section.split(".");
          symbol = split[0];
          mods = split.slice(1, split.length);
        }

      }
      start = end;
    };

    for (var i = 0; i < tag.length; i++) {
      var c = tag.charAt(i);

      switch (c) {
        case '[':
          if (lvl === 0) {
            nonAction(i);
          }

          lvl++;
          break;
        case ']':
          lvl--;
          if (lvl === 0) {
            var section = tag.substring(start + 1, i);
            if (inPre)
              prefxns.push(parseAction(section));
            else
              postfxns.push(parseAction(section));
            start = i + 1;
          }
          break;

        default:
          if (lvl === 0) {

          }
          break;

      }
    }
    nonAction(i);

    if (lvl > 0) {
      var error = "Too many '[' in rule " + inQuotes(tag);
      errors.push(error);

    }

    if (lvl < 0) {
      var error = "Too many ']' in rule " + inQuotes(tag);
      errors.push(error);

    }

    return {
      preActions: prefxns,
      postActions: postfxns,
      symbol: symbol,
      mods: mods,
      raw: tag,
      errors: errors,
    };
  };

  // Split a rule into sections
  function parseRule(rule) {
    var sections = [];
    var errors = [];
    if (!(typeof rule == 'string' || rule instanceof String)) {
      errors.push("Cannot parse non-string rule " + rule);
      sections.errors = errors;
      return sections;
    }

    if (rule.length === 0) {
      return [];
    }

    var lvl = 0;
    var start = 0;
    var inTag = false;

    function createSection(end) {
      var section = rule.substring(start, end);
      if (section.length > 0) {
        if (inTag)
          sections.push(parseTag(section));
        else
          sections.push(section);
      }
      inTag = !inTag;
      start = end + 1;

    }

    for (var i = 0; i < rule.length; i++) {
      var c = rule.charAt(i);

      switch (c) {
        case '[':
          lvl++;
          break;
        case ']':
          lvl--;
          break;
        case '#':
          if (lvl === 0) {
            createSection(i);
          }
          break;
        default:
          break;

      }

    }

    if (lvl > 0) {
      var error = "Too many '[' in rule " + inQuotes(rule);
      errors.push(error);

    }

    if (lvl < 0) {
      var error = "Too many ']' in rule " + inQuotes(rule);
      errors.push(error);

    }

    if (inTag) {
      var error = "Odd number of '#' in rule " + inQuotes(rule);
      errors.push(error);
    }

    createSection(rule.length);
    sections.errors = errors;
    return sections;
  };

  function testParse(rule, shouldFail) {
    console.log("-------");
    console.log("Test parse rule: " + inQuotes(rule) + " " + shouldFail);
    var parsed = parseRule(rule);
    if (parsed.errors && parsed.errors.length > 0) {
      for (var i = 0; i < parsed.errors.length; i++) {
        console.log(parsed.errors[i]);
      }
    }

  }

  function testParseTag(tag, shouldFail) {
    console.log("-------");
    console.log("Test parse tag: " + inQuotes(tag) + " " + shouldFail);
    var parsed = parseTag(tag);
    if (parsed.errors && parsed.errors.length > 0) {
      for (var i = 0; i < parsed.errors.length; i++) {
        console.log(parsed.errors[i]);
      }
    }
  }


  tracery.testParse = testParse;
  tracery.testParseTag = testParseTag;
  tracery.parseRule = parseRule;
  tracery.parseTag = parseTag;

  function spacer(size) {
    var s = "";
    for (var i = 0; i < size * 3; i++) {
      s += " ";
    }
    return s;
  }

  /* Simple JavaScript Inheritance
   * By John Resig http://ejohn.org/
   * MIT Licensed.
   */

  function extend(destination, source) {
    for (var k in source) {
      if (source.hasOwnProperty(k)) {
        destination[k] = source[k];
      }
    }
    return destination;
  }

  // Inspired by base2 and Prototype
  (function() {
    var initializing = false,
      fnTest = /xyz/.test(function() {
        xyz;
      }) ? /\b_super\b/ : /.*/;

    // The base Class implementation (does nothing)
    this.Class = function() {};

    // Create a new Class that inherits from this class
    Class.extend = function(prop) {
      var _super = this.prototype;

      // Instantiate a base class (but only create the instance,
      // don't run the init constructor)
      initializing = true;
      var prototype = new this();
      initializing = false;

      // Copy the properties over onto the new prototype
      for (var name in prop) {
        // Check if we're overwriting an existing function
        prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ? (function(name, fn) {
          return function() {
            var tmp = this._super;

            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];

            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);
            this._super = tmp;

            return ret;
          };
        })(name, prop[name]) : prop[name];
      }

      // The dummy class constructor
      function Class() {
        // All construction is actually done in the init method
        if (!initializing && this.init)
          this.init.apply(this, arguments);
      }

      // Populate our constructed prototype object
      Class.prototype = prototype;

      // Enforce the constructor to be what we expect
      Class.prototype.constructor = Class;

      // And make this class extendable
      Class.extend = arguments.callee;

      return Class;
    };
  })();

  /**
   * @author Kate
   */

  var Rule = function(raw) {
    this.raw = raw;
    this.sections = parseRule(raw);

  };

  Rule.prototype.getParsed = function() {
    if (!this.sections)
      this.sections = parseRule(raw);

    return this.sections;
  };

  Rule.prototype.toString = function() {
    return this.raw;
  };

  Rule.prototype.toJSONString = function() {
    return this.raw;
  };

  /**
   * @author Kate
   */

  var RuleWeighting = Object.freeze({
    RED: 0,
    GREEN: 1,
    BLUE: 2
  });

  var RuleSet = function(rules) {
    // is the rules obj an array? A RuleSet, or a string?
    if (rules.constructor === Array) {
      // make a copy
      rules = rules.slice(0, rules.length);
    } else if (rules.prototype === RuleSet) {
      // clone
    } else if (typeof rules == 'string' || rules instanceof String) {
      var args = Array.prototype.slice.call(arguments);
      rules = args;
    } else {
      console.log(rules);
      throw ("creating ruleset with unknown object type!");
    }

    // create rules and their use counts

    this.rules = rules;
    this.parseAll();

    this.uses = [];
    this.startUses = [];
    this.totalUses = 0;
    for (var i = 0; i < this.rules.length; i++) {
      this.uses[i] = 0;
      this.startUses[i] = this.uses[i];
      this.totalUses += this.uses[i];
    }

  };

  //========================================================
  // Iterating over rules

  RuleSet.prototype.parseAll = function(fxn) {
    for (var i = 0; i < this.rules.length; i++) {
      if (this.rules[i].prototype !== Rule)
        this.rules[i] = new Rule(this.rules[i]);
    }

  };

  //========================================================
  // Iterating over rules

  RuleSet.prototype.mapRules = function(fxn) {
    return this.rules.map(function(rule, index) {
      return fxn(rule, index);
    });
  };

  RuleSet.prototype.applyToRules = function(fxn) {
    for (var i = 0; i < this.rules.length; i++) {
      fxn(this.rules[i], i);
    }
  };
  //========================================================
  RuleSet.prototype.get = function() {
    var index = this.getIndex();

    return this.rules[index];
  };

  RuleSet.prototype.getRandomIndex = function() {
    return Math.floor(this.uses.length * Math.random());
  };

  RuleSet.prototype.getIndex = function() {
    // Weighted distribution
    // Imagine a bar of length 1, how to divide the length
    // s.t. a random dist will result in the dist we want?

    var index = this.getRandomIndex();
    // What if the uses determine the chance of rerolling?

    var median = this.totalUses / this.uses.length;

    var count = 0;
    while (this.uses[index] > median && count < 20) {
      index = this.getRandomIndex();
      count++;
    }

    // reroll more likely if index is too much higher

    return index;
  };

  RuleSet.prototype.decayUses = function(pct) {
    this.totalUses = 0;
    for (var i = 0; i < this.uses; i++) {

      this.uses[index] *= 1 - pct;
      this.totalUses += this.uses[index];
    }
  };

  RuleSet.prototype.testRandom = function() {
    console.log("Test random");
    var counts = [];
    for (var i = 0; i < this.uses.length; i++) {
      counts[i] = 0;
    }

    var testCount = 10 * this.uses.length;
    for (var i = 0; i < testCount; i++) {

      var index = this.getIndex();
      this.uses[index] += 1;

      counts[index]++;
      this.decayUses(.1);
    }

    for (var i = 0; i < this.uses.length; i++) {
      console.log(i + ":\t" + counts[i] + " \t" + this.uses[i]);
    }
  };

  RuleSet.prototype.getSaveRules = function() {
    var jsonRules = this.rules.map(function(rule) {
      return rule.toJSONString();
    });

    return jsonRules;
  };

  /**
   * @author Kate Compton
   */

  var Action = function(node, raw) {

    this.node = node;
    this.grammar = node.grammar;
    this.raw = raw;

  };

  Action.prototype.activate = function() {

    var node = this.node;
    node.actions.push(this);

    // replace any hashtags
    this.amended = this.grammar.flatten(this.raw);

    var parsed = parseTag(this.amended);
    var subActionRaw = parsed.preActions;
    if (subActionRaw && subActionRaw.length > 0) {
      this.subactions = subActionRaw.map(function(action) {
        return new Action(node, action);
      });

    }

    if (parsed.symbol) {
      var split = parsed.symbol.split(":");

      if (split.length === 2) {
        this.push = {
          symbol: split[0],

          // split into multiple rules
          rules: split[1].split(","),
        };
        // push
        node.grammar.pushRules(this.push.symbol, this.push.rules);

      } else
        throw ("Unknown action: " + parsed.symbol);
    }

    if (this.subactions) {
      for (var i = 0; i < this.subactions.length; i++) {
        this.subactions[i].activate();
      }
    }

  };

  Action.prototype.deactivate = function() {
    if (this.subactions) {
      for (var i = 0; i < this.subactions.length; i++) {
        this.subactions[i].deactivate();
      }
    }

    if (this.push) {
      this.node.grammar.popRules(this.push.symbol, this.push.rules);
    }
  };

  /**
   * @author Kate Compton
   */

  var isConsonant = function(c) {
    c = c.toLowerCase();
    switch (c) {
      case 'a':
        return false;
      case 'e':
        return false;
      case 'i':
        return false;
      case 'o':
        return false;
      case 'u':
        return false;

    }
    return true;
  };

  function endsWithConY(s) {
    if (s.charAt(s.length - 1) === 'y') {
      return isConsonant(s.charAt(s.length - 2));
    }
    return false;
  };

  var universalModifiers = {
    capitalizeAll: function(s) {
      return s.replace(/(?:^|\s)\S/g, function(a) {
        return a.toUpperCase();
      });

    },

    capitalize: function(s) {
      return s.charAt(0).toUpperCase() + s.slice(1);

    },

    inQuotes: function(s) {
      return '"' + s + '"';
    },

    comma: function(s) {
      var last = s.charAt(s.length - 1);
      if (last === ",")
        return s;
      if (last === ".")
        return s;
      if (last === "?")
        return s;
      if (last === "!")
        return s;
      return s + ",";
    },

    beeSpeak: function(s) {
      //            s = s.replace("s", "zzz");

      s = s.replace(/s/, 'zzz');
      return s;
    },

    a: function(s) {
      if (!isConsonant(s.charAt()))
        return "an " + s;
      return "a " + s;

    },

    s: function(s) {

      var last = s.charAt(s.length - 1);

      switch (last) {
        case 'y':

          // rays, convoys
          if (!isConsonant(s.charAt(s.length - 2))) {
            return s + "s";
          }
          // harpies, cries
          else {
            return s.slice(0, s.length - 1) + "ies";
          }
          break;

          // oxen, boxen, foxen
        case 'x':
          return s.slice(0, s.length - 1) + "xen";
        case 'z':
          return s.slice(0, s.length - 1) + "zes";
        case 'h':
          return s.slice(0, s.length - 1) + "hes";

        default:
          return s + "s";
      };

    },

    ed: function(s) {

      var index = s.indexOf(" ");
      var s = s;
      var rest = "";
      if (index > 0) {
        rest = s.substring(index, s.length);
        s = s.substring(0, index);

      }

      var last = s.charAt(s.length - 1);

      switch (last) {
        case 'y':

          // rays, convoys
          if (isConsonant(s.charAt(s.length - 2))) {
            return s.slice(0, s.length - 1) + "ied" + rest;

          }
          // harpies, cries
          else {
            return s + "ed" + rest;
          }
          break;
        case 'e':
          return s + "d" + rest;

          break;

        default:
          return s + "ed" + rest;
      };
    }
  };
  /**
   * @author Kate Compton
   */

  // A tracery expansion node
  var nodeCount = 0;

  var ExpansionNode = Class.extend({
    init: function() {
      this.depth = 0;
      this.id = nodeCount;
      nodeCount++;
      this.childText = "[[UNEXPANDED]]";
    },

    setParent: function(parent) {
      if (parent) {
        this.depth = parent.depth + 1;
        this.parent = parent;
        this.grammar = parent.grammar;
      }
    },

    expand: function() {
      // do nothing
      return "???";
    },

    expandChildren: function() {

      if (this.children) {
        this.childText = "";
        for (var i = 0; i < this.children.length; i++) {
          this.children[i].expand();
          this.childText += this.children[i].finalText;
        }
        this.finalText = this.childText;
      }

    },

    createChildrenFromSections: function(sections) {
      var root = this;
      this.children = sections.map(function(section) {

        if (typeof section == 'string' || section instanceof String) {
          // Plaintext
          return new TextNode(root, section);
        } else {
          return new TagNode(root, section);
        }
      });
    }
  });

  var RootNode = ExpansionNode.extend({
    init: function(grammar, rawRule) {
      this._super();
      this.grammar = grammar;
      this.parsedRule = parseRule(rawRule);
    },

    expand: function() {
      var root = this;
      this.createChildrenFromSections(this.parsedRule);

      // expand the children
      this.expandChildren();
    },
  });

  var TagNode = ExpansionNode.extend({
    init: function(parent, parsedTag) {
      this._super();

      if (!(parsedTag !== null && typeof parsedTag === 'object')) {
        if (typeof parsedTag == 'string' || parsedTag instanceof String) {
          console.warn("Can't make tagNode from unparsed string!");
          parsedTag = parseTag(parsedTag);

        } else {
          console.log("Unknown tagNode input: ", parsedTag);
          throw ("Can't make tagNode from strange tag!");

        }
      }

      this.setParent(parent);
      $.extend(this, parsedTag);
    },

    expand: function() {
      if (tracery.outputExpansionTrace)
        console.log(r.sections);

      this.rule = this.grammar.getRule(this.symbol);

      this.actions = [];

      // Parse the rule if it hasn't been already
      this.createChildrenFromSections(this.rule.getParsed());

      // Do any pre-expansion actions!
      for (var i = 0; i < this.preActions.length; i++) {
        var action = new Action(this, this.preActions[i]);
        action.activate();
      }

      // Map each child section to a node
      if (!this.rule.sections)
        console.log(this.rule);

      this.expandChildren();

      for (var i = 0; i < this.actions.length; i++) {

        this.actions[i].deactivate();
      }

      this.finalText = this.childText;
      for (var i = 0; i < this.mods.length; i++) {
        this.finalText = this.grammar.applyMod(this.mods[i], this.finalText);
      }

    },

    toLabel: function() {
      return this.symbol;
    },
    toString: function() {
      return "TagNode '" + this.symbol + "' mods:" + this.mods + ", preactions:" + this.preActions + ", postactions" + this.postActions;
    }
  });

  var TextNode = ExpansionNode.extend({
    isLeaf: true,
    init: function(parent, text) {
      this._super();

      this.setParent(parent);

      this.text = text;

      this.finalText = text;
    },
    expand: function() {
      // do nothing
    },

    toLabel: function() {
      return this.text;
    }
  });

  /**
   * @author Kate Compton
   */

  function Symbol(grammar, key) {
    this.grammar = grammar;
    this.key = key;
    this.currentRules = undefined;
    this.ruleSets = [];

  };

  Symbol.prototype.loadFrom = function(rules) {

    rules = this.wrapRules(rules);
    this.baseRules = rules;

    this.ruleSets.push(rules);
    this.currentRules = this.ruleSets[this.ruleSets.length - 1];

  };

  //========================================================
  // Iterating over rules

  Symbol.prototype.mapRules = function(fxn) {

    return this.currentRules.mapRules(fxn);
  };

  Symbol.prototype.applyToRules = function(fxn) {
    this.currentRules.applyToRules(fxn);
  };

  //==================================================
  // Rule pushpops
  Symbol.prototype.wrapRules = function(rules) {
    if (rules.prototype !== RuleSet) {
      if (Array.isArray(rules)) {
        return new RuleSet(rules);
      } else if (typeof rules == 'string' || rules instanceof String) {
        return new RuleSet(rules);
      } else {
        throw ("Unknown rules type: " + rules);
      }
    }
    // already a ruleset
    return rules;
  };

  Symbol.prototype.pushRules = function(rules) {
    rules = this.wrapRules(rules);
    this.ruleSets.push(rules);
    this.currentRules = this.ruleSets[this.ruleSets.length - 1];
  };

  Symbol.prototype.popRules = function() {
    var exRules = this.ruleSets.pop();

    if (this.ruleSets.length === 0) {
      //console.warn("No more rules for " + this + "!");
    }
    this.currentRules = this.ruleSets[this.ruleSets.length - 1];
  };

  // Clear everything and set the rules
  Symbol.prototype.setRules = function(rules) {

    rules = this.wrapRules(rules);
    this.ruleSets = [rules];
    this.currentRules = rules;

  };

  Symbol.prototype.addRule = function(rule) {
    this.currentRules.addRule(seed);
  };

  //========================================================
  // selection

  Symbol.prototype.select = function() {
    this.isSelected = true;

  };

  Symbol.prototype.deselect = function() {
    this.isSelected = false;
  };

  //==================================================
  // Getters

  Symbol.prototype.getRule = function(seed) {
    return this.currentRules.get(seed);
  };

  //==================================================

  Symbol.prototype.toString = function() {
    return this.key + ": " + this.currentRules + "(overlaying " + (this.ruleSets.length - 1) + ")";
  };
  Symbol.prototype.toJSON = function() {

    var rules = this.baseRules.rules.map(function(rule) {
      return '"' + rule.raw + '"';
    });
    return '"' + this.key + '"' + ": [" + rules.join(", ") + "]";
  };

  Symbol.prototype.toHTML = function(useSpans) {
    var keySpan = '"' + this.key + '"';
    if (useSpans)
      keySpan = "<span class='symbol symbol_" + this.key + "'>" + keySpan + "</span>";

    var rules = this.baseRules.rules.map(function(rule) {
      // replace any anglebrackets for html
      var cleaned = rule.raw.replace(/&/g, "&amp;");
      cleaned = cleaned.replace(/>/g, "&gt;");
      cleaned = cleaned.replace(/</g, "&lt;");

      var s = '"' + cleaned + '"';
      if (useSpans)
        s = "<span class='rule'>" + s + "</span>";
      return s;
    });
    return keySpan + ": [" + rules.join(", ") + "]";
  };

  /**
   * @author Kate Compton
   */

  function Grammar() {
    this.clear();
  };

  Grammar.prototype.clear = function() {
    // Symbol library
    this.symbols = {};

    this.errors = [];

    // Modifier library
    this.modifiers = {};

    // add the universal mods
    for (var mod in universalModifiers) {
      if (universalModifiers.hasOwnProperty(mod))
        this.modifiers[mod] = universalModifiers[mod];
    }
  };
  //========================================================
  // Loading

  Grammar.prototype.loadFrom = function(obj) {
    var symbolSrc;

    this.clear();

    if (obj.symbols !== undefined) {
      symbolSrc = obj.symbols;
    } else {
      symbolSrc = obj;
    }

    // get all json keys
    var keys = Object.keys(symbolSrc);

    this.symbolNames = [];
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      this.symbolNames.push(key);

      this.symbols[key] = new Symbol(this, key);
      this.symbols[key].loadFrom(symbolSrc[key]);
    }

  };

  Grammar.prototype.toHTML = function(useSpans) {
    // get all json keys
    var keys = Object.keys(this.symbols);

    this.symbolNames = [];

    var lines = [];

    var count = 0;
    for (var i = 0; i < keys.length; i++) {

      var key = keys[i];
      var symbol = this.symbols[key];

      if (symbol && symbol.baseRules) {

        lines.push("    " + this.symbols[key].toHTML(useSpans));

      }
    };

    var s;
    s = lines.join(",</p><p>");
    s = "{<p>" + s + "</p>}";
    return s;
  };

  Grammar.prototype.toJSON = function() {
    // get all json keys
    var keys = Object.keys(this.symbols);

    this.symbolNames = [];

    var lines = [];

    var count = 0;
    for (var i = 0; i < keys.length; i++) {

      var key = keys[i];
      var symbol = this.symbols[key];

      if (symbol && symbol.baseRules) {

        lines.push("    " + this.symbols[key].toJSON());

      }
    };

    var s;
    s = lines.join(",\n");
    s = "{\n" + s + "\n}";
    return s;
  };

  //========================================================
  // selection

  Grammar.prototype.select = function() {
    this.isSelected = true;
  };

  Grammar.prototype.deselect = function() {
    this.isSelected = false;
  };

  //========================================================
  // Iterating over symbols

  Grammar.prototype.mapSymbols = function(fxn) {
    var symbols = this.symbols;
    return this.symbolNames.map(function(name) {
      return fxn(symbols[name], name);
    });
  };

  Grammar.prototype.applyToSymbols = function(fxn) {
    for (var i = 0; i < this.symbolNames.length; i++) {
      var key = this.symbolNames[i];
      fxn(this.symbols[key], key);
    }
  };

  //========================================================
  Grammar.prototype.addOrGetSymbol = function(key) {
    if (this.symbols[key] === undefined)
      this.symbols[key] = new Symbol(key);

    return this.symbols[key];
  };

  Grammar.prototype.pushRules = function(key, rules) {
    var symbol = this.addOrGetSymbol(key);
    symbol.pushRules(rules);
  };

  Grammar.prototype.popRules = function(key, rules) {
    var symbol = this.addOrGetSymbol(key);
    var popped = symbol.popRules();

    if (symbol.ruleSets.length === 0) {
      // remove symbol
      this.symbols[key] = undefined;
    }
  };

  Grammar.prototype.applyMod = function(modName, text) {
    if (!this.modifiers[modName]) {
      console.log(this.modifiers);
      throw ("Unknown mod: " + modName);
    }
    return this.modifiers[modName](text);
  };

  //============================================================
  Grammar.prototype.getRule = function(key, seed) {
    var symbol = this.symbols[key];
    if (symbol === undefined) {
      var r = new Rule("{{" + key + "}}");

      r.error = "Missing symbol " + key;
      return r;
    }

    var rule = symbol.getRule();
    if (rule === undefined) {
      var r = new Rule("[" + key + "]");
      console.log(r.sections);
      r.error = "Symbol " + key + " has no rule";
      return r;
    }

    return rule;
  };

  //============================================================
  // Expansions
  Grammar.prototype.expand = function(raw) {

    // Start a new tree
    var root = new RootNode(this, raw);

    root.expand();

    return root;
  };

  Grammar.prototype.flatten = function(raw) {

    // Start a new tree
    var root = new RootNode(this, raw);

    root.expand();

    return root.childText;
  };

  //===============

  Grammar.prototype.analyze = function() {
    this.symbolNames = [];
    for (var name in this.symbols) {
      if (this.symbols.hasOwnProperty(name)) {
        this.symbolNames.push(name);
      }
    }

    // parse every rule

    for (var i = 0; i < this.symbolNames.length; i++) {
      var key = this.symbolNames[i];
      var symbol = this.symbols[key];
      // parse all
      for (var j = 0; j < symbol.baseRules.length; j++) {
        var rule = symbol.baseRules[j];
        rule.parsed = tracery.parse(rule.raw);
        //   console.log(rule);

      }
    }

  };

  Grammar.prototype.selectSymbol = function(key) {
    console.log(this);
    var symbol = this.get(key);
  };
  /**
   * @author Kate Compton

   */

  tracery.createGrammar = function(obj) {
    var grammar = new Grammar();
    grammar.loadFrom(obj);
    return grammar;
  };

  tracery.test = function() {

    console.log("==========================================");
    console.log("test tracery");

    // good
    tracery.testParse("", false);
    tracery.testParse("fooo", false);
    tracery.testParse("####", false);
    tracery.testParse("#[]#[]##", false);
    tracery.testParse("#someSymbol# and #someOtherSymbol#", false);
    tracery.testParse("#someOtherSymbol.cap.pluralize#", false);
    tracery.testParse("#[#do some things#]symbol.mod[someotherthings[and a function]]#", false);
    tracery.testParse("#[fxn][fxn][fxn[subfxn]]symbol[[fxn]]#", false);
    tracery.testParse("#[fxn][#fxn#][fxn[#subfxn#]]symbol[[fxn]]#", false);
    tracery.testParse("#hero# ate some #color# #animal.s#", false);
    tracery.testParseTag("[action]symbol.mod1.mod2[postAction]", false);

    // bad
    tracery.testParse("#someSymbol# and #someOtherSymbol", true);
    tracery.testParse("#[fxn][fxn][fxn[subfxn]]symbol[fxn]]#", true);

    // bad
    tracery.testParseTag("stuff[action]symbol.mod1.mod2[postAction]", true);
    tracery.testParseTag("[action]symbol.mod1.mod2[postAction]stuff", true);

    tracery.testParse("#hero# ate some #color# #animal.s#", true);
    tracery.testParse("#[#setPronouns#][#setOccupation#][hero:#name#]story#", true);

  };

})();
