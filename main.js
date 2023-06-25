/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => PasswordPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian2 = require("obsidian");

// node_modules/mustache/mustache.mjs
var objectToString = Object.prototype.toString;
var isArray = Array.isArray || function isArrayPolyfill(object) {
  return objectToString.call(object) === "[object Array]";
};
function isFunction(object) {
  return typeof object === "function";
}
function typeStr(obj) {
  return isArray(obj) ? "array" : typeof obj;
}
function escapeRegExp(string) {
  return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}
function hasProperty(obj, propName) {
  return obj != null && typeof obj === "object" && propName in obj;
}
function primitiveHasOwnProperty(primitive, propName) {
  return primitive != null && typeof primitive !== "object" && primitive.hasOwnProperty && primitive.hasOwnProperty(propName);
}
var regExpTest = RegExp.prototype.test;
function testRegExp(re, string) {
  return regExpTest.call(re, string);
}
var nonSpaceRe = /\S/;
function isWhitespace(string) {
  return !testRegExp(nonSpaceRe, string);
}
var entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
  "`": "&#x60;",
  "=": "&#x3D;"
};
function escapeHtml(string) {
  return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
    return entityMap[s];
  });
}
var whiteRe = /\s*/;
var spaceRe = /\s+/;
var equalsRe = /\s*=/;
var curlyRe = /\s*\}/;
var tagRe = /#|\^|\/|>|\{|&|=|!/;
function parseTemplate(template, tags) {
  if (!template)
    return [];
  var lineHasNonSpace = false;
  var sections = [];
  var tokens = [];
  var spaces = [];
  var hasTag = false;
  var nonSpace = false;
  var indentation = "";
  var tagIndex = 0;
  function stripSpace() {
    if (hasTag && !nonSpace) {
      while (spaces.length)
        delete tokens[spaces.pop()];
    } else {
      spaces = [];
    }
    hasTag = false;
    nonSpace = false;
  }
  var openingTagRe, closingTagRe, closingCurlyRe;
  function compileTags(tagsToCompile) {
    if (typeof tagsToCompile === "string")
      tagsToCompile = tagsToCompile.split(spaceRe, 2);
    if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
      throw new Error("Invalid tags: " + tagsToCompile);
    openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + "\\s*");
    closingTagRe = new RegExp("\\s*" + escapeRegExp(tagsToCompile[1]));
    closingCurlyRe = new RegExp("\\s*" + escapeRegExp("}" + tagsToCompile[1]));
  }
  compileTags(tags || mustache.tags);
  var scanner = new Scanner(template);
  var start, type, value, chr, token, openSection;
  while (!scanner.eos()) {
    start = scanner.pos;
    value = scanner.scanUntil(openingTagRe);
    if (value) {
      for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
        chr = value.charAt(i);
        if (isWhitespace(chr)) {
          spaces.push(tokens.length);
          indentation += chr;
        } else {
          nonSpace = true;
          lineHasNonSpace = true;
          indentation += " ";
        }
        tokens.push(["text", chr, start, start + 1]);
        start += 1;
        if (chr === "\n") {
          stripSpace();
          indentation = "";
          tagIndex = 0;
          lineHasNonSpace = false;
        }
      }
    }
    if (!scanner.scan(openingTagRe))
      break;
    hasTag = true;
    type = scanner.scan(tagRe) || "name";
    scanner.scan(whiteRe);
    if (type === "=") {
      value = scanner.scanUntil(equalsRe);
      scanner.scan(equalsRe);
      scanner.scanUntil(closingTagRe);
    } else if (type === "{") {
      value = scanner.scanUntil(closingCurlyRe);
      scanner.scan(curlyRe);
      scanner.scanUntil(closingTagRe);
      type = "&";
    } else {
      value = scanner.scanUntil(closingTagRe);
    }
    if (!scanner.scan(closingTagRe))
      throw new Error("Unclosed tag at " + scanner.pos);
    if (type == ">") {
      token = [type, value, start, scanner.pos, indentation, tagIndex, lineHasNonSpace];
    } else {
      token = [type, value, start, scanner.pos];
    }
    tagIndex++;
    tokens.push(token);
    if (type === "#" || type === "^") {
      sections.push(token);
    } else if (type === "/") {
      openSection = sections.pop();
      if (!openSection)
        throw new Error('Unopened section "' + value + '" at ' + start);
      if (openSection[1] !== value)
        throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
    } else if (type === "name" || type === "{" || type === "&") {
      nonSpace = true;
    } else if (type === "=") {
      compileTags(value);
    }
  }
  stripSpace();
  openSection = sections.pop();
  if (openSection)
    throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);
  return nestTokens(squashTokens(tokens));
}
function squashTokens(tokens) {
  var squashedTokens = [];
  var token, lastToken;
  for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
    token = tokens[i];
    if (token) {
      if (token[0] === "text" && lastToken && lastToken[0] === "text") {
        lastToken[1] += token[1];
        lastToken[3] = token[3];
      } else {
        squashedTokens.push(token);
        lastToken = token;
      }
    }
  }
  return squashedTokens;
}
function nestTokens(tokens) {
  var nestedTokens = [];
  var collector = nestedTokens;
  var sections = [];
  var token, section;
  for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
    token = tokens[i];
    switch (token[0]) {
      case "#":
      case "^":
        collector.push(token);
        sections.push(token);
        collector = token[4] = [];
        break;
      case "/":
        section = sections.pop();
        section[5] = token[2];
        collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
        break;
      default:
        collector.push(token);
    }
  }
  return nestedTokens;
}
function Scanner(string) {
  this.string = string;
  this.tail = string;
  this.pos = 0;
}
Scanner.prototype.eos = function eos() {
  return this.tail === "";
};
Scanner.prototype.scan = function scan(re) {
  var match = this.tail.match(re);
  if (!match || match.index !== 0)
    return "";
  var string = match[0];
  this.tail = this.tail.substring(string.length);
  this.pos += string.length;
  return string;
};
Scanner.prototype.scanUntil = function scanUntil(re) {
  var index = this.tail.search(re), match;
  switch (index) {
    case -1:
      match = this.tail;
      this.tail = "";
      break;
    case 0:
      match = "";
      break;
    default:
      match = this.tail.substring(0, index);
      this.tail = this.tail.substring(index);
  }
  this.pos += match.length;
  return match;
};
function Context(view, parentContext) {
  this.view = view;
  this.cache = { ".": this.view };
  this.parent = parentContext;
}
Context.prototype.push = function push(view) {
  return new Context(view, this);
};
Context.prototype.lookup = function lookup(name) {
  var cache = this.cache;
  var value;
  if (cache.hasOwnProperty(name)) {
    value = cache[name];
  } else {
    var context = this, intermediateValue, names, index, lookupHit = false;
    while (context) {
      if (name.indexOf(".") > 0) {
        intermediateValue = context.view;
        names = name.split(".");
        index = 0;
        while (intermediateValue != null && index < names.length) {
          if (index === names.length - 1)
            lookupHit = hasProperty(intermediateValue, names[index]) || primitiveHasOwnProperty(intermediateValue, names[index]);
          intermediateValue = intermediateValue[names[index++]];
        }
      } else {
        intermediateValue = context.view[name];
        lookupHit = hasProperty(context.view, name);
      }
      if (lookupHit) {
        value = intermediateValue;
        break;
      }
      context = context.parent;
    }
    cache[name] = value;
  }
  if (isFunction(value))
    value = value.call(this.view);
  return value;
};
function Writer() {
  this.templateCache = {
    _cache: {},
    set: function set(key, value) {
      this._cache[key] = value;
    },
    get: function get(key) {
      return this._cache[key];
    },
    clear: function clear() {
      this._cache = {};
    }
  };
}
Writer.prototype.clearCache = function clearCache() {
  if (typeof this.templateCache !== "undefined") {
    this.templateCache.clear();
  }
};
Writer.prototype.parse = function parse(template, tags) {
  var cache = this.templateCache;
  var cacheKey = template + ":" + (tags || mustache.tags).join(":");
  var isCacheEnabled = typeof cache !== "undefined";
  var tokens = isCacheEnabled ? cache.get(cacheKey) : void 0;
  if (tokens == void 0) {
    tokens = parseTemplate(template, tags);
    isCacheEnabled && cache.set(cacheKey, tokens);
  }
  return tokens;
};
Writer.prototype.render = function render(template, view, partials, config) {
  var tags = this.getConfigTags(config);
  var tokens = this.parse(template, tags);
  var context = view instanceof Context ? view : new Context(view, void 0);
  return this.renderTokens(tokens, context, partials, template, config);
};
Writer.prototype.renderTokens = function renderTokens(tokens, context, partials, originalTemplate, config) {
  var buffer = "";
  var token, symbol, value;
  for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
    value = void 0;
    token = tokens[i];
    symbol = token[0];
    if (symbol === "#")
      value = this.renderSection(token, context, partials, originalTemplate, config);
    else if (symbol === "^")
      value = this.renderInverted(token, context, partials, originalTemplate, config);
    else if (symbol === ">")
      value = this.renderPartial(token, context, partials, config);
    else if (symbol === "&")
      value = this.unescapedValue(token, context);
    else if (symbol === "name")
      value = this.escapedValue(token, context, config);
    else if (symbol === "text")
      value = this.rawValue(token);
    if (value !== void 0)
      buffer += value;
  }
  return buffer;
};
Writer.prototype.renderSection = function renderSection(token, context, partials, originalTemplate, config) {
  var self = this;
  var buffer = "";
  var value = context.lookup(token[1]);
  function subRender(template) {
    return self.render(template, context, partials, config);
  }
  if (!value)
    return;
  if (isArray(value)) {
    for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
      buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate, config);
    }
  } else if (typeof value === "object" || typeof value === "string" || typeof value === "number") {
    buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate, config);
  } else if (isFunction(value)) {
    if (typeof originalTemplate !== "string")
      throw new Error("Cannot use higher-order sections without the original template");
    value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);
    if (value != null)
      buffer += value;
  } else {
    buffer += this.renderTokens(token[4], context, partials, originalTemplate, config);
  }
  return buffer;
};
Writer.prototype.renderInverted = function renderInverted(token, context, partials, originalTemplate, config) {
  var value = context.lookup(token[1]);
  if (!value || isArray(value) && value.length === 0)
    return this.renderTokens(token[4], context, partials, originalTemplate, config);
};
Writer.prototype.indentPartial = function indentPartial(partial, indentation, lineHasNonSpace) {
  var filteredIndentation = indentation.replace(/[^ \t]/g, "");
  var partialByNl = partial.split("\n");
  for (var i = 0; i < partialByNl.length; i++) {
    if (partialByNl[i].length && (i > 0 || !lineHasNonSpace)) {
      partialByNl[i] = filteredIndentation + partialByNl[i];
    }
  }
  return partialByNl.join("\n");
};
Writer.prototype.renderPartial = function renderPartial(token, context, partials, config) {
  if (!partials)
    return;
  var tags = this.getConfigTags(config);
  var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
  if (value != null) {
    var lineHasNonSpace = token[6];
    var tagIndex = token[5];
    var indentation = token[4];
    var indentedValue = value;
    if (tagIndex == 0 && indentation) {
      indentedValue = this.indentPartial(value, indentation, lineHasNonSpace);
    }
    var tokens = this.parse(indentedValue, tags);
    return this.renderTokens(tokens, context, partials, indentedValue, config);
  }
};
Writer.prototype.unescapedValue = function unescapedValue(token, context) {
  var value = context.lookup(token[1]);
  if (value != null)
    return value;
};
Writer.prototype.escapedValue = function escapedValue(token, context, config) {
  var escape = this.getConfigEscape(config) || mustache.escape;
  var value = context.lookup(token[1]);
  if (value != null)
    return typeof value === "number" && escape === mustache.escape ? String(value) : escape(value);
};
Writer.prototype.rawValue = function rawValue(token) {
  return token[1];
};
Writer.prototype.getConfigTags = function getConfigTags(config) {
  if (isArray(config)) {
    return config;
  } else if (config && typeof config === "object") {
    return config.tags;
  } else {
    return void 0;
  }
};
Writer.prototype.getConfigEscape = function getConfigEscape(config) {
  if (config && typeof config === "object" && !isArray(config)) {
    return config.escape;
  } else {
    return void 0;
  }
};
var mustache = {
  name: "mustache.js",
  version: "4.2.0",
  tags: ["{{", "}}"],
  clearCache: void 0,
  escape: void 0,
  parse: void 0,
  render: void 0,
  Scanner: void 0,
  Context: void 0,
  Writer: void 0,
  /**
   * Allows a user to override the default caching strategy, by providing an
   * object with set, get and clear methods. This can also be used to disable
   * the cache by setting it to the literal `undefined`.
   */
  set templateCache(cache) {
    defaultWriter.templateCache = cache;
  },
  /**
   * Gets the default or overridden caching object from the default writer.
   */
  get templateCache() {
    return defaultWriter.templateCache;
  }
};
var defaultWriter = new Writer();
mustache.clearCache = function clearCache2() {
  return defaultWriter.clearCache();
};
mustache.parse = function parse2(template, tags) {
  return defaultWriter.parse(template, tags);
};
mustache.render = function render2(template, view, partials, config) {
  if (typeof template !== "string") {
    throw new TypeError('Invalid template! Template should be a "string" but "' + typeStr(template) + '" was given as the first argument for mustache#render(template, view, partials)');
  }
  return defaultWriter.render(template, view, partials, config);
};
mustache.escape = escapeHtml;
mustache.Scanner = Scanner;
mustache.Context = Context;
mustache.Writer = Writer;
var mustache_default = mustache;

// i18n.ts
var import_obsidian = require("obsidian");

// langs/en.json
var en_default = {
  ok: "OK",
  cancel: "Cancel",
  open: "Open",
  close_password_protection: "Close password protection",
  open_password_protection: "Open password protection",
  password_protection_opened: "Password protection is opened!",
  password_protection_closed: "Password protection is closed!",
  notice_set_password: "Please firstly set password in the setting of Password Protection plugin!",
  setting_folder_name: "The folder need to be protected",
  setting_folder_desc: "With relative path, the '/' is the root path of vault folder",
  place_holder_enter_path: "Enter path",
  setting_toggle_name: "Enable/Disable protection with password.",
  setting_toggle_desc: "Enable the protection need you to set password, Disable need to verify your password.",
  hint_enter_in_both_boxes: "Please enter your password in both boxes.",
  hint_password_must_match: "Passwords must match.",
  hint_password_length: "Password must be valid characters and contains 6~20 characters.",
  hint_password_valid_character: "Password is valid characters.",
  set_password_title: "Set a password to protect a folder",
  place_holder_enter_password: "Enter password, 6~20 characters",
  confirm_password: "Confirm your password",
  verify_password: "Verify password",
  enter_password: "Enter your password",
  enter_password_to_verify: "Please enter your password to verify.",
  password_is_empty: "Password is empty.",
  password_not_match: "Password isn't match.",
  password_is_right: "Password is right."
};

// langs/zh_cn.json
var zh_cn_default = {
  ok: "\u786E\u5B9A",
  cancel: "\u53D6\u6D88",
  open: "\u6253\u5F00",
  close_password_protection: "\u5173\u95ED\u5BC6\u7801\u4FDD\u62A4",
  open_password_protection: "\u6253\u5F00\u5BC6\u7801\u4FDD\u62A4",
  password_protection_opened: "\u5BC6\u7801\u4FDD\u62A4\u5DF2\u6253\u5F00",
  password_protection_closed: "\u5BC6\u7801\u4FDD\u62A4\u5DF2\u5173\u95ED",
  notice_set_password: "\u8BF7\u5148\u53BB\u5BC6\u7801\u4FDD\u62A4\u63D2\u4EF6\u7684\u8BBE\u7F6E\u9875\u8BBE\u7F6E\u5BC6\u7801",
  setting_folder_name: "\u9700\u8981\u4FDD\u62A4\u7684\u6587\u4EF6\u5939\u8DEF\u5F84",
  setting_folder_desc: "\u8F93\u5165\u76F8\u5BF9\u8DEF\u5F84, '/' \u4EE3\u8868\u7B14\u8BB0\u5E93\u7684\u6839\u8DEF\u5F84",
  place_holder_enter_path: "\u8F93\u5165\u8DEF\u5F84",
  setting_toggle_name: "\u5F00\u542F\u6216\u5173\u95ED\u5BC6\u7801\u4FDD\u62A4",
  setting_toggle_desc: "\u5F00\u542F\u4FDD\u62A4\u9700\u8981\u8BBE\u7F6E\u5BC6\u7801\uFF0C\u5173\u95ED\u4FDD\u62A4\u9700\u8981\u9A8C\u8BC1\u5BC6\u7801",
  hint_enter_in_both_boxes: "\u8BF7\u5728\u4E24\u4E2A\u8F93\u5165\u6846\u4E2D\u90FD\u8F93\u5165\u5BC6\u7801",
  hint_password_must_match: "\u8BF7\u5728\u4E24\u4E2A\u8F93\u5165\u6846\u4E2D\u8F93\u5165\u4E00\u6837\u7684\u5BC6\u7801",
  hint_password_length: "\u5BC6\u7801\u5FC5\u987B\u662F\u6709\u6548\u5B57\u7B26\uFF0C\u957F\u5EA6 6~20 \u4E2A\u5B57\u7B26",
  hint_password_valid_character: "\u5BC6\u7801\u5FC5\u987B\u662F\u6709\u6548\u5B57\u7B26",
  set_password_title: "\u8BBE\u7F6E\u5BC6\u7801",
  place_holder_enter_password: "\u8F93\u5165\u5BC6\u7801, \u957F\u5EA6 6~20 \u4E2A\u5B57\u7B26",
  confirm_password: "\u518D\u6B21\u8F93\u5165\u5BC6\u7801",
  verify_password: "\u9A8C\u8BC1\u5BC6\u7801",
  enter_password: "\u8F93\u5165\u4F60\u7684\u5BC6\u7801",
  enter_password_to_verify: "\u8BF7\u8F93\u5165\u5BC6\u7801\u9A8C\u8BC1",
  password_is_empty: "\u5BC6\u7801\u4E0D\u80FD\u662F\u7A7A\u7684",
  password_not_match: "\u5BC6\u7801\u4E0D\u5339\u914D",
  password_is_right: "\u5BC6\u7801\u6B63\u786E"
};

// langs/zh_tw.json
var zh_tw_default = {
  ok: "\u78BA\u8A8D",
  cancel: "\u53D6\u6D88",
  open: "\u6253\u958B",
  close_password_protection: "\u95DC\u9589\u5BC6\u78BC\u4FDD\u8B77",
  open_password_protection: "\u6253\u958B\u5BC6\u78BC\u4FDD\u8B77",
  password_protection_opened: "\u5BC6\u78BC\u4FDD\u8B77\u5DF2\u6253\u958B",
  password_protection_closed: "\u5BC6\u78BC\u4FDD\u8B77\u5DF2\u95DC\u9589",
  notice_set_password: "\u8ACB\u5148\u53BB\u5BC6\u78BC\u4FDD\u8B77\u63D2\u4EF6\u7684\u8A2D\u7F6E\u9801\u8A2D\u7F6E\u5BC6\u78BC",
  setting_folder_name: "\u9700\u8981\u4FDD\u8B77\u7684\u6587\u4EF6\u593E\u8DEF\u5F91",
  setting_folder_desc: "\u8F38\u5165\u76F8\u5C0D\u8DEF\u5F91, '/' \u4EE3\u8868\u7B46\u8A18\u5EAB\u7684\u6839\u8DEF\u5F91",
  place_holder_enter_path: "\u8F38\u5165\u8DEF\u5F91",
  setting_toggle_name: "\u958B\u555F\u6216\u95DC\u9589\u5BC6\u78BC\u4FDD\u8B77",
  setting_toggle_desc: "\u958B\u555F\u4FDD\u8B77\u9700\u8981\u8A2D\u7F6E\u5BC6\u78BC\uFF0C\u95DC\u9589\u4FDD\u8B77\u9700\u8981\u9A57\u8B49\u5BC6\u78BC",
  hint_enter_in_both_boxes: "\u8ACB\u5728\u5169\u500B\u8F38\u5165\u6846\u4E2D\u90FD\u8F38\u5165\u5BC6\u78BC",
  hint_password_must_match: "\u8ACB\u5728\u5169\u500B\u8F38\u5165\u6846\u4E2D\u8F38\u5165\u4E00\u6A23\u7684\u5BC6\u78BC",
  hint_password_length: "\u5BC6\u78BC\u5FC5\u9808\u662F\u6709\u6548\u5B57\u7B26\uFF0C\u9577\u5EA6 6~20 \u500B\u5B57\u7B26",
  hint_password_valid_character: "\u5BC6\u78BC\u5FC5\u9808\u662F\u6709\u6548\u5B57\u7B26",
  set_password_title: "\u8A2D\u7F6E\u5BC6\u78BC",
  place_holder_enter_password: "\u8F38\u5165\u5BC6\u78BC\uFF0C\u9577\u5EA6 6~20 \u500B\u5B57\u7B26",
  confirm_password: "\u518D\u6B21\u8F38\u5165\u5BC6\u78BC",
  verify_password: "\u9A57\u8B49\u5BC6\u78BC",
  enter_password: "\u8F38\u5165\u4F60\u7684\u5BC6\u78BC",
  enter_password_to_verify: "\u8ACB\u8F38\u5165\u5BC6\u78BC\u9A57\u8B49",
  password_is_empty: "\u5BC6\u78BC\u4E0D\u80FD\u662F\u7A7A\u7684",
  password_not_match: "\u5BC6\u78BC\u4E0D\u5339\u914D",
  password_is_right: "\u5BC6\u78BC\u6B63\u78BA"
};

// langs/index.ts
var LANGS = {
  en: en_default,
  zh_cn: zh_cn_default,
  zh_tw: zh_tw_default
};

// i18n.ts
var I18n = class {
  constructor(lang, saveSettingFunc) {
    this.lang = lang;
    this.saveSettingFunc = saveSettingFunc;
  }
  async changeTo(anotherLang) {
    this.lang = anotherLang;
    await this.saveSettingFunc(anotherLang);
  }
  _get(key) {
    let realLang = this.lang;
    if (this.lang === "auto" && import_obsidian.moment.locale().replace("-", "_") in LANGS) {
      realLang = import_obsidian.moment.locale().replace("-", "_");
    } else {
      realLang = "en";
    }
    const res = LANGS[realLang][key] || LANGS["en"][key] || key;
    return res;
  }
  t(key, vars) {
    if (vars === void 0) {
      return this._get(key);
    }
    return mustache_default.render(this._get(key), vars);
  }
};

// main.ts
var ENCRYPT_KEY = 30;
var ROOT_PATH = (0, import_obsidian2.normalizePath)("/");
var DEFAULT_SETTINGS = {
  protectedPath: ROOT_PATH,
  protectEnabled: false,
  password: "",
  lang: "auto"
};
var PasswordPlugin = class extends import_obsidian2.Plugin {
  constructor() {
    super(...arguments);
    this.isVerifyPasswordWaitting = false;
    this.isVerifyPasswordCorrect = false;
  }
  async onload() {
    await this.loadSettings();
    this.i18n = new I18n(this.settings.lang, async (lang) => {
      this.settings.lang = lang;
      await this.saveSettings();
    });
    const t = (x, vars) => {
      return this.i18n.t(x, vars);
    };
    if (this.settings.protectEnabled) {
      this.passwordRibbonBtn = this.addRibbonIcon("unlock", t("close_password_protection"), (evt) => {
        this.switchPasswordProtection();
      });
    } else {
      this.passwordRibbonBtn = this.addRibbonIcon("lock", t("open_password_protection"), (evt) => {
        this.switchPasswordProtection();
      });
    }
    this.addCommand({
      id: "Open password protection",
      name: t("open"),
      callback: () => {
        this.openPasswordProtection();
      }
    });
    this.addSettingTab(new PasswordSettingTab(this.app, this));
    this.app.workspace.onLayoutReady(() => {
      if (this.settings.protectEnabled && this.settings.protectedPath == ROOT_PATH) {
        if (!this.isVerifyPasswordCorrect) {
          this.closeLeaves(null);
          this.closePasswordProtection(null);
        }
      }
    });
    this.registerEvent(this.app.workspace.on("file-open", (file) => {
      if (file !== null) {
        if (this.settings.protectEnabled && !this.isVerifyPasswordCorrect && this.isProtectedFile(file)) {
          this.closeLeaves(file);
          this.closePasswordProtection(file);
        }
      }
    }));
  }
  onunload() {
  }
  // open note
  async openLeave(file) {
    let leaf = this.app.workspace.getLeaf(false);
    if (leaf != null && file != null) {
      leaf.openFile(file);
    }
  }
  // close notes
  async closeLeaves(file) {
    let leaves = [];
    this.app.workspace.iterateAllLeaves((leaf) => {
      leaves.push(leaf);
    });
    const emptyLeaf = async (leaf) => {
      leaf.setViewState({ type: "empty" });
    };
    for (const leaf of leaves) {
      if (leaf.view instanceof import_obsidian2.FileView) {
        let needClose = false;
        if (file == null) {
          needClose = this.isProtectedFile(leaf.view.file);
        } else if (leaf.view.file.path == file.path) {
          needClose = true;
        }
        if (needClose) {
          await emptyLeaf(leaf);
          leaf.detach();
        }
      }
    }
  }
  // open or close password protection
  switchPasswordProtection() {
    if (this.settings.protectEnabled) {
      if (!this.isVerifyPasswordCorrect) {
        this.closePasswordProtection(null);
      } else {
        this.openPasswordProtection();
      }
    } else {
      this.openPasswordProtection();
    }
  }
  // open password protection
  openPasswordProtection() {
    if (!this.settings.protectEnabled) {
      new import_obsidian2.Notice(this.i18n.t("notice_set_password"));
    } else {
      if (this.isVerifyPasswordCorrect) {
        this.isVerifyPasswordCorrect = false;
      }
      this.closeLeaves(null);
      (0, import_obsidian2.setIcon)(this.passwordRibbonBtn, "unlock");
      this.passwordRibbonBtn.ariaLabel = this.i18n.t("close_password_protection");
      new import_obsidian2.Notice(this.i18n.t("password_protection_opened"));
    }
  }
  // close password protection
  closePasswordProtection(file) {
    if (!this.settings.protectEnabled) {
      (0, import_obsidian2.setIcon)(this.passwordRibbonBtn, "lock");
      this.passwordRibbonBtn.ariaLabel = this.i18n.t("open_password_protection");
    } else {
      if (!this.isVerifyPasswordCorrect) {
        if (!this.isVerifyPasswordWaitting) {
          const setModal = new VerifyPasswordModal(this.app, this, () => {
            if (this.isVerifyPasswordCorrect) {
              if (file != null) {
                this.openLeave(file);
              }
              (0, import_obsidian2.setIcon)(this.passwordRibbonBtn, "lock");
              this.passwordRibbonBtn.ariaLabel = this.i18n.t("open_password_protection");
              new import_obsidian2.Notice(this.i18n.t("password_protection_closed"));
            }
          }).open();
        }
      }
    }
  }
  // check if the file need to be protected
  isProtectedFile(file) {
    if (file == null || file.path == null || file.path == "") {
      return false;
    }
    let path = (0, import_obsidian2.normalizePath)(file.path);
    path = ROOT_PATH + path;
    const lastSlashIndex = path.lastIndexOf("/");
    let filePath = path.substring(0, lastSlashIndex + 1);
    if (filePath.length < this.settings.protectedPath.length) {
      return false;
    }
    if (filePath.startsWith(this.settings.protectedPath)) {
      return true;
    }
    return false;
  }
  // encrypt password
  encrypt(text, key) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
      let charCode = text.charCodeAt(i);
      if (charCode >= 33 && charCode <= 90) {
        result += String.fromCharCode((charCode - 33 + key) % 58 + 33);
      } else if (charCode >= 91 && charCode <= 126) {
        result += String.fromCharCode((charCode - 91 + key) % 36 + 91);
      } else {
        result += text.charAt(i);
      }
    }
    return result;
  }
  // decrypt password
  decrypt(text, key) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
      let charCode = text.charCodeAt(i);
      if (charCode >= 33 && charCode <= 90) {
        result += String.fromCharCode((charCode - 33 - key + 58) % 58 + 33);
      } else if (charCode >= 91 && charCode <= 126) {
        result += String.fromCharCode((charCode - 91 - key + 36) % 36 + 91);
      } else {
        result += text.charAt(i);
      }
    }
    return result;
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
var PasswordSettingTab = class extends import_obsidian2.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    new import_obsidian2.Setting(containerEl).setName(this.plugin.i18n.t("setting_folder_name")).setDesc(this.plugin.i18n.t("setting_folder_desc")).addText((text) => text.setPlaceholder(this.plugin.i18n.t("place_holder_enter_path")).setValue(this.plugin.settings.protectedPath).onChange(async (value) => {
      let path = (0, import_obsidian2.normalizePath)(value);
      if (path != ROOT_PATH) {
        path = ROOT_PATH + path + "/";
      }
      this.plugin.settings.protectedPath = path;
    })).setDisabled(this.plugin.settings.protectEnabled);
    new import_obsidian2.Setting(containerEl).setName(this.plugin.i18n.t("setting_toggle_name")).setDesc(this.plugin.i18n.t("setting_toggle_desc")).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.protectEnabled).onChange((value) => {
        if (value) {
          this.plugin.settings.protectEnabled = false;
          const setModal = new SetPasswordModal(this.app, this.plugin, () => {
            if (this.plugin.settings.protectEnabled) {
              this.plugin.saveSettings();
              this.plugin.openPasswordProtection();
            }
            this.display();
          }).open();
        } else {
          if (!this.plugin.isVerifyPasswordWaitting) {
            const setModal = new VerifyPasswordModal(this.app, this.plugin, () => {
              if (this.plugin.isVerifyPasswordCorrect) {
                this.plugin.settings.protectEnabled = false;
                this.plugin.saveSettings();
                this.plugin.closePasswordProtection(null);
              }
              this.display();
            }).open();
          }
        }
      })
    );
  }
};
var SetPasswordModal = class extends import_obsidian2.Modal {
  constructor(app, plugin, onSubmit) {
    super(app);
    this.plugin = plugin;
    this.onSubmit = onSubmit;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    const inputHint = [
      this.plugin.i18n.t("hint_enter_in_both_boxes"),
      this.plugin.i18n.t("hint_password_must_match"),
      this.plugin.i18n.t("hint_password_length"),
      this.plugin.i18n.t("hint_password_valid_character")
    ];
    contentEl.createEl("h2", { text: this.plugin.i18n.t("set_password_title") });
    const inputPwContainerEl = contentEl.createDiv();
    inputPwContainerEl.style.marginBottom = "1em";
    const pwInputEl = inputPwContainerEl.createEl("input", { type: "password", value: "" });
    pwInputEl.placeholder = this.plugin.i18n.t("place_holder_enter_password");
    pwInputEl.style.width = "70%";
    pwInputEl.focus();
    const confirmPwContainerEl = contentEl.createDiv();
    confirmPwContainerEl.style.marginBottom = "1em";
    const pwConfirmEl = confirmPwContainerEl.createEl("input", { type: "password", value: "" });
    pwConfirmEl.placeholder = this.plugin.i18n.t("confirm_password");
    pwConfirmEl.style.width = "70%";
    const messageEl = contentEl.createDiv();
    messageEl.style.marginBottom = "1em";
    messageEl.setText(this.plugin.i18n.t("hint_enter_in_both_boxes"));
    messageEl.show();
    const switchHint = (color, index) => {
      messageEl.style.color = color;
      messageEl.setText(inputHint[index]);
    };
    pwInputEl.addEventListener("input", (event) => {
      switchHint("", 0);
    });
    pwConfirmEl.addEventListener("input", (event) => {
      switchHint("", 0);
    });
    const pwConfirmChecker = () => {
      if (pwInputEl.value == "" || pwInputEl.value == null || pwConfirmEl.value == "" || pwConfirmEl.value == null) {
        switchHint("red", 0);
        return false;
      }
      if (typeof pwInputEl.value !== "string" || pwInputEl.value.length < 6 || pwInputEl.value.length > 20) {
        switchHint("red", 2);
        return false;
      }
      if (pwInputEl.value !== pwConfirmEl.value) {
        switchHint("red", 1);
        return false;
      }
      switchHint("", 0);
      return true;
    };
    const pwChecker = (ev) => {
      if (ev != null) {
        ev.preventDefault();
      }
      let goodToGo = pwConfirmChecker();
      if (!goodToGo) {
        return;
      }
      let password = pwInputEl.value.normalize("NFC");
      const encryptedText = this.plugin.encrypt(password, ENCRYPT_KEY);
      this.plugin.settings.password = encryptedText;
      this.plugin.settings.protectEnabled = true;
      this.close();
    };
    const cancelEnable = (ev) => {
      if (ev != null) {
        ev.preventDefault();
      }
      this.close();
    };
    new import_obsidian2.Setting(contentEl).addButton((btn) => btn.setButtonText(this.plugin.i18n.t("ok")).setCta().onClick(() => {
      pwChecker(null);
    })).addButton((btn) => btn.setButtonText(this.plugin.i18n.t("cancel")).onClick(() => {
      cancelEnable(null);
    }));
  }
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
    this.onSubmit();
  }
};
var VerifyPasswordModal = class extends import_obsidian2.Modal {
  constructor(app, plugin, onSubmit) {
    super(app);
    this.plugin = plugin;
    this.plugin.isVerifyPasswordWaitting = true;
    this.plugin.isVerifyPasswordCorrect = false;
    this.onSubmit = onSubmit;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: this.plugin.i18n.t("verify_password") });
    const inputPwContainerEl = contentEl.createDiv();
    inputPwContainerEl.style.marginBottom = "1em";
    const pwInputEl = inputPwContainerEl.createEl("input", { type: "password", value: "" });
    pwInputEl.placeholder = this.plugin.i18n.t("enter_password");
    pwInputEl.style.width = "70%";
    pwInputEl.focus();
    const messageEl = contentEl.createDiv();
    messageEl.style.marginBottom = "1em";
    messageEl.setText(this.plugin.i18n.t("enter_password_to_verify"));
    messageEl.show();
    pwInputEl.addEventListener("input", (event) => {
      messageEl.style.color = "";
      messageEl.setText(this.plugin.i18n.t("enter_password_to_verify"));
    });
    const pwConfirmChecker = () => {
      if (pwInputEl.value == "" || pwInputEl.value == null) {
        messageEl.style.color = "red";
        messageEl.setText(this.plugin.i18n.t("password_is_empty"));
        return false;
      }
      if (typeof pwInputEl.value !== "string" || pwInputEl.value.length < 6 || pwInputEl.value.length > 20) {
        messageEl.style.color = "red";
        messageEl.setText(this.plugin.i18n.t("password_not_match"));
        return false;
      }
      let password = pwInputEl.value.normalize("NFC");
      const decryptedText = this.plugin.decrypt(this.plugin.settings.password, ENCRYPT_KEY);
      if (password !== decryptedText) {
        messageEl.style.color = "red";
        messageEl.setText(this.plugin.i18n.t("password_not_match"));
        return false;
      }
      messageEl.style.color = "";
      messageEl.setText(this.plugin.i18n.t("password_is_right"));
      return true;
    };
    const pwChecker = (ev) => {
      if (ev != null) {
        ev.preventDefault();
      }
      let goodToGo = pwConfirmChecker();
      if (!goodToGo) {
        return;
      }
      this.plugin.isVerifyPasswordCorrect = true;
      this.close();
    };
    const cancelEnable = (ev) => {
      if (ev != null) {
        ev.preventDefault();
      }
      this.close();
    };
    new import_obsidian2.Setting(contentEl).addButton((btn) => btn.setButtonText(this.plugin.i18n.t("ok")).setCta().onClick(() => {
      pwChecker(null);
    })).addButton((btn) => btn.setButtonText(this.plugin.i18n.t("cancel")).onClick(() => {
      cancelEnable(null);
    }));
  }
  onClose() {
    this.plugin.isVerifyPasswordWaitting = false;
    const { contentEl } = this;
    contentEl.empty();
    this.onSubmit();
  }
};
/*! Bundled license information:

mustache/mustache.mjs:
  (*!
   * mustache.js - Logic-less {{mustache}} templates with JavaScript
   * http://github.com/janl/mustache.js
   *)
*/
