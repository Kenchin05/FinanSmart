"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/flairup";
exports.ids = ["vendor-chunks/flairup"];
exports.modules = {

/***/ "(ssr)/./node_modules/flairup/dist/esm/index.js":
/*!************************************************!*\
  !*** ./node_modules/flairup/dist/esm/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createSheet: () => (/* binding */ createSheet),\n/* harmony export */   cx: () => (/* binding */ cx)\n/* harmony export */ });\n// src/utils/asArray.ts\nfunction asArray(v) {\n  return [].concat(v);\n}\n\n// src/utils/is.ts\nfunction isPsuedoSelector(selector) {\n  return selector.startsWith(\":\");\n}\nfunction isStyleCondition(selector) {\n  return isString(selector) && (selector === \"*\" || selector.length > 1 && \":>~.+*\".includes(selector.slice(0, 1)) || isImmediatePostcondition(selector));\n}\nfunction isValidProperty(property, value) {\n  return (isString(value) || typeof value === \"number\") && !isCssVariables(property) && !isPsuedoSelector(property) && !isMediaQuery(property);\n}\nfunction isMediaQuery(selector) {\n  return selector.startsWith(\"@media\");\n}\nfunction isDirectClass(selector) {\n  return selector === \".\";\n}\nfunction isCssVariables(selector) {\n  return selector === \"--\";\n}\nfunction isString(value) {\n  return value + \"\" === value;\n}\nfunction isImmediatePostcondition(value) {\n  return isString(value) && (value.startsWith(\"&\") || isPsuedoSelector(value));\n}\n\n// src/utils/joinTruthy.ts\nfunction joinTruthy(arr, delimiter = \"\") {\n  return arr.filter(Boolean).join(delimiter);\n}\n\n// src/utils/stableHash.ts\nfunction stableHash(prefix, seed) {\n  let hash = 0;\n  if (seed.length === 0)\n    return hash.toString();\n  for (let i = 0; i < seed.length; i++) {\n    const char = seed.charCodeAt(i);\n    hash = (hash << 5) - hash + char;\n    hash = hash & hash;\n  }\n  return `${prefix ?? \"cl\"}_${hash.toString(36)}`;\n}\n\n// src/utils/stringManipulators.ts\nfunction handlePropertyValue(property, value) {\n  if (property === \"content\") {\n    return `\"${value}\"`;\n  }\n  return value;\n}\nfunction camelCaseToDash(str) {\n  return str.replace(/([a-z])([A-Z])/g, \"$1-$2\").toLowerCase();\n}\nfunction joinedProperty(property, value) {\n  return `${property}:${value}`;\n}\nfunction toClass(str) {\n  return str ? `.${str}` : \"\";\n}\nfunction appendString(base, line) {\n  return base ? `${base}\n${line}` : line;\n}\n\n// src/Rule.ts\nvar Rule = class _Rule {\n  constructor(sheet, property, value, selector) {\n    this.sheet = sheet;\n    this.property = property;\n    this.value = value;\n    this.selector = selector;\n    this.property = property;\n    this.value = value;\n    this.joined = joinedProperty(property, value);\n    const joinedConditions = this.selector.preconditions.concat(\n      this.selector.postconditions\n    );\n    this.hash = this.selector.hasConditions ? this.selector.scopeClassName : stableHash(this.sheet.name, this.joined);\n    this.key = joinTruthy([this.joined, joinedConditions, this.hash]);\n  }\n  toString() {\n    let selectors = mergeSelectors(this.selector.preconditions, {\n      right: this.hash\n    });\n    selectors = mergeSelectors(this.selector.postconditions, {\n      left: selectors\n    });\n    return `${selectors} {${_Rule.genRule(this.property, this.value)}}`;\n  }\n  static genRule(property, value) {\n    const transformedProperty = camelCaseToDash(property);\n    return joinedProperty(\n      transformedProperty,\n      handlePropertyValue(property, value)\n    ) + \";\";\n  }\n};\nfunction mergeSelectors(selectors, { left = \"\", right = \"\" } = {}) {\n  const output = selectors.reduce((selectors2, current) => {\n    if (isPsuedoSelector(current)) {\n      return selectors2 + current;\n    }\n    if (isImmediatePostcondition(current)) {\n      return selectors2 + current.slice(1);\n    }\n    return joinTruthy([selectors2, current], \" \");\n  }, left);\n  return joinTruthy([output, toClass(right)], \" \");\n}\nvar Selector = class _Selector {\n  constructor(sheet, scopeName = null, {\n    preconditions,\n    postconditions\n  } = {}) {\n    this.sheet = sheet;\n    this.preconditions = [];\n    this.scopeClassName = null;\n    this.scopeName = null;\n    this.postconditions = [];\n    this.preconditions = preconditions ? asArray(preconditions) : [];\n    this.postconditions = postconditions ? asArray(postconditions) : [];\n    this.setScope(scopeName);\n  }\n  setScope(scopeName) {\n    if (!scopeName) {\n      return this;\n    }\n    if (!this.scopeClassName) {\n      this.scopeName = scopeName;\n      this.scopeClassName = stableHash(\n        this.sheet.name,\n        // adding the count guarantees uniqueness across style.create calls\n        scopeName + this.sheet.count\n      );\n    }\n    return this;\n  }\n  get hasConditions() {\n    return this.preconditions.length > 0 || this.postconditions.length > 0;\n  }\n  addScope(scopeName) {\n    return new _Selector(this.sheet, scopeName, {\n      preconditions: this.preconditions,\n      postconditions: this.postconditions\n    });\n  }\n  addPrecondition(precondition) {\n    return new _Selector(this.sheet, this.scopeClassName, {\n      postconditions: this.postconditions,\n      preconditions: this.preconditions.concat(precondition)\n    });\n  }\n  addPostcondition(postcondition) {\n    return new _Selector(this.sheet, this.scopeClassName, {\n      preconditions: this.preconditions,\n      postconditions: this.postconditions.concat(postcondition)\n    });\n  }\n  createRule(property, value) {\n    return new Rule(this.sheet, property, value, this);\n  }\n};\n\n// src/Sheet.ts\nvar Sheet = class {\n  constructor(name, rootNode) {\n    this.name = name;\n    this.rootNode = rootNode;\n    // Hash->css\n    this.storedStyles = {};\n    // styles->hash\n    this.storedClasses = {};\n    this.style = \"\";\n    this.count = 0;\n    this.id = `flairup-${name}`;\n    this.styleTag = this.createStyleTag();\n  }\n  getStyle() {\n    return this.style;\n  }\n  append(css) {\n    this.style = appendString(this.style, css);\n  }\n  apply() {\n    this.count++;\n    if (!this.styleTag) {\n      return;\n    }\n    this.styleTag.innerHTML = this.style;\n  }\n  isApplied() {\n    return !!this.styleTag;\n  }\n  createStyleTag() {\n    if (typeof document === \"undefined\" || this.isApplied() || // Explicitly disallow mounting to the DOM\n    this.rootNode === null) {\n      return this.styleTag;\n    }\n    const styleTag = document.createElement(\"style\");\n    styleTag.type = \"text/css\";\n    styleTag.id = this.id;\n    (this.rootNode ?? document.head).appendChild(styleTag);\n    return styleTag;\n  }\n  addRule(rule) {\n    const storedClass = this.storedClasses[rule.key];\n    if (isString(storedClass)) {\n      return storedClass;\n    }\n    this.storedClasses[rule.key] = rule.hash;\n    this.storedStyles[rule.hash] = [rule.property, rule.value];\n    this.append(rule.toString());\n    return rule.hash;\n  }\n};\n\n// src/utils/forIn.ts\nfunction forIn(obj, fn) {\n  for (const key in obj) {\n    fn(key.trim(), obj[key]);\n  }\n}\n\n// src/cx.ts\nfunction cx(...args) {\n  const classes = args.reduce((classes2, arg) => {\n    if (arg instanceof Set) {\n      classes2.push(...arg);\n    } else if (typeof arg === \"string\") {\n      classes2.push(arg);\n    } else if (Array.isArray(arg)) {\n      classes2.push(cx(...arg));\n    } else if (typeof arg === \"object\") {\n      Object.entries(arg).forEach(([key, value]) => {\n        if (value) {\n          classes2.push(key);\n        }\n      });\n    }\n    return classes2;\n  }, []);\n  return joinTruthy(classes, \" \").trim();\n}\n\n// src/index.ts\nfunction createSheet(name, rootNode) {\n  const sheet = new Sheet(name, rootNode);\n  return {\n    create,\n    getStyle: sheet.getStyle.bind(sheet),\n    isApplied: sheet.isApplied.bind(sheet)\n  };\n  function create(styles) {\n    const scopedStyles = {};\n    iteratePreconditions(sheet, styles, new Selector(sheet)).forEach(\n      ([scopeName, styles2, selector]) => {\n        iterateStyles(sheet, styles2, selector).forEach(\n          (className) => {\n            addScopedStyle(scopeName, className);\n          }\n        );\n      }\n    );\n    sheet.apply();\n    return scopedStyles;\n    function addScopedStyle(name2, className) {\n      scopedStyles[name2] = scopedStyles[name2] ?? /* @__PURE__ */ new Set();\n      scopedStyles[name2].add(className);\n    }\n  }\n}\nfunction iteratePreconditions(sheet, styles, selector) {\n  const output = [];\n  forIn(styles, (key, value) => {\n    if (isStyleCondition(key)) {\n      return iteratePreconditions(\n        sheet,\n        value,\n        selector.addPrecondition(key)\n      ).forEach((item) => output.push(item));\n    }\n    output.push([key, styles[key], selector.addScope(key)]);\n  });\n  return output;\n}\nfunction iterateStyles(sheet, styles, selector) {\n  const output = /* @__PURE__ */ new Set();\n  forIn(styles, (property, value) => {\n    let res = [];\n    if (isStyleCondition(property)) {\n      res = iterateStyles(\n        sheet,\n        value,\n        selector.addPostcondition(property)\n      );\n    } else if (isDirectClass(property)) {\n      res = asArray(value);\n    } else if (isMediaQuery(property)) {\n      res = handleMediaQuery(sheet, value, property, selector);\n    } else if (isCssVariables(property)) {\n      res = cssVariablesBlock(sheet, value, selector);\n    } else if (isValidProperty(property, value)) {\n      const rule = selector.createRule(property, value);\n      sheet.addRule(rule);\n      output.add(rule.hash);\n    }\n    return addEachClass(res, output);\n  });\n  return output;\n}\nfunction addEachClass(list, to) {\n  list.forEach((className) => to.add(className));\n  return to;\n}\nfunction cssVariablesBlock(sheet, styles, selector) {\n  const classes = /* @__PURE__ */ new Set();\n  const chunkRows = [];\n  forIn(styles, (property, value) => {\n    if (isValidProperty(property, value)) {\n      chunkRows.push(Rule.genRule(property, value));\n      return;\n    }\n    const res = iterateStyles(sheet, value ?? {}, selector);\n    addEachClass(res, classes);\n  });\n  if (!selector.scopeClassName) {\n    return classes;\n  }\n  if (chunkRows.length) {\n    const output = chunkRows.join(\" \");\n    sheet.append(\n      `${mergeSelectors(selector.preconditions, {\n        right: selector.scopeClassName\n      })} {${output}}`\n    );\n  }\n  classes.add(selector.scopeClassName);\n  return classes;\n}\nfunction handleMediaQuery(sheet, styles, mediaQuery, selector) {\n  sheet.append(mediaQuery + \" {\");\n  const output = iterateStyles(sheet, styles, selector);\n  sheet.append(\"}\");\n  return output;\n}\n\n//# sourceMappingURL=index.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZmxhaXJ1cC9kaXN0L2VzbS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxlQUFlLEdBQUcsa0JBQWtCO0FBQ2hEOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsTUFBTTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksU0FBUyxHQUFHLE1BQU07QUFDOUI7QUFDQTtBQUNBLG1CQUFtQixJQUFJO0FBQ3ZCO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkIsRUFBRSxLQUFLO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxjQUFjLFlBQVksRUFBRSwwQ0FBMEM7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxxQ0FBcUMsd0JBQXdCLElBQUk7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLElBQUk7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixLQUFLO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsT0FBTyxJQUFJLEVBQUUsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUlFO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9haS1leHBlbnNlLWFkdmlzb3IvLi9ub2RlX21vZHVsZXMvZmxhaXJ1cC9kaXN0L2VzbS9pbmRleC5qcz9iNGUwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHNyYy91dGlscy9hc0FycmF5LnRzXG5mdW5jdGlvbiBhc0FycmF5KHYpIHtcbiAgcmV0dXJuIFtdLmNvbmNhdCh2KTtcbn1cblxuLy8gc3JjL3V0aWxzL2lzLnRzXG5mdW5jdGlvbiBpc1BzdWVkb1NlbGVjdG9yKHNlbGVjdG9yKSB7XG4gIHJldHVybiBzZWxlY3Rvci5zdGFydHNXaXRoKFwiOlwiKTtcbn1cbmZ1bmN0aW9uIGlzU3R5bGVDb25kaXRpb24oc2VsZWN0b3IpIHtcbiAgcmV0dXJuIGlzU3RyaW5nKHNlbGVjdG9yKSAmJiAoc2VsZWN0b3IgPT09IFwiKlwiIHx8IHNlbGVjdG9yLmxlbmd0aCA+IDEgJiYgXCI6Pn4uKypcIi5pbmNsdWRlcyhzZWxlY3Rvci5zbGljZSgwLCAxKSkgfHwgaXNJbW1lZGlhdGVQb3N0Y29uZGl0aW9uKHNlbGVjdG9yKSk7XG59XG5mdW5jdGlvbiBpc1ZhbGlkUHJvcGVydHkocHJvcGVydHksIHZhbHVlKSB7XG4gIHJldHVybiAoaXNTdHJpbmcodmFsdWUpIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikgJiYgIWlzQ3NzVmFyaWFibGVzKHByb3BlcnR5KSAmJiAhaXNQc3VlZG9TZWxlY3Rvcihwcm9wZXJ0eSkgJiYgIWlzTWVkaWFRdWVyeShwcm9wZXJ0eSk7XG59XG5mdW5jdGlvbiBpc01lZGlhUXVlcnkoc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHNlbGVjdG9yLnN0YXJ0c1dpdGgoXCJAbWVkaWFcIik7XG59XG5mdW5jdGlvbiBpc0RpcmVjdENsYXNzKHNlbGVjdG9yKSB7XG4gIHJldHVybiBzZWxlY3RvciA9PT0gXCIuXCI7XG59XG5mdW5jdGlvbiBpc0Nzc1ZhcmlhYmxlcyhzZWxlY3Rvcikge1xuICByZXR1cm4gc2VsZWN0b3IgPT09IFwiLS1cIjtcbn1cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSArIFwiXCIgPT09IHZhbHVlO1xufVxuZnVuY3Rpb24gaXNJbW1lZGlhdGVQb3N0Y29uZGl0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBpc1N0cmluZyh2YWx1ZSkgJiYgKHZhbHVlLnN0YXJ0c1dpdGgoXCImXCIpIHx8IGlzUHN1ZWRvU2VsZWN0b3IodmFsdWUpKTtcbn1cblxuLy8gc3JjL3V0aWxzL2pvaW5UcnV0aHkudHNcbmZ1bmN0aW9uIGpvaW5UcnV0aHkoYXJyLCBkZWxpbWl0ZXIgPSBcIlwiKSB7XG4gIHJldHVybiBhcnIuZmlsdGVyKEJvb2xlYW4pLmpvaW4oZGVsaW1pdGVyKTtcbn1cblxuLy8gc3JjL3V0aWxzL3N0YWJsZUhhc2gudHNcbmZ1bmN0aW9uIHN0YWJsZUhhc2gocHJlZml4LCBzZWVkKSB7XG4gIGxldCBoYXNoID0gMDtcbiAgaWYgKHNlZWQubGVuZ3RoID09PSAwKVxuICAgIHJldHVybiBoYXNoLnRvU3RyaW5nKCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2VlZC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNoYXIgPSBzZWVkLmNoYXJDb2RlQXQoaSk7XG4gICAgaGFzaCA9IChoYXNoIDw8IDUpIC0gaGFzaCArIGNoYXI7XG4gICAgaGFzaCA9IGhhc2ggJiBoYXNoO1xuICB9XG4gIHJldHVybiBgJHtwcmVmaXggPz8gXCJjbFwifV8ke2hhc2gudG9TdHJpbmcoMzYpfWA7XG59XG5cbi8vIHNyYy91dGlscy9zdHJpbmdNYW5pcHVsYXRvcnMudHNcbmZ1bmN0aW9uIGhhbmRsZVByb3BlcnR5VmFsdWUocHJvcGVydHksIHZhbHVlKSB7XG4gIGlmIChwcm9wZXJ0eSA9PT0gXCJjb250ZW50XCIpIHtcbiAgICByZXR1cm4gYFwiJHt2YWx1ZX1cImA7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuZnVuY3Rpb24gY2FtZWxDYXNlVG9EYXNoKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csIFwiJDEtJDJcIikudG9Mb3dlckNhc2UoKTtcbn1cbmZ1bmN0aW9uIGpvaW5lZFByb3BlcnR5KHByb3BlcnR5LCB2YWx1ZSkge1xuICByZXR1cm4gYCR7cHJvcGVydHl9OiR7dmFsdWV9YDtcbn1cbmZ1bmN0aW9uIHRvQ2xhc3Moc3RyKSB7XG4gIHJldHVybiBzdHIgPyBgLiR7c3RyfWAgOiBcIlwiO1xufVxuZnVuY3Rpb24gYXBwZW5kU3RyaW5nKGJhc2UsIGxpbmUpIHtcbiAgcmV0dXJuIGJhc2UgPyBgJHtiYXNlfVxuJHtsaW5lfWAgOiBsaW5lO1xufVxuXG4vLyBzcmMvUnVsZS50c1xudmFyIFJ1bGUgPSBjbGFzcyBfUnVsZSB7XG4gIGNvbnN0cnVjdG9yKHNoZWV0LCBwcm9wZXJ0eSwgdmFsdWUsIHNlbGVjdG9yKSB7XG4gICAgdGhpcy5zaGVldCA9IHNoZWV0O1xuICAgIHRoaXMucHJvcGVydHkgPSBwcm9wZXJ0eTtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yO1xuICAgIHRoaXMucHJvcGVydHkgPSBwcm9wZXJ0eTtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5qb2luZWQgPSBqb2luZWRQcm9wZXJ0eShwcm9wZXJ0eSwgdmFsdWUpO1xuICAgIGNvbnN0IGpvaW5lZENvbmRpdGlvbnMgPSB0aGlzLnNlbGVjdG9yLnByZWNvbmRpdGlvbnMuY29uY2F0KFxuICAgICAgdGhpcy5zZWxlY3Rvci5wb3N0Y29uZGl0aW9uc1xuICAgICk7XG4gICAgdGhpcy5oYXNoID0gdGhpcy5zZWxlY3Rvci5oYXNDb25kaXRpb25zID8gdGhpcy5zZWxlY3Rvci5zY29wZUNsYXNzTmFtZSA6IHN0YWJsZUhhc2godGhpcy5zaGVldC5uYW1lLCB0aGlzLmpvaW5lZCk7XG4gICAgdGhpcy5rZXkgPSBqb2luVHJ1dGh5KFt0aGlzLmpvaW5lZCwgam9pbmVkQ29uZGl0aW9ucywgdGhpcy5oYXNoXSk7XG4gIH1cbiAgdG9TdHJpbmcoKSB7XG4gICAgbGV0IHNlbGVjdG9ycyA9IG1lcmdlU2VsZWN0b3JzKHRoaXMuc2VsZWN0b3IucHJlY29uZGl0aW9ucywge1xuICAgICAgcmlnaHQ6IHRoaXMuaGFzaFxuICAgIH0pO1xuICAgIHNlbGVjdG9ycyA9IG1lcmdlU2VsZWN0b3JzKHRoaXMuc2VsZWN0b3IucG9zdGNvbmRpdGlvbnMsIHtcbiAgICAgIGxlZnQ6IHNlbGVjdG9yc1xuICAgIH0pO1xuICAgIHJldHVybiBgJHtzZWxlY3RvcnN9IHske19SdWxlLmdlblJ1bGUodGhpcy5wcm9wZXJ0eSwgdGhpcy52YWx1ZSl9fWA7XG4gIH1cbiAgc3RhdGljIGdlblJ1bGUocHJvcGVydHksIHZhbHVlKSB7XG4gICAgY29uc3QgdHJhbnNmb3JtZWRQcm9wZXJ0eSA9IGNhbWVsQ2FzZVRvRGFzaChwcm9wZXJ0eSk7XG4gICAgcmV0dXJuIGpvaW5lZFByb3BlcnR5KFxuICAgICAgdHJhbnNmb3JtZWRQcm9wZXJ0eSxcbiAgICAgIGhhbmRsZVByb3BlcnR5VmFsdWUocHJvcGVydHksIHZhbHVlKVxuICAgICkgKyBcIjtcIjtcbiAgfVxufTtcbmZ1bmN0aW9uIG1lcmdlU2VsZWN0b3JzKHNlbGVjdG9ycywgeyBsZWZ0ID0gXCJcIiwgcmlnaHQgPSBcIlwiIH0gPSB7fSkge1xuICBjb25zdCBvdXRwdXQgPSBzZWxlY3RvcnMucmVkdWNlKChzZWxlY3RvcnMyLCBjdXJyZW50KSA9PiB7XG4gICAgaWYgKGlzUHN1ZWRvU2VsZWN0b3IoY3VycmVudCkpIHtcbiAgICAgIHJldHVybiBzZWxlY3RvcnMyICsgY3VycmVudDtcbiAgICB9XG4gICAgaWYgKGlzSW1tZWRpYXRlUG9zdGNvbmRpdGlvbihjdXJyZW50KSkge1xuICAgICAgcmV0dXJuIHNlbGVjdG9yczIgKyBjdXJyZW50LnNsaWNlKDEpO1xuICAgIH1cbiAgICByZXR1cm4gam9pblRydXRoeShbc2VsZWN0b3JzMiwgY3VycmVudF0sIFwiIFwiKTtcbiAgfSwgbGVmdCk7XG4gIHJldHVybiBqb2luVHJ1dGh5KFtvdXRwdXQsIHRvQ2xhc3MocmlnaHQpXSwgXCIgXCIpO1xufVxudmFyIFNlbGVjdG9yID0gY2xhc3MgX1NlbGVjdG9yIHtcbiAgY29uc3RydWN0b3Ioc2hlZXQsIHNjb3BlTmFtZSA9IG51bGwsIHtcbiAgICBwcmVjb25kaXRpb25zLFxuICAgIHBvc3Rjb25kaXRpb25zXG4gIH0gPSB7fSkge1xuICAgIHRoaXMuc2hlZXQgPSBzaGVldDtcbiAgICB0aGlzLnByZWNvbmRpdGlvbnMgPSBbXTtcbiAgICB0aGlzLnNjb3BlQ2xhc3NOYW1lID0gbnVsbDtcbiAgICB0aGlzLnNjb3BlTmFtZSA9IG51bGw7XG4gICAgdGhpcy5wb3N0Y29uZGl0aW9ucyA9IFtdO1xuICAgIHRoaXMucHJlY29uZGl0aW9ucyA9IHByZWNvbmRpdGlvbnMgPyBhc0FycmF5KHByZWNvbmRpdGlvbnMpIDogW107XG4gICAgdGhpcy5wb3N0Y29uZGl0aW9ucyA9IHBvc3Rjb25kaXRpb25zID8gYXNBcnJheShwb3N0Y29uZGl0aW9ucykgOiBbXTtcbiAgICB0aGlzLnNldFNjb3BlKHNjb3BlTmFtZSk7XG4gIH1cbiAgc2V0U2NvcGUoc2NvcGVOYW1lKSB7XG4gICAgaWYgKCFzY29wZU5hbWUpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuc2NvcGVDbGFzc05hbWUpIHtcbiAgICAgIHRoaXMuc2NvcGVOYW1lID0gc2NvcGVOYW1lO1xuICAgICAgdGhpcy5zY29wZUNsYXNzTmFtZSA9IHN0YWJsZUhhc2goXG4gICAgICAgIHRoaXMuc2hlZXQubmFtZSxcbiAgICAgICAgLy8gYWRkaW5nIHRoZSBjb3VudCBndWFyYW50ZWVzIHVuaXF1ZW5lc3MgYWNyb3NzIHN0eWxlLmNyZWF0ZSBjYWxsc1xuICAgICAgICBzY29wZU5hbWUgKyB0aGlzLnNoZWV0LmNvdW50XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBnZXQgaGFzQ29uZGl0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5wcmVjb25kaXRpb25zLmxlbmd0aCA+IDAgfHwgdGhpcy5wb3N0Y29uZGl0aW9ucy5sZW5ndGggPiAwO1xuICB9XG4gIGFkZFNjb3BlKHNjb3BlTmFtZSkge1xuICAgIHJldHVybiBuZXcgX1NlbGVjdG9yKHRoaXMuc2hlZXQsIHNjb3BlTmFtZSwge1xuICAgICAgcHJlY29uZGl0aW9uczogdGhpcy5wcmVjb25kaXRpb25zLFxuICAgICAgcG9zdGNvbmRpdGlvbnM6IHRoaXMucG9zdGNvbmRpdGlvbnNcbiAgICB9KTtcbiAgfVxuICBhZGRQcmVjb25kaXRpb24ocHJlY29uZGl0aW9uKSB7XG4gICAgcmV0dXJuIG5ldyBfU2VsZWN0b3IodGhpcy5zaGVldCwgdGhpcy5zY29wZUNsYXNzTmFtZSwge1xuICAgICAgcG9zdGNvbmRpdGlvbnM6IHRoaXMucG9zdGNvbmRpdGlvbnMsXG4gICAgICBwcmVjb25kaXRpb25zOiB0aGlzLnByZWNvbmRpdGlvbnMuY29uY2F0KHByZWNvbmRpdGlvbilcbiAgICB9KTtcbiAgfVxuICBhZGRQb3N0Y29uZGl0aW9uKHBvc3Rjb25kaXRpb24pIHtcbiAgICByZXR1cm4gbmV3IF9TZWxlY3Rvcih0aGlzLnNoZWV0LCB0aGlzLnNjb3BlQ2xhc3NOYW1lLCB7XG4gICAgICBwcmVjb25kaXRpb25zOiB0aGlzLnByZWNvbmRpdGlvbnMsXG4gICAgICBwb3N0Y29uZGl0aW9uczogdGhpcy5wb3N0Y29uZGl0aW9ucy5jb25jYXQocG9zdGNvbmRpdGlvbilcbiAgICB9KTtcbiAgfVxuICBjcmVhdGVSdWxlKHByb3BlcnR5LCB2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgUnVsZSh0aGlzLnNoZWV0LCBwcm9wZXJ0eSwgdmFsdWUsIHRoaXMpO1xuICB9XG59O1xuXG4vLyBzcmMvU2hlZXQudHNcbnZhciBTaGVldCA9IGNsYXNzIHtcbiAgY29uc3RydWN0b3IobmFtZSwgcm9vdE5vZGUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMucm9vdE5vZGUgPSByb290Tm9kZTtcbiAgICAvLyBIYXNoLT5jc3NcbiAgICB0aGlzLnN0b3JlZFN0eWxlcyA9IHt9O1xuICAgIC8vIHN0eWxlcy0+aGFzaFxuICAgIHRoaXMuc3RvcmVkQ2xhc3NlcyA9IHt9O1xuICAgIHRoaXMuc3R5bGUgPSBcIlwiO1xuICAgIHRoaXMuY291bnQgPSAwO1xuICAgIHRoaXMuaWQgPSBgZmxhaXJ1cC0ke25hbWV9YDtcbiAgICB0aGlzLnN0eWxlVGFnID0gdGhpcy5jcmVhdGVTdHlsZVRhZygpO1xuICB9XG4gIGdldFN0eWxlKCkge1xuICAgIHJldHVybiB0aGlzLnN0eWxlO1xuICB9XG4gIGFwcGVuZChjc3MpIHtcbiAgICB0aGlzLnN0eWxlID0gYXBwZW5kU3RyaW5nKHRoaXMuc3R5bGUsIGNzcyk7XG4gIH1cbiAgYXBwbHkoKSB7XG4gICAgdGhpcy5jb3VudCsrO1xuICAgIGlmICghdGhpcy5zdHlsZVRhZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnN0eWxlVGFnLmlubmVySFRNTCA9IHRoaXMuc3R5bGU7XG4gIH1cbiAgaXNBcHBsaWVkKCkge1xuICAgIHJldHVybiAhIXRoaXMuc3R5bGVUYWc7XG4gIH1cbiAgY3JlYXRlU3R5bGVUYWcoKSB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0aGlzLmlzQXBwbGllZCgpIHx8IC8vIEV4cGxpY2l0bHkgZGlzYWxsb3cgbW91bnRpbmcgdG8gdGhlIERPTVxuICAgIHRoaXMucm9vdE5vZGUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0eWxlVGFnO1xuICAgIH1cbiAgICBjb25zdCBzdHlsZVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgICBzdHlsZVRhZy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuICAgIHN0eWxlVGFnLmlkID0gdGhpcy5pZDtcbiAgICAodGhpcy5yb290Tm9kZSA/PyBkb2N1bWVudC5oZWFkKS5hcHBlbmRDaGlsZChzdHlsZVRhZyk7XG4gICAgcmV0dXJuIHN0eWxlVGFnO1xuICB9XG4gIGFkZFJ1bGUocnVsZSkge1xuICAgIGNvbnN0IHN0b3JlZENsYXNzID0gdGhpcy5zdG9yZWRDbGFzc2VzW3J1bGUua2V5XTtcbiAgICBpZiAoaXNTdHJpbmcoc3RvcmVkQ2xhc3MpKSB7XG4gICAgICByZXR1cm4gc3RvcmVkQ2xhc3M7XG4gICAgfVxuICAgIHRoaXMuc3RvcmVkQ2xhc3Nlc1tydWxlLmtleV0gPSBydWxlLmhhc2g7XG4gICAgdGhpcy5zdG9yZWRTdHlsZXNbcnVsZS5oYXNoXSA9IFtydWxlLnByb3BlcnR5LCBydWxlLnZhbHVlXTtcbiAgICB0aGlzLmFwcGVuZChydWxlLnRvU3RyaW5nKCkpO1xuICAgIHJldHVybiBydWxlLmhhc2g7XG4gIH1cbn07XG5cbi8vIHNyYy91dGlscy9mb3JJbi50c1xuZnVuY3Rpb24gZm9ySW4ob2JqLCBmbikge1xuICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICBmbihrZXkudHJpbSgpLCBvYmpba2V5XSk7XG4gIH1cbn1cblxuLy8gc3JjL2N4LnRzXG5mdW5jdGlvbiBjeCguLi5hcmdzKSB7XG4gIGNvbnN0IGNsYXNzZXMgPSBhcmdzLnJlZHVjZSgoY2xhc3NlczIsIGFyZykgPT4ge1xuICAgIGlmIChhcmcgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgIGNsYXNzZXMyLnB1c2goLi4uYXJnKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGNsYXNzZXMyLnB1c2goYXJnKTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuICAgICAgY2xhc3NlczIucHVzaChjeCguLi5hcmcpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIE9iamVjdC5lbnRyaWVzKGFyZykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgIGNsYXNzZXMyLnB1c2goa2V5KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBjbGFzc2VzMjtcbiAgfSwgW10pO1xuICByZXR1cm4gam9pblRydXRoeShjbGFzc2VzLCBcIiBcIikudHJpbSgpO1xufVxuXG4vLyBzcmMvaW5kZXgudHNcbmZ1bmN0aW9uIGNyZWF0ZVNoZWV0KG5hbWUsIHJvb3ROb2RlKSB7XG4gIGNvbnN0IHNoZWV0ID0gbmV3IFNoZWV0KG5hbWUsIHJvb3ROb2RlKTtcbiAgcmV0dXJuIHtcbiAgICBjcmVhdGUsXG4gICAgZ2V0U3R5bGU6IHNoZWV0LmdldFN0eWxlLmJpbmQoc2hlZXQpLFxuICAgIGlzQXBwbGllZDogc2hlZXQuaXNBcHBsaWVkLmJpbmQoc2hlZXQpXG4gIH07XG4gIGZ1bmN0aW9uIGNyZWF0ZShzdHlsZXMpIHtcbiAgICBjb25zdCBzY29wZWRTdHlsZXMgPSB7fTtcbiAgICBpdGVyYXRlUHJlY29uZGl0aW9ucyhzaGVldCwgc3R5bGVzLCBuZXcgU2VsZWN0b3Ioc2hlZXQpKS5mb3JFYWNoKFxuICAgICAgKFtzY29wZU5hbWUsIHN0eWxlczIsIHNlbGVjdG9yXSkgPT4ge1xuICAgICAgICBpdGVyYXRlU3R5bGVzKHNoZWV0LCBzdHlsZXMyLCBzZWxlY3RvcikuZm9yRWFjaChcbiAgICAgICAgICAoY2xhc3NOYW1lKSA9PiB7XG4gICAgICAgICAgICBhZGRTY29wZWRTdHlsZShzY29wZU5hbWUsIGNsYXNzTmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfVxuICAgICk7XG4gICAgc2hlZXQuYXBwbHkoKTtcbiAgICByZXR1cm4gc2NvcGVkU3R5bGVzO1xuICAgIGZ1bmN0aW9uIGFkZFNjb3BlZFN0eWxlKG5hbWUyLCBjbGFzc05hbWUpIHtcbiAgICAgIHNjb3BlZFN0eWxlc1tuYW1lMl0gPSBzY29wZWRTdHlsZXNbbmFtZTJdID8/IC8qIEBfX1BVUkVfXyAqLyBuZXcgU2V0KCk7XG4gICAgICBzY29wZWRTdHlsZXNbbmFtZTJdLmFkZChjbGFzc05hbWUpO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gaXRlcmF0ZVByZWNvbmRpdGlvbnMoc2hlZXQsIHN0eWxlcywgc2VsZWN0b3IpIHtcbiAgY29uc3Qgb3V0cHV0ID0gW107XG4gIGZvckluKHN0eWxlcywgKGtleSwgdmFsdWUpID0+IHtcbiAgICBpZiAoaXNTdHlsZUNvbmRpdGlvbihrZXkpKSB7XG4gICAgICByZXR1cm4gaXRlcmF0ZVByZWNvbmRpdGlvbnMoXG4gICAgICAgIHNoZWV0LFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgc2VsZWN0b3IuYWRkUHJlY29uZGl0aW9uKGtleSlcbiAgICAgICkuZm9yRWFjaCgoaXRlbSkgPT4gb3V0cHV0LnB1c2goaXRlbSkpO1xuICAgIH1cbiAgICBvdXRwdXQucHVzaChba2V5LCBzdHlsZXNba2V5XSwgc2VsZWN0b3IuYWRkU2NvcGUoa2V5KV0pO1xuICB9KTtcbiAgcmV0dXJuIG91dHB1dDtcbn1cbmZ1bmN0aW9uIGl0ZXJhdGVTdHlsZXMoc2hlZXQsIHN0eWxlcywgc2VsZWN0b3IpIHtcbiAgY29uc3Qgb3V0cHV0ID0gLyogQF9fUFVSRV9fICovIG5ldyBTZXQoKTtcbiAgZm9ySW4oc3R5bGVzLCAocHJvcGVydHksIHZhbHVlKSA9PiB7XG4gICAgbGV0IHJlcyA9IFtdO1xuICAgIGlmIChpc1N0eWxlQ29uZGl0aW9uKHByb3BlcnR5KSkge1xuICAgICAgcmVzID0gaXRlcmF0ZVN0eWxlcyhcbiAgICAgICAgc2hlZXQsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBzZWxlY3Rvci5hZGRQb3N0Y29uZGl0aW9uKHByb3BlcnR5KVxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKGlzRGlyZWN0Q2xhc3MocHJvcGVydHkpKSB7XG4gICAgICByZXMgPSBhc0FycmF5KHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKGlzTWVkaWFRdWVyeShwcm9wZXJ0eSkpIHtcbiAgICAgIHJlcyA9IGhhbmRsZU1lZGlhUXVlcnkoc2hlZXQsIHZhbHVlLCBwcm9wZXJ0eSwgc2VsZWN0b3IpO1xuICAgIH0gZWxzZSBpZiAoaXNDc3NWYXJpYWJsZXMocHJvcGVydHkpKSB7XG4gICAgICByZXMgPSBjc3NWYXJpYWJsZXNCbG9jayhzaGVldCwgdmFsdWUsIHNlbGVjdG9yKTtcbiAgICB9IGVsc2UgaWYgKGlzVmFsaWRQcm9wZXJ0eShwcm9wZXJ0eSwgdmFsdWUpKSB7XG4gICAgICBjb25zdCBydWxlID0gc2VsZWN0b3IuY3JlYXRlUnVsZShwcm9wZXJ0eSwgdmFsdWUpO1xuICAgICAgc2hlZXQuYWRkUnVsZShydWxlKTtcbiAgICAgIG91dHB1dC5hZGQocnVsZS5oYXNoKTtcbiAgICB9XG4gICAgcmV0dXJuIGFkZEVhY2hDbGFzcyhyZXMsIG91dHB1dCk7XG4gIH0pO1xuICByZXR1cm4gb3V0cHV0O1xufVxuZnVuY3Rpb24gYWRkRWFjaENsYXNzKGxpc3QsIHRvKSB7XG4gIGxpc3QuZm9yRWFjaCgoY2xhc3NOYW1lKSA9PiB0by5hZGQoY2xhc3NOYW1lKSk7XG4gIHJldHVybiB0bztcbn1cbmZ1bmN0aW9uIGNzc1ZhcmlhYmxlc0Jsb2NrKHNoZWV0LCBzdHlsZXMsIHNlbGVjdG9yKSB7XG4gIGNvbnN0IGNsYXNzZXMgPSAvKiBAX19QVVJFX18gKi8gbmV3IFNldCgpO1xuICBjb25zdCBjaHVua1Jvd3MgPSBbXTtcbiAgZm9ySW4oc3R5bGVzLCAocHJvcGVydHksIHZhbHVlKSA9PiB7XG4gICAgaWYgKGlzVmFsaWRQcm9wZXJ0eShwcm9wZXJ0eSwgdmFsdWUpKSB7XG4gICAgICBjaHVua1Jvd3MucHVzaChSdWxlLmdlblJ1bGUocHJvcGVydHksIHZhbHVlKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHJlcyA9IGl0ZXJhdGVTdHlsZXMoc2hlZXQsIHZhbHVlID8/IHt9LCBzZWxlY3Rvcik7XG4gICAgYWRkRWFjaENsYXNzKHJlcywgY2xhc3Nlcyk7XG4gIH0pO1xuICBpZiAoIXNlbGVjdG9yLnNjb3BlQ2xhc3NOYW1lKSB7XG4gICAgcmV0dXJuIGNsYXNzZXM7XG4gIH1cbiAgaWYgKGNodW5rUm93cy5sZW5ndGgpIHtcbiAgICBjb25zdCBvdXRwdXQgPSBjaHVua1Jvd3Muam9pbihcIiBcIik7XG4gICAgc2hlZXQuYXBwZW5kKFxuICAgICAgYCR7bWVyZ2VTZWxlY3RvcnMoc2VsZWN0b3IucHJlY29uZGl0aW9ucywge1xuICAgICAgICByaWdodDogc2VsZWN0b3Iuc2NvcGVDbGFzc05hbWVcbiAgICAgIH0pfSB7JHtvdXRwdXR9fWBcbiAgICApO1xuICB9XG4gIGNsYXNzZXMuYWRkKHNlbGVjdG9yLnNjb3BlQ2xhc3NOYW1lKTtcbiAgcmV0dXJuIGNsYXNzZXM7XG59XG5mdW5jdGlvbiBoYW5kbGVNZWRpYVF1ZXJ5KHNoZWV0LCBzdHlsZXMsIG1lZGlhUXVlcnksIHNlbGVjdG9yKSB7XG4gIHNoZWV0LmFwcGVuZChtZWRpYVF1ZXJ5ICsgXCIge1wiKTtcbiAgY29uc3Qgb3V0cHV0ID0gaXRlcmF0ZVN0eWxlcyhzaGVldCwgc3R5bGVzLCBzZWxlY3Rvcik7XG4gIHNoZWV0LmFwcGVuZChcIn1cIik7XG4gIHJldHVybiBvdXRwdXQ7XG59XG5leHBvcnQge1xuICBjcmVhdGVTaGVldCxcbiAgY3hcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/flairup/dist/esm/index.js\n");

/***/ })

};
;