var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/mdurl/build/index.cjs.js
var require_index_cjs = __commonJS({
  "node_modules/mdurl/build/index.cjs.js"(exports2) {
    "use strict";
    var decodeCache = {};
    function getDecodeCache(exclude) {
      let cache = decodeCache[exclude];
      if (cache) {
        return cache;
      }
      cache = decodeCache[exclude] = [];
      for (let i = 0; i < 128; i++) {
        const ch = String.fromCharCode(i);
        cache.push(ch);
      }
      for (let i = 0; i < exclude.length; i++) {
        const ch = exclude.charCodeAt(i);
        cache[ch] = "%" + ("0" + ch.toString(16).toUpperCase()).slice(-2);
      }
      return cache;
    }
    function decode2(string, exclude) {
      if (typeof exclude !== "string") {
        exclude = decode2.defaultChars;
      }
      const cache = getDecodeCache(exclude);
      return string.replace(/(%[a-f0-9]{2})+/gi, function(seq) {
        let result = "";
        for (let i = 0, l = seq.length; i < l; i += 3) {
          const b1 = parseInt(seq.slice(i + 1, i + 3), 16);
          if (b1 < 128) {
            result += cache[b1];
            continue;
          }
          if ((b1 & 224) === 192 && i + 3 < l) {
            const b2 = parseInt(seq.slice(i + 4, i + 6), 16);
            if ((b2 & 192) === 128) {
              const chr = b1 << 6 & 1984 | b2 & 63;
              if (chr < 128) {
                result += "\uFFFD\uFFFD";
              } else {
                result += String.fromCharCode(chr);
              }
              i += 3;
              continue;
            }
          }
          if ((b1 & 240) === 224 && i + 6 < l) {
            const b2 = parseInt(seq.slice(i + 4, i + 6), 16);
            const b3 = parseInt(seq.slice(i + 7, i + 9), 16);
            if ((b2 & 192) === 128 && (b3 & 192) === 128) {
              const chr = b1 << 12 & 61440 | b2 << 6 & 4032 | b3 & 63;
              if (chr < 2048 || chr >= 55296 && chr <= 57343) {
                result += "\uFFFD\uFFFD\uFFFD";
              } else {
                result += String.fromCharCode(chr);
              }
              i += 6;
              continue;
            }
          }
          if ((b1 & 248) === 240 && i + 9 < l) {
            const b2 = parseInt(seq.slice(i + 4, i + 6), 16);
            const b3 = parseInt(seq.slice(i + 7, i + 9), 16);
            const b4 = parseInt(seq.slice(i + 10, i + 12), 16);
            if ((b2 & 192) === 128 && (b3 & 192) === 128 && (b4 & 192) === 128) {
              let chr = b1 << 18 & 1835008 | b2 << 12 & 258048 | b3 << 6 & 4032 | b4 & 63;
              if (chr < 65536 || chr > 1114111) {
                result += "\uFFFD\uFFFD\uFFFD\uFFFD";
              } else {
                chr -= 65536;
                result += String.fromCharCode(55296 + (chr >> 10), 56320 + (chr & 1023));
              }
              i += 9;
              continue;
            }
          }
          result += "\uFFFD";
        }
        return result;
      });
    }
    decode2.defaultChars = ";/?:@&=+$,#";
    decode2.componentChars = "";
    var encodeCache = {};
    function getEncodeCache(exclude) {
      let cache = encodeCache[exclude];
      if (cache) {
        return cache;
      }
      cache = encodeCache[exclude] = [];
      for (let i = 0; i < 128; i++) {
        const ch = String.fromCharCode(i);
        if (/^[0-9a-z]$/i.test(ch)) {
          cache.push(ch);
        } else {
          cache.push("%" + ("0" + i.toString(16).toUpperCase()).slice(-2));
        }
      }
      for (let i = 0; i < exclude.length; i++) {
        cache[exclude.charCodeAt(i)] = exclude[i];
      }
      return cache;
    }
    function encode2(string, exclude, keepEscaped) {
      if (typeof exclude !== "string") {
        keepEscaped = exclude;
        exclude = encode2.defaultChars;
      }
      if (typeof keepEscaped === "undefined") {
        keepEscaped = true;
      }
      const cache = getEncodeCache(exclude);
      let result = "";
      for (let i = 0, l = string.length; i < l; i++) {
        const code = string.charCodeAt(i);
        if (keepEscaped && code === 37 && i + 2 < l) {
          if (/^[0-9a-f]{2}$/i.test(string.slice(i + 1, i + 3))) {
            result += string.slice(i, i + 3);
            i += 2;
            continue;
          }
        }
        if (code < 128) {
          result += cache[code];
          continue;
        }
        if (code >= 55296 && code <= 57343) {
          if (code >= 55296 && code <= 56319 && i + 1 < l) {
            const nextCode = string.charCodeAt(i + 1);
            if (nextCode >= 56320 && nextCode <= 57343) {
              result += encodeURIComponent(string[i] + string[i + 1]);
              i++;
              continue;
            }
          }
          result += "%EF%BF%BD";
          continue;
        }
        result += encodeURIComponent(string[i]);
      }
      return result;
    }
    encode2.defaultChars = ";/?:@&=+$,-_.!~*'()#";
    encode2.componentChars = "-_.!~*'()";
    function format2(url) {
      let result = "";
      result += url.protocol || "";
      result += url.slashes ? "//" : "";
      result += url.auth ? url.auth + "@" : "";
      if (url.hostname && url.hostname.indexOf(":") !== -1) {
        result += "[" + url.hostname + "]";
      } else {
        result += url.hostname || "";
      }
      result += url.port ? ":" + url.port : "";
      result += url.pathname || "";
      result += url.search || "";
      result += url.hash || "";
      return result;
    }
    function Url() {
      this.protocol = null;
      this.slashes = null;
      this.auth = null;
      this.port = null;
      this.hostname = null;
      this.hash = null;
      this.search = null;
      this.pathname = null;
    }
    var protocolPattern = /^([a-z0-9.+-]+:)/i;
    var portPattern = /:[0-9]*$/;
    var simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/;
    var delims = ["<", ">", '"', "`", " ", "\r", "\n", "	"];
    var unwise = ["{", "}", "|", "\\", "^", "`"].concat(delims);
    var autoEscape = ["'"].concat(unwise);
    var nonHostChars = ["%", "/", "?", ";", "#"].concat(autoEscape);
    var hostEndingChars = ["/", "?", "#"];
    var hostnameMaxLen = 255;
    var hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/;
    var hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/;
    var hostlessProtocol = {
      javascript: true,
      "javascript:": true
    };
    var slashedProtocol = {
      http: true,
      https: true,
      ftp: true,
      gopher: true,
      file: true,
      "http:": true,
      "https:": true,
      "ftp:": true,
      "gopher:": true,
      "file:": true
    };
    function urlParse(url, slashesDenoteHost) {
      if (url && url instanceof Url)
        return url;
      const u = new Url();
      u.parse(url, slashesDenoteHost);
      return u;
    }
    Url.prototype.parse = function(url, slashesDenoteHost) {
      let lowerProto, hec, slashes;
      let rest = url;
      rest = rest.trim();
      if (!slashesDenoteHost && url.split("#").length === 1) {
        const simplePath = simplePathPattern.exec(rest);
        if (simplePath) {
          this.pathname = simplePath[1];
          if (simplePath[2]) {
            this.search = simplePath[2];
          }
          return this;
        }
      }
      let proto = protocolPattern.exec(rest);
      if (proto) {
        proto = proto[0];
        lowerProto = proto.toLowerCase();
        this.protocol = proto;
        rest = rest.substr(proto.length);
      }
      if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
        slashes = rest.substr(0, 2) === "//";
        if (slashes && !(proto && hostlessProtocol[proto])) {
          rest = rest.substr(2);
          this.slashes = true;
        }
      }
      if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
        let hostEnd = -1;
        for (let i = 0; i < hostEndingChars.length; i++) {
          hec = rest.indexOf(hostEndingChars[i]);
          if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
            hostEnd = hec;
          }
        }
        let auth, atSign;
        if (hostEnd === -1) {
          atSign = rest.lastIndexOf("@");
        } else {
          atSign = rest.lastIndexOf("@", hostEnd);
        }
        if (atSign !== -1) {
          auth = rest.slice(0, atSign);
          rest = rest.slice(atSign + 1);
          this.auth = auth;
        }
        hostEnd = -1;
        for (let i = 0; i < nonHostChars.length; i++) {
          hec = rest.indexOf(nonHostChars[i]);
          if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
            hostEnd = hec;
          }
        }
        if (hostEnd === -1) {
          hostEnd = rest.length;
        }
        if (rest[hostEnd - 1] === ":") {
          hostEnd--;
        }
        const host = rest.slice(0, hostEnd);
        rest = rest.slice(hostEnd);
        this.parseHost(host);
        this.hostname = this.hostname || "";
        const ipv6Hostname = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
        if (!ipv6Hostname) {
          const hostparts = this.hostname.split(/\./);
          for (let i = 0, l = hostparts.length; i < l; i++) {
            const part = hostparts[i];
            if (!part) {
              continue;
            }
            if (!part.match(hostnamePartPattern)) {
              let newpart = "";
              for (let j = 0, k = part.length; j < k; j++) {
                if (part.charCodeAt(j) > 127) {
                  newpart += "x";
                } else {
                  newpart += part[j];
                }
              }
              if (!newpart.match(hostnamePartPattern)) {
                const validParts = hostparts.slice(0, i);
                const notHost = hostparts.slice(i + 1);
                const bit = part.match(hostnamePartStart);
                if (bit) {
                  validParts.push(bit[1]);
                  notHost.unshift(bit[2]);
                }
                if (notHost.length) {
                  rest = notHost.join(".") + rest;
                }
                this.hostname = validParts.join(".");
                break;
              }
            }
          }
        }
        if (this.hostname.length > hostnameMaxLen) {
          this.hostname = "";
        }
        if (ipv6Hostname) {
          this.hostname = this.hostname.substr(1, this.hostname.length - 2);
        }
      }
      const hash = rest.indexOf("#");
      if (hash !== -1) {
        this.hash = rest.substr(hash);
        rest = rest.slice(0, hash);
      }
      const qm = rest.indexOf("?");
      if (qm !== -1) {
        this.search = rest.substr(qm);
        rest = rest.slice(0, qm);
      }
      if (rest) {
        this.pathname = rest;
      }
      if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
        this.pathname = "";
      }
      return this;
    };
    Url.prototype.parseHost = function(host) {
      let port = portPattern.exec(host);
      if (port) {
        port = port[0];
        if (port !== ":") {
          this.port = port.substr(1);
        }
        host = host.substr(0, host.length - port.length);
      }
      if (host) {
        this.hostname = host;
      }
    };
    exports2.decode = decode2;
    exports2.encode = encode2;
    exports2.format = format2;
    exports2.parse = urlParse;
  }
});

// node_modules/uc.micro/build/index.cjs.js
var require_index_cjs2 = __commonJS({
  "node_modules/uc.micro/build/index.cjs.js"(exports2) {
    "use strict";
    var regex$5 = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
    var regex$4 = /[\0-\x1F\x7F-\x9F]/;
    var regex$3 = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/;
    var regex$2 = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/;
    var regex$1 = /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/;
    var regex = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;
    exports2.Any = regex$5;
    exports2.Cc = regex$4;
    exports2.Cf = regex$3;
    exports2.P = regex$2;
    exports2.S = regex$1;
    exports2.Z = regex;
  }
});

// node_modules/entities/lib/generated/decode-data-html.js
var require_decode_data_html = __commonJS({
  "node_modules/entities/lib/generated/decode-data-html.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = new Uint16Array(
      // prettier-ignore
      '\u1D41<\xD5\u0131\u028A\u049D\u057B\u05D0\u0675\u06DE\u07A2\u07D6\u080F\u0A4A\u0A91\u0DA1\u0E6D\u0F09\u0F26\u10CA\u1228\u12E1\u1415\u149D\u14C3\u14DF\u1525\0\0\0\0\0\0\u156B\u16CD\u198D\u1C12\u1DDD\u1F7E\u2060\u21B0\u228D\u23C0\u23FB\u2442\u2824\u2912\u2D08\u2E48\u2FCE\u3016\u32BA\u3639\u37AC\u38FE\u3A28\u3A71\u3AE0\u3B2E\u0800EMabcfglmnoprstu\\bfms\x7F\x84\x8B\x90\x95\x98\xA6\xB3\xB9\xC8\xCFlig\u803B\xC6\u40C6P\u803B&\u4026cute\u803B\xC1\u40C1reve;\u4102\u0100iyx}rc\u803B\xC2\u40C2;\u4410r;\uC000\u{1D504}rave\u803B\xC0\u40C0pha;\u4391acr;\u4100d;\u6A53\u0100gp\x9D\xA1on;\u4104f;\uC000\u{1D538}plyFunction;\u6061ing\u803B\xC5\u40C5\u0100cs\xBE\xC3r;\uC000\u{1D49C}ign;\u6254ilde\u803B\xC3\u40C3ml\u803B\xC4\u40C4\u0400aceforsu\xE5\xFB\xFE\u0117\u011C\u0122\u0127\u012A\u0100cr\xEA\xF2kslash;\u6216\u0176\xF6\xF8;\u6AE7ed;\u6306y;\u4411\u0180crt\u0105\u010B\u0114ause;\u6235noullis;\u612Ca;\u4392r;\uC000\u{1D505}pf;\uC000\u{1D539}eve;\u42D8c\xF2\u0113mpeq;\u624E\u0700HOacdefhilorsu\u014D\u0151\u0156\u0180\u019E\u01A2\u01B5\u01B7\u01BA\u01DC\u0215\u0273\u0278\u027Ecy;\u4427PY\u803B\xA9\u40A9\u0180cpy\u015D\u0162\u017Aute;\u4106\u0100;i\u0167\u0168\u62D2talDifferentialD;\u6145leys;\u612D\u0200aeio\u0189\u018E\u0194\u0198ron;\u410Cdil\u803B\xC7\u40C7rc;\u4108nint;\u6230ot;\u410A\u0100dn\u01A7\u01ADilla;\u40B8terDot;\u40B7\xF2\u017Fi;\u43A7rcle\u0200DMPT\u01C7\u01CB\u01D1\u01D6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01E2\u01F8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020FoubleQuote;\u601Duote;\u6019\u0200lnpu\u021E\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6A74\u0180git\u022F\u0236\u023Aruent;\u6261nt;\u622FourIntegral;\u622E\u0100fr\u024C\u024E;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6A2Fcr;\uC000\u{1D49E}p\u0100;C\u0284\u0285\u62D3ap;\u624D\u0580DJSZacefios\u02A0\u02AC\u02B0\u02B4\u02B8\u02CB\u02D7\u02E1\u02E6\u0333\u048D\u0100;o\u0179\u02A5trahd;\u6911cy;\u4402cy;\u4405cy;\u440F\u0180grs\u02BF\u02C4\u02C7ger;\u6021r;\u61A1hv;\u6AE4\u0100ay\u02D0\u02D5ron;\u410E;\u4414l\u0100;t\u02DD\u02DE\u6207a;\u4394r;\uC000\u{1D507}\u0100af\u02EB\u0327\u0100cm\u02F0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031Ccute;\u40B4o\u0174\u030B\u030D;\u42D9bleAcute;\u42DDrave;\u4060ilde;\u42DCond;\u62C4ferentialD;\u6146\u0470\u033D\0\0\0\u0342\u0354\0\u0405f;\uC000\u{1D53B}\u0180;DE\u0348\u0349\u034D\u40A8ot;\u60DCqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03CF\u03E2\u03F8ontourIntegra\xEC\u0239o\u0274\u0379\0\0\u037B\xBB\u0349nArrow;\u61D3\u0100eo\u0387\u03A4ft\u0180ART\u0390\u0396\u03A1rrow;\u61D0ightArrow;\u61D4e\xE5\u02CAng\u0100LR\u03AB\u03C4eft\u0100AR\u03B3\u03B9rrow;\u67F8ightArrow;\u67FAightArrow;\u67F9ight\u0100AT\u03D8\u03DErrow;\u61D2ee;\u62A8p\u0241\u03E9\0\0\u03EFrrow;\u61D1ownArrow;\u61D5erticalBar;\u6225n\u0300ABLRTa\u0412\u042A\u0430\u045E\u047F\u037Crrow\u0180;BU\u041D\u041E\u0422\u6193ar;\u6913pArrow;\u61F5reve;\u4311eft\u02D2\u043A\0\u0446\0\u0450ightVector;\u6950eeVector;\u695Eector\u0100;B\u0459\u045A\u61BDar;\u6956ight\u01D4\u0467\0\u0471eeVector;\u695Fector\u0100;B\u047A\u047B\u61C1ar;\u6957ee\u0100;A\u0486\u0487\u62A4rrow;\u61A7\u0100ct\u0492\u0497r;\uC000\u{1D49F}rok;\u4110\u0800NTacdfglmopqstux\u04BD\u04C0\u04C4\u04CB\u04DE\u04E2\u04E7\u04EE\u04F5\u0521\u052F\u0536\u0552\u055D\u0560\u0565G;\u414AH\u803B\xD0\u40D0cute\u803B\xC9\u40C9\u0180aiy\u04D2\u04D7\u04DCron;\u411Arc\u803B\xCA\u40CA;\u442Dot;\u4116r;\uC000\u{1D508}rave\u803B\xC8\u40C8ement;\u6208\u0100ap\u04FA\u04FEcr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65FBerySmallSquare;\u65AB\u0100gp\u0526\u052Aon;\u4118f;\uC000\u{1D53C}silon;\u4395u\u0100ai\u053C\u0549l\u0100;T\u0542\u0543\u6A75ilde;\u6242librium;\u61CC\u0100ci\u0557\u055Ar;\u6130m;\u6A73a;\u4397ml\u803B\xCB\u40CB\u0100ip\u056A\u056Fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058D\u05B2\u05CCy;\u4424r;\uC000\u{1D509}lled\u0253\u0597\0\0\u05A3mallSquare;\u65FCerySmallSquare;\u65AA\u0370\u05BA\0\u05BF\0\0\u05C4f;\uC000\u{1D53D}All;\u6200riertrf;\u6131c\xF2\u05CB\u0600JTabcdfgorst\u05E8\u05EC\u05EF\u05FA\u0600\u0612\u0616\u061B\u061D\u0623\u066C\u0672cy;\u4403\u803B>\u403Emma\u0100;d\u05F7\u05F8\u4393;\u43DCreve;\u411E\u0180eiy\u0607\u060C\u0610dil;\u4122rc;\u411C;\u4413ot;\u4120r;\uC000\u{1D50A};\u62D9pf;\uC000\u{1D53E}eater\u0300EFGLST\u0635\u0644\u064E\u0656\u065B\u0666qual\u0100;L\u063E\u063F\u6265ess;\u62DBullEqual;\u6267reater;\u6AA2ess;\u6277lantEqual;\u6A7Eilde;\u6273cr;\uC000\u{1D4A2};\u626B\u0400Aacfiosu\u0685\u068B\u0696\u069B\u069E\u06AA\u06BE\u06CARDcy;\u442A\u0100ct\u0690\u0694ek;\u42C7;\u405Eirc;\u4124r;\u610ClbertSpace;\u610B\u01F0\u06AF\0\u06B2f;\u610DizontalLine;\u6500\u0100ct\u06C3\u06C5\xF2\u06A9rok;\u4126mp\u0144\u06D0\u06D8ownHum\xF0\u012Fqual;\u624F\u0700EJOacdfgmnostu\u06FA\u06FE\u0703\u0707\u070E\u071A\u071E\u0721\u0728\u0744\u0778\u078B\u078F\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803B\xCD\u40CD\u0100iy\u0713\u0718rc\u803B\xCE\u40CE;\u4418ot;\u4130r;\u6111rave\u803B\xCC\u40CC\u0180;ap\u0720\u072F\u073F\u0100cg\u0734\u0737r;\u412AinaryI;\u6148lie\xF3\u03DD\u01F4\u0749\0\u0762\u0100;e\u074D\u074E\u622C\u0100gr\u0753\u0758ral;\u622Bsection;\u62C2isible\u0100CT\u076C\u0772omma;\u6063imes;\u6062\u0180gpt\u077F\u0783\u0788on;\u412Ef;\uC000\u{1D540}a;\u4399cr;\u6110ilde;\u4128\u01EB\u079A\0\u079Ecy;\u4406l\u803B\xCF\u40CF\u0280cfosu\u07AC\u07B7\u07BC\u07C2\u07D0\u0100iy\u07B1\u07B5rc;\u4134;\u4419r;\uC000\u{1D50D}pf;\uC000\u{1D541}\u01E3\u07C7\0\u07CCr;\uC000\u{1D4A5}rcy;\u4408kcy;\u4404\u0380HJacfos\u07E4\u07E8\u07EC\u07F1\u07FD\u0802\u0808cy;\u4425cy;\u440Cppa;\u439A\u0100ey\u07F6\u07FBdil;\u4136;\u441Ar;\uC000\u{1D50E}pf;\uC000\u{1D542}cr;\uC000\u{1D4A6}\u0580JTaceflmost\u0825\u0829\u082C\u0850\u0863\u09B3\u09B8\u09C7\u09CD\u0A37\u0A47cy;\u4409\u803B<\u403C\u0280cmnpr\u0837\u083C\u0841\u0844\u084Dute;\u4139bda;\u439Bg;\u67EAlacetrf;\u6112r;\u619E\u0180aey\u0857\u085C\u0861ron;\u413Ddil;\u413B;\u441B\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087E\u08A9\u08B1\u08E0\u08E6\u08FC\u092F\u095B\u0390\u096A\u0100nr\u0883\u088FgleBracket;\u67E8row\u0180;BR\u0899\u089A\u089E\u6190ar;\u61E4ightArrow;\u61C6eiling;\u6308o\u01F5\u08B7\0\u08C3bleBracket;\u67E6n\u01D4\u08C8\0\u08D2eeVector;\u6961ector\u0100;B\u08DB\u08DC\u61C3ar;\u6959loor;\u630Aight\u0100AV\u08EF\u08F5rrow;\u6194ector;\u694E\u0100er\u0901\u0917e\u0180;AV\u0909\u090A\u0910\u62A3rrow;\u61A4ector;\u695Aiangle\u0180;BE\u0924\u0925\u0929\u62B2ar;\u69CFqual;\u62B4p\u0180DTV\u0937\u0942\u094CownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61BFar;\u6958ector\u0100;B\u0965\u0966\u61BCar;\u6952ight\xE1\u039Cs\u0300EFGLST\u097E\u098B\u0995\u099D\u09A2\u09ADqualGreater;\u62DAullEqual;\u6266reater;\u6276ess;\u6AA1lantEqual;\u6A7Dilde;\u6272r;\uC000\u{1D50F}\u0100;e\u09BD\u09BE\u62D8ftarrow;\u61DAidot;\u413F\u0180npw\u09D4\u0A16\u0A1Bg\u0200LRlr\u09DE\u09F7\u0A02\u0A10eft\u0100AR\u09E6\u09ECrrow;\u67F5ightArrow;\u67F7ightArrow;\u67F6eft\u0100ar\u03B3\u0A0Aight\xE1\u03BFight\xE1\u03CAf;\uC000\u{1D543}er\u0100LR\u0A22\u0A2CeftArrow;\u6199ightArrow;\u6198\u0180cht\u0A3E\u0A40\u0A42\xF2\u084C;\u61B0rok;\u4141;\u626A\u0400acefiosu\u0A5A\u0A5D\u0A60\u0A77\u0A7C\u0A85\u0A8B\u0A8Ep;\u6905y;\u441C\u0100dl\u0A65\u0A6FiumSpace;\u605Flintrf;\u6133r;\uC000\u{1D510}nusPlus;\u6213pf;\uC000\u{1D544}c\xF2\u0A76;\u439C\u0480Jacefostu\u0AA3\u0AA7\u0AAD\u0AC0\u0B14\u0B19\u0D91\u0D97\u0D9Ecy;\u440Acute;\u4143\u0180aey\u0AB4\u0AB9\u0ABEron;\u4147dil;\u4145;\u441D\u0180gsw\u0AC7\u0AF0\u0B0Eative\u0180MTV\u0AD3\u0ADF\u0AE8ediumSpace;\u600Bhi\u0100cn\u0AE6\u0AD8\xEB\u0AD9eryThi\xEE\u0AD9ted\u0100GL\u0AF8\u0B06reaterGreate\xF2\u0673essLes\xF3\u0A48Line;\u400Ar;\uC000\u{1D511}\u0200Bnpt\u0B22\u0B28\u0B37\u0B3Areak;\u6060BreakingSpace;\u40A0f;\u6115\u0680;CDEGHLNPRSTV\u0B55\u0B56\u0B6A\u0B7C\u0BA1\u0BEB\u0C04\u0C5E\u0C84\u0CA6\u0CD8\u0D61\u0D85\u6AEC\u0100ou\u0B5B\u0B64ngruent;\u6262pCap;\u626DoubleVerticalBar;\u6226\u0180lqx\u0B83\u0B8A\u0B9Bement;\u6209ual\u0100;T\u0B92\u0B93\u6260ilde;\uC000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0BB6\u0BB7\u0BBD\u0BC9\u0BD3\u0BD8\u0BE5\u626Fqual;\u6271ullEqual;\uC000\u2267\u0338reater;\uC000\u226B\u0338ess;\u6279lantEqual;\uC000\u2A7E\u0338ilde;\u6275ump\u0144\u0BF2\u0BFDownHump;\uC000\u224E\u0338qual;\uC000\u224F\u0338e\u0100fs\u0C0A\u0C27tTriangle\u0180;BE\u0C1A\u0C1B\u0C21\u62EAar;\uC000\u29CF\u0338qual;\u62ECs\u0300;EGLST\u0C35\u0C36\u0C3C\u0C44\u0C4B\u0C58\u626Equal;\u6270reater;\u6278ess;\uC000\u226A\u0338lantEqual;\uC000\u2A7D\u0338ilde;\u6274ested\u0100GL\u0C68\u0C79reaterGreater;\uC000\u2AA2\u0338essLess;\uC000\u2AA1\u0338recedes\u0180;ES\u0C92\u0C93\u0C9B\u6280qual;\uC000\u2AAF\u0338lantEqual;\u62E0\u0100ei\u0CAB\u0CB9verseElement;\u620CghtTriangle\u0180;BE\u0CCB\u0CCC\u0CD2\u62EBar;\uC000\u29D0\u0338qual;\u62ED\u0100qu\u0CDD\u0D0CuareSu\u0100bp\u0CE8\u0CF9set\u0100;E\u0CF0\u0CF3\uC000\u228F\u0338qual;\u62E2erset\u0100;E\u0D03\u0D06\uC000\u2290\u0338qual;\u62E3\u0180bcp\u0D13\u0D24\u0D4Eset\u0100;E\u0D1B\u0D1E\uC000\u2282\u20D2qual;\u6288ceeds\u0200;EST\u0D32\u0D33\u0D3B\u0D46\u6281qual;\uC000\u2AB0\u0338lantEqual;\u62E1ilde;\uC000\u227F\u0338erset\u0100;E\u0D58\u0D5B\uC000\u2283\u20D2qual;\u6289ilde\u0200;EFT\u0D6E\u0D6F\u0D75\u0D7F\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uC000\u{1D4A9}ilde\u803B\xD1\u40D1;\u439D\u0700Eacdfgmoprstuv\u0DBD\u0DC2\u0DC9\u0DD5\u0DDB\u0DE0\u0DE7\u0DFC\u0E02\u0E20\u0E22\u0E32\u0E3F\u0E44lig;\u4152cute\u803B\xD3\u40D3\u0100iy\u0DCE\u0DD3rc\u803B\xD4\u40D4;\u441Eblac;\u4150r;\uC000\u{1D512}rave\u803B\xD2\u40D2\u0180aei\u0DEE\u0DF2\u0DF6cr;\u414Cga;\u43A9cron;\u439Fpf;\uC000\u{1D546}enCurly\u0100DQ\u0E0E\u0E1AoubleQuote;\u601Cuote;\u6018;\u6A54\u0100cl\u0E27\u0E2Cr;\uC000\u{1D4AA}ash\u803B\xD8\u40D8i\u016C\u0E37\u0E3Cde\u803B\xD5\u40D5es;\u6A37ml\u803B\xD6\u40D6er\u0100BP\u0E4B\u0E60\u0100ar\u0E50\u0E53r;\u603Eac\u0100ek\u0E5A\u0E5C;\u63DEet;\u63B4arenthesis;\u63DC\u0480acfhilors\u0E7F\u0E87\u0E8A\u0E8F\u0E92\u0E94\u0E9D\u0EB0\u0EFCrtialD;\u6202y;\u441Fr;\uC000\u{1D513}i;\u43A6;\u43A0usMinus;\u40B1\u0100ip\u0EA2\u0EADncareplan\xE5\u069Df;\u6119\u0200;eio\u0EB9\u0EBA\u0EE0\u0EE4\u6ABBcedes\u0200;EST\u0EC8\u0EC9\u0ECF\u0EDA\u627Aqual;\u6AAFlantEqual;\u627Cilde;\u627Eme;\u6033\u0100dp\u0EE9\u0EEEuct;\u620Fortion\u0100;a\u0225\u0EF9l;\u621D\u0100ci\u0F01\u0F06r;\uC000\u{1D4AB};\u43A8\u0200Ufos\u0F11\u0F16\u0F1B\u0F1FOT\u803B"\u4022r;\uC000\u{1D514}pf;\u611Acr;\uC000\u{1D4AC}\u0600BEacefhiorsu\u0F3E\u0F43\u0F47\u0F60\u0F73\u0FA7\u0FAA\u0FAD\u1096\u10A9\u10B4\u10BEarr;\u6910G\u803B\xAE\u40AE\u0180cnr\u0F4E\u0F53\u0F56ute;\u4154g;\u67EBr\u0100;t\u0F5C\u0F5D\u61A0l;\u6916\u0180aey\u0F67\u0F6C\u0F71ron;\u4158dil;\u4156;\u4420\u0100;v\u0F78\u0F79\u611Cerse\u0100EU\u0F82\u0F99\u0100lq\u0F87\u0F8Eement;\u620Builibrium;\u61CBpEquilibrium;\u696Fr\xBB\u0F79o;\u43A1ght\u0400ACDFTUVa\u0FC1\u0FEB\u0FF3\u1022\u1028\u105B\u1087\u03D8\u0100nr\u0FC6\u0FD2gleBracket;\u67E9row\u0180;BL\u0FDC\u0FDD\u0FE1\u6192ar;\u61E5eftArrow;\u61C4eiling;\u6309o\u01F5\u0FF9\0\u1005bleBracket;\u67E7n\u01D4\u100A\0\u1014eeVector;\u695Dector\u0100;B\u101D\u101E\u61C2ar;\u6955loor;\u630B\u0100er\u102D\u1043e\u0180;AV\u1035\u1036\u103C\u62A2rrow;\u61A6ector;\u695Biangle\u0180;BE\u1050\u1051\u1055\u62B3ar;\u69D0qual;\u62B5p\u0180DTV\u1063\u106E\u1078ownVector;\u694FeeVector;\u695Cector\u0100;B\u1082\u1083\u61BEar;\u6954ector\u0100;B\u1091\u1092\u61C0ar;\u6953\u0100pu\u109B\u109Ef;\u611DndImplies;\u6970ightarrow;\u61DB\u0100ch\u10B9\u10BCr;\u611B;\u61B1leDelayed;\u69F4\u0680HOacfhimoqstu\u10E4\u10F1\u10F7\u10FD\u1119\u111E\u1151\u1156\u1161\u1167\u11B5\u11BB\u11BF\u0100Cc\u10E9\u10EEHcy;\u4429y;\u4428FTcy;\u442Ccute;\u415A\u0280;aeiy\u1108\u1109\u110E\u1113\u1117\u6ABCron;\u4160dil;\u415Erc;\u415C;\u4421r;\uC000\u{1D516}ort\u0200DLRU\u112A\u1134\u113E\u1149ownArrow\xBB\u041EeftArrow\xBB\u089AightArrow\xBB\u0FDDpArrow;\u6191gma;\u43A3allCircle;\u6218pf;\uC000\u{1D54A}\u0272\u116D\0\0\u1170t;\u621Aare\u0200;ISU\u117B\u117C\u1189\u11AF\u65A1ntersection;\u6293u\u0100bp\u118F\u119Eset\u0100;E\u1197\u1198\u628Fqual;\u6291erset\u0100;E\u11A8\u11A9\u6290qual;\u6292nion;\u6294cr;\uC000\u{1D4AE}ar;\u62C6\u0200bcmp\u11C8\u11DB\u1209\u120B\u0100;s\u11CD\u11CE\u62D0et\u0100;E\u11CD\u11D5qual;\u6286\u0100ch\u11E0\u1205eeds\u0200;EST\u11ED\u11EE\u11F4\u11FF\u627Bqual;\u6AB0lantEqual;\u627Dilde;\u627FTh\xE1\u0F8C;\u6211\u0180;es\u1212\u1213\u1223\u62D1rset\u0100;E\u121C\u121D\u6283qual;\u6287et\xBB\u1213\u0580HRSacfhiors\u123E\u1244\u1249\u1255\u125E\u1271\u1276\u129F\u12C2\u12C8\u12D1ORN\u803B\xDE\u40DEADE;\u6122\u0100Hc\u124E\u1252cy;\u440By;\u4426\u0100bu\u125A\u125C;\u4009;\u43A4\u0180aey\u1265\u126A\u126Fron;\u4164dil;\u4162;\u4422r;\uC000\u{1D517}\u0100ei\u127B\u1289\u01F2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128E\u1298kSpace;\uC000\u205F\u200ASpace;\u6009lde\u0200;EFT\u12AB\u12AC\u12B2\u12BC\u623Cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uC000\u{1D54B}ipleDot;\u60DB\u0100ct\u12D6\u12DBr;\uC000\u{1D4AF}rok;\u4166\u0AE1\u12F7\u130E\u131A\u1326\0\u132C\u1331\0\0\0\0\0\u1338\u133D\u1377\u1385\0\u13FF\u1404\u140A\u1410\u0100cr\u12FB\u1301ute\u803B\xDA\u40DAr\u0100;o\u1307\u1308\u619Fcir;\u6949r\u01E3\u1313\0\u1316y;\u440Eve;\u416C\u0100iy\u131E\u1323rc\u803B\xDB\u40DB;\u4423blac;\u4170r;\uC000\u{1D518}rave\u803B\xD9\u40D9acr;\u416A\u0100di\u1341\u1369er\u0100BP\u1348\u135D\u0100ar\u134D\u1350r;\u405Fac\u0100ek\u1357\u1359;\u63DFet;\u63B5arenthesis;\u63DDon\u0100;P\u1370\u1371\u62C3lus;\u628E\u0100gp\u137B\u137Fon;\u4172f;\uC000\u{1D54C}\u0400ADETadps\u1395\u13AE\u13B8\u13C4\u03E8\u13D2\u13D7\u13F3rrow\u0180;BD\u1150\u13A0\u13A4ar;\u6912ownArrow;\u61C5ownArrow;\u6195quilibrium;\u696Eee\u0100;A\u13CB\u13CC\u62A5rrow;\u61A5own\xE1\u03F3er\u0100LR\u13DE\u13E8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13F9\u13FA\u43D2on;\u43A5ing;\u416Ecr;\uC000\u{1D4B0}ilde;\u4168ml\u803B\xDC\u40DC\u0480Dbcdefosv\u1427\u142C\u1430\u1433\u143E\u1485\u148A\u1490\u1496ash;\u62ABar;\u6AEBy;\u4412ash\u0100;l\u143B\u143C\u62A9;\u6AE6\u0100er\u1443\u1445;\u62C1\u0180bty\u144C\u1450\u147Aar;\u6016\u0100;i\u144F\u1455cal\u0200BLST\u1461\u1465\u146A\u1474ar;\u6223ine;\u407Ceparator;\u6758ilde;\u6240ThinSpace;\u600Ar;\uC000\u{1D519}pf;\uC000\u{1D54D}cr;\uC000\u{1D4B1}dash;\u62AA\u0280cefos\u14A7\u14AC\u14B1\u14B6\u14BCirc;\u4174dge;\u62C0r;\uC000\u{1D51A}pf;\uC000\u{1D54E}cr;\uC000\u{1D4B2}\u0200fios\u14CB\u14D0\u14D2\u14D8r;\uC000\u{1D51B};\u439Epf;\uC000\u{1D54F}cr;\uC000\u{1D4B3}\u0480AIUacfosu\u14F1\u14F5\u14F9\u14FD\u1504\u150F\u1514\u151A\u1520cy;\u442Fcy;\u4407cy;\u442Ecute\u803B\xDD\u40DD\u0100iy\u1509\u150Drc;\u4176;\u442Br;\uC000\u{1D51C}pf;\uC000\u{1D550}cr;\uC000\u{1D4B4}ml;\u4178\u0400Hacdefos\u1535\u1539\u153F\u154B\u154F\u155D\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417D;\u4417ot;\u417B\u01F2\u1554\0\u155BoWidt\xE8\u0AD9a;\u4396r;\u6128pf;\u6124cr;\uC000\u{1D4B5}\u0BE1\u1583\u158A\u1590\0\u15B0\u15B6\u15BF\0\0\0\0\u15C6\u15DB\u15EB\u165F\u166D\0\u1695\u169B\u16B2\u16B9\0\u16BEcute\u803B\xE1\u40E1reve;\u4103\u0300;Ediuy\u159C\u159D\u15A1\u15A3\u15A8\u15AD\u623E;\uC000\u223E\u0333;\u623Frc\u803B\xE2\u40E2te\u80BB\xB4\u0306;\u4430lig\u803B\xE6\u40E6\u0100;r\xB2\u15BA;\uC000\u{1D51E}rave\u803B\xE0\u40E0\u0100ep\u15CA\u15D6\u0100fp\u15CF\u15D4sym;\u6135\xE8\u15D3ha;\u43B1\u0100ap\u15DFc\u0100cl\u15E4\u15E7r;\u4101g;\u6A3F\u0264\u15F0\0\0\u160A\u0280;adsv\u15FA\u15FB\u15FF\u1601\u1607\u6227nd;\u6A55;\u6A5Clope;\u6A58;\u6A5A\u0380;elmrsz\u1618\u1619\u161B\u161E\u163F\u164F\u1659\u6220;\u69A4e\xBB\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163A\u163C\u163E;\u69A8;\u69A9;\u69AA;\u69AB;\u69AC;\u69AD;\u69AE;\u69AFt\u0100;v\u1645\u1646\u621Fb\u0100;d\u164C\u164D\u62BE;\u699D\u0100pt\u1654\u1657h;\u6222\xBB\xB9arr;\u637C\u0100gp\u1663\u1667on;\u4105f;\uC000\u{1D552}\u0380;Eaeiop\u12C1\u167B\u167D\u1682\u1684\u1687\u168A;\u6A70cir;\u6A6F;\u624Ad;\u624Bs;\u4027rox\u0100;e\u12C1\u1692\xF1\u1683ing\u803B\xE5\u40E5\u0180cty\u16A1\u16A6\u16A8r;\uC000\u{1D4B6};\u402Amp\u0100;e\u12C1\u16AF\xF1\u0288ilde\u803B\xE3\u40E3ml\u803B\xE4\u40E4\u0100ci\u16C2\u16C8onin\xF4\u0272nt;\u6A11\u0800Nabcdefiklnoprsu\u16ED\u16F1\u1730\u173C\u1743\u1748\u1778\u177D\u17E0\u17E6\u1839\u1850\u170D\u193D\u1948\u1970ot;\u6AED\u0100cr\u16F6\u171Ek\u0200ceps\u1700\u1705\u170D\u1713ong;\u624Cpsilon;\u43F6rime;\u6035im\u0100;e\u171A\u171B\u623Dq;\u62CD\u0176\u1722\u1726ee;\u62BDed\u0100;g\u172C\u172D\u6305e\xBB\u172Drk\u0100;t\u135C\u1737brk;\u63B6\u0100oy\u1701\u1741;\u4431quo;\u601E\u0280cmprt\u1753\u175B\u1761\u1764\u1768aus\u0100;e\u010A\u0109ptyv;\u69B0s\xE9\u170Cno\xF5\u0113\u0180ahw\u176F\u1771\u1773;\u43B2;\u6136een;\u626Cr;\uC000\u{1D51F}g\u0380costuvw\u178D\u179D\u17B3\u17C1\u17D5\u17DB\u17DE\u0180aiu\u1794\u1796\u179A\xF0\u0760rc;\u65EFp\xBB\u1371\u0180dpt\u17A4\u17A8\u17ADot;\u6A00lus;\u6A01imes;\u6A02\u0271\u17B9\0\0\u17BEcup;\u6A06ar;\u6605riangle\u0100du\u17CD\u17D2own;\u65BDp;\u65B3plus;\u6A04e\xE5\u1444\xE5\u14ADarow;\u690D\u0180ako\u17ED\u1826\u1835\u0100cn\u17F2\u1823k\u0180lst\u17FA\u05AB\u1802ozenge;\u69EBriangle\u0200;dlr\u1812\u1813\u1818\u181D\u65B4own;\u65BEeft;\u65C2ight;\u65B8k;\u6423\u01B1\u182B\0\u1833\u01B2\u182F\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183E\u184D\u0100;q\u1843\u1846\uC000=\u20E5uiv;\uC000\u2261\u20E5t;\u6310\u0200ptwx\u1859\u185E\u1867\u186Cf;\uC000\u{1D553}\u0100;t\u13CB\u1863om\xBB\u13CCtie;\u62C8\u0600DHUVbdhmptuv\u1885\u1896\u18AA\u18BB\u18D7\u18DB\u18EC\u18FF\u1905\u190A\u1910\u1921\u0200LRlr\u188E\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18A1\u18A2\u18A4\u18A6\u18A8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18B3\u18B5\u18B7\u18B9;\u655D;\u655A;\u655C;\u6559\u0380;HLRhlr\u18CA\u18CB\u18CD\u18CF\u18D1\u18D3\u18D5\u6551;\u656C;\u6563;\u6560;\u656B;\u6562;\u655Fox;\u69C9\u0200LRlr\u18E4\u18E6\u18E8\u18EA;\u6555;\u6552;\u6510;\u650C\u0280;DUdu\u06BD\u18F7\u18F9\u18FB\u18FD;\u6565;\u6568;\u652C;\u6534inus;\u629Flus;\u629Eimes;\u62A0\u0200LRlr\u1919\u191B\u191D\u191F;\u655B;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193B\u6502;\u656A;\u6561;\u655E;\u653C;\u6524;\u651C\u0100ev\u0123\u1942bar\u803B\xA6\u40A6\u0200ceio\u1951\u1956\u195A\u1960r;\uC000\u{1D4B7}mi;\u604Fm\u0100;e\u171A\u171Cl\u0180;bh\u1968\u1969\u196B\u405C;\u69C5sub;\u67C8\u016C\u1974\u197El\u0100;e\u1979\u197A\u6022t\xBB\u197Ap\u0180;Ee\u012F\u1985\u1987;\u6AAE\u0100;q\u06DC\u06DB\u0CE1\u19A7\0\u19E8\u1A11\u1A15\u1A32\0\u1A37\u1A50\0\0\u1AB4\0\0\u1AC1\0\0\u1B21\u1B2E\u1B4D\u1B52\0\u1BFD\0\u1C0C\u0180cpr\u19AD\u19B2\u19DDute;\u4107\u0300;abcds\u19BF\u19C0\u19C4\u19CA\u19D5\u19D9\u6229nd;\u6A44rcup;\u6A49\u0100au\u19CF\u19D2p;\u6A4Bp;\u6A47ot;\u6A40;\uC000\u2229\uFE00\u0100eo\u19E2\u19E5t;\u6041\xEE\u0693\u0200aeiu\u19F0\u19FB\u1A01\u1A05\u01F0\u19F5\0\u19F8s;\u6A4Don;\u410Ddil\u803B\xE7\u40E7rc;\u4109ps\u0100;s\u1A0C\u1A0D\u6A4Cm;\u6A50ot;\u410B\u0180dmn\u1A1B\u1A20\u1A26il\u80BB\xB8\u01ADptyv;\u69B2t\u8100\xA2;e\u1A2D\u1A2E\u40A2r\xE4\u01B2r;\uC000\u{1D520}\u0180cei\u1A3D\u1A40\u1A4Dy;\u4447ck\u0100;m\u1A47\u1A48\u6713ark\xBB\u1A48;\u43C7r\u0380;Ecefms\u1A5F\u1A60\u1A62\u1A6B\u1AA4\u1AAA\u1AAE\u65CB;\u69C3\u0180;el\u1A69\u1A6A\u1A6D\u42C6q;\u6257e\u0261\u1A74\0\0\u1A88rrow\u0100lr\u1A7C\u1A81eft;\u61BAight;\u61BB\u0280RSacd\u1A92\u1A94\u1A96\u1A9A\u1A9F\xBB\u0F47;\u64C8st;\u629Birc;\u629Aash;\u629Dnint;\u6A10id;\u6AEFcir;\u69C2ubs\u0100;u\u1ABB\u1ABC\u6663it\xBB\u1ABC\u02EC\u1AC7\u1AD4\u1AFA\0\u1B0Aon\u0100;e\u1ACD\u1ACE\u403A\u0100;q\xC7\xC6\u026D\u1AD9\0\0\u1AE2a\u0100;t\u1ADE\u1ADF\u402C;\u4040\u0180;fl\u1AE8\u1AE9\u1AEB\u6201\xEE\u1160e\u0100mx\u1AF1\u1AF6ent\xBB\u1AE9e\xF3\u024D\u01E7\u1AFE\0\u1B07\u0100;d\u12BB\u1B02ot;\u6A6Dn\xF4\u0246\u0180fry\u1B10\u1B14\u1B17;\uC000\u{1D554}o\xE4\u0254\u8100\xA9;s\u0155\u1B1Dr;\u6117\u0100ao\u1B25\u1B29rr;\u61B5ss;\u6717\u0100cu\u1B32\u1B37r;\uC000\u{1D4B8}\u0100bp\u1B3C\u1B44\u0100;e\u1B41\u1B42\u6ACF;\u6AD1\u0100;e\u1B49\u1B4A\u6AD0;\u6AD2dot;\u62EF\u0380delprvw\u1B60\u1B6C\u1B77\u1B82\u1BAC\u1BD4\u1BF9arr\u0100lr\u1B68\u1B6A;\u6938;\u6935\u0270\u1B72\0\0\u1B75r;\u62DEc;\u62DFarr\u0100;p\u1B7F\u1B80\u61B6;\u693D\u0300;bcdos\u1B8F\u1B90\u1B96\u1BA1\u1BA5\u1BA8\u622Arcap;\u6A48\u0100au\u1B9B\u1B9Ep;\u6A46p;\u6A4Aot;\u628Dr;\u6A45;\uC000\u222A\uFE00\u0200alrv\u1BB5\u1BBF\u1BDE\u1BE3rr\u0100;m\u1BBC\u1BBD\u61B7;\u693Cy\u0180evw\u1BC7\u1BD4\u1BD8q\u0270\u1BCE\0\0\u1BD2re\xE3\u1B73u\xE3\u1B75ee;\u62CEedge;\u62CFen\u803B\xA4\u40A4earrow\u0100lr\u1BEE\u1BF3eft\xBB\u1B80ight\xBB\u1BBDe\xE4\u1BDD\u0100ci\u1C01\u1C07onin\xF4\u01F7nt;\u6231lcty;\u632D\u0980AHabcdefhijlorstuwz\u1C38\u1C3B\u1C3F\u1C5D\u1C69\u1C75\u1C8A\u1C9E\u1CAC\u1CB7\u1CFB\u1CFF\u1D0D\u1D7B\u1D91\u1DAB\u1DBB\u1DC6\u1DCDr\xF2\u0381ar;\u6965\u0200glrs\u1C48\u1C4D\u1C52\u1C54ger;\u6020eth;\u6138\xF2\u1133h\u0100;v\u1C5A\u1C5B\u6010\xBB\u090A\u016B\u1C61\u1C67arow;\u690Fa\xE3\u0315\u0100ay\u1C6E\u1C73ron;\u410F;\u4434\u0180;ao\u0332\u1C7C\u1C84\u0100gr\u02BF\u1C81r;\u61CAtseq;\u6A77\u0180glm\u1C91\u1C94\u1C98\u803B\xB0\u40B0ta;\u43B4ptyv;\u69B1\u0100ir\u1CA3\u1CA8sht;\u697F;\uC000\u{1D521}ar\u0100lr\u1CB3\u1CB5\xBB\u08DC\xBB\u101E\u0280aegsv\u1CC2\u0378\u1CD6\u1CDC\u1CE0m\u0180;os\u0326\u1CCA\u1CD4nd\u0100;s\u0326\u1CD1uit;\u6666amma;\u43DDin;\u62F2\u0180;io\u1CE7\u1CE8\u1CF8\u40F7de\u8100\xF7;o\u1CE7\u1CF0ntimes;\u62C7n\xF8\u1CF7cy;\u4452c\u026F\u1D06\0\0\u1D0Arn;\u631Eop;\u630D\u0280lptuw\u1D18\u1D1D\u1D22\u1D49\u1D55lar;\u4024f;\uC000\u{1D555}\u0280;emps\u030B\u1D2D\u1D37\u1D3D\u1D42q\u0100;d\u0352\u1D33ot;\u6251inus;\u6238lus;\u6214quare;\u62A1blebarwedg\xE5\xFAn\u0180adh\u112E\u1D5D\u1D67ownarrow\xF3\u1C83arpoon\u0100lr\u1D72\u1D76ef\xF4\u1CB4igh\xF4\u1CB6\u0162\u1D7F\u1D85karo\xF7\u0F42\u026F\u1D8A\0\0\u1D8Ern;\u631Fop;\u630C\u0180cot\u1D98\u1DA3\u1DA6\u0100ry\u1D9D\u1DA1;\uC000\u{1D4B9};\u4455l;\u69F6rok;\u4111\u0100dr\u1DB0\u1DB4ot;\u62F1i\u0100;f\u1DBA\u1816\u65BF\u0100ah\u1DC0\u1DC3r\xF2\u0429a\xF2\u0FA6angle;\u69A6\u0100ci\u1DD2\u1DD5y;\u445Fgrarr;\u67FF\u0900Dacdefglmnopqrstux\u1E01\u1E09\u1E19\u1E38\u0578\u1E3C\u1E49\u1E61\u1E7E\u1EA5\u1EAF\u1EBD\u1EE1\u1F2A\u1F37\u1F44\u1F4E\u1F5A\u0100Do\u1E06\u1D34o\xF4\u1C89\u0100cs\u1E0E\u1E14ute\u803B\xE9\u40E9ter;\u6A6E\u0200aioy\u1E22\u1E27\u1E31\u1E36ron;\u411Br\u0100;c\u1E2D\u1E2E\u6256\u803B\xEA\u40EAlon;\u6255;\u444Dot;\u4117\u0100Dr\u1E41\u1E45ot;\u6252;\uC000\u{1D522}\u0180;rs\u1E50\u1E51\u1E57\u6A9Aave\u803B\xE8\u40E8\u0100;d\u1E5C\u1E5D\u6A96ot;\u6A98\u0200;ils\u1E6A\u1E6B\u1E72\u1E74\u6A99nters;\u63E7;\u6113\u0100;d\u1E79\u1E7A\u6A95ot;\u6A97\u0180aps\u1E85\u1E89\u1E97cr;\u4113ty\u0180;sv\u1E92\u1E93\u1E95\u6205et\xBB\u1E93p\u01001;\u1E9D\u1EA4\u0133\u1EA1\u1EA3;\u6004;\u6005\u6003\u0100gs\u1EAA\u1EAC;\u414Bp;\u6002\u0100gp\u1EB4\u1EB8on;\u4119f;\uC000\u{1D556}\u0180als\u1EC4\u1ECE\u1ED2r\u0100;s\u1ECA\u1ECB\u62D5l;\u69E3us;\u6A71i\u0180;lv\u1EDA\u1EDB\u1EDF\u43B5on\xBB\u1EDB;\u43F5\u0200csuv\u1EEA\u1EF3\u1F0B\u1F23\u0100io\u1EEF\u1E31rc\xBB\u1E2E\u0269\u1EF9\0\0\u1EFB\xED\u0548ant\u0100gl\u1F02\u1F06tr\xBB\u1E5Dess\xBB\u1E7A\u0180aei\u1F12\u1F16\u1F1Als;\u403Dst;\u625Fv\u0100;D\u0235\u1F20D;\u6A78parsl;\u69E5\u0100Da\u1F2F\u1F33ot;\u6253rr;\u6971\u0180cdi\u1F3E\u1F41\u1EF8r;\u612Fo\xF4\u0352\u0100ah\u1F49\u1F4B;\u43B7\u803B\xF0\u40F0\u0100mr\u1F53\u1F57l\u803B\xEB\u40EBo;\u60AC\u0180cip\u1F61\u1F64\u1F67l;\u4021s\xF4\u056E\u0100eo\u1F6C\u1F74ctatio\xEE\u0559nential\xE5\u0579\u09E1\u1F92\0\u1F9E\0\u1FA1\u1FA7\0\0\u1FC6\u1FCC\0\u1FD3\0\u1FE6\u1FEA\u2000\0\u2008\u205Allingdotse\xF1\u1E44y;\u4444male;\u6640\u0180ilr\u1FAD\u1FB3\u1FC1lig;\u8000\uFB03\u0269\u1FB9\0\0\u1FBDg;\u8000\uFB00ig;\u8000\uFB04;\uC000\u{1D523}lig;\u8000\uFB01lig;\uC000fj\u0180alt\u1FD9\u1FDC\u1FE1t;\u666Dig;\u8000\uFB02ns;\u65B1of;\u4192\u01F0\u1FEE\0\u1FF3f;\uC000\u{1D557}\u0100ak\u05BF\u1FF7\u0100;v\u1FFC\u1FFD\u62D4;\u6AD9artint;\u6A0D\u0100ao\u200C\u2055\u0100cs\u2011\u2052\u03B1\u201A\u2030\u2038\u2045\u2048\0\u2050\u03B2\u2022\u2025\u2027\u202A\u202C\0\u202E\u803B\xBD\u40BD;\u6153\u803B\xBC\u40BC;\u6155;\u6159;\u615B\u01B3\u2034\0\u2036;\u6154;\u6156\u02B4\u203E\u2041\0\0\u2043\u803B\xBE\u40BE;\u6157;\u615C5;\u6158\u01B6\u204C\0\u204E;\u615A;\u615D8;\u615El;\u6044wn;\u6322cr;\uC000\u{1D4BB}\u0880Eabcdefgijlnorstv\u2082\u2089\u209F\u20A5\u20B0\u20B4\u20F0\u20F5\u20FA\u20FF\u2103\u2112\u2138\u0317\u213E\u2152\u219E\u0100;l\u064D\u2087;\u6A8C\u0180cmp\u2090\u2095\u209Dute;\u41F5ma\u0100;d\u209C\u1CDA\u43B3;\u6A86reve;\u411F\u0100iy\u20AA\u20AErc;\u411D;\u4433ot;\u4121\u0200;lqs\u063E\u0642\u20BD\u20C9\u0180;qs\u063E\u064C\u20C4lan\xF4\u0665\u0200;cdl\u0665\u20D2\u20D5\u20E5c;\u6AA9ot\u0100;o\u20DC\u20DD\u6A80\u0100;l\u20E2\u20E3\u6A82;\u6A84\u0100;e\u20EA\u20ED\uC000\u22DB\uFE00s;\u6A94r;\uC000\u{1D524}\u0100;g\u0673\u061Bmel;\u6137cy;\u4453\u0200;Eaj\u065A\u210C\u210E\u2110;\u6A92;\u6AA5;\u6AA4\u0200Eaes\u211B\u211D\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6A8Arox\xBB\u2124\u0100;q\u212E\u212F\u6A88\u0100;q\u212E\u211Bim;\u62E7pf;\uC000\u{1D558}\u0100ci\u2143\u2146r;\u610Am\u0180;el\u066B\u214E\u2150;\u6A8E;\u6A90\u8300>;cdlqr\u05EE\u2160\u216A\u216E\u2173\u2179\u0100ci\u2165\u2167;\u6AA7r;\u6A7Aot;\u62D7Par;\u6995uest;\u6A7C\u0280adels\u2184\u216A\u2190\u0656\u219B\u01F0\u2189\0\u218Epro\xF8\u209Er;\u6978q\u0100lq\u063F\u2196les\xF3\u2088i\xED\u066B\u0100en\u21A3\u21ADrtneqq;\uC000\u2269\uFE00\xC5\u21AA\u0500Aabcefkosy\u21C4\u21C7\u21F1\u21F5\u21FA\u2218\u221D\u222F\u2268\u227Dr\xF2\u03A0\u0200ilmr\u21D0\u21D4\u21D7\u21DBrs\xF0\u1484f\xBB\u2024il\xF4\u06A9\u0100dr\u21E0\u21E4cy;\u444A\u0180;cw\u08F4\u21EB\u21EFir;\u6948;\u61ADar;\u610Firc;\u4125\u0180alr\u2201\u220E\u2213rts\u0100;u\u2209\u220A\u6665it\xBB\u220Alip;\u6026con;\u62B9r;\uC000\u{1D525}s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223A\u223E\u2243\u225E\u2263rr;\u61FFtht;\u623Bk\u0100lr\u2249\u2253eftarrow;\u61A9ightarrow;\u61AAf;\uC000\u{1D559}bar;\u6015\u0180clt\u226F\u2274\u2278r;\uC000\u{1D4BD}as\xE8\u21F4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xBB\u1C5B\u0AE1\u22A3\0\u22AA\0\u22B8\u22C5\u22CE\0\u22D5\u22F3\0\0\u22F8\u2322\u2367\u2362\u237F\0\u2386\u23AA\u23B4cute\u803B\xED\u40ED\u0180;iy\u0771\u22B0\u22B5rc\u803B\xEE\u40EE;\u4438\u0100cx\u22BC\u22BFy;\u4435cl\u803B\xA1\u40A1\u0100fr\u039F\u22C9;\uC000\u{1D526}rave\u803B\xEC\u40EC\u0200;ino\u073E\u22DD\u22E9\u22EE\u0100in\u22E2\u22E6nt;\u6A0Ct;\u622Dfin;\u69DCta;\u6129lig;\u4133\u0180aop\u22FE\u231A\u231D\u0180cgt\u2305\u2308\u2317r;\u412B\u0180elp\u071F\u230F\u2313in\xE5\u078Ear\xF4\u0720h;\u4131f;\u62B7ed;\u41B5\u0280;cfot\u04F4\u232C\u2331\u233D\u2341are;\u6105in\u0100;t\u2338\u2339\u621Eie;\u69DDdo\xF4\u2319\u0280;celp\u0757\u234C\u2350\u235B\u2361al;\u62BA\u0100gr\u2355\u2359er\xF3\u1563\xE3\u234Darhk;\u6A17rod;\u6A3C\u0200cgpt\u236F\u2372\u2376\u237By;\u4451on;\u412Ff;\uC000\u{1D55A}a;\u43B9uest\u803B\xBF\u40BF\u0100ci\u238A\u238Fr;\uC000\u{1D4BE}n\u0280;Edsv\u04F4\u239B\u239D\u23A1\u04F3;\u62F9ot;\u62F5\u0100;v\u23A6\u23A7\u62F4;\u62F3\u0100;i\u0777\u23AElde;\u4129\u01EB\u23B8\0\u23BCcy;\u4456l\u803B\xEF\u40EF\u0300cfmosu\u23CC\u23D7\u23DC\u23E1\u23E7\u23F5\u0100iy\u23D1\u23D5rc;\u4135;\u4439r;\uC000\u{1D527}ath;\u4237pf;\uC000\u{1D55B}\u01E3\u23EC\0\u23F1r;\uC000\u{1D4BF}rcy;\u4458kcy;\u4454\u0400acfghjos\u240B\u2416\u2422\u2427\u242D\u2431\u2435\u243Bppa\u0100;v\u2413\u2414\u43BA;\u43F0\u0100ey\u241B\u2420dil;\u4137;\u443Ar;\uC000\u{1D528}reen;\u4138cy;\u4445cy;\u445Cpf;\uC000\u{1D55C}cr;\uC000\u{1D4C0}\u0B80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248D\u2491\u250E\u253D\u255A\u2580\u264E\u265E\u2665\u2679\u267D\u269A\u26B2\u26D8\u275D\u2768\u278B\u27C0\u2801\u2812\u0180art\u2477\u247A\u247Cr\xF2\u09C6\xF2\u0395ail;\u691Barr;\u690E\u0100;g\u0994\u248B;\u6A8Bar;\u6962\u0963\u24A5\0\u24AA\0\u24B1\0\0\0\0\0\u24B5\u24BA\0\u24C6\u24C8\u24CD\0\u24F9ute;\u413Amptyv;\u69B4ra\xEE\u084Cbda;\u43BBg\u0180;dl\u088E\u24C1\u24C3;\u6991\xE5\u088E;\u6A85uo\u803B\xAB\u40ABr\u0400;bfhlpst\u0899\u24DE\u24E6\u24E9\u24EB\u24EE\u24F1\u24F5\u0100;f\u089D\u24E3s;\u691Fs;\u691D\xEB\u2252p;\u61ABl;\u6939im;\u6973l;\u61A2\u0180;ae\u24FF\u2500\u2504\u6AABil;\u6919\u0100;s\u2509\u250A\u6AAD;\uC000\u2AAD\uFE00\u0180abr\u2515\u2519\u251Drr;\u690Crk;\u6772\u0100ak\u2522\u252Cc\u0100ek\u2528\u252A;\u407B;\u405B\u0100es\u2531\u2533;\u698Bl\u0100du\u2539\u253B;\u698F;\u698D\u0200aeuy\u2546\u254B\u2556\u2558ron;\u413E\u0100di\u2550\u2554il;\u413C\xEC\u08B0\xE2\u2529;\u443B\u0200cqrs\u2563\u2566\u256D\u257Da;\u6936uo\u0100;r\u0E19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694Bh;\u61B2\u0280;fgqs\u258B\u258C\u0989\u25F3\u25FF\u6264t\u0280ahlrt\u2598\u25A4\u25B7\u25C2\u25E8rrow\u0100;t\u0899\u25A1a\xE9\u24F6arpoon\u0100du\u25AF\u25B4own\xBB\u045Ap\xBB\u0966eftarrows;\u61C7ight\u0180ahs\u25CD\u25D6\u25DErrow\u0100;s\u08F4\u08A7arpoon\xF3\u0F98quigarro\xF7\u21F0hreetimes;\u62CB\u0180;qs\u258B\u0993\u25FAlan\xF4\u09AC\u0280;cdgs\u09AC\u260A\u260D\u261D\u2628c;\u6AA8ot\u0100;o\u2614\u2615\u6A7F\u0100;r\u261A\u261B\u6A81;\u6A83\u0100;e\u2622\u2625\uC000\u22DA\uFE00s;\u6A93\u0280adegs\u2633\u2639\u263D\u2649\u264Bppro\xF8\u24C6ot;\u62D6q\u0100gq\u2643\u2645\xF4\u0989gt\xF2\u248C\xF4\u099Bi\xED\u09B2\u0180ilr\u2655\u08E1\u265Asht;\u697C;\uC000\u{1D529}\u0100;E\u099C\u2663;\u6A91\u0161\u2669\u2676r\u0100du\u25B2\u266E\u0100;l\u0965\u2673;\u696Alk;\u6584cy;\u4459\u0280;acht\u0A48\u2688\u268B\u2691\u2696r\xF2\u25C1orne\xF2\u1D08ard;\u696Bri;\u65FA\u0100io\u269F\u26A4dot;\u4140ust\u0100;a\u26AC\u26AD\u63B0che\xBB\u26AD\u0200Eaes\u26BB\u26BD\u26C9\u26D4;\u6268p\u0100;p\u26C3\u26C4\u6A89rox\xBB\u26C4\u0100;q\u26CE\u26CF\u6A87\u0100;q\u26CE\u26BBim;\u62E6\u0400abnoptwz\u26E9\u26F4\u26F7\u271A\u272F\u2741\u2747\u2750\u0100nr\u26EE\u26F1g;\u67ECr;\u61FDr\xEB\u08C1g\u0180lmr\u26FF\u270D\u2714eft\u0100ar\u09E6\u2707ight\xE1\u09F2apsto;\u67FCight\xE1\u09FDparrow\u0100lr\u2725\u2729ef\xF4\u24EDight;\u61AC\u0180afl\u2736\u2739\u273Dr;\u6985;\uC000\u{1D55D}us;\u6A2Dimes;\u6A34\u0161\u274B\u274Fst;\u6217\xE1\u134E\u0180;ef\u2757\u2758\u1800\u65CAnge\xBB\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277C\u2785\u2787r\xF2\u08A8orne\xF2\u1D8Car\u0100;d\u0F98\u2783;\u696D;\u600Eri;\u62BF\u0300achiqt\u2798\u279D\u0A40\u27A2\u27AE\u27BBquo;\u6039r;\uC000\u{1D4C1}m\u0180;eg\u09B2\u27AA\u27AC;\u6A8D;\u6A8F\u0100bu\u252A\u27B3o\u0100;r\u0E1F\u27B9;\u601Arok;\u4142\u8400<;cdhilqr\u082B\u27D2\u2639\u27DC\u27E0\u27E5\u27EA\u27F0\u0100ci\u27D7\u27D9;\u6AA6r;\u6A79re\xE5\u25F2mes;\u62C9arr;\u6976uest;\u6A7B\u0100Pi\u27F5\u27F9ar;\u6996\u0180;ef\u2800\u092D\u181B\u65C3r\u0100du\u2807\u280Dshar;\u694Ahar;\u6966\u0100en\u2817\u2821rtneqq;\uC000\u2268\uFE00\xC5\u281E\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288E\u2893\u28A0\u28A5\u28A8\u28DA\u28E2\u28E4\u0A83\u28F3\u2902Dot;\u623A\u0200clpr\u284E\u2852\u2863\u287Dr\u803B\xAF\u40AF\u0100et\u2857\u2859;\u6642\u0100;e\u285E\u285F\u6720se\xBB\u285F\u0100;s\u103B\u2868to\u0200;dlu\u103B\u2873\u2877\u287Bow\xEE\u048Cef\xF4\u090F\xF0\u13D1ker;\u65AE\u0100oy\u2887\u288Cmma;\u6A29;\u443Cash;\u6014asuredangle\xBB\u1626r;\uC000\u{1D52A}o;\u6127\u0180cdn\u28AF\u28B4\u28C9ro\u803B\xB5\u40B5\u0200;acd\u1464\u28BD\u28C0\u28C4s\xF4\u16A7ir;\u6AF0ot\u80BB\xB7\u01B5us\u0180;bd\u28D2\u1903\u28D3\u6212\u0100;u\u1D3C\u28D8;\u6A2A\u0163\u28DE\u28E1p;\u6ADB\xF2\u2212\xF0\u0A81\u0100dp\u28E9\u28EEels;\u62A7f;\uC000\u{1D55E}\u0100ct\u28F8\u28FDr;\uC000\u{1D4C2}pos\xBB\u159D\u0180;lm\u2909\u290A\u290D\u43BCtimap;\u62B8\u0C00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297E\u2989\u2998\u29DA\u29E9\u2A15\u2A1A\u2A58\u2A5D\u2A83\u2A95\u2AA4\u2AA8\u2B04\u2B07\u2B44\u2B7F\u2BAE\u2C34\u2C67\u2C7C\u2CE9\u0100gt\u2947\u294B;\uC000\u22D9\u0338\u0100;v\u2950\u0BCF\uC000\u226B\u20D2\u0180elt\u295A\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61CDightarrow;\u61CE;\uC000\u22D8\u0338\u0100;v\u297B\u0C47\uC000\u226A\u20D2ightarrow;\u61CF\u0100Dd\u298E\u2993ash;\u62AFash;\u62AE\u0280bcnpt\u29A3\u29A7\u29AC\u29B1\u29CCla\xBB\u02DEute;\u4144g;\uC000\u2220\u20D2\u0280;Eiop\u0D84\u29BC\u29C0\u29C5\u29C8;\uC000\u2A70\u0338d;\uC000\u224B\u0338s;\u4149ro\xF8\u0D84ur\u0100;a\u29D3\u29D4\u666El\u0100;s\u29D3\u0B38\u01F3\u29DF\0\u29E3p\u80BB\xA0\u0B37mp\u0100;e\u0BF9\u0C00\u0280aeouy\u29F4\u29FE\u2A03\u2A10\u2A13\u01F0\u29F9\0\u29FB;\u6A43on;\u4148dil;\u4146ng\u0100;d\u0D7E\u2A0Aot;\uC000\u2A6D\u0338p;\u6A42;\u443Dash;\u6013\u0380;Aadqsx\u0B92\u2A29\u2A2D\u2A3B\u2A41\u2A45\u2A50rr;\u61D7r\u0100hr\u2A33\u2A36k;\u6924\u0100;o\u13F2\u13F0ot;\uC000\u2250\u0338ui\xF6\u0B63\u0100ei\u2A4A\u2A4Ear;\u6928\xED\u0B98ist\u0100;s\u0BA0\u0B9Fr;\uC000\u{1D52B}\u0200Eest\u0BC5\u2A66\u2A79\u2A7C\u0180;qs\u0BBC\u2A6D\u0BE1\u0180;qs\u0BBC\u0BC5\u2A74lan\xF4\u0BE2i\xED\u0BEA\u0100;r\u0BB6\u2A81\xBB\u0BB7\u0180Aap\u2A8A\u2A8D\u2A91r\xF2\u2971rr;\u61AEar;\u6AF2\u0180;sv\u0F8D\u2A9C\u0F8C\u0100;d\u2AA1\u2AA2\u62FC;\u62FAcy;\u445A\u0380AEadest\u2AB7\u2ABA\u2ABE\u2AC2\u2AC5\u2AF6\u2AF9r\xF2\u2966;\uC000\u2266\u0338rr;\u619Ar;\u6025\u0200;fqs\u0C3B\u2ACE\u2AE3\u2AEFt\u0100ar\u2AD4\u2AD9rro\xF7\u2AC1ightarro\xF7\u2A90\u0180;qs\u0C3B\u2ABA\u2AEAlan\xF4\u0C55\u0100;s\u0C55\u2AF4\xBB\u0C36i\xED\u0C5D\u0100;r\u0C35\u2AFEi\u0100;e\u0C1A\u0C25i\xE4\u0D90\u0100pt\u2B0C\u2B11f;\uC000\u{1D55F}\u8180\xAC;in\u2B19\u2B1A\u2B36\u40ACn\u0200;Edv\u0B89\u2B24\u2B28\u2B2E;\uC000\u22F9\u0338ot;\uC000\u22F5\u0338\u01E1\u0B89\u2B33\u2B35;\u62F7;\u62F6i\u0100;v\u0CB8\u2B3C\u01E1\u0CB8\u2B41\u2B43;\u62FE;\u62FD\u0180aor\u2B4B\u2B63\u2B69r\u0200;ast\u0B7B\u2B55\u2B5A\u2B5Flle\xEC\u0B7Bl;\uC000\u2AFD\u20E5;\uC000\u2202\u0338lint;\u6A14\u0180;ce\u0C92\u2B70\u2B73u\xE5\u0CA5\u0100;c\u0C98\u2B78\u0100;e\u0C92\u2B7D\xF1\u0C98\u0200Aait\u2B88\u2B8B\u2B9D\u2BA7r\xF2\u2988rr\u0180;cw\u2B94\u2B95\u2B99\u619B;\uC000\u2933\u0338;\uC000\u219D\u0338ghtarrow\xBB\u2B95ri\u0100;e\u0CCB\u0CD6\u0380chimpqu\u2BBD\u2BCD\u2BD9\u2B04\u0B78\u2BE4\u2BEF\u0200;cer\u0D32\u2BC6\u0D37\u2BC9u\xE5\u0D45;\uC000\u{1D4C3}ort\u026D\u2B05\0\0\u2BD6ar\xE1\u2B56m\u0100;e\u0D6E\u2BDF\u0100;q\u0D74\u0D73su\u0100bp\u2BEB\u2BED\xE5\u0CF8\xE5\u0D0B\u0180bcp\u2BF6\u2C11\u2C19\u0200;Ees\u2BFF\u2C00\u0D22\u2C04\u6284;\uC000\u2AC5\u0338et\u0100;e\u0D1B\u2C0Bq\u0100;q\u0D23\u2C00c\u0100;e\u0D32\u2C17\xF1\u0D38\u0200;Ees\u2C22\u2C23\u0D5F\u2C27\u6285;\uC000\u2AC6\u0338et\u0100;e\u0D58\u2C2Eq\u0100;q\u0D60\u2C23\u0200gilr\u2C3D\u2C3F\u2C45\u2C47\xEC\u0BD7lde\u803B\xF1\u40F1\xE7\u0C43iangle\u0100lr\u2C52\u2C5Ceft\u0100;e\u0C1A\u2C5A\xF1\u0C26ight\u0100;e\u0CCB\u2C65\xF1\u0CD7\u0100;m\u2C6C\u2C6D\u43BD\u0180;es\u2C74\u2C75\u2C79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2C8F\u2C94\u2C99\u2C9E\u2CA3\u2CB0\u2CB6\u2CD3\u2CE3ash;\u62ADarr;\u6904p;\uC000\u224D\u20D2ash;\u62AC\u0100et\u2CA8\u2CAC;\uC000\u2265\u20D2;\uC000>\u20D2nfin;\u69DE\u0180Aet\u2CBD\u2CC1\u2CC5rr;\u6902;\uC000\u2264\u20D2\u0100;r\u2CCA\u2CCD\uC000<\u20D2ie;\uC000\u22B4\u20D2\u0100At\u2CD8\u2CDCrr;\u6903rie;\uC000\u22B5\u20D2im;\uC000\u223C\u20D2\u0180Aan\u2CF0\u2CF4\u2D02rr;\u61D6r\u0100hr\u2CFA\u2CFDk;\u6923\u0100;o\u13E7\u13E5ear;\u6927\u1253\u1A95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2D2D\0\u2D38\u2D48\u2D60\u2D65\u2D72\u2D84\u1B07\0\0\u2D8D\u2DAB\0\u2DC8\u2DCE\0\u2DDC\u2E19\u2E2B\u2E3E\u2E43\u0100cs\u2D31\u1A97ute\u803B\xF3\u40F3\u0100iy\u2D3C\u2D45r\u0100;c\u1A9E\u2D42\u803B\xF4\u40F4;\u443E\u0280abios\u1AA0\u2D52\u2D57\u01C8\u2D5Alac;\u4151v;\u6A38old;\u69BClig;\u4153\u0100cr\u2D69\u2D6Dir;\u69BF;\uC000\u{1D52C}\u036F\u2D79\0\0\u2D7C\0\u2D82n;\u42DBave\u803B\xF2\u40F2;\u69C1\u0100bm\u2D88\u0DF4ar;\u69B5\u0200acit\u2D95\u2D98\u2DA5\u2DA8r\xF2\u1A80\u0100ir\u2D9D\u2DA0r;\u69BEoss;\u69BBn\xE5\u0E52;\u69C0\u0180aei\u2DB1\u2DB5\u2DB9cr;\u414Dga;\u43C9\u0180cdn\u2DC0\u2DC5\u01CDron;\u43BF;\u69B6pf;\uC000\u{1D560}\u0180ael\u2DD4\u2DD7\u01D2r;\u69B7rp;\u69B9\u0380;adiosv\u2DEA\u2DEB\u2DEE\u2E08\u2E0D\u2E10\u2E16\u6228r\xF2\u1A86\u0200;efm\u2DF7\u2DF8\u2E02\u2E05\u6A5Dr\u0100;o\u2DFE\u2DFF\u6134f\xBB\u2DFF\u803B\xAA\u40AA\u803B\xBA\u40BAgof;\u62B6r;\u6A56lope;\u6A57;\u6A5B\u0180clo\u2E1F\u2E21\u2E27\xF2\u2E01ash\u803B\xF8\u40F8l;\u6298i\u016C\u2E2F\u2E34de\u803B\xF5\u40F5es\u0100;a\u01DB\u2E3As;\u6A36ml\u803B\xF6\u40F6bar;\u633D\u0AE1\u2E5E\0\u2E7D\0\u2E80\u2E9D\0\u2EA2\u2EB9\0\0\u2ECB\u0E9C\0\u2F13\0\0\u2F2B\u2FBC\0\u2FC8r\u0200;ast\u0403\u2E67\u2E72\u0E85\u8100\xB6;l\u2E6D\u2E6E\u40B6le\xEC\u0403\u0269\u2E78\0\0\u2E7Bm;\u6AF3;\u6AFDy;\u443Fr\u0280cimpt\u2E8B\u2E8F\u2E93\u1865\u2E97nt;\u4025od;\u402Eil;\u6030enk;\u6031r;\uC000\u{1D52D}\u0180imo\u2EA8\u2EB0\u2EB4\u0100;v\u2EAD\u2EAE\u43C6;\u43D5ma\xF4\u0A76ne;\u660E\u0180;tv\u2EBF\u2EC0\u2EC8\u43C0chfork\xBB\u1FFD;\u43D6\u0100au\u2ECF\u2EDFn\u0100ck\u2ED5\u2EDDk\u0100;h\u21F4\u2EDB;\u610E\xF6\u21F4s\u0480;abcdemst\u2EF3\u2EF4\u1908\u2EF9\u2EFD\u2F04\u2F06\u2F0A\u2F0E\u402Bcir;\u6A23ir;\u6A22\u0100ou\u1D40\u2F02;\u6A25;\u6A72n\u80BB\xB1\u0E9Dim;\u6A26wo;\u6A27\u0180ipu\u2F19\u2F20\u2F25ntint;\u6A15f;\uC000\u{1D561}nd\u803B\xA3\u40A3\u0500;Eaceinosu\u0EC8\u2F3F\u2F41\u2F44\u2F47\u2F81\u2F89\u2F92\u2F7E\u2FB6;\u6AB3p;\u6AB7u\xE5\u0ED9\u0100;c\u0ECE\u2F4C\u0300;acens\u0EC8\u2F59\u2F5F\u2F66\u2F68\u2F7Eppro\xF8\u2F43urlye\xF1\u0ED9\xF1\u0ECE\u0180aes\u2F6F\u2F76\u2F7Approx;\u6AB9qq;\u6AB5im;\u62E8i\xED\u0EDFme\u0100;s\u2F88\u0EAE\u6032\u0180Eas\u2F78\u2F90\u2F7A\xF0\u2F75\u0180dfp\u0EEC\u2F99\u2FAF\u0180als\u2FA0\u2FA5\u2FAAlar;\u632Eine;\u6312urf;\u6313\u0100;t\u0EFB\u2FB4\xEF\u0EFBrel;\u62B0\u0100ci\u2FC0\u2FC5r;\uC000\u{1D4C5};\u43C8ncsp;\u6008\u0300fiopsu\u2FDA\u22E2\u2FDF\u2FE5\u2FEB\u2FF1r;\uC000\u{1D52E}pf;\uC000\u{1D562}rime;\u6057cr;\uC000\u{1D4C6}\u0180aeo\u2FF8\u3009\u3013t\u0100ei\u2FFE\u3005rnion\xF3\u06B0nt;\u6A16st\u0100;e\u3010\u3011\u403F\xF1\u1F19\xF4\u0F14\u0A80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30E0\u310E\u312B\u3147\u3162\u3172\u318E\u3206\u3215\u3224\u3229\u3258\u326E\u3272\u3290\u32B0\u32B7\u0180art\u3047\u304A\u304Cr\xF2\u10B3\xF2\u03DDail;\u691Car\xF2\u1C65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307F\u308F\u3094\u30CC\u0100eu\u306D\u3071;\uC000\u223D\u0331te;\u4155i\xE3\u116Emptyv;\u69B3g\u0200;del\u0FD1\u3089\u308B\u308D;\u6992;\u69A5\xE5\u0FD1uo\u803B\xBB\u40BBr\u0580;abcfhlpstw\u0FDC\u30AC\u30AF\u30B7\u30B9\u30BC\u30BE\u30C0\u30C3\u30C7\u30CAp;\u6975\u0100;f\u0FE0\u30B4s;\u6920;\u6933s;\u691E\xEB\u225D\xF0\u272El;\u6945im;\u6974l;\u61A3;\u619D\u0100ai\u30D1\u30D5il;\u691Ao\u0100;n\u30DB\u30DC\u6236al\xF3\u0F1E\u0180abr\u30E7\u30EA\u30EEr\xF2\u17E5rk;\u6773\u0100ak\u30F3\u30FDc\u0100ek\u30F9\u30FB;\u407D;\u405D\u0100es\u3102\u3104;\u698Cl\u0100du\u310A\u310C;\u698E;\u6990\u0200aeuy\u3117\u311C\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xEC\u0FF2\xE2\u30FA;\u4440\u0200clqs\u3134\u3137\u313D\u3144a;\u6937dhar;\u6969uo\u0100;r\u020E\u020Dh;\u61B3\u0180acg\u314E\u315F\u0F44l\u0200;ips\u0F78\u3158\u315B\u109Cn\xE5\u10BBar\xF4\u0FA9t;\u65AD\u0180ilr\u3169\u1023\u316Esht;\u697D;\uC000\u{1D52F}\u0100ao\u3177\u3186r\u0100du\u317D\u317F\xBB\u047B\u0100;l\u1091\u3184;\u696C\u0100;v\u318B\u318C\u43C1;\u43F1\u0180gns\u3195\u31F9\u31FCht\u0300ahlrst\u31A4\u31B0\u31C2\u31D8\u31E4\u31EErrow\u0100;t\u0FDC\u31ADa\xE9\u30C8arpoon\u0100du\u31BB\u31BFow\xEE\u317Ep\xBB\u1092eft\u0100ah\u31CA\u31D0rrow\xF3\u0FEAarpoon\xF3\u0551ightarrows;\u61C9quigarro\xF7\u30CBhreetimes;\u62CCg;\u42DAingdotse\xF1\u1F32\u0180ahm\u320D\u3210\u3213r\xF2\u0FEAa\xF2\u0551;\u600Foust\u0100;a\u321E\u321F\u63B1che\xBB\u321Fmid;\u6AEE\u0200abpt\u3232\u323D\u3240\u3252\u0100nr\u3237\u323Ag;\u67EDr;\u61FEr\xEB\u1003\u0180afl\u3247\u324A\u324Er;\u6986;\uC000\u{1D563}us;\u6A2Eimes;\u6A35\u0100ap\u325D\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6A12ar\xF2\u31E3\u0200achq\u327B\u3280\u10BC\u3285quo;\u603Ar;\uC000\u{1D4C7}\u0100bu\u30FB\u328Ao\u0100;r\u0214\u0213\u0180hir\u3297\u329B\u32A0re\xE5\u31F8mes;\u62CAi\u0200;efl\u32AA\u1059\u1821\u32AB\u65B9tri;\u69CEluhar;\u6968;\u611E\u0D61\u32D5\u32DB\u32DF\u332C\u3338\u3371\0\u337A\u33A4\0\0\u33EC\u33F0\0\u3428\u3448\u345A\u34AD\u34B1\u34CA\u34F1\0\u3616\0\0\u3633cute;\u415Bqu\xEF\u27BA\u0500;Eaceinpsy\u11ED\u32F3\u32F5\u32FF\u3302\u330B\u330F\u331F\u3326\u3329;\u6AB4\u01F0\u32FA\0\u32FC;\u6AB8on;\u4161u\xE5\u11FE\u0100;d\u11F3\u3307il;\u415Frc;\u415D\u0180Eas\u3316\u3318\u331B;\u6AB6p;\u6ABAim;\u62E9olint;\u6A13i\xED\u1204;\u4441ot\u0180;be\u3334\u1D47\u3335\u62C5;\u6A66\u0380Aacmstx\u3346\u334A\u3357\u335B\u335E\u3363\u336Drr;\u61D8r\u0100hr\u3350\u3352\xEB\u2228\u0100;o\u0A36\u0A34t\u803B\xA7\u40A7i;\u403Bwar;\u6929m\u0100in\u3369\xF0nu\xF3\xF1t;\u6736r\u0100;o\u3376\u2055\uC000\u{1D530}\u0200acoy\u3382\u3386\u3391\u33A0rp;\u666F\u0100hy\u338B\u338Fcy;\u4449;\u4448rt\u026D\u3399\0\0\u339Ci\xE4\u1464ara\xEC\u2E6F\u803B\xAD\u40AD\u0100gm\u33A8\u33B4ma\u0180;fv\u33B1\u33B2\u33B2\u43C3;\u43C2\u0400;deglnpr\u12AB\u33C5\u33C9\u33CE\u33D6\u33DE\u33E1\u33E6ot;\u6A6A\u0100;q\u12B1\u12B0\u0100;E\u33D3\u33D4\u6A9E;\u6AA0\u0100;E\u33DB\u33DC\u6A9D;\u6A9Fe;\u6246lus;\u6A24arr;\u6972ar\xF2\u113D\u0200aeit\u33F8\u3408\u340F\u3417\u0100ls\u33FD\u3404lsetm\xE9\u336Ahp;\u6A33parsl;\u69E4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341C\u341D\u6AAA\u0100;s\u3422\u3423\u6AAC;\uC000\u2AAC\uFE00\u0180flp\u342E\u3433\u3442tcy;\u444C\u0100;b\u3438\u3439\u402F\u0100;a\u343E\u343F\u69C4r;\u633Ff;\uC000\u{1D564}a\u0100dr\u344D\u0402es\u0100;u\u3454\u3455\u6660it\xBB\u3455\u0180csu\u3460\u3479\u349F\u0100au\u3465\u346Fp\u0100;s\u1188\u346B;\uC000\u2293\uFE00p\u0100;s\u11B4\u3475;\uC000\u2294\uFE00u\u0100bp\u347F\u348F\u0180;es\u1197\u119C\u3486et\u0100;e\u1197\u348D\xF1\u119D\u0180;es\u11A8\u11AD\u3496et\u0100;e\u11A8\u349D\xF1\u11AE\u0180;af\u117B\u34A6\u05B0r\u0165\u34AB\u05B1\xBB\u117Car\xF2\u1148\u0200cemt\u34B9\u34BE\u34C2\u34C5r;\uC000\u{1D4C8}tm\xEE\xF1i\xEC\u3415ar\xE6\u11BE\u0100ar\u34CE\u34D5r\u0100;f\u34D4\u17BF\u6606\u0100an\u34DA\u34EDight\u0100ep\u34E3\u34EApsilo\xEE\u1EE0h\xE9\u2EAFs\xBB\u2852\u0280bcmnp\u34FB\u355E\u1209\u358B\u358E\u0480;Edemnprs\u350E\u350F\u3511\u3515\u351E\u3523\u352C\u3531\u3536\u6282;\u6AC5ot;\u6ABD\u0100;d\u11DA\u351Aot;\u6AC3ult;\u6AC1\u0100Ee\u3528\u352A;\u6ACB;\u628Alus;\u6ABFarr;\u6979\u0180eiu\u353D\u3552\u3555t\u0180;en\u350E\u3545\u354Bq\u0100;q\u11DA\u350Feq\u0100;q\u352B\u3528m;\u6AC7\u0100bp\u355A\u355C;\u6AD5;\u6AD3c\u0300;acens\u11ED\u356C\u3572\u3579\u357B\u3326ppro\xF8\u32FAurlye\xF1\u11FE\xF1\u11F3\u0180aes\u3582\u3588\u331Bppro\xF8\u331Aq\xF1\u3317g;\u666A\u0680123;Edehlmnps\u35A9\u35AC\u35AF\u121C\u35B2\u35B4\u35C0\u35C9\u35D5\u35DA\u35DF\u35E8\u35ED\u803B\xB9\u40B9\u803B\xB2\u40B2\u803B\xB3\u40B3;\u6AC6\u0100os\u35B9\u35BCt;\u6ABEub;\u6AD8\u0100;d\u1222\u35C5ot;\u6AC4s\u0100ou\u35CF\u35D2l;\u67C9b;\u6AD7arr;\u697Bult;\u6AC2\u0100Ee\u35E4\u35E6;\u6ACC;\u628Blus;\u6AC0\u0180eiu\u35F4\u3609\u360Ct\u0180;en\u121C\u35FC\u3602q\u0100;q\u1222\u35B2eq\u0100;q\u35E7\u35E4m;\u6AC8\u0100bp\u3611\u3613;\u6AD4;\u6AD6\u0180Aan\u361C\u3620\u362Drr;\u61D9r\u0100hr\u3626\u3628\xEB\u222E\u0100;o\u0A2B\u0A29war;\u692Alig\u803B\xDF\u40DF\u0BE1\u3651\u365D\u3660\u12CE\u3673\u3679\0\u367E\u36C2\0\0\0\0\0\u36DB\u3703\0\u3709\u376C\0\0\0\u3787\u0272\u3656\0\0\u365Bget;\u6316;\u43C4r\xEB\u0E5F\u0180aey\u3666\u366B\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uC000\u{1D531}\u0200eiko\u3686\u369D\u36B5\u36BC\u01F2\u368B\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369B\u43B8ym;\u43D1\u0100cn\u36A2\u36B2k\u0100as\u36A8\u36AEppro\xF8\u12C1im\xBB\u12ACs\xF0\u129E\u0100as\u36BA\u36AE\xF0\u12C1rn\u803B\xFE\u40FE\u01EC\u031F\u36C6\u22E7es\u8180\xD7;bd\u36CF\u36D0\u36D8\u40D7\u0100;a\u190F\u36D5r;\u6A31;\u6A30\u0180eps\u36E1\u36E3\u3700\xE1\u2A4D\u0200;bcf\u0486\u36EC\u36F0\u36F4ot;\u6336ir;\u6AF1\u0100;o\u36F9\u36FC\uC000\u{1D565}rk;\u6ADA\xE1\u3362rime;\u6034\u0180aip\u370F\u3712\u3764d\xE5\u1248\u0380adempst\u3721\u374D\u3740\u3751\u3757\u375C\u375Fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65B5own\xBB\u1DBBeft\u0100;e\u2800\u373E\xF1\u092E;\u625Cight\u0100;e\u32AA\u374B\xF1\u105Aot;\u65ECinus;\u6A3Alus;\u6A39b;\u69CDime;\u6A3Bezium;\u63E2\u0180cht\u3772\u377D\u3781\u0100ry\u3777\u377B;\uC000\u{1D4C9};\u4446cy;\u445Brok;\u4167\u0100io\u378B\u378Ex\xF4\u1777head\u0100lr\u3797\u37A0eftarro\xF7\u084Fightarrow\xBB\u0F5D\u0900AHabcdfghlmoprstuw\u37D0\u37D3\u37D7\u37E4\u37F0\u37FC\u380E\u381C\u3823\u3834\u3851\u385D\u386B\u38A9\u38CC\u38D2\u38EA\u38F6r\xF2\u03EDar;\u6963\u0100cr\u37DC\u37E2ute\u803B\xFA\u40FA\xF2\u1150r\u01E3\u37EA\0\u37EDy;\u445Eve;\u416D\u0100iy\u37F5\u37FArc\u803B\xFB\u40FB;\u4443\u0180abh\u3803\u3806\u380Br\xF2\u13ADlac;\u4171a\xF2\u13C3\u0100ir\u3813\u3818sht;\u697E;\uC000\u{1D532}rave\u803B\xF9\u40F9\u0161\u3827\u3831r\u0100lr\u382C\u382E\xBB\u0957\xBB\u1083lk;\u6580\u0100ct\u3839\u384D\u026F\u383F\0\0\u384Arn\u0100;e\u3845\u3846\u631Cr\xBB\u3846op;\u630Fri;\u65F8\u0100al\u3856\u385Acr;\u416B\u80BB\xA8\u0349\u0100gp\u3862\u3866on;\u4173f;\uC000\u{1D566}\u0300adhlsu\u114B\u3878\u387D\u1372\u3891\u38A0own\xE1\u13B3arpoon\u0100lr\u3888\u388Cef\xF4\u382Digh\xF4\u382Fi\u0180;hl\u3899\u389A\u389C\u43C5\xBB\u13FAon\xBB\u389Aparrows;\u61C8\u0180cit\u38B0\u38C4\u38C8\u026F\u38B6\0\0\u38C1rn\u0100;e\u38BC\u38BD\u631Dr\xBB\u38BDop;\u630Eng;\u416Fri;\u65F9cr;\uC000\u{1D4CA}\u0180dir\u38D9\u38DD\u38E2ot;\u62F0lde;\u4169i\u0100;f\u3730\u38E8\xBB\u1813\u0100am\u38EF\u38F2r\xF2\u38A8l\u803B\xFC\u40FCangle;\u69A7\u0780ABDacdeflnoprsz\u391C\u391F\u3929\u392D\u39B5\u39B8\u39BD\u39DF\u39E4\u39E8\u39F3\u39F9\u39FD\u3A01\u3A20r\xF2\u03F7ar\u0100;v\u3926\u3927\u6AE8;\u6AE9as\xE8\u03E1\u0100nr\u3932\u3937grt;\u699C\u0380eknprst\u34E3\u3946\u394B\u3952\u395D\u3964\u3996app\xE1\u2415othin\xE7\u1E96\u0180hir\u34EB\u2EC8\u3959op\xF4\u2FB5\u0100;h\u13B7\u3962\xEF\u318D\u0100iu\u3969\u396Dgm\xE1\u33B3\u0100bp\u3972\u3984setneq\u0100;q\u397D\u3980\uC000\u228A\uFE00;\uC000\u2ACB\uFE00setneq\u0100;q\u398F\u3992\uC000\u228B\uFE00;\uC000\u2ACC\uFE00\u0100hr\u399B\u399Fet\xE1\u369Ciangle\u0100lr\u39AA\u39AFeft\xBB\u0925ight\xBB\u1051y;\u4432ash\xBB\u1036\u0180elr\u39C4\u39D2\u39D7\u0180;be\u2DEA\u39CB\u39CFar;\u62BBq;\u625Alip;\u62EE\u0100bt\u39DC\u1468a\xF2\u1469r;\uC000\u{1D533}tr\xE9\u39AEsu\u0100bp\u39EF\u39F1\xBB\u0D1C\xBB\u0D59pf;\uC000\u{1D567}ro\xF0\u0EFBtr\xE9\u39B4\u0100cu\u3A06\u3A0Br;\uC000\u{1D4CB}\u0100bp\u3A10\u3A18n\u0100Ee\u3980\u3A16\xBB\u397En\u0100Ee\u3992\u3A1E\xBB\u3990igzag;\u699A\u0380cefoprs\u3A36\u3A3B\u3A56\u3A5B\u3A54\u3A61\u3A6Airc;\u4175\u0100di\u3A40\u3A51\u0100bg\u3A45\u3A49ar;\u6A5Fe\u0100;q\u15FA\u3A4F;\u6259erp;\u6118r;\uC000\u{1D534}pf;\uC000\u{1D568}\u0100;e\u1479\u3A66at\xE8\u1479cr;\uC000\u{1D4CC}\u0AE3\u178E\u3A87\0\u3A8B\0\u3A90\u3A9B\0\0\u3A9D\u3AA8\u3AAB\u3AAF\0\0\u3AC3\u3ACE\0\u3AD8\u17DC\u17DFtr\xE9\u17D1r;\uC000\u{1D535}\u0100Aa\u3A94\u3A97r\xF2\u03C3r\xF2\u09F6;\u43BE\u0100Aa\u3AA1\u3AA4r\xF2\u03B8r\xF2\u09EBa\xF0\u2713is;\u62FB\u0180dpt\u17A4\u3AB5\u3ABE\u0100fl\u3ABA\u17A9;\uC000\u{1D569}im\xE5\u17B2\u0100Aa\u3AC7\u3ACAr\xF2\u03CEr\xF2\u0A01\u0100cq\u3AD2\u17B8r;\uC000\u{1D4CD}\u0100pt\u17D6\u3ADCr\xE9\u17D4\u0400acefiosu\u3AF0\u3AFD\u3B08\u3B0C\u3B11\u3B15\u3B1B\u3B21c\u0100uy\u3AF6\u3AFBte\u803B\xFD\u40FD;\u444F\u0100iy\u3B02\u3B06rc;\u4177;\u444Bn\u803B\xA5\u40A5r;\uC000\u{1D536}cy;\u4457pf;\uC000\u{1D56A}cr;\uC000\u{1D4CE}\u0100cm\u3B26\u3B29y;\u444El\u803B\xFF\u40FF\u0500acdefhiosw\u3B42\u3B48\u3B54\u3B58\u3B64\u3B69\u3B6D\u3B74\u3B7A\u3B80cute;\u417A\u0100ay\u3B4D\u3B52ron;\u417E;\u4437ot;\u417C\u0100et\u3B5D\u3B61tr\xE6\u155Fa;\u43B6r;\uC000\u{1D537}cy;\u4436grarr;\u61DDpf;\uC000\u{1D56B}cr;\uC000\u{1D4CF}\u0100jn\u3B85\u3B87;\u600Dj;\u600C'.split("").map(function(c) {
        return c.charCodeAt(0);
      })
    );
  }
});

// node_modules/entities/lib/generated/decode-data-xml.js
var require_decode_data_xml = __commonJS({
  "node_modules/entities/lib/generated/decode-data-xml.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = new Uint16Array(
      // prettier-ignore
      "\u0200aglq	\x1B\u026D\0\0p;\u4026os;\u4027t;\u403Et;\u403Cuot;\u4022".split("").map(function(c) {
        return c.charCodeAt(0);
      })
    );
  }
});

// node_modules/entities/lib/decode_codepoint.js
var require_decode_codepoint = __commonJS({
  "node_modules/entities/lib/decode_codepoint.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.replaceCodePoint = exports2.fromCodePoint = void 0;
    var decodeMap = /* @__PURE__ */ new Map([
      [0, 65533],
      // C1 Unicode control character reference replacements
      [128, 8364],
      [130, 8218],
      [131, 402],
      [132, 8222],
      [133, 8230],
      [134, 8224],
      [135, 8225],
      [136, 710],
      [137, 8240],
      [138, 352],
      [139, 8249],
      [140, 338],
      [142, 381],
      [145, 8216],
      [146, 8217],
      [147, 8220],
      [148, 8221],
      [149, 8226],
      [150, 8211],
      [151, 8212],
      [152, 732],
      [153, 8482],
      [154, 353],
      [155, 8250],
      [156, 339],
      [158, 382],
      [159, 376]
    ]);
    exports2.fromCodePoint = // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
    (_a = String.fromCodePoint) !== null && _a !== void 0 ? _a : function(codePoint) {
      var output = "";
      if (codePoint > 65535) {
        codePoint -= 65536;
        output += String.fromCharCode(codePoint >>> 10 & 1023 | 55296);
        codePoint = 56320 | codePoint & 1023;
      }
      output += String.fromCharCode(codePoint);
      return output;
    };
    function replaceCodePoint(codePoint) {
      var _a2;
      if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
        return 65533;
      }
      return (_a2 = decodeMap.get(codePoint)) !== null && _a2 !== void 0 ? _a2 : codePoint;
    }
    exports2.replaceCodePoint = replaceCodePoint;
    function decodeCodePoint(codePoint) {
      return (0, exports2.fromCodePoint)(replaceCodePoint(codePoint));
    }
    exports2.default = decodeCodePoint;
  }
});

// node_modules/entities/lib/decode.js
var require_decode = __commonJS({
  "node_modules/entities/lib/decode.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.decodeXML = exports2.decodeHTMLStrict = exports2.decodeHTMLAttribute = exports2.decodeHTML = exports2.determineBranch = exports2.EntityDecoder = exports2.DecodingMode = exports2.BinTrieFlags = exports2.fromCodePoint = exports2.replaceCodePoint = exports2.decodeCodePoint = exports2.xmlDecodeTree = exports2.htmlDecodeTree = void 0;
    var decode_data_html_js_1 = __importDefault(require_decode_data_html());
    exports2.htmlDecodeTree = decode_data_html_js_1.default;
    var decode_data_xml_js_1 = __importDefault(require_decode_data_xml());
    exports2.xmlDecodeTree = decode_data_xml_js_1.default;
    var decode_codepoint_js_1 = __importStar(require_decode_codepoint());
    exports2.decodeCodePoint = decode_codepoint_js_1.default;
    var decode_codepoint_js_2 = require_decode_codepoint();
    Object.defineProperty(exports2, "replaceCodePoint", { enumerable: true, get: function() {
      return decode_codepoint_js_2.replaceCodePoint;
    } });
    Object.defineProperty(exports2, "fromCodePoint", { enumerable: true, get: function() {
      return decode_codepoint_js_2.fromCodePoint;
    } });
    var CharCodes;
    (function(CharCodes2) {
      CharCodes2[CharCodes2["NUM"] = 35] = "NUM";
      CharCodes2[CharCodes2["SEMI"] = 59] = "SEMI";
      CharCodes2[CharCodes2["EQUALS"] = 61] = "EQUALS";
      CharCodes2[CharCodes2["ZERO"] = 48] = "ZERO";
      CharCodes2[CharCodes2["NINE"] = 57] = "NINE";
      CharCodes2[CharCodes2["LOWER_A"] = 97] = "LOWER_A";
      CharCodes2[CharCodes2["LOWER_F"] = 102] = "LOWER_F";
      CharCodes2[CharCodes2["LOWER_X"] = 120] = "LOWER_X";
      CharCodes2[CharCodes2["LOWER_Z"] = 122] = "LOWER_Z";
      CharCodes2[CharCodes2["UPPER_A"] = 65] = "UPPER_A";
      CharCodes2[CharCodes2["UPPER_F"] = 70] = "UPPER_F";
      CharCodes2[CharCodes2["UPPER_Z"] = 90] = "UPPER_Z";
    })(CharCodes || (CharCodes = {}));
    var TO_LOWER_BIT = 32;
    var BinTrieFlags;
    (function(BinTrieFlags2) {
      BinTrieFlags2[BinTrieFlags2["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
      BinTrieFlags2[BinTrieFlags2["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
      BinTrieFlags2[BinTrieFlags2["JUMP_TABLE"] = 127] = "JUMP_TABLE";
    })(BinTrieFlags = exports2.BinTrieFlags || (exports2.BinTrieFlags = {}));
    function isNumber(code) {
      return code >= CharCodes.ZERO && code <= CharCodes.NINE;
    }
    function isHexadecimalCharacter(code) {
      return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_F || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_F;
    }
    function isAsciiAlphaNumeric(code) {
      return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_Z || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_Z || isNumber(code);
    }
    function isEntityInAttributeInvalidEnd(code) {
      return code === CharCodes.EQUALS || isAsciiAlphaNumeric(code);
    }
    var EntityDecoderState;
    (function(EntityDecoderState2) {
      EntityDecoderState2[EntityDecoderState2["EntityStart"] = 0] = "EntityStart";
      EntityDecoderState2[EntityDecoderState2["NumericStart"] = 1] = "NumericStart";
      EntityDecoderState2[EntityDecoderState2["NumericDecimal"] = 2] = "NumericDecimal";
      EntityDecoderState2[EntityDecoderState2["NumericHex"] = 3] = "NumericHex";
      EntityDecoderState2[EntityDecoderState2["NamedEntity"] = 4] = "NamedEntity";
    })(EntityDecoderState || (EntityDecoderState = {}));
    var DecodingMode;
    (function(DecodingMode2) {
      DecodingMode2[DecodingMode2["Legacy"] = 0] = "Legacy";
      DecodingMode2[DecodingMode2["Strict"] = 1] = "Strict";
      DecodingMode2[DecodingMode2["Attribute"] = 2] = "Attribute";
    })(DecodingMode = exports2.DecodingMode || (exports2.DecodingMode = {}));
    var EntityDecoder = (
      /** @class */
      function() {
        function EntityDecoder2(decodeTree, emitCodePoint, errors2) {
          this.decodeTree = decodeTree;
          this.emitCodePoint = emitCodePoint;
          this.errors = errors2;
          this.state = EntityDecoderState.EntityStart;
          this.consumed = 1;
          this.result = 0;
          this.treeIndex = 0;
          this.excess = 1;
          this.decodeMode = DecodingMode.Strict;
        }
        EntityDecoder2.prototype.startEntity = function(decodeMode) {
          this.decodeMode = decodeMode;
          this.state = EntityDecoderState.EntityStart;
          this.result = 0;
          this.treeIndex = 0;
          this.excess = 1;
          this.consumed = 1;
        };
        EntityDecoder2.prototype.write = function(str, offset) {
          switch (this.state) {
            case EntityDecoderState.EntityStart: {
              if (str.charCodeAt(offset) === CharCodes.NUM) {
                this.state = EntityDecoderState.NumericStart;
                this.consumed += 1;
                return this.stateNumericStart(str, offset + 1);
              }
              this.state = EntityDecoderState.NamedEntity;
              return this.stateNamedEntity(str, offset);
            }
            case EntityDecoderState.NumericStart: {
              return this.stateNumericStart(str, offset);
            }
            case EntityDecoderState.NumericDecimal: {
              return this.stateNumericDecimal(str, offset);
            }
            case EntityDecoderState.NumericHex: {
              return this.stateNumericHex(str, offset);
            }
            case EntityDecoderState.NamedEntity: {
              return this.stateNamedEntity(str, offset);
            }
          }
        };
        EntityDecoder2.prototype.stateNumericStart = function(str, offset) {
          if (offset >= str.length) {
            return -1;
          }
          if ((str.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
            this.state = EntityDecoderState.NumericHex;
            this.consumed += 1;
            return this.stateNumericHex(str, offset + 1);
          }
          this.state = EntityDecoderState.NumericDecimal;
          return this.stateNumericDecimal(str, offset);
        };
        EntityDecoder2.prototype.addToNumericResult = function(str, start, end, base2) {
          if (start !== end) {
            var digitCount = end - start;
            this.result = this.result * Math.pow(base2, digitCount) + parseInt(str.substr(start, digitCount), base2);
            this.consumed += digitCount;
          }
        };
        EntityDecoder2.prototype.stateNumericHex = function(str, offset) {
          var startIdx = offset;
          while (offset < str.length) {
            var char = str.charCodeAt(offset);
            if (isNumber(char) || isHexadecimalCharacter(char)) {
              offset += 1;
            } else {
              this.addToNumericResult(str, startIdx, offset, 16);
              return this.emitNumericEntity(char, 3);
            }
          }
          this.addToNumericResult(str, startIdx, offset, 16);
          return -1;
        };
        EntityDecoder2.prototype.stateNumericDecimal = function(str, offset) {
          var startIdx = offset;
          while (offset < str.length) {
            var char = str.charCodeAt(offset);
            if (isNumber(char)) {
              offset += 1;
            } else {
              this.addToNumericResult(str, startIdx, offset, 10);
              return this.emitNumericEntity(char, 2);
            }
          }
          this.addToNumericResult(str, startIdx, offset, 10);
          return -1;
        };
        EntityDecoder2.prototype.emitNumericEntity = function(lastCp, expectedLength) {
          var _a;
          if (this.consumed <= expectedLength) {
            (_a = this.errors) === null || _a === void 0 ? void 0 : _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
            return 0;
          }
          if (lastCp === CharCodes.SEMI) {
            this.consumed += 1;
          } else if (this.decodeMode === DecodingMode.Strict) {
            return 0;
          }
          this.emitCodePoint((0, decode_codepoint_js_1.replaceCodePoint)(this.result), this.consumed);
          if (this.errors) {
            if (lastCp !== CharCodes.SEMI) {
              this.errors.missingSemicolonAfterCharacterReference();
            }
            this.errors.validateNumericCharacterReference(this.result);
          }
          return this.consumed;
        };
        EntityDecoder2.prototype.stateNamedEntity = function(str, offset) {
          var decodeTree = this.decodeTree;
          var current = decodeTree[this.treeIndex];
          var valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
          for (; offset < str.length; offset++, this.excess++) {
            var char = str.charCodeAt(offset);
            this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
            if (this.treeIndex < 0) {
              return this.result === 0 || // If we are parsing an attribute
              this.decodeMode === DecodingMode.Attribute && // We shouldn't have consumed any characters after the entity,
              (valueLength === 0 || // And there should be no invalid characters.
              isEntityInAttributeInvalidEnd(char)) ? 0 : this.emitNotTerminatedNamedEntity();
            }
            current = decodeTree[this.treeIndex];
            valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
            if (valueLength !== 0) {
              if (char === CharCodes.SEMI) {
                return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
              }
              if (this.decodeMode !== DecodingMode.Strict) {
                this.result = this.treeIndex;
                this.consumed += this.excess;
                this.excess = 0;
              }
            }
          }
          return -1;
        };
        EntityDecoder2.prototype.emitNotTerminatedNamedEntity = function() {
          var _a;
          var _b = this, result = _b.result, decodeTree = _b.decodeTree;
          var valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
          this.emitNamedEntityData(result, valueLength, this.consumed);
          (_a = this.errors) === null || _a === void 0 ? void 0 : _a.missingSemicolonAfterCharacterReference();
          return this.consumed;
        };
        EntityDecoder2.prototype.emitNamedEntityData = function(result, valueLength, consumed) {
          var decodeTree = this.decodeTree;
          this.emitCodePoint(valueLength === 1 ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH : decodeTree[result + 1], consumed);
          if (valueLength === 3) {
            this.emitCodePoint(decodeTree[result + 2], consumed);
          }
          return consumed;
        };
        EntityDecoder2.prototype.end = function() {
          var _a;
          switch (this.state) {
            case EntityDecoderState.NamedEntity: {
              return this.result !== 0 && (this.decodeMode !== DecodingMode.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
            }
            case EntityDecoderState.NumericDecimal: {
              return this.emitNumericEntity(0, 2);
            }
            case EntityDecoderState.NumericHex: {
              return this.emitNumericEntity(0, 3);
            }
            case EntityDecoderState.NumericStart: {
              (_a = this.errors) === null || _a === void 0 ? void 0 : _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
              return 0;
            }
            case EntityDecoderState.EntityStart: {
              return 0;
            }
          }
        };
        return EntityDecoder2;
      }()
    );
    exports2.EntityDecoder = EntityDecoder;
    function getDecoder(decodeTree) {
      var ret = "";
      var decoder = new EntityDecoder(decodeTree, function(str) {
        return ret += (0, decode_codepoint_js_1.fromCodePoint)(str);
      });
      return function decodeWithTrie(str, decodeMode) {
        var lastIndex = 0;
        var offset = 0;
        while ((offset = str.indexOf("&", offset)) >= 0) {
          ret += str.slice(lastIndex, offset);
          decoder.startEntity(decodeMode);
          var len = decoder.write(
            str,
            // Skip the "&"
            offset + 1
          );
          if (len < 0) {
            lastIndex = offset + decoder.end();
            break;
          }
          lastIndex = offset + len;
          offset = len === 0 ? lastIndex + 1 : lastIndex;
        }
        var result = ret + str.slice(lastIndex);
        ret = "";
        return result;
      };
    }
    function determineBranch(decodeTree, current, nodeIdx, char) {
      var branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
      var jumpOffset = current & BinTrieFlags.JUMP_TABLE;
      if (branchCount === 0) {
        return jumpOffset !== 0 && char === jumpOffset ? nodeIdx : -1;
      }
      if (jumpOffset) {
        var value = char - jumpOffset;
        return value < 0 || value >= branchCount ? -1 : decodeTree[nodeIdx + value] - 1;
      }
      var lo = nodeIdx;
      var hi = lo + branchCount - 1;
      while (lo <= hi) {
        var mid = lo + hi >>> 1;
        var midVal = decodeTree[mid];
        if (midVal < char) {
          lo = mid + 1;
        } else if (midVal > char) {
          hi = mid - 1;
        } else {
          return decodeTree[mid + branchCount];
        }
      }
      return -1;
    }
    exports2.determineBranch = determineBranch;
    var htmlDecoder = getDecoder(decode_data_html_js_1.default);
    var xmlDecoder = getDecoder(decode_data_xml_js_1.default);
    function decodeHTML(str, mode) {
      if (mode === void 0) {
        mode = DecodingMode.Legacy;
      }
      return htmlDecoder(str, mode);
    }
    exports2.decodeHTML = decodeHTML;
    function decodeHTMLAttribute(str) {
      return htmlDecoder(str, DecodingMode.Attribute);
    }
    exports2.decodeHTMLAttribute = decodeHTMLAttribute;
    function decodeHTMLStrict(str) {
      return htmlDecoder(str, DecodingMode.Strict);
    }
    exports2.decodeHTMLStrict = decodeHTMLStrict;
    function decodeXML(str) {
      return xmlDecoder(str, DecodingMode.Strict);
    }
    exports2.decodeXML = decodeXML;
  }
});

// node_modules/entities/lib/generated/encode-html.js
var require_encode_html = __commonJS({
  "node_modules/entities/lib/generated/encode-html.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function restoreDiff(arr) {
      for (var i = 1; i < arr.length; i++) {
        arr[i][0] += arr[i - 1][0] + 1;
      }
      return arr;
    }
    exports2.default = new Map(/* @__PURE__ */ restoreDiff([[9, "&Tab;"], [0, "&NewLine;"], [22, "&excl;"], [0, "&quot;"], [0, "&num;"], [0, "&dollar;"], [0, "&percnt;"], [0, "&amp;"], [0, "&apos;"], [0, "&lpar;"], [0, "&rpar;"], [0, "&ast;"], [0, "&plus;"], [0, "&comma;"], [1, "&period;"], [0, "&sol;"], [10, "&colon;"], [0, "&semi;"], [0, { v: "&lt;", n: 8402, o: "&nvlt;" }], [0, { v: "&equals;", n: 8421, o: "&bne;" }], [0, { v: "&gt;", n: 8402, o: "&nvgt;" }], [0, "&quest;"], [0, "&commat;"], [26, "&lbrack;"], [0, "&bsol;"], [0, "&rbrack;"], [0, "&Hat;"], [0, "&lowbar;"], [0, "&DiacriticalGrave;"], [5, { n: 106, o: "&fjlig;" }], [20, "&lbrace;"], [0, "&verbar;"], [0, "&rbrace;"], [34, "&nbsp;"], [0, "&iexcl;"], [0, "&cent;"], [0, "&pound;"], [0, "&curren;"], [0, "&yen;"], [0, "&brvbar;"], [0, "&sect;"], [0, "&die;"], [0, "&copy;"], [0, "&ordf;"], [0, "&laquo;"], [0, "&not;"], [0, "&shy;"], [0, "&circledR;"], [0, "&macr;"], [0, "&deg;"], [0, "&PlusMinus;"], [0, "&sup2;"], [0, "&sup3;"], [0, "&acute;"], [0, "&micro;"], [0, "&para;"], [0, "&centerdot;"], [0, "&cedil;"], [0, "&sup1;"], [0, "&ordm;"], [0, "&raquo;"], [0, "&frac14;"], [0, "&frac12;"], [0, "&frac34;"], [0, "&iquest;"], [0, "&Agrave;"], [0, "&Aacute;"], [0, "&Acirc;"], [0, "&Atilde;"], [0, "&Auml;"], [0, "&angst;"], [0, "&AElig;"], [0, "&Ccedil;"], [0, "&Egrave;"], [0, "&Eacute;"], [0, "&Ecirc;"], [0, "&Euml;"], [0, "&Igrave;"], [0, "&Iacute;"], [0, "&Icirc;"], [0, "&Iuml;"], [0, "&ETH;"], [0, "&Ntilde;"], [0, "&Ograve;"], [0, "&Oacute;"], [0, "&Ocirc;"], [0, "&Otilde;"], [0, "&Ouml;"], [0, "&times;"], [0, "&Oslash;"], [0, "&Ugrave;"], [0, "&Uacute;"], [0, "&Ucirc;"], [0, "&Uuml;"], [0, "&Yacute;"], [0, "&THORN;"], [0, "&szlig;"], [0, "&agrave;"], [0, "&aacute;"], [0, "&acirc;"], [0, "&atilde;"], [0, "&auml;"], [0, "&aring;"], [0, "&aelig;"], [0, "&ccedil;"], [0, "&egrave;"], [0, "&eacute;"], [0, "&ecirc;"], [0, "&euml;"], [0, "&igrave;"], [0, "&iacute;"], [0, "&icirc;"], [0, "&iuml;"], [0, "&eth;"], [0, "&ntilde;"], [0, "&ograve;"], [0, "&oacute;"], [0, "&ocirc;"], [0, "&otilde;"], [0, "&ouml;"], [0, "&div;"], [0, "&oslash;"], [0, "&ugrave;"], [0, "&uacute;"], [0, "&ucirc;"], [0, "&uuml;"], [0, "&yacute;"], [0, "&thorn;"], [0, "&yuml;"], [0, "&Amacr;"], [0, "&amacr;"], [0, "&Abreve;"], [0, "&abreve;"], [0, "&Aogon;"], [0, "&aogon;"], [0, "&Cacute;"], [0, "&cacute;"], [0, "&Ccirc;"], [0, "&ccirc;"], [0, "&Cdot;"], [0, "&cdot;"], [0, "&Ccaron;"], [0, "&ccaron;"], [0, "&Dcaron;"], [0, "&dcaron;"], [0, "&Dstrok;"], [0, "&dstrok;"], [0, "&Emacr;"], [0, "&emacr;"], [2, "&Edot;"], [0, "&edot;"], [0, "&Eogon;"], [0, "&eogon;"], [0, "&Ecaron;"], [0, "&ecaron;"], [0, "&Gcirc;"], [0, "&gcirc;"], [0, "&Gbreve;"], [0, "&gbreve;"], [0, "&Gdot;"], [0, "&gdot;"], [0, "&Gcedil;"], [1, "&Hcirc;"], [0, "&hcirc;"], [0, "&Hstrok;"], [0, "&hstrok;"], [0, "&Itilde;"], [0, "&itilde;"], [0, "&Imacr;"], [0, "&imacr;"], [2, "&Iogon;"], [0, "&iogon;"], [0, "&Idot;"], [0, "&imath;"], [0, "&IJlig;"], [0, "&ijlig;"], [0, "&Jcirc;"], [0, "&jcirc;"], [0, "&Kcedil;"], [0, "&kcedil;"], [0, "&kgreen;"], [0, "&Lacute;"], [0, "&lacute;"], [0, "&Lcedil;"], [0, "&lcedil;"], [0, "&Lcaron;"], [0, "&lcaron;"], [0, "&Lmidot;"], [0, "&lmidot;"], [0, "&Lstrok;"], [0, "&lstrok;"], [0, "&Nacute;"], [0, "&nacute;"], [0, "&Ncedil;"], [0, "&ncedil;"], [0, "&Ncaron;"], [0, "&ncaron;"], [0, "&napos;"], [0, "&ENG;"], [0, "&eng;"], [0, "&Omacr;"], [0, "&omacr;"], [2, "&Odblac;"], [0, "&odblac;"], [0, "&OElig;"], [0, "&oelig;"], [0, "&Racute;"], [0, "&racute;"], [0, "&Rcedil;"], [0, "&rcedil;"], [0, "&Rcaron;"], [0, "&rcaron;"], [0, "&Sacute;"], [0, "&sacute;"], [0, "&Scirc;"], [0, "&scirc;"], [0, "&Scedil;"], [0, "&scedil;"], [0, "&Scaron;"], [0, "&scaron;"], [0, "&Tcedil;"], [0, "&tcedil;"], [0, "&Tcaron;"], [0, "&tcaron;"], [0, "&Tstrok;"], [0, "&tstrok;"], [0, "&Utilde;"], [0, "&utilde;"], [0, "&Umacr;"], [0, "&umacr;"], [0, "&Ubreve;"], [0, "&ubreve;"], [0, "&Uring;"], [0, "&uring;"], [0, "&Udblac;"], [0, "&udblac;"], [0, "&Uogon;"], [0, "&uogon;"], [0, "&Wcirc;"], [0, "&wcirc;"], [0, "&Ycirc;"], [0, "&ycirc;"], [0, "&Yuml;"], [0, "&Zacute;"], [0, "&zacute;"], [0, "&Zdot;"], [0, "&zdot;"], [0, "&Zcaron;"], [0, "&zcaron;"], [19, "&fnof;"], [34, "&imped;"], [63, "&gacute;"], [65, "&jmath;"], [142, "&circ;"], [0, "&caron;"], [16, "&breve;"], [0, "&DiacriticalDot;"], [0, "&ring;"], [0, "&ogon;"], [0, "&DiacriticalTilde;"], [0, "&dblac;"], [51, "&DownBreve;"], [127, "&Alpha;"], [0, "&Beta;"], [0, "&Gamma;"], [0, "&Delta;"], [0, "&Epsilon;"], [0, "&Zeta;"], [0, "&Eta;"], [0, "&Theta;"], [0, "&Iota;"], [0, "&Kappa;"], [0, "&Lambda;"], [0, "&Mu;"], [0, "&Nu;"], [0, "&Xi;"], [0, "&Omicron;"], [0, "&Pi;"], [0, "&Rho;"], [1, "&Sigma;"], [0, "&Tau;"], [0, "&Upsilon;"], [0, "&Phi;"], [0, "&Chi;"], [0, "&Psi;"], [0, "&ohm;"], [7, "&alpha;"], [0, "&beta;"], [0, "&gamma;"], [0, "&delta;"], [0, "&epsi;"], [0, "&zeta;"], [0, "&eta;"], [0, "&theta;"], [0, "&iota;"], [0, "&kappa;"], [0, "&lambda;"], [0, "&mu;"], [0, "&nu;"], [0, "&xi;"], [0, "&omicron;"], [0, "&pi;"], [0, "&rho;"], [0, "&sigmaf;"], [0, "&sigma;"], [0, "&tau;"], [0, "&upsi;"], [0, "&phi;"], [0, "&chi;"], [0, "&psi;"], [0, "&omega;"], [7, "&thetasym;"], [0, "&Upsi;"], [2, "&phiv;"], [0, "&piv;"], [5, "&Gammad;"], [0, "&digamma;"], [18, "&kappav;"], [0, "&rhov;"], [3, "&epsiv;"], [0, "&backepsilon;"], [10, "&IOcy;"], [0, "&DJcy;"], [0, "&GJcy;"], [0, "&Jukcy;"], [0, "&DScy;"], [0, "&Iukcy;"], [0, "&YIcy;"], [0, "&Jsercy;"], [0, "&LJcy;"], [0, "&NJcy;"], [0, "&TSHcy;"], [0, "&KJcy;"], [1, "&Ubrcy;"], [0, "&DZcy;"], [0, "&Acy;"], [0, "&Bcy;"], [0, "&Vcy;"], [0, "&Gcy;"], [0, "&Dcy;"], [0, "&IEcy;"], [0, "&ZHcy;"], [0, "&Zcy;"], [0, "&Icy;"], [0, "&Jcy;"], [0, "&Kcy;"], [0, "&Lcy;"], [0, "&Mcy;"], [0, "&Ncy;"], [0, "&Ocy;"], [0, "&Pcy;"], [0, "&Rcy;"], [0, "&Scy;"], [0, "&Tcy;"], [0, "&Ucy;"], [0, "&Fcy;"], [0, "&KHcy;"], [0, "&TScy;"], [0, "&CHcy;"], [0, "&SHcy;"], [0, "&SHCHcy;"], [0, "&HARDcy;"], [0, "&Ycy;"], [0, "&SOFTcy;"], [0, "&Ecy;"], [0, "&YUcy;"], [0, "&YAcy;"], [0, "&acy;"], [0, "&bcy;"], [0, "&vcy;"], [0, "&gcy;"], [0, "&dcy;"], [0, "&iecy;"], [0, "&zhcy;"], [0, "&zcy;"], [0, "&icy;"], [0, "&jcy;"], [0, "&kcy;"], [0, "&lcy;"], [0, "&mcy;"], [0, "&ncy;"], [0, "&ocy;"], [0, "&pcy;"], [0, "&rcy;"], [0, "&scy;"], [0, "&tcy;"], [0, "&ucy;"], [0, "&fcy;"], [0, "&khcy;"], [0, "&tscy;"], [0, "&chcy;"], [0, "&shcy;"], [0, "&shchcy;"], [0, "&hardcy;"], [0, "&ycy;"], [0, "&softcy;"], [0, "&ecy;"], [0, "&yucy;"], [0, "&yacy;"], [1, "&iocy;"], [0, "&djcy;"], [0, "&gjcy;"], [0, "&jukcy;"], [0, "&dscy;"], [0, "&iukcy;"], [0, "&yicy;"], [0, "&jsercy;"], [0, "&ljcy;"], [0, "&njcy;"], [0, "&tshcy;"], [0, "&kjcy;"], [1, "&ubrcy;"], [0, "&dzcy;"], [7074, "&ensp;"], [0, "&emsp;"], [0, "&emsp13;"], [0, "&emsp14;"], [1, "&numsp;"], [0, "&puncsp;"], [0, "&ThinSpace;"], [0, "&hairsp;"], [0, "&NegativeMediumSpace;"], [0, "&zwnj;"], [0, "&zwj;"], [0, "&lrm;"], [0, "&rlm;"], [0, "&dash;"], [2, "&ndash;"], [0, "&mdash;"], [0, "&horbar;"], [0, "&Verbar;"], [1, "&lsquo;"], [0, "&CloseCurlyQuote;"], [0, "&lsquor;"], [1, "&ldquo;"], [0, "&CloseCurlyDoubleQuote;"], [0, "&bdquo;"], [1, "&dagger;"], [0, "&Dagger;"], [0, "&bull;"], [2, "&nldr;"], [0, "&hellip;"], [9, "&permil;"], [0, "&pertenk;"], [0, "&prime;"], [0, "&Prime;"], [0, "&tprime;"], [0, "&backprime;"], [3, "&lsaquo;"], [0, "&rsaquo;"], [3, "&oline;"], [2, "&caret;"], [1, "&hybull;"], [0, "&frasl;"], [10, "&bsemi;"], [7, "&qprime;"], [7, { v: "&MediumSpace;", n: 8202, o: "&ThickSpace;" }], [0, "&NoBreak;"], [0, "&af;"], [0, "&InvisibleTimes;"], [0, "&ic;"], [72, "&euro;"], [46, "&tdot;"], [0, "&DotDot;"], [37, "&complexes;"], [2, "&incare;"], [4, "&gscr;"], [0, "&hamilt;"], [0, "&Hfr;"], [0, "&Hopf;"], [0, "&planckh;"], [0, "&hbar;"], [0, "&imagline;"], [0, "&Ifr;"], [0, "&lagran;"], [0, "&ell;"], [1, "&naturals;"], [0, "&numero;"], [0, "&copysr;"], [0, "&weierp;"], [0, "&Popf;"], [0, "&Qopf;"], [0, "&realine;"], [0, "&real;"], [0, "&reals;"], [0, "&rx;"], [3, "&trade;"], [1, "&integers;"], [2, "&mho;"], [0, "&zeetrf;"], [0, "&iiota;"], [2, "&bernou;"], [0, "&Cayleys;"], [1, "&escr;"], [0, "&Escr;"], [0, "&Fouriertrf;"], [1, "&Mellintrf;"], [0, "&order;"], [0, "&alefsym;"], [0, "&beth;"], [0, "&gimel;"], [0, "&daleth;"], [12, "&CapitalDifferentialD;"], [0, "&dd;"], [0, "&ee;"], [0, "&ii;"], [10, "&frac13;"], [0, "&frac23;"], [0, "&frac15;"], [0, "&frac25;"], [0, "&frac35;"], [0, "&frac45;"], [0, "&frac16;"], [0, "&frac56;"], [0, "&frac18;"], [0, "&frac38;"], [0, "&frac58;"], [0, "&frac78;"], [49, "&larr;"], [0, "&ShortUpArrow;"], [0, "&rarr;"], [0, "&darr;"], [0, "&harr;"], [0, "&updownarrow;"], [0, "&nwarr;"], [0, "&nearr;"], [0, "&LowerRightArrow;"], [0, "&LowerLeftArrow;"], [0, "&nlarr;"], [0, "&nrarr;"], [1, { v: "&rarrw;", n: 824, o: "&nrarrw;" }], [0, "&Larr;"], [0, "&Uarr;"], [0, "&Rarr;"], [0, "&Darr;"], [0, "&larrtl;"], [0, "&rarrtl;"], [0, "&LeftTeeArrow;"], [0, "&mapstoup;"], [0, "&map;"], [0, "&DownTeeArrow;"], [1, "&hookleftarrow;"], [0, "&hookrightarrow;"], [0, "&larrlp;"], [0, "&looparrowright;"], [0, "&harrw;"], [0, "&nharr;"], [1, "&lsh;"], [0, "&rsh;"], [0, "&ldsh;"], [0, "&rdsh;"], [1, "&crarr;"], [0, "&cularr;"], [0, "&curarr;"], [2, "&circlearrowleft;"], [0, "&circlearrowright;"], [0, "&leftharpoonup;"], [0, "&DownLeftVector;"], [0, "&RightUpVector;"], [0, "&LeftUpVector;"], [0, "&rharu;"], [0, "&DownRightVector;"], [0, "&dharr;"], [0, "&dharl;"], [0, "&RightArrowLeftArrow;"], [0, "&udarr;"], [0, "&LeftArrowRightArrow;"], [0, "&leftleftarrows;"], [0, "&upuparrows;"], [0, "&rightrightarrows;"], [0, "&ddarr;"], [0, "&leftrightharpoons;"], [0, "&Equilibrium;"], [0, "&nlArr;"], [0, "&nhArr;"], [0, "&nrArr;"], [0, "&DoubleLeftArrow;"], [0, "&DoubleUpArrow;"], [0, "&DoubleRightArrow;"], [0, "&dArr;"], [0, "&DoubleLeftRightArrow;"], [0, "&DoubleUpDownArrow;"], [0, "&nwArr;"], [0, "&neArr;"], [0, "&seArr;"], [0, "&swArr;"], [0, "&lAarr;"], [0, "&rAarr;"], [1, "&zigrarr;"], [6, "&larrb;"], [0, "&rarrb;"], [15, "&DownArrowUpArrow;"], [7, "&loarr;"], [0, "&roarr;"], [0, "&hoarr;"], [0, "&forall;"], [0, "&comp;"], [0, { v: "&part;", n: 824, o: "&npart;" }], [0, "&exist;"], [0, "&nexist;"], [0, "&empty;"], [1, "&Del;"], [0, "&Element;"], [0, "&NotElement;"], [1, "&ni;"], [0, "&notni;"], [2, "&prod;"], [0, "&coprod;"], [0, "&sum;"], [0, "&minus;"], [0, "&MinusPlus;"], [0, "&dotplus;"], [1, "&Backslash;"], [0, "&lowast;"], [0, "&compfn;"], [1, "&radic;"], [2, "&prop;"], [0, "&infin;"], [0, "&angrt;"], [0, { v: "&ang;", n: 8402, o: "&nang;" }], [0, "&angmsd;"], [0, "&angsph;"], [0, "&mid;"], [0, "&nmid;"], [0, "&DoubleVerticalBar;"], [0, "&NotDoubleVerticalBar;"], [0, "&and;"], [0, "&or;"], [0, { v: "&cap;", n: 65024, o: "&caps;" }], [0, { v: "&cup;", n: 65024, o: "&cups;" }], [0, "&int;"], [0, "&Int;"], [0, "&iiint;"], [0, "&conint;"], [0, "&Conint;"], [0, "&Cconint;"], [0, "&cwint;"], [0, "&ClockwiseContourIntegral;"], [0, "&awconint;"], [0, "&there4;"], [0, "&becaus;"], [0, "&ratio;"], [0, "&Colon;"], [0, "&dotminus;"], [1, "&mDDot;"], [0, "&homtht;"], [0, { v: "&sim;", n: 8402, o: "&nvsim;" }], [0, { v: "&backsim;", n: 817, o: "&race;" }], [0, { v: "&ac;", n: 819, o: "&acE;" }], [0, "&acd;"], [0, "&VerticalTilde;"], [0, "&NotTilde;"], [0, { v: "&eqsim;", n: 824, o: "&nesim;" }], [0, "&sime;"], [0, "&NotTildeEqual;"], [0, "&cong;"], [0, "&simne;"], [0, "&ncong;"], [0, "&ap;"], [0, "&nap;"], [0, "&ape;"], [0, { v: "&apid;", n: 824, o: "&napid;" }], [0, "&backcong;"], [0, { v: "&asympeq;", n: 8402, o: "&nvap;" }], [0, { v: "&bump;", n: 824, o: "&nbump;" }], [0, { v: "&bumpe;", n: 824, o: "&nbumpe;" }], [0, { v: "&doteq;", n: 824, o: "&nedot;" }], [0, "&doteqdot;"], [0, "&efDot;"], [0, "&erDot;"], [0, "&Assign;"], [0, "&ecolon;"], [0, "&ecir;"], [0, "&circeq;"], [1, "&wedgeq;"], [0, "&veeeq;"], [1, "&triangleq;"], [2, "&equest;"], [0, "&ne;"], [0, { v: "&Congruent;", n: 8421, o: "&bnequiv;" }], [0, "&nequiv;"], [1, { v: "&le;", n: 8402, o: "&nvle;" }], [0, { v: "&ge;", n: 8402, o: "&nvge;" }], [0, { v: "&lE;", n: 824, o: "&nlE;" }], [0, { v: "&gE;", n: 824, o: "&ngE;" }], [0, { v: "&lnE;", n: 65024, o: "&lvertneqq;" }], [0, { v: "&gnE;", n: 65024, o: "&gvertneqq;" }], [0, { v: "&ll;", n: new Map(/* @__PURE__ */ restoreDiff([[824, "&nLtv;"], [7577, "&nLt;"]])) }], [0, { v: "&gg;", n: new Map(/* @__PURE__ */ restoreDiff([[824, "&nGtv;"], [7577, "&nGt;"]])) }], [0, "&between;"], [0, "&NotCupCap;"], [0, "&nless;"], [0, "&ngt;"], [0, "&nle;"], [0, "&nge;"], [0, "&lesssim;"], [0, "&GreaterTilde;"], [0, "&nlsim;"], [0, "&ngsim;"], [0, "&LessGreater;"], [0, "&gl;"], [0, "&NotLessGreater;"], [0, "&NotGreaterLess;"], [0, "&pr;"], [0, "&sc;"], [0, "&prcue;"], [0, "&sccue;"], [0, "&PrecedesTilde;"], [0, { v: "&scsim;", n: 824, o: "&NotSucceedsTilde;" }], [0, "&NotPrecedes;"], [0, "&NotSucceeds;"], [0, { v: "&sub;", n: 8402, o: "&NotSubset;" }], [0, { v: "&sup;", n: 8402, o: "&NotSuperset;" }], [0, "&nsub;"], [0, "&nsup;"], [0, "&sube;"], [0, "&supe;"], [0, "&NotSubsetEqual;"], [0, "&NotSupersetEqual;"], [0, { v: "&subne;", n: 65024, o: "&varsubsetneq;" }], [0, { v: "&supne;", n: 65024, o: "&varsupsetneq;" }], [1, "&cupdot;"], [0, "&UnionPlus;"], [0, { v: "&sqsub;", n: 824, o: "&NotSquareSubset;" }], [0, { v: "&sqsup;", n: 824, o: "&NotSquareSuperset;" }], [0, "&sqsube;"], [0, "&sqsupe;"], [0, { v: "&sqcap;", n: 65024, o: "&sqcaps;" }], [0, { v: "&sqcup;", n: 65024, o: "&sqcups;" }], [0, "&CirclePlus;"], [0, "&CircleMinus;"], [0, "&CircleTimes;"], [0, "&osol;"], [0, "&CircleDot;"], [0, "&circledcirc;"], [0, "&circledast;"], [1, "&circleddash;"], [0, "&boxplus;"], [0, "&boxminus;"], [0, "&boxtimes;"], [0, "&dotsquare;"], [0, "&RightTee;"], [0, "&dashv;"], [0, "&DownTee;"], [0, "&bot;"], [1, "&models;"], [0, "&DoubleRightTee;"], [0, "&Vdash;"], [0, "&Vvdash;"], [0, "&VDash;"], [0, "&nvdash;"], [0, "&nvDash;"], [0, "&nVdash;"], [0, "&nVDash;"], [0, "&prurel;"], [1, "&LeftTriangle;"], [0, "&RightTriangle;"], [0, { v: "&LeftTriangleEqual;", n: 8402, o: "&nvltrie;" }], [0, { v: "&RightTriangleEqual;", n: 8402, o: "&nvrtrie;" }], [0, "&origof;"], [0, "&imof;"], [0, "&multimap;"], [0, "&hercon;"], [0, "&intcal;"], [0, "&veebar;"], [1, "&barvee;"], [0, "&angrtvb;"], [0, "&lrtri;"], [0, "&bigwedge;"], [0, "&bigvee;"], [0, "&bigcap;"], [0, "&bigcup;"], [0, "&diam;"], [0, "&sdot;"], [0, "&sstarf;"], [0, "&divideontimes;"], [0, "&bowtie;"], [0, "&ltimes;"], [0, "&rtimes;"], [0, "&leftthreetimes;"], [0, "&rightthreetimes;"], [0, "&backsimeq;"], [0, "&curlyvee;"], [0, "&curlywedge;"], [0, "&Sub;"], [0, "&Sup;"], [0, "&Cap;"], [0, "&Cup;"], [0, "&fork;"], [0, "&epar;"], [0, "&lessdot;"], [0, "&gtdot;"], [0, { v: "&Ll;", n: 824, o: "&nLl;" }], [0, { v: "&Gg;", n: 824, o: "&nGg;" }], [0, { v: "&leg;", n: 65024, o: "&lesg;" }], [0, { v: "&gel;", n: 65024, o: "&gesl;" }], [2, "&cuepr;"], [0, "&cuesc;"], [0, "&NotPrecedesSlantEqual;"], [0, "&NotSucceedsSlantEqual;"], [0, "&NotSquareSubsetEqual;"], [0, "&NotSquareSupersetEqual;"], [2, "&lnsim;"], [0, "&gnsim;"], [0, "&precnsim;"], [0, "&scnsim;"], [0, "&nltri;"], [0, "&NotRightTriangle;"], [0, "&nltrie;"], [0, "&NotRightTriangleEqual;"], [0, "&vellip;"], [0, "&ctdot;"], [0, "&utdot;"], [0, "&dtdot;"], [0, "&disin;"], [0, "&isinsv;"], [0, "&isins;"], [0, { v: "&isindot;", n: 824, o: "&notindot;" }], [0, "&notinvc;"], [0, "&notinvb;"], [1, { v: "&isinE;", n: 824, o: "&notinE;" }], [0, "&nisd;"], [0, "&xnis;"], [0, "&nis;"], [0, "&notnivc;"], [0, "&notnivb;"], [6, "&barwed;"], [0, "&Barwed;"], [1, "&lceil;"], [0, "&rceil;"], [0, "&LeftFloor;"], [0, "&rfloor;"], [0, "&drcrop;"], [0, "&dlcrop;"], [0, "&urcrop;"], [0, "&ulcrop;"], [0, "&bnot;"], [1, "&profline;"], [0, "&profsurf;"], [1, "&telrec;"], [0, "&target;"], [5, "&ulcorn;"], [0, "&urcorn;"], [0, "&dlcorn;"], [0, "&drcorn;"], [2, "&frown;"], [0, "&smile;"], [9, "&cylcty;"], [0, "&profalar;"], [7, "&topbot;"], [6, "&ovbar;"], [1, "&solbar;"], [60, "&angzarr;"], [51, "&lmoustache;"], [0, "&rmoustache;"], [2, "&OverBracket;"], [0, "&bbrk;"], [0, "&bbrktbrk;"], [37, "&OverParenthesis;"], [0, "&UnderParenthesis;"], [0, "&OverBrace;"], [0, "&UnderBrace;"], [2, "&trpezium;"], [4, "&elinters;"], [59, "&blank;"], [164, "&circledS;"], [55, "&boxh;"], [1, "&boxv;"], [9, "&boxdr;"], [3, "&boxdl;"], [3, "&boxur;"], [3, "&boxul;"], [3, "&boxvr;"], [7, "&boxvl;"], [7, "&boxhd;"], [7, "&boxhu;"], [7, "&boxvh;"], [19, "&boxH;"], [0, "&boxV;"], [0, "&boxdR;"], [0, "&boxDr;"], [0, "&boxDR;"], [0, "&boxdL;"], [0, "&boxDl;"], [0, "&boxDL;"], [0, "&boxuR;"], [0, "&boxUr;"], [0, "&boxUR;"], [0, "&boxuL;"], [0, "&boxUl;"], [0, "&boxUL;"], [0, "&boxvR;"], [0, "&boxVr;"], [0, "&boxVR;"], [0, "&boxvL;"], [0, "&boxVl;"], [0, "&boxVL;"], [0, "&boxHd;"], [0, "&boxhD;"], [0, "&boxHD;"], [0, "&boxHu;"], [0, "&boxhU;"], [0, "&boxHU;"], [0, "&boxvH;"], [0, "&boxVh;"], [0, "&boxVH;"], [19, "&uhblk;"], [3, "&lhblk;"], [3, "&block;"], [8, "&blk14;"], [0, "&blk12;"], [0, "&blk34;"], [13, "&square;"], [8, "&blacksquare;"], [0, "&EmptyVerySmallSquare;"], [1, "&rect;"], [0, "&marker;"], [2, "&fltns;"], [1, "&bigtriangleup;"], [0, "&blacktriangle;"], [0, "&triangle;"], [2, "&blacktriangleright;"], [0, "&rtri;"], [3, "&bigtriangledown;"], [0, "&blacktriangledown;"], [0, "&dtri;"], [2, "&blacktriangleleft;"], [0, "&ltri;"], [6, "&loz;"], [0, "&cir;"], [32, "&tridot;"], [2, "&bigcirc;"], [8, "&ultri;"], [0, "&urtri;"], [0, "&lltri;"], [0, "&EmptySmallSquare;"], [0, "&FilledSmallSquare;"], [8, "&bigstar;"], [0, "&star;"], [7, "&phone;"], [49, "&female;"], [1, "&male;"], [29, "&spades;"], [2, "&clubs;"], [1, "&hearts;"], [0, "&diamondsuit;"], [3, "&sung;"], [2, "&flat;"], [0, "&natural;"], [0, "&sharp;"], [163, "&check;"], [3, "&cross;"], [8, "&malt;"], [21, "&sext;"], [33, "&VerticalSeparator;"], [25, "&lbbrk;"], [0, "&rbbrk;"], [84, "&bsolhsub;"], [0, "&suphsol;"], [28, "&LeftDoubleBracket;"], [0, "&RightDoubleBracket;"], [0, "&lang;"], [0, "&rang;"], [0, "&Lang;"], [0, "&Rang;"], [0, "&loang;"], [0, "&roang;"], [7, "&longleftarrow;"], [0, "&longrightarrow;"], [0, "&longleftrightarrow;"], [0, "&DoubleLongLeftArrow;"], [0, "&DoubleLongRightArrow;"], [0, "&DoubleLongLeftRightArrow;"], [1, "&longmapsto;"], [2, "&dzigrarr;"], [258, "&nvlArr;"], [0, "&nvrArr;"], [0, "&nvHarr;"], [0, "&Map;"], [6, "&lbarr;"], [0, "&bkarow;"], [0, "&lBarr;"], [0, "&dbkarow;"], [0, "&drbkarow;"], [0, "&DDotrahd;"], [0, "&UpArrowBar;"], [0, "&DownArrowBar;"], [2, "&Rarrtl;"], [2, "&latail;"], [0, "&ratail;"], [0, "&lAtail;"], [0, "&rAtail;"], [0, "&larrfs;"], [0, "&rarrfs;"], [0, "&larrbfs;"], [0, "&rarrbfs;"], [2, "&nwarhk;"], [0, "&nearhk;"], [0, "&hksearow;"], [0, "&hkswarow;"], [0, "&nwnear;"], [0, "&nesear;"], [0, "&seswar;"], [0, "&swnwar;"], [8, { v: "&rarrc;", n: 824, o: "&nrarrc;" }], [1, "&cudarrr;"], [0, "&ldca;"], [0, "&rdca;"], [0, "&cudarrl;"], [0, "&larrpl;"], [2, "&curarrm;"], [0, "&cularrp;"], [7, "&rarrpl;"], [2, "&harrcir;"], [0, "&Uarrocir;"], [0, "&lurdshar;"], [0, "&ldrushar;"], [2, "&LeftRightVector;"], [0, "&RightUpDownVector;"], [0, "&DownLeftRightVector;"], [0, "&LeftUpDownVector;"], [0, "&LeftVectorBar;"], [0, "&RightVectorBar;"], [0, "&RightUpVectorBar;"], [0, "&RightDownVectorBar;"], [0, "&DownLeftVectorBar;"], [0, "&DownRightVectorBar;"], [0, "&LeftUpVectorBar;"], [0, "&LeftDownVectorBar;"], [0, "&LeftTeeVector;"], [0, "&RightTeeVector;"], [0, "&RightUpTeeVector;"], [0, "&RightDownTeeVector;"], [0, "&DownLeftTeeVector;"], [0, "&DownRightTeeVector;"], [0, "&LeftUpTeeVector;"], [0, "&LeftDownTeeVector;"], [0, "&lHar;"], [0, "&uHar;"], [0, "&rHar;"], [0, "&dHar;"], [0, "&luruhar;"], [0, "&ldrdhar;"], [0, "&ruluhar;"], [0, "&rdldhar;"], [0, "&lharul;"], [0, "&llhard;"], [0, "&rharul;"], [0, "&lrhard;"], [0, "&udhar;"], [0, "&duhar;"], [0, "&RoundImplies;"], [0, "&erarr;"], [0, "&simrarr;"], [0, "&larrsim;"], [0, "&rarrsim;"], [0, "&rarrap;"], [0, "&ltlarr;"], [1, "&gtrarr;"], [0, "&subrarr;"], [1, "&suplarr;"], [0, "&lfisht;"], [0, "&rfisht;"], [0, "&ufisht;"], [0, "&dfisht;"], [5, "&lopar;"], [0, "&ropar;"], [4, "&lbrke;"], [0, "&rbrke;"], [0, "&lbrkslu;"], [0, "&rbrksld;"], [0, "&lbrksld;"], [0, "&rbrkslu;"], [0, "&langd;"], [0, "&rangd;"], [0, "&lparlt;"], [0, "&rpargt;"], [0, "&gtlPar;"], [0, "&ltrPar;"], [3, "&vzigzag;"], [1, "&vangrt;"], [0, "&angrtvbd;"], [6, "&ange;"], [0, "&range;"], [0, "&dwangle;"], [0, "&uwangle;"], [0, "&angmsdaa;"], [0, "&angmsdab;"], [0, "&angmsdac;"], [0, "&angmsdad;"], [0, "&angmsdae;"], [0, "&angmsdaf;"], [0, "&angmsdag;"], [0, "&angmsdah;"], [0, "&bemptyv;"], [0, "&demptyv;"], [0, "&cemptyv;"], [0, "&raemptyv;"], [0, "&laemptyv;"], [0, "&ohbar;"], [0, "&omid;"], [0, "&opar;"], [1, "&operp;"], [1, "&olcross;"], [0, "&odsold;"], [1, "&olcir;"], [0, "&ofcir;"], [0, "&olt;"], [0, "&ogt;"], [0, "&cirscir;"], [0, "&cirE;"], [0, "&solb;"], [0, "&bsolb;"], [3, "&boxbox;"], [3, "&trisb;"], [0, "&rtriltri;"], [0, { v: "&LeftTriangleBar;", n: 824, o: "&NotLeftTriangleBar;" }], [0, { v: "&RightTriangleBar;", n: 824, o: "&NotRightTriangleBar;" }], [11, "&iinfin;"], [0, "&infintie;"], [0, "&nvinfin;"], [4, "&eparsl;"], [0, "&smeparsl;"], [0, "&eqvparsl;"], [5, "&blacklozenge;"], [8, "&RuleDelayed;"], [1, "&dsol;"], [9, "&bigodot;"], [0, "&bigoplus;"], [0, "&bigotimes;"], [1, "&biguplus;"], [1, "&bigsqcup;"], [5, "&iiiint;"], [0, "&fpartint;"], [2, "&cirfnint;"], [0, "&awint;"], [0, "&rppolint;"], [0, "&scpolint;"], [0, "&npolint;"], [0, "&pointint;"], [0, "&quatint;"], [0, "&intlarhk;"], [10, "&pluscir;"], [0, "&plusacir;"], [0, "&simplus;"], [0, "&plusdu;"], [0, "&plussim;"], [0, "&plustwo;"], [1, "&mcomma;"], [0, "&minusdu;"], [2, "&loplus;"], [0, "&roplus;"], [0, "&Cross;"], [0, "&timesd;"], [0, "&timesbar;"], [1, "&smashp;"], [0, "&lotimes;"], [0, "&rotimes;"], [0, "&otimesas;"], [0, "&Otimes;"], [0, "&odiv;"], [0, "&triplus;"], [0, "&triminus;"], [0, "&tritime;"], [0, "&intprod;"], [2, "&amalg;"], [0, "&capdot;"], [1, "&ncup;"], [0, "&ncap;"], [0, "&capand;"], [0, "&cupor;"], [0, "&cupcap;"], [0, "&capcup;"], [0, "&cupbrcap;"], [0, "&capbrcup;"], [0, "&cupcup;"], [0, "&capcap;"], [0, "&ccups;"], [0, "&ccaps;"], [2, "&ccupssm;"], [2, "&And;"], [0, "&Or;"], [0, "&andand;"], [0, "&oror;"], [0, "&orslope;"], [0, "&andslope;"], [1, "&andv;"], [0, "&orv;"], [0, "&andd;"], [0, "&ord;"], [1, "&wedbar;"], [6, "&sdote;"], [3, "&simdot;"], [2, { v: "&congdot;", n: 824, o: "&ncongdot;" }], [0, "&easter;"], [0, "&apacir;"], [0, { v: "&apE;", n: 824, o: "&napE;" }], [0, "&eplus;"], [0, "&pluse;"], [0, "&Esim;"], [0, "&Colone;"], [0, "&Equal;"], [1, "&ddotseq;"], [0, "&equivDD;"], [0, "&ltcir;"], [0, "&gtcir;"], [0, "&ltquest;"], [0, "&gtquest;"], [0, { v: "&leqslant;", n: 824, o: "&nleqslant;" }], [0, { v: "&geqslant;", n: 824, o: "&ngeqslant;" }], [0, "&lesdot;"], [0, "&gesdot;"], [0, "&lesdoto;"], [0, "&gesdoto;"], [0, "&lesdotor;"], [0, "&gesdotol;"], [0, "&lap;"], [0, "&gap;"], [0, "&lne;"], [0, "&gne;"], [0, "&lnap;"], [0, "&gnap;"], [0, "&lEg;"], [0, "&gEl;"], [0, "&lsime;"], [0, "&gsime;"], [0, "&lsimg;"], [0, "&gsiml;"], [0, "&lgE;"], [0, "&glE;"], [0, "&lesges;"], [0, "&gesles;"], [0, "&els;"], [0, "&egs;"], [0, "&elsdot;"], [0, "&egsdot;"], [0, "&el;"], [0, "&eg;"], [2, "&siml;"], [0, "&simg;"], [0, "&simlE;"], [0, "&simgE;"], [0, { v: "&LessLess;", n: 824, o: "&NotNestedLessLess;" }], [0, { v: "&GreaterGreater;", n: 824, o: "&NotNestedGreaterGreater;" }], [1, "&glj;"], [0, "&gla;"], [0, "&ltcc;"], [0, "&gtcc;"], [0, "&lescc;"], [0, "&gescc;"], [0, "&smt;"], [0, "&lat;"], [0, { v: "&smte;", n: 65024, o: "&smtes;" }], [0, { v: "&late;", n: 65024, o: "&lates;" }], [0, "&bumpE;"], [0, { v: "&PrecedesEqual;", n: 824, o: "&NotPrecedesEqual;" }], [0, { v: "&sce;", n: 824, o: "&NotSucceedsEqual;" }], [2, "&prE;"], [0, "&scE;"], [0, "&precneqq;"], [0, "&scnE;"], [0, "&prap;"], [0, "&scap;"], [0, "&precnapprox;"], [0, "&scnap;"], [0, "&Pr;"], [0, "&Sc;"], [0, "&subdot;"], [0, "&supdot;"], [0, "&subplus;"], [0, "&supplus;"], [0, "&submult;"], [0, "&supmult;"], [0, "&subedot;"], [0, "&supedot;"], [0, { v: "&subE;", n: 824, o: "&nsubE;" }], [0, { v: "&supE;", n: 824, o: "&nsupE;" }], [0, "&subsim;"], [0, "&supsim;"], [2, { v: "&subnE;", n: 65024, o: "&varsubsetneqq;" }], [0, { v: "&supnE;", n: 65024, o: "&varsupsetneqq;" }], [2, "&csub;"], [0, "&csup;"], [0, "&csube;"], [0, "&csupe;"], [0, "&subsup;"], [0, "&supsub;"], [0, "&subsub;"], [0, "&supsup;"], [0, "&suphsub;"], [0, "&supdsub;"], [0, "&forkv;"], [0, "&topfork;"], [0, "&mlcp;"], [8, "&Dashv;"], [1, "&Vdashl;"], [0, "&Barv;"], [0, "&vBar;"], [0, "&vBarv;"], [1, "&Vbar;"], [0, "&Not;"], [0, "&bNot;"], [0, "&rnmid;"], [0, "&cirmid;"], [0, "&midcir;"], [0, "&topcir;"], [0, "&nhpar;"], [0, "&parsim;"], [9, { v: "&parsl;", n: 8421, o: "&nparsl;" }], [44343, { n: new Map(/* @__PURE__ */ restoreDiff([[56476, "&Ascr;"], [1, "&Cscr;"], [0, "&Dscr;"], [2, "&Gscr;"], [2, "&Jscr;"], [0, "&Kscr;"], [2, "&Nscr;"], [0, "&Oscr;"], [0, "&Pscr;"], [0, "&Qscr;"], [1, "&Sscr;"], [0, "&Tscr;"], [0, "&Uscr;"], [0, "&Vscr;"], [0, "&Wscr;"], [0, "&Xscr;"], [0, "&Yscr;"], [0, "&Zscr;"], [0, "&ascr;"], [0, "&bscr;"], [0, "&cscr;"], [0, "&dscr;"], [1, "&fscr;"], [1, "&hscr;"], [0, "&iscr;"], [0, "&jscr;"], [0, "&kscr;"], [0, "&lscr;"], [0, "&mscr;"], [0, "&nscr;"], [1, "&pscr;"], [0, "&qscr;"], [0, "&rscr;"], [0, "&sscr;"], [0, "&tscr;"], [0, "&uscr;"], [0, "&vscr;"], [0, "&wscr;"], [0, "&xscr;"], [0, "&yscr;"], [0, "&zscr;"], [52, "&Afr;"], [0, "&Bfr;"], [1, "&Dfr;"], [0, "&Efr;"], [0, "&Ffr;"], [0, "&Gfr;"], [2, "&Jfr;"], [0, "&Kfr;"], [0, "&Lfr;"], [0, "&Mfr;"], [0, "&Nfr;"], [0, "&Ofr;"], [0, "&Pfr;"], [0, "&Qfr;"], [1, "&Sfr;"], [0, "&Tfr;"], [0, "&Ufr;"], [0, "&Vfr;"], [0, "&Wfr;"], [0, "&Xfr;"], [0, "&Yfr;"], [1, "&afr;"], [0, "&bfr;"], [0, "&cfr;"], [0, "&dfr;"], [0, "&efr;"], [0, "&ffr;"], [0, "&gfr;"], [0, "&hfr;"], [0, "&ifr;"], [0, "&jfr;"], [0, "&kfr;"], [0, "&lfr;"], [0, "&mfr;"], [0, "&nfr;"], [0, "&ofr;"], [0, "&pfr;"], [0, "&qfr;"], [0, "&rfr;"], [0, "&sfr;"], [0, "&tfr;"], [0, "&ufr;"], [0, "&vfr;"], [0, "&wfr;"], [0, "&xfr;"], [0, "&yfr;"], [0, "&zfr;"], [0, "&Aopf;"], [0, "&Bopf;"], [1, "&Dopf;"], [0, "&Eopf;"], [0, "&Fopf;"], [0, "&Gopf;"], [1, "&Iopf;"], [0, "&Jopf;"], [0, "&Kopf;"], [0, "&Lopf;"], [0, "&Mopf;"], [1, "&Oopf;"], [3, "&Sopf;"], [0, "&Topf;"], [0, "&Uopf;"], [0, "&Vopf;"], [0, "&Wopf;"], [0, "&Xopf;"], [0, "&Yopf;"], [1, "&aopf;"], [0, "&bopf;"], [0, "&copf;"], [0, "&dopf;"], [0, "&eopf;"], [0, "&fopf;"], [0, "&gopf;"], [0, "&hopf;"], [0, "&iopf;"], [0, "&jopf;"], [0, "&kopf;"], [0, "&lopf;"], [0, "&mopf;"], [0, "&nopf;"], [0, "&oopf;"], [0, "&popf;"], [0, "&qopf;"], [0, "&ropf;"], [0, "&sopf;"], [0, "&topf;"], [0, "&uopf;"], [0, "&vopf;"], [0, "&wopf;"], [0, "&xopf;"], [0, "&yopf;"], [0, "&zopf;"]])) }], [8906, "&fflig;"], [0, "&filig;"], [0, "&fllig;"], [0, "&ffilig;"], [0, "&ffllig;"]]));
  }
});

// node_modules/entities/lib/escape.js
var require_escape = __commonJS({
  "node_modules/entities/lib/escape.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.escapeText = exports2.escapeAttribute = exports2.escapeUTF8 = exports2.escape = exports2.encodeXML = exports2.getCodePoint = exports2.xmlReplacer = void 0;
    exports2.xmlReplacer = /["&'<>$\x80-\uFFFF]/g;
    var xmlCodeMap = /* @__PURE__ */ new Map([
      [34, "&quot;"],
      [38, "&amp;"],
      [39, "&apos;"],
      [60, "&lt;"],
      [62, "&gt;"]
    ]);
    exports2.getCodePoint = // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    String.prototype.codePointAt != null ? function(str, index) {
      return str.codePointAt(index);
    } : (
      // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
      function(c, index) {
        return (c.charCodeAt(index) & 64512) === 55296 ? (c.charCodeAt(index) - 55296) * 1024 + c.charCodeAt(index + 1) - 56320 + 65536 : c.charCodeAt(index);
      }
    );
    function encodeXML(str) {
      var ret = "";
      var lastIdx = 0;
      var match;
      while ((match = exports2.xmlReplacer.exec(str)) !== null) {
        var i = match.index;
        var char = str.charCodeAt(i);
        var next = xmlCodeMap.get(char);
        if (next !== void 0) {
          ret += str.substring(lastIdx, i) + next;
          lastIdx = i + 1;
        } else {
          ret += "".concat(str.substring(lastIdx, i), "&#x").concat((0, exports2.getCodePoint)(str, i).toString(16), ";");
          lastIdx = exports2.xmlReplacer.lastIndex += Number((char & 64512) === 55296);
        }
      }
      return ret + str.substr(lastIdx);
    }
    exports2.encodeXML = encodeXML;
    exports2.escape = encodeXML;
    function getEscaper(regex, map2) {
      return function escape(data) {
        var match;
        var lastIdx = 0;
        var result = "";
        while (match = regex.exec(data)) {
          if (lastIdx !== match.index) {
            result += data.substring(lastIdx, match.index);
          }
          result += map2.get(match[0].charCodeAt(0));
          lastIdx = match.index + 1;
        }
        return result + data.substring(lastIdx);
      };
    }
    exports2.escapeUTF8 = getEscaper(/[&<>'"]/g, xmlCodeMap);
    exports2.escapeAttribute = getEscaper(/["&\u00A0]/g, /* @__PURE__ */ new Map([
      [34, "&quot;"],
      [38, "&amp;"],
      [160, "&nbsp;"]
    ]));
    exports2.escapeText = getEscaper(/[&<>\u00A0]/g, /* @__PURE__ */ new Map([
      [38, "&amp;"],
      [60, "&lt;"],
      [62, "&gt;"],
      [160, "&nbsp;"]
    ]));
  }
});

// node_modules/entities/lib/encode.js
var require_encode = __commonJS({
  "node_modules/entities/lib/encode.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.encodeNonAsciiHTML = exports2.encodeHTML = void 0;
    var encode_html_js_1 = __importDefault(require_encode_html());
    var escape_js_1 = require_escape();
    var htmlReplacer = /[\t\n!-,./:-@[-`\f{-}$\x80-\uFFFF]/g;
    function encodeHTML(data) {
      return encodeHTMLTrieRe(htmlReplacer, data);
    }
    exports2.encodeHTML = encodeHTML;
    function encodeNonAsciiHTML(data) {
      return encodeHTMLTrieRe(escape_js_1.xmlReplacer, data);
    }
    exports2.encodeNonAsciiHTML = encodeNonAsciiHTML;
    function encodeHTMLTrieRe(regExp, str) {
      var ret = "";
      var lastIdx = 0;
      var match;
      while ((match = regExp.exec(str)) !== null) {
        var i = match.index;
        ret += str.substring(lastIdx, i);
        var char = str.charCodeAt(i);
        var next = encode_html_js_1.default.get(char);
        if (typeof next === "object") {
          if (i + 1 < str.length) {
            var nextChar = str.charCodeAt(i + 1);
            var value = typeof next.n === "number" ? next.n === nextChar ? next.o : void 0 : next.n.get(nextChar);
            if (value !== void 0) {
              ret += value;
              lastIdx = regExp.lastIndex += 1;
              continue;
            }
          }
          next = next.v;
        }
        if (next !== void 0) {
          ret += next;
          lastIdx = i + 1;
        } else {
          var cp = (0, escape_js_1.getCodePoint)(str, i);
          ret += "&#x".concat(cp.toString(16), ";");
          lastIdx = regExp.lastIndex += Number(cp !== char);
        }
      }
      return ret + str.substr(lastIdx);
    }
  }
});

// node_modules/entities/lib/index.js
var require_lib = __commonJS({
  "node_modules/entities/lib/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.decodeXMLStrict = exports2.decodeHTML5Strict = exports2.decodeHTML4Strict = exports2.decodeHTML5 = exports2.decodeHTML4 = exports2.decodeHTMLAttribute = exports2.decodeHTMLStrict = exports2.decodeHTML = exports2.decodeXML = exports2.DecodingMode = exports2.EntityDecoder = exports2.encodeHTML5 = exports2.encodeHTML4 = exports2.encodeNonAsciiHTML = exports2.encodeHTML = exports2.escapeText = exports2.escapeAttribute = exports2.escapeUTF8 = exports2.escape = exports2.encodeXML = exports2.encode = exports2.decodeStrict = exports2.decode = exports2.EncodingMode = exports2.EntityLevel = void 0;
    var decode_js_1 = require_decode();
    var encode_js_1 = require_encode();
    var escape_js_1 = require_escape();
    var EntityLevel;
    (function(EntityLevel2) {
      EntityLevel2[EntityLevel2["XML"] = 0] = "XML";
      EntityLevel2[EntityLevel2["HTML"] = 1] = "HTML";
    })(EntityLevel = exports2.EntityLevel || (exports2.EntityLevel = {}));
    var EncodingMode;
    (function(EncodingMode2) {
      EncodingMode2[EncodingMode2["UTF8"] = 0] = "UTF8";
      EncodingMode2[EncodingMode2["ASCII"] = 1] = "ASCII";
      EncodingMode2[EncodingMode2["Extensive"] = 2] = "Extensive";
      EncodingMode2[EncodingMode2["Attribute"] = 3] = "Attribute";
      EncodingMode2[EncodingMode2["Text"] = 4] = "Text";
    })(EncodingMode = exports2.EncodingMode || (exports2.EncodingMode = {}));
    function decode2(data, options) {
      if (options === void 0) {
        options = EntityLevel.XML;
      }
      var level = typeof options === "number" ? options : options.level;
      if (level === EntityLevel.HTML) {
        var mode = typeof options === "object" ? options.mode : void 0;
        return (0, decode_js_1.decodeHTML)(data, mode);
      }
      return (0, decode_js_1.decodeXML)(data);
    }
    exports2.decode = decode2;
    function decodeStrict(data, options) {
      var _a;
      if (options === void 0) {
        options = EntityLevel.XML;
      }
      var opts = typeof options === "number" ? { level: options } : options;
      (_a = opts.mode) !== null && _a !== void 0 ? _a : opts.mode = decode_js_1.DecodingMode.Strict;
      return decode2(data, opts);
    }
    exports2.decodeStrict = decodeStrict;
    function encode2(data, options) {
      if (options === void 0) {
        options = EntityLevel.XML;
      }
      var opts = typeof options === "number" ? { level: options } : options;
      if (opts.mode === EncodingMode.UTF8)
        return (0, escape_js_1.escapeUTF8)(data);
      if (opts.mode === EncodingMode.Attribute)
        return (0, escape_js_1.escapeAttribute)(data);
      if (opts.mode === EncodingMode.Text)
        return (0, escape_js_1.escapeText)(data);
      if (opts.level === EntityLevel.HTML) {
        if (opts.mode === EncodingMode.ASCII) {
          return (0, encode_js_1.encodeNonAsciiHTML)(data);
        }
        return (0, encode_js_1.encodeHTML)(data);
      }
      return (0, escape_js_1.encodeXML)(data);
    }
    exports2.encode = encode2;
    var escape_js_2 = require_escape();
    Object.defineProperty(exports2, "encodeXML", { enumerable: true, get: function() {
      return escape_js_2.encodeXML;
    } });
    Object.defineProperty(exports2, "escape", { enumerable: true, get: function() {
      return escape_js_2.escape;
    } });
    Object.defineProperty(exports2, "escapeUTF8", { enumerable: true, get: function() {
      return escape_js_2.escapeUTF8;
    } });
    Object.defineProperty(exports2, "escapeAttribute", { enumerable: true, get: function() {
      return escape_js_2.escapeAttribute;
    } });
    Object.defineProperty(exports2, "escapeText", { enumerable: true, get: function() {
      return escape_js_2.escapeText;
    } });
    var encode_js_2 = require_encode();
    Object.defineProperty(exports2, "encodeHTML", { enumerable: true, get: function() {
      return encode_js_2.encodeHTML;
    } });
    Object.defineProperty(exports2, "encodeNonAsciiHTML", { enumerable: true, get: function() {
      return encode_js_2.encodeNonAsciiHTML;
    } });
    Object.defineProperty(exports2, "encodeHTML4", { enumerable: true, get: function() {
      return encode_js_2.encodeHTML;
    } });
    Object.defineProperty(exports2, "encodeHTML5", { enumerable: true, get: function() {
      return encode_js_2.encodeHTML;
    } });
    var decode_js_2 = require_decode();
    Object.defineProperty(exports2, "EntityDecoder", { enumerable: true, get: function() {
      return decode_js_2.EntityDecoder;
    } });
    Object.defineProperty(exports2, "DecodingMode", { enumerable: true, get: function() {
      return decode_js_2.DecodingMode;
    } });
    Object.defineProperty(exports2, "decodeXML", { enumerable: true, get: function() {
      return decode_js_2.decodeXML;
    } });
    Object.defineProperty(exports2, "decodeHTML", { enumerable: true, get: function() {
      return decode_js_2.decodeHTML;
    } });
    Object.defineProperty(exports2, "decodeHTMLStrict", { enumerable: true, get: function() {
      return decode_js_2.decodeHTMLStrict;
    } });
    Object.defineProperty(exports2, "decodeHTMLAttribute", { enumerable: true, get: function() {
      return decode_js_2.decodeHTMLAttribute;
    } });
    Object.defineProperty(exports2, "decodeHTML4", { enumerable: true, get: function() {
      return decode_js_2.decodeHTML;
    } });
    Object.defineProperty(exports2, "decodeHTML5", { enumerable: true, get: function() {
      return decode_js_2.decodeHTML;
    } });
    Object.defineProperty(exports2, "decodeHTML4Strict", { enumerable: true, get: function() {
      return decode_js_2.decodeHTMLStrict;
    } });
    Object.defineProperty(exports2, "decodeHTML5Strict", { enumerable: true, get: function() {
      return decode_js_2.decodeHTMLStrict;
    } });
    Object.defineProperty(exports2, "decodeXMLStrict", { enumerable: true, get: function() {
      return decode_js_2.decodeXML;
    } });
  }
});

// node_modules/linkify-it/build/index.cjs.js
var require_index_cjs3 = __commonJS({
  "node_modules/linkify-it/build/index.cjs.js"(exports2, module2) {
    "use strict";
    var uc_micro = require_index_cjs2();
    function reFactory(opts) {
      const re = {};
      opts = opts || {};
      re.src_Any = uc_micro.Any.source;
      re.src_Cc = uc_micro.Cc.source;
      re.src_Z = uc_micro.Z.source;
      re.src_P = uc_micro.P.source;
      re.src_ZPCc = [re.src_Z, re.src_P, re.src_Cc].join("|");
      re.src_ZCc = [re.src_Z, re.src_Cc].join("|");
      const text_separators = "[><\uFF5C]";
      re.src_pseudo_letter = "(?:(?!" + text_separators + "|" + re.src_ZPCc + ")" + re.src_Any + ")";
      re.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
      re.src_auth = "(?:(?:(?!" + re.src_ZCc + "|[@/\\[\\]()]).)+@)?";
      re.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?";
      re.src_host_terminator = "(?=$|" + text_separators + "|" + re.src_ZPCc + ")(?!" + (opts["---"] ? "-(?!--)|" : "-|") + "_|:\\d|\\.-|\\.(?!$|" + re.src_ZPCc + "))";
      re.src_path = "(?:[/?#](?:(?!" + re.src_ZCc + "|" + text_separators + `|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!` + re.src_ZCc + "|\\]).)*\\]|\\((?:(?!" + re.src_ZCc + "|[)]).)*\\)|\\{(?:(?!" + re.src_ZCc + '|[}]).)*\\}|\\"(?:(?!' + re.src_ZCc + `|["]).)+\\"|\\'(?:(?!` + re.src_ZCc + "|[']).)+\\'|\\'(?=" + re.src_pseudo_letter + "|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!" + re.src_ZCc + "|[.]|$)|" + (opts["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + // allow `,,,` in paths
      ",(?!" + re.src_ZCc + "|$)|;(?!" + re.src_ZCc + "|$)|\\!+(?!" + re.src_ZCc + "|[!]|$)|\\?(?!" + re.src_ZCc + "|[?]|$))+|\\/)?";
      re.src_email_name = '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*';
      re.src_xn = "xn--[a-z0-9\\-]{1,59}";
      re.src_domain_root = // Allow letters & digits (http://test1)
      "(?:" + re.src_xn + "|" + re.src_pseudo_letter + "{1,63})";
      re.src_domain = "(?:" + re.src_xn + "|(?:" + re.src_pseudo_letter + ")|(?:" + re.src_pseudo_letter + "(?:-|" + re.src_pseudo_letter + "){0,61}" + re.src_pseudo_letter + "))";
      re.src_host = "(?:(?:(?:(?:" + re.src_domain + ")\\.)*" + re.src_domain + "))";
      re.tpl_host_fuzzy = "(?:" + re.src_ip4 + "|(?:(?:(?:" + re.src_domain + ")\\.)+(?:%TLDS%)))";
      re.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + re.src_domain + ")\\.)+(?:%TLDS%))";
      re.src_host_strict = re.src_host + re.src_host_terminator;
      re.tpl_host_fuzzy_strict = re.tpl_host_fuzzy + re.src_host_terminator;
      re.src_host_port_strict = re.src_host + re.src_port + re.src_host_terminator;
      re.tpl_host_port_fuzzy_strict = re.tpl_host_fuzzy + re.src_port + re.src_host_terminator;
      re.tpl_host_port_no_ip_fuzzy_strict = re.tpl_host_no_ip_fuzzy + re.src_port + re.src_host_terminator;
      re.tpl_host_fuzzy_test = "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + re.src_ZPCc + "|>|$))";
      re.tpl_email_fuzzy = "(^|" + text_separators + '|"|\\(|' + re.src_ZCc + ")(" + re.src_email_name + "@" + re.tpl_host_fuzzy_strict + ")";
      re.tpl_link_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
      // but can start with > (markdown blockquote)
      "(^|(?![.:/\\-_@])(?:[$+<=>^`|\uFF5C]|" + re.src_ZPCc + "))((?![$+<=>^`|\uFF5C])" + re.tpl_host_port_fuzzy_strict + re.src_path + ")";
      re.tpl_link_no_ip_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
      // but can start with > (markdown blockquote)
      "(^|(?![.:/\\-_@])(?:[$+<=>^`|\uFF5C]|" + re.src_ZPCc + "))((?![$+<=>^`|\uFF5C])" + re.tpl_host_port_no_ip_fuzzy_strict + re.src_path + ")";
      return re;
    }
    function assign(obj) {
      const sources = Array.prototype.slice.call(arguments, 1);
      sources.forEach(function(source) {
        if (!source) {
          return;
        }
        Object.keys(source).forEach(function(key) {
          obj[key] = source[key];
        });
      });
      return obj;
    }
    function _class(obj) {
      return Object.prototype.toString.call(obj);
    }
    function isString(obj) {
      return _class(obj) === "[object String]";
    }
    function isObject(obj) {
      return _class(obj) === "[object Object]";
    }
    function isRegExp(obj) {
      return _class(obj) === "[object RegExp]";
    }
    function isFunction(obj) {
      return _class(obj) === "[object Function]";
    }
    function escapeRE(str) {
      return str.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
    }
    var defaultOptions = {
      fuzzyLink: true,
      fuzzyEmail: true,
      fuzzyIP: false
    };
    function isOptionsObj(obj) {
      return Object.keys(obj || {}).reduce(function(acc, k) {
        return acc || defaultOptions.hasOwnProperty(k);
      }, false);
    }
    var defaultSchemas = {
      "http:": {
        validate: function(text, pos, self) {
          const tail = text.slice(pos);
          if (!self.re.http) {
            self.re.http = new RegExp(
              "^\\/\\/" + self.re.src_auth + self.re.src_host_port_strict + self.re.src_path,
              "i"
            );
          }
          if (self.re.http.test(tail)) {
            return tail.match(self.re.http)[0].length;
          }
          return 0;
        }
      },
      "https:": "http:",
      "ftp:": "http:",
      "//": {
        validate: function(text, pos, self) {
          const tail = text.slice(pos);
          if (!self.re.no_http) {
            self.re.no_http = new RegExp(
              "^" + self.re.src_auth + // Don't allow single-level domains, because of false positives like '//test'
              // with code comments
              "(?:localhost|(?:(?:" + self.re.src_domain + ")\\.)+" + self.re.src_domain_root + ")" + self.re.src_port + self.re.src_host_terminator + self.re.src_path,
              "i"
            );
          }
          if (self.re.no_http.test(tail)) {
            if (pos >= 3 && text[pos - 3] === ":") {
              return 0;
            }
            if (pos >= 3 && text[pos - 3] === "/") {
              return 0;
            }
            return tail.match(self.re.no_http)[0].length;
          }
          return 0;
        }
      },
      "mailto:": {
        validate: function(text, pos, self) {
          const tail = text.slice(pos);
          if (!self.re.mailto) {
            self.re.mailto = new RegExp(
              "^" + self.re.src_email_name + "@" + self.re.src_host_strict,
              "i"
            );
          }
          if (self.re.mailto.test(tail)) {
            return tail.match(self.re.mailto)[0].length;
          }
          return 0;
        }
      }
    };
    var tlds_2ch_src_re = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]";
    var tlds_default = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|\u0440\u0444".split("|");
    function resetScanCache(self) {
      self.__index__ = -1;
      self.__text_cache__ = "";
    }
    function createValidator(re) {
      return function(text, pos) {
        const tail = text.slice(pos);
        if (re.test(tail)) {
          return tail.match(re)[0].length;
        }
        return 0;
      };
    }
    function createNormalizer() {
      return function(match, self) {
        self.normalize(match);
      };
    }
    function compile(self) {
      const re = self.re = reFactory(self.__opts__);
      const tlds = self.__tlds__.slice();
      self.onCompile();
      if (!self.__tlds_replaced__) {
        tlds.push(tlds_2ch_src_re);
      }
      tlds.push(re.src_xn);
      re.src_tlds = tlds.join("|");
      function untpl(tpl) {
        return tpl.replace("%TLDS%", re.src_tlds);
      }
      re.email_fuzzy = RegExp(untpl(re.tpl_email_fuzzy), "i");
      re.link_fuzzy = RegExp(untpl(re.tpl_link_fuzzy), "i");
      re.link_no_ip_fuzzy = RegExp(untpl(re.tpl_link_no_ip_fuzzy), "i");
      re.host_fuzzy_test = RegExp(untpl(re.tpl_host_fuzzy_test), "i");
      const aliases = [];
      self.__compiled__ = {};
      function schemaError(name, val) {
        throw new Error('(LinkifyIt) Invalid schema "' + name + '": ' + val);
      }
      Object.keys(self.__schemas__).forEach(function(name) {
        const val = self.__schemas__[name];
        if (val === null) {
          return;
        }
        const compiled = { validate: null, link: null };
        self.__compiled__[name] = compiled;
        if (isObject(val)) {
          if (isRegExp(val.validate)) {
            compiled.validate = createValidator(val.validate);
          } else if (isFunction(val.validate)) {
            compiled.validate = val.validate;
          } else {
            schemaError(name, val);
          }
          if (isFunction(val.normalize)) {
            compiled.normalize = val.normalize;
          } else if (!val.normalize) {
            compiled.normalize = createNormalizer();
          } else {
            schemaError(name, val);
          }
          return;
        }
        if (isString(val)) {
          aliases.push(name);
          return;
        }
        schemaError(name, val);
      });
      aliases.forEach(function(alias) {
        if (!self.__compiled__[self.__schemas__[alias]]) {
          return;
        }
        self.__compiled__[alias].validate = self.__compiled__[self.__schemas__[alias]].validate;
        self.__compiled__[alias].normalize = self.__compiled__[self.__schemas__[alias]].normalize;
      });
      self.__compiled__[""] = { validate: null, normalize: createNormalizer() };
      const slist = Object.keys(self.__compiled__).filter(function(name) {
        return name.length > 0 && self.__compiled__[name];
      }).map(escapeRE).join("|");
      self.re.schema_test = RegExp("(^|(?!_)(?:[><\uFF5C]|" + re.src_ZPCc + "))(" + slist + ")", "i");
      self.re.schema_search = RegExp("(^|(?!_)(?:[><\uFF5C]|" + re.src_ZPCc + "))(" + slist + ")", "ig");
      self.re.schema_at_start = RegExp("^" + self.re.schema_search.source, "i");
      self.re.pretest = RegExp(
        "(" + self.re.schema_test.source + ")|(" + self.re.host_fuzzy_test.source + ")|@",
        "i"
      );
      resetScanCache(self);
    }
    function Match(self, shift) {
      const start = self.__index__;
      const end = self.__last_index__;
      const text = self.__text_cache__.slice(start, end);
      this.schema = self.__schema__.toLowerCase();
      this.index = start + shift;
      this.lastIndex = end + shift;
      this.raw = text;
      this.text = text;
      this.url = text;
    }
    function createMatch(self, shift) {
      const match = new Match(self, shift);
      self.__compiled__[match.schema].normalize(match, self);
      return match;
    }
    function LinkifyIt(schemas, options) {
      if (!(this instanceof LinkifyIt)) {
        return new LinkifyIt(schemas, options);
      }
      if (!options) {
        if (isOptionsObj(schemas)) {
          options = schemas;
          schemas = {};
        }
      }
      this.__opts__ = assign({}, defaultOptions, options);
      this.__index__ = -1;
      this.__last_index__ = -1;
      this.__schema__ = "";
      this.__text_cache__ = "";
      this.__schemas__ = assign({}, defaultSchemas, schemas);
      this.__compiled__ = {};
      this.__tlds__ = tlds_default;
      this.__tlds_replaced__ = false;
      this.re = {};
      compile(this);
    }
    LinkifyIt.prototype.add = function add(schema, definition) {
      this.__schemas__[schema] = definition;
      compile(this);
      return this;
    };
    LinkifyIt.prototype.set = function set(options) {
      this.__opts__ = assign(this.__opts__, options);
      return this;
    };
    LinkifyIt.prototype.test = function test(text) {
      this.__text_cache__ = text;
      this.__index__ = -1;
      if (!text.length) {
        return false;
      }
      let m, ml, me, len, shift, next, re, tld_pos, at_pos;
      if (this.re.schema_test.test(text)) {
        re = this.re.schema_search;
        re.lastIndex = 0;
        while ((m = re.exec(text)) !== null) {
          len = this.testSchemaAt(text, m[2], re.lastIndex);
          if (len) {
            this.__schema__ = m[2];
            this.__index__ = m.index + m[1].length;
            this.__last_index__ = m.index + m[0].length + len;
            break;
          }
        }
      }
      if (this.__opts__.fuzzyLink && this.__compiled__["http:"]) {
        tld_pos = text.search(this.re.host_fuzzy_test);
        if (tld_pos >= 0) {
          if (this.__index__ < 0 || tld_pos < this.__index__) {
            if ((ml = text.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null) {
              shift = ml.index + ml[1].length;
              if (this.__index__ < 0 || shift < this.__index__) {
                this.__schema__ = "";
                this.__index__ = shift;
                this.__last_index__ = ml.index + ml[0].length;
              }
            }
          }
        }
      }
      if (this.__opts__.fuzzyEmail && this.__compiled__["mailto:"]) {
        at_pos = text.indexOf("@");
        if (at_pos >= 0) {
          if ((me = text.match(this.re.email_fuzzy)) !== null) {
            shift = me.index + me[1].length;
            next = me.index + me[0].length;
            if (this.__index__ < 0 || shift < this.__index__ || shift === this.__index__ && next > this.__last_index__) {
              this.__schema__ = "mailto:";
              this.__index__ = shift;
              this.__last_index__ = next;
            }
          }
        }
      }
      return this.__index__ >= 0;
    };
    LinkifyIt.prototype.pretest = function pretest(text) {
      return this.re.pretest.test(text);
    };
    LinkifyIt.prototype.testSchemaAt = function testSchemaAt(text, schema, pos) {
      if (!this.__compiled__[schema.toLowerCase()]) {
        return 0;
      }
      return this.__compiled__[schema.toLowerCase()].validate(text, pos, this);
    };
    LinkifyIt.prototype.match = function match(text) {
      const result = [];
      let shift = 0;
      if (this.__index__ >= 0 && this.__text_cache__ === text) {
        result.push(createMatch(this, shift));
        shift = this.__last_index__;
      }
      let tail = shift ? text.slice(shift) : text;
      while (this.test(tail)) {
        result.push(createMatch(this, shift));
        tail = tail.slice(this.__last_index__);
        shift += this.__last_index__;
      }
      if (result.length) {
        return result;
      }
      return null;
    };
    LinkifyIt.prototype.matchAtStart = function matchAtStart(text) {
      this.__text_cache__ = text;
      this.__index__ = -1;
      if (!text.length)
        return null;
      const m = this.re.schema_at_start.exec(text);
      if (!m)
        return null;
      const len = this.testSchemaAt(text, m[2], m[0].length);
      if (!len)
        return null;
      this.__schema__ = m[2];
      this.__index__ = m.index + m[1].length;
      this.__last_index__ = m.index + m[0].length + len;
      return createMatch(this, 0);
    };
    LinkifyIt.prototype.tlds = function tlds(list, keepOld) {
      list = Array.isArray(list) ? list : [list];
      if (!keepOld) {
        this.__tlds__ = list.slice();
        this.__tlds_replaced__ = true;
        compile(this);
        return this;
      }
      this.__tlds__ = this.__tlds__.concat(list).sort().filter(function(el, idx, arr) {
        return el !== arr[idx - 1];
      }).reverse();
      compile(this);
      return this;
    };
    LinkifyIt.prototype.normalize = function normalize(match) {
      if (!match.schema) {
        match.url = "http://" + match.url;
      }
      if (match.schema === "mailto:" && !/^mailto:/i.test(match.url)) {
        match.url = "mailto:" + match.url;
      }
    };
    LinkifyIt.prototype.onCompile = function onCompile() {
    };
    module2.exports = LinkifyIt;
  }
});

// node_modules/punycode.js/punycode.es6.js
var punycode_es6_exports = {};
__export(punycode_es6_exports, {
  decode: () => decode,
  default: () => punycode_es6_default,
  encode: () => encode,
  toASCII: () => toASCII,
  toUnicode: () => toUnicode,
  ucs2decode: () => ucs2decode,
  ucs2encode: () => ucs2encode
});
function error(type) {
  throw new RangeError(errors[type]);
}
function map(array, callback) {
  const result = [];
  let length = array.length;
  while (length--) {
    result[length] = callback(array[length]);
  }
  return result;
}
function mapDomain(domain, callback) {
  const parts = domain.split("@");
  let result = "";
  if (parts.length > 1) {
    result = parts[0] + "@";
    domain = parts[1];
  }
  domain = domain.replace(regexSeparators, ".");
  const labels = domain.split(".");
  const encoded = map(labels, callback).join(".");
  return result + encoded;
}
function ucs2decode(string) {
  const output = [];
  let counter = 0;
  const length = string.length;
  while (counter < length) {
    const value = string.charCodeAt(counter++);
    if (value >= 55296 && value <= 56319 && counter < length) {
      const extra = string.charCodeAt(counter++);
      if ((extra & 64512) == 56320) {
        output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
      } else {
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }
  return output;
}
var maxInt, base, tMin, tMax, skew, damp, initialBias, initialN, delimiter, regexPunycode, regexNonASCII, regexSeparators, errors, baseMinusTMin, floor, stringFromCharCode, ucs2encode, basicToDigit, digitToBasic, adapt, decode, encode, toUnicode, toASCII, punycode, punycode_es6_default;
var init_punycode_es6 = __esm({
  "node_modules/punycode.js/punycode.es6.js"() {
    "use strict";
    maxInt = 2147483647;
    base = 36;
    tMin = 1;
    tMax = 26;
    skew = 38;
    damp = 700;
    initialBias = 72;
    initialN = 128;
    delimiter = "-";
    regexPunycode = /^xn--/;
    regexNonASCII = /[^\0-\x7F]/;
    regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;
    errors = {
      "overflow": "Overflow: input needs wider integers to process",
      "not-basic": "Illegal input >= 0x80 (not a basic code point)",
      "invalid-input": "Invalid input"
    };
    baseMinusTMin = base - tMin;
    floor = Math.floor;
    stringFromCharCode = String.fromCharCode;
    ucs2encode = (codePoints) => String.fromCodePoint(...codePoints);
    basicToDigit = function(codePoint) {
      if (codePoint >= 48 && codePoint < 58) {
        return 26 + (codePoint - 48);
      }
      if (codePoint >= 65 && codePoint < 91) {
        return codePoint - 65;
      }
      if (codePoint >= 97 && codePoint < 123) {
        return codePoint - 97;
      }
      return base;
    };
    digitToBasic = function(digit, flag) {
      return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
    };
    adapt = function(delta, numPoints, firstTime) {
      let k = 0;
      delta = firstTime ? floor(delta / damp) : delta >> 1;
      delta += floor(delta / numPoints);
      for (; delta > baseMinusTMin * tMax >> 1; k += base) {
        delta = floor(delta / baseMinusTMin);
      }
      return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
    };
    decode = function(input) {
      const output = [];
      const inputLength = input.length;
      let i = 0;
      let n = initialN;
      let bias = initialBias;
      let basic = input.lastIndexOf(delimiter);
      if (basic < 0) {
        basic = 0;
      }
      for (let j = 0; j < basic; ++j) {
        if (input.charCodeAt(j) >= 128) {
          error("not-basic");
        }
        output.push(input.charCodeAt(j));
      }
      for (let index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
        const oldi = i;
        for (let w = 1, k = base; ; k += base) {
          if (index >= inputLength) {
            error("invalid-input");
          }
          const digit = basicToDigit(input.charCodeAt(index++));
          if (digit >= base) {
            error("invalid-input");
          }
          if (digit > floor((maxInt - i) / w)) {
            error("overflow");
          }
          i += digit * w;
          const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
          if (digit < t) {
            break;
          }
          const baseMinusT = base - t;
          if (w > floor(maxInt / baseMinusT)) {
            error("overflow");
          }
          w *= baseMinusT;
        }
        const out = output.length + 1;
        bias = adapt(i - oldi, out, oldi == 0);
        if (floor(i / out) > maxInt - n) {
          error("overflow");
        }
        n += floor(i / out);
        i %= out;
        output.splice(i++, 0, n);
      }
      return String.fromCodePoint(...output);
    };
    encode = function(input) {
      const output = [];
      input = ucs2decode(input);
      const inputLength = input.length;
      let n = initialN;
      let delta = 0;
      let bias = initialBias;
      for (const currentValue of input) {
        if (currentValue < 128) {
          output.push(stringFromCharCode(currentValue));
        }
      }
      const basicLength = output.length;
      let handledCPCount = basicLength;
      if (basicLength) {
        output.push(delimiter);
      }
      while (handledCPCount < inputLength) {
        let m = maxInt;
        for (const currentValue of input) {
          if (currentValue >= n && currentValue < m) {
            m = currentValue;
          }
        }
        const handledCPCountPlusOne = handledCPCount + 1;
        if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
          error("overflow");
        }
        delta += (m - n) * handledCPCountPlusOne;
        n = m;
        for (const currentValue of input) {
          if (currentValue < n && ++delta > maxInt) {
            error("overflow");
          }
          if (currentValue === n) {
            let q = delta;
            for (let k = base; ; k += base) {
              const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
              if (q < t) {
                break;
              }
              const qMinusT = q - t;
              const baseMinusT = base - t;
              output.push(
                stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
              );
              q = floor(qMinusT / baseMinusT);
            }
            output.push(stringFromCharCode(digitToBasic(q, 0)));
            bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
            delta = 0;
            ++handledCPCount;
          }
        }
        ++delta;
        ++n;
      }
      return output.join("");
    };
    toUnicode = function(input) {
      return mapDomain(input, function(string) {
        return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
      });
    };
    toASCII = function(input) {
      return mapDomain(input, function(string) {
        return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
      });
    };
    punycode = {
      /**
       * A string representing the current Punycode.js version number.
       * @memberOf punycode
       * @type String
       */
      "version": "2.3.1",
      /**
       * An object of methods to convert from JavaScript's internal character
       * representation (UCS-2) to Unicode code points, and back.
       * @see <https://mathiasbynens.be/notes/javascript-encoding>
       * @memberOf punycode
       * @type Object
       */
      "ucs2": {
        "decode": ucs2decode,
        "encode": ucs2encode
      },
      "decode": decode,
      "encode": encode,
      "toASCII": toASCII,
      "toUnicode": toUnicode
    };
    punycode_es6_default = punycode;
  }
});

// node_modules/markdown-it/dist/index.cjs.js
var require_index_cjs4 = __commonJS({
  "node_modules/markdown-it/dist/index.cjs.js"(exports2, module2) {
    "use strict";
    var mdurl = require_index_cjs();
    var ucmicro = require_index_cjs2();
    var entities = require_lib();
    var LinkifyIt = require_index_cjs3();
    var punycode2 = (init_punycode_es6(), __toCommonJS(punycode_es6_exports));
    function _interopNamespaceDefault(e) {
      var n = /* @__PURE__ */ Object.create(null);
      if (e) {
        Object.keys(e).forEach(function(k) {
          if (k !== "default") {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: function() {
                return e[k];
              }
            });
          }
        });
      }
      n.default = e;
      return Object.freeze(n);
    }
    var mdurl__namespace = /* @__PURE__ */ _interopNamespaceDefault(mdurl);
    var ucmicro__namespace = /* @__PURE__ */ _interopNamespaceDefault(ucmicro);
    function _class(obj) {
      return Object.prototype.toString.call(obj);
    }
    function isString(obj) {
      return _class(obj) === "[object String]";
    }
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    function has(object, key) {
      return _hasOwnProperty.call(object, key);
    }
    function assign(obj) {
      const sources = Array.prototype.slice.call(arguments, 1);
      sources.forEach(function(source) {
        if (!source) {
          return;
        }
        if (typeof source !== "object") {
          throw new TypeError(source + "must be object");
        }
        Object.keys(source).forEach(function(key) {
          obj[key] = source[key];
        });
      });
      return obj;
    }
    function arrayReplaceAt(src, pos, newElements) {
      return [].concat(src.slice(0, pos), newElements, src.slice(pos + 1));
    }
    function isValidEntityCode(c) {
      if (c >= 55296 && c <= 57343) {
        return false;
      }
      if (c >= 64976 && c <= 65007) {
        return false;
      }
      if ((c & 65535) === 65535 || (c & 65535) === 65534) {
        return false;
      }
      if (c >= 0 && c <= 8) {
        return false;
      }
      if (c === 11) {
        return false;
      }
      if (c >= 14 && c <= 31) {
        return false;
      }
      if (c >= 127 && c <= 159) {
        return false;
      }
      if (c > 1114111) {
        return false;
      }
      return true;
    }
    function fromCodePoint(c) {
      if (c > 65535) {
        c -= 65536;
        const surrogate1 = 55296 + (c >> 10);
        const surrogate2 = 56320 + (c & 1023);
        return String.fromCharCode(surrogate1, surrogate2);
      }
      return String.fromCharCode(c);
    }
    var UNESCAPE_MD_RE = /\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g;
    var ENTITY_RE = /&([a-z#][a-z0-9]{1,31});/gi;
    var UNESCAPE_ALL_RE = new RegExp(UNESCAPE_MD_RE.source + "|" + ENTITY_RE.source, "gi");
    var DIGITAL_ENTITY_TEST_RE = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;
    function replaceEntityPattern(match, name) {
      if (name.charCodeAt(0) === 35 && DIGITAL_ENTITY_TEST_RE.test(name)) {
        const code2 = name[1].toLowerCase() === "x" ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);
        if (isValidEntityCode(code2)) {
          return fromCodePoint(code2);
        }
        return match;
      }
      const decoded = entities.decodeHTML(match);
      if (decoded !== match) {
        return decoded;
      }
      return match;
    }
    function unescapeMd(str) {
      if (str.indexOf("\\") < 0) {
        return str;
      }
      return str.replace(UNESCAPE_MD_RE, "$1");
    }
    function unescapeAll(str) {
      if (str.indexOf("\\") < 0 && str.indexOf("&") < 0) {
        return str;
      }
      return str.replace(UNESCAPE_ALL_RE, function(match, escaped, entity2) {
        if (escaped) {
          return escaped;
        }
        return replaceEntityPattern(match, entity2);
      });
    }
    var HTML_ESCAPE_TEST_RE = /[&<>"]/;
    var HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
    var HTML_REPLACEMENTS = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;"
    };
    function replaceUnsafeChar(ch) {
      return HTML_REPLACEMENTS[ch];
    }
    function escapeHtml(str) {
      if (HTML_ESCAPE_TEST_RE.test(str)) {
        return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
      }
      return str;
    }
    var REGEXP_ESCAPE_RE = /[.?*+^$[\]\\(){}|-]/g;
    function escapeRE(str) {
      return str.replace(REGEXP_ESCAPE_RE, "\\$&");
    }
    function isSpace(code2) {
      switch (code2) {
        case 9:
        case 32:
          return true;
      }
      return false;
    }
    function isWhiteSpace2(code2) {
      if (code2 >= 8192 && code2 <= 8202) {
        return true;
      }
      switch (code2) {
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 32:
        case 160:
        case 5760:
        case 8239:
        case 8287:
        case 12288:
          return true;
      }
      return false;
    }
    function isPunctChar(ch) {
      return ucmicro__namespace.P.test(ch) || ucmicro__namespace.S.test(ch);
    }
    function isMdAsciiPunct(ch) {
      switch (ch) {
        case 33:
        case 34:
        case 35:
        case 36:
        case 37:
        case 38:
        case 39:
        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
        case 45:
        case 46:
        case 47:
        case 58:
        case 59:
        case 60:
        case 61:
        case 62:
        case 63:
        case 64:
        case 91:
        case 92:
        case 93:
        case 94:
        case 95:
        case 96:
        case 123:
        case 124:
        case 125:
        case 126:
          return true;
        default:
          return false;
      }
    }
    function normalizeReference(str) {
      str = str.trim().replace(/\s+/g, " ");
      if ("\u1E9E".toLowerCase() === "\u1E7E") {
        str = str.replace(/ẞ/g, "\xDF");
      }
      return str.toLowerCase().toUpperCase();
    }
    var lib = {
      mdurl: mdurl__namespace,
      ucmicro: ucmicro__namespace
    };
    var utils = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      arrayReplaceAt,
      assign,
      escapeHtml,
      escapeRE,
      fromCodePoint,
      has,
      isMdAsciiPunct,
      isPunctChar,
      isSpace,
      isString,
      isValidEntityCode,
      isWhiteSpace: isWhiteSpace2,
      lib,
      normalizeReference,
      unescapeAll,
      unescapeMd
    });
    function parseLinkLabel(state, start, disableNested) {
      let level, found, marker, prevPos;
      const max = state.posMax;
      const oldPos = state.pos;
      state.pos = start + 1;
      level = 1;
      while (state.pos < max) {
        marker = state.src.charCodeAt(state.pos);
        if (marker === 93) {
          level--;
          if (level === 0) {
            found = true;
            break;
          }
        }
        prevPos = state.pos;
        state.md.inline.skipToken(state);
        if (marker === 91) {
          if (prevPos === state.pos - 1) {
            level++;
          } else if (disableNested) {
            state.pos = oldPos;
            return -1;
          }
        }
      }
      let labelEnd = -1;
      if (found) {
        labelEnd = state.pos;
      }
      state.pos = oldPos;
      return labelEnd;
    }
    function parseLinkDestination(str, start, max) {
      let code2;
      let pos = start;
      const result = {
        ok: false,
        pos: 0,
        str: ""
      };
      if (str.charCodeAt(pos) === 60) {
        pos++;
        while (pos < max) {
          code2 = str.charCodeAt(pos);
          if (code2 === 10) {
            return result;
          }
          if (code2 === 60) {
            return result;
          }
          if (code2 === 62) {
            result.pos = pos + 1;
            result.str = unescapeAll(str.slice(start + 1, pos));
            result.ok = true;
            return result;
          }
          if (code2 === 92 && pos + 1 < max) {
            pos += 2;
            continue;
          }
          pos++;
        }
        return result;
      }
      let level = 0;
      while (pos < max) {
        code2 = str.charCodeAt(pos);
        if (code2 === 32) {
          break;
        }
        if (code2 < 32 || code2 === 127) {
          break;
        }
        if (code2 === 92 && pos + 1 < max) {
          if (str.charCodeAt(pos + 1) === 32) {
            break;
          }
          pos += 2;
          continue;
        }
        if (code2 === 40) {
          level++;
          if (level > 32) {
            return result;
          }
        }
        if (code2 === 41) {
          if (level === 0) {
            break;
          }
          level--;
        }
        pos++;
      }
      if (start === pos) {
        return result;
      }
      if (level !== 0) {
        return result;
      }
      result.str = unescapeAll(str.slice(start, pos));
      result.pos = pos;
      result.ok = true;
      return result;
    }
    function parseLinkTitle(str, start, max, prev_state) {
      let code2;
      let pos = start;
      const state = {
        // if `true`, this is a valid link title
        ok: false,
        // if `true`, this link can be continued on the next line
        can_continue: false,
        // if `ok`, it's the position of the first character after the closing marker
        pos: 0,
        // if `ok`, it's the unescaped title
        str: "",
        // expected closing marker character code
        marker: 0
      };
      if (prev_state) {
        state.str = prev_state.str;
        state.marker = prev_state.marker;
      } else {
        if (pos >= max) {
          return state;
        }
        let marker = str.charCodeAt(pos);
        if (marker !== 34 && marker !== 39 && marker !== 40) {
          return state;
        }
        start++;
        pos++;
        if (marker === 40) {
          marker = 41;
        }
        state.marker = marker;
      }
      while (pos < max) {
        code2 = str.charCodeAt(pos);
        if (code2 === state.marker) {
          state.pos = pos + 1;
          state.str += unescapeAll(str.slice(start, pos));
          state.ok = true;
          return state;
        } else if (code2 === 40 && state.marker === 41) {
          return state;
        } else if (code2 === 92 && pos + 1 < max) {
          pos++;
        }
        pos++;
      }
      state.can_continue = true;
      state.str += unescapeAll(str.slice(start, pos));
      return state;
    }
    var helpers = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      parseLinkDestination,
      parseLinkLabel,
      parseLinkTitle
    });
    var default_rules = {};
    default_rules.code_inline = function(tokens, idx, options, env, slf) {
      const token = tokens[idx];
      return "<code" + slf.renderAttrs(token) + ">" + escapeHtml(token.content) + "</code>";
    };
    default_rules.code_block = function(tokens, idx, options, env, slf) {
      const token = tokens[idx];
      return "<pre" + slf.renderAttrs(token) + "><code>" + escapeHtml(tokens[idx].content) + "</code></pre>\n";
    };
    default_rules.fence = function(tokens, idx, options, env, slf) {
      const token = tokens[idx];
      const info = token.info ? unescapeAll(token.info).trim() : "";
      let langName = "";
      let langAttrs = "";
      if (info) {
        const arr = info.split(/(\s+)/g);
        langName = arr[0];
        langAttrs = arr.slice(2).join("");
      }
      let highlighted;
      if (options.highlight) {
        highlighted = options.highlight(token.content, langName, langAttrs) || escapeHtml(token.content);
      } else {
        highlighted = escapeHtml(token.content);
      }
      if (highlighted.indexOf("<pre") === 0) {
        return highlighted + "\n";
      }
      if (info) {
        const i = token.attrIndex("class");
        const tmpAttrs = token.attrs ? token.attrs.slice() : [];
        if (i < 0) {
          tmpAttrs.push(["class", options.langPrefix + langName]);
        } else {
          tmpAttrs[i] = tmpAttrs[i].slice();
          tmpAttrs[i][1] += " " + options.langPrefix + langName;
        }
        const tmpToken = {
          attrs: tmpAttrs
        };
        return `<pre><code${slf.renderAttrs(tmpToken)}>${highlighted}</code></pre>
`;
      }
      return `<pre><code${slf.renderAttrs(token)}>${highlighted}</code></pre>
`;
    };
    default_rules.image = function(tokens, idx, options, env, slf) {
      const token = tokens[idx];
      token.attrs[token.attrIndex("alt")][1] = slf.renderInlineAsText(token.children, options, env);
      return slf.renderToken(tokens, idx, options);
    };
    default_rules.hardbreak = function(tokens, idx, options) {
      return options.xhtmlOut ? "<br />\n" : "<br>\n";
    };
    default_rules.softbreak = function(tokens, idx, options) {
      return options.breaks ? options.xhtmlOut ? "<br />\n" : "<br>\n" : "\n";
    };
    default_rules.text = function(tokens, idx) {
      return escapeHtml(tokens[idx].content);
    };
    default_rules.html_block = function(tokens, idx) {
      return tokens[idx].content;
    };
    default_rules.html_inline = function(tokens, idx) {
      return tokens[idx].content;
    };
    function Renderer() {
      this.rules = assign({}, default_rules);
    }
    Renderer.prototype.renderAttrs = function renderAttrs(token) {
      let i, l, result;
      if (!token.attrs) {
        return "";
      }
      result = "";
      for (i = 0, l = token.attrs.length; i < l; i++) {
        result += " " + escapeHtml(token.attrs[i][0]) + '="' + escapeHtml(token.attrs[i][1]) + '"';
      }
      return result;
    };
    Renderer.prototype.renderToken = function renderToken(tokens, idx, options) {
      const token = tokens[idx];
      let result = "";
      if (token.hidden) {
        return "";
      }
      if (token.block && token.nesting !== -1 && idx && tokens[idx - 1].hidden) {
        result += "\n";
      }
      result += (token.nesting === -1 ? "</" : "<") + token.tag;
      result += this.renderAttrs(token);
      if (token.nesting === 0 && options.xhtmlOut) {
        result += " /";
      }
      let needLf = false;
      if (token.block) {
        needLf = true;
        if (token.nesting === 1) {
          if (idx + 1 < tokens.length) {
            const nextToken = tokens[idx + 1];
            if (nextToken.type === "inline" || nextToken.hidden) {
              needLf = false;
            } else if (nextToken.nesting === -1 && nextToken.tag === token.tag) {
              needLf = false;
            }
          }
        }
      }
      result += needLf ? ">\n" : ">";
      return result;
    };
    Renderer.prototype.renderInline = function(tokens, options, env) {
      let result = "";
      const rules = this.rules;
      for (let i = 0, len = tokens.length; i < len; i++) {
        const type = tokens[i].type;
        if (typeof rules[type] !== "undefined") {
          result += rules[type](tokens, i, options, env, this);
        } else {
          result += this.renderToken(tokens, i, options);
        }
      }
      return result;
    };
    Renderer.prototype.renderInlineAsText = function(tokens, options, env) {
      let result = "";
      for (let i = 0, len = tokens.length; i < len; i++) {
        switch (tokens[i].type) {
          case "text":
            result += tokens[i].content;
            break;
          case "image":
            result += this.renderInlineAsText(tokens[i].children, options, env);
            break;
          case "html_inline":
          case "html_block":
            result += tokens[i].content;
            break;
          case "softbreak":
          case "hardbreak":
            result += "\n";
            break;
        }
      }
      return result;
    };
    Renderer.prototype.render = function(tokens, options, env) {
      let result = "";
      const rules = this.rules;
      for (let i = 0, len = tokens.length; i < len; i++) {
        const type = tokens[i].type;
        if (type === "inline") {
          result += this.renderInline(tokens[i].children, options, env);
        } else if (typeof rules[type] !== "undefined") {
          result += rules[type](tokens, i, options, env, this);
        } else {
          result += this.renderToken(tokens, i, options, env);
        }
      }
      return result;
    };
    function Ruler() {
      this.__rules__ = [];
      this.__cache__ = null;
    }
    Ruler.prototype.__find__ = function(name) {
      for (let i = 0; i < this.__rules__.length; i++) {
        if (this.__rules__[i].name === name) {
          return i;
        }
      }
      return -1;
    };
    Ruler.prototype.__compile__ = function() {
      const self = this;
      const chains = [""];
      self.__rules__.forEach(function(rule) {
        if (!rule.enabled) {
          return;
        }
        rule.alt.forEach(function(altName) {
          if (chains.indexOf(altName) < 0) {
            chains.push(altName);
          }
        });
      });
      self.__cache__ = {};
      chains.forEach(function(chain) {
        self.__cache__[chain] = [];
        self.__rules__.forEach(function(rule) {
          if (!rule.enabled) {
            return;
          }
          if (chain && rule.alt.indexOf(chain) < 0) {
            return;
          }
          self.__cache__[chain].push(rule.fn);
        });
      });
    };
    Ruler.prototype.at = function(name, fn, options) {
      const index = this.__find__(name);
      const opt = options || {};
      if (index === -1) {
        throw new Error("Parser rule not found: " + name);
      }
      this.__rules__[index].fn = fn;
      this.__rules__[index].alt = opt.alt || [];
      this.__cache__ = null;
    };
    Ruler.prototype.before = function(beforeName, ruleName, fn, options) {
      const index = this.__find__(beforeName);
      const opt = options || {};
      if (index === -1) {
        throw new Error("Parser rule not found: " + beforeName);
      }
      this.__rules__.splice(index, 0, {
        name: ruleName,
        enabled: true,
        fn,
        alt: opt.alt || []
      });
      this.__cache__ = null;
    };
    Ruler.prototype.after = function(afterName, ruleName, fn, options) {
      const index = this.__find__(afterName);
      const opt = options || {};
      if (index === -1) {
        throw new Error("Parser rule not found: " + afterName);
      }
      this.__rules__.splice(index + 1, 0, {
        name: ruleName,
        enabled: true,
        fn,
        alt: opt.alt || []
      });
      this.__cache__ = null;
    };
    Ruler.prototype.push = function(ruleName, fn, options) {
      const opt = options || {};
      this.__rules__.push({
        name: ruleName,
        enabled: true,
        fn,
        alt: opt.alt || []
      });
      this.__cache__ = null;
    };
    Ruler.prototype.enable = function(list2, ignoreInvalid) {
      if (!Array.isArray(list2)) {
        list2 = [list2];
      }
      const result = [];
      list2.forEach(function(name) {
        const idx = this.__find__(name);
        if (idx < 0) {
          if (ignoreInvalid) {
            return;
          }
          throw new Error("Rules manager: invalid rule name " + name);
        }
        this.__rules__[idx].enabled = true;
        result.push(name);
      }, this);
      this.__cache__ = null;
      return result;
    };
    Ruler.prototype.enableOnly = function(list2, ignoreInvalid) {
      if (!Array.isArray(list2)) {
        list2 = [list2];
      }
      this.__rules__.forEach(function(rule) {
        rule.enabled = false;
      });
      this.enable(list2, ignoreInvalid);
    };
    Ruler.prototype.disable = function(list2, ignoreInvalid) {
      if (!Array.isArray(list2)) {
        list2 = [list2];
      }
      const result = [];
      list2.forEach(function(name) {
        const idx = this.__find__(name);
        if (idx < 0) {
          if (ignoreInvalid) {
            return;
          }
          throw new Error("Rules manager: invalid rule name " + name);
        }
        this.__rules__[idx].enabled = false;
        result.push(name);
      }, this);
      this.__cache__ = null;
      return result;
    };
    Ruler.prototype.getRules = function(chainName) {
      if (this.__cache__ === null) {
        this.__compile__();
      }
      return this.__cache__[chainName] || [];
    };
    function Token(type, tag, nesting) {
      this.type = type;
      this.tag = tag;
      this.attrs = null;
      this.map = null;
      this.nesting = nesting;
      this.level = 0;
      this.children = null;
      this.content = "";
      this.markup = "";
      this.info = "";
      this.meta = null;
      this.block = false;
      this.hidden = false;
    }
    Token.prototype.attrIndex = function attrIndex(name) {
      if (!this.attrs) {
        return -1;
      }
      const attrs = this.attrs;
      for (let i = 0, len = attrs.length; i < len; i++) {
        if (attrs[i][0] === name) {
          return i;
        }
      }
      return -1;
    };
    Token.prototype.attrPush = function attrPush(attrData) {
      if (this.attrs) {
        this.attrs.push(attrData);
      } else {
        this.attrs = [attrData];
      }
    };
    Token.prototype.attrSet = function attrSet(name, value) {
      const idx = this.attrIndex(name);
      const attrData = [name, value];
      if (idx < 0) {
        this.attrPush(attrData);
      } else {
        this.attrs[idx] = attrData;
      }
    };
    Token.prototype.attrGet = function attrGet(name) {
      const idx = this.attrIndex(name);
      let value = null;
      if (idx >= 0) {
        value = this.attrs[idx][1];
      }
      return value;
    };
    Token.prototype.attrJoin = function attrJoin(name, value) {
      const idx = this.attrIndex(name);
      if (idx < 0) {
        this.attrPush([name, value]);
      } else {
        this.attrs[idx][1] = this.attrs[idx][1] + " " + value;
      }
    };
    function StateCore(src, md, env) {
      this.src = src;
      this.env = env;
      this.tokens = [];
      this.inlineMode = false;
      this.md = md;
    }
    StateCore.prototype.Token = Token;
    var NEWLINES_RE = /\r\n?|\n/g;
    var NULL_RE = /\0/g;
    function normalize(state) {
      let str;
      str = state.src.replace(NEWLINES_RE, "\n");
      str = str.replace(NULL_RE, "\uFFFD");
      state.src = str;
    }
    function block(state) {
      let token;
      if (state.inlineMode) {
        token = new state.Token("inline", "", 0);
        token.content = state.src;
        token.map = [0, 1];
        token.children = [];
        state.tokens.push(token);
      } else {
        state.md.block.parse(state.src, state.md, state.env, state.tokens);
      }
    }
    function inline(state) {
      const tokens = state.tokens;
      for (let i = 0, l = tokens.length; i < l; i++) {
        const tok = tokens[i];
        if (tok.type === "inline") {
          state.md.inline.parse(tok.content, state.md, state.env, tok.children);
        }
      }
    }
    function isLinkOpen$1(str) {
      return /^<a[>\s]/i.test(str);
    }
    function isLinkClose$1(str) {
      return /^<\/a\s*>/i.test(str);
    }
    function linkify$1(state) {
      const blockTokens = state.tokens;
      if (!state.md.options.linkify) {
        return;
      }
      for (let j = 0, l = blockTokens.length; j < l; j++) {
        if (blockTokens[j].type !== "inline" || !state.md.linkify.pretest(blockTokens[j].content)) {
          continue;
        }
        let tokens = blockTokens[j].children;
        let htmlLinkLevel = 0;
        for (let i = tokens.length - 1; i >= 0; i--) {
          const currentToken = tokens[i];
          if (currentToken.type === "link_close") {
            i--;
            while (tokens[i].level !== currentToken.level && tokens[i].type !== "link_open") {
              i--;
            }
            continue;
          }
          if (currentToken.type === "html_inline") {
            if (isLinkOpen$1(currentToken.content) && htmlLinkLevel > 0) {
              htmlLinkLevel--;
            }
            if (isLinkClose$1(currentToken.content)) {
              htmlLinkLevel++;
            }
          }
          if (htmlLinkLevel > 0) {
            continue;
          }
          if (currentToken.type === "text" && state.md.linkify.test(currentToken.content)) {
            const text2 = currentToken.content;
            let links = state.md.linkify.match(text2);
            const nodes = [];
            let level = currentToken.level;
            let lastPos = 0;
            if (links.length > 0 && links[0].index === 0 && i > 0 && tokens[i - 1].type === "text_special") {
              links = links.slice(1);
            }
            for (let ln = 0; ln < links.length; ln++) {
              const url = links[ln].url;
              const fullUrl = state.md.normalizeLink(url);
              if (!state.md.validateLink(fullUrl)) {
                continue;
              }
              let urlText = links[ln].text;
              if (!links[ln].schema) {
                urlText = state.md.normalizeLinkText("http://" + urlText).replace(/^http:\/\//, "");
              } else if (links[ln].schema === "mailto:" && !/^mailto:/i.test(urlText)) {
                urlText = state.md.normalizeLinkText("mailto:" + urlText).replace(/^mailto:/, "");
              } else {
                urlText = state.md.normalizeLinkText(urlText);
              }
              const pos = links[ln].index;
              if (pos > lastPos) {
                const token = new state.Token("text", "", 0);
                token.content = text2.slice(lastPos, pos);
                token.level = level;
                nodes.push(token);
              }
              const token_o = new state.Token("link_open", "a", 1);
              token_o.attrs = [["href", fullUrl]];
              token_o.level = level++;
              token_o.markup = "linkify";
              token_o.info = "auto";
              nodes.push(token_o);
              const token_t = new state.Token("text", "", 0);
              token_t.content = urlText;
              token_t.level = level;
              nodes.push(token_t);
              const token_c = new state.Token("link_close", "a", -1);
              token_c.level = --level;
              token_c.markup = "linkify";
              token_c.info = "auto";
              nodes.push(token_c);
              lastPos = links[ln].lastIndex;
            }
            if (lastPos < text2.length) {
              const token = new state.Token("text", "", 0);
              token.content = text2.slice(lastPos);
              token.level = level;
              nodes.push(token);
            }
            blockTokens[j].children = tokens = arrayReplaceAt(tokens, i, nodes);
          }
        }
      }
    }
    var RARE_RE = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/;
    var SCOPED_ABBR_TEST_RE = /\((c|tm|r)\)/i;
    var SCOPED_ABBR_RE = /\((c|tm|r)\)/ig;
    var SCOPED_ABBR = {
      c: "\xA9",
      r: "\xAE",
      tm: "\u2122"
    };
    function replaceFn(match, name) {
      return SCOPED_ABBR[name.toLowerCase()];
    }
    function replace_scoped(inlineTokens) {
      let inside_autolink = 0;
      for (let i = inlineTokens.length - 1; i >= 0; i--) {
        const token = inlineTokens[i];
        if (token.type === "text" && !inside_autolink) {
          token.content = token.content.replace(SCOPED_ABBR_RE, replaceFn);
        }
        if (token.type === "link_open" && token.info === "auto") {
          inside_autolink--;
        }
        if (token.type === "link_close" && token.info === "auto") {
          inside_autolink++;
        }
      }
    }
    function replace_rare(inlineTokens) {
      let inside_autolink = 0;
      for (let i = inlineTokens.length - 1; i >= 0; i--) {
        const token = inlineTokens[i];
        if (token.type === "text" && !inside_autolink) {
          if (RARE_RE.test(token.content)) {
            token.content = token.content.replace(/\+-/g, "\xB1").replace(/\.{2,}/g, "\u2026").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/mg, "$1\u2014").replace(/(^|\s)--(?=\s|$)/mg, "$1\u2013").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg, "$1\u2013");
          }
        }
        if (token.type === "link_open" && token.info === "auto") {
          inside_autolink--;
        }
        if (token.type === "link_close" && token.info === "auto") {
          inside_autolink++;
        }
      }
    }
    function replace(state) {
      let blkIdx;
      if (!state.md.options.typographer) {
        return;
      }
      for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
        if (state.tokens[blkIdx].type !== "inline") {
          continue;
        }
        if (SCOPED_ABBR_TEST_RE.test(state.tokens[blkIdx].content)) {
          replace_scoped(state.tokens[blkIdx].children);
        }
        if (RARE_RE.test(state.tokens[blkIdx].content)) {
          replace_rare(state.tokens[blkIdx].children);
        }
      }
    }
    var QUOTE_TEST_RE = /['"]/;
    var QUOTE_RE = /['"]/g;
    var APOSTROPHE = "\u2019";
    function replaceAt(str, index, ch) {
      return str.slice(0, index) + ch + str.slice(index + 1);
    }
    function process_inlines(tokens, state) {
      let j;
      const stack = [];
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const thisLevel = tokens[i].level;
        for (j = stack.length - 1; j >= 0; j--) {
          if (stack[j].level <= thisLevel) {
            break;
          }
        }
        stack.length = j + 1;
        if (token.type !== "text") {
          continue;
        }
        let text2 = token.content;
        let pos = 0;
        let max = text2.length;
        OUTER:
          while (pos < max) {
            QUOTE_RE.lastIndex = pos;
            const t = QUOTE_RE.exec(text2);
            if (!t) {
              break;
            }
            let canOpen = true;
            let canClose = true;
            pos = t.index + 1;
            const isSingle = t[0] === "'";
            let lastChar = 32;
            if (t.index - 1 >= 0) {
              lastChar = text2.charCodeAt(t.index - 1);
            } else {
              for (j = i - 1; j >= 0; j--) {
                if (tokens[j].type === "softbreak" || tokens[j].type === "hardbreak")
                  break;
                if (!tokens[j].content)
                  continue;
                lastChar = tokens[j].content.charCodeAt(tokens[j].content.length - 1);
                break;
              }
            }
            let nextChar = 32;
            if (pos < max) {
              nextChar = text2.charCodeAt(pos);
            } else {
              for (j = i + 1; j < tokens.length; j++) {
                if (tokens[j].type === "softbreak" || tokens[j].type === "hardbreak")
                  break;
                if (!tokens[j].content)
                  continue;
                nextChar = tokens[j].content.charCodeAt(0);
                break;
              }
            }
            const isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
            const isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));
            const isLastWhiteSpace = isWhiteSpace2(lastChar);
            const isNextWhiteSpace = isWhiteSpace2(nextChar);
            if (isNextWhiteSpace) {
              canOpen = false;
            } else if (isNextPunctChar) {
              if (!(isLastWhiteSpace || isLastPunctChar)) {
                canOpen = false;
              }
            }
            if (isLastWhiteSpace) {
              canClose = false;
            } else if (isLastPunctChar) {
              if (!(isNextWhiteSpace || isNextPunctChar)) {
                canClose = false;
              }
            }
            if (nextChar === 34 && t[0] === '"') {
              if (lastChar >= 48 && lastChar <= 57) {
                canClose = canOpen = false;
              }
            }
            if (canOpen && canClose) {
              canOpen = isLastPunctChar;
              canClose = isNextPunctChar;
            }
            if (!canOpen && !canClose) {
              if (isSingle) {
                token.content = replaceAt(token.content, t.index, APOSTROPHE);
              }
              continue;
            }
            if (canClose) {
              for (j = stack.length - 1; j >= 0; j--) {
                let item = stack[j];
                if (stack[j].level < thisLevel) {
                  break;
                }
                if (item.single === isSingle && stack[j].level === thisLevel) {
                  item = stack[j];
                  let openQuote;
                  let closeQuote;
                  if (isSingle) {
                    openQuote = state.md.options.quotes[2];
                    closeQuote = state.md.options.quotes[3];
                  } else {
                    openQuote = state.md.options.quotes[0];
                    closeQuote = state.md.options.quotes[1];
                  }
                  token.content = replaceAt(token.content, t.index, closeQuote);
                  tokens[item.token].content = replaceAt(tokens[item.token].content, item.pos, openQuote);
                  pos += closeQuote.length - 1;
                  if (item.token === i) {
                    pos += openQuote.length - 1;
                  }
                  text2 = token.content;
                  max = text2.length;
                  stack.length = j;
                  continue OUTER;
                }
              }
            }
            if (canOpen) {
              stack.push({
                token: i,
                pos: t.index,
                single: isSingle,
                level: thisLevel
              });
            } else if (canClose && isSingle) {
              token.content = replaceAt(token.content, t.index, APOSTROPHE);
            }
          }
      }
    }
    function smartquotes(state) {
      if (!state.md.options.typographer) {
        return;
      }
      for (let blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
        if (state.tokens[blkIdx].type !== "inline" || !QUOTE_TEST_RE.test(state.tokens[blkIdx].content)) {
          continue;
        }
        process_inlines(state.tokens[blkIdx].children, state);
      }
    }
    function text_join(state) {
      let curr, last;
      const blockTokens = state.tokens;
      const l = blockTokens.length;
      for (let j = 0; j < l; j++) {
        if (blockTokens[j].type !== "inline")
          continue;
        const tokens = blockTokens[j].children;
        const max = tokens.length;
        for (curr = 0; curr < max; curr++) {
          if (tokens[curr].type === "text_special") {
            tokens[curr].type = "text";
          }
        }
        for (curr = last = 0; curr < max; curr++) {
          if (tokens[curr].type === "text" && curr + 1 < max && tokens[curr + 1].type === "text") {
            tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
          } else {
            if (curr !== last) {
              tokens[last] = tokens[curr];
            }
            last++;
          }
        }
        if (curr !== last) {
          tokens.length = last;
        }
      }
    }
    var _rules$2 = [
      ["normalize", normalize],
      ["block", block],
      ["inline", inline],
      ["linkify", linkify$1],
      ["replacements", replace],
      ["smartquotes", smartquotes],
      // `text_join` finds `text_special` tokens (for escape sequences)
      // and joins them with the rest of the text
      ["text_join", text_join]
    ];
    function Core() {
      this.ruler = new Ruler();
      for (let i = 0; i < _rules$2.length; i++) {
        this.ruler.push(_rules$2[i][0], _rules$2[i][1]);
      }
    }
    Core.prototype.process = function(state) {
      const rules = this.ruler.getRules("");
      for (let i = 0, l = rules.length; i < l; i++) {
        rules[i](state);
      }
    };
    Core.prototype.State = StateCore;
    function StateBlock(src, md, env, tokens) {
      this.src = src;
      this.md = md;
      this.env = env;
      this.tokens = tokens;
      this.bMarks = [];
      this.eMarks = [];
      this.tShift = [];
      this.sCount = [];
      this.bsCount = [];
      this.blkIndent = 0;
      this.line = 0;
      this.lineMax = 0;
      this.tight = false;
      this.ddIndent = -1;
      this.listIndent = -1;
      this.parentType = "root";
      this.level = 0;
      const s = this.src;
      for (let start = 0, pos = 0, indent = 0, offset = 0, len = s.length, indent_found = false; pos < len; pos++) {
        const ch = s.charCodeAt(pos);
        if (!indent_found) {
          if (isSpace(ch)) {
            indent++;
            if (ch === 9) {
              offset += 4 - offset % 4;
            } else {
              offset++;
            }
            continue;
          } else {
            indent_found = true;
          }
        }
        if (ch === 10 || pos === len - 1) {
          if (ch !== 10) {
            pos++;
          }
          this.bMarks.push(start);
          this.eMarks.push(pos);
          this.tShift.push(indent);
          this.sCount.push(offset);
          this.bsCount.push(0);
          indent_found = false;
          indent = 0;
          offset = 0;
          start = pos + 1;
        }
      }
      this.bMarks.push(s.length);
      this.eMarks.push(s.length);
      this.tShift.push(0);
      this.sCount.push(0);
      this.bsCount.push(0);
      this.lineMax = this.bMarks.length - 1;
    }
    StateBlock.prototype.push = function(type, tag, nesting) {
      const token = new Token(type, tag, nesting);
      token.block = true;
      if (nesting < 0)
        this.level--;
      token.level = this.level;
      if (nesting > 0)
        this.level++;
      this.tokens.push(token);
      return token;
    };
    StateBlock.prototype.isEmpty = function isEmpty(line) {
      return this.bMarks[line] + this.tShift[line] >= this.eMarks[line];
    };
    StateBlock.prototype.skipEmptyLines = function skipEmptyLines(from) {
      for (let max = this.lineMax; from < max; from++) {
        if (this.bMarks[from] + this.tShift[from] < this.eMarks[from]) {
          break;
        }
      }
      return from;
    };
    StateBlock.prototype.skipSpaces = function skipSpaces(pos) {
      for (let max = this.src.length; pos < max; pos++) {
        const ch = this.src.charCodeAt(pos);
        if (!isSpace(ch)) {
          break;
        }
      }
      return pos;
    };
    StateBlock.prototype.skipSpacesBack = function skipSpacesBack(pos, min) {
      if (pos <= min) {
        return pos;
      }
      while (pos > min) {
        if (!isSpace(this.src.charCodeAt(--pos))) {
          return pos + 1;
        }
      }
      return pos;
    };
    StateBlock.prototype.skipChars = function skipChars(pos, code2) {
      for (let max = this.src.length; pos < max; pos++) {
        if (this.src.charCodeAt(pos) !== code2) {
          break;
        }
      }
      return pos;
    };
    StateBlock.prototype.skipCharsBack = function skipCharsBack(pos, code2, min) {
      if (pos <= min) {
        return pos;
      }
      while (pos > min) {
        if (code2 !== this.src.charCodeAt(--pos)) {
          return pos + 1;
        }
      }
      return pos;
    };
    StateBlock.prototype.getLines = function getLines(begin, end, indent, keepLastLF) {
      if (begin >= end) {
        return "";
      }
      const queue = new Array(end - begin);
      for (let i = 0, line = begin; line < end; line++, i++) {
        let lineIndent = 0;
        const lineStart = this.bMarks[line];
        let first = lineStart;
        let last;
        if (line + 1 < end || keepLastLF) {
          last = this.eMarks[line] + 1;
        } else {
          last = this.eMarks[line];
        }
        while (first < last && lineIndent < indent) {
          const ch = this.src.charCodeAt(first);
          if (isSpace(ch)) {
            if (ch === 9) {
              lineIndent += 4 - (lineIndent + this.bsCount[line]) % 4;
            } else {
              lineIndent++;
            }
          } else if (first - lineStart < this.tShift[line]) {
            lineIndent++;
          } else {
            break;
          }
          first++;
        }
        if (lineIndent > indent) {
          queue[i] = new Array(lineIndent - indent + 1).join(" ") + this.src.slice(first, last);
        } else {
          queue[i] = this.src.slice(first, last);
        }
      }
      return queue.join("");
    };
    StateBlock.prototype.Token = Token;
    var MAX_AUTOCOMPLETED_CELLS = 65536;
    function getLine(state, line) {
      const pos = state.bMarks[line] + state.tShift[line];
      const max = state.eMarks[line];
      return state.src.slice(pos, max);
    }
    function escapedSplit(str) {
      const result = [];
      const max = str.length;
      let pos = 0;
      let ch = str.charCodeAt(pos);
      let isEscaped = false;
      let lastPos = 0;
      let current = "";
      while (pos < max) {
        if (ch === 124) {
          if (!isEscaped) {
            result.push(current + str.substring(lastPos, pos));
            current = "";
            lastPos = pos + 1;
          } else {
            current += str.substring(lastPos, pos - 1);
            lastPos = pos;
          }
        }
        isEscaped = ch === 92;
        pos++;
        ch = str.charCodeAt(pos);
      }
      result.push(current + str.substring(lastPos));
      return result;
    }
    function table(state, startLine, endLine, silent) {
      if (startLine + 2 > endLine) {
        return false;
      }
      let nextLine = startLine + 1;
      if (state.sCount[nextLine] < state.blkIndent) {
        return false;
      }
      if (state.sCount[nextLine] - state.blkIndent >= 4) {
        return false;
      }
      let pos = state.bMarks[nextLine] + state.tShift[nextLine];
      if (pos >= state.eMarks[nextLine]) {
        return false;
      }
      const firstCh = state.src.charCodeAt(pos++);
      if (firstCh !== 124 && firstCh !== 45 && firstCh !== 58) {
        return false;
      }
      if (pos >= state.eMarks[nextLine]) {
        return false;
      }
      const secondCh = state.src.charCodeAt(pos++);
      if (secondCh !== 124 && secondCh !== 45 && secondCh !== 58 && !isSpace(secondCh)) {
        return false;
      }
      if (firstCh === 45 && isSpace(secondCh)) {
        return false;
      }
      while (pos < state.eMarks[nextLine]) {
        const ch = state.src.charCodeAt(pos);
        if (ch !== 124 && ch !== 45 && ch !== 58 && !isSpace(ch)) {
          return false;
        }
        pos++;
      }
      let lineText = getLine(state, startLine + 1);
      let columns = lineText.split("|");
      const aligns = [];
      for (let i = 0; i < columns.length; i++) {
        const t = columns[i].trim();
        if (!t) {
          if (i === 0 || i === columns.length - 1) {
            continue;
          } else {
            return false;
          }
        }
        if (!/^:?-+:?$/.test(t)) {
          return false;
        }
        if (t.charCodeAt(t.length - 1) === 58) {
          aligns.push(t.charCodeAt(0) === 58 ? "center" : "right");
        } else if (t.charCodeAt(0) === 58) {
          aligns.push("left");
        } else {
          aligns.push("");
        }
      }
      lineText = getLine(state, startLine).trim();
      if (lineText.indexOf("|") === -1) {
        return false;
      }
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      columns = escapedSplit(lineText);
      if (columns.length && columns[0] === "")
        columns.shift();
      if (columns.length && columns[columns.length - 1] === "")
        columns.pop();
      const columnCount = columns.length;
      if (columnCount === 0 || columnCount !== aligns.length) {
        return false;
      }
      if (silent) {
        return true;
      }
      const oldParentType = state.parentType;
      state.parentType = "table";
      const terminatorRules = state.md.block.ruler.getRules("blockquote");
      const token_to = state.push("table_open", "table", 1);
      const tableLines = [startLine, 0];
      token_to.map = tableLines;
      const token_tho = state.push("thead_open", "thead", 1);
      token_tho.map = [startLine, startLine + 1];
      const token_htro = state.push("tr_open", "tr", 1);
      token_htro.map = [startLine, startLine + 1];
      for (let i = 0; i < columns.length; i++) {
        const token_ho = state.push("th_open", "th", 1);
        if (aligns[i]) {
          token_ho.attrs = [["style", "text-align:" + aligns[i]]];
        }
        const token_il = state.push("inline", "", 0);
        token_il.content = columns[i].trim();
        token_il.children = [];
        state.push("th_close", "th", -1);
      }
      state.push("tr_close", "tr", -1);
      state.push("thead_close", "thead", -1);
      let tbodyLines;
      let autocompletedCells = 0;
      for (nextLine = startLine + 2; nextLine < endLine; nextLine++) {
        if (state.sCount[nextLine] < state.blkIndent) {
          break;
        }
        let terminate = false;
        for (let i = 0, l = terminatorRules.length; i < l; i++) {
          if (terminatorRules[i](state, nextLine, endLine, true)) {
            terminate = true;
            break;
          }
        }
        if (terminate) {
          break;
        }
        lineText = getLine(state, nextLine).trim();
        if (!lineText) {
          break;
        }
        if (state.sCount[nextLine] - state.blkIndent >= 4) {
          break;
        }
        columns = escapedSplit(lineText);
        if (columns.length && columns[0] === "")
          columns.shift();
        if (columns.length && columns[columns.length - 1] === "")
          columns.pop();
        autocompletedCells += columnCount - columns.length;
        if (autocompletedCells > MAX_AUTOCOMPLETED_CELLS) {
          break;
        }
        if (nextLine === startLine + 2) {
          const token_tbo = state.push("tbody_open", "tbody", 1);
          token_tbo.map = tbodyLines = [startLine + 2, 0];
        }
        const token_tro = state.push("tr_open", "tr", 1);
        token_tro.map = [nextLine, nextLine + 1];
        for (let i = 0; i < columnCount; i++) {
          const token_tdo = state.push("td_open", "td", 1);
          if (aligns[i]) {
            token_tdo.attrs = [["style", "text-align:" + aligns[i]]];
          }
          const token_il = state.push("inline", "", 0);
          token_il.content = columns[i] ? columns[i].trim() : "";
          token_il.children = [];
          state.push("td_close", "td", -1);
        }
        state.push("tr_close", "tr", -1);
      }
      if (tbodyLines) {
        state.push("tbody_close", "tbody", -1);
        tbodyLines[1] = nextLine;
      }
      state.push("table_close", "table", -1);
      tableLines[1] = nextLine;
      state.parentType = oldParentType;
      state.line = nextLine;
      return true;
    }
    function code(state, startLine, endLine) {
      if (state.sCount[startLine] - state.blkIndent < 4) {
        return false;
      }
      let nextLine = startLine + 1;
      let last = nextLine;
      while (nextLine < endLine) {
        if (state.isEmpty(nextLine)) {
          nextLine++;
          continue;
        }
        if (state.sCount[nextLine] - state.blkIndent >= 4) {
          nextLine++;
          last = nextLine;
          continue;
        }
        break;
      }
      state.line = last;
      const token = state.push("code_block", "code", 0);
      token.content = state.getLines(startLine, last, 4 + state.blkIndent, false) + "\n";
      token.map = [startLine, state.line];
      return true;
    }
    function fence(state, startLine, endLine, silent) {
      let pos = state.bMarks[startLine] + state.tShift[startLine];
      let max = state.eMarks[startLine];
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      if (pos + 3 > max) {
        return false;
      }
      const marker = state.src.charCodeAt(pos);
      if (marker !== 126 && marker !== 96) {
        return false;
      }
      let mem = pos;
      pos = state.skipChars(pos, marker);
      let len = pos - mem;
      if (len < 3) {
        return false;
      }
      const markup = state.src.slice(mem, pos);
      const params = state.src.slice(pos, max);
      if (marker === 96) {
        if (params.indexOf(String.fromCharCode(marker)) >= 0) {
          return false;
        }
      }
      if (silent) {
        return true;
      }
      let nextLine = startLine;
      let haveEndMarker = false;
      for (; ; ) {
        nextLine++;
        if (nextLine >= endLine) {
          break;
        }
        pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
        max = state.eMarks[nextLine];
        if (pos < max && state.sCount[nextLine] < state.blkIndent) {
          break;
        }
        if (state.src.charCodeAt(pos) !== marker) {
          continue;
        }
        if (state.sCount[nextLine] - state.blkIndent >= 4) {
          continue;
        }
        pos = state.skipChars(pos, marker);
        if (pos - mem < len) {
          continue;
        }
        pos = state.skipSpaces(pos);
        if (pos < max) {
          continue;
        }
        haveEndMarker = true;
        break;
      }
      len = state.sCount[startLine];
      state.line = nextLine + (haveEndMarker ? 1 : 0);
      const token = state.push("fence", "code", 0);
      token.info = params;
      token.content = state.getLines(startLine + 1, nextLine, len, true);
      token.markup = markup;
      token.map = [startLine, state.line];
      return true;
    }
    function blockquote(state, startLine, endLine, silent) {
      let pos = state.bMarks[startLine] + state.tShift[startLine];
      let max = state.eMarks[startLine];
      const oldLineMax = state.lineMax;
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      if (state.src.charCodeAt(pos) !== 62) {
        return false;
      }
      if (silent) {
        return true;
      }
      const oldBMarks = [];
      const oldBSCount = [];
      const oldSCount = [];
      const oldTShift = [];
      const terminatorRules = state.md.block.ruler.getRules("blockquote");
      const oldParentType = state.parentType;
      state.parentType = "blockquote";
      let lastLineEmpty = false;
      let nextLine;
      for (nextLine = startLine; nextLine < endLine; nextLine++) {
        const isOutdented = state.sCount[nextLine] < state.blkIndent;
        pos = state.bMarks[nextLine] + state.tShift[nextLine];
        max = state.eMarks[nextLine];
        if (pos >= max) {
          break;
        }
        if (state.src.charCodeAt(pos++) === 62 && !isOutdented) {
          let initial = state.sCount[nextLine] + 1;
          let spaceAfterMarker;
          let adjustTab;
          if (state.src.charCodeAt(pos) === 32) {
            pos++;
            initial++;
            adjustTab = false;
            spaceAfterMarker = true;
          } else if (state.src.charCodeAt(pos) === 9) {
            spaceAfterMarker = true;
            if ((state.bsCount[nextLine] + initial) % 4 === 3) {
              pos++;
              initial++;
              adjustTab = false;
            } else {
              adjustTab = true;
            }
          } else {
            spaceAfterMarker = false;
          }
          let offset = initial;
          oldBMarks.push(state.bMarks[nextLine]);
          state.bMarks[nextLine] = pos;
          while (pos < max) {
            const ch = state.src.charCodeAt(pos);
            if (isSpace(ch)) {
              if (ch === 9) {
                offset += 4 - (offset + state.bsCount[nextLine] + (adjustTab ? 1 : 0)) % 4;
              } else {
                offset++;
              }
            } else {
              break;
            }
            pos++;
          }
          lastLineEmpty = pos >= max;
          oldBSCount.push(state.bsCount[nextLine]);
          state.bsCount[nextLine] = state.sCount[nextLine] + 1 + (spaceAfterMarker ? 1 : 0);
          oldSCount.push(state.sCount[nextLine]);
          state.sCount[nextLine] = offset - initial;
          oldTShift.push(state.tShift[nextLine]);
          state.tShift[nextLine] = pos - state.bMarks[nextLine];
          continue;
        }
        if (lastLineEmpty) {
          break;
        }
        let terminate = false;
        for (let i = 0, l = terminatorRules.length; i < l; i++) {
          if (terminatorRules[i](state, nextLine, endLine, true)) {
            terminate = true;
            break;
          }
        }
        if (terminate) {
          state.lineMax = nextLine;
          if (state.blkIndent !== 0) {
            oldBMarks.push(state.bMarks[nextLine]);
            oldBSCount.push(state.bsCount[nextLine]);
            oldTShift.push(state.tShift[nextLine]);
            oldSCount.push(state.sCount[nextLine]);
            state.sCount[nextLine] -= state.blkIndent;
          }
          break;
        }
        oldBMarks.push(state.bMarks[nextLine]);
        oldBSCount.push(state.bsCount[nextLine]);
        oldTShift.push(state.tShift[nextLine]);
        oldSCount.push(state.sCount[nextLine]);
        state.sCount[nextLine] = -1;
      }
      const oldIndent = state.blkIndent;
      state.blkIndent = 0;
      const token_o = state.push("blockquote_open", "blockquote", 1);
      token_o.markup = ">";
      const lines = [startLine, 0];
      token_o.map = lines;
      state.md.block.tokenize(state, startLine, nextLine);
      const token_c = state.push("blockquote_close", "blockquote", -1);
      token_c.markup = ">";
      state.lineMax = oldLineMax;
      state.parentType = oldParentType;
      lines[1] = state.line;
      for (let i = 0; i < oldTShift.length; i++) {
        state.bMarks[i + startLine] = oldBMarks[i];
        state.tShift[i + startLine] = oldTShift[i];
        state.sCount[i + startLine] = oldSCount[i];
        state.bsCount[i + startLine] = oldBSCount[i];
      }
      state.blkIndent = oldIndent;
      return true;
    }
    function hr(state, startLine, endLine, silent) {
      const max = state.eMarks[startLine];
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      let pos = state.bMarks[startLine] + state.tShift[startLine];
      const marker = state.src.charCodeAt(pos++);
      if (marker !== 42 && marker !== 45 && marker !== 95) {
        return false;
      }
      let cnt = 1;
      while (pos < max) {
        const ch = state.src.charCodeAt(pos++);
        if (ch !== marker && !isSpace(ch)) {
          return false;
        }
        if (ch === marker) {
          cnt++;
        }
      }
      if (cnt < 3) {
        return false;
      }
      if (silent) {
        return true;
      }
      state.line = startLine + 1;
      const token = state.push("hr", "hr", 0);
      token.map = [startLine, state.line];
      token.markup = Array(cnt + 1).join(String.fromCharCode(marker));
      return true;
    }
    function skipBulletListMarker(state, startLine) {
      const max = state.eMarks[startLine];
      let pos = state.bMarks[startLine] + state.tShift[startLine];
      const marker = state.src.charCodeAt(pos++);
      if (marker !== 42 && marker !== 45 && marker !== 43) {
        return -1;
      }
      if (pos < max) {
        const ch = state.src.charCodeAt(pos);
        if (!isSpace(ch)) {
          return -1;
        }
      }
      return pos;
    }
    function skipOrderedListMarker(state, startLine) {
      const start = state.bMarks[startLine] + state.tShift[startLine];
      const max = state.eMarks[startLine];
      let pos = start;
      if (pos + 1 >= max) {
        return -1;
      }
      let ch = state.src.charCodeAt(pos++);
      if (ch < 48 || ch > 57) {
        return -1;
      }
      for (; ; ) {
        if (pos >= max) {
          return -1;
        }
        ch = state.src.charCodeAt(pos++);
        if (ch >= 48 && ch <= 57) {
          if (pos - start >= 10) {
            return -1;
          }
          continue;
        }
        if (ch === 41 || ch === 46) {
          break;
        }
        return -1;
      }
      if (pos < max) {
        ch = state.src.charCodeAt(pos);
        if (!isSpace(ch)) {
          return -1;
        }
      }
      return pos;
    }
    function markTightParagraphs(state, idx) {
      const level = state.level + 2;
      for (let i = idx + 2, l = state.tokens.length - 2; i < l; i++) {
        if (state.tokens[i].level === level && state.tokens[i].type === "paragraph_open") {
          state.tokens[i + 2].hidden = true;
          state.tokens[i].hidden = true;
          i += 2;
        }
      }
    }
    function list(state, startLine, endLine, silent) {
      let max, pos, start, token;
      let nextLine = startLine;
      let tight = true;
      if (state.sCount[nextLine] - state.blkIndent >= 4) {
        return false;
      }
      if (state.listIndent >= 0 && state.sCount[nextLine] - state.listIndent >= 4 && state.sCount[nextLine] < state.blkIndent) {
        return false;
      }
      let isTerminatingParagraph = false;
      if (silent && state.parentType === "paragraph") {
        if (state.sCount[nextLine] >= state.blkIndent) {
          isTerminatingParagraph = true;
        }
      }
      let isOrdered;
      let markerValue;
      let posAfterMarker;
      if ((posAfterMarker = skipOrderedListMarker(state, nextLine)) >= 0) {
        isOrdered = true;
        start = state.bMarks[nextLine] + state.tShift[nextLine];
        markerValue = Number(state.src.slice(start, posAfterMarker - 1));
        if (isTerminatingParagraph && markerValue !== 1)
          return false;
      } else if ((posAfterMarker = skipBulletListMarker(state, nextLine)) >= 0) {
        isOrdered = false;
      } else {
        return false;
      }
      if (isTerminatingParagraph) {
        if (state.skipSpaces(posAfterMarker) >= state.eMarks[nextLine])
          return false;
      }
      if (silent) {
        return true;
      }
      const markerCharCode = state.src.charCodeAt(posAfterMarker - 1);
      const listTokIdx = state.tokens.length;
      if (isOrdered) {
        token = state.push("ordered_list_open", "ol", 1);
        if (markerValue !== 1) {
          token.attrs = [["start", markerValue]];
        }
      } else {
        token = state.push("bullet_list_open", "ul", 1);
      }
      const listLines = [nextLine, 0];
      token.map = listLines;
      token.markup = String.fromCharCode(markerCharCode);
      let prevEmptyEnd = false;
      const terminatorRules = state.md.block.ruler.getRules("list");
      const oldParentType = state.parentType;
      state.parentType = "list";
      while (nextLine < endLine) {
        pos = posAfterMarker;
        max = state.eMarks[nextLine];
        const initial = state.sCount[nextLine] + posAfterMarker - (state.bMarks[nextLine] + state.tShift[nextLine]);
        let offset = initial;
        while (pos < max) {
          const ch = state.src.charCodeAt(pos);
          if (ch === 9) {
            offset += 4 - (offset + state.bsCount[nextLine]) % 4;
          } else if (ch === 32) {
            offset++;
          } else {
            break;
          }
          pos++;
        }
        const contentStart = pos;
        let indentAfterMarker;
        if (contentStart >= max) {
          indentAfterMarker = 1;
        } else {
          indentAfterMarker = offset - initial;
        }
        if (indentAfterMarker > 4) {
          indentAfterMarker = 1;
        }
        const indent = initial + indentAfterMarker;
        token = state.push("list_item_open", "li", 1);
        token.markup = String.fromCharCode(markerCharCode);
        const itemLines = [nextLine, 0];
        token.map = itemLines;
        if (isOrdered) {
          token.info = state.src.slice(start, posAfterMarker - 1);
        }
        const oldTight = state.tight;
        const oldTShift = state.tShift[nextLine];
        const oldSCount = state.sCount[nextLine];
        const oldListIndent = state.listIndent;
        state.listIndent = state.blkIndent;
        state.blkIndent = indent;
        state.tight = true;
        state.tShift[nextLine] = contentStart - state.bMarks[nextLine];
        state.sCount[nextLine] = offset;
        if (contentStart >= max && state.isEmpty(nextLine + 1)) {
          state.line = Math.min(state.line + 2, endLine);
        } else {
          state.md.block.tokenize(state, nextLine, endLine, true);
        }
        if (!state.tight || prevEmptyEnd) {
          tight = false;
        }
        prevEmptyEnd = state.line - nextLine > 1 && state.isEmpty(state.line - 1);
        state.blkIndent = state.listIndent;
        state.listIndent = oldListIndent;
        state.tShift[nextLine] = oldTShift;
        state.sCount[nextLine] = oldSCount;
        state.tight = oldTight;
        token = state.push("list_item_close", "li", -1);
        token.markup = String.fromCharCode(markerCharCode);
        nextLine = state.line;
        itemLines[1] = nextLine;
        if (nextLine >= endLine) {
          break;
        }
        if (state.sCount[nextLine] < state.blkIndent) {
          break;
        }
        if (state.sCount[nextLine] - state.blkIndent >= 4) {
          break;
        }
        let terminate = false;
        for (let i = 0, l = terminatorRules.length; i < l; i++) {
          if (terminatorRules[i](state, nextLine, endLine, true)) {
            terminate = true;
            break;
          }
        }
        if (terminate) {
          break;
        }
        if (isOrdered) {
          posAfterMarker = skipOrderedListMarker(state, nextLine);
          if (posAfterMarker < 0) {
            break;
          }
          start = state.bMarks[nextLine] + state.tShift[nextLine];
        } else {
          posAfterMarker = skipBulletListMarker(state, nextLine);
          if (posAfterMarker < 0) {
            break;
          }
        }
        if (markerCharCode !== state.src.charCodeAt(posAfterMarker - 1)) {
          break;
        }
      }
      if (isOrdered) {
        token = state.push("ordered_list_close", "ol", -1);
      } else {
        token = state.push("bullet_list_close", "ul", -1);
      }
      token.markup = String.fromCharCode(markerCharCode);
      listLines[1] = nextLine;
      state.line = nextLine;
      state.parentType = oldParentType;
      if (tight) {
        markTightParagraphs(state, listTokIdx);
      }
      return true;
    }
    function reference(state, startLine, _endLine, silent) {
      let pos = state.bMarks[startLine] + state.tShift[startLine];
      let max = state.eMarks[startLine];
      let nextLine = startLine + 1;
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      if (state.src.charCodeAt(pos) !== 91) {
        return false;
      }
      function getNextLine(nextLine2) {
        const endLine = state.lineMax;
        if (nextLine2 >= endLine || state.isEmpty(nextLine2)) {
          return null;
        }
        let isContinuation = false;
        if (state.sCount[nextLine2] - state.blkIndent > 3) {
          isContinuation = true;
        }
        if (state.sCount[nextLine2] < 0) {
          isContinuation = true;
        }
        if (!isContinuation) {
          const terminatorRules = state.md.block.ruler.getRules("reference");
          const oldParentType = state.parentType;
          state.parentType = "reference";
          let terminate = false;
          for (let i = 0, l = terminatorRules.length; i < l; i++) {
            if (terminatorRules[i](state, nextLine2, endLine, true)) {
              terminate = true;
              break;
            }
          }
          state.parentType = oldParentType;
          if (terminate) {
            return null;
          }
        }
        const pos2 = state.bMarks[nextLine2] + state.tShift[nextLine2];
        const max2 = state.eMarks[nextLine2];
        return state.src.slice(pos2, max2 + 1);
      }
      let str = state.src.slice(pos, max + 1);
      max = str.length;
      let labelEnd = -1;
      for (pos = 1; pos < max; pos++) {
        const ch = str.charCodeAt(pos);
        if (ch === 91) {
          return false;
        } else if (ch === 93) {
          labelEnd = pos;
          break;
        } else if (ch === 10) {
          const lineContent = getNextLine(nextLine);
          if (lineContent !== null) {
            str += lineContent;
            max = str.length;
            nextLine++;
          }
        } else if (ch === 92) {
          pos++;
          if (pos < max && str.charCodeAt(pos) === 10) {
            const lineContent = getNextLine(nextLine);
            if (lineContent !== null) {
              str += lineContent;
              max = str.length;
              nextLine++;
            }
          }
        }
      }
      if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 58) {
        return false;
      }
      for (pos = labelEnd + 2; pos < max; pos++) {
        const ch = str.charCodeAt(pos);
        if (ch === 10) {
          const lineContent = getNextLine(nextLine);
          if (lineContent !== null) {
            str += lineContent;
            max = str.length;
            nextLine++;
          }
        } else if (isSpace(ch))
          ;
        else {
          break;
        }
      }
      const destRes = state.md.helpers.parseLinkDestination(str, pos, max);
      if (!destRes.ok) {
        return false;
      }
      const href = state.md.normalizeLink(destRes.str);
      if (!state.md.validateLink(href)) {
        return false;
      }
      pos = destRes.pos;
      const destEndPos = pos;
      const destEndLineNo = nextLine;
      const start = pos;
      for (; pos < max; pos++) {
        const ch = str.charCodeAt(pos);
        if (ch === 10) {
          const lineContent = getNextLine(nextLine);
          if (lineContent !== null) {
            str += lineContent;
            max = str.length;
            nextLine++;
          }
        } else if (isSpace(ch))
          ;
        else {
          break;
        }
      }
      let titleRes = state.md.helpers.parseLinkTitle(str, pos, max);
      while (titleRes.can_continue) {
        const lineContent = getNextLine(nextLine);
        if (lineContent === null)
          break;
        str += lineContent;
        pos = max;
        max = str.length;
        nextLine++;
        titleRes = state.md.helpers.parseLinkTitle(str, pos, max, titleRes);
      }
      let title;
      if (pos < max && start !== pos && titleRes.ok) {
        title = titleRes.str;
        pos = titleRes.pos;
      } else {
        title = "";
        pos = destEndPos;
        nextLine = destEndLineNo;
      }
      while (pos < max) {
        const ch = str.charCodeAt(pos);
        if (!isSpace(ch)) {
          break;
        }
        pos++;
      }
      if (pos < max && str.charCodeAt(pos) !== 10) {
        if (title) {
          title = "";
          pos = destEndPos;
          nextLine = destEndLineNo;
          while (pos < max) {
            const ch = str.charCodeAt(pos);
            if (!isSpace(ch)) {
              break;
            }
            pos++;
          }
        }
      }
      if (pos < max && str.charCodeAt(pos) !== 10) {
        return false;
      }
      const label = normalizeReference(str.slice(1, labelEnd));
      if (!label) {
        return false;
      }
      if (silent) {
        return true;
      }
      if (typeof state.env.references === "undefined") {
        state.env.references = {};
      }
      if (typeof state.env.references[label] === "undefined") {
        state.env.references[label] = {
          title,
          href
        };
      }
      state.line = nextLine;
      return true;
    }
    var block_names = ["address", "article", "aside", "base", "basefont", "blockquote", "body", "caption", "center", "col", "colgroup", "dd", "details", "dialog", "dir", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hr", "html", "iframe", "legend", "li", "link", "main", "menu", "menuitem", "nav", "noframes", "ol", "optgroup", "option", "p", "param", "search", "section", "summary", "table", "tbody", "td", "tfoot", "th", "thead", "title", "tr", "track", "ul"];
    var attr_name = "[a-zA-Z_:][a-zA-Z0-9:._-]*";
    var unquoted = "[^\"'=<>`\\x00-\\x20]+";
    var single_quoted = "'[^']*'";
    var double_quoted = '"[^"]*"';
    var attr_value = "(?:" + unquoted + "|" + single_quoted + "|" + double_quoted + ")";
    var attribute = "(?:\\s+" + attr_name + "(?:\\s*=\\s*" + attr_value + ")?)";
    var open_tag = "<[A-Za-z][A-Za-z0-9\\-]*" + attribute + "*\\s*\\/?>";
    var close_tag = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>";
    var comment = "<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->";
    var processing = "<[?][\\s\\S]*?[?]>";
    var declaration = "<![A-Za-z][^>]*>";
    var cdata = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>";
    var HTML_TAG_RE = new RegExp("^(?:" + open_tag + "|" + close_tag + "|" + comment + "|" + processing + "|" + declaration + "|" + cdata + ")");
    var HTML_OPEN_CLOSE_TAG_RE = new RegExp("^(?:" + open_tag + "|" + close_tag + ")");
    var HTML_SEQUENCES = [[/^<(script|pre|style|textarea)(?=(\s|>|$))/i, /<\/(script|pre|style|textarea)>/i, true], [/^<!--/, /-->/, true], [/^<\?/, /\?>/, true], [/^<![A-Z]/, />/, true], [/^<!\[CDATA\[/, /\]\]>/, true], [new RegExp("^</?(" + block_names.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, true], [new RegExp(HTML_OPEN_CLOSE_TAG_RE.source + "\\s*$"), /^$/, false]];
    function html_block(state, startLine, endLine, silent) {
      let pos = state.bMarks[startLine] + state.tShift[startLine];
      let max = state.eMarks[startLine];
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      if (!state.md.options.html) {
        return false;
      }
      if (state.src.charCodeAt(pos) !== 60) {
        return false;
      }
      let lineText = state.src.slice(pos, max);
      let i = 0;
      for (; i < HTML_SEQUENCES.length; i++) {
        if (HTML_SEQUENCES[i][0].test(lineText)) {
          break;
        }
      }
      if (i === HTML_SEQUENCES.length) {
        return false;
      }
      if (silent) {
        return HTML_SEQUENCES[i][2];
      }
      let nextLine = startLine + 1;
      if (!HTML_SEQUENCES[i][1].test(lineText)) {
        for (; nextLine < endLine; nextLine++) {
          if (state.sCount[nextLine] < state.blkIndent) {
            break;
          }
          pos = state.bMarks[nextLine] + state.tShift[nextLine];
          max = state.eMarks[nextLine];
          lineText = state.src.slice(pos, max);
          if (HTML_SEQUENCES[i][1].test(lineText)) {
            if (lineText.length !== 0) {
              nextLine++;
            }
            break;
          }
        }
      }
      state.line = nextLine;
      const token = state.push("html_block", "", 0);
      token.map = [startLine, nextLine];
      token.content = state.getLines(startLine, nextLine, state.blkIndent, true);
      return true;
    }
    function heading(state, startLine, endLine, silent) {
      let pos = state.bMarks[startLine] + state.tShift[startLine];
      let max = state.eMarks[startLine];
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      let ch = state.src.charCodeAt(pos);
      if (ch !== 35 || pos >= max) {
        return false;
      }
      let level = 1;
      ch = state.src.charCodeAt(++pos);
      while (ch === 35 && pos < max && level <= 6) {
        level++;
        ch = state.src.charCodeAt(++pos);
      }
      if (level > 6 || pos < max && !isSpace(ch)) {
        return false;
      }
      if (silent) {
        return true;
      }
      max = state.skipSpacesBack(max, pos);
      const tmp = state.skipCharsBack(max, 35, pos);
      if (tmp > pos && isSpace(state.src.charCodeAt(tmp - 1))) {
        max = tmp;
      }
      state.line = startLine + 1;
      const token_o = state.push("heading_open", "h" + String(level), 1);
      token_o.markup = "########".slice(0, level);
      token_o.map = [startLine, state.line];
      const token_i = state.push("inline", "", 0);
      token_i.content = state.src.slice(pos, max).trim();
      token_i.map = [startLine, state.line];
      token_i.children = [];
      const token_c = state.push("heading_close", "h" + String(level), -1);
      token_c.markup = "########".slice(0, level);
      return true;
    }
    function lheading(state, startLine, endLine) {
      const terminatorRules = state.md.block.ruler.getRules("paragraph");
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      const oldParentType = state.parentType;
      state.parentType = "paragraph";
      let level = 0;
      let marker;
      let nextLine = startLine + 1;
      for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
        if (state.sCount[nextLine] - state.blkIndent > 3) {
          continue;
        }
        if (state.sCount[nextLine] >= state.blkIndent) {
          let pos = state.bMarks[nextLine] + state.tShift[nextLine];
          const max = state.eMarks[nextLine];
          if (pos < max) {
            marker = state.src.charCodeAt(pos);
            if (marker === 45 || marker === 61) {
              pos = state.skipChars(pos, marker);
              pos = state.skipSpaces(pos);
              if (pos >= max) {
                level = marker === 61 ? 1 : 2;
                break;
              }
            }
          }
        }
        if (state.sCount[nextLine] < 0) {
          continue;
        }
        let terminate = false;
        for (let i = 0, l = terminatorRules.length; i < l; i++) {
          if (terminatorRules[i](state, nextLine, endLine, true)) {
            terminate = true;
            break;
          }
        }
        if (terminate) {
          break;
        }
      }
      if (!level) {
        return false;
      }
      const content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
      state.line = nextLine + 1;
      const token_o = state.push("heading_open", "h" + String(level), 1);
      token_o.markup = String.fromCharCode(marker);
      token_o.map = [startLine, state.line];
      const token_i = state.push("inline", "", 0);
      token_i.content = content;
      token_i.map = [startLine, state.line - 1];
      token_i.children = [];
      const token_c = state.push("heading_close", "h" + String(level), -1);
      token_c.markup = String.fromCharCode(marker);
      state.parentType = oldParentType;
      return true;
    }
    function paragraph(state, startLine, endLine) {
      const terminatorRules = state.md.block.ruler.getRules("paragraph");
      const oldParentType = state.parentType;
      let nextLine = startLine + 1;
      state.parentType = "paragraph";
      for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
        if (state.sCount[nextLine] - state.blkIndent > 3) {
          continue;
        }
        if (state.sCount[nextLine] < 0) {
          continue;
        }
        let terminate = false;
        for (let i = 0, l = terminatorRules.length; i < l; i++) {
          if (terminatorRules[i](state, nextLine, endLine, true)) {
            terminate = true;
            break;
          }
        }
        if (terminate) {
          break;
        }
      }
      const content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
      state.line = nextLine;
      const token_o = state.push("paragraph_open", "p", 1);
      token_o.map = [startLine, state.line];
      const token_i = state.push("inline", "", 0);
      token_i.content = content;
      token_i.map = [startLine, state.line];
      token_i.children = [];
      state.push("paragraph_close", "p", -1);
      state.parentType = oldParentType;
      return true;
    }
    var _rules$1 = [
      // First 2 params - rule name & source. Secondary array - list of rules,
      // which can be terminated by this one.
      ["table", table, ["paragraph", "reference"]],
      ["code", code],
      ["fence", fence, ["paragraph", "reference", "blockquote", "list"]],
      ["blockquote", blockquote, ["paragraph", "reference", "blockquote", "list"]],
      ["hr", hr, ["paragraph", "reference", "blockquote", "list"]],
      ["list", list, ["paragraph", "reference", "blockquote"]],
      ["reference", reference],
      ["html_block", html_block, ["paragraph", "reference", "blockquote"]],
      ["heading", heading, ["paragraph", "reference", "blockquote"]],
      ["lheading", lheading],
      ["paragraph", paragraph]
    ];
    function ParserBlock() {
      this.ruler = new Ruler();
      for (let i = 0; i < _rules$1.length; i++) {
        this.ruler.push(_rules$1[i][0], _rules$1[i][1], {
          alt: (_rules$1[i][2] || []).slice()
        });
      }
    }
    ParserBlock.prototype.tokenize = function(state, startLine, endLine) {
      const rules = this.ruler.getRules("");
      const len = rules.length;
      const maxNesting = state.md.options.maxNesting;
      let line = startLine;
      let hasEmptyLines = false;
      while (line < endLine) {
        state.line = line = state.skipEmptyLines(line);
        if (line >= endLine) {
          break;
        }
        if (state.sCount[line] < state.blkIndent) {
          break;
        }
        if (state.level >= maxNesting) {
          state.line = endLine;
          break;
        }
        const prevLine = state.line;
        let ok = false;
        for (let i = 0; i < len; i++) {
          ok = rules[i](state, line, endLine, false);
          if (ok) {
            if (prevLine >= state.line) {
              throw new Error("block rule didn't increment state.line");
            }
            break;
          }
        }
        if (!ok)
          throw new Error("none of the block rules matched");
        state.tight = !hasEmptyLines;
        if (state.isEmpty(state.line - 1)) {
          hasEmptyLines = true;
        }
        line = state.line;
        if (line < endLine && state.isEmpty(line)) {
          hasEmptyLines = true;
          line++;
          state.line = line;
        }
      }
    };
    ParserBlock.prototype.parse = function(src, md, env, outTokens) {
      if (!src) {
        return;
      }
      const state = new this.State(src, md, env, outTokens);
      this.tokenize(state, state.line, state.lineMax);
    };
    ParserBlock.prototype.State = StateBlock;
    function StateInline(src, md, env, outTokens) {
      this.src = src;
      this.env = env;
      this.md = md;
      this.tokens = outTokens;
      this.tokens_meta = Array(outTokens.length);
      this.pos = 0;
      this.posMax = this.src.length;
      this.level = 0;
      this.pending = "";
      this.pendingLevel = 0;
      this.cache = {};
      this.delimiters = [];
      this._prev_delimiters = [];
      this.backticks = {};
      this.backticksScanned = false;
      this.linkLevel = 0;
    }
    StateInline.prototype.pushPending = function() {
      const token = new Token("text", "", 0);
      token.content = this.pending;
      token.level = this.pendingLevel;
      this.tokens.push(token);
      this.pending = "";
      return token;
    };
    StateInline.prototype.push = function(type, tag, nesting) {
      if (this.pending) {
        this.pushPending();
      }
      const token = new Token(type, tag, nesting);
      let token_meta = null;
      if (nesting < 0) {
        this.level--;
        this.delimiters = this._prev_delimiters.pop();
      }
      token.level = this.level;
      if (nesting > 0) {
        this.level++;
        this._prev_delimiters.push(this.delimiters);
        this.delimiters = [];
        token_meta = {
          delimiters: this.delimiters
        };
      }
      this.pendingLevel = this.level;
      this.tokens.push(token);
      this.tokens_meta.push(token_meta);
      return token;
    };
    StateInline.prototype.scanDelims = function(start, canSplitWord) {
      const max = this.posMax;
      const marker = this.src.charCodeAt(start);
      const lastChar = start > 0 ? this.src.charCodeAt(start - 1) : 32;
      let pos = start;
      while (pos < max && this.src.charCodeAt(pos) === marker) {
        pos++;
      }
      const count = pos - start;
      const nextChar = pos < max ? this.src.charCodeAt(pos) : 32;
      const isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
      const isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));
      const isLastWhiteSpace = isWhiteSpace2(lastChar);
      const isNextWhiteSpace = isWhiteSpace2(nextChar);
      const left_flanking = !isNextWhiteSpace && (!isNextPunctChar || isLastWhiteSpace || isLastPunctChar);
      const right_flanking = !isLastWhiteSpace && (!isLastPunctChar || isNextWhiteSpace || isNextPunctChar);
      const can_open = left_flanking && (canSplitWord || !right_flanking || isLastPunctChar);
      const can_close = right_flanking && (canSplitWord || !left_flanking || isNextPunctChar);
      return {
        can_open,
        can_close,
        length: count
      };
    };
    StateInline.prototype.Token = Token;
    function isTerminatorChar(ch) {
      switch (ch) {
        case 10:
        case 33:
        case 35:
        case 36:
        case 37:
        case 38:
        case 42:
        case 43:
        case 45:
        case 58:
        case 60:
        case 61:
        case 62:
        case 64:
        case 91:
        case 92:
        case 93:
        case 94:
        case 95:
        case 96:
        case 123:
        case 125:
        case 126:
          return true;
        default:
          return false;
      }
    }
    function text(state, silent) {
      let pos = state.pos;
      while (pos < state.posMax && !isTerminatorChar(state.src.charCodeAt(pos))) {
        pos++;
      }
      if (pos === state.pos) {
        return false;
      }
      if (!silent) {
        state.pending += state.src.slice(state.pos, pos);
      }
      state.pos = pos;
      return true;
    }
    var SCHEME_RE = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;
    function linkify(state, silent) {
      if (!state.md.options.linkify)
        return false;
      if (state.linkLevel > 0)
        return false;
      const pos = state.pos;
      const max = state.posMax;
      if (pos + 3 > max)
        return false;
      if (state.src.charCodeAt(pos) !== 58)
        return false;
      if (state.src.charCodeAt(pos + 1) !== 47)
        return false;
      if (state.src.charCodeAt(pos + 2) !== 47)
        return false;
      const match = state.pending.match(SCHEME_RE);
      if (!match)
        return false;
      const proto = match[1];
      const link2 = state.md.linkify.matchAtStart(state.src.slice(pos - proto.length));
      if (!link2)
        return false;
      let url = link2.url;
      if (url.length <= proto.length)
        return false;
      url = url.replace(/\*+$/, "");
      const fullUrl = state.md.normalizeLink(url);
      if (!state.md.validateLink(fullUrl))
        return false;
      if (!silent) {
        state.pending = state.pending.slice(0, -proto.length);
        const token_o = state.push("link_open", "a", 1);
        token_o.attrs = [["href", fullUrl]];
        token_o.markup = "linkify";
        token_o.info = "auto";
        const token_t = state.push("text", "", 0);
        token_t.content = state.md.normalizeLinkText(url);
        const token_c = state.push("link_close", "a", -1);
        token_c.markup = "linkify";
        token_c.info = "auto";
      }
      state.pos += url.length - proto.length;
      return true;
    }
    function newline(state, silent) {
      let pos = state.pos;
      if (state.src.charCodeAt(pos) !== 10) {
        return false;
      }
      const pmax = state.pending.length - 1;
      const max = state.posMax;
      if (!silent) {
        if (pmax >= 0 && state.pending.charCodeAt(pmax) === 32) {
          if (pmax >= 1 && state.pending.charCodeAt(pmax - 1) === 32) {
            let ws = pmax - 1;
            while (ws >= 1 && state.pending.charCodeAt(ws - 1) === 32)
              ws--;
            state.pending = state.pending.slice(0, ws);
            state.push("hardbreak", "br", 0);
          } else {
            state.pending = state.pending.slice(0, -1);
            state.push("softbreak", "br", 0);
          }
        } else {
          state.push("softbreak", "br", 0);
        }
      }
      pos++;
      while (pos < max && isSpace(state.src.charCodeAt(pos))) {
        pos++;
      }
      state.pos = pos;
      return true;
    }
    var ESCAPED = [];
    for (let i = 0; i < 256; i++) {
      ESCAPED.push(0);
    }
    "\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(ch) {
      ESCAPED[ch.charCodeAt(0)] = 1;
    });
    function escape(state, silent) {
      let pos = state.pos;
      const max = state.posMax;
      if (state.src.charCodeAt(pos) !== 92)
        return false;
      pos++;
      if (pos >= max)
        return false;
      let ch1 = state.src.charCodeAt(pos);
      if (ch1 === 10) {
        if (!silent) {
          state.push("hardbreak", "br", 0);
        }
        pos++;
        while (pos < max) {
          ch1 = state.src.charCodeAt(pos);
          if (!isSpace(ch1))
            break;
          pos++;
        }
        state.pos = pos;
        return true;
      }
      let escapedStr = state.src[pos];
      if (ch1 >= 55296 && ch1 <= 56319 && pos + 1 < max) {
        const ch2 = state.src.charCodeAt(pos + 1);
        if (ch2 >= 56320 && ch2 <= 57343) {
          escapedStr += state.src[pos + 1];
          pos++;
        }
      }
      const origStr = "\\" + escapedStr;
      if (!silent) {
        const token = state.push("text_special", "", 0);
        if (ch1 < 256 && ESCAPED[ch1] !== 0) {
          token.content = escapedStr;
        } else {
          token.content = origStr;
        }
        token.markup = origStr;
        token.info = "escape";
      }
      state.pos = pos + 1;
      return true;
    }
    function backtick(state, silent) {
      let pos = state.pos;
      const ch = state.src.charCodeAt(pos);
      if (ch !== 96) {
        return false;
      }
      const start = pos;
      pos++;
      const max = state.posMax;
      while (pos < max && state.src.charCodeAt(pos) === 96) {
        pos++;
      }
      const marker = state.src.slice(start, pos);
      const openerLength = marker.length;
      if (state.backticksScanned && (state.backticks[openerLength] || 0) <= start) {
        if (!silent)
          state.pending += marker;
        state.pos += openerLength;
        return true;
      }
      let matchEnd = pos;
      let matchStart;
      while ((matchStart = state.src.indexOf("`", matchEnd)) !== -1) {
        matchEnd = matchStart + 1;
        while (matchEnd < max && state.src.charCodeAt(matchEnd) === 96) {
          matchEnd++;
        }
        const closerLength = matchEnd - matchStart;
        if (closerLength === openerLength) {
          if (!silent) {
            const token = state.push("code_inline", "code", 0);
            token.markup = marker;
            token.content = state.src.slice(pos, matchStart).replace(/\n/g, " ").replace(/^ (.+) $/, "$1");
          }
          state.pos = matchEnd;
          return true;
        }
        state.backticks[closerLength] = matchStart;
      }
      state.backticksScanned = true;
      if (!silent)
        state.pending += marker;
      state.pos += openerLength;
      return true;
    }
    function strikethrough_tokenize(state, silent) {
      const start = state.pos;
      const marker = state.src.charCodeAt(start);
      if (silent) {
        return false;
      }
      if (marker !== 126) {
        return false;
      }
      const scanned = state.scanDelims(state.pos, true);
      let len = scanned.length;
      const ch = String.fromCharCode(marker);
      if (len < 2) {
        return false;
      }
      let token;
      if (len % 2) {
        token = state.push("text", "", 0);
        token.content = ch;
        len--;
      }
      for (let i = 0; i < len; i += 2) {
        token = state.push("text", "", 0);
        token.content = ch + ch;
        state.delimiters.push({
          marker,
          length: 0,
          // disable "rule of 3" length checks meant for emphasis
          token: state.tokens.length - 1,
          end: -1,
          open: scanned.can_open,
          close: scanned.can_close
        });
      }
      state.pos += scanned.length;
      return true;
    }
    function postProcess$1(state, delimiters) {
      let token;
      const loneMarkers = [];
      const max = delimiters.length;
      for (let i = 0; i < max; i++) {
        const startDelim = delimiters[i];
        if (startDelim.marker !== 126) {
          continue;
        }
        if (startDelim.end === -1) {
          continue;
        }
        const endDelim = delimiters[startDelim.end];
        token = state.tokens[startDelim.token];
        token.type = "s_open";
        token.tag = "s";
        token.nesting = 1;
        token.markup = "~~";
        token.content = "";
        token = state.tokens[endDelim.token];
        token.type = "s_close";
        token.tag = "s";
        token.nesting = -1;
        token.markup = "~~";
        token.content = "";
        if (state.tokens[endDelim.token - 1].type === "text" && state.tokens[endDelim.token - 1].content === "~") {
          loneMarkers.push(endDelim.token - 1);
        }
      }
      while (loneMarkers.length) {
        const i = loneMarkers.pop();
        let j = i + 1;
        while (j < state.tokens.length && state.tokens[j].type === "s_close") {
          j++;
        }
        j--;
        if (i !== j) {
          token = state.tokens[j];
          state.tokens[j] = state.tokens[i];
          state.tokens[i] = token;
        }
      }
    }
    function strikethrough_postProcess(state) {
      const tokens_meta = state.tokens_meta;
      const max = state.tokens_meta.length;
      postProcess$1(state, state.delimiters);
      for (let curr = 0; curr < max; curr++) {
        if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
          postProcess$1(state, tokens_meta[curr].delimiters);
        }
      }
    }
    var r_strikethrough = {
      tokenize: strikethrough_tokenize,
      postProcess: strikethrough_postProcess
    };
    function emphasis_tokenize(state, silent) {
      const start = state.pos;
      const marker = state.src.charCodeAt(start);
      if (silent) {
        return false;
      }
      if (marker !== 95 && marker !== 42) {
        return false;
      }
      const scanned = state.scanDelims(state.pos, marker === 42);
      for (let i = 0; i < scanned.length; i++) {
        const token = state.push("text", "", 0);
        token.content = String.fromCharCode(marker);
        state.delimiters.push({
          // Char code of the starting marker (number).
          //
          marker,
          // Total length of these series of delimiters.
          //
          length: scanned.length,
          // A position of the token this delimiter corresponds to.
          //
          token: state.tokens.length - 1,
          // If this delimiter is matched as a valid opener, `end` will be
          // equal to its position, otherwise it's `-1`.
          //
          end: -1,
          // Boolean flags that determine if this delimiter could open or close
          // an emphasis.
          //
          open: scanned.can_open,
          close: scanned.can_close
        });
      }
      state.pos += scanned.length;
      return true;
    }
    function postProcess(state, delimiters) {
      const max = delimiters.length;
      for (let i = max - 1; i >= 0; i--) {
        const startDelim = delimiters[i];
        if (startDelim.marker !== 95 && startDelim.marker !== 42) {
          continue;
        }
        if (startDelim.end === -1) {
          continue;
        }
        const endDelim = delimiters[startDelim.end];
        const isStrong = i > 0 && delimiters[i - 1].end === startDelim.end + 1 && // check that first two markers match and adjacent
        delimiters[i - 1].marker === startDelim.marker && delimiters[i - 1].token === startDelim.token - 1 && // check that last two markers are adjacent (we can safely assume they match)
        delimiters[startDelim.end + 1].token === endDelim.token + 1;
        const ch = String.fromCharCode(startDelim.marker);
        const token_o = state.tokens[startDelim.token];
        token_o.type = isStrong ? "strong_open" : "em_open";
        token_o.tag = isStrong ? "strong" : "em";
        token_o.nesting = 1;
        token_o.markup = isStrong ? ch + ch : ch;
        token_o.content = "";
        const token_c = state.tokens[endDelim.token];
        token_c.type = isStrong ? "strong_close" : "em_close";
        token_c.tag = isStrong ? "strong" : "em";
        token_c.nesting = -1;
        token_c.markup = isStrong ? ch + ch : ch;
        token_c.content = "";
        if (isStrong) {
          state.tokens[delimiters[i - 1].token].content = "";
          state.tokens[delimiters[startDelim.end + 1].token].content = "";
          i--;
        }
      }
    }
    function emphasis_post_process(state) {
      const tokens_meta = state.tokens_meta;
      const max = state.tokens_meta.length;
      postProcess(state, state.delimiters);
      for (let curr = 0; curr < max; curr++) {
        if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
          postProcess(state, tokens_meta[curr].delimiters);
        }
      }
    }
    var r_emphasis = {
      tokenize: emphasis_tokenize,
      postProcess: emphasis_post_process
    };
    function link(state, silent) {
      let code2, label, res, ref;
      let href = "";
      let title = "";
      let start = state.pos;
      let parseReference = true;
      if (state.src.charCodeAt(state.pos) !== 91) {
        return false;
      }
      const oldPos = state.pos;
      const max = state.posMax;
      const labelStart = state.pos + 1;
      const labelEnd = state.md.helpers.parseLinkLabel(state, state.pos, true);
      if (labelEnd < 0) {
        return false;
      }
      let pos = labelEnd + 1;
      if (pos < max && state.src.charCodeAt(pos) === 40) {
        parseReference = false;
        pos++;
        for (; pos < max; pos++) {
          code2 = state.src.charCodeAt(pos);
          if (!isSpace(code2) && code2 !== 10) {
            break;
          }
        }
        if (pos >= max) {
          return false;
        }
        start = pos;
        res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
        if (res.ok) {
          href = state.md.normalizeLink(res.str);
          if (state.md.validateLink(href)) {
            pos = res.pos;
          } else {
            href = "";
          }
          start = pos;
          for (; pos < max; pos++) {
            code2 = state.src.charCodeAt(pos);
            if (!isSpace(code2) && code2 !== 10) {
              break;
            }
          }
          res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
          if (pos < max && start !== pos && res.ok) {
            title = res.str;
            pos = res.pos;
            for (; pos < max; pos++) {
              code2 = state.src.charCodeAt(pos);
              if (!isSpace(code2) && code2 !== 10) {
                break;
              }
            }
          }
        }
        if (pos >= max || state.src.charCodeAt(pos) !== 41) {
          parseReference = true;
        }
        pos++;
      }
      if (parseReference) {
        if (typeof state.env.references === "undefined") {
          return false;
        }
        if (pos < max && state.src.charCodeAt(pos) === 91) {
          start = pos + 1;
          pos = state.md.helpers.parseLinkLabel(state, pos);
          if (pos >= 0) {
            label = state.src.slice(start, pos++);
          } else {
            pos = labelEnd + 1;
          }
        } else {
          pos = labelEnd + 1;
        }
        if (!label) {
          label = state.src.slice(labelStart, labelEnd);
        }
        ref = state.env.references[normalizeReference(label)];
        if (!ref) {
          state.pos = oldPos;
          return false;
        }
        href = ref.href;
        title = ref.title;
      }
      if (!silent) {
        state.pos = labelStart;
        state.posMax = labelEnd;
        const token_o = state.push("link_open", "a", 1);
        const attrs = [["href", href]];
        token_o.attrs = attrs;
        if (title) {
          attrs.push(["title", title]);
        }
        state.linkLevel++;
        state.md.inline.tokenize(state);
        state.linkLevel--;
        state.push("link_close", "a", -1);
      }
      state.pos = pos;
      state.posMax = max;
      return true;
    }
    function image(state, silent) {
      let code2, content, label, pos, ref, res, title, start;
      let href = "";
      const oldPos = state.pos;
      const max = state.posMax;
      if (state.src.charCodeAt(state.pos) !== 33) {
        return false;
      }
      if (state.src.charCodeAt(state.pos + 1) !== 91) {
        return false;
      }
      const labelStart = state.pos + 2;
      const labelEnd = state.md.helpers.parseLinkLabel(state, state.pos + 1, false);
      if (labelEnd < 0) {
        return false;
      }
      pos = labelEnd + 1;
      if (pos < max && state.src.charCodeAt(pos) === 40) {
        pos++;
        for (; pos < max; pos++) {
          code2 = state.src.charCodeAt(pos);
          if (!isSpace(code2) && code2 !== 10) {
            break;
          }
        }
        if (pos >= max) {
          return false;
        }
        start = pos;
        res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
        if (res.ok) {
          href = state.md.normalizeLink(res.str);
          if (state.md.validateLink(href)) {
            pos = res.pos;
          } else {
            href = "";
          }
        }
        start = pos;
        for (; pos < max; pos++) {
          code2 = state.src.charCodeAt(pos);
          if (!isSpace(code2) && code2 !== 10) {
            break;
          }
        }
        res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
        if (pos < max && start !== pos && res.ok) {
          title = res.str;
          pos = res.pos;
          for (; pos < max; pos++) {
            code2 = state.src.charCodeAt(pos);
            if (!isSpace(code2) && code2 !== 10) {
              break;
            }
          }
        } else {
          title = "";
        }
        if (pos >= max || state.src.charCodeAt(pos) !== 41) {
          state.pos = oldPos;
          return false;
        }
        pos++;
      } else {
        if (typeof state.env.references === "undefined") {
          return false;
        }
        if (pos < max && state.src.charCodeAt(pos) === 91) {
          start = pos + 1;
          pos = state.md.helpers.parseLinkLabel(state, pos);
          if (pos >= 0) {
            label = state.src.slice(start, pos++);
          } else {
            pos = labelEnd + 1;
          }
        } else {
          pos = labelEnd + 1;
        }
        if (!label) {
          label = state.src.slice(labelStart, labelEnd);
        }
        ref = state.env.references[normalizeReference(label)];
        if (!ref) {
          state.pos = oldPos;
          return false;
        }
        href = ref.href;
        title = ref.title;
      }
      if (!silent) {
        content = state.src.slice(labelStart, labelEnd);
        const tokens = [];
        state.md.inline.parse(content, state.md, state.env, tokens);
        const token = state.push("image", "img", 0);
        const attrs = [["src", href], ["alt", ""]];
        token.attrs = attrs;
        token.children = tokens;
        token.content = content;
        if (title) {
          attrs.push(["title", title]);
        }
      }
      state.pos = pos;
      state.posMax = max;
      return true;
    }
    var EMAIL_RE = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/;
    var AUTOLINK_RE = /^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;
    function autolink(state, silent) {
      let pos = state.pos;
      if (state.src.charCodeAt(pos) !== 60) {
        return false;
      }
      const start = state.pos;
      const max = state.posMax;
      for (; ; ) {
        if (++pos >= max)
          return false;
        const ch = state.src.charCodeAt(pos);
        if (ch === 60)
          return false;
        if (ch === 62)
          break;
      }
      const url = state.src.slice(start + 1, pos);
      if (AUTOLINK_RE.test(url)) {
        const fullUrl = state.md.normalizeLink(url);
        if (!state.md.validateLink(fullUrl)) {
          return false;
        }
        if (!silent) {
          const token_o = state.push("link_open", "a", 1);
          token_o.attrs = [["href", fullUrl]];
          token_o.markup = "autolink";
          token_o.info = "auto";
          const token_t = state.push("text", "", 0);
          token_t.content = state.md.normalizeLinkText(url);
          const token_c = state.push("link_close", "a", -1);
          token_c.markup = "autolink";
          token_c.info = "auto";
        }
        state.pos += url.length + 2;
        return true;
      }
      if (EMAIL_RE.test(url)) {
        const fullUrl = state.md.normalizeLink("mailto:" + url);
        if (!state.md.validateLink(fullUrl)) {
          return false;
        }
        if (!silent) {
          const token_o = state.push("link_open", "a", 1);
          token_o.attrs = [["href", fullUrl]];
          token_o.markup = "autolink";
          token_o.info = "auto";
          const token_t = state.push("text", "", 0);
          token_t.content = state.md.normalizeLinkText(url);
          const token_c = state.push("link_close", "a", -1);
          token_c.markup = "autolink";
          token_c.info = "auto";
        }
        state.pos += url.length + 2;
        return true;
      }
      return false;
    }
    function isLinkOpen(str) {
      return /^<a[>\s]/i.test(str);
    }
    function isLinkClose(str) {
      return /^<\/a\s*>/i.test(str);
    }
    function isLetter(ch) {
      const lc = ch | 32;
      return lc >= 97 && lc <= 122;
    }
    function html_inline(state, silent) {
      if (!state.md.options.html) {
        return false;
      }
      const max = state.posMax;
      const pos = state.pos;
      if (state.src.charCodeAt(pos) !== 60 || pos + 2 >= max) {
        return false;
      }
      const ch = state.src.charCodeAt(pos + 1);
      if (ch !== 33 && ch !== 63 && ch !== 47 && !isLetter(ch)) {
        return false;
      }
      const match = state.src.slice(pos).match(HTML_TAG_RE);
      if (!match) {
        return false;
      }
      if (!silent) {
        const token = state.push("html_inline", "", 0);
        token.content = match[0];
        if (isLinkOpen(token.content))
          state.linkLevel++;
        if (isLinkClose(token.content))
          state.linkLevel--;
      }
      state.pos += match[0].length;
      return true;
    }
    var DIGITAL_RE = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i;
    var NAMED_RE = /^&([a-z][a-z0-9]{1,31});/i;
    function entity(state, silent) {
      const pos = state.pos;
      const max = state.posMax;
      if (state.src.charCodeAt(pos) !== 38)
        return false;
      if (pos + 1 >= max)
        return false;
      const ch = state.src.charCodeAt(pos + 1);
      if (ch === 35) {
        const match = state.src.slice(pos).match(DIGITAL_RE);
        if (match) {
          if (!silent) {
            const code2 = match[1][0].toLowerCase() === "x" ? parseInt(match[1].slice(1), 16) : parseInt(match[1], 10);
            const token = state.push("text_special", "", 0);
            token.content = isValidEntityCode(code2) ? fromCodePoint(code2) : fromCodePoint(65533);
            token.markup = match[0];
            token.info = "entity";
          }
          state.pos += match[0].length;
          return true;
        }
      } else {
        const match = state.src.slice(pos).match(NAMED_RE);
        if (match) {
          const decoded = entities.decodeHTML(match[0]);
          if (decoded !== match[0]) {
            if (!silent) {
              const token = state.push("text_special", "", 0);
              token.content = decoded;
              token.markup = match[0];
              token.info = "entity";
            }
            state.pos += match[0].length;
            return true;
          }
        }
      }
      return false;
    }
    function processDelimiters(delimiters) {
      const openersBottom = {};
      const max = delimiters.length;
      if (!max)
        return;
      let headerIdx = 0;
      let lastTokenIdx = -2;
      const jumps = [];
      for (let closerIdx = 0; closerIdx < max; closerIdx++) {
        const closer = delimiters[closerIdx];
        jumps.push(0);
        if (delimiters[headerIdx].marker !== closer.marker || lastTokenIdx !== closer.token - 1) {
          headerIdx = closerIdx;
        }
        lastTokenIdx = closer.token;
        closer.length = closer.length || 0;
        if (!closer.close)
          continue;
        if (!openersBottom.hasOwnProperty(closer.marker)) {
          openersBottom[closer.marker] = [-1, -1, -1, -1, -1, -1];
        }
        const minOpenerIdx = openersBottom[closer.marker][(closer.open ? 3 : 0) + closer.length % 3];
        let openerIdx = headerIdx - jumps[headerIdx] - 1;
        let newMinOpenerIdx = openerIdx;
        for (; openerIdx > minOpenerIdx; openerIdx -= jumps[openerIdx] + 1) {
          const opener = delimiters[openerIdx];
          if (opener.marker !== closer.marker)
            continue;
          if (opener.open && opener.end < 0) {
            let isOddMatch = false;
            if (opener.close || closer.open) {
              if ((opener.length + closer.length) % 3 === 0) {
                if (opener.length % 3 !== 0 || closer.length % 3 !== 0) {
                  isOddMatch = true;
                }
              }
            }
            if (!isOddMatch) {
              const lastJump = openerIdx > 0 && !delimiters[openerIdx - 1].open ? jumps[openerIdx - 1] + 1 : 0;
              jumps[closerIdx] = closerIdx - openerIdx + lastJump;
              jumps[openerIdx] = lastJump;
              closer.open = false;
              opener.end = closerIdx;
              opener.close = false;
              newMinOpenerIdx = -1;
              lastTokenIdx = -2;
              break;
            }
          }
        }
        if (newMinOpenerIdx !== -1) {
          openersBottom[closer.marker][(closer.open ? 3 : 0) + (closer.length || 0) % 3] = newMinOpenerIdx;
        }
      }
    }
    function link_pairs(state) {
      const tokens_meta = state.tokens_meta;
      const max = state.tokens_meta.length;
      processDelimiters(state.delimiters);
      for (let curr = 0; curr < max; curr++) {
        if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
          processDelimiters(tokens_meta[curr].delimiters);
        }
      }
    }
    function fragments_join(state) {
      let curr, last;
      let level = 0;
      const tokens = state.tokens;
      const max = state.tokens.length;
      for (curr = last = 0; curr < max; curr++) {
        if (tokens[curr].nesting < 0)
          level--;
        tokens[curr].level = level;
        if (tokens[curr].nesting > 0)
          level++;
        if (tokens[curr].type === "text" && curr + 1 < max && tokens[curr + 1].type === "text") {
          tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
        } else {
          if (curr !== last) {
            tokens[last] = tokens[curr];
          }
          last++;
        }
      }
      if (curr !== last) {
        tokens.length = last;
      }
    }
    var _rules = [["text", text], ["linkify", linkify], ["newline", newline], ["escape", escape], ["backticks", backtick], ["strikethrough", r_strikethrough.tokenize], ["emphasis", r_emphasis.tokenize], ["link", link], ["image", image], ["autolink", autolink], ["html_inline", html_inline], ["entity", entity]];
    var _rules2 = [
      ["balance_pairs", link_pairs],
      ["strikethrough", r_strikethrough.postProcess],
      ["emphasis", r_emphasis.postProcess],
      // rules for pairs separate '**' into its own text tokens, which may be left unused,
      // rule below merges unused segments back with the rest of the text
      ["fragments_join", fragments_join]
    ];
    function ParserInline() {
      this.ruler = new Ruler();
      for (let i = 0; i < _rules.length; i++) {
        this.ruler.push(_rules[i][0], _rules[i][1]);
      }
      this.ruler2 = new Ruler();
      for (let i = 0; i < _rules2.length; i++) {
        this.ruler2.push(_rules2[i][0], _rules2[i][1]);
      }
    }
    ParserInline.prototype.skipToken = function(state) {
      const pos = state.pos;
      const rules = this.ruler.getRules("");
      const len = rules.length;
      const maxNesting = state.md.options.maxNesting;
      const cache = state.cache;
      if (typeof cache[pos] !== "undefined") {
        state.pos = cache[pos];
        return;
      }
      let ok = false;
      if (state.level < maxNesting) {
        for (let i = 0; i < len; i++) {
          state.level++;
          ok = rules[i](state, true);
          state.level--;
          if (ok) {
            if (pos >= state.pos) {
              throw new Error("inline rule didn't increment state.pos");
            }
            break;
          }
        }
      } else {
        state.pos = state.posMax;
      }
      if (!ok) {
        state.pos++;
      }
      cache[pos] = state.pos;
    };
    ParserInline.prototype.tokenize = function(state) {
      const rules = this.ruler.getRules("");
      const len = rules.length;
      const end = state.posMax;
      const maxNesting = state.md.options.maxNesting;
      while (state.pos < end) {
        const prevPos = state.pos;
        let ok = false;
        if (state.level < maxNesting) {
          for (let i = 0; i < len; i++) {
            ok = rules[i](state, false);
            if (ok) {
              if (prevPos >= state.pos) {
                throw new Error("inline rule didn't increment state.pos");
              }
              break;
            }
          }
        }
        if (ok) {
          if (state.pos >= end) {
            break;
          }
          continue;
        }
        state.pending += state.src[state.pos++];
      }
      if (state.pending) {
        state.pushPending();
      }
    };
    ParserInline.prototype.parse = function(str, md, env, outTokens) {
      const state = new this.State(str, md, env, outTokens);
      this.tokenize(state);
      const rules = this.ruler2.getRules("");
      const len = rules.length;
      for (let i = 0; i < len; i++) {
        rules[i](state);
      }
    };
    ParserInline.prototype.State = StateInline;
    var cfg_default = {
      options: {
        // Enable HTML tags in source
        html: false,
        // Use '/' to close single tags (<br />)
        xhtmlOut: false,
        // Convert '\n' in paragraphs into <br>
        breaks: false,
        // CSS language prefix for fenced blocks
        langPrefix: "language-",
        // autoconvert URL-like texts to links
        linkify: false,
        // Enable some language-neutral replacements + quotes beautification
        typographer: false,
        // Double + single quotes replacement pairs, when typographer enabled,
        // and smartquotes on. Could be either a String or an Array.
        //
        // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
        // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
        quotes: "\u201C\u201D\u2018\u2019",
        /* “”‘’ */
        // Highlighter function. Should return escaped HTML,
        // or '' if the source string is not changed and should be escaped externaly.
        // If result starts with <pre... internal wrapper is skipped.
        //
        // function (/*str, lang*/) { return ''; }
        //
        highlight: null,
        // Internal protection, recursion limit
        maxNesting: 100
      },
      components: {
        core: {},
        block: {},
        inline: {}
      }
    };
    var cfg_zero = {
      options: {
        // Enable HTML tags in source
        html: false,
        // Use '/' to close single tags (<br />)
        xhtmlOut: false,
        // Convert '\n' in paragraphs into <br>
        breaks: false,
        // CSS language prefix for fenced blocks
        langPrefix: "language-",
        // autoconvert URL-like texts to links
        linkify: false,
        // Enable some language-neutral replacements + quotes beautification
        typographer: false,
        // Double + single quotes replacement pairs, when typographer enabled,
        // and smartquotes on. Could be either a String or an Array.
        //
        // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
        // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
        quotes: "\u201C\u201D\u2018\u2019",
        /* “”‘’ */
        // Highlighter function. Should return escaped HTML,
        // or '' if the source string is not changed and should be escaped externaly.
        // If result starts with <pre... internal wrapper is skipped.
        //
        // function (/*str, lang*/) { return ''; }
        //
        highlight: null,
        // Internal protection, recursion limit
        maxNesting: 20
      },
      components: {
        core: {
          rules: ["normalize", "block", "inline", "text_join"]
        },
        block: {
          rules: ["paragraph"]
        },
        inline: {
          rules: ["text"],
          rules2: ["balance_pairs", "fragments_join"]
        }
      }
    };
    var cfg_commonmark = {
      options: {
        // Enable HTML tags in source
        html: true,
        // Use '/' to close single tags (<br />)
        xhtmlOut: true,
        // Convert '\n' in paragraphs into <br>
        breaks: false,
        // CSS language prefix for fenced blocks
        langPrefix: "language-",
        // autoconvert URL-like texts to links
        linkify: false,
        // Enable some language-neutral replacements + quotes beautification
        typographer: false,
        // Double + single quotes replacement pairs, when typographer enabled,
        // and smartquotes on. Could be either a String or an Array.
        //
        // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
        // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
        quotes: "\u201C\u201D\u2018\u2019",
        /* “”‘’ */
        // Highlighter function. Should return escaped HTML,
        // or '' if the source string is not changed and should be escaped externaly.
        // If result starts with <pre... internal wrapper is skipped.
        //
        // function (/*str, lang*/) { return ''; }
        //
        highlight: null,
        // Internal protection, recursion limit
        maxNesting: 20
      },
      components: {
        core: {
          rules: ["normalize", "block", "inline", "text_join"]
        },
        block: {
          rules: ["blockquote", "code", "fence", "heading", "hr", "html_block", "lheading", "list", "reference", "paragraph"]
        },
        inline: {
          rules: ["autolink", "backticks", "emphasis", "entity", "escape", "html_inline", "image", "link", "newline", "text"],
          rules2: ["balance_pairs", "emphasis", "fragments_join"]
        }
      }
    };
    var config = {
      default: cfg_default,
      zero: cfg_zero,
      commonmark: cfg_commonmark
    };
    var BAD_PROTO_RE = /^(vbscript|javascript|file|data):/;
    var GOOD_DATA_RE = /^data:image\/(gif|png|jpeg|webp);/;
    function validateLink(url) {
      const str = url.trim().toLowerCase();
      return BAD_PROTO_RE.test(str) ? GOOD_DATA_RE.test(str) : true;
    }
    var RECODE_HOSTNAME_FOR = ["http:", "https:", "mailto:"];
    function normalizeLink(url) {
      const parsed = mdurl__namespace.parse(url, true);
      if (parsed.hostname) {
        if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
          try {
            parsed.hostname = punycode2.toASCII(parsed.hostname);
          } catch (er) {
          }
        }
      }
      return mdurl__namespace.encode(mdurl__namespace.format(parsed));
    }
    function normalizeLinkText(url) {
      const parsed = mdurl__namespace.parse(url, true);
      if (parsed.hostname) {
        if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
          try {
            parsed.hostname = punycode2.toUnicode(parsed.hostname);
          } catch (er) {
          }
        }
      }
      return mdurl__namespace.decode(mdurl__namespace.format(parsed), mdurl__namespace.decode.defaultChars + "%");
    }
    function MarkdownIt(presetName, options) {
      if (!(this instanceof MarkdownIt)) {
        return new MarkdownIt(presetName, options);
      }
      if (!options) {
        if (!isString(presetName)) {
          options = presetName || {};
          presetName = "default";
        }
      }
      this.inline = new ParserInline();
      this.block = new ParserBlock();
      this.core = new Core();
      this.renderer = new Renderer();
      this.linkify = new LinkifyIt();
      this.validateLink = validateLink;
      this.normalizeLink = normalizeLink;
      this.normalizeLinkText = normalizeLinkText;
      this.utils = utils;
      this.helpers = assign({}, helpers);
      this.options = {};
      this.configure(presetName);
      if (options) {
        this.set(options);
      }
    }
    MarkdownIt.prototype.set = function(options) {
      assign(this.options, options);
      return this;
    };
    MarkdownIt.prototype.configure = function(presets) {
      const self = this;
      if (isString(presets)) {
        const presetName = presets;
        presets = config[presetName];
        if (!presets) {
          throw new Error('Wrong `markdown-it` preset "' + presetName + '", check name');
        }
      }
      if (!presets) {
        throw new Error("Wrong `markdown-it` preset, can't be empty");
      }
      if (presets.options) {
        self.set(presets.options);
      }
      if (presets.components) {
        Object.keys(presets.components).forEach(function(name) {
          if (presets.components[name].rules) {
            self[name].ruler.enableOnly(presets.components[name].rules);
          }
          if (presets.components[name].rules2) {
            self[name].ruler2.enableOnly(presets.components[name].rules2);
          }
        });
      }
      return this;
    };
    MarkdownIt.prototype.enable = function(list2, ignoreInvalid) {
      let result = [];
      if (!Array.isArray(list2)) {
        list2 = [list2];
      }
      ["core", "block", "inline"].forEach(function(chain) {
        result = result.concat(this[chain].ruler.enable(list2, true));
      }, this);
      result = result.concat(this.inline.ruler2.enable(list2, true));
      const missed = list2.filter(function(name) {
        return result.indexOf(name) < 0;
      });
      if (missed.length && !ignoreInvalid) {
        throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + missed);
      }
      return this;
    };
    MarkdownIt.prototype.disable = function(list2, ignoreInvalid) {
      let result = [];
      if (!Array.isArray(list2)) {
        list2 = [list2];
      }
      ["core", "block", "inline"].forEach(function(chain) {
        result = result.concat(this[chain].ruler.disable(list2, true));
      }, this);
      result = result.concat(this.inline.ruler2.disable(list2, true));
      const missed = list2.filter(function(name) {
        return result.indexOf(name) < 0;
      });
      if (missed.length && !ignoreInvalid) {
        throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + missed);
      }
      return this;
    };
    MarkdownIt.prototype.use = function(plugin) {
      const args = [this].concat(Array.prototype.slice.call(arguments, 1));
      plugin.apply(plugin, args);
      return this;
    };
    MarkdownIt.prototype.parse = function(src, env) {
      if (typeof src !== "string") {
        throw new Error("Input data should be a String");
      }
      const state = new this.core.State(src, this, env);
      this.core.process(state);
      return state.tokens;
    };
    MarkdownIt.prototype.render = function(src, env) {
      env = env || {};
      return this.renderer.render(this.parse(src, env), this.options, env);
    };
    MarkdownIt.prototype.parseInline = function(src, env) {
      const state = new this.core.State(src, this, env);
      state.inlineMode = true;
      this.core.process(state);
      return state.tokens;
    };
    MarkdownIt.prototype.renderInline = function(src, env) {
      env = env || {};
      return this.renderer.render(this.parseInline(src, env), this.options, env);
    };
    module2.exports = MarkdownIt;
  }
});

// node_modules/markdownlint-micromark/micromark.cjs
var require_micromark = __commonJS({
  "node_modules/markdownlint-micromark/micromark.cjs"(exports2) {
    (() => {
      "use strict";
      var e = { d: (t2, n2) => {
        for (var r2 in n2)
          e.o(n2, r2) && !e.o(t2, r2) && Object.defineProperty(t2, r2, { enumerable: true, get: n2[r2] });
      }, o: (e2, t2) => Object.prototype.hasOwnProperty.call(e2, t2), r: (e2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      } }, t = {};
      e.r(t), e.d(t, { directive: () => F, gfmAutolinkLiteral: () => B, gfmFootnote: () => K, gfmTable: () => ce, math: () => be, parse: () => It, postprocess: () => Mt, preprocess: () => Ot });
      var n = {};
      e.r(n), e.d(n, { attentionMarkers: () => Ft, contentInitial: () => Lt, disable: () => zt, document: () => St, flow: () => Dt, flowInitial: () => Tt, insideSpan: () => Ct, string: () => Et, text: () => At });
      const r = g(/[A-Za-z]/), i = g(/[\dA-Za-z]/), o = g(/[#-'*+\--9=?A-Z^-~]/);
      function c(e2) {
        return null !== e2 && (e2 < 32 || 127 === e2);
      }
      const u = g(/\d/), a = g(/[\dA-Fa-f]/), l = g(/[!-/:-@[-`{-~]/);
      function s(e2) {
        return null !== e2 && e2 < -2;
      }
      function f(e2) {
        return null !== e2 && (e2 < 0 || 32 === e2);
      }
      function p(e2) {
        return -2 === e2 || -1 === e2 || 32 === e2;
      }
      const d = g(/\p{P}|\p{S}/u), m = g(/\s/);
      function g(e2) {
        return function(t2) {
          return null !== t2 && t2 > -1 && e2.test(String.fromCharCode(t2));
        };
      }
      function h(e2, t2, n2, r2) {
        const i2 = r2 ? r2 - 1 : Number.POSITIVE_INFINITY;
        let o2 = 0;
        return function(r3) {
          return p(r3) ? (e2.enter(n2), c2(r3)) : t2(r3);
        };
        function c2(r3) {
          return p(r3) && o2++ < i2 ? (e2.consume(r3), c2) : (e2.exit(n2), t2(r3));
        }
      }
      function b(e2, t2) {
        let n2;
        return function r2(i2) {
          return s(i2) ? (e2.enter("lineEnding"), e2.consume(i2), e2.exit("lineEnding"), n2 = true, r2) : p(i2) ? h(e2, r2, n2 ? "linePrefix" : "lineSuffix")(i2) : t2(i2);
        };
      }
      function x(e2, t2, n2, o2, c2, u2, a2, l2, d2, m2, g2, x2, v2, k2, y2) {
        let w2, q2;
        return function(t3) {
          return e2.enter(o2), e2.enter(c2), e2.consume(t3), e2.exit(c2), S2;
        };
        function S2(t3) {
          return 35 === t3 ? (w2 = a2, L2(t3)) : 46 === t3 ? (w2 = l2, L2(t3)) : 58 === t3 || 95 === t3 || r(t3) ? (e2.enter(u2), e2.enter(d2), e2.consume(t3), E2) : y2 && p(t3) ? h(e2, S2, "whitespace")(t3) : !y2 && f(t3) ? b(e2, S2)(t3) : O2(t3);
        }
        function L2(t3) {
          const n3 = w2 + "Marker";
          return e2.enter(u2), e2.enter(w2), e2.enter(n3), e2.consume(t3), e2.exit(n3), T2;
        }
        function T2(t3) {
          if (null === t3 || 34 === t3 || 35 === t3 || 39 === t3 || 46 === t3 || 60 === t3 || 61 === t3 || 62 === t3 || 96 === t3 || 125 === t3 || f(t3))
            return n2(t3);
          const r2 = w2 + "Value";
          return e2.enter(r2), e2.consume(t3), D2;
        }
        function D2(t3) {
          if (null === t3 || 34 === t3 || 39 === t3 || 60 === t3 || 61 === t3 || 62 === t3 || 96 === t3)
            return n2(t3);
          if (35 === t3 || 46 === t3 || 125 === t3 || f(t3)) {
            const n3 = w2 + "Value";
            return e2.exit(n3), e2.exit(w2), e2.exit(u2), S2(t3);
          }
          return e2.consume(t3), D2;
        }
        function E2(t3) {
          return 45 === t3 || 46 === t3 || 58 === t3 || 95 === t3 || i(t3) ? (e2.consume(t3), E2) : (e2.exit(d2), y2 && p(t3) ? h(e2, A2, "whitespace")(t3) : !y2 && f(t3) ? b(e2, A2)(t3) : A2(t3));
        }
        function A2(t3) {
          return 61 === t3 ? (e2.enter(m2), e2.consume(t3), e2.exit(m2), C2) : (e2.exit(u2), S2(t3));
        }
        function C2(t3) {
          return null === t3 || 60 === t3 || 61 === t3 || 62 === t3 || 96 === t3 || 125 === t3 || y2 && s(t3) ? n2(t3) : 34 === t3 || 39 === t3 ? (e2.enter(g2), e2.enter(v2), e2.consume(t3), e2.exit(v2), q2 = t3, z2) : y2 && p(t3) ? h(e2, C2, "whitespace")(t3) : !y2 && f(t3) ? b(e2, C2)(t3) : (e2.enter(x2), e2.enter(k2), e2.consume(t3), q2 = void 0, F2);
        }
        function F2(t3) {
          return null === t3 || 34 === t3 || 39 === t3 || 60 === t3 || 61 === t3 || 62 === t3 || 96 === t3 ? n2(t3) : 125 === t3 || f(t3) ? (e2.exit(k2), e2.exit(x2), e2.exit(u2), S2(t3)) : (e2.consume(t3), F2);
        }
        function z2(t3) {
          return t3 === q2 ? (e2.enter(v2), e2.consume(t3), e2.exit(v2), e2.exit(g2), e2.exit(u2), R2) : (e2.enter(x2), I2(t3));
        }
        function I2(t3) {
          return t3 === q2 ? (e2.exit(x2), z2(t3)) : null === t3 ? n2(t3) : s(t3) ? y2 ? n2(t3) : b(e2, I2)(t3) : (e2.enter(k2), e2.consume(t3), M2);
        }
        function M2(t3) {
          return t3 === q2 || null === t3 || s(t3) ? (e2.exit(k2), I2(t3)) : (e2.consume(t3), M2);
        }
        function R2(e3) {
          return 125 === e3 || f(e3) ? S2(e3) : O2(e3);
        }
        function O2(r2) {
          return 125 === r2 ? (e2.enter(c2), e2.consume(r2), e2.exit(c2), e2.exit(o2), t2) : n2(r2);
        }
      }
      function v(e2, t2, n2, r2, i2, o2, c2) {
        let u2, a2 = 0, l2 = 0;
        return function(t3) {
          return e2.enter(r2), e2.enter(i2), e2.consume(t3), e2.exit(i2), f2;
        };
        function f2(n3) {
          return 93 === n3 ? (e2.enter(i2), e2.consume(n3), e2.exit(i2), e2.exit(r2), t2) : (e2.enter(o2), p2(n3));
        }
        function p2(t3) {
          if (93 === t3 && !l2)
            return g2(t3);
          const n3 = e2.enter("chunkText", { contentType: "text", previous: u2 });
          return u2 && (u2.next = n3), u2 = n3, d2(t3);
        }
        function d2(t3) {
          return null === t3 || a2 > 999 || 91 === t3 && ++l2 > 32 ? n2(t3) : 93 !== t3 || l2-- ? s(t3) ? c2 ? n2(t3) : (e2.consume(t3), e2.exit("chunkText"), p2) : (e2.consume(t3), 92 === t3 ? m2 : d2) : (e2.exit("chunkText"), g2(t3));
        }
        function m2(t3) {
          return 91 === t3 || 92 === t3 || 93 === t3 ? (e2.consume(t3), a2++, d2) : d2(t3);
        }
        function g2(n3) {
          return e2.exit(o2), e2.enter(i2), e2.consume(n3), e2.exit(i2), e2.exit(r2), t2;
        }
      }
      function k(e2, t2, n2, o2) {
        const c2 = this;
        return function(t3) {
          return r(t3) ? (e2.enter(o2), e2.consume(t3), u2) : n2(t3);
        };
        function u2(r2) {
          return 45 === r2 || 95 === r2 || i(r2) ? (e2.consume(r2), u2) : (e2.exit(o2), 45 === c2.previous || 95 === c2.previous ? n2(r2) : t2(r2));
        }
      }
      const y = { tokenize: function(e2, t2, n2) {
        const r2 = this, i2 = r2.events[r2.events.length - 1], o2 = i2 && "linePrefix" === i2[1].type ? i2[2].sliceSerialize(i2[1], true).length : 0;
        let c2, u2 = 0;
        return function(t3) {
          return e2.enter("directiveContainer"), e2.enter("directiveContainerFence"), e2.enter("directiveContainerSequence"), a2(t3);
        };
        function a2(t3) {
          return 58 === t3 ? (e2.consume(t3), u2++, a2) : u2 < 3 ? n2(t3) : (e2.exit("directiveContainerSequence"), k.call(r2, e2, l2, n2, "directiveContainerName")(t3));
        }
        function l2(t3) {
          return 91 === t3 ? e2.attempt(w, f2, f2)(t3) : f2(t3);
        }
        function f2(t3) {
          return 123 === t3 ? e2.attempt(q, p2, p2)(t3) : p2(t3);
        }
        function p2(t3) {
          return h(e2, d2, "whitespace")(t3);
        }
        function d2(i3) {
          return e2.exit("directiveContainerFence"), null === i3 ? m2(i3) : s(i3) ? r2.interrupt ? t2(i3) : e2.attempt(S, g2, m2)(i3) : n2(i3);
        }
        function m2(n3) {
          return e2.exit("directiveContainer"), t2(n3);
        }
        function g2(n3) {
          return null === n3 ? (e2.exit("directiveContainer"), t2(n3)) : (e2.enter("directiveContainerContent"), b2(n3));
        }
        function b2(t3) {
          return null === t3 ? T2(t3) : e2.attempt({ tokenize: D2, partial: true }, T2, o2 ? h(e2, x2, "linePrefix", o2 + 1) : x2)(t3);
        }
        function x2(t3) {
          if (null === t3)
            return T2(t3);
          const n3 = e2.enter("chunkDocument", { contentType: "document", previous: c2 });
          return c2 && (c2.next = n3), c2 = n3, v2(t3);
        }
        function v2(t3) {
          if (null === t3) {
            const n3 = e2.exit("chunkDocument");
            return r2.parser.lazy[n3.start.line] = false, T2(t3);
          }
          return s(t3) ? e2.check(S, y2, L2)(t3) : (e2.consume(t3), v2);
        }
        function y2(t3) {
          e2.consume(t3);
          const n3 = e2.exit("chunkDocument");
          return r2.parser.lazy[n3.start.line] = false, b2;
        }
        function L2(t3) {
          const n3 = e2.exit("chunkDocument");
          return r2.parser.lazy[n3.start.line] = false, T2(t3);
        }
        function T2(n3) {
          return e2.exit("directiveContainerContent"), e2.exit("directiveContainer"), t2(n3);
        }
        function D2(e3, t3, n3) {
          let r3 = 0;
          return h(e3, function(t4) {
            return e3.enter("directiveContainerFence"), e3.enter("directiveContainerSequence"), i3(t4);
          }, "linePrefix", 4);
          function i3(t4) {
            return 58 === t4 ? (e3.consume(t4), r3++, i3) : r3 < u2 ? n3(t4) : (e3.exit("directiveContainerSequence"), h(e3, o3, "whitespace")(t4));
          }
          function o3(r4) {
            return null === r4 || s(r4) ? (e3.exit("directiveContainerFence"), t3(r4)) : n3(r4);
          }
        }
      }, concrete: true }, w = { tokenize: function(e2, t2, n2) {
        return v(e2, t2, n2, "directiveContainerLabel", "directiveContainerLabelMarker", "directiveContainerLabelString", true);
      }, partial: true }, q = { tokenize: function(e2, t2, n2) {
        return x(e2, t2, n2, "directiveContainerAttributes", "directiveContainerAttributesMarker", "directiveContainerAttribute", "directiveContainerAttributeId", "directiveContainerAttributeClass", "directiveContainerAttributeName", "directiveContainerAttributeInitializerMarker", "directiveContainerAttributeValueLiteral", "directiveContainerAttributeValue", "directiveContainerAttributeValueMarker", "directiveContainerAttributeValueData", true);
      }, partial: true }, S = { tokenize: function(e2, t2, n2) {
        const r2 = this;
        return function(t3) {
          return e2.enter("lineEnding"), e2.consume(t3), e2.exit("lineEnding"), i2;
        };
        function i2(e3) {
          return r2.parser.lazy[r2.now().line] ? n2(e3) : t2(e3);
        }
      }, partial: true }, L = { tokenize: function(e2, t2, n2) {
        const r2 = this;
        return function(t3) {
          return e2.enter("directiveLeaf"), e2.enter("directiveLeafSequence"), e2.consume(t3), i2;
        };
        function i2(t3) {
          return 58 === t3 ? (e2.consume(t3), e2.exit("directiveLeafSequence"), k.call(r2, e2, o2, n2, "directiveLeafName")) : n2(t3);
        }
        function o2(t3) {
          return 91 === t3 ? e2.attempt(T, c2, c2)(t3) : c2(t3);
        }
        function c2(t3) {
          return 123 === t3 ? e2.attempt(D, u2, u2)(t3) : u2(t3);
        }
        function u2(t3) {
          return h(e2, a2, "whitespace")(t3);
        }
        function a2(r3) {
          return null === r3 || s(r3) ? (e2.exit("directiveLeaf"), t2(r3)) : n2(r3);
        }
      } }, T = { tokenize: function(e2, t2, n2) {
        return v(e2, t2, n2, "directiveLeafLabel", "directiveLeafLabelMarker", "directiveLeafLabelString", true);
      }, partial: true }, D = { tokenize: function(e2, t2, n2) {
        return x(e2, t2, n2, "directiveLeafAttributes", "directiveLeafAttributesMarker", "directiveLeafAttribute", "directiveLeafAttributeId", "directiveLeafAttributeClass", "directiveLeafAttributeName", "directiveLeafAttributeInitializerMarker", "directiveLeafAttributeValueLiteral", "directiveLeafAttributeValue", "directiveLeafAttributeValueMarker", "directiveLeafAttributeValueData", true);
      }, partial: true }, E = { tokenize: function(e2, t2, n2) {
        const r2 = this;
        return function(t3) {
          return e2.enter("directiveText"), e2.enter("directiveTextMarker"), e2.consume(t3), e2.exit("directiveTextMarker"), k.call(r2, e2, i2, n2, "directiveTextName");
        };
        function i2(t3) {
          return 58 === t3 ? n2(t3) : 91 === t3 ? e2.attempt(A, o2, o2)(t3) : o2(t3);
        }
        function o2(t3) {
          return 123 === t3 ? e2.attempt(C, c2, c2)(t3) : c2(t3);
        }
        function c2(n3) {
          return e2.exit("directiveText"), t2(n3);
        }
      }, previous: function(e2) {
        return 58 !== e2 || "characterEscape" === this.events[this.events.length - 1][1].type;
      } }, A = { tokenize: function(e2, t2, n2) {
        return v(e2, t2, n2, "directiveTextLabel", "directiveTextLabelMarker", "directiveTextLabelString");
      }, partial: true }, C = { tokenize: function(e2, t2, n2) {
        return x(e2, t2, n2, "directiveTextAttributes", "directiveTextAttributesMarker", "directiveTextAttribute", "directiveTextAttributeId", "directiveTextAttributeClass", "directiveTextAttributeName", "directiveTextAttributeInitializerMarker", "directiveTextAttributeValueLiteral", "directiveTextAttributeValue", "directiveTextAttributeValueMarker", "directiveTextAttributeValueData");
      }, partial: true };
      function F() {
        return { text: { 58: E }, flow: { 58: [y, L] } };
      }
      const z = { tokenize: function(e2, t2, n2) {
        let r2 = 0;
        return function t3(o2) {
          return (87 === o2 || 119 === o2) && r2 < 3 ? (r2++, e2.consume(o2), t3) : 46 === o2 && 3 === r2 ? (e2.consume(o2), i2) : n2(o2);
        };
        function i2(e3) {
          return null === e3 ? n2(e3) : t2(e3);
        }
      }, partial: true }, I = { tokenize: function(e2, t2, n2) {
        let r2, i2, o2;
        return c2;
        function c2(t3) {
          return 46 === t3 || 95 === t3 ? e2.check(R, a2, u2)(t3) : null === t3 || f(t3) || m(t3) || 45 !== t3 && d(t3) ? a2(t3) : (o2 = true, e2.consume(t3), c2);
        }
        function u2(t3) {
          return 95 === t3 ? r2 = true : (i2 = r2, r2 = void 0), e2.consume(t3), c2;
        }
        function a2(e3) {
          return i2 || r2 || !o2 ? n2(e3) : t2(e3);
        }
      }, partial: true }, M = { tokenize: function(e2, t2) {
        let n2 = 0, r2 = 0;
        return i2;
        function i2(c2) {
          return 40 === c2 ? (n2++, e2.consume(c2), i2) : 41 === c2 && r2 < n2 ? o2(c2) : 33 === c2 || 34 === c2 || 38 === c2 || 39 === c2 || 41 === c2 || 42 === c2 || 44 === c2 || 46 === c2 || 58 === c2 || 59 === c2 || 60 === c2 || 63 === c2 || 93 === c2 || 95 === c2 || 126 === c2 ? e2.check(R, t2, o2)(c2) : null === c2 || f(c2) || m(c2) ? t2(c2) : (e2.consume(c2), i2);
        }
        function o2(t3) {
          return 41 === t3 && r2++, e2.consume(t3), i2;
        }
      }, partial: true }, R = { tokenize: function(e2, t2, n2) {
        return i2;
        function i2(r2) {
          return 33 === r2 || 34 === r2 || 39 === r2 || 41 === r2 || 42 === r2 || 44 === r2 || 46 === r2 || 58 === r2 || 59 === r2 || 63 === r2 || 95 === r2 || 126 === r2 ? (e2.consume(r2), i2) : 38 === r2 ? (e2.consume(r2), c2) : 93 === r2 ? (e2.consume(r2), o2) : 60 === r2 || null === r2 || f(r2) || m(r2) ? t2(r2) : n2(r2);
        }
        function o2(e3) {
          return null === e3 || 40 === e3 || 91 === e3 || f(e3) || m(e3) ? t2(e3) : i2(e3);
        }
        function c2(e3) {
          return r(e3) ? u2(e3) : n2(e3);
        }
        function u2(t3) {
          return 59 === t3 ? (e2.consume(t3), i2) : r(t3) ? (e2.consume(t3), u2) : n2(t3);
        }
      }, partial: true }, O = { tokenize: function(e2, t2, n2) {
        return function(t3) {
          return e2.consume(t3), r2;
        };
        function r2(e3) {
          return i(e3) ? n2(e3) : t2(e3);
        }
      }, partial: true }, P = { tokenize: function(e2, t2, n2) {
        const r2 = this;
        return function(t3) {
          return 87 !== t3 && 119 !== t3 || !H.call(r2, r2.previous) || W(r2.events) ? n2(t3) : (e2.enter("literalAutolink"), e2.enter("literalAutolinkWww"), e2.check(z, e2.attempt(I, e2.attempt(M, i2), n2), n2)(t3));
        };
        function i2(n3) {
          return e2.exit("literalAutolinkWww"), e2.exit("literalAutolink"), t2(n3);
        }
      }, previous: H }, N = { tokenize: function(e2, t2, n2) {
        const i2 = this;
        let o2 = "", u2 = false;
        return function(t3) {
          return 72 !== t3 && 104 !== t3 || !U.call(i2, i2.previous) || W(i2.events) ? n2(t3) : (e2.enter("literalAutolink"), e2.enter("literalAutolinkHttp"), o2 += String.fromCodePoint(t3), e2.consume(t3), a2);
        };
        function a2(t3) {
          if (r(t3) && o2.length < 5)
            return o2 += String.fromCodePoint(t3), e2.consume(t3), a2;
          if (58 === t3) {
            const n3 = o2.toLowerCase();
            if ("http" === n3 || "https" === n3)
              return e2.consume(t3), l2;
          }
          return n2(t3);
        }
        function l2(t3) {
          return 47 === t3 ? (e2.consume(t3), u2 ? s2 : (u2 = true, l2)) : n2(t3);
        }
        function s2(t3) {
          return null === t3 || c(t3) || f(t3) || m(t3) || d(t3) ? n2(t3) : e2.attempt(I, e2.attempt(M, p2), n2)(t3);
        }
        function p2(n3) {
          return e2.exit("literalAutolinkHttp"), e2.exit("literalAutolink"), t2(n3);
        }
      }, previous: U }, V = { tokenize: function(e2, t2, n2) {
        const o2 = this;
        let c2, u2;
        return function(t3) {
          return Q(t3) && G.call(o2, o2.previous) && !W(o2.events) ? (e2.enter("literalAutolink"), e2.enter("literalAutolinkEmail"), a2(t3)) : n2(t3);
        };
        function a2(t3) {
          return Q(t3) ? (e2.consume(t3), a2) : 64 === t3 ? (e2.consume(t3), l2) : n2(t3);
        }
        function l2(t3) {
          return 46 === t3 ? e2.check(O, f2, s2)(t3) : 45 === t3 || 95 === t3 || i(t3) ? (u2 = true, e2.consume(t3), l2) : f2(t3);
        }
        function s2(t3) {
          return e2.consume(t3), c2 = true, l2;
        }
        function f2(i2) {
          return u2 && c2 && r(o2.previous) ? (e2.exit("literalAutolinkEmail"), e2.exit("literalAutolink"), t2(i2)) : n2(i2);
        }
      }, previous: G }, _ = {};
      function B() {
        return { text: _ };
      }
      let j = 48;
      for (; j < 123; )
        _[j] = V, j++, 58 === j ? j = 65 : 91 === j && (j = 97);
      function H(e2) {
        return null === e2 || 40 === e2 || 42 === e2 || 95 === e2 || 91 === e2 || 93 === e2 || 126 === e2 || f(e2);
      }
      function U(e2) {
        return !r(e2);
      }
      function G(e2) {
        return !(47 === e2 || Q(e2));
      }
      function Q(e2) {
        return 43 === e2 || 45 === e2 || 46 === e2 || 95 === e2 || i(e2);
      }
      function W(e2) {
        let t2 = e2.length, n2 = false;
        for (; t2--; ) {
          const r2 = e2[t2][1];
          if (("labelLink" === r2.type || "labelImage" === r2.type) && !r2._balanced) {
            n2 = true;
            break;
          }
          if (r2._gfmAutolinkLiteralWalkedInto) {
            n2 = false;
            break;
          }
        }
        return e2.length > 0 && !n2 && (e2[e2.length - 1][1]._gfmAutolinkLiteralWalkedInto = true), n2;
      }
      _[43] = V, _[45] = V, _[46] = V, _[95] = V, _[72] = [V, N], _[104] = [V, N], _[87] = [V, P], _[119] = [V, P];
      const Z = { tokenize: function(e2, t2, n2) {
        return function(t3) {
          return p(t3) ? h(e2, r2, "linePrefix")(t3) : r2(t3);
        };
        function r2(e3) {
          return null === e3 || s(e3) ? t2(e3) : n2(e3);
        }
      }, partial: true };
      function J(e2) {
        return e2.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
      }
      const Y = { tokenize: function(e2, t2, n2) {
        const r2 = this;
        return h(e2, function(e3) {
          const i2 = r2.events[r2.events.length - 1];
          return i2 && "gfmFootnoteDefinitionIndent" === i2[1].type && 4 === i2[2].sliceSerialize(i2[1], true).length ? t2(e3) : n2(e3);
        }, "gfmFootnoteDefinitionIndent", 5);
      }, partial: true };
      function K() {
        return { document: { 91: { tokenize: te, continuation: { tokenize: ne }, exit: re } }, text: { 91: { tokenize: ee }, 93: { add: "after", tokenize: X, resolveTo: $ } } };
      }
      function X(e2, t2, n2) {
        const r2 = this;
        let i2 = r2.events.length;
        const o2 = r2.parser.gfmFootnotes || (r2.parser.gfmFootnotes = []);
        let c2;
        for (; i2--; ) {
          const e3 = r2.events[i2][1];
          if ("labelImage" === e3.type) {
            c2 = e3;
            break;
          }
          if ("gfmFootnoteCall" === e3.type || "labelLink" === e3.type || "label" === e3.type || "image" === e3.type || "link" === e3.type)
            break;
        }
        return function(i3) {
          if (!c2 || !c2._balanced)
            return n2(i3);
          const u2 = J(r2.sliceSerialize({ start: c2.end, end: r2.now() }));
          return 94 === u2.codePointAt(0) && o2.includes(u2.slice(1)) ? (e2.enter("gfmFootnoteCallLabelMarker"), e2.consume(i3), e2.exit("gfmFootnoteCallLabelMarker"), t2(i3)) : n2(i3);
        };
      }
      function $(e2, t2) {
        let n2, r2 = e2.length;
        for (; r2--; )
          if ("labelImage" === e2[r2][1].type && "enter" === e2[r2][0]) {
            n2 = e2[r2][1];
            break;
          }
        e2[r2 + 1][1].type = "data", e2[r2 + 3][1].type = "gfmFootnoteCallLabelMarker";
        const i2 = { type: "gfmFootnoteCall", start: Object.assign({}, e2[r2 + 3][1].start), end: Object.assign({}, e2[e2.length - 1][1].end) }, o2 = { type: "gfmFootnoteCallMarker", start: Object.assign({}, e2[r2 + 3][1].end), end: Object.assign({}, e2[r2 + 3][1].end) };
        o2.end.column++, o2.end.offset++, o2.end._bufferIndex++;
        const c2 = { type: "gfmFootnoteCallString", start: Object.assign({}, o2.end), end: Object.assign({}, e2[e2.length - 1][1].start) }, u2 = { type: "chunkString", contentType: "string", start: Object.assign({}, c2.start), end: Object.assign({}, c2.end) }, a2 = [e2[r2 + 1], e2[r2 + 2], ["enter", i2, t2], e2[r2 + 3], e2[r2 + 4], ["enter", o2, t2], ["exit", o2, t2], ["enter", c2, t2], ["enter", u2, t2], ["exit", u2, t2], ["exit", c2, t2], e2[e2.length - 2], e2[e2.length - 1], ["exit", i2, t2]];
        return e2.splice(r2, e2.length - r2 + 1, ...a2), e2;
      }
      function ee(e2, t2, n2) {
        const r2 = this, i2 = r2.parser.gfmFootnotes || (r2.parser.gfmFootnotes = []);
        let o2, c2 = 0;
        return function(t3) {
          return e2.enter("gfmFootnoteCall"), e2.enter("gfmFootnoteCallLabelMarker"), e2.consume(t3), e2.exit("gfmFootnoteCallLabelMarker"), u2;
        };
        function u2(t3) {
          return 94 !== t3 ? n2(t3) : (e2.enter("gfmFootnoteCallMarker"), e2.consume(t3), e2.exit("gfmFootnoteCallMarker"), e2.enter("gfmFootnoteCallString"), e2.enter("chunkString").contentType = "string", a2);
        }
        function a2(u3) {
          if (c2 > 999 || 93 === u3 && !o2 || null === u3 || 91 === u3 || f(u3))
            return n2(u3);
          if (93 === u3) {
            e2.exit("chunkString");
            const o3 = e2.exit("gfmFootnoteCallString");
            return i2.includes(J(r2.sliceSerialize(o3))) ? (e2.enter("gfmFootnoteCallLabelMarker"), e2.consume(u3), e2.exit("gfmFootnoteCallLabelMarker"), e2.exit("gfmFootnoteCall"), t2) : n2(u3);
          }
          return f(u3) || (o2 = true), c2++, e2.consume(u3), 92 === u3 ? l2 : a2;
        }
        function l2(t3) {
          return 91 === t3 || 92 === t3 || 93 === t3 ? (e2.consume(t3), c2++, a2) : a2(t3);
        }
      }
      function te(e2, t2, n2) {
        const r2 = this, i2 = r2.parser.gfmFootnotes || (r2.parser.gfmFootnotes = []);
        let o2, c2, u2 = 0;
        return function(t3) {
          return e2.enter("gfmFootnoteDefinition")._container = true, e2.enter("gfmFootnoteDefinitionLabel"), e2.enter("gfmFootnoteDefinitionLabelMarker"), e2.consume(t3), e2.exit("gfmFootnoteDefinitionLabelMarker"), a2;
        };
        function a2(t3) {
          return 94 === t3 ? (e2.enter("gfmFootnoteDefinitionMarker"), e2.consume(t3), e2.exit("gfmFootnoteDefinitionMarker"), e2.enter("gfmFootnoteDefinitionLabelString"), e2.enter("chunkString").contentType = "string", l2) : n2(t3);
        }
        function l2(t3) {
          if (u2 > 999 || 93 === t3 && !c2 || null === t3 || 91 === t3 || f(t3))
            return n2(t3);
          if (93 === t3) {
            e2.exit("chunkString");
            const n3 = e2.exit("gfmFootnoteDefinitionLabelString");
            return o2 = J(r2.sliceSerialize(n3)), e2.enter("gfmFootnoteDefinitionLabelMarker"), e2.consume(t3), e2.exit("gfmFootnoteDefinitionLabelMarker"), e2.exit("gfmFootnoteDefinitionLabel"), p2;
          }
          return f(t3) || (c2 = true), u2++, e2.consume(t3), 92 === t3 ? s2 : l2;
        }
        function s2(t3) {
          return 91 === t3 || 92 === t3 || 93 === t3 ? (e2.consume(t3), u2++, l2) : l2(t3);
        }
        function p2(t3) {
          return 58 === t3 ? (e2.enter("definitionMarker"), e2.consume(t3), e2.exit("definitionMarker"), i2.includes(o2) || i2.push(o2), h(e2, d2, "gfmFootnoteDefinitionWhitespace")) : n2(t3);
        }
        function d2(e3) {
          return t2(e3);
        }
      }
      function ne(e2, t2, n2) {
        return e2.check(Z, t2, e2.attempt(Y, t2, n2));
      }
      function re(e2) {
        e2.exit("gfmFootnoteDefinition");
      }
      class ie {
        constructor() {
          this.map = [];
        }
        add(e2, t2, n2) {
          !function(e3, t3, n3, r2) {
            let i2 = 0;
            if (0 !== n3 || 0 !== r2.length) {
              for (; i2 < e3.map.length; ) {
                if (e3.map[i2][0] === t3)
                  return e3.map[i2][1] += n3, void e3.map[i2][2].push(...r2);
                i2 += 1;
              }
              e3.map.push([t3, n3, r2]);
            }
          }(this, e2, t2, n2);
        }
        consume(e2) {
          if (this.map.sort(function(e3, t3) {
            return e3[0] - t3[0];
          }), 0 === this.map.length)
            return;
          let t2 = this.map.length;
          const n2 = [];
          for (; t2 > 0; )
            t2 -= 1, n2.push(e2.slice(this.map[t2][0] + this.map[t2][1]), this.map[t2][2]), e2.length = this.map[t2][0];
          n2.push([...e2]), e2.length = 0;
          let r2 = n2.pop();
          for (; r2; )
            e2.push(...r2), r2 = n2.pop();
          this.map.length = 0;
        }
      }
      function oe(e2, t2) {
        let n2 = false;
        const r2 = [];
        for (; t2 < e2.length; ) {
          const i2 = e2[t2];
          if (n2) {
            if ("enter" === i2[0])
              "tableContent" === i2[1].type && r2.push("tableDelimiterMarker" === e2[t2 + 1][1].type ? "left" : "none");
            else if ("tableContent" === i2[1].type) {
              if ("tableDelimiterMarker" === e2[t2 - 1][1].type) {
                const e3 = r2.length - 1;
                r2[e3] = "left" === r2[e3] ? "center" : "right";
              }
            } else if ("tableDelimiterRow" === i2[1].type)
              break;
          } else
            "enter" === i2[0] && "tableDelimiterRow" === i2[1].type && (n2 = true);
          t2 += 1;
        }
        return r2;
      }
      function ce() {
        return { flow: { null: { tokenize: ue, resolveAll: ae } } };
      }
      function ue(e2, t2, n2) {
        const r2 = this;
        let i2, o2 = 0, c2 = 0;
        return function(e3) {
          let t3 = r2.events.length - 1;
          for (; t3 > -1; ) {
            const e4 = r2.events[t3][1].type;
            if ("lineEnding" !== e4 && "linePrefix" !== e4)
              break;
            t3--;
          }
          const i3 = t3 > -1 ? r2.events[t3][1].type : null, o3 = "tableHead" === i3 || "tableRow" === i3 ? S2 : u2;
          return o3 === S2 && r2.parser.lazy[r2.now().line] ? n2(e3) : o3(e3);
        };
        function u2(t3) {
          return e2.enter("tableHead"), e2.enter("tableRow"), function(e3) {
            return 124 === e3 || (i2 = true, c2 += 1), a2(e3);
          }(t3);
        }
        function a2(t3) {
          return null === t3 ? n2(t3) : s(t3) ? c2 > 1 ? (c2 = 0, r2.interrupt = true, e2.exit("tableRow"), e2.enter("lineEnding"), e2.consume(t3), e2.exit("lineEnding"), m2) : n2(t3) : p(t3) ? h(e2, a2, "whitespace")(t3) : (c2 += 1, i2 && (i2 = false, o2 += 1), 124 === t3 ? (e2.enter("tableCellDivider"), e2.consume(t3), e2.exit("tableCellDivider"), i2 = true, a2) : (e2.enter("data"), l2(t3)));
        }
        function l2(t3) {
          return null === t3 || 124 === t3 || f(t3) ? (e2.exit("data"), a2(t3)) : (e2.consume(t3), 92 === t3 ? d2 : l2);
        }
        function d2(t3) {
          return 92 === t3 || 124 === t3 ? (e2.consume(t3), l2) : l2(t3);
        }
        function m2(t3) {
          return r2.interrupt = false, r2.parser.lazy[r2.now().line] ? n2(t3) : (e2.enter("tableDelimiterRow"), i2 = false, p(t3) ? h(e2, g2, "linePrefix", r2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t3) : g2(t3));
        }
        function g2(t3) {
          return 45 === t3 || 58 === t3 ? x2(t3) : 124 === t3 ? (i2 = true, e2.enter("tableCellDivider"), e2.consume(t3), e2.exit("tableCellDivider"), b2) : q2(t3);
        }
        function b2(t3) {
          return p(t3) ? h(e2, x2, "whitespace")(t3) : x2(t3);
        }
        function x2(t3) {
          return 58 === t3 ? (c2 += 1, i2 = true, e2.enter("tableDelimiterMarker"), e2.consume(t3), e2.exit("tableDelimiterMarker"), v2) : 45 === t3 ? (c2 += 1, v2(t3)) : null === t3 || s(t3) ? w2(t3) : q2(t3);
        }
        function v2(t3) {
          return 45 === t3 ? (e2.enter("tableDelimiterFiller"), k2(t3)) : q2(t3);
        }
        function k2(t3) {
          return 45 === t3 ? (e2.consume(t3), k2) : 58 === t3 ? (i2 = true, e2.exit("tableDelimiterFiller"), e2.enter("tableDelimiterMarker"), e2.consume(t3), e2.exit("tableDelimiterMarker"), y2) : (e2.exit("tableDelimiterFiller"), y2(t3));
        }
        function y2(t3) {
          return p(t3) ? h(e2, w2, "whitespace")(t3) : w2(t3);
        }
        function w2(n3) {
          return 124 === n3 ? g2(n3) : (null === n3 || s(n3)) && i2 && o2 === c2 ? (e2.exit("tableDelimiterRow"), e2.exit("tableHead"), t2(n3)) : q2(n3);
        }
        function q2(e3) {
          return n2(e3);
        }
        function S2(t3) {
          return e2.enter("tableRow"), L2(t3);
        }
        function L2(n3) {
          return 124 === n3 ? (e2.enter("tableCellDivider"), e2.consume(n3), e2.exit("tableCellDivider"), L2) : null === n3 || s(n3) ? (e2.exit("tableRow"), t2(n3)) : p(n3) ? h(e2, L2, "whitespace")(n3) : (e2.enter("data"), T2(n3));
        }
        function T2(t3) {
          return null === t3 || 124 === t3 || f(t3) ? (e2.exit("data"), L2(t3)) : (e2.consume(t3), 92 === t3 ? D2 : T2);
        }
        function D2(t3) {
          return 92 === t3 || 124 === t3 ? (e2.consume(t3), T2) : T2(t3);
        }
      }
      function ae(e2, t2) {
        let n2, r2, i2, o2 = -1, c2 = true, u2 = 0, a2 = [0, 0, 0, 0], l2 = [0, 0, 0, 0], s2 = false, f2 = 0;
        const p2 = new ie();
        for (; ++o2 < e2.length; ) {
          const d2 = e2[o2], m2 = d2[1];
          "enter" === d2[0] ? "tableHead" === m2.type ? (s2 = false, 0 !== f2 && (se(p2, t2, f2, n2, r2), r2 = void 0, f2 = 0), n2 = { type: "table", start: Object.assign({}, m2.start), end: Object.assign({}, m2.end) }, p2.add(o2, 0, [["enter", n2, t2]])) : "tableRow" === m2.type || "tableDelimiterRow" === m2.type ? (c2 = true, i2 = void 0, a2 = [0, 0, 0, 0], l2 = [0, o2 + 1, 0, 0], s2 && (s2 = false, r2 = { type: "tableBody", start: Object.assign({}, m2.start), end: Object.assign({}, m2.end) }, p2.add(o2, 0, [["enter", r2, t2]])), u2 = "tableDelimiterRow" === m2.type ? 2 : r2 ? 3 : 1) : !u2 || "data" !== m2.type && "tableDelimiterMarker" !== m2.type && "tableDelimiterFiller" !== m2.type ? "tableCellDivider" === m2.type && (c2 ? c2 = false : (0 !== a2[1] && (l2[0] = l2[1], i2 = le(p2, t2, a2, u2, void 0, i2)), a2 = l2, l2 = [a2[1], o2, 0, 0])) : (c2 = false, 0 === l2[2] && (0 !== a2[1] && (l2[0] = l2[1], i2 = le(p2, t2, a2, u2, void 0, i2), a2 = [0, 0, 0, 0]), l2[2] = o2)) : "tableHead" === m2.type ? (s2 = true, f2 = o2) : "tableRow" === m2.type || "tableDelimiterRow" === m2.type ? (f2 = o2, 0 !== a2[1] ? (l2[0] = l2[1], i2 = le(p2, t2, a2, u2, o2, i2)) : 0 !== l2[1] && (i2 = le(p2, t2, l2, u2, o2, i2)), u2 = 0) : !u2 || "data" !== m2.type && "tableDelimiterMarker" !== m2.type && "tableDelimiterFiller" !== m2.type || (l2[3] = o2);
        }
        for (0 !== f2 && se(p2, t2, f2, n2, r2), p2.consume(t2.events), o2 = -1; ++o2 < t2.events.length; ) {
          const e3 = t2.events[o2];
          "enter" === e3[0] && "table" === e3[1].type && (e3[1]._align = oe(t2.events, o2));
        }
        return e2;
      }
      function le(e2, t2, n2, r2, i2, o2) {
        const c2 = 1 === r2 ? "tableHeader" : 2 === r2 ? "tableDelimiter" : "tableData";
        0 !== n2[0] && (o2.end = Object.assign({}, fe(t2.events, n2[0])), e2.add(n2[0], 0, [["exit", o2, t2]]));
        const u2 = fe(t2.events, n2[1]);
        if (o2 = { type: c2, start: Object.assign({}, u2), end: Object.assign({}, u2) }, e2.add(n2[1], 0, [["enter", o2, t2]]), 0 !== n2[2]) {
          const i3 = fe(t2.events, n2[2]), o3 = fe(t2.events, n2[3]), c3 = { type: "tableContent", start: Object.assign({}, i3), end: Object.assign({}, o3) };
          if (e2.add(n2[2], 0, [["enter", c3, t2]]), 2 !== r2) {
            const r3 = t2.events[n2[2]], i4 = t2.events[n2[3]];
            if (r3[1].end = Object.assign({}, i4[1].end), r3[1].type = "chunkText", r3[1].contentType = "text", n2[3] > n2[2] + 1) {
              const t3 = n2[2] + 1, r4 = n2[3] - n2[2] - 1;
              e2.add(t3, r4, []);
            }
          }
          e2.add(n2[3] + 1, 0, [["exit", c3, t2]]);
        }
        return void 0 !== i2 && (o2.end = Object.assign({}, fe(t2.events, i2)), e2.add(i2, 0, [["exit", o2, t2]]), o2 = void 0), o2;
      }
      function se(e2, t2, n2, r2, i2) {
        const o2 = [], c2 = fe(t2.events, n2);
        i2 && (i2.end = Object.assign({}, c2), o2.push(["exit", i2, t2])), r2.end = Object.assign({}, c2), o2.push(["exit", r2, t2]), e2.add(n2 + 1, 0, o2);
      }
      function fe(e2, t2) {
        const n2 = e2[t2], r2 = "enter" === n2[0] ? "start" : "end";
        return n2[1][r2];
      }
      const pe = { tokenize: function(e2, t2, n2) {
        const r2 = this, i2 = r2.events[r2.events.length - 1], o2 = i2 && "linePrefix" === i2[1].type ? i2[2].sliceSerialize(i2[1], true).length : 0;
        let c2 = 0;
        return function(t3) {
          return e2.enter("mathFlow"), e2.enter("mathFlowFence"), e2.enter("mathFlowFenceSequence"), u2(t3);
        };
        function u2(t3) {
          return 36 === t3 ? (e2.consume(t3), c2++, u2) : c2 < 2 ? n2(t3) : (e2.exit("mathFlowFenceSequence"), h(e2, a2, "whitespace")(t3));
        }
        function a2(t3) {
          return null === t3 || s(t3) ? f2(t3) : (e2.enter("mathFlowFenceMeta"), e2.enter("chunkString", { contentType: "string" }), l2(t3));
        }
        function l2(t3) {
          return null === t3 || s(t3) ? (e2.exit("chunkString"), e2.exit("mathFlowFenceMeta"), f2(t3)) : 36 === t3 ? n2(t3) : (e2.consume(t3), l2);
        }
        function f2(n3) {
          return e2.exit("mathFlowFence"), r2.interrupt ? t2(n3) : e2.attempt(de, p2, b2)(n3);
        }
        function p2(t3) {
          return e2.attempt({ tokenize: x2, partial: true }, b2, d2)(t3);
        }
        function d2(t3) {
          return (o2 ? h(e2, m2, "linePrefix", o2 + 1) : m2)(t3);
        }
        function m2(t3) {
          return null === t3 ? b2(t3) : s(t3) ? e2.attempt(de, p2, b2)(t3) : (e2.enter("mathFlowValue"), g2(t3));
        }
        function g2(t3) {
          return null === t3 || s(t3) ? (e2.exit("mathFlowValue"), m2(t3)) : (e2.consume(t3), g2);
        }
        function b2(n3) {
          return e2.exit("mathFlow"), t2(n3);
        }
        function x2(e3, t3, n3) {
          let i3 = 0;
          return h(e3, function(t4) {
            return e3.enter("mathFlowFence"), e3.enter("mathFlowFenceSequence"), o3(t4);
          }, "linePrefix", r2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
          function o3(t4) {
            return 36 === t4 ? (i3++, e3.consume(t4), o3) : i3 < c2 ? n3(t4) : (e3.exit("mathFlowFenceSequence"), h(e3, u3, "whitespace")(t4));
          }
          function u3(r3) {
            return null === r3 || s(r3) ? (e3.exit("mathFlowFence"), t3(r3)) : n3(r3);
          }
        }
      }, concrete: true }, de = { tokenize: function(e2, t2, n2) {
        const r2 = this;
        return function(n3) {
          return null === n3 ? t2(n3) : (e2.enter("lineEnding"), e2.consume(n3), e2.exit("lineEnding"), i2);
        };
        function i2(e3) {
          return r2.parser.lazy[r2.now().line] ? n2(e3) : t2(e3);
        }
      }, partial: true };
      function me(e2) {
        let t2 = (e2 || {}).singleDollarTextMath;
        return null == t2 && (t2 = true), { tokenize: function(e3, n2, r2) {
          let i2, o2, c2 = 0;
          return function(t3) {
            return e3.enter("mathText"), e3.enter("mathTextSequence"), u2(t3);
          };
          function u2(n3) {
            return 36 === n3 ? (e3.consume(n3), c2++, u2) : c2 < 2 && !t2 ? r2(n3) : (e3.exit("mathTextSequence"), a2(n3));
          }
          function a2(t3) {
            return null === t3 ? r2(t3) : 36 === t3 ? (o2 = e3.enter("mathTextSequence"), i2 = 0, f2(t3)) : 32 === t3 ? (e3.enter("space"), e3.consume(t3), e3.exit("space"), a2) : s(t3) ? (e3.enter("lineEnding"), e3.consume(t3), e3.exit("lineEnding"), a2) : (e3.enter("mathTextData"), l2(t3));
          }
          function l2(t3) {
            return null === t3 || 32 === t3 || 36 === t3 || s(t3) ? (e3.exit("mathTextData"), a2(t3)) : (e3.consume(t3), l2);
          }
          function f2(t3) {
            return 36 === t3 ? (e3.consume(t3), i2++, f2) : i2 === c2 ? (e3.exit("mathTextSequence"), e3.exit("mathText"), n2(t3)) : (o2.type = "mathTextData", l2(t3));
          }
        }, resolve: ge, previous: he };
      }
      function ge(e2) {
        let t2, n2, r2 = e2.length - 4, i2 = 3;
        if (!("lineEnding" !== e2[i2][1].type && "space" !== e2[i2][1].type || "lineEnding" !== e2[r2][1].type && "space" !== e2[r2][1].type)) {
          for (t2 = i2; ++t2 < r2; )
            if ("mathTextData" === e2[t2][1].type) {
              e2[r2][1].type = "mathTextPadding", e2[i2][1].type = "mathTextPadding", i2 += 2, r2 -= 2;
              break;
            }
        }
        for (t2 = i2 - 1, r2++; ++t2 <= r2; )
          void 0 === n2 ? t2 !== r2 && "lineEnding" !== e2[t2][1].type && (n2 = t2) : t2 !== r2 && "lineEnding" !== e2[t2][1].type || (e2[n2][1].type = "mathTextData", t2 !== n2 + 2 && (e2[n2][1].end = e2[t2 - 1][1].end, e2.splice(n2 + 2, t2 - n2 - 2), r2 -= t2 - n2 - 2, t2 = n2 + 2), n2 = void 0);
        return e2;
      }
      function he(e2) {
        return 36 !== e2 || "characterEscape" === this.events[this.events.length - 1][1].type;
      }
      function be(e2) {
        return { flow: { 36: pe }, text: { 36: me(e2) } };
      }
      function xe(e2, t2, n2, r2) {
        const i2 = e2.length;
        let o2, c2 = 0;
        if (t2 = t2 < 0 ? -t2 > i2 ? 0 : i2 + t2 : t2 > i2 ? i2 : t2, n2 = n2 > 0 ? n2 : 0, r2.length < 1e4)
          o2 = Array.from(r2), o2.unshift(t2, n2), e2.splice(...o2);
        else
          for (n2 && e2.splice(t2, n2); c2 < r2.length; )
            o2 = r2.slice(c2, c2 + 1e4), o2.unshift(t2, 0), e2.splice(...o2), c2 += 1e4, t2 += 1e4;
      }
      function ve(e2, t2) {
        return e2.length > 0 ? (xe(e2, e2.length, 0, t2), e2) : t2;
      }
      const ke = {}.hasOwnProperty;
      function ye(e2, t2) {
        let n2;
        for (n2 in t2) {
          const r2 = (ke.call(e2, n2) ? e2[n2] : void 0) || (e2[n2] = {}), i2 = t2[n2];
          let o2;
          if (i2)
            for (o2 in i2) {
              ke.call(r2, o2) || (r2[o2] = []);
              const e3 = i2[o2];
              we(r2[o2], Array.isArray(e3) ? e3 : e3 ? [e3] : []);
            }
        }
      }
      function we(e2, t2) {
        let n2 = -1;
        const r2 = [];
        for (; ++n2 < t2.length; )
          ("after" === t2[n2].add ? e2 : r2).push(t2[n2]);
        xe(e2, 0, 0, r2);
      }
      const qe = { tokenize: function(e2) {
        const t2 = e2.attempt(this.parser.constructs.contentInitial, function(n3) {
          if (null !== n3)
            return e2.enter("lineEnding"), e2.consume(n3), e2.exit("lineEnding"), h(e2, t2, "linePrefix");
          e2.consume(n3);
        }, function(t3) {
          return e2.enter("paragraph"), r2(t3);
        });
        let n2;
        return t2;
        function r2(t3) {
          const r3 = e2.enter("chunkText", { contentType: "text", previous: n2 });
          return n2 && (n2.next = r3), n2 = r3, i2(t3);
        }
        function i2(t3) {
          return null === t3 ? (e2.exit("chunkText"), e2.exit("paragraph"), void e2.consume(t3)) : s(t3) ? (e2.consume(t3), e2.exit("chunkText"), r2) : (e2.consume(t3), i2);
        }
      } }, Se = { tokenize: function(e2) {
        const t2 = this, n2 = [];
        let r2, i2, o2, c2 = 0;
        return u2;
        function u2(r3) {
          if (c2 < n2.length) {
            const i3 = n2[c2];
            return t2.containerState = i3[1], e2.attempt(i3[0].continuation, a2, l2)(r3);
          }
          return l2(r3);
        }
        function a2(e3) {
          if (c2++, t2.containerState._closeFlow) {
            t2.containerState._closeFlow = void 0, r2 && v2();
            const n3 = t2.events.length;
            let i3, o3 = n3;
            for (; o3--; )
              if ("exit" === t2.events[o3][0] && "chunkFlow" === t2.events[o3][1].type) {
                i3 = t2.events[o3][1].end;
                break;
              }
            x2(c2);
            let u3 = n3;
            for (; u3 < t2.events.length; )
              t2.events[u3][1].end = Object.assign({}, i3), u3++;
            return xe(t2.events, o3 + 1, 0, t2.events.slice(n3)), t2.events.length = u3, l2(e3);
          }
          return u2(e3);
        }
        function l2(i3) {
          if (c2 === n2.length) {
            if (!r2)
              return d2(i3);
            if (r2.currentConstruct && r2.currentConstruct.concrete)
              return g2(i3);
            t2.interrupt = Boolean(r2.currentConstruct && !r2._gfmTableDynamicInterruptHack);
          }
          return t2.containerState = {}, e2.check(Le, f2, p2)(i3);
        }
        function f2(e3) {
          return r2 && v2(), x2(c2), d2(e3);
        }
        function p2(e3) {
          return t2.parser.lazy[t2.now().line] = c2 !== n2.length, o2 = t2.now().offset, g2(e3);
        }
        function d2(n3) {
          return t2.containerState = {}, e2.attempt(Le, m2, g2)(n3);
        }
        function m2(e3) {
          return c2++, n2.push([t2.currentConstruct, t2.containerState]), d2(e3);
        }
        function g2(n3) {
          return null === n3 ? (r2 && v2(), x2(0), void e2.consume(n3)) : (r2 = r2 || t2.parser.flow(t2.now()), e2.enter("chunkFlow", { contentType: "flow", previous: i2, _tokenizer: r2 }), h2(n3));
        }
        function h2(n3) {
          return null === n3 ? (b2(e2.exit("chunkFlow"), true), x2(0), void e2.consume(n3)) : s(n3) ? (e2.consume(n3), b2(e2.exit("chunkFlow")), c2 = 0, t2.interrupt = void 0, u2) : (e2.consume(n3), h2);
        }
        function b2(e3, n3) {
          const u3 = t2.sliceStream(e3);
          if (n3 && u3.push(null), e3.previous = i2, i2 && (i2.next = e3), i2 = e3, r2.defineSkip(e3.start), r2.write(u3), t2.parser.lazy[e3.start.line]) {
            let e4 = r2.events.length;
            for (; e4--; )
              if (r2.events[e4][1].start.offset < o2 && (!r2.events[e4][1].end || r2.events[e4][1].end.offset > o2))
                return;
            const n4 = t2.events.length;
            let i3, u4, a3 = n4;
            for (; a3--; )
              if ("exit" === t2.events[a3][0] && "chunkFlow" === t2.events[a3][1].type) {
                if (i3) {
                  u4 = t2.events[a3][1].end;
                  break;
                }
                i3 = true;
              }
            for (x2(c2), e4 = n4; e4 < t2.events.length; )
              t2.events[e4][1].end = Object.assign({}, u4), e4++;
            xe(t2.events, a3 + 1, 0, t2.events.slice(n4)), t2.events.length = e4;
          }
        }
        function x2(r3) {
          let i3 = n2.length;
          for (; i3-- > r3; ) {
            const r4 = n2[i3];
            t2.containerState = r4[1], r4[0].exit.call(t2, e2);
          }
          n2.length = r3;
        }
        function v2() {
          r2.write([null]), i2 = void 0, r2 = void 0, t2.containerState._closeFlow = void 0;
        }
      } }, Le = { tokenize: function(e2, t2, n2) {
        return h(e2, e2.attempt(this.parser.constructs.document, t2, n2), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
      } };
      function Te(e2) {
        const t2 = {};
        let n2, r2, i2, o2, c2, u2, a2, l2 = -1;
        for (; ++l2 < e2.length; ) {
          for (; l2 in t2; )
            l2 = t2[l2];
          if (n2 = e2[l2], l2 && "chunkFlow" === n2[1].type && "listItemPrefix" === e2[l2 - 1][1].type && (u2 = n2[1]._tokenizer.events, i2 = 0, i2 < u2.length && "lineEndingBlank" === u2[i2][1].type && (i2 += 2), i2 < u2.length && "content" === u2[i2][1].type))
            for (; ++i2 < u2.length && "content" !== u2[i2][1].type; )
              "chunkText" === u2[i2][1].type && (u2[i2][1]._isInFirstContentOfListItem = true, i2++);
          if ("enter" === n2[0])
            n2[1].contentType && (Object.assign(t2, De(e2, l2)), l2 = t2[l2], a2 = true);
          else if (n2[1]._container) {
            for (i2 = l2, r2 = void 0; i2-- && (o2 = e2[i2], "lineEnding" === o2[1].type || "lineEndingBlank" === o2[1].type); )
              "enter" === o2[0] && (r2 && (e2[r2][1].type = "lineEndingBlank"), o2[1].type = "lineEnding", r2 = i2);
            r2 && (n2[1].end = Object.assign({}, e2[r2][1].start), c2 = e2.slice(r2, l2), c2.unshift(n2), xe(e2, r2, l2 - r2 + 1, c2));
          }
        }
        return !a2;
      }
      function De(e2, t2) {
        const n2 = e2[t2][1], r2 = e2[t2][2];
        let i2 = t2 - 1;
        const o2 = [], c2 = n2._tokenizer || r2.parser[n2.contentType](n2.start), u2 = c2.events, a2 = [], l2 = {};
        let s2, f2, p2 = -1, d2 = n2, m2 = 0, g2 = 0;
        const h2 = [g2];
        for (; d2; ) {
          for (; e2[++i2][1] !== d2; )
            ;
          o2.push(i2), d2._tokenizer || (s2 = r2.sliceStream(d2), d2.next || s2.push(null), f2 && c2.defineSkip(d2.start), d2._isInFirstContentOfListItem && (c2._gfmTasklistFirstContentOfListItem = true), c2.write(s2), d2._isInFirstContentOfListItem && (c2._gfmTasklistFirstContentOfListItem = void 0)), f2 = d2, d2 = d2.next;
        }
        for (d2 = n2; ++p2 < u2.length; )
          "exit" === u2[p2][0] && "enter" === u2[p2 - 1][0] && u2[p2][1].type === u2[p2 - 1][1].type && u2[p2][1].start.line !== u2[p2][1].end.line && (g2 = p2 + 1, h2.push(g2), d2._tokenizer = void 0, d2.previous = void 0, d2 = d2.next);
        for (c2.events = [], d2 ? (d2._tokenizer = void 0, d2.previous = void 0) : h2.pop(), p2 = h2.length; p2--; ) {
          const t3 = u2.slice(h2[p2], h2[p2 + 1]), n3 = o2.pop();
          a2.unshift([n3, n3 + t3.length - 1]), xe(e2, n3, 2, t3);
        }
        for (p2 = -1; ++p2 < a2.length; )
          l2[m2 + a2[p2][0]] = m2 + a2[p2][1], m2 += a2[p2][1] - a2[p2][0] - 1;
        return l2;
      }
      const Ee = { tokenize: function(e2, t2) {
        let n2;
        return function(t3) {
          return e2.enter("content"), n2 = e2.enter("chunkContent", { contentType: "content" }), r2(t3);
        };
        function r2(t3) {
          return null === t3 ? i2(t3) : s(t3) ? e2.check(Ae, o2, i2)(t3) : (e2.consume(t3), r2);
        }
        function i2(n3) {
          return e2.exit("chunkContent"), e2.exit("content"), t2(n3);
        }
        function o2(t3) {
          return e2.consume(t3), e2.exit("chunkContent"), n2.next = e2.enter("chunkContent", { contentType: "content", previous: n2 }), n2 = n2.next, r2;
        }
      }, resolve: function(e2) {
        return Te(e2), e2;
      } }, Ae = { tokenize: function(e2, t2, n2) {
        const r2 = this;
        return function(t3) {
          return e2.exit("chunkContent"), e2.enter("lineEnding"), e2.consume(t3), e2.exit("lineEnding"), h(e2, i2, "linePrefix");
        };
        function i2(i3) {
          if (null === i3 || s(i3))
            return n2(i3);
          const o2 = r2.events[r2.events.length - 1];
          return !r2.parser.constructs.disable.null.includes("codeIndented") && o2 && "linePrefix" === o2[1].type && o2[2].sliceSerialize(o2[1], true).length >= 4 ? t2(i3) : e2.interrupt(r2.parser.constructs.flow, n2, t2)(i3);
        }
      }, partial: true }, Ce = { tokenize: function(e2) {
        const t2 = this, n2 = e2.attempt(Z, function(r3) {
          if (null !== r3)
            return e2.enter("lineEndingBlank"), e2.consume(r3), e2.exit("lineEndingBlank"), t2.currentConstruct = void 0, n2;
          e2.consume(r3);
        }, e2.attempt(this.parser.constructs.flowInitial, r2, h(e2, e2.attempt(this.parser.constructs.flow, r2, e2.attempt(Ee, r2)), "linePrefix")));
        return n2;
        function r2(r3) {
          if (null !== r3)
            return e2.enter("lineEnding"), e2.consume(r3), e2.exit("lineEnding"), t2.currentConstruct = void 0, n2;
          e2.consume(r3);
        }
      } }, Fe = { resolveAll: Re() }, ze = Me("string"), Ie = Me("text");
      function Me(e2) {
        return { tokenize: function(t2) {
          const n2 = this, r2 = this.parser.constructs[e2], i2 = t2.attempt(r2, o2, c2);
          return o2;
          function o2(e3) {
            return a2(e3) ? i2(e3) : c2(e3);
          }
          function c2(e3) {
            if (null !== e3)
              return t2.enter("data"), t2.consume(e3), u2;
            t2.consume(e3);
          }
          function u2(e3) {
            return a2(e3) ? (t2.exit("data"), i2(e3)) : (t2.consume(e3), u2);
          }
          function a2(e3) {
            if (null === e3)
              return true;
            const t3 = r2[e3];
            let i3 = -1;
            if (t3)
              for (; ++i3 < t3.length; ) {
                const e4 = t3[i3];
                if (!e4.previous || e4.previous.call(n2, n2.previous))
                  return true;
              }
            return false;
          }
        }, resolveAll: Re("text" === e2 ? Oe : void 0) };
      }
      function Re(e2) {
        return function(t2, n2) {
          let r2, i2 = -1;
          for (; ++i2 <= t2.length; )
            void 0 === r2 ? t2[i2] && "data" === t2[i2][1].type && (r2 = i2, i2++) : t2[i2] && "data" === t2[i2][1].type || (i2 !== r2 + 2 && (t2[r2][1].end = t2[i2 - 1][1].end, t2.splice(r2 + 2, i2 - r2 - 2), i2 = r2 + 2), r2 = void 0);
          return e2 ? e2(t2, n2) : t2;
        };
      }
      function Oe(e2, t2) {
        let n2 = 0;
        for (; ++n2 <= e2.length; )
          if ((n2 === e2.length || "lineEnding" === e2[n2][1].type) && "data" === e2[n2 - 1][1].type) {
            const r2 = e2[n2 - 1][1], i2 = t2.sliceStream(r2);
            let o2, c2 = i2.length, u2 = -1, a2 = 0;
            for (; c2--; ) {
              const e3 = i2[c2];
              if ("string" == typeof e3) {
                for (u2 = e3.length; 32 === e3.charCodeAt(u2 - 1); )
                  a2++, u2--;
                if (u2)
                  break;
                u2 = -1;
              } else if (-2 === e3)
                o2 = true, a2++;
              else if (-1 !== e3) {
                c2++;
                break;
              }
            }
            if (a2) {
              const i3 = { type: n2 === e2.length || o2 || a2 < 2 ? "lineSuffix" : "hardBreakTrailing", start: { line: r2.end.line, column: r2.end.column - a2, offset: r2.end.offset - a2, _index: r2.start._index + c2, _bufferIndex: c2 ? u2 : r2.start._bufferIndex + u2 }, end: Object.assign({}, r2.end) };
              r2.end = Object.assign({}, i3.start), r2.start.offset === r2.end.offset ? Object.assign(r2, i3) : (e2.splice(n2, 0, ["enter", i3, t2], ["exit", i3, t2]), n2 += 2);
            }
            n2++;
          }
        return e2;
      }
      function Pe(e2, t2, n2) {
        const r2 = [];
        let i2 = -1;
        for (; ++i2 < e2.length; ) {
          const o2 = e2[i2].resolveAll;
          o2 && !r2.includes(o2) && (t2 = o2(t2, n2), r2.push(o2));
        }
        return t2;
      }
      function Ne(e2, t2, n2) {
        let r2 = Object.assign(n2 ? Object.assign({}, n2) : { line: 1, column: 1, offset: 0 }, { _index: 0, _bufferIndex: -1 });
        const i2 = {}, o2 = [];
        let c2 = [], u2 = [], a2 = true;
        const l2 = { consume: function(e3) {
          s(e3) ? (r2.line++, r2.column = 1, r2.offset += -3 === e3 ? 2 : 1, k2()) : -1 !== e3 && (r2.column++, r2.offset++), r2._bufferIndex < 0 ? r2._index++ : (r2._bufferIndex++, r2._bufferIndex === c2[r2._index].length && (r2._bufferIndex = -1, r2._index++)), f2.previous = e3, a2 = true;
        }, enter: function(e3, t3) {
          const n3 = t3 || {};
          return n3.type = e3, n3.start = g2(), f2.events.push(["enter", n3, f2]), u2.push(n3), n3;
        }, exit: function(e3) {
          const t3 = u2.pop();
          return t3.end = g2(), f2.events.push(["exit", t3, f2]), t3;
        }, attempt: x2(function(e3, t3) {
          v2(e3, t3.from);
        }), check: x2(b2), interrupt: x2(b2, { interrupt: true }) }, f2 = { previous: null, code: null, containerState: {}, events: [], parser: e2, sliceStream: m2, sliceSerialize: function(e3, t3) {
          return function(e4, t4) {
            let n3 = -1;
            const r3 = [];
            let i3;
            for (; ++n3 < e4.length; ) {
              const o3 = e4[n3];
              let c3;
              if ("string" == typeof o3)
                c3 = o3;
              else
                switch (o3) {
                  case -5:
                    c3 = "\r";
                    break;
                  case -4:
                    c3 = "\n";
                    break;
                  case -3:
                    c3 = "\r\n";
                    break;
                  case -2:
                    c3 = t4 ? " " : "	";
                    break;
                  case -1:
                    if (!t4 && i3)
                      continue;
                    c3 = " ";
                    break;
                  default:
                    c3 = String.fromCharCode(o3);
                }
              i3 = -2 === o3, r3.push(c3);
            }
            return r3.join("");
          }(m2(e3), t3);
        }, now: g2, defineSkip: function(e3) {
          i2[e3.line] = e3.column, k2();
        }, write: function(e3) {
          return c2 = ve(c2, e3), function() {
            let e4;
            for (; r2._index < c2.length; ) {
              const t3 = c2[r2._index];
              if ("string" == typeof t3)
                for (e4 = r2._index, r2._bufferIndex < 0 && (r2._bufferIndex = 0); r2._index === e4 && r2._bufferIndex < t3.length; )
                  h2(t3.charCodeAt(r2._bufferIndex));
              else
                h2(t3);
            }
          }(), null !== c2[c2.length - 1] ? [] : (v2(t2, 0), f2.events = Pe(o2, f2.events, f2), f2.events);
        } };
        let p2, d2 = t2.tokenize.call(f2, l2);
        return t2.resolveAll && o2.push(t2), f2;
        function m2(e3) {
          return function(e4, t3) {
            const n3 = t3.start._index, r3 = t3.start._bufferIndex, i3 = t3.end._index, o3 = t3.end._bufferIndex;
            let c3;
            if (n3 === i3)
              c3 = [e4[n3].slice(r3, o3)];
            else {
              if (c3 = e4.slice(n3, i3), r3 > -1) {
                const e5 = c3[0];
                "string" == typeof e5 ? c3[0] = e5.slice(r3) : c3.shift();
              }
              o3 > 0 && c3.push(e4[i3].slice(0, o3));
            }
            return c3;
          }(c2, e3);
        }
        function g2() {
          const { line: e3, column: t3, offset: n3, _index: i3, _bufferIndex: o3 } = r2;
          return { line: e3, column: t3, offset: n3, _index: i3, _bufferIndex: o3 };
        }
        function h2(e3) {
          a2 = void 0, p2 = e3, d2 = d2(e3);
        }
        function b2(e3, t3) {
          t3.restore();
        }
        function x2(e3, t3) {
          return function(n3, i3, o3) {
            let c3, s2, p3, d3;
            return Array.isArray(n3) ? h3(n3) : "tokenize" in n3 ? h3([n3]) : (m3 = n3, function(e4) {
              const t4 = null !== e4 && m3[e4], n4 = null !== e4 && m3.null;
              return h3([...Array.isArray(t4) ? t4 : t4 ? [t4] : [], ...Array.isArray(n4) ? n4 : n4 ? [n4] : []])(e4);
            });
            var m3;
            function h3(e4) {
              return c3 = e4, s2 = 0, 0 === e4.length ? o3 : b3(e4[s2]);
            }
            function b3(e4) {
              return function(n4) {
                return d3 = function() {
                  const e5 = g2(), t4 = f2.previous, n5 = f2.currentConstruct, i4 = f2.events.length, o4 = Array.from(u2);
                  return { restore: function() {
                    r2 = e5, f2.previous = t4, f2.currentConstruct = n5, f2.events.length = i4, u2 = o4, k2();
                  }, from: i4 };
                }(), p3 = e4, e4.partial || (f2.currentConstruct = e4), e4.name && f2.parser.constructs.disable.null.includes(e4.name) ? v3() : e4.tokenize.call(t3 ? Object.assign(Object.create(f2), t3) : f2, l2, x3, v3)(n4);
              };
            }
            function x3(t4) {
              return a2 = true, e3(p3, d3), i3;
            }
            function v3(e4) {
              return a2 = true, d3.restore(), ++s2 < c3.length ? b3(c3[s2]) : o3;
            }
          };
        }
        function v2(e3, t3) {
          e3.resolveAll && !o2.includes(e3) && o2.push(e3), e3.resolve && xe(f2.events, t3, f2.events.length - t3, e3.resolve(f2.events.slice(t3), f2)), e3.resolveTo && (f2.events = e3.resolveTo(f2.events, f2));
        }
        function k2() {
          r2.line in i2 && r2.column < 2 && (r2.column = i2[r2.line], r2.offset += i2[r2.line] - 1);
        }
      }
      const Ve = { name: "thematicBreak", tokenize: function(e2, t2, n2) {
        let r2, i2 = 0;
        return function(t3) {
          return e2.enter("thematicBreak"), function(e3) {
            return r2 = e3, o2(e3);
          }(t3);
        };
        function o2(o3) {
          return o3 === r2 ? (e2.enter("thematicBreakSequence"), c2(o3)) : i2 >= 3 && (null === o3 || s(o3)) ? (e2.exit("thematicBreak"), t2(o3)) : n2(o3);
        }
        function c2(t3) {
          return t3 === r2 ? (e2.consume(t3), i2++, c2) : (e2.exit("thematicBreakSequence"), p(t3) ? h(e2, o2, "whitespace")(t3) : o2(t3));
        }
      } }, _e = { name: "list", tokenize: function(e2, t2, n2) {
        const r2 = this, i2 = r2.events[r2.events.length - 1];
        let o2 = i2 && "linePrefix" === i2[1].type ? i2[2].sliceSerialize(i2[1], true).length : 0, c2 = 0;
        return function(t3) {
          const i3 = r2.containerState.type || (42 === t3 || 43 === t3 || 45 === t3 ? "listUnordered" : "listOrdered");
          if ("listUnordered" === i3 ? !r2.containerState.marker || t3 === r2.containerState.marker : u(t3)) {
            if (r2.containerState.type || (r2.containerState.type = i3, e2.enter(i3, { _container: true })), "listUnordered" === i3)
              return e2.enter("listItemPrefix"), 42 === t3 || 45 === t3 ? e2.check(Ve, n2, l2)(t3) : l2(t3);
            if (!r2.interrupt || 49 === t3)
              return e2.enter("listItemPrefix"), e2.enter("listItemValue"), a2(t3);
          }
          return n2(t3);
        };
        function a2(t3) {
          return u(t3) && ++c2 < 10 ? (e2.consume(t3), a2) : (!r2.interrupt || c2 < 2) && (r2.containerState.marker ? t3 === r2.containerState.marker : 41 === t3 || 46 === t3) ? (e2.exit("listItemValue"), l2(t3)) : n2(t3);
        }
        function l2(t3) {
          return e2.enter("listItemMarker"), e2.consume(t3), e2.exit("listItemMarker"), r2.containerState.marker = r2.containerState.marker || t3, e2.check(Z, r2.interrupt ? n2 : s2, e2.attempt(Be, d2, f2));
        }
        function s2(e3) {
          return r2.containerState.initialBlankLine = true, o2++, d2(e3);
        }
        function f2(t3) {
          return p(t3) ? (e2.enter("listItemPrefixWhitespace"), e2.consume(t3), e2.exit("listItemPrefixWhitespace"), d2) : n2(t3);
        }
        function d2(n3) {
          return r2.containerState.size = o2 + r2.sliceSerialize(e2.exit("listItemPrefix"), true).length, t2(n3);
        }
      }, continuation: { tokenize: function(e2, t2, n2) {
        const r2 = this;
        return r2.containerState._closeFlow = void 0, e2.check(Z, function(n3) {
          return r2.containerState.furtherBlankLines = r2.containerState.furtherBlankLines || r2.containerState.initialBlankLine, h(e2, t2, "listItemIndent", r2.containerState.size + 1)(n3);
        }, function(n3) {
          return r2.containerState.furtherBlankLines || !p(n3) ? (r2.containerState.furtherBlankLines = void 0, r2.containerState.initialBlankLine = void 0, i2(n3)) : (r2.containerState.furtherBlankLines = void 0, r2.containerState.initialBlankLine = void 0, e2.attempt(je, t2, i2)(n3));
        });
        function i2(i3) {
          return r2.containerState._closeFlow = true, r2.interrupt = void 0, h(e2, e2.attempt(_e, t2, n2), "linePrefix", r2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(i3);
        }
      } }, exit: function(e2) {
        e2.exit(this.containerState.type);
      } }, Be = { tokenize: function(e2, t2, n2) {
        const r2 = this;
        return h(e2, function(e3) {
          const i2 = r2.events[r2.events.length - 1];
          return !p(e3) && i2 && "listItemPrefixWhitespace" === i2[1].type ? t2(e3) : n2(e3);
        }, "listItemPrefixWhitespace", r2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
      }, partial: true }, je = { tokenize: function(e2, t2, n2) {
        const r2 = this;
        return h(e2, function(e3) {
          const i2 = r2.events[r2.events.length - 1];
          return i2 && "listItemIndent" === i2[1].type && i2[2].sliceSerialize(i2[1], true).length === r2.containerState.size ? t2(e3) : n2(e3);
        }, "listItemIndent", r2.containerState.size + 1);
      }, partial: true }, He = { name: "blockQuote", tokenize: function(e2, t2, n2) {
        const r2 = this;
        return function(t3) {
          if (62 === t3) {
            const n3 = r2.containerState;
            return n3.open || (e2.enter("blockQuote", { _container: true }), n3.open = true), e2.enter("blockQuotePrefix"), e2.enter("blockQuoteMarker"), e2.consume(t3), e2.exit("blockQuoteMarker"), i2;
          }
          return n2(t3);
        };
        function i2(n3) {
          return p(n3) ? (e2.enter("blockQuotePrefixWhitespace"), e2.consume(n3), e2.exit("blockQuotePrefixWhitespace"), e2.exit("blockQuotePrefix"), t2) : (e2.exit("blockQuotePrefix"), t2(n3));
        }
      }, continuation: { tokenize: function(e2, t2, n2) {
        const r2 = this;
        return function(t3) {
          return p(t3) ? h(e2, i2, "linePrefix", r2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t3) : i2(t3);
        };
        function i2(r3) {
          return e2.attempt(He, t2, n2)(r3);
        }
      } }, exit: function(e2) {
        e2.exit("blockQuote");
      } };
      function Ue(e2, t2, n2, r2, i2, o2, u2, a2, l2) {
        const p2 = l2 || Number.POSITIVE_INFINITY;
        let d2 = 0;
        return function(t3) {
          return 60 === t3 ? (e2.enter(r2), e2.enter(i2), e2.enter(o2), e2.consume(t3), e2.exit(o2), m2) : null === t3 || 32 === t3 || 41 === t3 || c(t3) ? n2(t3) : (e2.enter(r2), e2.enter(u2), e2.enter(a2), e2.enter("chunkString", { contentType: "string" }), b2(t3));
        };
        function m2(n3) {
          return 62 === n3 ? (e2.enter(o2), e2.consume(n3), e2.exit(o2), e2.exit(i2), e2.exit(r2), t2) : (e2.enter(a2), e2.enter("chunkString", { contentType: "string" }), g2(n3));
        }
        function g2(t3) {
          return 62 === t3 ? (e2.exit("chunkString"), e2.exit(a2), m2(t3)) : null === t3 || 60 === t3 || s(t3) ? n2(t3) : (e2.consume(t3), 92 === t3 ? h2 : g2);
        }
        function h2(t3) {
          return 60 === t3 || 62 === t3 || 92 === t3 ? (e2.consume(t3), g2) : g2(t3);
        }
        function b2(i3) {
          return d2 || null !== i3 && 41 !== i3 && !f(i3) ? d2 < p2 && 40 === i3 ? (e2.consume(i3), d2++, b2) : 41 === i3 ? (e2.consume(i3), d2--, b2) : null === i3 || 32 === i3 || 40 === i3 || c(i3) ? n2(i3) : (e2.consume(i3), 92 === i3 ? x2 : b2) : (e2.exit("chunkString"), e2.exit(a2), e2.exit(u2), e2.exit(r2), t2(i3));
        }
        function x2(t3) {
          return 40 === t3 || 41 === t3 || 92 === t3 ? (e2.consume(t3), b2) : b2(t3);
        }
      }
      function Ge(e2, t2, n2, r2, i2, o2) {
        const c2 = this;
        let u2, a2 = 0;
        return function(t3) {
          return e2.enter(r2), e2.enter(i2), e2.consume(t3), e2.exit(i2), e2.enter(o2), l2;
        };
        function l2(p2) {
          return a2 > 999 || null === p2 || 91 === p2 || 93 === p2 && !u2 || 94 === p2 && !a2 && "_hiddenFootnoteSupport" in c2.parser.constructs ? n2(p2) : 93 === p2 ? (e2.exit(o2), e2.enter(i2), e2.consume(p2), e2.exit(i2), e2.exit(r2), t2) : s(p2) ? (e2.enter("lineEnding"), e2.consume(p2), e2.exit("lineEnding"), l2) : (e2.enter("chunkString", { contentType: "string" }), f2(p2));
        }
        function f2(t3) {
          return null === t3 || 91 === t3 || 93 === t3 || s(t3) || a2++ > 999 ? (e2.exit("chunkString"), l2(t3)) : (e2.consume(t3), u2 || (u2 = !p(t3)), 92 === t3 ? d2 : f2);
        }
        function d2(t3) {
          return 91 === t3 || 92 === t3 || 93 === t3 ? (e2.consume(t3), a2++, f2) : f2(t3);
        }
      }
      function Qe(e2, t2, n2, r2, i2, o2) {
        let c2;
        return function(t3) {
          return 34 === t3 || 39 === t3 || 40 === t3 ? (e2.enter(r2), e2.enter(i2), e2.consume(t3), e2.exit(i2), c2 = 40 === t3 ? 41 : t3, u2) : n2(t3);
        };
        function u2(n3) {
          return n3 === c2 ? (e2.enter(i2), e2.consume(n3), e2.exit(i2), e2.exit(r2), t2) : (e2.enter(o2), a2(n3));
        }
        function a2(t3) {
          return t3 === c2 ? (e2.exit(o2), u2(c2)) : null === t3 ? n2(t3) : s(t3) ? (e2.enter("lineEnding"), e2.consume(t3), e2.exit("lineEnding"), h(e2, a2, "linePrefix")) : (e2.enter("chunkString", { contentType: "string" }), l2(t3));
        }
        function l2(t3) {
          return t3 === c2 || null === t3 || s(t3) ? (e2.exit("chunkString"), a2(t3)) : (e2.consume(t3), 92 === t3 ? f2 : l2);
        }
        function f2(t3) {
          return t3 === c2 || 92 === t3 ? (e2.consume(t3), l2) : l2(t3);
        }
      }
      const We = { name: "definition", tokenize: function(e2, t2, n2) {
        const r2 = this;
        let i2;
        return function(t3) {
          return e2.enter("definition"), function(t4) {
            return Ge.call(r2, e2, o2, n2, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(t4);
          }(t3);
        };
        function o2(t3) {
          return i2 = J(r2.sliceSerialize(r2.events[r2.events.length - 1][1]).slice(1, -1)), 58 === t3 ? (e2.enter("definitionMarker"), e2.consume(t3), e2.exit("definitionMarker"), c2) : n2(t3);
        }
        function c2(t3) {
          return f(t3) ? b(e2, u2)(t3) : u2(t3);
        }
        function u2(t3) {
          return Ue(e2, a2, n2, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString")(t3);
        }
        function a2(t3) {
          return e2.attempt(Ze, l2, l2)(t3);
        }
        function l2(t3) {
          return p(t3) ? h(e2, d2, "whitespace")(t3) : d2(t3);
        }
        function d2(o3) {
          return null === o3 || s(o3) ? (e2.exit("definition"), r2.parser.defined.push(i2), t2(o3)) : n2(o3);
        }
      } }, Ze = { tokenize: function(e2, t2, n2) {
        return function(t3) {
          return f(t3) ? b(e2, r2)(t3) : n2(t3);
        };
        function r2(t3) {
          return Qe(e2, i2, n2, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(t3);
        }
        function i2(t3) {
          return p(t3) ? h(e2, o2, "whitespace")(t3) : o2(t3);
        }
        function o2(e3) {
          return null === e3 || s(e3) ? t2(e3) : n2(e3);
        }
      }, partial: true }, Je = { name: "codeIndented", tokenize: function(e2, t2, n2) {
        const r2 = this;
        return function(t3) {
          return e2.enter("codeIndented"), h(e2, i2, "linePrefix", 5)(t3);
        };
        function i2(e3) {
          const t3 = r2.events[r2.events.length - 1];
          return t3 && "linePrefix" === t3[1].type && t3[2].sliceSerialize(t3[1], true).length >= 4 ? o2(e3) : n2(e3);
        }
        function o2(t3) {
          return null === t3 ? u2(t3) : s(t3) ? e2.attempt(Ye, o2, u2)(t3) : (e2.enter("codeFlowValue"), c2(t3));
        }
        function c2(t3) {
          return null === t3 || s(t3) ? (e2.exit("codeFlowValue"), o2(t3)) : (e2.consume(t3), c2);
        }
        function u2(n3) {
          return e2.exit("codeIndented"), t2(n3);
        }
      } }, Ye = { tokenize: function(e2, t2, n2) {
        const r2 = this;
        return i2;
        function i2(t3) {
          return r2.parser.lazy[r2.now().line] ? n2(t3) : s(t3) ? (e2.enter("lineEnding"), e2.consume(t3), e2.exit("lineEnding"), i2) : h(e2, o2, "linePrefix", 5)(t3);
        }
        function o2(e3) {
          const o3 = r2.events[r2.events.length - 1];
          return o3 && "linePrefix" === o3[1].type && o3[2].sliceSerialize(o3[1], true).length >= 4 ? t2(e3) : s(e3) ? i2(e3) : n2(e3);
        }
      }, partial: true }, Ke = { name: "headingAtx", tokenize: function(e2, t2, n2) {
        let r2 = 0;
        return function(t3) {
          return e2.enter("atxHeading"), function(t4) {
            return e2.enter("atxHeadingSequence"), i2(t4);
          }(t3);
        };
        function i2(t3) {
          return 35 === t3 && r2++ < 6 ? (e2.consume(t3), i2) : null === t3 || f(t3) ? (e2.exit("atxHeadingSequence"), o2(t3)) : n2(t3);
        }
        function o2(n3) {
          return 35 === n3 ? (e2.enter("atxHeadingSequence"), c2(n3)) : null === n3 || s(n3) ? (e2.exit("atxHeading"), t2(n3)) : p(n3) ? h(e2, o2, "whitespace")(n3) : (e2.enter("atxHeadingText"), u2(n3));
        }
        function c2(t3) {
          return 35 === t3 ? (e2.consume(t3), c2) : (e2.exit("atxHeadingSequence"), o2(t3));
        }
        function u2(t3) {
          return null === t3 || 35 === t3 || f(t3) ? (e2.exit("atxHeadingText"), o2(t3)) : (e2.consume(t3), u2);
        }
      }, resolve: function(e2, t2) {
        let n2, r2, i2 = e2.length - 2, o2 = 3;
        return "whitespace" === e2[o2][1].type && (o2 += 2), i2 - 2 > o2 && "whitespace" === e2[i2][1].type && (i2 -= 2), "atxHeadingSequence" === e2[i2][1].type && (o2 === i2 - 1 || i2 - 4 > o2 && "whitespace" === e2[i2 - 2][1].type) && (i2 -= o2 + 1 === i2 ? 2 : 4), i2 > o2 && (n2 = { type: "atxHeadingText", start: e2[o2][1].start, end: e2[i2][1].end }, r2 = { type: "chunkText", start: e2[o2][1].start, end: e2[i2][1].end, contentType: "text" }, xe(e2, o2, i2 - o2 + 1, [["enter", n2, t2], ["enter", r2, t2], ["exit", r2, t2], ["exit", n2, t2]])), e2;
      } }, Xe = { name: "setextUnderline", tokenize: function(e2, t2, n2) {
        const r2 = this;
        let i2;
        return function(t3) {
          let c3, u2 = r2.events.length;
          for (; u2--; )
            if ("lineEnding" !== r2.events[u2][1].type && "linePrefix" !== r2.events[u2][1].type && "content" !== r2.events[u2][1].type) {
              c3 = "paragraph" === r2.events[u2][1].type;
              break;
            }
          return r2.parser.lazy[r2.now().line] || !r2.interrupt && !c3 ? n2(t3) : (e2.enter("setextHeadingLine"), i2 = t3, function(t4) {
            return e2.enter("setextHeadingLineSequence"), o2(t4);
          }(t3));
        };
        function o2(t3) {
          return t3 === i2 ? (e2.consume(t3), o2) : (e2.exit("setextHeadingLineSequence"), p(t3) ? h(e2, c2, "lineSuffix")(t3) : c2(t3));
        }
        function c2(r3) {
          return null === r3 || s(r3) ? (e2.exit("setextHeadingLine"), t2(r3)) : n2(r3);
        }
      }, resolveTo: function(e2, t2) {
        let n2, r2, i2, o2 = e2.length;
        for (; o2--; )
          if ("enter" === e2[o2][0]) {
            if ("content" === e2[o2][1].type) {
              n2 = o2;
              break;
            }
            "paragraph" === e2[o2][1].type && (r2 = o2);
          } else
            "content" === e2[o2][1].type && e2.splice(o2, 1), i2 || "definition" !== e2[o2][1].type || (i2 = o2);
        const c2 = { type: "setextHeading", start: Object.assign({}, e2[r2][1].start), end: Object.assign({}, e2[e2.length - 1][1].end) };
        return e2[r2][1].type = "setextHeadingText", i2 ? (e2.splice(r2, 0, ["enter", c2, t2]), e2.splice(i2 + 1, 0, ["exit", e2[n2][1], t2]), e2[n2][1].end = Object.assign({}, e2[i2][1].end)) : e2[n2][1] = c2, e2.push(["exit", c2, t2]), e2;
      } }, $e = ["address", "article", "aside", "base", "basefont", "blockquote", "body", "caption", "center", "col", "colgroup", "dd", "details", "dialog", "dir", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hr", "html", "iframe", "legend", "li", "link", "main", "menu", "menuitem", "nav", "noframes", "ol", "optgroup", "option", "p", "param", "search", "section", "summary", "table", "tbody", "td", "tfoot", "th", "thead", "title", "tr", "track", "ul"], et = ["pre", "script", "style", "textarea"], tt = { name: "htmlFlow", tokenize: function(e2, t2, n2) {
        const o2 = this;
        let c2, u2, a2, l2, d2;
        return function(t3) {
          return function(t4) {
            return e2.enter("htmlFlow"), e2.enter("htmlFlowData"), e2.consume(t4), m2;
          }(t3);
        };
        function m2(i2) {
          return 33 === i2 ? (e2.consume(i2), g2) : 47 === i2 ? (e2.consume(i2), u2 = true, x2) : 63 === i2 ? (e2.consume(i2), c2 = 3, o2.interrupt ? t2 : V2) : r(i2) ? (e2.consume(i2), a2 = String.fromCharCode(i2), v2) : n2(i2);
        }
        function g2(i2) {
          return 45 === i2 ? (e2.consume(i2), c2 = 2, h2) : 91 === i2 ? (e2.consume(i2), c2 = 5, l2 = 0, b2) : r(i2) ? (e2.consume(i2), c2 = 4, o2.interrupt ? t2 : V2) : n2(i2);
        }
        function h2(r2) {
          return 45 === r2 ? (e2.consume(r2), o2.interrupt ? t2 : V2) : n2(r2);
        }
        function b2(r2) {
          return r2 === "CDATA[".charCodeAt(l2++) ? (e2.consume(r2), 6 === l2 ? o2.interrupt ? t2 : F2 : b2) : n2(r2);
        }
        function x2(t3) {
          return r(t3) ? (e2.consume(t3), a2 = String.fromCharCode(t3), v2) : n2(t3);
        }
        function v2(r2) {
          if (null === r2 || 47 === r2 || 62 === r2 || f(r2)) {
            const i2 = 47 === r2, l3 = a2.toLowerCase();
            return i2 || u2 || !et.includes(l3) ? $e.includes(a2.toLowerCase()) ? (c2 = 6, i2 ? (e2.consume(r2), k2) : o2.interrupt ? t2(r2) : F2(r2)) : (c2 = 7, o2.interrupt && !o2.parser.lazy[o2.now().line] ? n2(r2) : u2 ? y2(r2) : w2(r2)) : (c2 = 1, o2.interrupt ? t2(r2) : F2(r2));
          }
          return 45 === r2 || i(r2) ? (e2.consume(r2), a2 += String.fromCharCode(r2), v2) : n2(r2);
        }
        function k2(r2) {
          return 62 === r2 ? (e2.consume(r2), o2.interrupt ? t2 : F2) : n2(r2);
        }
        function y2(t3) {
          return p(t3) ? (e2.consume(t3), y2) : A2(t3);
        }
        function w2(t3) {
          return 47 === t3 ? (e2.consume(t3), A2) : 58 === t3 || 95 === t3 || r(t3) ? (e2.consume(t3), q2) : p(t3) ? (e2.consume(t3), w2) : A2(t3);
        }
        function q2(t3) {
          return 45 === t3 || 46 === t3 || 58 === t3 || 95 === t3 || i(t3) ? (e2.consume(t3), q2) : S2(t3);
        }
        function S2(t3) {
          return 61 === t3 ? (e2.consume(t3), L2) : p(t3) ? (e2.consume(t3), S2) : w2(t3);
        }
        function L2(t3) {
          return null === t3 || 60 === t3 || 61 === t3 || 62 === t3 || 96 === t3 ? n2(t3) : 34 === t3 || 39 === t3 ? (e2.consume(t3), d2 = t3, T2) : p(t3) ? (e2.consume(t3), L2) : D2(t3);
        }
        function T2(t3) {
          return t3 === d2 ? (e2.consume(t3), d2 = null, E2) : null === t3 || s(t3) ? n2(t3) : (e2.consume(t3), T2);
        }
        function D2(t3) {
          return null === t3 || 34 === t3 || 39 === t3 || 47 === t3 || 60 === t3 || 61 === t3 || 62 === t3 || 96 === t3 || f(t3) ? S2(t3) : (e2.consume(t3), D2);
        }
        function E2(e3) {
          return 47 === e3 || 62 === e3 || p(e3) ? w2(e3) : n2(e3);
        }
        function A2(t3) {
          return 62 === t3 ? (e2.consume(t3), C2) : n2(t3);
        }
        function C2(t3) {
          return null === t3 || s(t3) ? F2(t3) : p(t3) ? (e2.consume(t3), C2) : n2(t3);
        }
        function F2(t3) {
          return 45 === t3 && 2 === c2 ? (e2.consume(t3), R2) : 60 === t3 && 1 === c2 ? (e2.consume(t3), O2) : 62 === t3 && 4 === c2 ? (e2.consume(t3), _2) : 63 === t3 && 3 === c2 ? (e2.consume(t3), V2) : 93 === t3 && 5 === c2 ? (e2.consume(t3), N2) : !s(t3) || 6 !== c2 && 7 !== c2 ? null === t3 || s(t3) ? (e2.exit("htmlFlowData"), z2(t3)) : (e2.consume(t3), F2) : (e2.exit("htmlFlowData"), e2.check(nt, B2, z2)(t3));
        }
        function z2(t3) {
          return e2.check(rt, I2, B2)(t3);
        }
        function I2(t3) {
          return e2.enter("lineEnding"), e2.consume(t3), e2.exit("lineEnding"), M2;
        }
        function M2(t3) {
          return null === t3 || s(t3) ? z2(t3) : (e2.enter("htmlFlowData"), F2(t3));
        }
        function R2(t3) {
          return 45 === t3 ? (e2.consume(t3), V2) : F2(t3);
        }
        function O2(t3) {
          return 47 === t3 ? (e2.consume(t3), a2 = "", P2) : F2(t3);
        }
        function P2(t3) {
          if (62 === t3) {
            const n3 = a2.toLowerCase();
            return et.includes(n3) ? (e2.consume(t3), _2) : F2(t3);
          }
          return r(t3) && a2.length < 8 ? (e2.consume(t3), a2 += String.fromCharCode(t3), P2) : F2(t3);
        }
        function N2(t3) {
          return 93 === t3 ? (e2.consume(t3), V2) : F2(t3);
        }
        function V2(t3) {
          return 62 === t3 ? (e2.consume(t3), _2) : 45 === t3 && 2 === c2 ? (e2.consume(t3), V2) : F2(t3);
        }
        function _2(t3) {
          return null === t3 || s(t3) ? (e2.exit("htmlFlowData"), B2(t3)) : (e2.consume(t3), _2);
        }
        function B2(n3) {
          return e2.exit("htmlFlow"), t2(n3);
        }
      }, resolveTo: function(e2) {
        let t2 = e2.length;
        for (; t2-- && ("enter" !== e2[t2][0] || "htmlFlow" !== e2[t2][1].type); )
          ;
        return t2 > 1 && "linePrefix" === e2[t2 - 2][1].type && (e2[t2][1].start = e2[t2 - 2][1].start, e2[t2 + 1][1].start = e2[t2 - 2][1].start, e2.splice(t2 - 2, 2)), e2;
      }, concrete: true }, nt = { tokenize: function(e2, t2, n2) {
        return function(r2) {
          return e2.enter("lineEnding"), e2.consume(r2), e2.exit("lineEnding"), e2.attempt(Z, t2, n2);
        };
      }, partial: true }, rt = { tokenize: function(e2, t2, n2) {
        const r2 = this;
        return function(t3) {
          return s(t3) ? (e2.enter("lineEnding"), e2.consume(t3), e2.exit("lineEnding"), i2) : n2(t3);
        };
        function i2(e3) {
          return r2.parser.lazy[r2.now().line] ? n2(e3) : t2(e3);
        }
      }, partial: true }, it = { tokenize: function(e2, t2, n2) {
        const r2 = this;
        return function(t3) {
          return null === t3 ? n2(t3) : (e2.enter("lineEnding"), e2.consume(t3), e2.exit("lineEnding"), i2);
        };
        function i2(e3) {
          return r2.parser.lazy[r2.now().line] ? n2(e3) : t2(e3);
        }
      }, partial: true }, ot = { name: "codeFenced", tokenize: function(e2, t2, n2) {
        const r2 = this, i2 = { tokenize: function(e3, t3, n3) {
          let i3 = 0;
          return function(t4) {
            return e3.enter("lineEnding"), e3.consume(t4), e3.exit("lineEnding"), c3;
          };
          function c3(t4) {
            return e3.enter("codeFencedFence"), p(t4) ? h(e3, a3, "linePrefix", r2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t4) : a3(t4);
          }
          function a3(t4) {
            return t4 === o2 ? (e3.enter("codeFencedFenceSequence"), l3(t4)) : n3(t4);
          }
          function l3(t4) {
            return t4 === o2 ? (i3++, e3.consume(t4), l3) : i3 >= u2 ? (e3.exit("codeFencedFenceSequence"), p(t4) ? h(e3, f3, "whitespace")(t4) : f3(t4)) : n3(t4);
          }
          function f3(r3) {
            return null === r3 || s(r3) ? (e3.exit("codeFencedFence"), t3(r3)) : n3(r3);
          }
        }, partial: true };
        let o2, c2 = 0, u2 = 0;
        return function(t3) {
          return function(t4) {
            const n3 = r2.events[r2.events.length - 1];
            return c2 = n3 && "linePrefix" === n3[1].type ? n3[2].sliceSerialize(n3[1], true).length : 0, o2 = t4, e2.enter("codeFenced"), e2.enter("codeFencedFence"), e2.enter("codeFencedFenceSequence"), a2(t4);
          }(t3);
        };
        function a2(t3) {
          return t3 === o2 ? (u2++, e2.consume(t3), a2) : u2 < 3 ? n2(t3) : (e2.exit("codeFencedFenceSequence"), p(t3) ? h(e2, l2, "whitespace")(t3) : l2(t3));
        }
        function l2(n3) {
          return null === n3 || s(n3) ? (e2.exit("codeFencedFence"), r2.interrupt ? t2(n3) : e2.check(it, g2, y2)(n3)) : (e2.enter("codeFencedFenceInfo"), e2.enter("chunkString", { contentType: "string" }), f2(n3));
        }
        function f2(t3) {
          return null === t3 || s(t3) ? (e2.exit("chunkString"), e2.exit("codeFencedFenceInfo"), l2(t3)) : p(t3) ? (e2.exit("chunkString"), e2.exit("codeFencedFenceInfo"), h(e2, d2, "whitespace")(t3)) : 96 === t3 && t3 === o2 ? n2(t3) : (e2.consume(t3), f2);
        }
        function d2(t3) {
          return null === t3 || s(t3) ? l2(t3) : (e2.enter("codeFencedFenceMeta"), e2.enter("chunkString", { contentType: "string" }), m2(t3));
        }
        function m2(t3) {
          return null === t3 || s(t3) ? (e2.exit("chunkString"), e2.exit("codeFencedFenceMeta"), l2(t3)) : 96 === t3 && t3 === o2 ? n2(t3) : (e2.consume(t3), m2);
        }
        function g2(t3) {
          return e2.attempt(i2, y2, b2)(t3);
        }
        function b2(t3) {
          return e2.enter("lineEnding"), e2.consume(t3), e2.exit("lineEnding"), x2;
        }
        function x2(t3) {
          return c2 > 0 && p(t3) ? h(e2, v2, "linePrefix", c2 + 1)(t3) : v2(t3);
        }
        function v2(t3) {
          return null === t3 || s(t3) ? e2.check(it, g2, y2)(t3) : (e2.enter("codeFlowValue"), k2(t3));
        }
        function k2(t3) {
          return null === t3 || s(t3) ? (e2.exit("codeFlowValue"), v2(t3)) : (e2.consume(t3), k2);
        }
        function y2(n3) {
          return e2.exit("codeFenced"), t2(n3);
        }
      }, concrete: true }, ct = { AElig: "\xC6", AMP: "&", Aacute: "\xC1", Abreve: "\u0102", Acirc: "\xC2", Acy: "\u0410", Afr: "\u{1D504}", Agrave: "\xC0", Alpha: "\u0391", Amacr: "\u0100", And: "\u2A53", Aogon: "\u0104", Aopf: "\u{1D538}", ApplyFunction: "\u2061", Aring: "\xC5", Ascr: "\u{1D49C}", Assign: "\u2254", Atilde: "\xC3", Auml: "\xC4", Backslash: "\u2216", Barv: "\u2AE7", Barwed: "\u2306", Bcy: "\u0411", Because: "\u2235", Bernoullis: "\u212C", Beta: "\u0392", Bfr: "\u{1D505}", Bopf: "\u{1D539}", Breve: "\u02D8", Bscr: "\u212C", Bumpeq: "\u224E", CHcy: "\u0427", COPY: "\xA9", Cacute: "\u0106", Cap: "\u22D2", CapitalDifferentialD: "\u2145", Cayleys: "\u212D", Ccaron: "\u010C", Ccedil: "\xC7", Ccirc: "\u0108", Cconint: "\u2230", Cdot: "\u010A", Cedilla: "\xB8", CenterDot: "\xB7", Cfr: "\u212D", Chi: "\u03A7", CircleDot: "\u2299", CircleMinus: "\u2296", CirclePlus: "\u2295", CircleTimes: "\u2297", ClockwiseContourIntegral: "\u2232", CloseCurlyDoubleQuote: "\u201D", CloseCurlyQuote: "\u2019", Colon: "\u2237", Colone: "\u2A74", Congruent: "\u2261", Conint: "\u222F", ContourIntegral: "\u222E", Copf: "\u2102", Coproduct: "\u2210", CounterClockwiseContourIntegral: "\u2233", Cross: "\u2A2F", Cscr: "\u{1D49E}", Cup: "\u22D3", CupCap: "\u224D", DD: "\u2145", DDotrahd: "\u2911", DJcy: "\u0402", DScy: "\u0405", DZcy: "\u040F", Dagger: "\u2021", Darr: "\u21A1", Dashv: "\u2AE4", Dcaron: "\u010E", Dcy: "\u0414", Del: "\u2207", Delta: "\u0394", Dfr: "\u{1D507}", DiacriticalAcute: "\xB4", DiacriticalDot: "\u02D9", DiacriticalDoubleAcute: "\u02DD", DiacriticalGrave: "`", DiacriticalTilde: "\u02DC", Diamond: "\u22C4", DifferentialD: "\u2146", Dopf: "\u{1D53B}", Dot: "\xA8", DotDot: "\u20DC", DotEqual: "\u2250", DoubleContourIntegral: "\u222F", DoubleDot: "\xA8", DoubleDownArrow: "\u21D3", DoubleLeftArrow: "\u21D0", DoubleLeftRightArrow: "\u21D4", DoubleLeftTee: "\u2AE4", DoubleLongLeftArrow: "\u27F8", DoubleLongLeftRightArrow: "\u27FA", DoubleLongRightArrow: "\u27F9", DoubleRightArrow: "\u21D2", DoubleRightTee: "\u22A8", DoubleUpArrow: "\u21D1", DoubleUpDownArrow: "\u21D5", DoubleVerticalBar: "\u2225", DownArrow: "\u2193", DownArrowBar: "\u2913", DownArrowUpArrow: "\u21F5", DownBreve: "\u0311", DownLeftRightVector: "\u2950", DownLeftTeeVector: "\u295E", DownLeftVector: "\u21BD", DownLeftVectorBar: "\u2956", DownRightTeeVector: "\u295F", DownRightVector: "\u21C1", DownRightVectorBar: "\u2957", DownTee: "\u22A4", DownTeeArrow: "\u21A7", Downarrow: "\u21D3", Dscr: "\u{1D49F}", Dstrok: "\u0110", ENG: "\u014A", ETH: "\xD0", Eacute: "\xC9", Ecaron: "\u011A", Ecirc: "\xCA", Ecy: "\u042D", Edot: "\u0116", Efr: "\u{1D508}", Egrave: "\xC8", Element: "\u2208", Emacr: "\u0112", EmptySmallSquare: "\u25FB", EmptyVerySmallSquare: "\u25AB", Eogon: "\u0118", Eopf: "\u{1D53C}", Epsilon: "\u0395", Equal: "\u2A75", EqualTilde: "\u2242", Equilibrium: "\u21CC", Escr: "\u2130", Esim: "\u2A73", Eta: "\u0397", Euml: "\xCB", Exists: "\u2203", ExponentialE: "\u2147", Fcy: "\u0424", Ffr: "\u{1D509}", FilledSmallSquare: "\u25FC", FilledVerySmallSquare: "\u25AA", Fopf: "\u{1D53D}", ForAll: "\u2200", Fouriertrf: "\u2131", Fscr: "\u2131", GJcy: "\u0403", GT: ">", Gamma: "\u0393", Gammad: "\u03DC", Gbreve: "\u011E", Gcedil: "\u0122", Gcirc: "\u011C", Gcy: "\u0413", Gdot: "\u0120", Gfr: "\u{1D50A}", Gg: "\u22D9", Gopf: "\u{1D53E}", GreaterEqual: "\u2265", GreaterEqualLess: "\u22DB", GreaterFullEqual: "\u2267", GreaterGreater: "\u2AA2", GreaterLess: "\u2277", GreaterSlantEqual: "\u2A7E", GreaterTilde: "\u2273", Gscr: "\u{1D4A2}", Gt: "\u226B", HARDcy: "\u042A", Hacek: "\u02C7", Hat: "^", Hcirc: "\u0124", Hfr: "\u210C", HilbertSpace: "\u210B", Hopf: "\u210D", HorizontalLine: "\u2500", Hscr: "\u210B", Hstrok: "\u0126", HumpDownHump: "\u224E", HumpEqual: "\u224F", IEcy: "\u0415", IJlig: "\u0132", IOcy: "\u0401", Iacute: "\xCD", Icirc: "\xCE", Icy: "\u0418", Idot: "\u0130", Ifr: "\u2111", Igrave: "\xCC", Im: "\u2111", Imacr: "\u012A", ImaginaryI: "\u2148", Implies: "\u21D2", Int: "\u222C", Integral: "\u222B", Intersection: "\u22C2", InvisibleComma: "\u2063", InvisibleTimes: "\u2062", Iogon: "\u012E", Iopf: "\u{1D540}", Iota: "\u0399", Iscr: "\u2110", Itilde: "\u0128", Iukcy: "\u0406", Iuml: "\xCF", Jcirc: "\u0134", Jcy: "\u0419", Jfr: "\u{1D50D}", Jopf: "\u{1D541}", Jscr: "\u{1D4A5}", Jsercy: "\u0408", Jukcy: "\u0404", KHcy: "\u0425", KJcy: "\u040C", Kappa: "\u039A", Kcedil: "\u0136", Kcy: "\u041A", Kfr: "\u{1D50E}", Kopf: "\u{1D542}", Kscr: "\u{1D4A6}", LJcy: "\u0409", LT: "<", Lacute: "\u0139", Lambda: "\u039B", Lang: "\u27EA", Laplacetrf: "\u2112", Larr: "\u219E", Lcaron: "\u013D", Lcedil: "\u013B", Lcy: "\u041B", LeftAngleBracket: "\u27E8", LeftArrow: "\u2190", LeftArrowBar: "\u21E4", LeftArrowRightArrow: "\u21C6", LeftCeiling: "\u2308", LeftDoubleBracket: "\u27E6", LeftDownTeeVector: "\u2961", LeftDownVector: "\u21C3", LeftDownVectorBar: "\u2959", LeftFloor: "\u230A", LeftRightArrow: "\u2194", LeftRightVector: "\u294E", LeftTee: "\u22A3", LeftTeeArrow: "\u21A4", LeftTeeVector: "\u295A", LeftTriangle: "\u22B2", LeftTriangleBar: "\u29CF", LeftTriangleEqual: "\u22B4", LeftUpDownVector: "\u2951", LeftUpTeeVector: "\u2960", LeftUpVector: "\u21BF", LeftUpVectorBar: "\u2958", LeftVector: "\u21BC", LeftVectorBar: "\u2952", Leftarrow: "\u21D0", Leftrightarrow: "\u21D4", LessEqualGreater: "\u22DA", LessFullEqual: "\u2266", LessGreater: "\u2276", LessLess: "\u2AA1", LessSlantEqual: "\u2A7D", LessTilde: "\u2272", Lfr: "\u{1D50F}", Ll: "\u22D8", Lleftarrow: "\u21DA", Lmidot: "\u013F", LongLeftArrow: "\u27F5", LongLeftRightArrow: "\u27F7", LongRightArrow: "\u27F6", Longleftarrow: "\u27F8", Longleftrightarrow: "\u27FA", Longrightarrow: "\u27F9", Lopf: "\u{1D543}", LowerLeftArrow: "\u2199", LowerRightArrow: "\u2198", Lscr: "\u2112", Lsh: "\u21B0", Lstrok: "\u0141", Lt: "\u226A", Map: "\u2905", Mcy: "\u041C", MediumSpace: "\u205F", Mellintrf: "\u2133", Mfr: "\u{1D510}", MinusPlus: "\u2213", Mopf: "\u{1D544}", Mscr: "\u2133", Mu: "\u039C", NJcy: "\u040A", Nacute: "\u0143", Ncaron: "\u0147", Ncedil: "\u0145", Ncy: "\u041D", NegativeMediumSpace: "\u200B", NegativeThickSpace: "\u200B", NegativeThinSpace: "\u200B", NegativeVeryThinSpace: "\u200B", NestedGreaterGreater: "\u226B", NestedLessLess: "\u226A", NewLine: "\n", Nfr: "\u{1D511}", NoBreak: "\u2060", NonBreakingSpace: "\xA0", Nopf: "\u2115", Not: "\u2AEC", NotCongruent: "\u2262", NotCupCap: "\u226D", NotDoubleVerticalBar: "\u2226", NotElement: "\u2209", NotEqual: "\u2260", NotEqualTilde: "\u2242\u0338", NotExists: "\u2204", NotGreater: "\u226F", NotGreaterEqual: "\u2271", NotGreaterFullEqual: "\u2267\u0338", NotGreaterGreater: "\u226B\u0338", NotGreaterLess: "\u2279", NotGreaterSlantEqual: "\u2A7E\u0338", NotGreaterTilde: "\u2275", NotHumpDownHump: "\u224E\u0338", NotHumpEqual: "\u224F\u0338", NotLeftTriangle: "\u22EA", NotLeftTriangleBar: "\u29CF\u0338", NotLeftTriangleEqual: "\u22EC", NotLess: "\u226E", NotLessEqual: "\u2270", NotLessGreater: "\u2278", NotLessLess: "\u226A\u0338", NotLessSlantEqual: "\u2A7D\u0338", NotLessTilde: "\u2274", NotNestedGreaterGreater: "\u2AA2\u0338", NotNestedLessLess: "\u2AA1\u0338", NotPrecedes: "\u2280", NotPrecedesEqual: "\u2AAF\u0338", NotPrecedesSlantEqual: "\u22E0", NotReverseElement: "\u220C", NotRightTriangle: "\u22EB", NotRightTriangleBar: "\u29D0\u0338", NotRightTriangleEqual: "\u22ED", NotSquareSubset: "\u228F\u0338", NotSquareSubsetEqual: "\u22E2", NotSquareSuperset: "\u2290\u0338", NotSquareSupersetEqual: "\u22E3", NotSubset: "\u2282\u20D2", NotSubsetEqual: "\u2288", NotSucceeds: "\u2281", NotSucceedsEqual: "\u2AB0\u0338", NotSucceedsSlantEqual: "\u22E1", NotSucceedsTilde: "\u227F\u0338", NotSuperset: "\u2283\u20D2", NotSupersetEqual: "\u2289", NotTilde: "\u2241", NotTildeEqual: "\u2244", NotTildeFullEqual: "\u2247", NotTildeTilde: "\u2249", NotVerticalBar: "\u2224", Nscr: "\u{1D4A9}", Ntilde: "\xD1", Nu: "\u039D", OElig: "\u0152", Oacute: "\xD3", Ocirc: "\xD4", Ocy: "\u041E", Odblac: "\u0150", Ofr: "\u{1D512}", Ograve: "\xD2", Omacr: "\u014C", Omega: "\u03A9", Omicron: "\u039F", Oopf: "\u{1D546}", OpenCurlyDoubleQuote: "\u201C", OpenCurlyQuote: "\u2018", Or: "\u2A54", Oscr: "\u{1D4AA}", Oslash: "\xD8", Otilde: "\xD5", Otimes: "\u2A37", Ouml: "\xD6", OverBar: "\u203E", OverBrace: "\u23DE", OverBracket: "\u23B4", OverParenthesis: "\u23DC", PartialD: "\u2202", Pcy: "\u041F", Pfr: "\u{1D513}", Phi: "\u03A6", Pi: "\u03A0", PlusMinus: "\xB1", Poincareplane: "\u210C", Popf: "\u2119", Pr: "\u2ABB", Precedes: "\u227A", PrecedesEqual: "\u2AAF", PrecedesSlantEqual: "\u227C", PrecedesTilde: "\u227E", Prime: "\u2033", Product: "\u220F", Proportion: "\u2237", Proportional: "\u221D", Pscr: "\u{1D4AB}", Psi: "\u03A8", QUOT: '"', Qfr: "\u{1D514}", Qopf: "\u211A", Qscr: "\u{1D4AC}", RBarr: "\u2910", REG: "\xAE", Racute: "\u0154", Rang: "\u27EB", Rarr: "\u21A0", Rarrtl: "\u2916", Rcaron: "\u0158", Rcedil: "\u0156", Rcy: "\u0420", Re: "\u211C", ReverseElement: "\u220B", ReverseEquilibrium: "\u21CB", ReverseUpEquilibrium: "\u296F", Rfr: "\u211C", Rho: "\u03A1", RightAngleBracket: "\u27E9", RightArrow: "\u2192", RightArrowBar: "\u21E5", RightArrowLeftArrow: "\u21C4", RightCeiling: "\u2309", RightDoubleBracket: "\u27E7", RightDownTeeVector: "\u295D", RightDownVector: "\u21C2", RightDownVectorBar: "\u2955", RightFloor: "\u230B", RightTee: "\u22A2", RightTeeArrow: "\u21A6", RightTeeVector: "\u295B", RightTriangle: "\u22B3", RightTriangleBar: "\u29D0", RightTriangleEqual: "\u22B5", RightUpDownVector: "\u294F", RightUpTeeVector: "\u295C", RightUpVector: "\u21BE", RightUpVectorBar: "\u2954", RightVector: "\u21C0", RightVectorBar: "\u2953", Rightarrow: "\u21D2", Ropf: "\u211D", RoundImplies: "\u2970", Rrightarrow: "\u21DB", Rscr: "\u211B", Rsh: "\u21B1", RuleDelayed: "\u29F4", SHCHcy: "\u0429", SHcy: "\u0428", SOFTcy: "\u042C", Sacute: "\u015A", Sc: "\u2ABC", Scaron: "\u0160", Scedil: "\u015E", Scirc: "\u015C", Scy: "\u0421", Sfr: "\u{1D516}", ShortDownArrow: "\u2193", ShortLeftArrow: "\u2190", ShortRightArrow: "\u2192", ShortUpArrow: "\u2191", Sigma: "\u03A3", SmallCircle: "\u2218", Sopf: "\u{1D54A}", Sqrt: "\u221A", Square: "\u25A1", SquareIntersection: "\u2293", SquareSubset: "\u228F", SquareSubsetEqual: "\u2291", SquareSuperset: "\u2290", SquareSupersetEqual: "\u2292", SquareUnion: "\u2294", Sscr: "\u{1D4AE}", Star: "\u22C6", Sub: "\u22D0", Subset: "\u22D0", SubsetEqual: "\u2286", Succeeds: "\u227B", SucceedsEqual: "\u2AB0", SucceedsSlantEqual: "\u227D", SucceedsTilde: "\u227F", SuchThat: "\u220B", Sum: "\u2211", Sup: "\u22D1", Superset: "\u2283", SupersetEqual: "\u2287", Supset: "\u22D1", THORN: "\xDE", TRADE: "\u2122", TSHcy: "\u040B", TScy: "\u0426", Tab: "	", Tau: "\u03A4", Tcaron: "\u0164", Tcedil: "\u0162", Tcy: "\u0422", Tfr: "\u{1D517}", Therefore: "\u2234", Theta: "\u0398", ThickSpace: "\u205F\u200A", ThinSpace: "\u2009", Tilde: "\u223C", TildeEqual: "\u2243", TildeFullEqual: "\u2245", TildeTilde: "\u2248", Topf: "\u{1D54B}", TripleDot: "\u20DB", Tscr: "\u{1D4AF}", Tstrok: "\u0166", Uacute: "\xDA", Uarr: "\u219F", Uarrocir: "\u2949", Ubrcy: "\u040E", Ubreve: "\u016C", Ucirc: "\xDB", Ucy: "\u0423", Udblac: "\u0170", Ufr: "\u{1D518}", Ugrave: "\xD9", Umacr: "\u016A", UnderBar: "_", UnderBrace: "\u23DF", UnderBracket: "\u23B5", UnderParenthesis: "\u23DD", Union: "\u22C3", UnionPlus: "\u228E", Uogon: "\u0172", Uopf: "\u{1D54C}", UpArrow: "\u2191", UpArrowBar: "\u2912", UpArrowDownArrow: "\u21C5", UpDownArrow: "\u2195", UpEquilibrium: "\u296E", UpTee: "\u22A5", UpTeeArrow: "\u21A5", Uparrow: "\u21D1", Updownarrow: "\u21D5", UpperLeftArrow: "\u2196", UpperRightArrow: "\u2197", Upsi: "\u03D2", Upsilon: "\u03A5", Uring: "\u016E", Uscr: "\u{1D4B0}", Utilde: "\u0168", Uuml: "\xDC", VDash: "\u22AB", Vbar: "\u2AEB", Vcy: "\u0412", Vdash: "\u22A9", Vdashl: "\u2AE6", Vee: "\u22C1", Verbar: "\u2016", Vert: "\u2016", VerticalBar: "\u2223", VerticalLine: "|", VerticalSeparator: "\u2758", VerticalTilde: "\u2240", VeryThinSpace: "\u200A", Vfr: "\u{1D519}", Vopf: "\u{1D54D}", Vscr: "\u{1D4B1}", Vvdash: "\u22AA", Wcirc: "\u0174", Wedge: "\u22C0", Wfr: "\u{1D51A}", Wopf: "\u{1D54E}", Wscr: "\u{1D4B2}", Xfr: "\u{1D51B}", Xi: "\u039E", Xopf: "\u{1D54F}", Xscr: "\u{1D4B3}", YAcy: "\u042F", YIcy: "\u0407", YUcy: "\u042E", Yacute: "\xDD", Ycirc: "\u0176", Ycy: "\u042B", Yfr: "\u{1D51C}", Yopf: "\u{1D550}", Yscr: "\u{1D4B4}", Yuml: "\u0178", ZHcy: "\u0416", Zacute: "\u0179", Zcaron: "\u017D", Zcy: "\u0417", Zdot: "\u017B", ZeroWidthSpace: "\u200B", Zeta: "\u0396", Zfr: "\u2128", Zopf: "\u2124", Zscr: "\u{1D4B5}", aacute: "\xE1", abreve: "\u0103", ac: "\u223E", acE: "\u223E\u0333", acd: "\u223F", acirc: "\xE2", acute: "\xB4", acy: "\u0430", aelig: "\xE6", af: "\u2061", afr: "\u{1D51E}", agrave: "\xE0", alefsym: "\u2135", aleph: "\u2135", alpha: "\u03B1", amacr: "\u0101", amalg: "\u2A3F", amp: "&", and: "\u2227", andand: "\u2A55", andd: "\u2A5C", andslope: "\u2A58", andv: "\u2A5A", ang: "\u2220", ange: "\u29A4", angle: "\u2220", angmsd: "\u2221", angmsdaa: "\u29A8", angmsdab: "\u29A9", angmsdac: "\u29AA", angmsdad: "\u29AB", angmsdae: "\u29AC", angmsdaf: "\u29AD", angmsdag: "\u29AE", angmsdah: "\u29AF", angrt: "\u221F", angrtvb: "\u22BE", angrtvbd: "\u299D", angsph: "\u2222", angst: "\xC5", angzarr: "\u237C", aogon: "\u0105", aopf: "\u{1D552}", ap: "\u2248", apE: "\u2A70", apacir: "\u2A6F", ape: "\u224A", apid: "\u224B", apos: "'", approx: "\u2248", approxeq: "\u224A", aring: "\xE5", ascr: "\u{1D4B6}", ast: "*", asymp: "\u2248", asympeq: "\u224D", atilde: "\xE3", auml: "\xE4", awconint: "\u2233", awint: "\u2A11", bNot: "\u2AED", backcong: "\u224C", backepsilon: "\u03F6", backprime: "\u2035", backsim: "\u223D", backsimeq: "\u22CD", barvee: "\u22BD", barwed: "\u2305", barwedge: "\u2305", bbrk: "\u23B5", bbrktbrk: "\u23B6", bcong: "\u224C", bcy: "\u0431", bdquo: "\u201E", becaus: "\u2235", because: "\u2235", bemptyv: "\u29B0", bepsi: "\u03F6", bernou: "\u212C", beta: "\u03B2", beth: "\u2136", between: "\u226C", bfr: "\u{1D51F}", bigcap: "\u22C2", bigcirc: "\u25EF", bigcup: "\u22C3", bigodot: "\u2A00", bigoplus: "\u2A01", bigotimes: "\u2A02", bigsqcup: "\u2A06", bigstar: "\u2605", bigtriangledown: "\u25BD", bigtriangleup: "\u25B3", biguplus: "\u2A04", bigvee: "\u22C1", bigwedge: "\u22C0", bkarow: "\u290D", blacklozenge: "\u29EB", blacksquare: "\u25AA", blacktriangle: "\u25B4", blacktriangledown: "\u25BE", blacktriangleleft: "\u25C2", blacktriangleright: "\u25B8", blank: "\u2423", blk12: "\u2592", blk14: "\u2591", blk34: "\u2593", block: "\u2588", bne: "=\u20E5", bnequiv: "\u2261\u20E5", bnot: "\u2310", bopf: "\u{1D553}", bot: "\u22A5", bottom: "\u22A5", bowtie: "\u22C8", boxDL: "\u2557", boxDR: "\u2554", boxDl: "\u2556", boxDr: "\u2553", boxH: "\u2550", boxHD: "\u2566", boxHU: "\u2569", boxHd: "\u2564", boxHu: "\u2567", boxUL: "\u255D", boxUR: "\u255A", boxUl: "\u255C", boxUr: "\u2559", boxV: "\u2551", boxVH: "\u256C", boxVL: "\u2563", boxVR: "\u2560", boxVh: "\u256B", boxVl: "\u2562", boxVr: "\u255F", boxbox: "\u29C9", boxdL: "\u2555", boxdR: "\u2552", boxdl: "\u2510", boxdr: "\u250C", boxh: "\u2500", boxhD: "\u2565", boxhU: "\u2568", boxhd: "\u252C", boxhu: "\u2534", boxminus: "\u229F", boxplus: "\u229E", boxtimes: "\u22A0", boxuL: "\u255B", boxuR: "\u2558", boxul: "\u2518", boxur: "\u2514", boxv: "\u2502", boxvH: "\u256A", boxvL: "\u2561", boxvR: "\u255E", boxvh: "\u253C", boxvl: "\u2524", boxvr: "\u251C", bprime: "\u2035", breve: "\u02D8", brvbar: "\xA6", bscr: "\u{1D4B7}", bsemi: "\u204F", bsim: "\u223D", bsime: "\u22CD", bsol: "\\", bsolb: "\u29C5", bsolhsub: "\u27C8", bull: "\u2022", bullet: "\u2022", bump: "\u224E", bumpE: "\u2AAE", bumpe: "\u224F", bumpeq: "\u224F", cacute: "\u0107", cap: "\u2229", capand: "\u2A44", capbrcup: "\u2A49", capcap: "\u2A4B", capcup: "\u2A47", capdot: "\u2A40", caps: "\u2229\uFE00", caret: "\u2041", caron: "\u02C7", ccaps: "\u2A4D", ccaron: "\u010D", ccedil: "\xE7", ccirc: "\u0109", ccups: "\u2A4C", ccupssm: "\u2A50", cdot: "\u010B", cedil: "\xB8", cemptyv: "\u29B2", cent: "\xA2", centerdot: "\xB7", cfr: "\u{1D520}", chcy: "\u0447", check: "\u2713", checkmark: "\u2713", chi: "\u03C7", cir: "\u25CB", cirE: "\u29C3", circ: "\u02C6", circeq: "\u2257", circlearrowleft: "\u21BA", circlearrowright: "\u21BB", circledR: "\xAE", circledS: "\u24C8", circledast: "\u229B", circledcirc: "\u229A", circleddash: "\u229D", cire: "\u2257", cirfnint: "\u2A10", cirmid: "\u2AEF", cirscir: "\u29C2", clubs: "\u2663", clubsuit: "\u2663", colon: ":", colone: "\u2254", coloneq: "\u2254", comma: ",", commat: "@", comp: "\u2201", compfn: "\u2218", complement: "\u2201", complexes: "\u2102", cong: "\u2245", congdot: "\u2A6D", conint: "\u222E", copf: "\u{1D554}", coprod: "\u2210", copy: "\xA9", copysr: "\u2117", crarr: "\u21B5", cross: "\u2717", cscr: "\u{1D4B8}", csub: "\u2ACF", csube: "\u2AD1", csup: "\u2AD0", csupe: "\u2AD2", ctdot: "\u22EF", cudarrl: "\u2938", cudarrr: "\u2935", cuepr: "\u22DE", cuesc: "\u22DF", cularr: "\u21B6", cularrp: "\u293D", cup: "\u222A", cupbrcap: "\u2A48", cupcap: "\u2A46", cupcup: "\u2A4A", cupdot: "\u228D", cupor: "\u2A45", cups: "\u222A\uFE00", curarr: "\u21B7", curarrm: "\u293C", curlyeqprec: "\u22DE", curlyeqsucc: "\u22DF", curlyvee: "\u22CE", curlywedge: "\u22CF", curren: "\xA4", curvearrowleft: "\u21B6", curvearrowright: "\u21B7", cuvee: "\u22CE", cuwed: "\u22CF", cwconint: "\u2232", cwint: "\u2231", cylcty: "\u232D", dArr: "\u21D3", dHar: "\u2965", dagger: "\u2020", daleth: "\u2138", darr: "\u2193", dash: "\u2010", dashv: "\u22A3", dbkarow: "\u290F", dblac: "\u02DD", dcaron: "\u010F", dcy: "\u0434", dd: "\u2146", ddagger: "\u2021", ddarr: "\u21CA", ddotseq: "\u2A77", deg: "\xB0", delta: "\u03B4", demptyv: "\u29B1", dfisht: "\u297F", dfr: "\u{1D521}", dharl: "\u21C3", dharr: "\u21C2", diam: "\u22C4", diamond: "\u22C4", diamondsuit: "\u2666", diams: "\u2666", die: "\xA8", digamma: "\u03DD", disin: "\u22F2", div: "\xF7", divide: "\xF7", divideontimes: "\u22C7", divonx: "\u22C7", djcy: "\u0452", dlcorn: "\u231E", dlcrop: "\u230D", dollar: "$", dopf: "\u{1D555}", dot: "\u02D9", doteq: "\u2250", doteqdot: "\u2251", dotminus: "\u2238", dotplus: "\u2214", dotsquare: "\u22A1", doublebarwedge: "\u2306", downarrow: "\u2193", downdownarrows: "\u21CA", downharpoonleft: "\u21C3", downharpoonright: "\u21C2", drbkarow: "\u2910", drcorn: "\u231F", drcrop: "\u230C", dscr: "\u{1D4B9}", dscy: "\u0455", dsol: "\u29F6", dstrok: "\u0111", dtdot: "\u22F1", dtri: "\u25BF", dtrif: "\u25BE", duarr: "\u21F5", duhar: "\u296F", dwangle: "\u29A6", dzcy: "\u045F", dzigrarr: "\u27FF", eDDot: "\u2A77", eDot: "\u2251", eacute: "\xE9", easter: "\u2A6E", ecaron: "\u011B", ecir: "\u2256", ecirc: "\xEA", ecolon: "\u2255", ecy: "\u044D", edot: "\u0117", ee: "\u2147", efDot: "\u2252", efr: "\u{1D522}", eg: "\u2A9A", egrave: "\xE8", egs: "\u2A96", egsdot: "\u2A98", el: "\u2A99", elinters: "\u23E7", ell: "\u2113", els: "\u2A95", elsdot: "\u2A97", emacr: "\u0113", empty: "\u2205", emptyset: "\u2205", emptyv: "\u2205", emsp13: "\u2004", emsp14: "\u2005", emsp: "\u2003", eng: "\u014B", ensp: "\u2002", eogon: "\u0119", eopf: "\u{1D556}", epar: "\u22D5", eparsl: "\u29E3", eplus: "\u2A71", epsi: "\u03B5", epsilon: "\u03B5", epsiv: "\u03F5", eqcirc: "\u2256", eqcolon: "\u2255", eqsim: "\u2242", eqslantgtr: "\u2A96", eqslantless: "\u2A95", equals: "=", equest: "\u225F", equiv: "\u2261", equivDD: "\u2A78", eqvparsl: "\u29E5", erDot: "\u2253", erarr: "\u2971", escr: "\u212F", esdot: "\u2250", esim: "\u2242", eta: "\u03B7", eth: "\xF0", euml: "\xEB", euro: "\u20AC", excl: "!", exist: "\u2203", expectation: "\u2130", exponentiale: "\u2147", fallingdotseq: "\u2252", fcy: "\u0444", female: "\u2640", ffilig: "\uFB03", fflig: "\uFB00", ffllig: "\uFB04", ffr: "\u{1D523}", filig: "\uFB01", fjlig: "fj", flat: "\u266D", fllig: "\uFB02", fltns: "\u25B1", fnof: "\u0192", fopf: "\u{1D557}", forall: "\u2200", fork: "\u22D4", forkv: "\u2AD9", fpartint: "\u2A0D", frac12: "\xBD", frac13: "\u2153", frac14: "\xBC", frac15: "\u2155", frac16: "\u2159", frac18: "\u215B", frac23: "\u2154", frac25: "\u2156", frac34: "\xBE", frac35: "\u2157", frac38: "\u215C", frac45: "\u2158", frac56: "\u215A", frac58: "\u215D", frac78: "\u215E", frasl: "\u2044", frown: "\u2322", fscr: "\u{1D4BB}", gE: "\u2267", gEl: "\u2A8C", gacute: "\u01F5", gamma: "\u03B3", gammad: "\u03DD", gap: "\u2A86", gbreve: "\u011F", gcirc: "\u011D", gcy: "\u0433", gdot: "\u0121", ge: "\u2265", gel: "\u22DB", geq: "\u2265", geqq: "\u2267", geqslant: "\u2A7E", ges: "\u2A7E", gescc: "\u2AA9", gesdot: "\u2A80", gesdoto: "\u2A82", gesdotol: "\u2A84", gesl: "\u22DB\uFE00", gesles: "\u2A94", gfr: "\u{1D524}", gg: "\u226B", ggg: "\u22D9", gimel: "\u2137", gjcy: "\u0453", gl: "\u2277", glE: "\u2A92", gla: "\u2AA5", glj: "\u2AA4", gnE: "\u2269", gnap: "\u2A8A", gnapprox: "\u2A8A", gne: "\u2A88", gneq: "\u2A88", gneqq: "\u2269", gnsim: "\u22E7", gopf: "\u{1D558}", grave: "`", gscr: "\u210A", gsim: "\u2273", gsime: "\u2A8E", gsiml: "\u2A90", gt: ">", gtcc: "\u2AA7", gtcir: "\u2A7A", gtdot: "\u22D7", gtlPar: "\u2995", gtquest: "\u2A7C", gtrapprox: "\u2A86", gtrarr: "\u2978", gtrdot: "\u22D7", gtreqless: "\u22DB", gtreqqless: "\u2A8C", gtrless: "\u2277", gtrsim: "\u2273", gvertneqq: "\u2269\uFE00", gvnE: "\u2269\uFE00", hArr: "\u21D4", hairsp: "\u200A", half: "\xBD", hamilt: "\u210B", hardcy: "\u044A", harr: "\u2194", harrcir: "\u2948", harrw: "\u21AD", hbar: "\u210F", hcirc: "\u0125", hearts: "\u2665", heartsuit: "\u2665", hellip: "\u2026", hercon: "\u22B9", hfr: "\u{1D525}", hksearow: "\u2925", hkswarow: "\u2926", hoarr: "\u21FF", homtht: "\u223B", hookleftarrow: "\u21A9", hookrightarrow: "\u21AA", hopf: "\u{1D559}", horbar: "\u2015", hscr: "\u{1D4BD}", hslash: "\u210F", hstrok: "\u0127", hybull: "\u2043", hyphen: "\u2010", iacute: "\xED", ic: "\u2063", icirc: "\xEE", icy: "\u0438", iecy: "\u0435", iexcl: "\xA1", iff: "\u21D4", ifr: "\u{1D526}", igrave: "\xEC", ii: "\u2148", iiiint: "\u2A0C", iiint: "\u222D", iinfin: "\u29DC", iiota: "\u2129", ijlig: "\u0133", imacr: "\u012B", image: "\u2111", imagline: "\u2110", imagpart: "\u2111", imath: "\u0131", imof: "\u22B7", imped: "\u01B5", in: "\u2208", incare: "\u2105", infin: "\u221E", infintie: "\u29DD", inodot: "\u0131", int: "\u222B", intcal: "\u22BA", integers: "\u2124", intercal: "\u22BA", intlarhk: "\u2A17", intprod: "\u2A3C", iocy: "\u0451", iogon: "\u012F", iopf: "\u{1D55A}", iota: "\u03B9", iprod: "\u2A3C", iquest: "\xBF", iscr: "\u{1D4BE}", isin: "\u2208", isinE: "\u22F9", isindot: "\u22F5", isins: "\u22F4", isinsv: "\u22F3", isinv: "\u2208", it: "\u2062", itilde: "\u0129", iukcy: "\u0456", iuml: "\xEF", jcirc: "\u0135", jcy: "\u0439", jfr: "\u{1D527}", jmath: "\u0237", jopf: "\u{1D55B}", jscr: "\u{1D4BF}", jsercy: "\u0458", jukcy: "\u0454", kappa: "\u03BA", kappav: "\u03F0", kcedil: "\u0137", kcy: "\u043A", kfr: "\u{1D528}", kgreen: "\u0138", khcy: "\u0445", kjcy: "\u045C", kopf: "\u{1D55C}", kscr: "\u{1D4C0}", lAarr: "\u21DA", lArr: "\u21D0", lAtail: "\u291B", lBarr: "\u290E", lE: "\u2266", lEg: "\u2A8B", lHar: "\u2962", lacute: "\u013A", laemptyv: "\u29B4", lagran: "\u2112", lambda: "\u03BB", lang: "\u27E8", langd: "\u2991", langle: "\u27E8", lap: "\u2A85", laquo: "\xAB", larr: "\u2190", larrb: "\u21E4", larrbfs: "\u291F", larrfs: "\u291D", larrhk: "\u21A9", larrlp: "\u21AB", larrpl: "\u2939", larrsim: "\u2973", larrtl: "\u21A2", lat: "\u2AAB", latail: "\u2919", late: "\u2AAD", lates: "\u2AAD\uFE00", lbarr: "\u290C", lbbrk: "\u2772", lbrace: "{", lbrack: "[", lbrke: "\u298B", lbrksld: "\u298F", lbrkslu: "\u298D", lcaron: "\u013E", lcedil: "\u013C", lceil: "\u2308", lcub: "{", lcy: "\u043B", ldca: "\u2936", ldquo: "\u201C", ldquor: "\u201E", ldrdhar: "\u2967", ldrushar: "\u294B", ldsh: "\u21B2", le: "\u2264", leftarrow: "\u2190", leftarrowtail: "\u21A2", leftharpoondown: "\u21BD", leftharpoonup: "\u21BC", leftleftarrows: "\u21C7", leftrightarrow: "\u2194", leftrightarrows: "\u21C6", leftrightharpoons: "\u21CB", leftrightsquigarrow: "\u21AD", leftthreetimes: "\u22CB", leg: "\u22DA", leq: "\u2264", leqq: "\u2266", leqslant: "\u2A7D", les: "\u2A7D", lescc: "\u2AA8", lesdot: "\u2A7F", lesdoto: "\u2A81", lesdotor: "\u2A83", lesg: "\u22DA\uFE00", lesges: "\u2A93", lessapprox: "\u2A85", lessdot: "\u22D6", lesseqgtr: "\u22DA", lesseqqgtr: "\u2A8B", lessgtr: "\u2276", lesssim: "\u2272", lfisht: "\u297C", lfloor: "\u230A", lfr: "\u{1D529}", lg: "\u2276", lgE: "\u2A91", lhard: "\u21BD", lharu: "\u21BC", lharul: "\u296A", lhblk: "\u2584", ljcy: "\u0459", ll: "\u226A", llarr: "\u21C7", llcorner: "\u231E", llhard: "\u296B", lltri: "\u25FA", lmidot: "\u0140", lmoust: "\u23B0", lmoustache: "\u23B0", lnE: "\u2268", lnap: "\u2A89", lnapprox: "\u2A89", lne: "\u2A87", lneq: "\u2A87", lneqq: "\u2268", lnsim: "\u22E6", loang: "\u27EC", loarr: "\u21FD", lobrk: "\u27E6", longleftarrow: "\u27F5", longleftrightarrow: "\u27F7", longmapsto: "\u27FC", longrightarrow: "\u27F6", looparrowleft: "\u21AB", looparrowright: "\u21AC", lopar: "\u2985", lopf: "\u{1D55D}", loplus: "\u2A2D", lotimes: "\u2A34", lowast: "\u2217", lowbar: "_", loz: "\u25CA", lozenge: "\u25CA", lozf: "\u29EB", lpar: "(", lparlt: "\u2993", lrarr: "\u21C6", lrcorner: "\u231F", lrhar: "\u21CB", lrhard: "\u296D", lrm: "\u200E", lrtri: "\u22BF", lsaquo: "\u2039", lscr: "\u{1D4C1}", lsh: "\u21B0", lsim: "\u2272", lsime: "\u2A8D", lsimg: "\u2A8F", lsqb: "[", lsquo: "\u2018", lsquor: "\u201A", lstrok: "\u0142", lt: "<", ltcc: "\u2AA6", ltcir: "\u2A79", ltdot: "\u22D6", lthree: "\u22CB", ltimes: "\u22C9", ltlarr: "\u2976", ltquest: "\u2A7B", ltrPar: "\u2996", ltri: "\u25C3", ltrie: "\u22B4", ltrif: "\u25C2", lurdshar: "\u294A", luruhar: "\u2966", lvertneqq: "\u2268\uFE00", lvnE: "\u2268\uFE00", mDDot: "\u223A", macr: "\xAF", male: "\u2642", malt: "\u2720", maltese: "\u2720", map: "\u21A6", mapsto: "\u21A6", mapstodown: "\u21A7", mapstoleft: "\u21A4", mapstoup: "\u21A5", marker: "\u25AE", mcomma: "\u2A29", mcy: "\u043C", mdash: "\u2014", measuredangle: "\u2221", mfr: "\u{1D52A}", mho: "\u2127", micro: "\xB5", mid: "\u2223", midast: "*", midcir: "\u2AF0", middot: "\xB7", minus: "\u2212", minusb: "\u229F", minusd: "\u2238", minusdu: "\u2A2A", mlcp: "\u2ADB", mldr: "\u2026", mnplus: "\u2213", models: "\u22A7", mopf: "\u{1D55E}", mp: "\u2213", mscr: "\u{1D4C2}", mstpos: "\u223E", mu: "\u03BC", multimap: "\u22B8", mumap: "\u22B8", nGg: "\u22D9\u0338", nGt: "\u226B\u20D2", nGtv: "\u226B\u0338", nLeftarrow: "\u21CD", nLeftrightarrow: "\u21CE", nLl: "\u22D8\u0338", nLt: "\u226A\u20D2", nLtv: "\u226A\u0338", nRightarrow: "\u21CF", nVDash: "\u22AF", nVdash: "\u22AE", nabla: "\u2207", nacute: "\u0144", nang: "\u2220\u20D2", nap: "\u2249", napE: "\u2A70\u0338", napid: "\u224B\u0338", napos: "\u0149", napprox: "\u2249", natur: "\u266E", natural: "\u266E", naturals: "\u2115", nbsp: "\xA0", nbump: "\u224E\u0338", nbumpe: "\u224F\u0338", ncap: "\u2A43", ncaron: "\u0148", ncedil: "\u0146", ncong: "\u2247", ncongdot: "\u2A6D\u0338", ncup: "\u2A42", ncy: "\u043D", ndash: "\u2013", ne: "\u2260", neArr: "\u21D7", nearhk: "\u2924", nearr: "\u2197", nearrow: "\u2197", nedot: "\u2250\u0338", nequiv: "\u2262", nesear: "\u2928", nesim: "\u2242\u0338", nexist: "\u2204", nexists: "\u2204", nfr: "\u{1D52B}", ngE: "\u2267\u0338", nge: "\u2271", ngeq: "\u2271", ngeqq: "\u2267\u0338", ngeqslant: "\u2A7E\u0338", nges: "\u2A7E\u0338", ngsim: "\u2275", ngt: "\u226F", ngtr: "\u226F", nhArr: "\u21CE", nharr: "\u21AE", nhpar: "\u2AF2", ni: "\u220B", nis: "\u22FC", nisd: "\u22FA", niv: "\u220B", njcy: "\u045A", nlArr: "\u21CD", nlE: "\u2266\u0338", nlarr: "\u219A", nldr: "\u2025", nle: "\u2270", nleftarrow: "\u219A", nleftrightarrow: "\u21AE", nleq: "\u2270", nleqq: "\u2266\u0338", nleqslant: "\u2A7D\u0338", nles: "\u2A7D\u0338", nless: "\u226E", nlsim: "\u2274", nlt: "\u226E", nltri: "\u22EA", nltrie: "\u22EC", nmid: "\u2224", nopf: "\u{1D55F}", not: "\xAC", notin: "\u2209", notinE: "\u22F9\u0338", notindot: "\u22F5\u0338", notinva: "\u2209", notinvb: "\u22F7", notinvc: "\u22F6", notni: "\u220C", notniva: "\u220C", notnivb: "\u22FE", notnivc: "\u22FD", npar: "\u2226", nparallel: "\u2226", nparsl: "\u2AFD\u20E5", npart: "\u2202\u0338", npolint: "\u2A14", npr: "\u2280", nprcue: "\u22E0", npre: "\u2AAF\u0338", nprec: "\u2280", npreceq: "\u2AAF\u0338", nrArr: "\u21CF", nrarr: "\u219B", nrarrc: "\u2933\u0338", nrarrw: "\u219D\u0338", nrightarrow: "\u219B", nrtri: "\u22EB", nrtrie: "\u22ED", nsc: "\u2281", nsccue: "\u22E1", nsce: "\u2AB0\u0338", nscr: "\u{1D4C3}", nshortmid: "\u2224", nshortparallel: "\u2226", nsim: "\u2241", nsime: "\u2244", nsimeq: "\u2244", nsmid: "\u2224", nspar: "\u2226", nsqsube: "\u22E2", nsqsupe: "\u22E3", nsub: "\u2284", nsubE: "\u2AC5\u0338", nsube: "\u2288", nsubset: "\u2282\u20D2", nsubseteq: "\u2288", nsubseteqq: "\u2AC5\u0338", nsucc: "\u2281", nsucceq: "\u2AB0\u0338", nsup: "\u2285", nsupE: "\u2AC6\u0338", nsupe: "\u2289", nsupset: "\u2283\u20D2", nsupseteq: "\u2289", nsupseteqq: "\u2AC6\u0338", ntgl: "\u2279", ntilde: "\xF1", ntlg: "\u2278", ntriangleleft: "\u22EA", ntrianglelefteq: "\u22EC", ntriangleright: "\u22EB", ntrianglerighteq: "\u22ED", nu: "\u03BD", num: "#", numero: "\u2116", numsp: "\u2007", nvDash: "\u22AD", nvHarr: "\u2904", nvap: "\u224D\u20D2", nvdash: "\u22AC", nvge: "\u2265\u20D2", nvgt: ">\u20D2", nvinfin: "\u29DE", nvlArr: "\u2902", nvle: "\u2264\u20D2", nvlt: "<\u20D2", nvltrie: "\u22B4\u20D2", nvrArr: "\u2903", nvrtrie: "\u22B5\u20D2", nvsim: "\u223C\u20D2", nwArr: "\u21D6", nwarhk: "\u2923", nwarr: "\u2196", nwarrow: "\u2196", nwnear: "\u2927", oS: "\u24C8", oacute: "\xF3", oast: "\u229B", ocir: "\u229A", ocirc: "\xF4", ocy: "\u043E", odash: "\u229D", odblac: "\u0151", odiv: "\u2A38", odot: "\u2299", odsold: "\u29BC", oelig: "\u0153", ofcir: "\u29BF", ofr: "\u{1D52C}", ogon: "\u02DB", ograve: "\xF2", ogt: "\u29C1", ohbar: "\u29B5", ohm: "\u03A9", oint: "\u222E", olarr: "\u21BA", olcir: "\u29BE", olcross: "\u29BB", oline: "\u203E", olt: "\u29C0", omacr: "\u014D", omega: "\u03C9", omicron: "\u03BF", omid: "\u29B6", ominus: "\u2296", oopf: "\u{1D560}", opar: "\u29B7", operp: "\u29B9", oplus: "\u2295", or: "\u2228", orarr: "\u21BB", ord: "\u2A5D", order: "\u2134", orderof: "\u2134", ordf: "\xAA", ordm: "\xBA", origof: "\u22B6", oror: "\u2A56", orslope: "\u2A57", orv: "\u2A5B", oscr: "\u2134", oslash: "\xF8", osol: "\u2298", otilde: "\xF5", otimes: "\u2297", otimesas: "\u2A36", ouml: "\xF6", ovbar: "\u233D", par: "\u2225", para: "\xB6", parallel: "\u2225", parsim: "\u2AF3", parsl: "\u2AFD", part: "\u2202", pcy: "\u043F", percnt: "%", period: ".", permil: "\u2030", perp: "\u22A5", pertenk: "\u2031", pfr: "\u{1D52D}", phi: "\u03C6", phiv: "\u03D5", phmmat: "\u2133", phone: "\u260E", pi: "\u03C0", pitchfork: "\u22D4", piv: "\u03D6", planck: "\u210F", planckh: "\u210E", plankv: "\u210F", plus: "+", plusacir: "\u2A23", plusb: "\u229E", pluscir: "\u2A22", plusdo: "\u2214", plusdu: "\u2A25", pluse: "\u2A72", plusmn: "\xB1", plussim: "\u2A26", plustwo: "\u2A27", pm: "\xB1", pointint: "\u2A15", popf: "\u{1D561}", pound: "\xA3", pr: "\u227A", prE: "\u2AB3", prap: "\u2AB7", prcue: "\u227C", pre: "\u2AAF", prec: "\u227A", precapprox: "\u2AB7", preccurlyeq: "\u227C", preceq: "\u2AAF", precnapprox: "\u2AB9", precneqq: "\u2AB5", precnsim: "\u22E8", precsim: "\u227E", prime: "\u2032", primes: "\u2119", prnE: "\u2AB5", prnap: "\u2AB9", prnsim: "\u22E8", prod: "\u220F", profalar: "\u232E", profline: "\u2312", profsurf: "\u2313", prop: "\u221D", propto: "\u221D", prsim: "\u227E", prurel: "\u22B0", pscr: "\u{1D4C5}", psi: "\u03C8", puncsp: "\u2008", qfr: "\u{1D52E}", qint: "\u2A0C", qopf: "\u{1D562}", qprime: "\u2057", qscr: "\u{1D4C6}", quaternions: "\u210D", quatint: "\u2A16", quest: "?", questeq: "\u225F", quot: '"', rAarr: "\u21DB", rArr: "\u21D2", rAtail: "\u291C", rBarr: "\u290F", rHar: "\u2964", race: "\u223D\u0331", racute: "\u0155", radic: "\u221A", raemptyv: "\u29B3", rang: "\u27E9", rangd: "\u2992", range: "\u29A5", rangle: "\u27E9", raquo: "\xBB", rarr: "\u2192", rarrap: "\u2975", rarrb: "\u21E5", rarrbfs: "\u2920", rarrc: "\u2933", rarrfs: "\u291E", rarrhk: "\u21AA", rarrlp: "\u21AC", rarrpl: "\u2945", rarrsim: "\u2974", rarrtl: "\u21A3", rarrw: "\u219D", ratail: "\u291A", ratio: "\u2236", rationals: "\u211A", rbarr: "\u290D", rbbrk: "\u2773", rbrace: "}", rbrack: "]", rbrke: "\u298C", rbrksld: "\u298E", rbrkslu: "\u2990", rcaron: "\u0159", rcedil: "\u0157", rceil: "\u2309", rcub: "}", rcy: "\u0440", rdca: "\u2937", rdldhar: "\u2969", rdquo: "\u201D", rdquor: "\u201D", rdsh: "\u21B3", real: "\u211C", realine: "\u211B", realpart: "\u211C", reals: "\u211D", rect: "\u25AD", reg: "\xAE", rfisht: "\u297D", rfloor: "\u230B", rfr: "\u{1D52F}", rhard: "\u21C1", rharu: "\u21C0", rharul: "\u296C", rho: "\u03C1", rhov: "\u03F1", rightarrow: "\u2192", rightarrowtail: "\u21A3", rightharpoondown: "\u21C1", rightharpoonup: "\u21C0", rightleftarrows: "\u21C4", rightleftharpoons: "\u21CC", rightrightarrows: "\u21C9", rightsquigarrow: "\u219D", rightthreetimes: "\u22CC", ring: "\u02DA", risingdotseq: "\u2253", rlarr: "\u21C4", rlhar: "\u21CC", rlm: "\u200F", rmoust: "\u23B1", rmoustache: "\u23B1", rnmid: "\u2AEE", roang: "\u27ED", roarr: "\u21FE", robrk: "\u27E7", ropar: "\u2986", ropf: "\u{1D563}", roplus: "\u2A2E", rotimes: "\u2A35", rpar: ")", rpargt: "\u2994", rppolint: "\u2A12", rrarr: "\u21C9", rsaquo: "\u203A", rscr: "\u{1D4C7}", rsh: "\u21B1", rsqb: "]", rsquo: "\u2019", rsquor: "\u2019", rthree: "\u22CC", rtimes: "\u22CA", rtri: "\u25B9", rtrie: "\u22B5", rtrif: "\u25B8", rtriltri: "\u29CE", ruluhar: "\u2968", rx: "\u211E", sacute: "\u015B", sbquo: "\u201A", sc: "\u227B", scE: "\u2AB4", scap: "\u2AB8", scaron: "\u0161", sccue: "\u227D", sce: "\u2AB0", scedil: "\u015F", scirc: "\u015D", scnE: "\u2AB6", scnap: "\u2ABA", scnsim: "\u22E9", scpolint: "\u2A13", scsim: "\u227F", scy: "\u0441", sdot: "\u22C5", sdotb: "\u22A1", sdote: "\u2A66", seArr: "\u21D8", searhk: "\u2925", searr: "\u2198", searrow: "\u2198", sect: "\xA7", semi: ";", seswar: "\u2929", setminus: "\u2216", setmn: "\u2216", sext: "\u2736", sfr: "\u{1D530}", sfrown: "\u2322", sharp: "\u266F", shchcy: "\u0449", shcy: "\u0448", shortmid: "\u2223", shortparallel: "\u2225", shy: "\xAD", sigma: "\u03C3", sigmaf: "\u03C2", sigmav: "\u03C2", sim: "\u223C", simdot: "\u2A6A", sime: "\u2243", simeq: "\u2243", simg: "\u2A9E", simgE: "\u2AA0", siml: "\u2A9D", simlE: "\u2A9F", simne: "\u2246", simplus: "\u2A24", simrarr: "\u2972", slarr: "\u2190", smallsetminus: "\u2216", smashp: "\u2A33", smeparsl: "\u29E4", smid: "\u2223", smile: "\u2323", smt: "\u2AAA", smte: "\u2AAC", smtes: "\u2AAC\uFE00", softcy: "\u044C", sol: "/", solb: "\u29C4", solbar: "\u233F", sopf: "\u{1D564}", spades: "\u2660", spadesuit: "\u2660", spar: "\u2225", sqcap: "\u2293", sqcaps: "\u2293\uFE00", sqcup: "\u2294", sqcups: "\u2294\uFE00", sqsub: "\u228F", sqsube: "\u2291", sqsubset: "\u228F", sqsubseteq: "\u2291", sqsup: "\u2290", sqsupe: "\u2292", sqsupset: "\u2290", sqsupseteq: "\u2292", squ: "\u25A1", square: "\u25A1", squarf: "\u25AA", squf: "\u25AA", srarr: "\u2192", sscr: "\u{1D4C8}", ssetmn: "\u2216", ssmile: "\u2323", sstarf: "\u22C6", star: "\u2606", starf: "\u2605", straightepsilon: "\u03F5", straightphi: "\u03D5", strns: "\xAF", sub: "\u2282", subE: "\u2AC5", subdot: "\u2ABD", sube: "\u2286", subedot: "\u2AC3", submult: "\u2AC1", subnE: "\u2ACB", subne: "\u228A", subplus: "\u2ABF", subrarr: "\u2979", subset: "\u2282", subseteq: "\u2286", subseteqq: "\u2AC5", subsetneq: "\u228A", subsetneqq: "\u2ACB", subsim: "\u2AC7", subsub: "\u2AD5", subsup: "\u2AD3", succ: "\u227B", succapprox: "\u2AB8", succcurlyeq: "\u227D", succeq: "\u2AB0", succnapprox: "\u2ABA", succneqq: "\u2AB6", succnsim: "\u22E9", succsim: "\u227F", sum: "\u2211", sung: "\u266A", sup1: "\xB9", sup2: "\xB2", sup3: "\xB3", sup: "\u2283", supE: "\u2AC6", supdot: "\u2ABE", supdsub: "\u2AD8", supe: "\u2287", supedot: "\u2AC4", suphsol: "\u27C9", suphsub: "\u2AD7", suplarr: "\u297B", supmult: "\u2AC2", supnE: "\u2ACC", supne: "\u228B", supplus: "\u2AC0", supset: "\u2283", supseteq: "\u2287", supseteqq: "\u2AC6", supsetneq: "\u228B", supsetneqq: "\u2ACC", supsim: "\u2AC8", supsub: "\u2AD4", supsup: "\u2AD6", swArr: "\u21D9", swarhk: "\u2926", swarr: "\u2199", swarrow: "\u2199", swnwar: "\u292A", szlig: "\xDF", target: "\u2316", tau: "\u03C4", tbrk: "\u23B4", tcaron: "\u0165", tcedil: "\u0163", tcy: "\u0442", tdot: "\u20DB", telrec: "\u2315", tfr: "\u{1D531}", there4: "\u2234", therefore: "\u2234", theta: "\u03B8", thetasym: "\u03D1", thetav: "\u03D1", thickapprox: "\u2248", thicksim: "\u223C", thinsp: "\u2009", thkap: "\u2248", thksim: "\u223C", thorn: "\xFE", tilde: "\u02DC", times: "\xD7", timesb: "\u22A0", timesbar: "\u2A31", timesd: "\u2A30", tint: "\u222D", toea: "\u2928", top: "\u22A4", topbot: "\u2336", topcir: "\u2AF1", topf: "\u{1D565}", topfork: "\u2ADA", tosa: "\u2929", tprime: "\u2034", trade: "\u2122", triangle: "\u25B5", triangledown: "\u25BF", triangleleft: "\u25C3", trianglelefteq: "\u22B4", triangleq: "\u225C", triangleright: "\u25B9", trianglerighteq: "\u22B5", tridot: "\u25EC", trie: "\u225C", triminus: "\u2A3A", triplus: "\u2A39", trisb: "\u29CD", tritime: "\u2A3B", trpezium: "\u23E2", tscr: "\u{1D4C9}", tscy: "\u0446", tshcy: "\u045B", tstrok: "\u0167", twixt: "\u226C", twoheadleftarrow: "\u219E", twoheadrightarrow: "\u21A0", uArr: "\u21D1", uHar: "\u2963", uacute: "\xFA", uarr: "\u2191", ubrcy: "\u045E", ubreve: "\u016D", ucirc: "\xFB", ucy: "\u0443", udarr: "\u21C5", udblac: "\u0171", udhar: "\u296E", ufisht: "\u297E", ufr: "\u{1D532}", ugrave: "\xF9", uharl: "\u21BF", uharr: "\u21BE", uhblk: "\u2580", ulcorn: "\u231C", ulcorner: "\u231C", ulcrop: "\u230F", ultri: "\u25F8", umacr: "\u016B", uml: "\xA8", uogon: "\u0173", uopf: "\u{1D566}", uparrow: "\u2191", updownarrow: "\u2195", upharpoonleft: "\u21BF", upharpoonright: "\u21BE", uplus: "\u228E", upsi: "\u03C5", upsih: "\u03D2", upsilon: "\u03C5", upuparrows: "\u21C8", urcorn: "\u231D", urcorner: "\u231D", urcrop: "\u230E", uring: "\u016F", urtri: "\u25F9", uscr: "\u{1D4CA}", utdot: "\u22F0", utilde: "\u0169", utri: "\u25B5", utrif: "\u25B4", uuarr: "\u21C8", uuml: "\xFC", uwangle: "\u29A7", vArr: "\u21D5", vBar: "\u2AE8", vBarv: "\u2AE9", vDash: "\u22A8", vangrt: "\u299C", varepsilon: "\u03F5", varkappa: "\u03F0", varnothing: "\u2205", varphi: "\u03D5", varpi: "\u03D6", varpropto: "\u221D", varr: "\u2195", varrho: "\u03F1", varsigma: "\u03C2", varsubsetneq: "\u228A\uFE00", varsubsetneqq: "\u2ACB\uFE00", varsupsetneq: "\u228B\uFE00", varsupsetneqq: "\u2ACC\uFE00", vartheta: "\u03D1", vartriangleleft: "\u22B2", vartriangleright: "\u22B3", vcy: "\u0432", vdash: "\u22A2", vee: "\u2228", veebar: "\u22BB", veeeq: "\u225A", vellip: "\u22EE", verbar: "|", vert: "|", vfr: "\u{1D533}", vltri: "\u22B2", vnsub: "\u2282\u20D2", vnsup: "\u2283\u20D2", vopf: "\u{1D567}", vprop: "\u221D", vrtri: "\u22B3", vscr: "\u{1D4CB}", vsubnE: "\u2ACB\uFE00", vsubne: "\u228A\uFE00", vsupnE: "\u2ACC\uFE00", vsupne: "\u228B\uFE00", vzigzag: "\u299A", wcirc: "\u0175", wedbar: "\u2A5F", wedge: "\u2227", wedgeq: "\u2259", weierp: "\u2118", wfr: "\u{1D534}", wopf: "\u{1D568}", wp: "\u2118", wr: "\u2240", wreath: "\u2240", wscr: "\u{1D4CC}", xcap: "\u22C2", xcirc: "\u25EF", xcup: "\u22C3", xdtri: "\u25BD", xfr: "\u{1D535}", xhArr: "\u27FA", xharr: "\u27F7", xi: "\u03BE", xlArr: "\u27F8", xlarr: "\u27F5", xmap: "\u27FC", xnis: "\u22FB", xodot: "\u2A00", xopf: "\u{1D569}", xoplus: "\u2A01", xotime: "\u2A02", xrArr: "\u27F9", xrarr: "\u27F6", xscr: "\u{1D4CD}", xsqcup: "\u2A06", xuplus: "\u2A04", xutri: "\u25B3", xvee: "\u22C1", xwedge: "\u22C0", yacute: "\xFD", yacy: "\u044F", ycirc: "\u0177", ycy: "\u044B", yen: "\xA5", yfr: "\u{1D536}", yicy: "\u0457", yopf: "\u{1D56A}", yscr: "\u{1D4CE}", yucy: "\u044E", yuml: "\xFF", zacute: "\u017A", zcaron: "\u017E", zcy: "\u0437", zdot: "\u017C", zeetrf: "\u2128", zeta: "\u03B6", zfr: "\u{1D537}", zhcy: "\u0436", zigrarr: "\u21DD", zopf: "\u{1D56B}", zscr: "\u{1D4CF}", zwj: "\u200D", zwnj: "\u200C" }, ut = {}.hasOwnProperty, at = { name: "characterReference", tokenize: function(e2, t2, n2) {
        const r2 = this;
        let o2, c2, l2 = 0;
        return function(t3) {
          return e2.enter("characterReference"), e2.enter("characterReferenceMarker"), e2.consume(t3), e2.exit("characterReferenceMarker"), s2;
        };
        function s2(t3) {
          return 35 === t3 ? (e2.enter("characterReferenceMarkerNumeric"), e2.consume(t3), e2.exit("characterReferenceMarkerNumeric"), f2) : (e2.enter("characterReferenceValue"), o2 = 31, c2 = i, p2(t3));
        }
        function f2(t3) {
          return 88 === t3 || 120 === t3 ? (e2.enter("characterReferenceMarkerHexadecimal"), e2.consume(t3), e2.exit("characterReferenceMarkerHexadecimal"), e2.enter("characterReferenceValue"), o2 = 6, c2 = a, p2) : (e2.enter("characterReferenceValue"), o2 = 7, c2 = u, p2(t3));
        }
        function p2(u2) {
          if (59 === u2 && l2) {
            const o3 = e2.exit("characterReferenceValue");
            return c2 !== i || function(e3) {
              return !!ut.call(ct, e3) && ct[e3];
            }(r2.sliceSerialize(o3)) ? (e2.enter("characterReferenceMarker"), e2.consume(u2), e2.exit("characterReferenceMarker"), e2.exit("characterReference"), t2) : n2(u2);
          }
          return c2(u2) && l2++ < o2 ? (e2.consume(u2), p2) : n2(u2);
        }
      } }, lt = { name: "characterEscape", tokenize: function(e2, t2, n2) {
        return function(t3) {
          return e2.enter("characterEscape"), e2.enter("escapeMarker"), e2.consume(t3), e2.exit("escapeMarker"), r2;
        };
        function r2(r3) {
          return l(r3) ? (e2.enter("characterEscapeValue"), e2.consume(r3), e2.exit("characterEscapeValue"), e2.exit("characterEscape"), t2) : n2(r3);
        }
      } }, st = { name: "lineEnding", tokenize: function(e2, t2) {
        return function(n2) {
          return e2.enter("lineEnding"), e2.consume(n2), e2.exit("lineEnding"), h(e2, t2, "linePrefix");
        };
      } }, ft = { name: "labelEnd", tokenize: function(e2, t2, n2) {
        const r2 = this;
        let i2, o2, c2 = r2.events.length;
        for (; c2--; )
          if (("labelImage" === r2.events[c2][1].type || "labelLink" === r2.events[c2][1].type) && !r2.events[c2][1]._balanced) {
            i2 = r2.events[c2][1];
            break;
          }
        return function(t3) {
          return i2 ? i2._inactive ? s2(t3) : (o2 = r2.parser.defined.includes(J(r2.sliceSerialize({ start: i2.end, end: r2.now() }))), e2.enter("labelEnd"), e2.enter("labelMarker"), e2.consume(t3), e2.exit("labelMarker"), e2.exit("labelEnd"), u2) : n2(t3);
        };
        function u2(t3) {
          return 40 === t3 ? e2.attempt(pt, l2, o2 ? l2 : s2)(t3) : 91 === t3 ? e2.attempt(dt, l2, o2 ? a2 : s2)(t3) : o2 ? l2(t3) : s2(t3);
        }
        function a2(t3) {
          return e2.attempt(mt, l2, s2)(t3);
        }
        function l2(e3) {
          return t2(e3);
        }
        function s2(e3) {
          return i2._balanced = true, n2(e3);
        }
      }, resolveTo: function(e2, t2) {
        let n2, r2, i2, o2, c2 = e2.length, u2 = 0;
        for (; c2--; )
          if (n2 = e2[c2][1], r2) {
            if ("link" === n2.type || "labelLink" === n2.type && n2._inactive)
              break;
            "enter" === e2[c2][0] && "labelLink" === n2.type && (n2._inactive = true);
          } else if (i2) {
            if ("enter" === e2[c2][0] && ("labelImage" === n2.type || "labelLink" === n2.type) && !n2._balanced && (r2 = c2, "labelLink" !== n2.type)) {
              u2 = 2;
              break;
            }
          } else
            "labelEnd" === n2.type && (i2 = c2);
        const a2 = { type: "labelLink" === e2[r2][1].type ? "link" : "image", start: Object.assign({}, e2[r2][1].start), end: Object.assign({}, e2[e2.length - 1][1].end) }, l2 = { type: "label", start: Object.assign({}, e2[r2][1].start), end: Object.assign({}, e2[i2][1].end) }, s2 = { type: "labelText", start: Object.assign({}, e2[r2 + u2 + 2][1].end), end: Object.assign({}, e2[i2 - 2][1].start) };
        return o2 = [["enter", a2, t2], ["enter", l2, t2]], o2 = ve(o2, e2.slice(r2 + 1, r2 + u2 + 3)), o2 = ve(o2, [["enter", s2, t2]]), o2 = ve(o2, Pe(t2.parser.constructs.insideSpan.null, e2.slice(r2 + u2 + 4, i2 - 3), t2)), o2 = ve(o2, [["exit", s2, t2], e2[i2 - 2], e2[i2 - 1], ["exit", l2, t2]]), o2 = ve(o2, e2.slice(i2 + 1)), o2 = ve(o2, [["exit", a2, t2]]), xe(e2, r2, e2.length, o2), e2;
      }, resolveAll: function(e2) {
        let t2 = -1;
        for (; ++t2 < e2.length; ) {
          const n2 = e2[t2][1];
          "labelImage" !== n2.type && "labelLink" !== n2.type && "labelEnd" !== n2.type || (e2.splice(t2 + 1, "labelImage" === n2.type ? 4 : 2), n2.type = "data", t2++);
        }
        return e2;
      } }, pt = { tokenize: function(e2, t2, n2) {
        return function(t3) {
          return e2.enter("resource"), e2.enter("resourceMarker"), e2.consume(t3), e2.exit("resourceMarker"), r2;
        };
        function r2(t3) {
          return f(t3) ? b(e2, i2)(t3) : i2(t3);
        }
        function i2(t3) {
          return 41 === t3 ? l2(t3) : Ue(e2, o2, c2, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(t3);
        }
        function o2(t3) {
          return f(t3) ? b(e2, u2)(t3) : l2(t3);
        }
        function c2(e3) {
          return n2(e3);
        }
        function u2(t3) {
          return 34 === t3 || 39 === t3 || 40 === t3 ? Qe(e2, a2, n2, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(t3) : l2(t3);
        }
        function a2(t3) {
          return f(t3) ? b(e2, l2)(t3) : l2(t3);
        }
        function l2(r3) {
          return 41 === r3 ? (e2.enter("resourceMarker"), e2.consume(r3), e2.exit("resourceMarker"), e2.exit("resource"), t2) : n2(r3);
        }
      } }, dt = { tokenize: function(e2, t2, n2) {
        const r2 = this;
        return function(t3) {
          return Ge.call(r2, e2, i2, o2, "reference", "referenceMarker", "referenceString")(t3);
        };
        function i2(e3) {
          return r2.parser.defined.includes(J(r2.sliceSerialize(r2.events[r2.events.length - 1][1]).slice(1, -1))) ? t2(e3) : n2(e3);
        }
        function o2(e3) {
          return n2(e3);
        }
      } }, mt = { tokenize: function(e2, t2, n2) {
        return function(t3) {
          return e2.enter("reference"), e2.enter("referenceMarker"), e2.consume(t3), e2.exit("referenceMarker"), r2;
        };
        function r2(r3) {
          return 93 === r3 ? (e2.enter("referenceMarker"), e2.consume(r3), e2.exit("referenceMarker"), e2.exit("reference"), t2) : n2(r3);
        }
      } }, gt = { name: "labelStartImage", tokenize: function(e2, t2, n2) {
        const r2 = this;
        return function(t3) {
          return e2.enter("labelImage"), e2.enter("labelImageMarker"), e2.consume(t3), e2.exit("labelImageMarker"), i2;
        };
        function i2(t3) {
          return 91 === t3 ? (e2.enter("labelMarker"), e2.consume(t3), e2.exit("labelMarker"), e2.exit("labelImage"), o2) : n2(t3);
        }
        function o2(e3) {
          return 94 === e3 && "_hiddenFootnoteSupport" in r2.parser.constructs ? n2(e3) : t2(e3);
        }
      }, resolveAll: ft.resolveAll };
      function ht(e2) {
        return null === e2 || f(e2) || m(e2) ? 1 : d(e2) ? 2 : void 0;
      }
      const bt = { name: "attention", tokenize: function(e2, t2) {
        const n2 = this.parser.constructs.attentionMarkers.null, r2 = this.previous, i2 = ht(r2);
        let o2;
        return function(t3) {
          return o2 = t3, e2.enter("attentionSequence"), c2(t3);
        };
        function c2(u2) {
          if (u2 === o2)
            return e2.consume(u2), c2;
          const a2 = e2.exit("attentionSequence"), l2 = ht(u2), s2 = !l2 || 2 === l2 && i2 || n2.includes(u2), f2 = !i2 || 2 === i2 && l2 || n2.includes(r2);
          return a2._open = Boolean(42 === o2 ? s2 : s2 && (i2 || !f2)), a2._close = Boolean(42 === o2 ? f2 : f2 && (l2 || !s2)), t2(u2);
        }
      }, resolveAll: function(e2, t2) {
        let n2, r2, i2, o2, c2, u2, a2, l2, s2 = -1;
        for (; ++s2 < e2.length; )
          if ("enter" === e2[s2][0] && "attentionSequence" === e2[s2][1].type && e2[s2][1]._close) {
            for (n2 = s2; n2--; )
              if ("exit" === e2[n2][0] && "attentionSequence" === e2[n2][1].type && e2[n2][1]._open && t2.sliceSerialize(e2[n2][1]).charCodeAt(0) === t2.sliceSerialize(e2[s2][1]).charCodeAt(0)) {
                if ((e2[n2][1]._close || e2[s2][1]._open) && (e2[s2][1].end.offset - e2[s2][1].start.offset) % 3 && !((e2[n2][1].end.offset - e2[n2][1].start.offset + e2[s2][1].end.offset - e2[s2][1].start.offset) % 3))
                  continue;
                u2 = e2[n2][1].end.offset - e2[n2][1].start.offset > 1 && e2[s2][1].end.offset - e2[s2][1].start.offset > 1 ? 2 : 1;
                const f2 = Object.assign({}, e2[n2][1].end), p2 = Object.assign({}, e2[s2][1].start);
                xt(f2, -u2), xt(p2, u2), o2 = { type: u2 > 1 ? "strongSequence" : "emphasisSequence", start: f2, end: Object.assign({}, e2[n2][1].end) }, c2 = { type: u2 > 1 ? "strongSequence" : "emphasisSequence", start: Object.assign({}, e2[s2][1].start), end: p2 }, i2 = { type: u2 > 1 ? "strongText" : "emphasisText", start: Object.assign({}, e2[n2][1].end), end: Object.assign({}, e2[s2][1].start) }, r2 = { type: u2 > 1 ? "strong" : "emphasis", start: Object.assign({}, o2.start), end: Object.assign({}, c2.end) }, e2[n2][1].end = Object.assign({}, o2.start), e2[s2][1].start = Object.assign({}, c2.end), a2 = [], e2[n2][1].end.offset - e2[n2][1].start.offset && (a2 = ve(a2, [["enter", e2[n2][1], t2], ["exit", e2[n2][1], t2]])), a2 = ve(a2, [["enter", r2, t2], ["enter", o2, t2], ["exit", o2, t2], ["enter", i2, t2]]), a2 = ve(a2, Pe(t2.parser.constructs.insideSpan.null, e2.slice(n2 + 1, s2), t2)), a2 = ve(a2, [["exit", i2, t2], ["enter", c2, t2], ["exit", c2, t2], ["exit", r2, t2]]), e2[s2][1].end.offset - e2[s2][1].start.offset ? (l2 = 2, a2 = ve(a2, [["enter", e2[s2][1], t2], ["exit", e2[s2][1], t2]])) : l2 = 0, xe(e2, n2 - 1, s2 - n2 + 3, a2), s2 = n2 + a2.length - l2 - 2;
                break;
              }
          }
        for (s2 = -1; ++s2 < e2.length; )
          "attentionSequence" === e2[s2][1].type && (e2[s2][1].type = "data");
        return e2;
      } };
      function xt(e2, t2) {
        e2.column += t2, e2.offset += t2, e2._bufferIndex += t2;
      }
      const vt = { name: "autolink", tokenize: function(e2, t2, n2) {
        let u2 = 0;
        return function(t3) {
          return e2.enter("autolink"), e2.enter("autolinkMarker"), e2.consume(t3), e2.exit("autolinkMarker"), e2.enter("autolinkProtocol"), a2;
        };
        function a2(t3) {
          return r(t3) ? (e2.consume(t3), l2) : p2(t3);
        }
        function l2(e3) {
          return 43 === e3 || 45 === e3 || 46 === e3 || i(e3) ? (u2 = 1, s2(e3)) : p2(e3);
        }
        function s2(t3) {
          return 58 === t3 ? (e2.consume(t3), u2 = 0, f2) : (43 === t3 || 45 === t3 || 46 === t3 || i(t3)) && u2++ < 32 ? (e2.consume(t3), s2) : (u2 = 0, p2(t3));
        }
        function f2(r2) {
          return 62 === r2 ? (e2.exit("autolinkProtocol"), e2.enter("autolinkMarker"), e2.consume(r2), e2.exit("autolinkMarker"), e2.exit("autolink"), t2) : null === r2 || 32 === r2 || 60 === r2 || c(r2) ? n2(r2) : (e2.consume(r2), f2);
        }
        function p2(t3) {
          return 64 === t3 ? (e2.consume(t3), d2) : o(t3) ? (e2.consume(t3), p2) : n2(t3);
        }
        function d2(e3) {
          return i(e3) ? m2(e3) : n2(e3);
        }
        function m2(n3) {
          return 46 === n3 ? (e2.consume(n3), u2 = 0, d2) : 62 === n3 ? (e2.exit("autolinkProtocol").type = "autolinkEmail", e2.enter("autolinkMarker"), e2.consume(n3), e2.exit("autolinkMarker"), e2.exit("autolink"), t2) : g2(n3);
        }
        function g2(t3) {
          if ((45 === t3 || i(t3)) && u2++ < 63) {
            const n3 = 45 === t3 ? g2 : m2;
            return e2.consume(t3), n3;
          }
          return n2(t3);
        }
      } }, kt = { name: "htmlText", tokenize: function(e2, t2, n2) {
        const o2 = this;
        let c2, u2, a2;
        return function(t3) {
          return e2.enter("htmlText"), e2.enter("htmlTextData"), e2.consume(t3), l2;
        };
        function l2(t3) {
          return 33 === t3 ? (e2.consume(t3), d2) : 47 === t3 ? (e2.consume(t3), T2) : 63 === t3 ? (e2.consume(t3), S2) : r(t3) ? (e2.consume(t3), A2) : n2(t3);
        }
        function d2(t3) {
          return 45 === t3 ? (e2.consume(t3), m2) : 91 === t3 ? (e2.consume(t3), u2 = 0, v2) : r(t3) ? (e2.consume(t3), q2) : n2(t3);
        }
        function m2(t3) {
          return 45 === t3 ? (e2.consume(t3), x2) : n2(t3);
        }
        function g2(t3) {
          return null === t3 ? n2(t3) : 45 === t3 ? (e2.consume(t3), b2) : s(t3) ? (a2 = g2, N2(t3)) : (e2.consume(t3), g2);
        }
        function b2(t3) {
          return 45 === t3 ? (e2.consume(t3), x2) : g2(t3);
        }
        function x2(e3) {
          return 62 === e3 ? P2(e3) : 45 === e3 ? b2(e3) : g2(e3);
        }
        function v2(t3) {
          return t3 === "CDATA[".charCodeAt(u2++) ? (e2.consume(t3), 6 === u2 ? k2 : v2) : n2(t3);
        }
        function k2(t3) {
          return null === t3 ? n2(t3) : 93 === t3 ? (e2.consume(t3), y2) : s(t3) ? (a2 = k2, N2(t3)) : (e2.consume(t3), k2);
        }
        function y2(t3) {
          return 93 === t3 ? (e2.consume(t3), w2) : k2(t3);
        }
        function w2(t3) {
          return 62 === t3 ? P2(t3) : 93 === t3 ? (e2.consume(t3), w2) : k2(t3);
        }
        function q2(t3) {
          return null === t3 || 62 === t3 ? P2(t3) : s(t3) ? (a2 = q2, N2(t3)) : (e2.consume(t3), q2);
        }
        function S2(t3) {
          return null === t3 ? n2(t3) : 63 === t3 ? (e2.consume(t3), L2) : s(t3) ? (a2 = S2, N2(t3)) : (e2.consume(t3), S2);
        }
        function L2(e3) {
          return 62 === e3 ? P2(e3) : S2(e3);
        }
        function T2(t3) {
          return r(t3) ? (e2.consume(t3), D2) : n2(t3);
        }
        function D2(t3) {
          return 45 === t3 || i(t3) ? (e2.consume(t3), D2) : E2(t3);
        }
        function E2(t3) {
          return s(t3) ? (a2 = E2, N2(t3)) : p(t3) ? (e2.consume(t3), E2) : P2(t3);
        }
        function A2(t3) {
          return 45 === t3 || i(t3) ? (e2.consume(t3), A2) : 47 === t3 || 62 === t3 || f(t3) ? C2(t3) : n2(t3);
        }
        function C2(t3) {
          return 47 === t3 ? (e2.consume(t3), P2) : 58 === t3 || 95 === t3 || r(t3) ? (e2.consume(t3), F2) : s(t3) ? (a2 = C2, N2(t3)) : p(t3) ? (e2.consume(t3), C2) : P2(t3);
        }
        function F2(t3) {
          return 45 === t3 || 46 === t3 || 58 === t3 || 95 === t3 || i(t3) ? (e2.consume(t3), F2) : z2(t3);
        }
        function z2(t3) {
          return 61 === t3 ? (e2.consume(t3), I2) : s(t3) ? (a2 = z2, N2(t3)) : p(t3) ? (e2.consume(t3), z2) : C2(t3);
        }
        function I2(t3) {
          return null === t3 || 60 === t3 || 61 === t3 || 62 === t3 || 96 === t3 ? n2(t3) : 34 === t3 || 39 === t3 ? (e2.consume(t3), c2 = t3, M2) : s(t3) ? (a2 = I2, N2(t3)) : p(t3) ? (e2.consume(t3), I2) : (e2.consume(t3), R2);
        }
        function M2(t3) {
          return t3 === c2 ? (e2.consume(t3), c2 = void 0, O2) : null === t3 ? n2(t3) : s(t3) ? (a2 = M2, N2(t3)) : (e2.consume(t3), M2);
        }
        function R2(t3) {
          return null === t3 || 34 === t3 || 39 === t3 || 60 === t3 || 61 === t3 || 96 === t3 ? n2(t3) : 47 === t3 || 62 === t3 || f(t3) ? C2(t3) : (e2.consume(t3), R2);
        }
        function O2(e3) {
          return 47 === e3 || 62 === e3 || f(e3) ? C2(e3) : n2(e3);
        }
        function P2(r2) {
          return 62 === r2 ? (e2.consume(r2), e2.exit("htmlTextData"), e2.exit("htmlText"), t2) : n2(r2);
        }
        function N2(t3) {
          return e2.exit("htmlTextData"), e2.enter("lineEnding"), e2.consume(t3), e2.exit("lineEnding"), V2;
        }
        function V2(t3) {
          return p(t3) ? h(e2, _2, "linePrefix", o2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t3) : _2(t3);
        }
        function _2(t3) {
          return e2.enter("htmlTextData"), a2(t3);
        }
      } }, yt = { name: "labelStartLink", tokenize: function(e2, t2, n2) {
        const r2 = this;
        return function(t3) {
          return e2.enter("labelLink"), e2.enter("labelMarker"), e2.consume(t3), e2.exit("labelMarker"), e2.exit("labelLink"), i2;
        };
        function i2(e3) {
          return 94 === e3 && "_hiddenFootnoteSupport" in r2.parser.constructs ? n2(e3) : t2(e3);
        }
      }, resolveAll: ft.resolveAll }, wt = { name: "hardBreakEscape", tokenize: function(e2, t2, n2) {
        return function(t3) {
          return e2.enter("hardBreakEscape"), e2.consume(t3), r2;
        };
        function r2(r3) {
          return s(r3) ? (e2.exit("hardBreakEscape"), t2(r3)) : n2(r3);
        }
      } }, qt = { name: "codeText", tokenize: function(e2, t2, n2) {
        let r2, i2, o2 = 0;
        return function(t3) {
          return e2.enter("codeText"), e2.enter("codeTextSequence"), c2(t3);
        };
        function c2(t3) {
          return 96 === t3 ? (e2.consume(t3), o2++, c2) : (e2.exit("codeTextSequence"), u2(t3));
        }
        function u2(t3) {
          return null === t3 ? n2(t3) : 32 === t3 ? (e2.enter("space"), e2.consume(t3), e2.exit("space"), u2) : 96 === t3 ? (i2 = e2.enter("codeTextSequence"), r2 = 0, l2(t3)) : s(t3) ? (e2.enter("lineEnding"), e2.consume(t3), e2.exit("lineEnding"), u2) : (e2.enter("codeTextData"), a2(t3));
        }
        function a2(t3) {
          return null === t3 || 32 === t3 || 96 === t3 || s(t3) ? (e2.exit("codeTextData"), u2(t3)) : (e2.consume(t3), a2);
        }
        function l2(n3) {
          return 96 === n3 ? (e2.consume(n3), r2++, l2) : r2 === o2 ? (e2.exit("codeTextSequence"), e2.exit("codeText"), t2(n3)) : (i2.type = "codeTextData", a2(n3));
        }
      }, resolve: function(e2) {
        let t2, n2, r2 = e2.length - 4, i2 = 3;
        if (!("lineEnding" !== e2[i2][1].type && "space" !== e2[i2][1].type || "lineEnding" !== e2[r2][1].type && "space" !== e2[r2][1].type)) {
          for (t2 = i2; ++t2 < r2; )
            if ("codeTextData" === e2[t2][1].type) {
              e2[i2][1].type = "codeTextPadding", e2[r2][1].type = "codeTextPadding", i2 += 2, r2 -= 2;
              break;
            }
        }
        for (t2 = i2 - 1, r2++; ++t2 <= r2; )
          void 0 === n2 ? t2 !== r2 && "lineEnding" !== e2[t2][1].type && (n2 = t2) : t2 !== r2 && "lineEnding" !== e2[t2][1].type || (e2[n2][1].type = "codeTextData", t2 !== n2 + 2 && (e2[n2][1].end = e2[t2 - 1][1].end, e2.splice(n2 + 2, t2 - n2 - 2), r2 -= t2 - n2 - 2, t2 = n2 + 2), n2 = void 0);
        return e2;
      }, previous: function(e2) {
        return 96 !== e2 || "characterEscape" === this.events[this.events.length - 1][1].type;
      } }, St = { 42: _e, 43: _e, 45: _e, 48: _e, 49: _e, 50: _e, 51: _e, 52: _e, 53: _e, 54: _e, 55: _e, 56: _e, 57: _e, 62: He }, Lt = { 91: We }, Tt = { [-2]: Je, [-1]: Je, 32: Je }, Dt = { 35: Ke, 42: Ve, 45: [Xe, Ve], 60: tt, 61: Xe, 95: Ve, 96: ot, 126: ot }, Et = { 38: at, 92: lt }, At = { [-5]: st, [-4]: st, [-3]: st, 33: gt, 38: at, 42: bt, 60: [vt, kt], 91: yt, 92: [wt, lt], 93: ft, 95: bt, 96: qt }, Ct = { null: [bt, Fe] }, Ft = { null: [42, 95] }, zt = { null: [] };
      function It(e2) {
        const t2 = { defined: [], lazy: {}, constructs: function(e3) {
          const t3 = {};
          let n2 = -1;
          for (; ++n2 < e3.length; )
            ye(t3, e3[n2]);
          return t3;
        }([n, ...(e2 || {}).extensions || []]), content: r2(qe), document: r2(Se), flow: r2(Ce), string: r2(ze), text: r2(Ie) };
        return t2;
        function r2(e3) {
          return function(n2) {
            return Ne(t2, e3, n2);
          };
        }
      }
      function Mt(e2) {
        for (; !Te(e2); )
          ;
        return e2;
      }
      const Rt = /[\0\t\n\r]/g;
      function Ot() {
        let e2, t2 = 1, n2 = "", r2 = true;
        return function(i2, o2, c2) {
          const u2 = [];
          let a2, l2, s2, f2, p2;
          for (i2 = n2 + ("string" == typeof i2 ? i2.toString() : new TextDecoder(o2 || void 0).decode(i2)), s2 = 0, n2 = "", r2 && (65279 === i2.charCodeAt(0) && s2++, r2 = void 0); s2 < i2.length; ) {
            if (Rt.lastIndex = s2, a2 = Rt.exec(i2), f2 = a2 && void 0 !== a2.index ? a2.index : i2.length, p2 = i2.charCodeAt(f2), !a2) {
              n2 = i2.slice(s2);
              break;
            }
            if (10 === p2 && s2 === f2 && e2)
              u2.push(-3), e2 = void 0;
            else
              switch (e2 && (u2.push(-5), e2 = void 0), s2 < f2 && (u2.push(i2.slice(s2, f2)), t2 += f2 - s2), p2) {
                case 0:
                  u2.push(65533), t2++;
                  break;
                case 9:
                  for (l2 = 4 * Math.ceil(t2 / 4), u2.push(-2); t2++ < l2; )
                    u2.push(-1);
                  break;
                case 10:
                  u2.push(-4), t2 = 1;
                  break;
                default:
                  e2 = true, t2 = 1;
              }
            s2 = f2 + 1;
          }
          return c2 && (e2 && u2.push(-5), n2 && u2.push(n2), u2.push(null)), u2;
        };
      }
      var Pt = exports2;
      for (var Nt in t)
        Pt[Nt] = t[Nt];
      t.__esModule && Object.defineProperty(Pt, "__esModule", { value: true });
    })();
  }
});

// node_modules/markdownlint/helpers/shared.js
var require_shared = __commonJS({
  "node_modules/markdownlint/helpers/shared.js"(exports2, module2) {
    "use strict";
    module2.exports.newLineRe = /\r\n?|\n/g;
    module2.exports.nextLinesRe = /[\r\n][\s\S]*$/;
  }
});

// node_modules/markdownlint/helpers/micromark.cjs
var require_micromark2 = __commonJS({
  "node_modules/markdownlint/helpers/micromark.cjs"(exports2, module2) {
    "use strict";
    var {
      directive,
      gfmAutolinkLiteral,
      gfmFootnote,
      gfmTable,
      math,
      parse: parse3,
      postprocess,
      preprocess
      // @ts-ignore
    } = require_micromark();
    var { newLineRe } = require_shared();
    var flatTokensSymbol = Symbol("flat-tokens");
    function isHtmlFlowComment(token) {
      const { text, type } = token;
      if (type === "htmlFlow" && text.startsWith("<!--") && text.endsWith("-->")) {
        const comment = text.slice(4, -3);
        return !comment.startsWith(">") && !comment.startsWith("->") && !comment.endsWith("-");
      }
      return false;
    }
    function getMicromarkEvents(markdown, micromarkOptions = {}, referencesDefined = true) {
      micromarkOptions.extensions = micromarkOptions.extensions || [];
      micromarkOptions.extensions.push(
        directive(),
        gfmAutolinkLiteral(),
        gfmFootnote(),
        gfmTable(),
        math()
      );
      const encoding = void 0;
      const eol = true;
      const parseContext = parse3(micromarkOptions);
      if (referencesDefined) {
        parseContext.defined.includes = (searchElement) => searchElement.length > 0;
      }
      const chunks = preprocess()(markdown, encoding, eol);
      const events = postprocess(parseContext.document().write(chunks));
      return events;
    }
    function micromarkParseWithOffset(markdown, micromarkOptions, referencesDefined, lineDelta, ancestor) {
      const events = getMicromarkEvents(
        markdown,
        micromarkOptions,
        referencesDefined
      );
      const document = [];
      let flatTokens = [];
      const root = {
        "type": "data",
        "startLine": -1,
        "startColumn": -1,
        "endLine": -1,
        "endColumn": -1,
        "text": "ROOT",
        "children": document,
        "parent": null
      };
      const history = [root];
      let current = root;
      let reparseOptions = null;
      let lines = null;
      let skipHtmlFlowChildren = false;
      for (const event of events) {
        const [kind4, token, context] = event;
        const { type, start, end } = token;
        const { "column": startColumn, "line": startLine } = start;
        const { "column": endColumn, "line": endLine } = end;
        const text = context.sliceSerialize(token);
        if (kind4 === "enter" && !skipHtmlFlowChildren) {
          const previous = current;
          history.push(previous);
          current = {
            type,
            "startLine": startLine + lineDelta,
            startColumn,
            "endLine": endLine + lineDelta,
            endColumn,
            text,
            "children": [],
            "parent": previous === root ? ancestor || null : previous
          };
          previous.children.push(current);
          flatTokens.push(current);
          if (current.type === "htmlFlow" && !isHtmlFlowComment(current)) {
            skipHtmlFlowChildren = true;
            if (!reparseOptions || !lines) {
              reparseOptions = {
                ...micromarkOptions,
                "extensions": [
                  {
                    "disable": {
                      "null": ["codeIndented", "htmlFlow"]
                    }
                  }
                ]
              };
              lines = markdown.split(newLineRe);
            }
            const reparseMarkdown = lines.slice(current.startLine - 1, current.endLine).join("\n");
            const tokens = micromarkParseWithOffset(
              reparseMarkdown,
              reparseOptions,
              referencesDefined,
              current.startLine - 1,
              current
            );
            current.children = tokens;
            flatTokens = flatTokens.concat(tokens[flatTokensSymbol]);
          }
        } else if (kind4 === "exit") {
          if (type === "htmlFlow") {
            skipHtmlFlowChildren = false;
          }
          if (!skipHtmlFlowChildren) {
            Object.freeze(current.children);
            Object.freeze(current);
            current = history.pop();
          }
        }
      }
      Object.defineProperty(document, flatTokensSymbol, { "value": flatTokens });
      Object.freeze(document);
      return document;
    }
    function micromarkParse(markdown, micromarkOptions = {}, referencesDefined = true) {
      return micromarkParseWithOffset(
        markdown,
        micromarkOptions,
        referencesDefined,
        0
      );
    }
    function filterByPredicate(tokens, allowed, transformChildren) {
      allowed = allowed || (() => true);
      const result = [];
      const queue = [
        {
          "array": tokens,
          "index": 0
        }
      ];
      while (queue.length > 0) {
        const current = queue[queue.length - 1];
        const { array, index } = current;
        if (index < array.length) {
          const token = array[current.index++];
          if (allowed(token)) {
            result.push(token);
          }
          const { children } = token;
          if (children.length > 0) {
            const transformed = transformChildren ? transformChildren(token) : children;
            queue.push(
              {
                "array": transformed,
                "index": 0
              }
            );
          }
        } else {
          queue.pop();
        }
      }
      return result;
    }
    function filterByTypes(tokens, types) {
      const predicate = (token) => types.includes(token.type);
      const flatTokens = tokens[flatTokensSymbol];
      if (flatTokens) {
        return flatTokens.filter(predicate);
      }
      return filterByPredicate(tokens, predicate);
    }
    function getHeadingLevel(heading) {
      const headingSequence = filterByTypes(
        heading.children,
        ["atxHeadingSequence", "setextHeadingLineSequence"]
      );
      let level = 1;
      const { text } = headingSequence[0];
      if (text[0] === "#") {
        level = Math.min(text.length, 6);
      } else if (text[0] === "-") {
        level = 2;
      }
      return level;
    }
    function getHtmlTagInfo(token) {
      const htmlTagNameRe = /^<([^!>][^/\s>]*)/;
      if (token.type === "htmlText") {
        const match = htmlTagNameRe.exec(token.text);
        if (match) {
          const name = match[1];
          const close = name.startsWith("/");
          return {
            close,
            "name": close ? name.slice(1) : name
          };
        }
      }
      return null;
    }
    function getTokenParentOfType(token, types) {
      let current = token;
      while ((current = current.parent) && !types.includes(current.type)) {
      }
      return current;
    }
    function getTokenTextByType(tokens, type) {
      const filtered = tokens.filter((token) => token.type === type);
      return filtered.length > 0 ? filtered[0].text : null;
    }
    function inHtmlFlow(token) {
      return getTokenParentOfType(token, ["htmlFlow"]) !== null;
    }
    function matchAndGetTokensByType(tokens, matchTypes, resultTypes) {
      if (tokens.length !== matchTypes.length) {
        return null;
      }
      resultTypes = resultTypes || matchTypes;
      const result = [];
      for (let i = 0; i < matchTypes.length; i++) {
        if (tokens[i].type !== matchTypes[i]) {
          return null;
        } else if (resultTypes.includes(matchTypes[i])) {
          result.push(tokens[i]);
        }
      }
      return result;
    }
    function tokenIfType(token, type) {
      return token && token.type === type ? token : null;
    }
    var nonContentTokens = /* @__PURE__ */ new Set([
      "blockQuoteMarker",
      "blockQuotePrefix",
      "blockQuotePrefixWhitespace",
      "lineEnding",
      "lineEndingBlank",
      "linePrefix",
      "listItemIndent"
    ]);
    module2.exports = {
      "parse": micromarkParse,
      filterByPredicate,
      filterByTypes,
      getHeadingLevel,
      getHtmlTagInfo,
      getMicromarkEvents,
      getTokenParentOfType,
      getTokenTextByType,
      inHtmlFlow,
      isHtmlFlowComment,
      matchAndGetTokensByType,
      nonContentTokens,
      tokenIfType
    };
  }
});

// node_modules/markdownlint/lib/constants.js
var require_constants = __commonJS({
  "node_modules/markdownlint/lib/constants.js"(exports2, module2) {
    "use strict";
    module2.exports.deprecatedRuleNames = [];
    module2.exports.fixableRuleNames = [
      "MD004",
      "MD005",
      "MD007",
      "MD009",
      "MD010",
      "MD011",
      "MD012",
      "MD014",
      "MD018",
      "MD019",
      "MD020",
      "MD021",
      "MD022",
      "MD023",
      "MD026",
      "MD027",
      "MD030",
      "MD031",
      "MD032",
      "MD034",
      "MD037",
      "MD038",
      "MD039",
      "MD044",
      "MD047",
      "MD049",
      "MD050",
      "MD051",
      "MD053",
      "MD054"
    ];
    module2.exports.homepage = "https://github.com/DavidAnson/markdownlint";
    module2.exports.version = "0.34.0";
  }
});

// node_modules/markdownlint/helpers/helpers.js
var require_helpers = __commonJS({
  "node_modules/markdownlint/helpers/helpers.js"(exports2, module2) {
    "use strict";
    var micromark = require_micromark2();
    var { newLineRe, nextLinesRe } = require_shared();
    module2.exports.newLineRe = newLineRe;
    module2.exports.nextLinesRe = nextLinesRe;
    module2.exports.frontMatterRe = /((^---\s*$[\s\S]+?^---\s*)|(^\+\+\+\s*$[\s\S]+?^(\+\+\+|\.\.\.)\s*)|(^\{\s*$[\s\S]+?^\}\s*))(\r\n|\r|\n|$)/m;
    var inlineCommentStartRe = /(<!--\s*markdownlint-(disable|enable|capture|restore|disable-file|enable-file|disable-line|disable-next-line|configure-file))(?:\s|-->)/gi;
    module2.exports.inlineCommentStartRe = inlineCommentStartRe;
    module2.exports.listItemMarkerRe = /^([\s>]*)(?:[*+-]|\d+[.)])\s+/;
    module2.exports.orderedListItemMarkerRe = /^[\s>]*0*(\d+)[.)]/;
    var blockquotePrefixRe = /^[>\s]*/;
    module2.exports.blockquotePrefixRe = blockquotePrefixRe;
    var linkReferenceDefinitionRe = /^ {0,3}\[([^\]]*[^\\])\]:/;
    module2.exports.linkReferenceDefinitionRe = linkReferenceDefinitionRe;
    module2.exports.endOfLineHtmlEntityRe = /&(?:#\d+|#[xX][\da-fA-F]+|[a-zA-Z]{2,31}|blk\d{2}|emsp1[34]|frac\d{2}|sup\d|there4);$/;
    module2.exports.endOfLineGemojiCodeRe = /:(?:[abmovx]|[-+]1|100|1234|(?:1st|2nd|3rd)_place_medal|8ball|clock\d{1,4}|e-mail|non-potable_water|o2|t-rex|u5272|u5408|u55b6|u6307|u6708|u6709|u6e80|u7121|u7533|u7981|u7a7a|[a-z]{2,15}2?|[a-z]{1,14}(?:_[a-z\d]{1,16})+):$/;
    var allPunctuation = ".,;:!?\u3002\uFF0C\uFF1B\uFF1A\uFF01\uFF1F";
    module2.exports.allPunctuation = allPunctuation;
    module2.exports.allPunctuationNoQuestion = allPunctuation.replace(/[?？]/gu, "");
    function isNumber(obj) {
      return typeof obj === "number";
    }
    module2.exports.isNumber = isNumber;
    function isString(obj) {
      return typeof obj === "string";
    }
    module2.exports.isString = isString;
    function isEmptyString(str) {
      return str.length === 0;
    }
    module2.exports.isEmptyString = isEmptyString;
    function isObject(obj) {
      return !!obj && typeof obj === "object" && !Array.isArray(obj);
    }
    module2.exports.isObject = isObject;
    function isUrl(obj) {
      return !!obj && Object.getPrototypeOf(obj) === URL.prototype;
    }
    module2.exports.isUrl = isUrl;
    function cloneIfArray(arr) {
      return Array.isArray(arr) ? [...arr] : arr;
    }
    module2.exports.cloneIfArray = cloneIfArray;
    function cloneIfUrl(url) {
      return isUrl(url) ? new URL(url) : url;
    }
    module2.exports.cloneIfUrl = cloneIfUrl;
    module2.exports.getHtmlAttributeRe = function getHtmlAttributeRe(name) {
      return new RegExp(`\\s${name}\\s*=\\s*['"]?([^'"\\s>]*)`, "iu");
    };
    function isBlankLine(line) {
      const startComment = "<!--";
      const endComment = "-->";
      const removeComments = (s) => {
        while (true) {
          const start = s.indexOf(startComment);
          const end = s.indexOf(endComment);
          if (end !== -1 && (start === -1 || end < start)) {
            s = s.slice(end + endComment.length);
          } else if (start !== -1 && end !== -1) {
            s = s.slice(0, start) + s.slice(end + endComment.length);
          } else if (start !== -1 && end === -1) {
            s = s.slice(0, start);
          } else {
            return s;
          }
        }
      };
      return !line || !line.trim() || !removeComments(line).replace(/>/g, "").trim();
    }
    module2.exports.isBlankLine = isBlankLine;
    module2.exports.numericSortAscending = function numericSortAscending(a, b) {
      return a - b;
    };
    module2.exports.includesSorted = function includesSorted(array, element) {
      let left = 0;
      let right = array.length - 1;
      while (left <= right) {
        const mid = left + right >> 1;
        if (array[mid] < element) {
          left = mid + 1;
        } else if (array[mid] > element) {
          right = mid - 1;
        } else {
          return true;
        }
      }
      return false;
    };
    var htmlCommentBegin = "<!--";
    var htmlCommentEnd = "-->";
    var safeCommentCharacter = ".";
    var startsWithPipeRe = /^ *\|/;
    var notCrLfRe = /[^\r\n]/g;
    var notSpaceCrLfRe = /[^ \r\n]/g;
    var trailingSpaceRe = / +[\r\n]/g;
    var replaceTrailingSpace = (s) => s.replace(notCrLfRe, safeCommentCharacter);
    module2.exports.clearHtmlCommentText = function clearHtmlCommentText(text) {
      let i = 0;
      while ((i = text.indexOf(htmlCommentBegin, i)) !== -1) {
        const j = text.indexOf(htmlCommentEnd, i + 2);
        if (j === -1) {
          break;
        }
        if (j > i + htmlCommentBegin.length) {
          const content = text.slice(i + htmlCommentBegin.length, j);
          const lastLf = text.lastIndexOf("\n", i) + 1;
          const preText = text.slice(lastLf, i);
          const isBlock = preText.trim().length === 0;
          const couldBeTable = startsWithPipeRe.test(preText);
          const spansTableCells = couldBeTable && content.includes("\n");
          const isValid = isBlock || !(spansTableCells || content.startsWith(">") || content.startsWith("->") || content.endsWith("-") || content.includes("--"));
          if (isValid) {
            const clearedContent = content.replace(notSpaceCrLfRe, safeCommentCharacter).replace(trailingSpaceRe, replaceTrailingSpace);
            text = text.slice(0, i + htmlCommentBegin.length) + clearedContent + text.slice(j);
          }
        }
        i = j + htmlCommentEnd.length;
      }
      return text;
    };
    module2.exports.escapeForRegExp = function escapeForRegExp(str) {
      return str.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    };
    module2.exports.fencedCodeBlockStyleFor = function fencedCodeBlockStyleFor(markup) {
      switch (markup[0]) {
        case "~":
          return "tilde";
        default:
          return "backtick";
      }
    };
    module2.exports.emphasisOrStrongStyleFor = function emphasisOrStrongStyleFor(markup) {
      switch (markup[0]) {
        case "*":
          return "asterisk";
        default:
          return "underscore";
      }
    };
    function indentFor(token) {
      const line = token.line.replace(/^[\s>]*(> |>)/, "");
      return line.length - line.trimStart().length;
    }
    module2.exports.indentFor = indentFor;
    module2.exports.headingStyleFor = function headingStyleFor(token) {
      if (token.map[1] - token.map[0] === 1) {
        if (/[^\\]#\s*$/.test(token.line)) {
          return "atx_closed";
        }
        return "atx";
      }
      return "setext";
    };
    module2.exports.unorderedListStyleFor = function unorderedListStyleFor(token) {
      switch (token.markup) {
        case "-":
          return "dash";
        case "+":
          return "plus";
        default:
          return "asterisk";
      }
    };
    function filterTokens(params, type, handler) {
      for (const token of params.parsers.markdownit.tokens) {
        if (token.type === type) {
          handler(token);
        }
      }
    }
    module2.exports.filterTokens = filterTokens;
    function getLineMetadata(params) {
      const lineMetadata = params.lines.map(
        (line, index) => [line, index, false, 0, false, false, false]
      );
      filterTokens(params, "fence", (token) => {
        lineMetadata[token.map[0]][3] = 1;
        lineMetadata[token.map[1] - 1][3] = -1;
        for (let i = token.map[0] + 1; i < token.map[1] - 1; i++) {
          lineMetadata[i][2] = true;
        }
      });
      filterTokens(params, "code_block", (token) => {
        for (let i = token.map[0]; i < token.map[1]; i++) {
          lineMetadata[i][2] = true;
        }
      });
      filterTokens(params, "table_open", (token) => {
        for (let i = token.map[0]; i < token.map[1]; i++) {
          lineMetadata[i][4] = true;
        }
      });
      filterTokens(params, "list_item_open", (token) => {
        let count = 1;
        for (let i = token.map[0]; i < token.map[1]; i++) {
          lineMetadata[i][5] = count;
          count++;
        }
      });
      filterTokens(params, "hr", (token) => {
        lineMetadata[token.map[0]][6] = true;
      });
      return lineMetadata;
    }
    module2.exports.getLineMetadata = getLineMetadata;
    function forEachLine(lineMetadata, handler) {
      for (const metadata of lineMetadata) {
        handler(...metadata);
      }
    }
    module2.exports.forEachLine = forEachLine;
    module2.exports.flattenLists = function flattenLists(tokens) {
      const flattenedLists = [];
      const stack = [];
      let current = null;
      let nesting = 0;
      const nestingStack = [];
      let lastWithMap = { "map": [0, 1] };
      for (const token of tokens) {
        if (token.type === "bullet_list_open" || token.type === "ordered_list_open") {
          stack.push(current);
          current = {
            "unordered": token.type === "bullet_list_open",
            "parentsUnordered": !current || current.unordered && current.parentsUnordered,
            "open": token,
            "indent": indentFor(token),
            "parentIndent": current && current.indent || 0,
            "items": [],
            "nesting": nesting,
            "lastLineIndex": -1,
            "insert": flattenedLists.length
          };
          nesting++;
        } else if (token.type === "bullet_list_close" || token.type === "ordered_list_close") {
          current.lastLineIndex = lastWithMap.map[1];
          flattenedLists.splice(current.insert, 0, current);
          delete current.insert;
          current = stack.pop();
          nesting--;
        } else if (token.type === "list_item_open") {
          current.items.push(token);
        } else if (token.type === "blockquote_open") {
          nestingStack.push(nesting);
          nesting = 0;
        } else if (token.type === "blockquote_close") {
          nesting = nestingStack.pop() || 0;
        }
        if (token.map) {
          lastWithMap = token;
        }
      }
      return flattenedLists;
    };
    module2.exports.forEachHeading = function forEachHeading(params, handler) {
      let heading = null;
      for (const token of params.parsers.markdownit.tokens) {
        if (token.type === "heading_open") {
          heading = token;
        } else if (token.type === "heading_close") {
          heading = null;
        } else if (token.type === "inline" && heading) {
          handler(heading, token.content, token);
        }
      }
    };
    function forEachInlineCodeSpan(input, handler) {
      const backtickRe = /`+/g;
      let match = null;
      const backticksLengthAndIndex = [];
      while ((match = backtickRe.exec(input)) !== null) {
        backticksLengthAndIndex.push([match[0].length, match.index]);
      }
      const newLinesIndex = [];
      while ((match = newLineRe.exec(input)) !== null) {
        newLinesIndex.push(match.index);
      }
      let lineIndex = 0;
      let lineStartIndex = 0;
      let k = 0;
      for (let i = 0; i < backticksLengthAndIndex.length - 1; i++) {
        const [startLength, startIndex] = backticksLengthAndIndex[i];
        if (startIndex === 0 || input[startIndex - 1] !== "\\") {
          for (let j = i + 1; j < backticksLengthAndIndex.length; j++) {
            const [endLength, endIndex] = backticksLengthAndIndex[j];
            if (startLength === endLength) {
              for (; k < newLinesIndex.length; k++) {
                const newLineIndex = newLinesIndex[k];
                if (startIndex < newLineIndex) {
                  break;
                }
                lineIndex++;
                lineStartIndex = newLineIndex + 1;
              }
              const columnIndex = startIndex - lineStartIndex + startLength;
              handler(
                input.slice(startIndex + startLength, endIndex),
                lineIndex,
                columnIndex,
                startLength
              );
              i = j;
              break;
            }
          }
        }
      }
    }
    module2.exports.forEachInlineCodeSpan = forEachInlineCodeSpan;
    function ellipsify(text, start, end) {
      if (text.length <= 30) {
      } else if (start && end) {
        text = text.slice(0, 15) + "..." + text.slice(-15);
      } else if (end) {
        text = "..." + text.slice(-30);
      } else {
        text = text.slice(0, 30) + "...";
      }
      return text;
    }
    module2.exports.ellipsify = ellipsify;
    function addError(onError, lineNumber, detail, context, range, fixInfo) {
      onError({
        lineNumber,
        detail,
        context,
        range,
        fixInfo
      });
    }
    module2.exports.addError = addError;
    module2.exports.addErrorDetailIf = function addErrorDetailIf(onError, lineNumber, expected, actual, detail, context, range, fixInfo) {
      if (expected !== actual) {
        addError(
          onError,
          lineNumber,
          "Expected: " + expected + "; Actual: " + actual + (detail ? "; " + detail : ""),
          context,
          range,
          fixInfo
        );
      }
    };
    module2.exports.addErrorContext = function addErrorContext(onError, lineNumber, context, left, right, range, fixInfo) {
      context = ellipsify(context, left, right);
      addError(onError, lineNumber, void 0, context, range, fixInfo);
    };
    module2.exports.codeBlockAndSpanRanges = (params, lineMetadata) => {
      const exclusions = [];
      forEachLine(lineMetadata, (line, lineIndex, inCode, onFence) => {
        if (inCode && !onFence) {
          exclusions.push([lineIndex, 0, line.length]);
        }
      });
      filterTokens(params, "inline", (token) => {
        if (token.children.some((child) => child.type === "code_inline")) {
          const tokenLines = params.lines.slice(token.map[0], token.map[1]);
          forEachInlineCodeSpan(
            tokenLines.join("\n"),
            (code, lineIndex, columnIndex) => {
              const codeLines = code.split(newLineRe);
              for (const [i, line] of codeLines.entries()) {
                exclusions.push([
                  token.lineNumber - 1 + lineIndex + i,
                  i ? 0 : columnIndex,
                  line.length
                ]);
              }
            }
          );
        }
      });
      return exclusions;
    };
    var withinAnyRange = (ranges, lineIndex, index, length) => !ranges.every((span) => lineIndex !== span[0] || index < span[1] || index + length > span[1] + span[2]);
    module2.exports.withinAnyRange = withinAnyRange;
    module2.exports.rangeFromRegExp = function rangeFromRegExp(line, regexp) {
      let range = null;
      const match = line.match(regexp);
      if (match) {
        const column = match.index + 1;
        const length = match[0].length;
        range = [column, length];
      }
      return range;
    };
    module2.exports.frontMatterHasTitle = function frontMatterHasTitle(frontMatterLines, frontMatterTitlePattern) {
      const ignoreFrontMatter = frontMatterTitlePattern !== void 0 && !frontMatterTitlePattern;
      const frontMatterTitleRe = new RegExp(
        String(frontMatterTitlePattern || '^\\s*"?title"?\\s*[:=]'),
        "i"
      );
      return !ignoreFrontMatter && frontMatterLines.some((line) => frontMatterTitleRe.test(line));
    };
    function getReferenceLinkImageData(tokens) {
      const normalizeReference = (s) => s.toLowerCase().trim().replace(/\s+/g, " ");
      const definitions = /* @__PURE__ */ new Map();
      const definitionLineIndices = [];
      const duplicateDefinitions = [];
      const references = /* @__PURE__ */ new Map();
      const shortcuts = /* @__PURE__ */ new Map();
      const filteredTokens = micromark.filterByTypes(
        tokens,
        [
          // definitionLineIndices
          "definition",
          "gfmFootnoteDefinition",
          // definitions and definitionLineIndices
          "definitionLabelString",
          "gfmFootnoteDefinitionLabelString",
          // references and shortcuts
          "gfmFootnoteCall",
          "image",
          "link"
        ]
      );
      for (const token of filteredTokens) {
        let labelPrefix = "";
        switch (token.type) {
          case "definition":
          case "gfmFootnoteDefinition":
            for (let i = token.startLine; i <= token.endLine; i++) {
              definitionLineIndices.push(i - 1);
            }
            break;
          case "gfmFootnoteDefinitionLabelString":
            labelPrefix = "^";
          case "definitionLabelString":
            {
              const reference = normalizeReference(`${labelPrefix}${token.text}`);
              if (definitions.has(reference)) {
                duplicateDefinitions.push([reference, token.startLine - 1]);
              } else {
                let destinationString = null;
                const parent = micromark.getTokenParentOfType(token, ["definition"]);
                if (parent) {
                  destinationString = micromark.getTokenTextByType(
                    micromark.filterByPredicate(parent.children),
                    "definitionDestinationString"
                  );
                }
                definitions.set(
                  reference,
                  [token.startLine - 1, destinationString]
                );
              }
            }
            break;
          case "gfmFootnoteCall":
          case "image":
          case "link":
            {
              let isShortcut = false;
              let isFullOrCollapsed = false;
              let labelText = null;
              let referenceStringText = null;
              const shortcutCandidate = micromark.matchAndGetTokensByType(token.children, ["label"]);
              if (shortcutCandidate) {
                labelText = micromark.getTokenTextByType(
                  shortcutCandidate[0].children,
                  "labelText"
                );
                isShortcut = labelText !== null;
              }
              const fullAndCollapsedCandidate = micromark.matchAndGetTokensByType(
                token.children,
                ["label", "reference"]
              );
              if (fullAndCollapsedCandidate) {
                labelText = micromark.getTokenTextByType(
                  fullAndCollapsedCandidate[0].children,
                  "labelText"
                );
                referenceStringText = micromark.getTokenTextByType(
                  fullAndCollapsedCandidate[1].children,
                  "referenceString"
                );
                isFullOrCollapsed = labelText !== null;
              }
              const footnote = micromark.matchAndGetTokensByType(
                token.children,
                [
                  "gfmFootnoteCallLabelMarker",
                  "gfmFootnoteCallMarker",
                  "gfmFootnoteCallString",
                  "gfmFootnoteCallLabelMarker"
                ],
                ["gfmFootnoteCallMarker", "gfmFootnoteCallString"]
              );
              if (footnote) {
                const callMarkerText = footnote[0].text;
                const callString = footnote[1].text;
                labelText = `${callMarkerText}${callString}`;
                isShortcut = true;
              }
              if (isShortcut || isFullOrCollapsed) {
                const referenceDatum = [
                  token.startLine - 1,
                  token.startColumn - 1,
                  token.text.length,
                  // @ts-ignore
                  labelText.length,
                  (referenceStringText || "").length
                ];
                const reference = normalizeReference(referenceStringText || labelText);
                const dictionary = isShortcut ? shortcuts : references;
                const referenceData = dictionary.get(reference) || [];
                referenceData.push(referenceDatum);
                dictionary.set(reference, referenceData);
              }
            }
            break;
        }
      }
      return {
        references,
        shortcuts,
        definitions,
        duplicateDefinitions,
        definitionLineIndices
      };
    }
    module2.exports.getReferenceLinkImageData = getReferenceLinkImageData;
    function getPreferredLineEnding(input, os) {
      let cr = 0;
      let lf = 0;
      let crlf = 0;
      const endings = input.match(newLineRe) || [];
      for (const ending of endings) {
        switch (ending) {
          case "\r":
            cr++;
            break;
          case "\n":
            lf++;
            break;
          case "\r\n":
            crlf++;
            break;
        }
      }
      let preferredLineEnding = null;
      if (!cr && !lf && !crlf) {
        preferredLineEnding = os && os.EOL || "\n";
      } else if (lf >= crlf && lf >= cr) {
        preferredLineEnding = "\n";
      } else if (crlf >= cr) {
        preferredLineEnding = "\r\n";
      } else {
        preferredLineEnding = "\r";
      }
      return preferredLineEnding;
    }
    module2.exports.getPreferredLineEnding = getPreferredLineEnding;
    function normalizeFixInfo(fixInfo, lineNumber) {
      return {
        "lineNumber": fixInfo.lineNumber || lineNumber,
        "editColumn": fixInfo.editColumn || 1,
        "deleteCount": fixInfo.deleteCount || 0,
        "insertText": fixInfo.insertText || ""
      };
    }
    function applyFix(line, fixInfo, lineEnding) {
      const { editColumn, deleteCount, insertText } = normalizeFixInfo(fixInfo);
      const editIndex = editColumn - 1;
      return deleteCount === -1 ? null : line.slice(0, editIndex) + insertText.replace(/\n/g, lineEnding || "\n") + line.slice(editIndex + deleteCount);
    }
    module2.exports.applyFix = applyFix;
    function applyFixes(input, errors2) {
      const lineEnding = getPreferredLineEnding(input, require("node:os"));
      const lines = input.split(newLineRe);
      let fixInfos = errors2.filter((error2) => error2.fixInfo).map((error2) => normalizeFixInfo(error2.fixInfo, error2.lineNumber));
      fixInfos.sort((a, b) => {
        const aDeletingLine = a.deleteCount === -1;
        const bDeletingLine = b.deleteCount === -1;
        return b.lineNumber - a.lineNumber || (aDeletingLine ? 1 : bDeletingLine ? -1 : 0) || b.editColumn - a.editColumn || b.insertText.length - a.insertText.length;
      });
      let lastFixInfo = {};
      fixInfos = fixInfos.filter((fixInfo) => {
        const unique = fixInfo.lineNumber !== lastFixInfo.lineNumber || fixInfo.editColumn !== lastFixInfo.editColumn || fixInfo.deleteCount !== lastFixInfo.deleteCount || fixInfo.insertText !== lastFixInfo.insertText;
        lastFixInfo = fixInfo;
        return unique;
      });
      lastFixInfo = {
        "lineNumber": -1
      };
      for (const fixInfo of fixInfos) {
        if (fixInfo.lineNumber === lastFixInfo.lineNumber && fixInfo.editColumn === lastFixInfo.editColumn && !fixInfo.insertText && fixInfo.deleteCount > 0 && lastFixInfo.insertText && !lastFixInfo.deleteCount) {
          fixInfo.insertText = lastFixInfo.insertText;
          lastFixInfo.lineNumber = 0;
        }
        lastFixInfo = fixInfo;
      }
      fixInfos = fixInfos.filter((fixInfo) => fixInfo.lineNumber);
      let lastLineIndex = -1;
      let lastEditIndex = -1;
      for (const fixInfo of fixInfos) {
        const { lineNumber, editColumn, deleteCount } = fixInfo;
        const lineIndex = lineNumber - 1;
        const editIndex = editColumn - 1;
        if (lineIndex !== lastLineIndex || deleteCount === -1 || editIndex + deleteCount <= lastEditIndex - (deleteCount > 0 ? 0 : 1)) {
          lines[lineIndex] = applyFix(lines[lineIndex], fixInfo, lineEnding);
        }
        lastLineIndex = lineIndex;
        lastEditIndex = editIndex;
      }
      return lines.filter((line) => line !== null).join(lineEnding);
    }
    module2.exports.applyFixes = applyFixes;
    function expandTildePath(file, os) {
      const homedir = os && os.homedir && os.homedir();
      return homedir ? file.replace(/^~($|\/|\\)/, `${homedir}$1`) : file;
    }
    module2.exports.expandTildePath = expandTildePath;
  }
});

// node_modules/markdownlint/lib/md001.js
var require_md001 = __commonJS({
  "node_modules/markdownlint/lib/md001.js"(exports2, module2) {
    "use strict";
    var { addErrorDetailIf, filterTokens } = require_helpers();
    module2.exports = {
      "names": ["MD001", "heading-increment"],
      "description": "Heading levels should only increment by one level at a time",
      "tags": ["headings"],
      "parser": "markdownit",
      "function": function MD001(params, onError) {
        let prevLevel = 0;
        filterTokens(params, "heading_open", function forToken(token) {
          const level = Number.parseInt(token.tag.slice(1), 10);
          if (prevLevel && level > prevLevel) {
            addErrorDetailIf(
              onError,
              token.lineNumber,
              "h" + (prevLevel + 1),
              "h" + level
            );
          }
          prevLevel = level;
        });
      }
    };
  }
});

// node_modules/markdownlint/lib/md003.js
var require_md003 = __commonJS({
  "node_modules/markdownlint/lib/md003.js"(exports2, module2) {
    "use strict";
    var { addErrorDetailIf, filterTokens, headingStyleFor } = require_helpers();
    module2.exports = {
      "names": ["MD003", "heading-style"],
      "description": "Heading style",
      "tags": ["headings"],
      "parser": "markdownit",
      "function": function MD003(params, onError) {
        let style = String(params.config.style || "consistent");
        filterTokens(params, "heading_open", function forToken(token) {
          const styleForToken = headingStyleFor(token);
          if (style === "consistent") {
            style = styleForToken;
          }
          if (styleForToken !== style) {
            const h12 = /h[12]/.test(token.tag);
            const setextWithAtx = style === "setext_with_atx" && (h12 && styleForToken === "setext" || !h12 && styleForToken === "atx");
            const setextWithAtxClosed = style === "setext_with_atx_closed" && (h12 && styleForToken === "setext" || !h12 && styleForToken === "atx_closed");
            if (!setextWithAtx && !setextWithAtxClosed) {
              let expected = style;
              if (style === "setext_with_atx") {
                expected = h12 ? "setext" : "atx";
              } else if (style === "setext_with_atx_closed") {
                expected = h12 ? "setext" : "atx_closed";
              }
              addErrorDetailIf(
                onError,
                token.lineNumber,
                expected,
                styleForToken
              );
            }
          }
        });
      }
    };
  }
});

// node_modules/markdownlint/lib/cache.js
var require_cache = __commonJS({
  "node_modules/markdownlint/lib/cache.js"(exports2, module2) {
    "use strict";
    var map2 = /* @__PURE__ */ new Map();
    module2.exports.set = (keyValuePairs) => {
      for (const [key, value] of Object.entries(keyValuePairs)) {
        map2.set(key, value);
      }
    };
    module2.exports.clear = () => map2.clear();
    module2.exports.codeBlockAndSpanRanges = () => map2.get("codeBlockAndSpanRanges");
    module2.exports.flattenedLists = () => map2.get("flattenedLists");
    module2.exports.lineMetadata = () => map2.get("lineMetadata");
    module2.exports.referenceLinkImageData = () => map2.get("referenceLinkImageData");
  }
});

// node_modules/markdownlint/lib/md004.js
var require_md004 = __commonJS({
  "node_modules/markdownlint/lib/md004.js"(exports2, module2) {
    "use strict";
    var { addErrorDetailIf, listItemMarkerRe, unorderedListStyleFor } = require_helpers();
    var { flattenedLists } = require_cache();
    var expectedStyleToMarker = {
      "dash": "-",
      "plus": "+",
      "asterisk": "*"
    };
    var differentItemStyle = {
      "dash": "plus",
      "plus": "asterisk",
      "asterisk": "dash"
    };
    var validStyles = Object.keys(expectedStyleToMarker);
    module2.exports = {
      "names": ["MD004", "ul-style"],
      "description": "Unordered list style",
      "tags": ["bullet", "ul"],
      "parser": "none",
      "function": function MD004(params, onError) {
        const style = String(params.config.style || "consistent");
        let expectedStyle = style;
        const nestingStyles = [];
        for (const list of flattenedLists()) {
          if (list.unordered) {
            if (expectedStyle === "consistent") {
              expectedStyle = unorderedListStyleFor(list.items[0]);
            }
            for (const item of list.items) {
              const itemStyle = unorderedListStyleFor(item);
              if (style === "sublist") {
                const nesting = list.nesting;
                if (!nestingStyles[nesting]) {
                  nestingStyles[nesting] = itemStyle === nestingStyles[nesting - 1] ? differentItemStyle[itemStyle] : itemStyle;
                }
                expectedStyle = nestingStyles[nesting];
              }
              if (!validStyles.includes(expectedStyle)) {
                expectedStyle = validStyles[0];
              }
              let range = null;
              let fixInfo = null;
              const match = item.line.match(listItemMarkerRe);
              if (match) {
                const column = match.index + 1;
                const length = match[0].length;
                range = [column, length];
                fixInfo = {
                  "editColumn": match[1].length + 1,
                  "deleteCount": 1,
                  "insertText": expectedStyleToMarker[expectedStyle]
                };
              }
              addErrorDetailIf(
                onError,
                item.lineNumber,
                expectedStyle,
                itemStyle,
                null,
                null,
                range,
                fixInfo
              );
            }
          }
        }
      }
    };
  }
});

// node_modules/markdownlint/lib/md005.js
var require_md005 = __commonJS({
  "node_modules/markdownlint/lib/md005.js"(exports2, module2) {
    "use strict";
    var { addError, addErrorDetailIf } = require_helpers();
    var { filterByTypes, inHtmlFlow } = require_micromark2();
    module2.exports = {
      "names": ["MD005", "list-indent"],
      "description": "Inconsistent indentation for list items at the same level",
      "tags": ["bullet", "ul", "indentation"],
      "parser": "micromark",
      "function": function MD005(params, onError) {
        const micromarkTokens = (
          // @ts-ignore
          params.parsers.micromark.tokens
        );
        const lists = filterByTypes(
          micromarkTokens,
          ["listOrdered", "listUnordered"]
        ).filter((list) => !inHtmlFlow(list));
        for (const list of lists) {
          const expectedIndent = list.startColumn - 1;
          let expectedEnd = 0;
          let endMatching = false;
          const listItemPrefixes = list.children.filter((token) => token.type === "listItemPrefix");
          for (const listItemPrefix of listItemPrefixes) {
            const lineNumber = listItemPrefix.startLine;
            const actualIndent = listItemPrefix.startColumn - 1;
            const range = [1, listItemPrefix.endColumn - 1];
            if (list.type === "listUnordered") {
              addErrorDetailIf(
                onError,
                lineNumber,
                expectedIndent,
                actualIndent,
                null,
                null,
                range
                // No fixInfo; MD007 handles this scenario better
              );
            } else {
              const markerLength = listItemPrefix.text.trim().length;
              const actualEnd = listItemPrefix.startColumn + markerLength - 1;
              expectedEnd = expectedEnd || actualEnd;
              if (expectedIndent !== actualIndent || endMatching) {
                if (expectedEnd === actualEnd) {
                  endMatching = true;
                } else {
                  const detail = endMatching ? `Expected: (${expectedEnd}); Actual: (${actualEnd})` : `Expected: ${expectedIndent}; Actual: ${actualIndent}`;
                  const expected = endMatching ? expectedEnd - markerLength : expectedIndent;
                  const actual = endMatching ? actualEnd - markerLength : actualIndent;
                  addError(
                    onError,
                    lineNumber,
                    detail,
                    void 0,
                    range,
                    {
                      "editColumn": Math.min(actual, expected) + 1,
                      "deleteCount": Math.max(actual - expected, 0),
                      "insertText": "".padEnd(Math.max(expected - actual, 0))
                    }
                  );
                }
              }
            }
          }
        }
      }
    };
  }
});

// node_modules/markdownlint/lib/md007.js
var require_md007 = __commonJS({
  "node_modules/markdownlint/lib/md007.js"(exports2, module2) {
    "use strict";
    var { addErrorDetailIf } = require_helpers();
    var { filterByTypes, getTokenParentOfType, inHtmlFlow } = require_micromark2();
    var unorderedListTypes = ["blockQuotePrefix", "listItemPrefix", "listUnordered"];
    var unorderedParentTypes = ["blockQuote", "listOrdered", "listUnordered"];
    module2.exports = {
      "names": ["MD007", "ul-indent"],
      "description": "Unordered list indentation",
      "tags": ["bullet", "ul", "indentation"],
      "parser": "micromark",
      "function": function MD007(params, onError) {
        const indent = Number(params.config.indent || 2);
        const startIndented = !!params.config.start_indented;
        const startIndent = Number(params.config.start_indent || indent);
        const micromarkTokens = (
          // @ts-ignore
          params.parsers.micromark.tokens
        );
        const unorderedListNesting = /* @__PURE__ */ new Map();
        let lastBlockQuotePrefix = null;
        const tokens = filterByTypes(micromarkTokens, unorderedListTypes);
        for (const token of tokens) {
          const { endColumn, parent, startColumn, startLine, type } = token;
          if (type === "blockQuotePrefix") {
            lastBlockQuotePrefix = token;
          } else if (type === "listUnordered") {
            let nesting = 0;
            let current = token;
            while (current = getTokenParentOfType(current, unorderedParentTypes)) {
              if (current.type === "listUnordered") {
                nesting++;
                continue;
              } else if (current.type === "listOrdered") {
                nesting = -1;
              }
              break;
            }
            if (nesting >= 0) {
              unorderedListNesting.set(token, nesting);
            }
          } else if (!inHtmlFlow(token)) {
            const nesting = unorderedListNesting.get(parent);
            if (nesting !== void 0) {
              const expectedIndent = (startIndented ? startIndent : 0) + nesting * indent;
              const blockQuoteAdjustment = lastBlockQuotePrefix?.endLine === startLine ? lastBlockQuotePrefix.endColumn - 1 : 0;
              const actualIndent = startColumn - 1 - blockQuoteAdjustment;
              const range = [1, endColumn - 1];
              const fixInfo = {
                "editColumn": startColumn - actualIndent,
                "deleteCount": Math.max(actualIndent - expectedIndent, 0),
                "insertText": "".padEnd(Math.max(expectedIndent - actualIndent, 0))
              };
              addErrorDetailIf(
                onError,
                startLine,
                expectedIndent,
                actualIndent,
                void 0,
                void 0,
                range,
                fixInfo
              );
            }
          }
        }
      }
    };
  }
});

// node_modules/markdownlint/lib/md009.js
var require_md009 = __commonJS({
  "node_modules/markdownlint/lib/md009.js"(exports2, module2) {
    "use strict";
    var {
      addError,
      filterTokens,
      forEachLine,
      includesSorted,
      numericSortAscending
    } = require_helpers();
    var { lineMetadata } = require_cache();
    module2.exports = {
      "names": ["MD009", "no-trailing-spaces"],
      "description": "Trailing spaces",
      "tags": ["whitespace"],
      "parser": "markdownit",
      "function": function MD009(params, onError) {
        let brSpaces = params.config.br_spaces;
        brSpaces = Number(brSpaces === void 0 ? 2 : brSpaces);
        const listItemEmptyLines = !!params.config.list_item_empty_lines;
        const strict = !!params.config.strict;
        const listItemLineNumbers = [];
        if (listItemEmptyLines) {
          filterTokens(params, "list_item_open", (token) => {
            for (let i = token.map[0]; i < token.map[1]; i++) {
              listItemLineNumbers.push(i + 1);
            }
          });
          listItemLineNumbers.sort(numericSortAscending);
        }
        const paragraphLineNumbers = [];
        const codeInlineLineNumbers = [];
        if (strict) {
          filterTokens(params, "paragraph_open", (token) => {
            for (let i = token.map[0]; i < token.map[1] - 1; i++) {
              paragraphLineNumbers.push(i + 1);
            }
          });
          const addLineNumberRange = (start, end) => {
            for (let i = start; i < end; i++) {
              codeInlineLineNumbers.push(i);
            }
          };
          filterTokens(params, "inline", (token) => {
            let start = 0;
            for (const child of token.children) {
              if (start > 0) {
                addLineNumberRange(start, child.lineNumber);
                start = 0;
              }
              if (child.type === "code_inline") {
                start = child.lineNumber;
              }
            }
            if (start > 0) {
              addLineNumberRange(start, token.map[1]);
            }
          });
        }
        const expected = brSpaces < 2 ? 0 : brSpaces;
        forEachLine(lineMetadata(), (line, lineIndex, inCode) => {
          const lineNumber = lineIndex + 1;
          const trailingSpaces = line.length - line.trimEnd().length;
          if (trailingSpaces && !inCode && !includesSorted(listItemLineNumbers, lineNumber) && (expected !== trailingSpaces || strict && (!includesSorted(paragraphLineNumbers, lineNumber) || includesSorted(codeInlineLineNumbers, lineNumber)))) {
            const column = line.length - trailingSpaces + 1;
            addError(
              onError,
              lineNumber,
              "Expected: " + (expected === 0 ? "" : "0 or ") + expected + "; Actual: " + trailingSpaces,
              void 0,
              [column, trailingSpaces],
              {
                "editColumn": column,
                "deleteCount": trailingSpaces
              }
            );
          }
        });
      }
    };
  }
});

// node_modules/markdownlint/lib/md010.js
var require_md010 = __commonJS({
  "node_modules/markdownlint/lib/md010.js"(exports2, module2) {
    "use strict";
    var { addError, filterTokens, forEachLine, withinAnyRange } = require_helpers();
    var { codeBlockAndSpanRanges, lineMetadata } = require_cache();
    var tabRe = /\t+/g;
    module2.exports = {
      "names": ["MD010", "no-hard-tabs"],
      "description": "Hard tabs",
      "tags": ["whitespace", "hard_tab"],
      "parser": "markdownit",
      "function": function MD010(params, onError) {
        const codeBlocks = params.config.code_blocks;
        const includeCode = codeBlocks === void 0 ? true : !!codeBlocks;
        const ignoreCodeLanguages = new Set(
          (params.config.ignore_code_languages || []).map((language) => language.toLowerCase())
        );
        const spacesPerTab = params.config.spaces_per_tab;
        const spaceMultiplier = spacesPerTab === void 0 ? 1 : Math.max(0, Number(spacesPerTab));
        const exclusions = includeCode ? [] : codeBlockAndSpanRanges();
        filterTokens(params, "fence", (token) => {
          const language = token.info.trim().toLowerCase();
          if (ignoreCodeLanguages.has(language)) {
            for (let i = token.map[0] + 1; i < token.map[1] - 1; i++) {
              exclusions.push([i, 0, params.lines[i].length]);
            }
          }
        });
        forEachLine(lineMetadata(), (line, lineIndex, inCode) => {
          if (includeCode || !inCode) {
            let match = null;
            while ((match = tabRe.exec(line)) !== null) {
              const { index } = match;
              const column = index + 1;
              const length = match[0].length;
              if (!withinAnyRange(exclusions, lineIndex, index, length)) {
                addError(
                  onError,
                  lineIndex + 1,
                  "Column: " + column,
                  void 0,
                  [column, length],
                  {
                    "editColumn": column,
                    "deleteCount": length,
                    "insertText": "".padEnd(length * spaceMultiplier)
                  }
                );
              }
            }
          }
        });
      }
    };
  }
});

// node_modules/markdownlint/lib/md011.js
var require_md011 = __commonJS({
  "node_modules/markdownlint/lib/md011.js"(exports2, module2) {
    "use strict";
    var { addError, forEachLine, withinAnyRange } = require_helpers();
    var { codeBlockAndSpanRanges, lineMetadata } = require_cache();
    var reversedLinkRe = /(^|[^\\])\(([^()]+)\)\[([^\]^][^\]]*)\](?!\()/g;
    module2.exports = {
      "names": ["MD011", "no-reversed-links"],
      "description": "Reversed link syntax",
      "tags": ["links"],
      "parser": "none",
      "function": function MD011(params, onError) {
        const exclusions = codeBlockAndSpanRanges();
        forEachLine(lineMetadata(), (line, lineIndex, inCode, onFence) => {
          if (!inCode && !onFence) {
            let match = null;
            while ((match = reversedLinkRe.exec(line)) !== null) {
              const [reversedLink, preChar, linkText, linkDestination] = match;
              const index = match.index + preChar.length;
              const length = match[0].length - preChar.length;
              if (!linkText.endsWith("\\") && !linkDestination.endsWith("\\") && !withinAnyRange(exclusions, lineIndex, index, length)) {
                addError(
                  onError,
                  lineIndex + 1,
                  reversedLink.slice(preChar.length),
                  void 0,
                  [index + 1, length],
                  {
                    "editColumn": index + 1,
                    "deleteCount": length,
                    "insertText": `[${linkText}](${linkDestination})`
                  }
                );
              }
            }
          }
        });
      }
    };
  }
});

// node_modules/markdownlint/lib/md012.js
var require_md012 = __commonJS({
  "node_modules/markdownlint/lib/md012.js"(exports2, module2) {
    "use strict";
    var { addErrorDetailIf, forEachLine } = require_helpers();
    var { lineMetadata } = require_cache();
    module2.exports = {
      "names": ["MD012", "no-multiple-blanks"],
      "description": "Multiple consecutive blank lines",
      "tags": ["whitespace", "blank_lines"],
      "parser": "none",
      "function": function MD012(params, onError) {
        const maximum = Number(params.config.maximum || 1);
        let count = 0;
        forEachLine(lineMetadata(), (line, lineIndex, inCode) => {
          count = inCode || line.trim().length > 0 ? 0 : count + 1;
          if (maximum < count) {
            addErrorDetailIf(
              onError,
              lineIndex + 1,
              maximum,
              count,
              null,
              null,
              null,
              {
                "deleteCount": -1
              }
            );
          }
        });
      }
    };
  }
});

// node_modules/markdownlint/lib/md013.js
var require_md013 = __commonJS({
  "node_modules/markdownlint/lib/md013.js"(exports2, module2) {
    "use strict";
    var {
      addErrorDetailIf,
      filterTokens,
      forEachHeading,
      forEachLine,
      includesSorted
    } = require_helpers();
    var { lineMetadata, referenceLinkImageData } = require_cache();
    var longLineRePrefix = "^.{";
    var longLineRePostfixRelaxed = "}.*\\s.*$";
    var longLineRePostfixStrict = "}.+$";
    var linkOrImageOnlyLineRe = /^[es]*(?:lT?L|I)[ES]*$/;
    var sternModeRe = /^(?:[#>\s]*\s)?\S*$/;
    var tokenTypeMap = {
      "em_open": "e",
      "em_close": "E",
      "image": "I",
      "link_open": "l",
      "link_close": "L",
      "strong_open": "s",
      "strong_close": "S",
      "text": "T"
    };
    module2.exports = {
      "names": ["MD013", "line-length"],
      "description": "Line length",
      "tags": ["line_length"],
      "parser": "markdownit",
      "function": function MD013(params, onError) {
        const lineLength = Number(params.config.line_length || 80);
        const headingLineLength = Number(params.config.heading_line_length || lineLength);
        const codeLineLength = Number(params.config.code_block_line_length || lineLength);
        const strict = !!params.config.strict;
        const stern = !!params.config.stern;
        const longLineRePostfix = strict || stern ? longLineRePostfixStrict : longLineRePostfixRelaxed;
        const longLineRe = new RegExp(longLineRePrefix + lineLength + longLineRePostfix);
        const longHeadingLineRe = new RegExp(longLineRePrefix + headingLineLength + longLineRePostfix);
        const longCodeLineRe = new RegExp(longLineRePrefix + codeLineLength + longLineRePostfix);
        const codeBlocks = params.config.code_blocks;
        const includeCodeBlocks = codeBlocks === void 0 ? true : !!codeBlocks;
        const tables = params.config.tables;
        const includeTables = tables === void 0 ? true : !!tables;
        const headings = params.config.headings;
        const includeHeadings = headings === void 0 ? true : !!headings;
        const headingLineNumbers = [];
        forEachHeading(params, (heading) => {
          headingLineNumbers.push(heading.lineNumber);
        });
        const linkOnlyLineNumbers = [];
        filterTokens(params, "inline", (token) => {
          let childTokenTypes = "";
          for (const child of token.children) {
            if (child.type !== "text" || child.content !== "") {
              childTokenTypes += tokenTypeMap[child.type] || "x";
            }
          }
          if (linkOrImageOnlyLineRe.test(childTokenTypes)) {
            linkOnlyLineNumbers.push(token.lineNumber);
          }
        });
        const { definitionLineIndices } = referenceLinkImageData();
        forEachLine(lineMetadata(), (line, lineIndex, inCode, onFence, inTable) => {
          const lineNumber = lineIndex + 1;
          const isHeading = includesSorted(headingLineNumbers, lineNumber);
          const length = inCode ? codeLineLength : isHeading ? headingLineLength : lineLength;
          const lengthRe = inCode ? longCodeLineRe : isHeading ? longHeadingLineRe : longLineRe;
          if ((includeCodeBlocks || !inCode) && (includeTables || !inTable) && (includeHeadings || !isHeading) && !includesSorted(definitionLineIndices, lineIndex) && (strict || !(stern && sternModeRe.test(line)) && !includesSorted(linkOnlyLineNumbers, lineNumber)) && lengthRe.test(line)) {
            addErrorDetailIf(
              onError,
              lineNumber,
              length,
              line.length,
              null,
              null,
              [length + 1, line.length - length]
            );
          }
        });
      }
    };
  }
});

// node_modules/markdownlint/lib/md014.js
var require_md014 = __commonJS({
  "node_modules/markdownlint/lib/md014.js"(exports2, module2) {
    "use strict";
    var { addErrorContext, filterTokens } = require_helpers();
    var dollarCommandRe = /^(\s*)(\$\s+)/;
    module2.exports = {
      "names": ["MD014", "commands-show-output"],
      "description": "Dollar signs used before commands without showing output",
      "tags": ["code"],
      "parser": "markdownit",
      "function": function MD014(params, onError) {
        for (const type of ["code_block", "fence"]) {
          filterTokens(params, type, (token) => {
            const margin = token.type === "fence" ? 1 : 0;
            const dollarInstances = [];
            let allDollars = true;
            for (let i = token.map[0] + margin; i < token.map[1] - margin; i++) {
              const line = params.lines[i];
              const lineTrim = line.trim();
              if (lineTrim) {
                const match = dollarCommandRe.exec(line);
                if (match) {
                  const column = match[1].length + 1;
                  const length = match[2].length;
                  dollarInstances.push([i, lineTrim, column, length]);
                } else {
                  allDollars = false;
                }
              }
            }
            if (allDollars) {
              for (const instance of dollarInstances) {
                const [i, lineTrim, column, length] = instance;
                addErrorContext(
                  onError,
                  // @ts-ignore
                  i + 1,
                  lineTrim,
                  null,
                  null,
                  [column, length],
                  {
                    "editColumn": column,
                    "deleteCount": length
                  }
                );
              }
            }
          });
        }
      }
    };
  }
});

// node_modules/markdownlint/lib/md018.js
var require_md018 = __commonJS({
  "node_modules/markdownlint/lib/md018.js"(exports2, module2) {
    "use strict";
    var { addErrorContext, forEachLine } = require_helpers();
    var { lineMetadata } = require_cache();
    module2.exports = {
      "names": ["MD018", "no-missing-space-atx"],
      "description": "No space after hash on atx style heading",
      "tags": ["headings", "atx", "spaces"],
      "parser": "none",
      "function": function MD018(params, onError) {
        forEachLine(lineMetadata(), (line, lineIndex, inCode) => {
          if (!inCode && /^#+[^# \t]/.test(line) && !/#\s*$/.test(line) && !line.startsWith("#\uFE0F\u20E3")) {
            const hashCount = /^#+/.exec(line)[0].length;
            addErrorContext(
              onError,
              lineIndex + 1,
              line.trim(),
              null,
              null,
              [1, hashCount + 1],
              {
                "editColumn": hashCount + 1,
                "insertText": " "
              }
            );
          }
        });
      }
    };
  }
});

// node_modules/markdownlint/lib/md019.js
var require_md019 = __commonJS({
  "node_modules/markdownlint/lib/md019.js"(exports2, module2) {
    "use strict";
    var { addErrorContext, filterTokens, headingStyleFor } = require_helpers();
    module2.exports = {
      "names": ["MD019", "no-multiple-space-atx"],
      "description": "Multiple spaces after hash on atx style heading",
      "tags": ["headings", "atx", "spaces"],
      "parser": "markdownit",
      "function": function MD019(params, onError) {
        filterTokens(params, "heading_open", (token) => {
          if (headingStyleFor(token) === "atx") {
            const { line, lineNumber } = token;
            const match = /^(#+)([ \t]{2,})\S/.exec(line);
            if (match) {
              const [
                ,
                { "length": hashLength },
                { "length": spacesLength }
              ] = match;
              addErrorContext(
                onError,
                lineNumber,
                line.trim(),
                null,
                null,
                [1, hashLength + spacesLength + 1],
                {
                  "editColumn": hashLength + 1,
                  "deleteCount": spacesLength - 1
                }
              );
            }
          }
        });
      }
    };
  }
});

// node_modules/markdownlint/lib/md020.js
var require_md020 = __commonJS({
  "node_modules/markdownlint/lib/md020.js"(exports2, module2) {
    "use strict";
    var { addErrorContext, forEachLine } = require_helpers();
    var { lineMetadata } = require_cache();
    module2.exports = {
      "names": ["MD020", "no-missing-space-closed-atx"],
      "description": "No space inside hashes on closed atx style heading",
      "tags": ["headings", "atx_closed", "spaces"],
      "parser": "none",
      "function": function MD020(params, onError) {
        forEachLine(lineMetadata(), (line, lineIndex, inCode) => {
          if (!inCode) {
            const match = /^(#+)([ \t]*)([^#]*?[^#\\])([ \t]*)((?:\\#)?)(#+)(\s*)$/.exec(line);
            if (match) {
              const [
                ,
                leftHash,
                { "length": leftSpaceLength },
                content,
                { "length": rightSpaceLength },
                rightEscape,
                rightHash,
                { "length": trailSpaceLength }
              ] = match;
              const leftHashLength = leftHash.length;
              const rightHashLength = rightHash.length;
              const left = !leftSpaceLength;
              const right = !rightSpaceLength || rightEscape;
              const rightEscapeReplacement = rightEscape ? `${rightEscape} ` : "";
              if (left || right) {
                const range = left ? [
                  1,
                  leftHashLength + 1
                ] : [
                  line.length - trailSpaceLength - rightHashLength,
                  rightHashLength + 1
                ];
                addErrorContext(
                  onError,
                  lineIndex + 1,
                  line.trim(),
                  left,
                  right,
                  range,
                  {
                    "editColumn": 1,
                    "deleteCount": line.length,
                    "insertText": `${leftHash} ${content} ${rightEscapeReplacement}${rightHash}`
                  }
                );
              }
            }
          }
        });
      }
    };
  }
});

// node_modules/markdownlint/lib/md021.js
var require_md021 = __commonJS({
  "node_modules/markdownlint/lib/md021.js"(exports2, module2) {
    "use strict";
    var { addErrorContext, filterTokens, headingStyleFor } = require_helpers();
    var closedAtxRe = /^(#+)([ \t]+)([^ \t]|[^ \t].*[^ \t])([ \t]+)(#+)(\s*)$/;
    module2.exports = {
      "names": ["MD021", "no-multiple-space-closed-atx"],
      "description": "Multiple spaces inside hashes on closed atx style heading",
      "tags": ["headings", "atx_closed", "spaces"],
      "parser": "markdownit",
      "function": function MD021(params, onError) {
        filterTokens(params, "heading_open", (token) => {
          if (headingStyleFor(token) === "atx_closed") {
            const { line, lineNumber } = token;
            const match = closedAtxRe.exec(line);
            if (match) {
              const [
                ,
                leftHash,
                { "length": leftSpaceLength },
                content,
                { "length": rightSpaceLength },
                rightHash,
                { "length": trailSpaceLength }
              ] = match;
              const left = leftSpaceLength > 1;
              const right = rightSpaceLength > 1;
              if (left || right) {
                const length = line.length;
                const leftHashLength = leftHash.length;
                const rightHashLength = rightHash.length;
                const range = left ? [
                  1,
                  leftHashLength + leftSpaceLength + 1
                ] : [
                  length - trailSpaceLength - rightHashLength - rightSpaceLength,
                  rightSpaceLength + rightHashLength + 1
                ];
                addErrorContext(
                  onError,
                  lineNumber,
                  line.trim(),
                  left,
                  right,
                  range,
                  {
                    "editColumn": 1,
                    "deleteCount": length,
                    "insertText": `${leftHash} ${content} ${rightHash}`
                  }
                );
              }
            }
          }
        });
      }
    };
  }
});

// node_modules/markdownlint/lib/md022.js
var require_md022 = __commonJS({
  "node_modules/markdownlint/lib/md022.js"(exports2, module2) {
    "use strict";
    var { addErrorDetailIf, blockquotePrefixRe, isBlankLine } = require_helpers();
    var { filterByTypes, getHeadingLevel, inHtmlFlow } = require_micromark2();
    var defaultLines = 1;
    var getLinesFunction = (linesParam) => {
      if (Array.isArray(linesParam)) {
        const linesArray = new Array(6).fill(defaultLines);
        for (const [index, value] of [...linesParam.entries()].slice(0, 6)) {
          linesArray[index] = value;
        }
        return (heading) => linesArray[getHeadingLevel(heading) - 1];
      }
      const lines = linesParam === void 0 ? defaultLines : Number(linesParam);
      return () => lines;
    };
    var getBlockQuote = (str, count) => (str || "").match(blockquotePrefixRe)[0].trimEnd().concat("\n").repeat(count);
    module2.exports = {
      "names": ["MD022", "blanks-around-headings"],
      "description": "Headings should be surrounded by blank lines",
      "tags": ["headings", "blank_lines"],
      "parser": "micromark",
      "function": function MD022(params, onError) {
        const getLinesAbove = getLinesFunction(params.config.lines_above);
        const getLinesBelow = getLinesFunction(params.config.lines_below);
        const micromarkTokens = (
          // @ts-ignore
          params.parsers.micromark.tokens
        );
        const { lines } = params;
        const headings = filterByTypes(
          micromarkTokens,
          ["atxHeading", "setextHeading"]
        ).filter((heading) => !inHtmlFlow(heading));
        for (const heading of headings) {
          const { startLine, endLine } = heading;
          const line = lines[startLine - 1].trim();
          const linesAbove = getLinesAbove(heading);
          if (linesAbove >= 0) {
            let actualAbove = 0;
            for (let i = 0; i < linesAbove && isBlankLine(lines[startLine - 2 - i]); i++) {
              actualAbove++;
            }
            addErrorDetailIf(
              onError,
              startLine,
              linesAbove,
              actualAbove,
              "Above",
              line,
              null,
              {
                "insertText": getBlockQuote(
                  lines[startLine - 2],
                  linesAbove - actualAbove
                )
              }
            );
          }
          const linesBelow = getLinesBelow(heading);
          if (linesBelow >= 0) {
            let actualBelow = 0;
            for (let i = 0; i < linesBelow && isBlankLine(lines[endLine + i]); i++) {
              actualBelow++;
            }
            addErrorDetailIf(
              onError,
              startLine,
              linesBelow,
              actualBelow,
              "Below",
              line,
              null,
              {
                "lineNumber": endLine + 1,
                "insertText": getBlockQuote(
                  lines[endLine],
                  linesBelow - actualBelow
                )
              }
            );
          }
        }
      }
    };
  }
});

// node_modules/markdownlint/lib/md023.js
var require_md023 = __commonJS({
  "node_modules/markdownlint/lib/md023.js"(exports2, module2) {
    "use strict";
    var { addErrorContext, filterTokens } = require_helpers();
    var spaceBeforeHeadingRe = /^(\s+|[>\s]+\s\s)[^>\s]/;
    module2.exports = {
      "names": ["MD023", "heading-start-left"],
      "description": "Headings must start at the beginning of the line",
      "tags": ["headings", "spaces"],
      "parser": "markdownit",
      "function": function MD023(params, onError) {
        filterTokens(params, "heading_open", function forToken(token) {
          const { lineNumber, line } = token;
          const match = line.match(spaceBeforeHeadingRe);
          if (match) {
            const [prefixAndFirstChar, prefix] = match;
            let deleteCount = prefix.length;
            const prefixLengthNoSpace = prefix.trimEnd().length;
            if (prefixLengthNoSpace) {
              deleteCount -= prefixLengthNoSpace - 1;
            }
            addErrorContext(
              onError,
              lineNumber,
              line,
              null,
              null,
              [1, prefixAndFirstChar.length],
              {
                "editColumn": prefixLengthNoSpace + 1,
                "deleteCount": deleteCount
              }
            );
          }
        });
      }
    };
  }
});

// node_modules/markdownlint/lib/md024.js
var require_md024 = __commonJS({
  "node_modules/markdownlint/lib/md024.js"(exports2, module2) {
    "use strict";
    var { addErrorContext, forEachHeading } = require_helpers();
    module2.exports = {
      "names": ["MD024", "no-duplicate-heading"],
      "description": "Multiple headings with the same content",
      "tags": ["headings"],
      "parser": "markdownit",
      "function": function MD024(params, onError) {
        const siblingsOnly = !!params.config.siblings_only || false;
        const knownContents = [null, []];
        let lastLevel = 1;
        let knownContent = knownContents[lastLevel];
        forEachHeading(params, (heading, content) => {
          if (siblingsOnly) {
            const newLevel = heading.tag.slice(1);
            while (lastLevel < newLevel) {
              lastLevel++;
              knownContents[lastLevel] = [];
            }
            while (lastLevel > newLevel) {
              knownContents[lastLevel] = [];
              lastLevel--;
            }
            knownContent = knownContents[newLevel];
          }
          if (knownContent.includes(content)) {
            addErrorContext(
              onError,
              heading.lineNumber,
              heading.line.trim()
            );
          } else {
            knownContent.push(content);
          }
        });
      }
    };
  }
});

// node_modules/markdownlint/lib/md025.js
var require_md025 = __commonJS({
  "node_modules/markdownlint/lib/md025.js"(exports2, module2) {
    "use strict";
    var { addErrorContext, filterTokens, frontMatterHasTitle } = require_helpers();
    module2.exports = {
      "names": ["MD025", "single-title", "single-h1"],
      "description": "Multiple top-level headings in the same document",
      "tags": ["headings"],
      "parser": "markdownit",
      "function": function MD025(params, onError) {
        const level = Number(params.config.level || 1);
        const tag = "h" + level;
        const foundFrontMatterTitle = frontMatterHasTitle(
          params.frontMatterLines,
          params.config.front_matter_title
        );
        let hasTopLevelHeading = false;
        filterTokens(params, "heading_open", function forToken(token) {
          if (token.tag === tag) {
            if (hasTopLevelHeading || foundFrontMatterTitle) {
              addErrorContext(
                onError,
                token.lineNumber,
                token.line.trim()
              );
            } else if (token.lineNumber === 1) {
              hasTopLevelHeading = true;
            }
          }
        });
      }
    };
  }
});

// node_modules/markdownlint/lib/md026.js
var require_md026 = __commonJS({
  "node_modules/markdownlint/lib/md026.js"(exports2, module2) {
    "use strict";
    var {
      addError,
      allPunctuationNoQuestion,
      endOfLineGemojiCodeRe,
      endOfLineHtmlEntityRe,
      escapeForRegExp
    } = require_helpers();
    var { filterByTypes } = require_micromark2();
    module2.exports = {
      "names": ["MD026", "no-trailing-punctuation"],
      "description": "Trailing punctuation in heading",
      "tags": ["headings"],
      "parser": "micromark",
      "function": function MD026(params, onError) {
        let punctuation = params.config.punctuation;
        punctuation = String(
          punctuation === void 0 ? allPunctuationNoQuestion : punctuation
        );
        const trailingPunctuationRe = new RegExp("\\s*[" + escapeForRegExp(punctuation) + "]+$");
        const micromarkTokens = (
          // @ts-ignore
          params.parsers.micromark.tokens
        );
        const headings = filterByTypes(micromarkTokens, ["atxHeadingText", "setextHeadingText"]);
        for (const heading of headings) {
          const { endColumn, endLine, text } = heading;
          const match = trailingPunctuationRe.exec(text);
          if (match && !endOfLineHtmlEntityRe.test(text) && !endOfLineGemojiCodeRe.test(text)) {
            const fullMatch = match[0];
            const length = fullMatch.length;
            const column = endColumn - length;
            addError(
              onError,
              endLine,
              `Punctuation: '${fullMatch}'`,
              void 0,
              [column, length],
              {
                "editColumn": column,
                "deleteCount": length
              }
            );
          }
        }
      }
    };
  }
});

// node_modules/markdownlint/lib/md027.js
var require_md027 = __commonJS({
  "node_modules/markdownlint/lib/md027.js"(exports2, module2) {
    "use strict";
    var { addErrorContext } = require_helpers();
    var { filterByTypes } = require_micromark2();
    module2.exports = {
      "names": ["MD027", "no-multiple-space-blockquote"],
      "description": "Multiple spaces after blockquote symbol",
      "tags": ["blockquote", "whitespace", "indentation"],
      "parser": "micromark",
      "function": function MD027(params, onError) {
        const micromarkTokens = (
          // @ts-ignore
          params.parsers.micromark.tokens
        );
        for (const token of filterByTypes(micromarkTokens, ["linePrefix"])) {
          const siblings = token.parent?.children || micromarkTokens;
          if (siblings[siblings.indexOf(token) - 1]?.type === "blockQuotePrefix") {
            const { startColumn, startLine, text } = token;
            const { length } = text;
            const line = params.lines[startLine - 1];
            addErrorContext(
              onError,
              startLine,
              line,
              null,
              null,
              [startColumn, length],
              {
                "editColumn": startColumn,
                "deleteCount": length
              }
            );
          }
        }
      }
    };
  }
});

// node_modules/markdownlint/lib/md028.js
var require_md028 = __commonJS({
  "node_modules/markdownlint/lib/md028.js"(exports2, module2) {
    "use strict";
    var { addError } = require_helpers();
    var { filterByTypes } = require_micromark2();
    var ignoreTypes = /* @__PURE__ */ new Set(["lineEnding", "listItemIndent", "linePrefix"]);
    module2.exports = {
      "names": ["MD028", "no-blanks-blockquote"],
      "description": "Blank line inside blockquote",
      "tags": ["blockquote", "whitespace"],
      "parser": "micromark",
      "function": function MD028(params, onError) {
        const micromarkTokens = (
          // @ts-ignore
          params.parsers.micromark.tokens
        );
        for (const token of filterByTypes(micromarkTokens, ["blockQuote"])) {
          const errorLineNumbers = [];
          const siblings = token.parent?.children || micromarkTokens;
          for (let i = siblings.indexOf(token) + 1; i < siblings.length; i++) {
            const sibling = siblings[i];
            const { startLine, type } = sibling;
            if (type === "lineEndingBlank") {
              errorLineNumbers.push(startLine);
            } else if (ignoreTypes.has(type)) {
            } else if (type === "blockQuote") {
              for (const lineNumber of errorLineNumbers) {
                addError(onError, lineNumber);
              }
              break;
            } else {
              break;
            }
          }
        }
      }
    };
  }
});

// node_modules/markdownlint/lib/md029.js
var require_md029 = __commonJS({
  "node_modules/markdownlint/lib/md029.js"(exports2, module2) {
    "use strict";
    var {
      addErrorDetailIf,
      listItemMarkerRe,
      orderedListItemMarkerRe,
      rangeFromRegExp
    } = require_helpers();
    var { flattenedLists } = require_cache();
    var listStyleExamples = {
      "one": "1/1/1",
      "ordered": "1/2/3",
      "zero": "0/0/0"
    };
    module2.exports = {
      "names": ["MD029", "ol-prefix"],
      "description": "Ordered list item prefix",
      "tags": ["ol"],
      "parser": "none",
      "function": function MD029(params, onError) {
        const style = String(params.config.style || "one_or_ordered");
        const filteredLists = flattenedLists().filter((list) => !list.unordered);
        for (const list of filteredLists) {
          const { items } = list;
          let current = 1;
          let incrementing = false;
          if (items.length >= 2) {
            const first = orderedListItemMarkerRe.exec(items[0].line);
            const second = orderedListItemMarkerRe.exec(items[1].line);
            if (first && second) {
              const [, firstNumber] = first;
              const [, secondNumber] = second;
              if (secondNumber !== "1" || firstNumber === "0") {
                incrementing = true;
                if (firstNumber === "0") {
                  current = 0;
                }
              }
            }
          }
          let listStyle = style;
          if (listStyle === "one_or_ordered") {
            listStyle = incrementing ? "ordered" : "one";
          }
          if (listStyle === "zero") {
            current = 0;
          } else if (listStyle === "one") {
            current = 1;
          }
          for (const item of items) {
            const match = orderedListItemMarkerRe.exec(item.line);
            if (match) {
              addErrorDetailIf(
                onError,
                item.lineNumber,
                String(current),
                match[1],
                "Style: " + listStyleExamples[listStyle],
                null,
                rangeFromRegExp(item.line, listItemMarkerRe)
              );
              if (listStyle === "ordered") {
                current++;
              }
            }
          }
        }
      }
    };
  }
});

// node_modules/markdownlint/lib/md030.js
var require_md030 = __commonJS({
  "node_modules/markdownlint/lib/md030.js"(exports2, module2) {
    "use strict";
    var { addErrorDetailIf } = require_helpers();
    var { filterByTypes } = require_micromark2();
    module2.exports = {
      "names": ["MD030", "list-marker-space"],
      "description": "Spaces after list markers",
      "tags": ["ol", "ul", "whitespace"],
      "parser": "micromark",
      "function": function MD030(params, onError) {
        const ulSingle = Number(params.config.ul_single || 1);
        const olSingle = Number(params.config.ol_single || 1);
        const ulMulti = Number(params.config.ul_multi || 1);
        const olMulti = Number(params.config.ol_multi || 1);
        const micromarkTokens = (
          // @ts-ignore
          params.parsers.micromark.tokens
        );
        const lists = filterByTypes(micromarkTokens, ["listOrdered", "listUnordered"]);
        for (const list of lists) {
          const ordered = list.type === "listOrdered";
          const listItemPrefixes = list.children.filter((token) => token.type === "listItemPrefix");
          const allSingleLine = list.endLine - list.startLine + 1 === listItemPrefixes.length;
          const expectedSpaces = ordered ? allSingleLine ? olSingle : olMulti : allSingleLine ? ulSingle : ulMulti;
          for (const listItemPrefix of listItemPrefixes) {
            const range = [
              listItemPrefix.startColumn,
              listItemPrefix.endColumn - listItemPrefix.startColumn
            ];
            const listItemPrefixWhitespaces = listItemPrefix.children.filter(
              (token) => token.type === "listItemPrefixWhitespace"
            );
            for (const listItemPrefixWhitespace of listItemPrefixWhitespaces) {
              const { endColumn, startColumn, startLine } = listItemPrefixWhitespace;
              const actualSpaces = endColumn - startColumn;
              const fixInfo = {
                "editColumn": startColumn,
                "deleteCount": actualSpaces,
                "insertText": "".padEnd(expectedSpaces)
              };
              addErrorDetailIf(
                onError,
                startLine,
                expectedSpaces,
                actualSpaces,
                null,
                null,
                range,
                fixInfo
              );
            }
          }
        }
      }
    };
  }
});

// node_modules/markdownlint/lib/md031.js
var require_md031 = __commonJS({
  "node_modules/markdownlint/lib/md031.js"(exports2, module2) {
    "use strict";
    var { addErrorContext, forEachLine, isBlankLine } = require_helpers();
    var { lineMetadata } = require_cache();
    var codeFencePrefixRe = /^(.*?)[`~]/;
    module2.exports = {
      "names": ["MD031", "blanks-around-fences"],
      "description": "Fenced code blocks should be surrounded by blank lines",
      "tags": ["code", "blank_lines"],
      "parser": "none",
      "function": function MD031(params, onError) {
        const listItems = params.config.list_items;
        const includeListItems = listItems === void 0 ? true : !!listItems;
        const { lines } = params;
        forEachLine(lineMetadata(), (line, i, inCode, onFence, inTable, inItem) => {
          const onTopFence = onFence > 0;
          const onBottomFence = onFence < 0;
          if ((includeListItems || !inItem) && (onTopFence && !isBlankLine(lines[i - 1]) || onBottomFence && !isBlankLine(lines[i + 1]))) {
            const [, prefix] = line.match(codeFencePrefixRe) || [];
            const fixInfo = prefix === void 0 ? null : {
              "lineNumber": i + (onTopFence ? 1 : 2),
              "insertText": `${prefix.replace(/[^>]/g, " ").trim()}
`
            };
            addErrorContext(
              onError,
              i + 1,
              lines[i].trim(),
              null,
              null,
              null,
              fixInfo
            );
          }
        });
      }
    };
  }
});

// node_modules/markdownlint/lib/md032.js
var require_md032 = __commonJS({
  "node_modules/markdownlint/lib/md032.js"(exports2, module2) {
    "use strict";
    var { addErrorContext, blockquotePrefixRe, isBlankLine } = require_helpers();
    var { filterByPredicate, nonContentTokens } = require_micromark2();
    var isList = (token) => token.type === "listOrdered" || token.type === "listUnordered";
    var addBlankLineError = (onError, lines, lineIndex, lineNumber) => {
      const line = lines[lineIndex];
      const quotePrefix = line.match(blockquotePrefixRe)[0].trimEnd();
      addErrorContext(
        onError,
        lineIndex + 1,
        line.trim(),
        null,
        null,
        null,
        {
          lineNumber,
          "insertText": `${quotePrefix}
`
        }
      );
    };
    module2.exports = {
      "names": ["MD032", "blanks-around-lists"],
      "description": "Lists should be surrounded by blank lines",
      "tags": ["bullet", "ul", "ol", "blank_lines"],
      "parser": "micromark",
      "function": function MD032(params, onError) {
        const micromarkTokens = (
          // @ts-ignore
          params.parsers.micromark.tokens
        );
        const { lines } = params;
        const topLevelLists = filterByPredicate(
          micromarkTokens,
          isList,
          (token) => isList(token) || token.type === "htmlFlow" ? [] : token.children
        );
        for (const list of topLevelLists) {
          const firstIndex = list.startLine - 1;
          if (!isBlankLine(lines[firstIndex - 1])) {
            addBlankLineError(onError, lines, firstIndex);
          }
          let endLine = list.endLine;
          const flattenedChildren = filterByPredicate(list.children);
          for (const child of flattenedChildren.reverse()) {
            if (!nonContentTokens.has(child.type)) {
              endLine = child.endLine;
              break;
            }
          }
          const lastIndex = endLine - 1;
          if (!isBlankLine(lines[lastIndex + 1])) {
            addBlankLineError(onError, lines, lastIndex, lastIndex + 2);
          }
        }
      }
    };
  }
});

// node_modules/markdownlint/lib/md033.js
var require_md033 = __commonJS({
  "node_modules/markdownlint/lib/md033.js"(exports2, module2) {
    "use strict";
    var { addError, nextLinesRe } = require_helpers();
    var { filterByTypes, getHtmlTagInfo } = require_micromark2();
    module2.exports = {
      "names": ["MD033", "no-inline-html"],
      "description": "Inline HTML",
      "tags": ["html"],
      "parser": "micromark",
      "function": function MD033(params, onError) {
        let allowedElements = params.config.allowed_elements;
        allowedElements = Array.isArray(allowedElements) ? allowedElements : [];
        allowedElements = allowedElements.map((element) => element.toLowerCase());
        const micromarkTokens = (
          // @ts-ignore
          params.parsers.micromark.tokens
        );
        for (const token of filterByTypes(micromarkTokens, ["htmlText"])) {
          const htmlTagInfo = getHtmlTagInfo(token);
          if (htmlTagInfo && !htmlTagInfo.close && !allowedElements.includes(htmlTagInfo.name.toLowerCase())) {
            const range = [
              token.startColumn,
              token.text.replace(nextLinesRe, "").length
            ];
            addError(
              onError,
              token.startLine,
              "Element: " + htmlTagInfo.name,
              void 0,
              range
            );
          }
        }
      }
    };
  }
});

// node_modules/markdownlint/lib/md034.js
var require_md034 = __commonJS({
  "node_modules/markdownlint/lib/md034.js"(exports2, module2) {
    "use strict";
    var { addErrorContext } = require_helpers();
    var { filterByPredicate, filterByTypes, getHtmlTagInfo, inHtmlFlow, parse: parse3 } = require_micromark2();
    module2.exports = {
      "names": ["MD034", "no-bare-urls"],
      "description": "Bare URL used",
      "tags": ["links", "url"],
      "parser": "micromark",
      "function": function MD034(params, onError) {
        const micromarkTokens = (
          // @ts-ignore
          params.parsers.micromark.tokens
        );
        const literalAutolinks = (tokens) => filterByPredicate(
          tokens,
          (token) => {
            if (token.type === "literalAutolink" && !inHtmlFlow(token)) {
              const siblings = token.parent?.children;
              const index = siblings?.indexOf(token);
              const prev = siblings?.at(index - 1);
              const next = siblings?.at(index + 1);
              return !(prev && next && prev.type === "data" && next.type === "data" && prev.text.endsWith("<") && next.text.startsWith(">"));
            }
            return false;
          },
          (token) => {
            const { children } = token;
            const result = [];
            for (let i = 0; i < children.length; i++) {
              const current = children[i];
              const openTagInfo = getHtmlTagInfo(current);
              if (openTagInfo && !openTagInfo.close) {
                let count = 1;
                for (let j = i + 1; j < children.length; j++) {
                  const candidate = children[j];
                  const closeTagInfo = getHtmlTagInfo(candidate);
                  if (closeTagInfo && openTagInfo.name === closeTagInfo.name) {
                    if (closeTagInfo.close) {
                      count--;
                      if (count === 0) {
                        i = j;
                        break;
                      }
                    } else {
                      count++;
                    }
                  }
                }
              } else {
                result.push(current);
              }
            }
            return result;
          }
        );
        const autoLinks = filterByTypes(micromarkTokens, ["literalAutolink"]);
        if (autoLinks.length > 0) {
          const document = params.lines.join("\n");
          const tokens = parse3(document, void 0, false);
          for (const token of literalAutolinks(tokens)) {
            const range = [
              token.startColumn,
              token.endColumn - token.startColumn
            ];
            const fixInfo = {
              "editColumn": range[0],
              "deleteCount": range[1],
              "insertText": `<${token.text}>`
            };
            addErrorContext(
              onError,
              token.startLine,
              token.text,
              null,
              null,
              range,
              fixInfo
            );
          }
        }
      }
    };
  }
});

// node_modules/markdownlint/lib/md035.js
var require_md035 = __commonJS({
  "node_modules/markdownlint/lib/md035.js"(exports2, module2) {
    "use strict";
    var { addErrorDetailIf } = require_helpers();
    var { filterByTypes } = require_micromark2();
    module2.exports = {
      "names": ["MD035", "hr-style"],
      "description": "Horizontal rule style",
      "tags": ["hr"],
      "parser": "micromark",
      "function": function MD035(params, onError) {
        let style = String(params.config.style || "consistent").trim();
        const micromarkTokens = (
          // @ts-ignore
          params.parsers.micromark.tokens
        );
        const thematicBreaks = filterByTypes(micromarkTokens, ["thematicBreak"]);
        for (const token of thematicBreaks) {
          const { startLine, text } = token;
          if (style === "consistent") {
            style = text;
          }
          addErrorDetailIf(onError, startLine, style, text);
        }
      }
    };
  }
});

// node_modules/markdownlint/lib/md036.js
var require_md036 = __commonJS({
  "node_modules/markdownlint/lib/md036.js"(exports2, module2) {
    "use strict";
    var { addErrorContext, allPunctuation } = require_helpers();
    var { filterByTypes, matchAndGetTokensByType } = require_micromark2();
    var emphasisAndChildrenTypes = /* @__PURE__ */ new Map([
      ["emphasis", ["emphasisSequence", "emphasisText", "emphasisSequence"]],
      ["strong", ["strongSequence", "strongText", "strongSequence"]]
    ]);
    module2.exports = {
      "names": ["MD036", "no-emphasis-as-heading"],
      "description": "Emphasis used instead of a heading",
      "tags": ["headings", "emphasis"],
      "parser": "micromark",
      "function": function MD036(params, onError) {
        let punctuation = params.config.punctuation;
        punctuation = String(punctuation === void 0 ? allPunctuation : punctuation);
        const punctuationRe = new RegExp("[" + punctuation + "]$");
        const paragraphTokens = filterByTypes(params.parsers.micromark.tokens, ["paragraph"]).filter(
          (token) => token.parent?.type === "content" && !token.parent?.parent && token.children.length === 1
        );
        for (const paragraphToken of paragraphTokens) {
          const childToken = paragraphToken.children[0];
          for (const [emphasisType, emphasisChildrenTypes] of emphasisAndChildrenTypes) {
            if (childToken.type === emphasisType) {
              const matchingTokens = matchAndGetTokensByType(childToken.children, emphasisChildrenTypes);
              if (matchingTokens) {
                const textToken = matchingTokens[1];
                if (textToken.children.length === 1 && textToken.children[0].type === "data" && !punctuationRe.test(textToken.text)) {
                  addErrorContext(onError, textToken.startLine, textToken.text);
                }
              }
            }
          }
        }
      }
    };
  }
});

// node_modules/markdownlint/lib/md037.js
var require_md037 = __commonJS({
  "node_modules/markdownlint/lib/md037.js"(exports2, module2) {
    "use strict";
    var { addError } = require_helpers();
    var { filterByPredicate, inHtmlFlow } = require_micromark2();
    module2.exports = {
      "names": ["MD037", "no-space-in-emphasis"],
      "description": "Spaces inside emphasis markers",
      "tags": ["whitespace", "emphasis"],
      "parser": "micromark",
      "function": function MD037(params, onError) {
        const micromarkTokens = (
          // @ts-ignore
          params.parsers.micromark.tokens
        );
        const { lines } = params;
        const emphasisTokensByMarker = /* @__PURE__ */ new Map();
        for (const marker of ["_", "__", "___", "*", "**", "***"]) {
          emphasisTokensByMarker.set(marker, []);
        }
        const tokens = filterByPredicate(
          micromarkTokens,
          (token) => token.children.some((child) => child.type === "data")
        );
        for (const token of tokens) {
          for (const emphasisTokens of emphasisTokensByMarker.values()) {
            emphasisTokens.length = 0;
          }
          for (const child of token.children) {
            const { text, type } = child;
            if (type === "data" && text.length <= 3) {
              const emphasisTokens = emphasisTokensByMarker.get(text);
              if (emphasisTokens && !inHtmlFlow(child)) {
                emphasisTokens.push(child);
              }
            }
          }
          for (const entry of emphasisTokensByMarker.entries()) {
            const [marker, emphasisTokens] = entry;
            for (let i = 0; i + 1 < emphasisTokens.length; i += 2) {
              const startToken = emphasisTokens[i];
              const startLine = lines[startToken.startLine - 1];
              const startSlice = startLine.slice(startToken.endColumn - 1);
              const startMatch = startSlice.match(/^\s+\S/);
              if (startMatch) {
                const [startSpaceCharacter] = startMatch;
                const startContext = `${marker}${startSpaceCharacter}`;
                addError(
                  onError,
                  startToken.startLine,
                  void 0,
                  startContext,
                  [startToken.startColumn, startContext.length],
                  {
                    "editColumn": startToken.endColumn,
                    "deleteCount": startSpaceCharacter.length - 1
                  }
                );
              }
              const endToken = emphasisTokens[i + 1];
              const endLine = lines[endToken.startLine - 1];
              const endSlice = endLine.slice(0, endToken.startColumn - 1);
              const endMatch = endSlice.match(/\S\s+$/);
              if (endMatch) {
                const [endSpaceCharacter] = endMatch;
                const endContext = `${endSpaceCharacter}${marker}`;
                addError(
                  onError,
                  endToken.startLine,
                  void 0,
                  endContext,
                  [endToken.endColumn - endContext.length, endContext.length],
                  {
                    "editColumn": endToken.startColumn - (endSpaceCharacter.length - 1),
                    "deleteCount": endSpaceCharacter.length - 1
                  }
                );
              }
            }
          }
        }
      }
    };
  }
});

// node_modules/markdownlint/lib/md038.js
var require_md038 = __commonJS({
  "node_modules/markdownlint/lib/md038.js"(exports2, module2) {
    "use strict";
    var { addErrorContext } = require_helpers();
    var { filterByTypes, inHtmlFlow, tokenIfType } = require_micromark2();
    var leftSpaceRe = /^\s(?:[^`]|$)/;
    var rightSpaceRe = /[^`]\s$/;
    var trimCodeText = (text, start, end) => {
      text = text.replace(/^\s+$/, "");
      if (start) {
        text = text.replace(/^\s+?(\s`|\S)/, "$1");
      }
      if (end) {
        text = text.replace(/(`\s|\S)\s+$/, "$1");
      }
      return text;
    };
    module2.exports = {
      "names": ["MD038", "no-space-in-code"],
      "description": "Spaces inside code span elements",
      "tags": ["whitespace", "code"],
      "parser": "micromark",
      "function": function MD038(params, onError) {
        const micromarkTokens = (
          // @ts-ignore
          params.parsers.micromark.tokens
        );
        const codeTexts = filterByTypes(micromarkTokens, ["codeText"]).filter((codeText) => !inHtmlFlow(codeText));
        for (const codeText of codeTexts) {
          const { children } = codeText;
          const first = 0;
          const last = children.length - 1;
          const startSequence = tokenIfType(children[first], "codeTextSequence");
          const endSequence = tokenIfType(children[last], "codeTextSequence");
          const startData = tokenIfType(children[first + 1], "codeTextData") || tokenIfType(children[first + 2], "codeTextData");
          const endData = tokenIfType(children[last - 1], "codeTextData") || tokenIfType(children[last - 2], "codeTextData");
          if (startSequence && endSequence && startData && endData) {
            const spaceLeft = leftSpaceRe.test(startData.text);
            const spaceRight = rightSpaceRe.test(endData.text);
            if (spaceLeft || spaceRight) {
              let lineNumber = startSequence.startLine;
              let range = null;
              let fixInfo = null;
              if (startSequence.startLine === endSequence.endLine) {
                range = [
                  startSequence.startColumn,
                  endSequence.endColumn - startSequence.startColumn
                ];
                fixInfo = {
                  "editColumn": startSequence.endColumn,
                  "deleteCount": endSequence.startColumn - startSequence.endColumn,
                  "insertText": trimCodeText(startData.text, true, true)
                };
              } else if (spaceLeft && startSequence.endLine === startData.startLine) {
                range = [
                  startSequence.startColumn,
                  startData.endColumn - startSequence.startColumn
                ];
                fixInfo = {
                  "editColumn": startSequence.endColumn,
                  "deleteCount": startData.endColumn - startData.startColumn,
                  "insertText": trimCodeText(startData.text, true, false)
                };
              } else if (spaceRight && endData.text.trim().length > 0) {
                lineNumber = endSequence.endLine;
                range = [
                  endData.startColumn,
                  endSequence.endColumn - endData.startColumn
                ];
                fixInfo = {
                  "editColumn": endData.startColumn,
                  "deleteCount": endData.endColumn - endData.startColumn,
                  "insertText": trimCodeText(endData.text, false, true)
                };
              }
              if (range) {
                const context = params.lines[lineNumber - 1].substring(range[0] - 1, range[0] - 1 + range[1]);
                addErrorContext(
                  onError,
                  lineNumber,
                  context,
                  spaceLeft,
                  spaceRight,
                  range,
                  fixInfo
                );
              }
            }
          }
        }
      }
    };
  }
});

// node_modules/markdownlint/lib/md039.js
var require_md039 = __commonJS({
  "node_modules/markdownlint/lib/md039.js"(exports2, module2) {
    "use strict";
    var { addErrorContext, filterTokens } = require_helpers();
    var spaceInLinkRe = /\[(?:\s[^\]]*|[^\]]*?\s)\](?=(\([^)]*\)|\[[^\]]*\]))/;
    module2.exports = {
      "names": ["MD039", "no-space-in-links"],
      "description": "Spaces inside link text",
      "tags": ["whitespace", "links"],
      "parser": "markdownit",
      "function": function MD039(params, onError) {
        filterTokens(params, "inline", (token) => {
          const { children } = token;
          let { lineNumber } = token;
          let inLink = false;
          let linkText = "";
          let lineIndex = 0;
          for (const child of children) {
            const { content, markup, type } = child;
            if (type === "link_open") {
              inLink = true;
              linkText = "";
            } else if (type === "link_close") {
              inLink = false;
              const left = linkText.trimStart().length !== linkText.length;
              const right = linkText.trimEnd().length !== linkText.length;
              if (left || right) {
                const line = params.lines[lineNumber - 1];
                let range = null;
                let fixInfo = null;
                const match = line.slice(lineIndex).match(spaceInLinkRe);
                if (match) {
                  const column = match.index + lineIndex + 1;
                  const length = match[0].length;
                  range = [column, length];
                  fixInfo = {
                    "editColumn": column + 1,
                    "deleteCount": length - 2,
                    "insertText": linkText.trim()
                  };
                  lineIndex = column + length - 1;
                }
                addErrorContext(
                  onError,
                  lineNumber,
                  `[${linkText}]`,
                  left,
                  right,
                  range,
                  fixInfo
                );
              }
            } else if (type === "softbreak" || type === "hardbreak") {
              lineNumber++;
              lineIndex = 0;
            } else if (inLink) {
              linkText += type.endsWith("_inline") ? `${markup}${content}${markup}` : content || markup;
            }
          }
        });
      }
    };
  }
});

// node_modules/markdownlint/lib/md040.js
var require_md040 = __commonJS({
  "node_modules/markdownlint/lib/md040.js"(exports2, module2) {
    "use strict";
    var { addError, addErrorContext } = require_helpers();
    var { filterByTypes, getTokenTextByType, tokenIfType } = require_micromark2();
    module2.exports = {
      "names": ["MD040", "fenced-code-language"],
      "description": "Fenced code blocks should have a language specified",
      "tags": ["code", "language"],
      "parser": "micromark",
      "function": function MD040(params, onError) {
        let allowed = params.config.allowed_languages;
        allowed = Array.isArray(allowed) ? allowed : [];
        const languageOnly = !!params.config.language_only;
        const micromarkTokens = (
          // @ts-ignore
          params.parsers.micromark.tokens
        );
        const fencedCodes = filterByTypes(micromarkTokens, ["codeFenced"]);
        for (const fencedCode of fencedCodes) {
          const openingFence = tokenIfType(fencedCode.children[0], "codeFencedFence");
          if (openingFence) {
            const { children, startLine, text } = openingFence;
            const info = getTokenTextByType(children, "codeFencedFenceInfo");
            if (!info) {
              addErrorContext(onError, startLine, text);
            } else if (allowed.length > 0 && !allowed.includes(info)) {
              addError(onError, startLine, `"${info}" is not allowed`);
            }
            if (languageOnly && getTokenTextByType(children, "codeFencedFenceMeta")) {
              addError(onError, startLine, `Info string contains more than language: "${text}"`);
            }
          }
        }
      }
    };
  }
});

// node_modules/markdownlint/lib/md041.js
var require_md041 = __commonJS({
  "node_modules/markdownlint/lib/md041.js"(exports2, module2) {
    "use strict";
    var { addErrorContext, frontMatterHasTitle } = require_helpers();
    var { filterByTypes, getHeadingLevel, getHtmlTagInfo, isHtmlFlowComment, nonContentTokens } = require_micromark2();
    module2.exports = {
      "names": ["MD041", "first-line-heading", "first-line-h1"],
      "description": "First line in a file should be a top-level heading",
      "tags": ["headings"],
      "parser": "micromark",
      "function": function MD041(params, onError) {
        const level = Number(params.config.level || 1);
        if (!frontMatterHasTitle(params.frontMatterLines, params.config.front_matter_title)) {
          params.parsers.micromark.tokens.filter((token) => !nonContentTokens.has(token.type) && !isHtmlFlowComment(token)).every((token) => {
            let isError = true;
            if (token.type === "atxHeading" || token.type === "setextHeading") {
              isError = getHeadingLevel(token) !== level;
            } else if (token.type === "htmlFlow") {
              const htmlTexts = filterByTypes(token.children, ["htmlText"]);
              const tagInfo = htmlTexts.length > 0 && getHtmlTagInfo(htmlTexts[0]);
              isError = !tagInfo || tagInfo.name.toLowerCase() !== `h${level}`;
            }
            if (isError) {
              addErrorContext(onError, token.startLine, params.lines[token.startLine - 1]);
            }
            return false;
          });
        }
      }
    };
  }
});

// node_modules/markdownlint/lib/md042.js
var require_md042 = __commonJS({
  "node_modules/markdownlint/lib/md042.js"(exports2, module2) {
    "use strict";
    var { addErrorContext, escapeForRegExp, filterTokens } = require_helpers();
    module2.exports = {
      "names": ["MD042", "no-empty-links"],
      "description": "No empty links",
      "tags": ["links"],
      "parser": "markdownit",
      "function": function MD042(params, onError) {
        filterTokens(params, "inline", function forToken(token) {
          let inLink = false;
          let linkText = "";
          let emptyLink = false;
          for (const child of token.children) {
            if (child.type === "link_open") {
              inLink = true;
              linkText = "";
              for (const attr of child.attrs) {
                if (attr[0] === "href" && (!attr[1] || attr[1] === "#")) {
                  emptyLink = true;
                }
              }
            } else if (child.type === "link_close") {
              inLink = false;
              if (emptyLink) {
                let context = `[${linkText}]`;
                let range = null;
                const match = child.line.match(
                  new RegExp(`${escapeForRegExp(context)}\\((?:|#|<>)\\)`)
                );
                if (match) {
                  context = match[0];
                  range = [match.index + 1, match[0].length];
                }
                addErrorContext(
                  onError,
                  child.lineNumber,
                  context,
                  null,
                  null,
                  range
                );
                emptyLink = false;
              }
            } else if (inLink) {
              linkText += child.content;
            }
          }
        });
      }
    };
  }
});

// node_modules/markdownlint/lib/md043.js
var require_md043 = __commonJS({
  "node_modules/markdownlint/lib/md043.js"(exports2, module2) {
    "use strict";
    var { addErrorContext, addErrorDetailIf, forEachHeading } = require_helpers();
    module2.exports = {
      "names": ["MD043", "required-headings"],
      "description": "Required heading structure",
      "tags": ["headings"],
      "parser": "markdownit",
      "function": function MD043(params, onError) {
        const requiredHeadings = params.config.headings;
        if (!Array.isArray(requiredHeadings)) {
          return;
        }
        const matchCase = params.config.match_case || false;
        const levels = {};
        for (const level of [1, 2, 3, 4, 5, 6]) {
          levels["h" + level] = "######".substr(-level);
        }
        let i = 0;
        let matchAny = false;
        let hasError = false;
        let anyHeadings = false;
        const getExpected = () => requiredHeadings[i++] || "[None]";
        const handleCase = (str) => matchCase ? str : str.toLowerCase();
        forEachHeading(params, (heading, content) => {
          if (!hasError) {
            anyHeadings = true;
            const actual = levels[heading.tag] + " " + content;
            const expected = getExpected();
            if (expected === "*") {
              const nextExpected = getExpected();
              if (handleCase(nextExpected) !== handleCase(actual)) {
                matchAny = true;
                i--;
              }
            } else if (expected === "+") {
              matchAny = true;
            } else if (handleCase(expected) === handleCase(actual)) {
              matchAny = false;
            } else if (matchAny) {
              i--;
            } else {
              addErrorDetailIf(
                onError,
                heading.lineNumber,
                expected,
                actual
              );
              hasError = true;
            }
          }
        });
        const extraHeadings = requiredHeadings.length - i;
        if (!hasError && (extraHeadings > 1 || extraHeadings === 1 && requiredHeadings[i] !== "*") && (anyHeadings || !requiredHeadings.every((heading) => heading === "*"))) {
          addErrorContext(
            onError,
            params.lines.length,
            requiredHeadings[i]
          );
        }
      }
    };
  }
});

// node_modules/markdownlint/lib/md044.js
var require_md044 = __commonJS({
  "node_modules/markdownlint/lib/md044.js"(exports2, module2) {
    "use strict";
    var { addErrorDetailIf, escapeForRegExp, withinAnyRange } = require_helpers();
    var { filterByPredicate, filterByTypes, parse: parse3 } = require_micromark2();
    var ignoredChildTypes = /* @__PURE__ */ new Set(
      ["codeFencedFence", "definition", "reference", "resource"]
    );
    module2.exports = {
      "names": ["MD044", "proper-names"],
      "description": "Proper names should have the correct capitalization",
      "tags": ["spelling"],
      "parser": "micromark",
      "function": function MD044(params, onError) {
        let names = params.config.names;
        names = Array.isArray(names) ? names : [];
        names.sort((a, b) => b.length - a.length || a.localeCompare(b));
        if (names.length === 0) {
          return;
        }
        const codeBlocks = params.config.code_blocks;
        const includeCodeBlocks = codeBlocks === void 0 ? true : !!codeBlocks;
        const htmlElements = params.config.html_elements;
        const includeHtmlElements = htmlElements === void 0 ? true : !!htmlElements;
        const micromarkTokens = (
          // @ts-ignore
          params.parsers.micromark.tokens
        );
        const scannedTypes = /* @__PURE__ */ new Set(["data"]);
        if (includeCodeBlocks) {
          scannedTypes.add("codeFlowValue");
          scannedTypes.add("codeTextData");
        }
        if (includeHtmlElements) {
          scannedTypes.add("htmlFlowData");
          scannedTypes.add("htmlTextData");
        }
        const contentTokens = filterByPredicate(
          micromarkTokens,
          (token) => scannedTypes.has(token.type),
          (token) => token.children.filter((t) => !ignoredChildTypes.has(t.type))
        );
        const exclusions = [];
        const autoLinked = /* @__PURE__ */ new Set();
        for (const name of names) {
          const escapedName = escapeForRegExp(name);
          const startNamePattern = /^\W/.test(name) ? "" : "\\b_*";
          const endNamePattern = /\W$/.test(name) ? "" : "_*\\b";
          const namePattern = `(${startNamePattern})(${escapedName})${endNamePattern}`;
          const nameRe = new RegExp(namePattern, "gi");
          for (const token of contentTokens) {
            let match = null;
            while ((match = nameRe.exec(token.text)) !== null) {
              const [, leftMatch, nameMatch] = match;
              const index = token.startColumn - 1 + match.index + leftMatch.length;
              const length = nameMatch.length;
              const lineIndex = token.startLine - 1;
              if (!withinAnyRange(exclusions, lineIndex, index, length) && !names.includes(nameMatch)) {
                let urlRanges = [];
                if (!autoLinked.has(token)) {
                  urlRanges = filterByTypes(
                    parse3(token.text),
                    ["literalAutolink"]
                  ).map(
                    (t) => [
                      lineIndex,
                      token.startColumn - 1 + t.startColumn - 1,
                      t.endColumn - t.startColumn
                    ]
                  );
                  exclusions.push(...urlRanges);
                  autoLinked.add(token);
                }
                if (!withinAnyRange(urlRanges, lineIndex, index, length)) {
                  const column = index + 1;
                  addErrorDetailIf(
                    onError,
                    token.startLine,
                    name,
                    nameMatch,
                    null,
                    null,
                    [column, length],
                    {
                      "editColumn": column,
                      "deleteCount": length,
                      "insertText": name
                    }
                  );
                }
              }
              exclusions.push([lineIndex, index, length]);
            }
          }
        }
      }
    };
  }
});

// node_modules/markdownlint/lib/md045.js
var require_md045 = __commonJS({
  "node_modules/markdownlint/lib/md045.js"(exports2, module2) {
    "use strict";
    var { addError, getHtmlAttributeRe, nextLinesRe } = require_helpers();
    var { filterByTypes, getHtmlTagInfo } = require_micromark2();
    var altRe = getHtmlAttributeRe("alt");
    module2.exports = {
      "names": ["MD045", "no-alt-text"],
      "description": "Images should have alternate text (alt text)",
      "tags": ["accessibility", "images"],
      "parser": "micromark",
      "function": function MD045(params, onError) {
        const micromarkTokens = (
          // @ts-ignore
          params.parsers.micromark.tokens
        );
        const images = filterByTypes(micromarkTokens, ["image"]);
        for (const image of images) {
          const labelTexts = filterByTypes(image.children, ["labelText"]);
          if (labelTexts.some((labelText) => labelText.text.length === 0)) {
            const range = image.startLine === image.endLine ? [image.startColumn, image.endColumn - image.startColumn] : void 0;
            addError(
              onError,
              image.startLine,
              void 0,
              void 0,
              range
            );
          }
        }
        const htmlTexts = filterByTypes(micromarkTokens, ["htmlText"]);
        for (const htmlText of htmlTexts) {
          const { startColumn, startLine, text } = htmlText;
          const htmlTagInfo = getHtmlTagInfo(htmlText);
          if (htmlTagInfo && !htmlTagInfo.close && htmlTagInfo.name.toLowerCase() === "img" && !altRe.test(text)) {
            const range = [
              startColumn,
              text.replace(nextLinesRe, "").length
            ];
            addError(
              onError,
              startLine,
              void 0,
              void 0,
              range
            );
          }
        }
      }
    };
  }
});

// node_modules/markdownlint/lib/md046.js
var require_md046 = __commonJS({
  "node_modules/markdownlint/lib/md046.js"(exports2, module2) {
    "use strict";
    var { addErrorDetailIf } = require_helpers();
    var { filterByTypes } = require_micromark2();
    var tokenTypeToStyle = {
      "codeFenced": "fenced",
      "codeIndented": "indented"
    };
    module2.exports = {
      "names": ["MD046", "code-block-style"],
      "description": "Code block style",
      "tags": ["code"],
      "parser": "micromark",
      "function": function MD046(params, onError) {
        let expectedStyle = String(params.config.style || "consistent");
        const micromarkTokens = (
          // @ts-ignore
          params.parsers.micromark.tokens
        );
        const codeBlocksAndFences = filterByTypes(micromarkTokens, ["codeFenced", "codeIndented"]);
        for (const token of codeBlocksAndFences) {
          const { startLine, type } = token;
          if (expectedStyle === "consistent") {
            expectedStyle = tokenTypeToStyle[type];
          }
          addErrorDetailIf(
            onError,
            startLine,
            expectedStyle,
            tokenTypeToStyle[type]
          );
        }
      }
    };
  }
});

// node_modules/markdownlint/lib/md047.js
var require_md047 = __commonJS({
  "node_modules/markdownlint/lib/md047.js"(exports2, module2) {
    "use strict";
    var { addError, isBlankLine } = require_helpers();
    module2.exports = {
      "names": ["MD047", "single-trailing-newline"],
      "description": "Files should end with a single newline character",
      "tags": ["blank_lines"],
      "parser": "none",
      "function": function MD047(params, onError) {
        const lastLineNumber = params.lines.length;
        const lastLine = params.lines[lastLineNumber - 1];
        if (!isBlankLine(lastLine)) {
          addError(
            onError,
            lastLineNumber,
            void 0,
            void 0,
            [lastLine.length, 1],
            {
              "insertText": "\n",
              "editColumn": lastLine.length + 1
            }
          );
        }
      }
    };
  }
});

// node_modules/markdownlint/lib/md048.js
var require_md048 = __commonJS({
  "node_modules/markdownlint/lib/md048.js"(exports2, module2) {
    "use strict";
    var { addErrorDetailIf, fencedCodeBlockStyleFor } = require_helpers();
    var { filterByTypes, tokenIfType } = require_micromark2();
    module2.exports = {
      "names": ["MD048", "code-fence-style"],
      "description": "Code fence style",
      "tags": ["code"],
      "parser": "micromark",
      "function": function MD048(params, onError) {
        const style = String(params.config.style || "consistent");
        const micromarkTokens = (
          // @ts-ignore
          params.parsers.micromark.tokens
        );
        let expectedStyle = style;
        const codeFenceds = filterByTypes(micromarkTokens, ["codeFenced"]);
        for (const codeFenced of codeFenceds) {
          const codeFencedFence = tokenIfType(codeFenced.children[0], "codeFencedFence");
          if (codeFencedFence) {
            const codeFencedFenceSequence = tokenIfType(codeFencedFence.children[0], "codeFencedFenceSequence");
            if (codeFencedFenceSequence) {
              const { startLine, text } = codeFencedFenceSequence;
              if (expectedStyle === "consistent") {
                expectedStyle = fencedCodeBlockStyleFor(text);
              }
              addErrorDetailIf(
                onError,
                startLine,
                expectedStyle,
                fencedCodeBlockStyleFor(text)
              );
            }
          }
        }
      }
    };
  }
});

// node_modules/markdownlint/lib/md049-md050.js
var require_md049_md050 = __commonJS({
  "node_modules/markdownlint/lib/md049-md050.js"(exports2, module2) {
    "use strict";
    var { addError, emphasisOrStrongStyleFor } = require_helpers();
    var { filterByPredicate, tokenIfType } = require_micromark2();
    var intrawordRe = /^\w$/;
    var impl = (params, onError, type, typeSequence, asterisk, underline, style = "consistent") => {
      const micromarkTokens = (
        // @ts-ignore
        params.parsers.micromark.tokens
      );
      const { lines } = params;
      const emphasisTokens = filterByPredicate(
        micromarkTokens,
        (token) => token.type === type,
        (token) => token.type === "htmlFlow" ? [] : token.children
      );
      for (const token of emphasisTokens) {
        const { children } = token;
        const startSequence = tokenIfType(children[0], typeSequence);
        const endSequence = tokenIfType(children[children.length - 1], typeSequence);
        if (startSequence && endSequence) {
          const markupStyle = emphasisOrStrongStyleFor(startSequence.text);
          if (style === "consistent") {
            style = markupStyle;
          }
          if (style !== markupStyle) {
            const underscoreIntraword = style === "underscore" && (intrawordRe.test(
              lines[startSequence.startLine - 1][startSequence.startColumn - 2]
            ) || intrawordRe.test(
              lines[endSequence.endLine - 1][endSequence.endColumn - 1]
            ));
            if (!underscoreIntraword) {
              for (const sequence of [startSequence, endSequence]) {
                addError(
                  onError,
                  sequence.startLine,
                  `Expected: ${style}; Actual: ${markupStyle}`,
                  void 0,
                  [sequence.startColumn, sequence.text.length],
                  {
                    "editColumn": sequence.startColumn,
                    "deleteCount": sequence.text.length,
                    "insertText": style === "asterisk" ? asterisk : underline
                  }
                );
              }
            }
          }
        }
      }
    };
    module2.exports = [
      {
        "names": ["MD049", "emphasis-style"],
        "description": "Emphasis style",
        "tags": ["emphasis"],
        "parser": "micromark",
        "function": function MD049(params, onError) {
          return impl(
            params,
            onError,
            "emphasis",
            "emphasisSequence",
            "*",
            "_",
            params.config.style || void 0
          );
        }
      },
      {
        "names": ["MD050", "strong-style"],
        "description": "Strong style",
        "tags": ["emphasis"],
        "parser": "micromark",
        "function": function MD050(params, onError) {
          return impl(
            params,
            onError,
            "strong",
            "strongSequence",
            "**",
            "__",
            params.config.style || void 0
          );
        }
      }
    ];
  }
});

// node_modules/markdownlint/lib/md051.js
var require_md051 = __commonJS({
  "node_modules/markdownlint/lib/md051.js"(exports2, module2) {
    "use strict";
    var { addError, addErrorDetailIf, getHtmlAttributeRe } = require_helpers();
    var { filterByPredicate, filterByTypes, getHtmlTagInfo } = require_micromark2();
    var idRe = getHtmlAttributeRe("id");
    var nameRe = getHtmlAttributeRe("name");
    var anchorRe = /\{(#[a-z\d]+(?:[-_][a-z\d]+)*)\}/gu;
    var lineFragmentRe = /^#(?:L\d+(?:C\d+)?-L\d+(?:C\d+)?|L\d+)$/;
    var childrenExclude = /* @__PURE__ */ new Set(["image", "reference", "resource"]);
    var tokensInclude = /* @__PURE__ */ new Set(
      ["characterEscapeValue", "codeTextData", "data", "mathTextData"]
    );
    function convertHeadingToHTMLFragment(headingText) {
      const inlineText = filterByPredicate(
        headingText.children,
        (token) => tokensInclude.has(token.type),
        (token) => childrenExclude.has(token.type) ? [] : token.children
      ).map((token) => token.text).join("");
      return "#" + encodeURIComponent(
        inlineText.toLowerCase().replace(
          /[^\p{Letter}\p{Mark}\p{Number}\p{Connector_Punctuation}\- ]/gu,
          ""
        ).replace(/ /gu, "-")
      );
    }
    function unescapeStringTokenText(token) {
      return filterByTypes(token.children, ["characterEscapeValue", "data"]).map((child) => child.text).join("");
    }
    module2.exports = {
      "names": ["MD051", "link-fragments"],
      "description": "Link fragments should be valid",
      "tags": ["links"],
      "parser": "micromark",
      "function": function MD051(params, onError) {
        const micromarkTokens = (
          // @ts-ignore
          params.parsers.micromark.tokens
        );
        const fragments = /* @__PURE__ */ new Map();
        const headingTexts = filterByTypes(micromarkTokens, ["atxHeadingText", "setextHeadingText"]);
        for (const headingText of headingTexts) {
          const fragment = convertHeadingToHTMLFragment(headingText);
          if (fragment !== "#") {
            const count = fragments.get(fragment) || 0;
            if (count) {
              fragments.set(`${fragment}-${count}`, 0);
            }
            fragments.set(fragment, count + 1);
            let match = null;
            while ((match = anchorRe.exec(headingText.text)) !== null) {
              const [, anchor] = match;
              if (!fragments.has(anchor)) {
                fragments.set(anchor, 1);
              }
            }
          }
        }
        for (const token of filterByTypes(micromarkTokens, ["htmlText"])) {
          const htmlTagInfo = getHtmlTagInfo(token);
          if (htmlTagInfo && !htmlTagInfo.close) {
            const anchorMatch = idRe.exec(token.text) || htmlTagInfo.name.toLowerCase() === "a" && nameRe.exec(token.text);
            if (anchorMatch && anchorMatch.length > 0) {
              fragments.set(`#${anchorMatch[1]}`, 0);
            }
          }
        }
        const parentChilds = [
          ["link", "resourceDestinationString"],
          ["definition", "definitionDestinationString"]
        ];
        for (const [parentType, definitionType] of parentChilds) {
          const links = filterByTypes(micromarkTokens, [parentType]);
          for (const link of links) {
            const definitions = filterByTypes(link.children, [definitionType]);
            for (const definition of definitions) {
              const { endColumn, startColumn } = definition;
              const text = unescapeStringTokenText(definition);
              const encodedText = `#${encodeURIComponent(text.slice(1))}`;
              if (text.length > 1 && text.startsWith("#") && !fragments.has(encodedText) && !lineFragmentRe.test(encodedText)) {
                let context = void 0;
                let range = void 0;
                let fixInfo = void 0;
                if (link.startLine === link.endLine) {
                  context = link.text;
                  range = [link.startColumn, link.endColumn - link.startColumn];
                  fixInfo = {
                    "editColumn": startColumn,
                    "deleteCount": endColumn - startColumn
                  };
                }
                const textLower = text.toLowerCase();
                const mixedCaseKey = [...fragments.keys()].find((key) => textLower === key.toLowerCase());
                if (mixedCaseKey) {
                  (fixInfo || {}).insertText = mixedCaseKey;
                  addErrorDetailIf(
                    onError,
                    link.startLine,
                    mixedCaseKey,
                    text,
                    void 0,
                    context,
                    range,
                    fixInfo
                  );
                } else {
                  addError(
                    onError,
                    link.startLine,
                    void 0,
                    context,
                    range
                  );
                }
              }
            }
          }
        }
      }
    };
  }
});

// node_modules/markdownlint/lib/md052.js
var require_md052 = __commonJS({
  "node_modules/markdownlint/lib/md052.js"(exports2, module2) {
    "use strict";
    var { addError } = require_helpers();
    var { referenceLinkImageData } = require_cache();
    module2.exports = {
      "names": ["MD052", "reference-links-images"],
      "description": "Reference links and images should use a label that is defined",
      "tags": ["images", "links"],
      "parser": "none",
      "function": function MD052(params, onError) {
        const { config, lines } = params;
        const shortcutSyntax = config.shortcut_syntax || false;
        const { definitions, references, shortcuts } = referenceLinkImageData();
        const entries = shortcutSyntax ? [...references.entries(), ...shortcuts.entries()] : references.entries();
        for (const reference of entries) {
          const [label, datas] = reference;
          if (!definitions.has(label)) {
            for (const data of datas) {
              const [lineIndex, index, length] = data;
              const context = lines[lineIndex].slice(index, index + length);
              addError(
                onError,
                lineIndex + 1,
                `Missing link or image reference definition: "${label}"`,
                context,
                [index + 1, context.length]
              );
            }
          }
        }
      }
    };
  }
});

// node_modules/markdownlint/lib/md053.js
var require_md053 = __commonJS({
  "node_modules/markdownlint/lib/md053.js"(exports2, module2) {
    "use strict";
    var { addError, ellipsify, linkReferenceDefinitionRe } = require_helpers();
    var { referenceLinkImageData } = require_cache();
    module2.exports = {
      "names": ["MD053", "link-image-reference-definitions"],
      "description": "Link and image reference definitions should be needed",
      "tags": ["images", "links"],
      "parser": "none",
      "function": function MD053(params, onError) {
        const ignored = new Set(params.config.ignored_definitions || ["//"]);
        const lines = params.lines;
        const { references, shortcuts, definitions, duplicateDefinitions } = referenceLinkImageData();
        const singleLineDefinition = (line) => line.replace(linkReferenceDefinitionRe, "").trim().length > 0;
        const deleteFixInfo = {
          "deleteCount": -1
        };
        for (const definition of definitions.entries()) {
          const [label, [lineIndex]] = definition;
          if (!ignored.has(label) && !references.has(label) && !shortcuts.has(label)) {
            const line = lines[lineIndex];
            addError(
              onError,
              lineIndex + 1,
              `Unused link or image reference definition: "${label}"`,
              ellipsify(line),
              [1, line.length],
              singleLineDefinition(line) ? deleteFixInfo : 0
            );
          }
        }
        for (const duplicateDefinition of duplicateDefinitions) {
          const [label, lineIndex] = duplicateDefinition;
          if (!ignored.has(label)) {
            const line = lines[lineIndex];
            addError(
              onError,
              lineIndex + 1,
              `Duplicate link or image reference definition: "${label}"`,
              ellipsify(line),
              [1, line.length],
              singleLineDefinition(line) ? deleteFixInfo : 0
            );
          }
        }
      }
    };
  }
});

// node_modules/markdownlint/lib/md054.js
var require_md054 = __commonJS({
  "node_modules/markdownlint/lib/md054.js"(exports2, module2) {
    "use strict";
    var { addErrorContext, nextLinesRe } = require_helpers();
    var { filterByTypes, filterByPredicate, getTokenTextByType } = require_micromark2();
    var { referenceLinkImageData } = require_cache();
    var backslashEscapeRe = /\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g;
    var removeBackslashEscapes = (text) => text.replace(backslashEscapeRe, "$1");
    var autolinkDisallowedRe = /[ <>]/;
    var autolinkAble = (destination) => {
      try {
        new URL(destination);
      } catch {
        return false;
      }
      return !autolinkDisallowedRe.test(destination);
    };
    module2.exports = {
      "names": ["MD054", "link-image-style"],
      "description": "Link and image style",
      "tags": ["images", "links"],
      "parser": "micromark",
      "function": (params, onError) => {
        const config = params.config;
        const autolink = config.autolink === void 0 || !!config.autolink;
        const inline = config.inline === void 0 || !!config.inline;
        const full = config.full === void 0 || !!config.full;
        const collapsed = config.collapsed === void 0 || !!config.collapsed;
        const shortcut = config.shortcut === void 0 || !!config.shortcut;
        const urlInline = config.url_inline === void 0 || !!config.url_inline;
        if (autolink && inline && full && collapsed && shortcut && urlInline) {
          return;
        }
        const micromarkTokens = (
          // @ts-ignore
          params.parsers.micromark.tokens
        );
        const { definitions } = referenceLinkImageData();
        const links = filterByTypes(micromarkTokens, ["autolink", "image", "link"]);
        for (const link of links) {
          let label = null;
          let destination = null;
          const {
            children,
            endColumn,
            endLine,
            startColumn,
            startLine,
            text,
            type
          } = link;
          const image = type === "image";
          let isError = false;
          if (type === "autolink") {
            destination = getTokenTextByType(children, "autolinkProtocol");
            label = destination;
            isError = !autolink;
          } else {
            const descendents = filterByPredicate(children);
            label = getTokenTextByType(descendents, "labelText");
            destination = getTokenTextByType(descendents, "resourceDestinationString");
            if (destination) {
              const title = getTokenTextByType(descendents, "resourceTitleString");
              isError = !inline || !urlInline && autolink && !image && !title && label === destination && autolinkAble(destination);
            } else {
              const isShortcut = !children.some((t) => t.type === "reference");
              const referenceString = getTokenTextByType(descendents, "referenceString");
              const isCollapsed = referenceString === null;
              const definition = definitions.get(referenceString || label);
              destination = definition && definition[1];
              isError = destination && (isShortcut ? !shortcut : isCollapsed ? !collapsed : !full);
            }
          }
          if (isError) {
            let range = null;
            let fixInfo = null;
            if (startLine === endLine) {
              range = [startColumn, endColumn - startColumn];
              let insertText = null;
              const canInline = inline && label;
              const canAutolink = autolink && !image && autolinkAble(destination);
              if (canInline && (urlInline || !canAutolink)) {
                const prefix = image ? "!" : "";
                const escapedLabel = label.replace(/[[\]]/g, "\\$&");
                const escapedDestination = destination.replace(/[()]/g, "\\$&");
                insertText = `${prefix}[${escapedLabel}](${escapedDestination})`;
              } else if (canAutolink) {
                insertText = `<${removeBackslashEscapes(destination)}>`;
              }
              if (insertText) {
                fixInfo = {
                  "editColumn": range[0],
                  insertText,
                  "deleteCount": range[1]
                };
              }
            }
            addErrorContext(
              onError,
              startLine,
              text.replace(nextLinesRe, ""),
              null,
              null,
              range,
              fixInfo
            );
          }
        }
      }
    };
  }
});

// node_modules/markdownlint/lib/md055.js
var require_md055 = __commonJS({
  "node_modules/markdownlint/lib/md055.js"(exports2, module2) {
    "use strict";
    var { addErrorDetailIf } = require_helpers();
    var { filterByTypes } = require_micromark2();
    var whitespaceTypes = /* @__PURE__ */ new Set(["linePrefix", "whitespace"]);
    var ignoreWhitespace = (tokens) => tokens.filter(
      (token) => !whitespaceTypes.has(token.type)
    );
    var firstOrNothing = (items) => items[0];
    var lastOrNothing = (items) => items[items.length - 1];
    var makeRange = (start, end) => [start, end - start + 1];
    module2.exports = {
      "names": ["MD055", "table-pipe-style"],
      "description": "Table pipe style",
      "tags": ["table"],
      "parser": "micromark",
      "function": function MD055(params, onError) {
        const style = String(params.config.style || "consistent");
        let expectedStyle = style;
        let expectedLeadingPipe = expectedStyle !== "no_leading_or_trailing" && expectedStyle !== "trailing_only";
        let expectedTrailingPipe = expectedStyle !== "no_leading_or_trailing" && expectedStyle !== "leading_only";
        const micromarkTokens = (
          // @ts-ignore
          params.parsers.micromark.tokens
        );
        const tables = filterByTypes(micromarkTokens, ["table"]);
        for (const table of tables) {
          const rows = filterByTypes(table.children, ["tableDelimiterRow", "tableRow"]);
          for (const row of rows) {
            const firstCell = firstOrNothing(row.children);
            const leadingToken = firstOrNothing(ignoreWhitespace(firstCell.children));
            const actualLeadingPipe = leadingToken.type === "tableCellDivider";
            const lastCell = lastOrNothing(row.children);
            const trailingToken = lastOrNothing(ignoreWhitespace(lastCell.children));
            const actualTrailingPipe = trailingToken.type === "tableCellDivider";
            const actualStyle = actualLeadingPipe ? actualTrailingPipe ? "leading_and_trailing" : "leading_only" : actualTrailingPipe ? "trailing_only" : "no_leading_or_trailing";
            if (expectedStyle === "consistent") {
              expectedStyle = actualStyle;
              expectedLeadingPipe = actualLeadingPipe;
              expectedTrailingPipe = actualTrailingPipe;
            }
            if (actualLeadingPipe !== expectedLeadingPipe) {
              addErrorDetailIf(
                onError,
                firstCell.startLine,
                expectedStyle,
                actualStyle,
                `${expectedLeadingPipe ? "Missing" : "Unexpected"} leading pipe`,
                void 0,
                makeRange(row.startColumn, firstCell.startColumn)
              );
            }
            if (actualTrailingPipe !== expectedTrailingPipe) {
              addErrorDetailIf(
                onError,
                lastCell.endLine,
                expectedStyle,
                actualStyle,
                `${expectedTrailingPipe ? "Missing" : "Unexpected"} trailing pipe`,
                void 0,
                makeRange(lastCell.endColumn - 1, row.endColumn - 1)
              );
            }
          }
        }
      }
    };
  }
});

// node_modules/markdownlint/lib/md056.js
var require_md056 = __commonJS({
  "node_modules/markdownlint/lib/md056.js"(exports2, module2) {
    "use strict";
    var { addErrorDetailIf } = require_helpers();
    var { filterByTypes } = require_micromark2();
    var makeRange = (start, end) => [start, end - start + 1];
    module2.exports = {
      "names": ["MD056", "table-column-count"],
      "description": "Table column count",
      "tags": ["table"],
      "parser": "micromark",
      "function": function MD056(params, onError) {
        const micromarkTokens = (
          // @ts-ignore
          params.parsers.micromark.tokens
        );
        const tables = filterByTypes(micromarkTokens, ["table"]);
        for (const table of tables) {
          const rows = filterByTypes(table.children, ["tableDelimiterRow", "tableRow"]);
          let expectedCount = 0;
          for (const row of rows) {
            const cells = filterByTypes(row.children, ["tableData", "tableDelimiter", "tableHeader"]);
            const actualCount = cells.length;
            expectedCount ||= actualCount;
            let detail = null;
            let range = null;
            if (actualCount < expectedCount) {
              detail = "Too few cells, row will be missing data";
              range = [row.endColumn - 1, 1];
            } else if (expectedCount < actualCount) {
              detail = "Too many cells, extra data will be missing";
              range = makeRange(cells[expectedCount].startColumn, row.endColumn - 1);
            }
            addErrorDetailIf(
              onError,
              row.endLine,
              expectedCount,
              actualCount,
              detail,
              null,
              range
            );
          }
        }
      }
    };
  }
});

// node_modules/markdownlint/lib/rules.js
var require_rules = __commonJS({
  "node_modules/markdownlint/lib/rules.js"(exports2, module2) {
    "use strict";
    var { homepage, version } = require_constants();
    var rules = [
      require_md001(),
      // md002: Deprecated and removed
      require_md003(),
      require_md004(),
      require_md005(),
      // md006: Deprecated and removed
      require_md007(),
      require_md009(),
      require_md010(),
      require_md011(),
      require_md012(),
      require_md013(),
      require_md014(),
      require_md018(),
      require_md019(),
      require_md020(),
      require_md021(),
      require_md022(),
      require_md023(),
      require_md024(),
      require_md025(),
      require_md026(),
      require_md027(),
      require_md028(),
      require_md029(),
      require_md030(),
      require_md031(),
      require_md032(),
      require_md033(),
      require_md034(),
      require_md035(),
      require_md036(),
      require_md037(),
      require_md038(),
      require_md039(),
      require_md040(),
      require_md041(),
      require_md042(),
      require_md043(),
      require_md044(),
      require_md045(),
      require_md046(),
      require_md047(),
      require_md048(),
      ...require_md049_md050(),
      require_md051(),
      require_md052(),
      require_md053(),
      require_md054(),
      require_md055(),
      require_md056()
      // md057: See https://github.com/markdownlint/markdownlint
    ];
    for (const rule of rules) {
      const name = rule.names[0].toLowerCase();
      rule["information"] = new URL(`${homepage}/blob/v${version}/doc/${name}.md`);
    }
    module2.exports = rules;
  }
});

// node_modules/markdownlint/lib/markdownlint.js
var require_markdownlint = __commonJS({
  "node_modules/markdownlint/lib/markdownlint.js"(exports2, module2) {
    "use strict";
    var path = require("node:path");
    var { promisify } = require("node:util");
    var markdownit = require_index_cjs4();
    var micromark = require_micromark2();
    var rules = require_rules();
    var helpers = require_helpers();
    var cache = require_cache();
    var dynamicRequire = typeof __non_webpack_require__ === "undefined" ? require : (
      /* c8 ignore next */
      __non_webpack_require__
    );
    function validateRuleList(ruleList, synchronous) {
      let result = null;
      if (ruleList.length === rules.length) {
        return result;
      }
      const allIds = {};
      for (const [index, rule] of ruleList.entries()) {
        let newError = function(property, value) {
          return new Error(
            `Property '${property}' of custom rule at index ${customIndex} is incorrect: '${value}'.`
          );
        };
        const customIndex = index - rules.length;
        for (const property of ["names", "tags"]) {
          const value = rule[property];
          if (!result && (!value || !Array.isArray(value) || value.length === 0 || !value.every(helpers.isString) || value.some(helpers.isEmptyString))) {
            result = newError(property, value);
          }
        }
        for (const propertyInfo of [
          ["description", "string"],
          ["function", "function"]
        ]) {
          const property = propertyInfo[0];
          const value = rule[property];
          if (!result && (!value || typeof value !== propertyInfo[1])) {
            result = newError(property, value);
          }
        }
        if (!result && rule.parser !== void 0 && rule.parser !== "markdownit" && !(customIndex < 0 && rule.parser === "micromark") && rule.parser !== "none") {
          result = newError("parser", rule.parser);
        }
        if (!result && rule.information && !helpers.isUrl(rule.information)) {
          result = newError("information", rule.information);
        }
        if (!result && rule.asynchronous !== void 0 && typeof rule.asynchronous !== "boolean") {
          result = newError("asynchronous", rule.asynchronous);
        }
        if (!result && rule.asynchronous && synchronous) {
          result = new Error(
            "Custom rule " + rule.names.join("/") + " at index " + customIndex + " is asynchronous and can not be used in a synchronous context."
          );
        }
        if (!result) {
          for (const name of rule.names) {
            const nameUpper = name.toUpperCase();
            if (!result && allIds[nameUpper] !== void 0) {
              result = new Error("Name '" + name + "' of custom rule at index " + customIndex + " is already used as a name or tag.");
            }
            allIds[nameUpper] = true;
          }
          for (const tag of rule.tags) {
            const tagUpper = tag.toUpperCase();
            if (!result && allIds[tagUpper]) {
              result = new Error("Tag '" + tag + "' of custom rule at index " + customIndex + " is already used as a name.");
            }
            allIds[tagUpper] = false;
          }
        }
      }
      return result;
    }
    function newResults(ruleList) {
      const lintResults = {};
      function toString(useAlias) {
        let ruleNameToRule = null;
        const results = [];
        const keys = Object.keys(lintResults);
        keys.sort();
        for (const file of keys) {
          const fileResults = lintResults[file];
          if (Array.isArray(fileResults)) {
            for (const result of fileResults) {
              const ruleMoniker = result.ruleNames ? result.ruleNames.join("/") : result.ruleName + "/" + result.ruleAlias;
              results.push(
                file + ": " + result.lineNumber + ": " + ruleMoniker + " " + result.ruleDescription + (result.errorDetail ? " [" + result.errorDetail + "]" : "") + (result.errorContext ? ' [Context: "' + result.errorContext + '"]' : "")
              );
            }
          } else {
            if (!ruleNameToRule) {
              ruleNameToRule = {};
              for (const rule of ruleList) {
                const ruleName = rule.names[0].toUpperCase();
                ruleNameToRule[ruleName] = rule;
              }
            }
            for (const [ruleName, ruleResults] of Object.entries(fileResults)) {
              const rule = ruleNameToRule[ruleName.toUpperCase()];
              for (const lineNumber of ruleResults) {
                const nameIndex = Math.min(useAlias ? 1 : 0, rule.names.length - 1);
                const result = file + ": " + lineNumber + ": " + // @ts-ignore
                rule.names[nameIndex] + " " + // @ts-ignore
                rule.description;
                results.push(result);
              }
            }
          }
        }
        return results.join("\n");
      }
      Object.defineProperty(lintResults, "toString", { "value": toString });
      return lintResults;
    }
    function removeFrontMatter(content, frontMatter) {
      let frontMatterLines = [];
      if (frontMatter) {
        const frontMatterMatch = content.match(frontMatter);
        if (frontMatterMatch && !frontMatterMatch.index) {
          const contentMatched = frontMatterMatch[0];
          content = content.slice(contentMatched.length);
          frontMatterLines = contentMatched.split(helpers.newLineRe);
          if (frontMatterLines.length > 0 && frontMatterLines[frontMatterLines.length - 1] === "") {
            frontMatterLines.length--;
          }
        }
      }
      return {
        "content": content,
        "frontMatterLines": frontMatterLines
      };
    }
    function freezeToken(token) {
      if (token.attrs) {
        for (const attr of token.attrs) {
          Object.freeze(attr);
        }
        Object.freeze(token.attrs);
      }
      if (token.children) {
        for (const child of token.children) {
          freezeToken(child);
        }
        Object.freeze(token.children);
      }
      if (token.map) {
        Object.freeze(token.map);
      }
      Object.freeze(token);
    }
    function annotateAndFreezeTokens(tokens, lines) {
      let trMap = null;
      for (const token of tokens) {
        if (token.type === "tr_open") {
          trMap = token.map;
        } else if (token.type === "tr_close") {
          trMap = null;
        }
        if (!token.map && trMap) {
          token.map = [...trMap];
        }
        if (token.map) {
          token.line = lines[token.map[0]];
          token.lineNumber = token.map[0] + 1;
          while (token.map[1] && !(lines[token.map[1] - 1] || "").trim()) {
            token.map[1]--;
          }
        }
        if (token.children) {
          const codeSpanExtraLines = [];
          if (token.children.some((child) => child.type === "code_inline")) {
            helpers.forEachInlineCodeSpan(token.content, (code) => {
              codeSpanExtraLines.push(code.split(helpers.newLineRe).length - 1);
            });
          }
          let lineNumber = token.lineNumber;
          for (const child of token.children) {
            child.lineNumber = lineNumber;
            child.line = lines[lineNumber - 1];
            if (child.type === "softbreak" || child.type === "hardbreak") {
              lineNumber++;
            } else if (child.type === "code_inline") {
              lineNumber += codeSpanExtraLines.shift();
            }
          }
        }
        freezeToken(token);
      }
      Object.freeze(tokens);
    }
    function mapAliasToRuleNames(ruleList) {
      const aliasToRuleNames = {};
      for (const rule of ruleList) {
        const ruleName = rule.names[0].toUpperCase();
        for (const name of rule.names) {
          const nameUpper = name.toUpperCase();
          aliasToRuleNames[nameUpper] = [ruleName];
        }
        for (const tag of rule.tags) {
          const tagUpper = tag.toUpperCase();
          const ruleNames = aliasToRuleNames[tagUpper] || [];
          ruleNames.push(ruleName);
          aliasToRuleNames[tagUpper] = ruleNames;
        }
      }
      return aliasToRuleNames;
    }
    function getEffectiveConfig(ruleList, config, aliasToRuleNames) {
      const defaultKey = Object.keys(config).filter(
        (key) => key.toUpperCase() === "DEFAULT"
      );
      const ruleDefault = defaultKey.length === 0 || !!config[defaultKey[0]];
      const effectiveConfig = {};
      for (const rule of ruleList) {
        const ruleName = rule.names[0].toUpperCase();
        effectiveConfig[ruleName] = ruleDefault;
      }
      for (const key of Object.keys(config)) {
        let value = config[key];
        if (value) {
          if (!(value instanceof Object)) {
            value = {};
          }
        } else {
          value = false;
        }
        const keyUpper = key.toUpperCase();
        for (const ruleName of aliasToRuleNames[keyUpper] || []) {
          effectiveConfig[ruleName] = value;
        }
      }
      return effectiveConfig;
    }
    function parseConfiguration(name, content, parsers) {
      let config = null;
      let message = "";
      const errors2 = [];
      let index = 0;
      (parsers || [JSON.parse]).every((parser) => {
        try {
          config = parser(content);
        } catch (error2) {
          errors2.push(`Parser ${index++}: ${error2.message}`);
        }
        return !config;
      });
      if (!config) {
        errors2.unshift(`Unable to parse '${name}'`);
        message = errors2.join("; ");
      }
      return {
        config,
        message
      };
    }
    function getEnabledRulesPerLineNumber(ruleList, lines, frontMatterLines, noInlineConfig, config, configParsers, aliasToRuleNames) {
      let enabledRules = {};
      let capturedRules = {};
      const allRuleNames = [];
      const enabledRulesPerLineNumber = new Array(1 + frontMatterLines.length);
      function handleInlineConfig(input, forEachMatch, forEachLine) {
        for (const [lineIndex, line] of input.entries()) {
          if (!noInlineConfig) {
            let match = null;
            while (match = helpers.inlineCommentStartRe.exec(line)) {
              const action = match[2].toUpperCase();
              const startIndex = match.index + match[1].length;
              const endIndex = line.indexOf("-->", startIndex);
              if (endIndex === -1) {
                break;
              }
              const parameter = line.slice(startIndex, endIndex);
              forEachMatch(action, parameter, lineIndex + 1);
            }
          }
          if (forEachLine) {
            forEachLine();
          }
        }
      }
      function configureFile(action, parameter) {
        if (action === "CONFIGURE-FILE") {
          const { "config": parsed } = parseConfiguration(
            "CONFIGURE-FILE",
            parameter,
            configParsers
          );
          if (parsed) {
            config = {
              ...config,
              ...parsed
            };
          }
        }
      }
      function applyEnableDisable(action, parameter, state) {
        state = { ...state };
        const enabled = action.startsWith("ENABLE");
        const trimmed = parameter && parameter.trim();
        const items = trimmed ? trimmed.toUpperCase().split(/\s+/) : allRuleNames;
        for (const nameUpper of items) {
          for (const ruleName of aliasToRuleNames[nameUpper] || []) {
            state[ruleName] = enabled;
          }
        }
        return state;
      }
      function enableDisableFile(action, parameter) {
        if (action === "ENABLE-FILE" || action === "DISABLE-FILE") {
          enabledRules = applyEnableDisable(action, parameter, enabledRules);
        }
      }
      function captureRestoreEnableDisable(action, parameter) {
        if (action === "CAPTURE") {
          capturedRules = enabledRules;
        } else if (action === "RESTORE") {
          enabledRules = capturedRules;
        } else if (action === "ENABLE" || action === "DISABLE") {
          enabledRules = applyEnableDisable(action, parameter, enabledRules);
        }
      }
      function updateLineState() {
        enabledRulesPerLineNumber.push(enabledRules);
      }
      function disableLineNextLine(action, parameter, lineNumber) {
        const disableLine = action === "DISABLE-LINE";
        const disableNextLine = action === "DISABLE-NEXT-LINE";
        if (disableLine || disableNextLine) {
          const nextLineNumber = frontMatterLines.length + lineNumber + (disableNextLine ? 1 : 0);
          enabledRulesPerLineNumber[nextLineNumber] = applyEnableDisable(
            action,
            parameter,
            enabledRulesPerLineNumber[nextLineNumber]
          );
        }
      }
      handleInlineConfig([lines.join("\n")], configureFile);
      const effectiveConfig = getEffectiveConfig(
        ruleList,
        config,
        aliasToRuleNames
      );
      for (const rule of ruleList) {
        const ruleName = rule.names[0].toUpperCase();
        allRuleNames.push(ruleName);
        enabledRules[ruleName] = !!effectiveConfig[ruleName];
      }
      capturedRules = enabledRules;
      handleInlineConfig(lines, enableDisableFile);
      handleInlineConfig(lines, captureRestoreEnableDisable, updateLineState);
      handleInlineConfig(lines, disableLineNextLine);
      return {
        effectiveConfig,
        enabledRulesPerLineNumber
      };
    }
    function lintContent(ruleList, aliasToRuleNames, name, content, md, config, configParsers, frontMatter, handleRuleFailures, noInlineConfig, resultVersion, callback) {
      content = content.replace(/^\uFEFF/, "");
      const removeFrontMatterResult = removeFrontMatter(content, frontMatter);
      const { frontMatterLines } = removeFrontMatterResult;
      content = removeFrontMatterResult.content;
      const { effectiveConfig, enabledRulesPerLineNumber } = getEnabledRulesPerLineNumber(
        ruleList,
        content.split(helpers.newLineRe),
        frontMatterLines,
        noInlineConfig,
        config,
        configParsers,
        aliasToRuleNames
      );
      const markdownitTokens = md.parse(content, {});
      const micromarkTokens = micromark.parse(content);
      content = helpers.clearHtmlCommentText(content);
      const lines = content.split(helpers.newLineRe);
      annotateAndFreezeTokens(markdownitTokens, lines);
      const parsersMarkdownIt = Object.freeze({
        "markdownit": Object.freeze({
          "tokens": markdownitTokens
        })
      });
      const parsersMicromark = Object.freeze({
        "micromark": Object.freeze({
          "tokens": micromarkTokens
        })
      });
      const parsersNone = Object.freeze({});
      const paramsBase = {
        name,
        "parsers": parsersMarkdownIt,
        "lines": Object.freeze(lines),
        "frontMatterLines": Object.freeze(frontMatterLines)
      };
      const lineMetadata = helpers.getLineMetadata(paramsBase);
      const codeBlockAndSpanRanges = helpers.codeBlockAndSpanRanges(paramsBase, lineMetadata);
      const flattenedLists = helpers.flattenLists(markdownitTokens);
      const referenceLinkImageData = helpers.getReferenceLinkImageData(micromarkTokens);
      cache.set({
        codeBlockAndSpanRanges,
        flattenedLists,
        lineMetadata,
        referenceLinkImageData
      });
      let results = [];
      const forRule = (rule) => {
        const ruleName = rule.names[0].toUpperCase();
        const tokens = {};
        let parsers = parsersNone;
        if (rule.parser === void 0) {
          tokens.tokens = markdownitTokens;
          parsers = parsersMarkdownIt;
        } else if (rule.parser === "markdownit") {
          parsers = parsersMarkdownIt;
        } else if (rule.parser === "micromark") {
          parsers = parsersMicromark;
        }
        const params = {
          ...paramsBase,
          ...tokens,
          parsers,
          "config": effectiveConfig[ruleName]
        };
        function throwError(property) {
          throw new Error(
            `Value of '${property}' passed to onError by '${ruleName}' is incorrect for '${name}'.`
          );
        }
        function onError(errorInfo) {
          if (!errorInfo || !helpers.isNumber(errorInfo.lineNumber) || errorInfo.lineNumber < 1 || errorInfo.lineNumber > lines.length) {
            throwError("lineNumber");
          }
          const lineNumber = errorInfo.lineNumber + frontMatterLines.length;
          if (!enabledRulesPerLineNumber[lineNumber][ruleName]) {
            return;
          }
          if (errorInfo.detail && !helpers.isString(errorInfo.detail)) {
            throwError("detail");
          }
          if (errorInfo.context && !helpers.isString(errorInfo.context)) {
            throwError("context");
          }
          if (errorInfo.information && !helpers.isUrl(errorInfo.information)) {
            throwError("information");
          }
          if (errorInfo.range && (!Array.isArray(errorInfo.range) || errorInfo.range.length !== 2 || !helpers.isNumber(errorInfo.range[0]) || errorInfo.range[0] < 1 || !helpers.isNumber(errorInfo.range[1]) || errorInfo.range[1] < 1 || errorInfo.range[0] + errorInfo.range[1] - 1 > lines[errorInfo.lineNumber - 1].length)) {
            throwError("range");
          }
          const fixInfo = errorInfo.fixInfo;
          const cleanFixInfo = {};
          if (fixInfo) {
            if (!helpers.isObject(fixInfo)) {
              throwError("fixInfo");
            }
            if (fixInfo.lineNumber !== void 0) {
              if (!helpers.isNumber(fixInfo.lineNumber) || fixInfo.lineNumber < 1 || fixInfo.lineNumber > lines.length) {
                throwError("fixInfo.lineNumber");
              }
              cleanFixInfo.lineNumber = fixInfo.lineNumber + frontMatterLines.length;
            }
            const effectiveLineNumber = fixInfo.lineNumber || errorInfo.lineNumber;
            if (fixInfo.editColumn !== void 0) {
              if (!helpers.isNumber(fixInfo.editColumn) || fixInfo.editColumn < 1 || fixInfo.editColumn > lines[effectiveLineNumber - 1].length + 1) {
                throwError("fixInfo.editColumn");
              }
              cleanFixInfo.editColumn = fixInfo.editColumn;
            }
            if (fixInfo.deleteCount !== void 0) {
              if (!helpers.isNumber(fixInfo.deleteCount) || fixInfo.deleteCount < -1 || fixInfo.deleteCount > lines[effectiveLineNumber - 1].length) {
                throwError("fixInfo.deleteCount");
              }
              cleanFixInfo.deleteCount = fixInfo.deleteCount;
            }
            if (fixInfo.insertText !== void 0) {
              if (!helpers.isString(fixInfo.insertText)) {
                throwError("fixInfo.insertText");
              }
              cleanFixInfo.insertText = fixInfo.insertText;
            }
          }
          const information = errorInfo.information || rule.information;
          results.push({
            lineNumber,
            "ruleName": rule.names[0],
            "ruleNames": rule.names,
            "ruleDescription": rule.description,
            "ruleInformation": information ? information.href : null,
            "errorDetail": errorInfo.detail || null,
            "errorContext": errorInfo.context || null,
            "errorRange": errorInfo.range ? [...errorInfo.range] : null,
            "fixInfo": fixInfo ? cleanFixInfo : null
          });
        }
        const catchCallsOnError = (error2) => onError({
          "lineNumber": 1,
          "detail": `This rule threw an exception: ${error2.message || error2}`
        });
        const invokeRuleFunction = () => rule.function(params, onError);
        if (rule.asynchronous) {
          const ruleFunctionPromise = Promise.resolve().then(invokeRuleFunction);
          return handleRuleFailures ? ruleFunctionPromise.catch(catchCallsOnError) : ruleFunctionPromise;
        }
        try {
          invokeRuleFunction();
        } catch (error2) {
          if (handleRuleFailures) {
            catchCallsOnError(error2);
          } else {
            throw error2;
          }
        }
        return null;
      };
      function formatResults() {
        results.sort((a, b) => a.ruleName.localeCompare(b.ruleName) || a.lineNumber - b.lineNumber);
        if (resultVersion < 3) {
          const noPrevious = {
            "ruleName": null,
            "lineNumber": -1
          };
          results = results.filter((error2, index, array) => {
            delete error2.fixInfo;
            const previous = array[index - 1] || noPrevious;
            return error2.ruleName !== previous.ruleName || error2.lineNumber !== previous.lineNumber;
          });
        }
        if (resultVersion === 0) {
          const dictionary = {};
          for (const error2 of results) {
            const ruleLines = dictionary[error2.ruleName] || [];
            ruleLines.push(error2.lineNumber);
            dictionary[error2.ruleName] = ruleLines;
          }
          results = dictionary;
        } else if (resultVersion === 1) {
          for (const error2 of results) {
            error2.ruleAlias = error2.ruleNames[1] || error2.ruleName;
            delete error2.ruleNames;
          }
        } else {
          for (const error2 of results) {
            delete error2.ruleName;
          }
        }
        return results;
      }
      const ruleListAsync = ruleList.filter((rule) => rule.asynchronous);
      const ruleListSync = ruleList.filter((rule) => !rule.asynchronous);
      const ruleListAsyncFirst = [
        ...ruleListAsync,
        ...ruleListSync
      ];
      const callbackSuccess = () => callback(null, formatResults());
      const callbackError = (error2) => callback(error2 instanceof Error ? error2 : new Error(error2));
      try {
        const ruleResults = ruleListAsyncFirst.map(forRule);
        if (ruleListAsync.length > 0) {
          Promise.all(ruleResults.slice(0, ruleListAsync.length)).then(callbackSuccess).catch(callbackError);
        } else {
          callbackSuccess();
        }
      } catch (error2) {
        callbackError(error2);
      } finally {
        cache.clear();
      }
    }
    function lintFile(ruleList, aliasToRuleNames, file, md, config, configParsers, frontMatter, handleRuleFailures, noInlineConfig, resultVersion, fs2, synchronous, callback) {
      function lintContentWrapper(err, content) {
        if (err) {
          return callback(err);
        }
        return lintContent(
          ruleList,
          aliasToRuleNames,
          file,
          content,
          md,
          config,
          configParsers,
          frontMatter,
          handleRuleFailures,
          noInlineConfig,
          resultVersion,
          callback
        );
      }
      if (synchronous) {
        lintContentWrapper(null, fs2.readFileSync(file, "utf8"));
      } else {
        fs2.readFile(file, "utf8", lintContentWrapper);
      }
    }
    function lintInput(options, synchronous, callback) {
      options = options || {};
      callback = callback || function noop() {
      };
      const customRuleList = [options.customRules || []].flat().map((rule) => ({
        "names": helpers.cloneIfArray(rule.names),
        "description": rule.description,
        "information": helpers.cloneIfUrl(rule.information),
        "tags": helpers.cloneIfArray(rule.tags),
        "parser": rule.parser,
        "asynchronous": rule.asynchronous,
        "function": rule.function
      }));
      const ruleList = rules.concat(customRuleList);
      const ruleErr = validateRuleList(ruleList, synchronous);
      if (ruleErr) {
        callback(ruleErr);
        return;
      }
      let files = [];
      if (Array.isArray(options.files)) {
        files = [...options.files];
      } else if (options.files) {
        files = [String(options.files)];
      }
      const strings = options.strings || {};
      const stringsKeys = Object.keys(strings);
      const config = options.config || { "default": true };
      const configParsers = options.configParsers || null;
      const frontMatter = options.frontMatter === void 0 ? helpers.frontMatterRe : options.frontMatter;
      const handleRuleFailures = !!options.handleRuleFailures;
      const noInlineConfig = !!options.noInlineConfig;
      const resultVersion = options.resultVersion === void 0 ? 3 : options.resultVersion;
      const md = markdownit({ "html": true });
      const markdownItPlugins = options.markdownItPlugins || [];
      for (const plugin of markdownItPlugins) {
        md.use(...plugin);
      }
      const fs2 = options.fs || require("node:fs");
      const aliasToRuleNames = mapAliasToRuleNames(ruleList);
      const results = newResults(ruleList);
      let done = false;
      let concurrency = 0;
      function lintWorker() {
        let currentItem = null;
        function lintWorkerCallback(err, result) {
          concurrency--;
          if (err) {
            done = true;
            return callback(err);
          }
          results[currentItem] = result;
          if (!synchronous) {
            lintWorker();
          }
          return null;
        }
        if (done) {
        } else if (files.length > 0) {
          concurrency++;
          currentItem = files.shift();
          lintFile(
            ruleList,
            aliasToRuleNames,
            currentItem,
            md,
            config,
            configParsers,
            frontMatter,
            handleRuleFailures,
            noInlineConfig,
            resultVersion,
            fs2,
            synchronous,
            lintWorkerCallback
          );
        } else if (currentItem = stringsKeys.shift()) {
          concurrency++;
          lintContent(
            ruleList,
            aliasToRuleNames,
            currentItem,
            strings[currentItem] || "",
            md,
            config,
            configParsers,
            frontMatter,
            handleRuleFailures,
            noInlineConfig,
            resultVersion,
            lintWorkerCallback
          );
        } else if (concurrency === 0) {
          done = true;
          return callback(null, results);
        }
        return null;
      }
      if (synchronous) {
        while (!done) {
          lintWorker();
        }
      } else {
        lintWorker();
        lintWorker();
        lintWorker();
        lintWorker();
        lintWorker();
        lintWorker();
        lintWorker();
        lintWorker();
      }
    }
    function markdownlint2(options, callback) {
      return lintInput(options, false, callback);
    }
    var markdownlintPromisify = promisify && promisify(markdownlint2);
    function markdownlintPromise(options) {
      return markdownlintPromisify(options);
    }
    function markdownlintSync(options) {
      let results = null;
      lintInput(options, true, function callback(error2, res) {
        if (error2) {
          throw error2;
        }
        results = res;
      });
      return results;
    }
    function resolveConfigExtends(configFile, referenceId, fs2, callback) {
      const configFileDirname = path.dirname(configFile);
      const resolvedExtendsFile = path.resolve(configFileDirname, referenceId);
      fs2.access(resolvedExtendsFile, (err) => {
        if (err) {
          try {
            return callback(null, dynamicRequire.resolve(
              referenceId,
              { "paths": [configFileDirname] }
            ));
          } catch {
          }
        }
        return callback(null, resolvedExtendsFile);
      });
    }
    function resolveConfigExtendsSync(configFile, referenceId, fs2) {
      const configFileDirname = path.dirname(configFile);
      const resolvedExtendsFile = path.resolve(configFileDirname, referenceId);
      try {
        fs2.accessSync(resolvedExtendsFile);
        return resolvedExtendsFile;
      } catch {
      }
      try {
        return dynamicRequire.resolve(
          referenceId,
          { "paths": [configFileDirname] }
        );
      } catch {
      }
      return resolvedExtendsFile;
    }
    function extendConfig(config, file, parsers, fs2, callback) {
      const configExtends = config.extends;
      if (configExtends) {
        return resolveConfigExtends(
          file,
          helpers.expandTildePath(configExtends, require("node:os")),
          fs2,
          // eslint-disable-next-line no-use-before-define
          (_, resolvedExtends) => readConfig(
            // @ts-ignore
            resolvedExtends,
            parsers,
            fs2,
            (err, extendsConfig) => {
              if (err) {
                return callback(err);
              }
              const result = {
                ...extendsConfig,
                ...config
              };
              delete result.extends;
              return callback(null, result);
            }
          )
        );
      }
      return callback(null, config);
    }
    var extendConfigPromisify = promisify && promisify(extendConfig);
    function extendConfigPromise(config, file, parsers, fs2) {
      return extendConfigPromisify(config, file, parsers, fs2);
    }
    function readConfig(file, parsers, fs2, callback) {
      if (!callback) {
        if (fs2) {
          callback = fs2;
          fs2 = null;
        } else {
          callback = parsers;
          parsers = null;
        }
      }
      if (!fs2) {
        fs2 = require("node:fs");
      }
      file = helpers.expandTildePath(file, require("node:os"));
      fs2.readFile(file, "utf8", (err, content) => {
        if (err) {
          return callback(err);
        }
        const { config, message } = parseConfiguration(file, content, parsers);
        if (!config) {
          return callback(new Error(message));
        }
        return extendConfig(config, file, parsers, fs2, callback);
      });
    }
    var readConfigPromisify = promisify && promisify(readConfig);
    function readConfigPromise(file, parsers, fs2) {
      return readConfigPromisify(file, parsers, fs2);
    }
    function readConfigSync(file, parsers, fs2) {
      if (!fs2) {
        fs2 = require("node:fs");
      }
      const os = require("node:os");
      file = helpers.expandTildePath(file, os);
      const content = fs2.readFileSync(file, "utf8");
      const { config, message } = parseConfiguration(file, content, parsers);
      if (!config) {
        throw new Error(message);
      }
      const configExtends = config.extends;
      if (configExtends) {
        delete config.extends;
        const resolvedExtends = resolveConfigExtendsSync(
          file,
          helpers.expandTildePath(configExtends, os),
          fs2
        );
        return {
          ...readConfigSync(resolvedExtends, parsers, fs2),
          ...config
        };
      }
      return config;
    }
    function getVersion() {
      return require_constants().version;
    }
    markdownlint2.sync = markdownlintSync;
    markdownlint2.readConfig = readConfig;
    markdownlint2.readConfigSync = readConfigSync;
    markdownlint2.getVersion = getVersion;
    markdownlint2.promises = {
      "markdownlint": markdownlintPromise,
      "extendConfig": extendConfigPromise,
      "readConfig": readConfigPromise
    };
    module2.exports = markdownlint2;
  }
});

// server/src/Diagnostic.js
var Diagnostic = class {
  constructor(result) {
    this.range = {
      start: {
        line: result.lineNumber - 1,
        character: 0
      },
      end: {
        character: 999,
        line: result.lineNumber - 1
      }
    };
    this.sevirity = 3;
    this.codeDescription = { href: result.ruleInformation };
    this.source = "toplsp";
    this.message = result.errorDetail;
    this.code = result.ruleNames[0];
    return this;
  }
};

// node_modules/jsonc-parser/lib/esm/impl/scanner.js
function createScanner(text, ignoreTrivia = false) {
  const len = text.length;
  let pos = 0, value = "", tokenOffset = 0, token = 16, lineNumber = 0, lineStartOffset = 0, tokenLineStartOffset = 0, prevTokenLineStartOffset = 0, scanError = 0;
  function scanHexDigits(count, exact) {
    let digits = 0;
    let value2 = 0;
    while (digits < count || !exact) {
      let ch = text.charCodeAt(pos);
      if (ch >= 48 && ch <= 57) {
        value2 = value2 * 16 + ch - 48;
      } else if (ch >= 65 && ch <= 70) {
        value2 = value2 * 16 + ch - 65 + 10;
      } else if (ch >= 97 && ch <= 102) {
        value2 = value2 * 16 + ch - 97 + 10;
      } else {
        break;
      }
      pos++;
      digits++;
    }
    if (digits < count) {
      value2 = -1;
    }
    return value2;
  }
  function setPosition(newPosition) {
    pos = newPosition;
    value = "";
    tokenOffset = 0;
    token = 16;
    scanError = 0;
  }
  function scanNumber() {
    let start = pos;
    if (text.charCodeAt(pos) === 48) {
      pos++;
    } else {
      pos++;
      while (pos < text.length && isDigit(text.charCodeAt(pos))) {
        pos++;
      }
    }
    if (pos < text.length && text.charCodeAt(pos) === 46) {
      pos++;
      if (pos < text.length && isDigit(text.charCodeAt(pos))) {
        pos++;
        while (pos < text.length && isDigit(text.charCodeAt(pos))) {
          pos++;
        }
      } else {
        scanError = 3;
        return text.substring(start, pos);
      }
    }
    let end = pos;
    if (pos < text.length && (text.charCodeAt(pos) === 69 || text.charCodeAt(pos) === 101)) {
      pos++;
      if (pos < text.length && text.charCodeAt(pos) === 43 || text.charCodeAt(pos) === 45) {
        pos++;
      }
      if (pos < text.length && isDigit(text.charCodeAt(pos))) {
        pos++;
        while (pos < text.length && isDigit(text.charCodeAt(pos))) {
          pos++;
        }
        end = pos;
      } else {
        scanError = 3;
      }
    }
    return text.substring(start, end);
  }
  function scanString() {
    let result = "", start = pos;
    while (true) {
      if (pos >= len) {
        result += text.substring(start, pos);
        scanError = 2;
        break;
      }
      const ch = text.charCodeAt(pos);
      if (ch === 34) {
        result += text.substring(start, pos);
        pos++;
        break;
      }
      if (ch === 92) {
        result += text.substring(start, pos);
        pos++;
        if (pos >= len) {
          scanError = 2;
          break;
        }
        const ch2 = text.charCodeAt(pos++);
        switch (ch2) {
          case 34:
            result += '"';
            break;
          case 92:
            result += "\\";
            break;
          case 47:
            result += "/";
            break;
          case 98:
            result += "\b";
            break;
          case 102:
            result += "\f";
            break;
          case 110:
            result += "\n";
            break;
          case 114:
            result += "\r";
            break;
          case 116:
            result += "	";
            break;
          case 117:
            const ch3 = scanHexDigits(4, true);
            if (ch3 >= 0) {
              result += String.fromCharCode(ch3);
            } else {
              scanError = 4;
            }
            break;
          default:
            scanError = 5;
        }
        start = pos;
        continue;
      }
      if (ch >= 0 && ch <= 31) {
        if (isLineBreak(ch)) {
          result += text.substring(start, pos);
          scanError = 2;
          break;
        } else {
          scanError = 6;
        }
      }
      pos++;
    }
    return result;
  }
  function scanNext() {
    value = "";
    scanError = 0;
    tokenOffset = pos;
    lineStartOffset = lineNumber;
    prevTokenLineStartOffset = tokenLineStartOffset;
    if (pos >= len) {
      tokenOffset = len;
      return token = 17;
    }
    let code = text.charCodeAt(pos);
    if (isWhiteSpace(code)) {
      do {
        pos++;
        value += String.fromCharCode(code);
        code = text.charCodeAt(pos);
      } while (isWhiteSpace(code));
      return token = 15;
    }
    if (isLineBreak(code)) {
      pos++;
      value += String.fromCharCode(code);
      if (code === 13 && text.charCodeAt(pos) === 10) {
        pos++;
        value += "\n";
      }
      lineNumber++;
      tokenLineStartOffset = pos;
      return token = 14;
    }
    switch (code) {
      case 123:
        pos++;
        return token = 1;
      case 125:
        pos++;
        return token = 2;
      case 91:
        pos++;
        return token = 3;
      case 93:
        pos++;
        return token = 4;
      case 58:
        pos++;
        return token = 6;
      case 44:
        pos++;
        return token = 5;
      case 34:
        pos++;
        value = scanString();
        return token = 10;
      case 47:
        const start = pos - 1;
        if (text.charCodeAt(pos + 1) === 47) {
          pos += 2;
          while (pos < len) {
            if (isLineBreak(text.charCodeAt(pos))) {
              break;
            }
            pos++;
          }
          value = text.substring(start, pos);
          return token = 12;
        }
        if (text.charCodeAt(pos + 1) === 42) {
          pos += 2;
          const safeLength = len - 1;
          let commentClosed = false;
          while (pos < safeLength) {
            const ch = text.charCodeAt(pos);
            if (ch === 42 && text.charCodeAt(pos + 1) === 47) {
              pos += 2;
              commentClosed = true;
              break;
            }
            pos++;
            if (isLineBreak(ch)) {
              if (ch === 13 && text.charCodeAt(pos) === 10) {
                pos++;
              }
              lineNumber++;
              tokenLineStartOffset = pos;
            }
          }
          if (!commentClosed) {
            pos++;
            scanError = 1;
          }
          value = text.substring(start, pos);
          return token = 13;
        }
        value += String.fromCharCode(code);
        pos++;
        return token = 16;
      case 45:
        value += String.fromCharCode(code);
        pos++;
        if (pos === len || !isDigit(text.charCodeAt(pos))) {
          return token = 16;
        }
      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        value += scanNumber();
        return token = 11;
      default:
        while (pos < len && isUnknownContentCharacter(code)) {
          pos++;
          code = text.charCodeAt(pos);
        }
        if (tokenOffset !== pos) {
          value = text.substring(tokenOffset, pos);
          switch (value) {
            case "true":
              return token = 8;
            case "false":
              return token = 9;
            case "null":
              return token = 7;
          }
          return token = 16;
        }
        value += String.fromCharCode(code);
        pos++;
        return token = 16;
    }
  }
  function isUnknownContentCharacter(code) {
    if (isWhiteSpace(code) || isLineBreak(code)) {
      return false;
    }
    switch (code) {
      case 125:
      case 93:
      case 123:
      case 91:
      case 34:
      case 58:
      case 44:
      case 47:
        return false;
    }
    return true;
  }
  function scanNextNonTrivia() {
    let result;
    do {
      result = scanNext();
    } while (result >= 12 && result <= 15);
    return result;
  }
  return {
    setPosition,
    getPosition: () => pos,
    scan: ignoreTrivia ? scanNextNonTrivia : scanNext,
    getToken: () => token,
    getTokenValue: () => value,
    getTokenOffset: () => tokenOffset,
    getTokenLength: () => pos - tokenOffset,
    getTokenStartLine: () => lineStartOffset,
    getTokenStartCharacter: () => tokenOffset - prevTokenLineStartOffset,
    getTokenError: () => scanError
  };
}
function isWhiteSpace(ch) {
  return ch === 32 || ch === 9;
}
function isLineBreak(ch) {
  return ch === 10 || ch === 13;
}
function isDigit(ch) {
  return ch >= 48 && ch <= 57;
}
var CharacterCodes;
(function(CharacterCodes2) {
  CharacterCodes2[CharacterCodes2["lineFeed"] = 10] = "lineFeed";
  CharacterCodes2[CharacterCodes2["carriageReturn"] = 13] = "carriageReturn";
  CharacterCodes2[CharacterCodes2["space"] = 32] = "space";
  CharacterCodes2[CharacterCodes2["_0"] = 48] = "_0";
  CharacterCodes2[CharacterCodes2["_1"] = 49] = "_1";
  CharacterCodes2[CharacterCodes2["_2"] = 50] = "_2";
  CharacterCodes2[CharacterCodes2["_3"] = 51] = "_3";
  CharacterCodes2[CharacterCodes2["_4"] = 52] = "_4";
  CharacterCodes2[CharacterCodes2["_5"] = 53] = "_5";
  CharacterCodes2[CharacterCodes2["_6"] = 54] = "_6";
  CharacterCodes2[CharacterCodes2["_7"] = 55] = "_7";
  CharacterCodes2[CharacterCodes2["_8"] = 56] = "_8";
  CharacterCodes2[CharacterCodes2["_9"] = 57] = "_9";
  CharacterCodes2[CharacterCodes2["a"] = 97] = "a";
  CharacterCodes2[CharacterCodes2["b"] = 98] = "b";
  CharacterCodes2[CharacterCodes2["c"] = 99] = "c";
  CharacterCodes2[CharacterCodes2["d"] = 100] = "d";
  CharacterCodes2[CharacterCodes2["e"] = 101] = "e";
  CharacterCodes2[CharacterCodes2["f"] = 102] = "f";
  CharacterCodes2[CharacterCodes2["g"] = 103] = "g";
  CharacterCodes2[CharacterCodes2["h"] = 104] = "h";
  CharacterCodes2[CharacterCodes2["i"] = 105] = "i";
  CharacterCodes2[CharacterCodes2["j"] = 106] = "j";
  CharacterCodes2[CharacterCodes2["k"] = 107] = "k";
  CharacterCodes2[CharacterCodes2["l"] = 108] = "l";
  CharacterCodes2[CharacterCodes2["m"] = 109] = "m";
  CharacterCodes2[CharacterCodes2["n"] = 110] = "n";
  CharacterCodes2[CharacterCodes2["o"] = 111] = "o";
  CharacterCodes2[CharacterCodes2["p"] = 112] = "p";
  CharacterCodes2[CharacterCodes2["q"] = 113] = "q";
  CharacterCodes2[CharacterCodes2["r"] = 114] = "r";
  CharacterCodes2[CharacterCodes2["s"] = 115] = "s";
  CharacterCodes2[CharacterCodes2["t"] = 116] = "t";
  CharacterCodes2[CharacterCodes2["u"] = 117] = "u";
  CharacterCodes2[CharacterCodes2["v"] = 118] = "v";
  CharacterCodes2[CharacterCodes2["w"] = 119] = "w";
  CharacterCodes2[CharacterCodes2["x"] = 120] = "x";
  CharacterCodes2[CharacterCodes2["y"] = 121] = "y";
  CharacterCodes2[CharacterCodes2["z"] = 122] = "z";
  CharacterCodes2[CharacterCodes2["A"] = 65] = "A";
  CharacterCodes2[CharacterCodes2["B"] = 66] = "B";
  CharacterCodes2[CharacterCodes2["C"] = 67] = "C";
  CharacterCodes2[CharacterCodes2["D"] = 68] = "D";
  CharacterCodes2[CharacterCodes2["E"] = 69] = "E";
  CharacterCodes2[CharacterCodes2["F"] = 70] = "F";
  CharacterCodes2[CharacterCodes2["G"] = 71] = "G";
  CharacterCodes2[CharacterCodes2["H"] = 72] = "H";
  CharacterCodes2[CharacterCodes2["I"] = 73] = "I";
  CharacterCodes2[CharacterCodes2["J"] = 74] = "J";
  CharacterCodes2[CharacterCodes2["K"] = 75] = "K";
  CharacterCodes2[CharacterCodes2["L"] = 76] = "L";
  CharacterCodes2[CharacterCodes2["M"] = 77] = "M";
  CharacterCodes2[CharacterCodes2["N"] = 78] = "N";
  CharacterCodes2[CharacterCodes2["O"] = 79] = "O";
  CharacterCodes2[CharacterCodes2["P"] = 80] = "P";
  CharacterCodes2[CharacterCodes2["Q"] = 81] = "Q";
  CharacterCodes2[CharacterCodes2["R"] = 82] = "R";
  CharacterCodes2[CharacterCodes2["S"] = 83] = "S";
  CharacterCodes2[CharacterCodes2["T"] = 84] = "T";
  CharacterCodes2[CharacterCodes2["U"] = 85] = "U";
  CharacterCodes2[CharacterCodes2["V"] = 86] = "V";
  CharacterCodes2[CharacterCodes2["W"] = 87] = "W";
  CharacterCodes2[CharacterCodes2["X"] = 88] = "X";
  CharacterCodes2[CharacterCodes2["Y"] = 89] = "Y";
  CharacterCodes2[CharacterCodes2["Z"] = 90] = "Z";
  CharacterCodes2[CharacterCodes2["asterisk"] = 42] = "asterisk";
  CharacterCodes2[CharacterCodes2["backslash"] = 92] = "backslash";
  CharacterCodes2[CharacterCodes2["closeBrace"] = 125] = "closeBrace";
  CharacterCodes2[CharacterCodes2["closeBracket"] = 93] = "closeBracket";
  CharacterCodes2[CharacterCodes2["colon"] = 58] = "colon";
  CharacterCodes2[CharacterCodes2["comma"] = 44] = "comma";
  CharacterCodes2[CharacterCodes2["dot"] = 46] = "dot";
  CharacterCodes2[CharacterCodes2["doubleQuote"] = 34] = "doubleQuote";
  CharacterCodes2[CharacterCodes2["minus"] = 45] = "minus";
  CharacterCodes2[CharacterCodes2["openBrace"] = 123] = "openBrace";
  CharacterCodes2[CharacterCodes2["openBracket"] = 91] = "openBracket";
  CharacterCodes2[CharacterCodes2["plus"] = 43] = "plus";
  CharacterCodes2[CharacterCodes2["slash"] = 47] = "slash";
  CharacterCodes2[CharacterCodes2["formFeed"] = 12] = "formFeed";
  CharacterCodes2[CharacterCodes2["tab"] = 9] = "tab";
})(CharacterCodes || (CharacterCodes = {}));

// node_modules/jsonc-parser/lib/esm/impl/string-intern.js
var cachedSpaces = new Array(20).fill(0).map((_, index) => {
  return " ".repeat(index);
});
var maxCachedValues = 200;
var cachedBreakLinesWithSpaces = {
  " ": {
    "\n": new Array(maxCachedValues).fill(0).map((_, index) => {
      return "\n" + " ".repeat(index);
    }),
    "\r": new Array(maxCachedValues).fill(0).map((_, index) => {
      return "\r" + " ".repeat(index);
    }),
    "\r\n": new Array(maxCachedValues).fill(0).map((_, index) => {
      return "\r\n" + " ".repeat(index);
    })
  },
  "	": {
    "\n": new Array(maxCachedValues).fill(0).map((_, index) => {
      return "\n" + "	".repeat(index);
    }),
    "\r": new Array(maxCachedValues).fill(0).map((_, index) => {
      return "\r" + "	".repeat(index);
    }),
    "\r\n": new Array(maxCachedValues).fill(0).map((_, index) => {
      return "\r\n" + "	".repeat(index);
    })
  }
};

// node_modules/jsonc-parser/lib/esm/impl/parser.js
var ParseOptions;
(function(ParseOptions2) {
  ParseOptions2.DEFAULT = {
    allowTrailingComma: false
  };
})(ParseOptions || (ParseOptions = {}));
function parse(text, errors2 = [], options = ParseOptions.DEFAULT) {
  let currentProperty = null;
  let currentParent = [];
  const previousParents = [];
  function onValue(value) {
    if (Array.isArray(currentParent)) {
      currentParent.push(value);
    } else if (currentProperty !== null) {
      currentParent[currentProperty] = value;
    }
  }
  const visitor = {
    onObjectBegin: () => {
      const object = {};
      onValue(object);
      previousParents.push(currentParent);
      currentParent = object;
      currentProperty = null;
    },
    onObjectProperty: (name) => {
      currentProperty = name;
    },
    onObjectEnd: () => {
      currentParent = previousParents.pop();
    },
    onArrayBegin: () => {
      const array = [];
      onValue(array);
      previousParents.push(currentParent);
      currentParent = array;
      currentProperty = null;
    },
    onArrayEnd: () => {
      currentParent = previousParents.pop();
    },
    onLiteralValue: onValue,
    onError: (error2, offset, length) => {
      errors2.push({ error: error2, offset, length });
    }
  };
  visit(text, visitor, options);
  return currentParent[0];
}
function visit(text, visitor, options = ParseOptions.DEFAULT) {
  const _scanner = createScanner(text, false);
  const _jsonPath = [];
  function toNoArgVisit(visitFunction) {
    return visitFunction ? () => visitFunction(_scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter()) : () => true;
  }
  function toNoArgVisitWithPath(visitFunction) {
    return visitFunction ? () => visitFunction(_scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter(), () => _jsonPath.slice()) : () => true;
  }
  function toOneArgVisit(visitFunction) {
    return visitFunction ? (arg) => visitFunction(arg, _scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter()) : () => true;
  }
  function toOneArgVisitWithPath(visitFunction) {
    return visitFunction ? (arg) => visitFunction(arg, _scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter(), () => _jsonPath.slice()) : () => true;
  }
  const onObjectBegin = toNoArgVisitWithPath(visitor.onObjectBegin), onObjectProperty = toOneArgVisitWithPath(visitor.onObjectProperty), onObjectEnd = toNoArgVisit(visitor.onObjectEnd), onArrayBegin = toNoArgVisitWithPath(visitor.onArrayBegin), onArrayEnd = toNoArgVisit(visitor.onArrayEnd), onLiteralValue = toOneArgVisitWithPath(visitor.onLiteralValue), onSeparator = toOneArgVisit(visitor.onSeparator), onComment = toNoArgVisit(visitor.onComment), onError = toOneArgVisit(visitor.onError);
  const disallowComments = options && options.disallowComments;
  const allowTrailingComma = options && options.allowTrailingComma;
  function scanNext() {
    while (true) {
      const token = _scanner.scan();
      switch (_scanner.getTokenError()) {
        case 4:
          handleError(
            14
            /* ParseErrorCode.InvalidUnicode */
          );
          break;
        case 5:
          handleError(
            15
            /* ParseErrorCode.InvalidEscapeCharacter */
          );
          break;
        case 3:
          handleError(
            13
            /* ParseErrorCode.UnexpectedEndOfNumber */
          );
          break;
        case 1:
          if (!disallowComments) {
            handleError(
              11
              /* ParseErrorCode.UnexpectedEndOfComment */
            );
          }
          break;
        case 2:
          handleError(
            12
            /* ParseErrorCode.UnexpectedEndOfString */
          );
          break;
        case 6:
          handleError(
            16
            /* ParseErrorCode.InvalidCharacter */
          );
          break;
      }
      switch (token) {
        case 12:
        case 13:
          if (disallowComments) {
            handleError(
              10
              /* ParseErrorCode.InvalidCommentToken */
            );
          } else {
            onComment();
          }
          break;
        case 16:
          handleError(
            1
            /* ParseErrorCode.InvalidSymbol */
          );
          break;
        case 15:
        case 14:
          break;
        default:
          return token;
      }
    }
  }
  function handleError(error2, skipUntilAfter = [], skipUntil = []) {
    onError(error2);
    if (skipUntilAfter.length + skipUntil.length > 0) {
      let token = _scanner.getToken();
      while (token !== 17) {
        if (skipUntilAfter.indexOf(token) !== -1) {
          scanNext();
          break;
        } else if (skipUntil.indexOf(token) !== -1) {
          break;
        }
        token = scanNext();
      }
    }
  }
  function parseString(isValue) {
    const value = _scanner.getTokenValue();
    if (isValue) {
      onLiteralValue(value);
    } else {
      onObjectProperty(value);
      _jsonPath.push(value);
    }
    scanNext();
    return true;
  }
  function parseLiteral() {
    switch (_scanner.getToken()) {
      case 11:
        const tokenValue = _scanner.getTokenValue();
        let value = Number(tokenValue);
        if (isNaN(value)) {
          handleError(
            2
            /* ParseErrorCode.InvalidNumberFormat */
          );
          value = 0;
        }
        onLiteralValue(value);
        break;
      case 7:
        onLiteralValue(null);
        break;
      case 8:
        onLiteralValue(true);
        break;
      case 9:
        onLiteralValue(false);
        break;
      default:
        return false;
    }
    scanNext();
    return true;
  }
  function parseProperty() {
    if (_scanner.getToken() !== 10) {
      handleError(3, [], [
        2,
        5
        /* SyntaxKind.CommaToken */
      ]);
      return false;
    }
    parseString(false);
    if (_scanner.getToken() === 6) {
      onSeparator(":");
      scanNext();
      if (!parseValue()) {
        handleError(4, [], [
          2,
          5
          /* SyntaxKind.CommaToken */
        ]);
      }
    } else {
      handleError(5, [], [
        2,
        5
        /* SyntaxKind.CommaToken */
      ]);
    }
    _jsonPath.pop();
    return true;
  }
  function parseObject() {
    onObjectBegin();
    scanNext();
    let needsComma = false;
    while (_scanner.getToken() !== 2 && _scanner.getToken() !== 17) {
      if (_scanner.getToken() === 5) {
        if (!needsComma) {
          handleError(4, [], []);
        }
        onSeparator(",");
        scanNext();
        if (_scanner.getToken() === 2 && allowTrailingComma) {
          break;
        }
      } else if (needsComma) {
        handleError(6, [], []);
      }
      if (!parseProperty()) {
        handleError(4, [], [
          2,
          5
          /* SyntaxKind.CommaToken */
        ]);
      }
      needsComma = true;
    }
    onObjectEnd();
    if (_scanner.getToken() !== 2) {
      handleError(7, [
        2
        /* SyntaxKind.CloseBraceToken */
      ], []);
    } else {
      scanNext();
    }
    return true;
  }
  function parseArray() {
    onArrayBegin();
    scanNext();
    let isFirstElement = true;
    let needsComma = false;
    while (_scanner.getToken() !== 4 && _scanner.getToken() !== 17) {
      if (_scanner.getToken() === 5) {
        if (!needsComma) {
          handleError(4, [], []);
        }
        onSeparator(",");
        scanNext();
        if (_scanner.getToken() === 4 && allowTrailingComma) {
          break;
        }
      } else if (needsComma) {
        handleError(6, [], []);
      }
      if (isFirstElement) {
        _jsonPath.push(0);
        isFirstElement = false;
      } else {
        _jsonPath[_jsonPath.length - 1]++;
      }
      if (!parseValue()) {
        handleError(4, [], [
          4,
          5
          /* SyntaxKind.CommaToken */
        ]);
      }
      needsComma = true;
    }
    onArrayEnd();
    if (!isFirstElement) {
      _jsonPath.pop();
    }
    if (_scanner.getToken() !== 4) {
      handleError(8, [
        4
        /* SyntaxKind.CloseBracketToken */
      ], []);
    } else {
      scanNext();
    }
    return true;
  }
  function parseValue() {
    switch (_scanner.getToken()) {
      case 3:
        return parseArray();
      case 1:
        return parseObject();
      case 10:
        return parseString(true);
      default:
        return parseLiteral();
    }
  }
  scanNext();
  if (_scanner.getToken() === 17) {
    if (options.allowEmptyContent) {
      return true;
    }
    handleError(4, [], []);
    return false;
  }
  if (!parseValue()) {
    handleError(4, [], []);
    return false;
  }
  if (_scanner.getToken() !== 17) {
    handleError(9, [], []);
  }
  return true;
}

// node_modules/jsonc-parser/lib/esm/main.js
var ScanError;
(function(ScanError2) {
  ScanError2[ScanError2["None"] = 0] = "None";
  ScanError2[ScanError2["UnexpectedEndOfComment"] = 1] = "UnexpectedEndOfComment";
  ScanError2[ScanError2["UnexpectedEndOfString"] = 2] = "UnexpectedEndOfString";
  ScanError2[ScanError2["UnexpectedEndOfNumber"] = 3] = "UnexpectedEndOfNumber";
  ScanError2[ScanError2["InvalidUnicode"] = 4] = "InvalidUnicode";
  ScanError2[ScanError2["InvalidEscapeCharacter"] = 5] = "InvalidEscapeCharacter";
  ScanError2[ScanError2["InvalidCharacter"] = 6] = "InvalidCharacter";
})(ScanError || (ScanError = {}));
var SyntaxKind;
(function(SyntaxKind2) {
  SyntaxKind2[SyntaxKind2["OpenBraceToken"] = 1] = "OpenBraceToken";
  SyntaxKind2[SyntaxKind2["CloseBraceToken"] = 2] = "CloseBraceToken";
  SyntaxKind2[SyntaxKind2["OpenBracketToken"] = 3] = "OpenBracketToken";
  SyntaxKind2[SyntaxKind2["CloseBracketToken"] = 4] = "CloseBracketToken";
  SyntaxKind2[SyntaxKind2["CommaToken"] = 5] = "CommaToken";
  SyntaxKind2[SyntaxKind2["ColonToken"] = 6] = "ColonToken";
  SyntaxKind2[SyntaxKind2["NullKeyword"] = 7] = "NullKeyword";
  SyntaxKind2[SyntaxKind2["TrueKeyword"] = 8] = "TrueKeyword";
  SyntaxKind2[SyntaxKind2["FalseKeyword"] = 9] = "FalseKeyword";
  SyntaxKind2[SyntaxKind2["StringLiteral"] = 10] = "StringLiteral";
  SyntaxKind2[SyntaxKind2["NumericLiteral"] = 11] = "NumericLiteral";
  SyntaxKind2[SyntaxKind2["LineCommentTrivia"] = 12] = "LineCommentTrivia";
  SyntaxKind2[SyntaxKind2["BlockCommentTrivia"] = 13] = "BlockCommentTrivia";
  SyntaxKind2[SyntaxKind2["LineBreakTrivia"] = 14] = "LineBreakTrivia";
  SyntaxKind2[SyntaxKind2["Trivia"] = 15] = "Trivia";
  SyntaxKind2[SyntaxKind2["Unknown"] = 16] = "Unknown";
  SyntaxKind2[SyntaxKind2["EOF"] = 17] = "EOF";
})(SyntaxKind || (SyntaxKind = {}));
var parse2 = parse;
var ParseErrorCode;
(function(ParseErrorCode2) {
  ParseErrorCode2[ParseErrorCode2["InvalidSymbol"] = 1] = "InvalidSymbol";
  ParseErrorCode2[ParseErrorCode2["InvalidNumberFormat"] = 2] = "InvalidNumberFormat";
  ParseErrorCode2[ParseErrorCode2["PropertyNameExpected"] = 3] = "PropertyNameExpected";
  ParseErrorCode2[ParseErrorCode2["ValueExpected"] = 4] = "ValueExpected";
  ParseErrorCode2[ParseErrorCode2["ColonExpected"] = 5] = "ColonExpected";
  ParseErrorCode2[ParseErrorCode2["CommaExpected"] = 6] = "CommaExpected";
  ParseErrorCode2[ParseErrorCode2["CloseBraceExpected"] = 7] = "CloseBraceExpected";
  ParseErrorCode2[ParseErrorCode2["CloseBracketExpected"] = 8] = "CloseBracketExpected";
  ParseErrorCode2[ParseErrorCode2["EndOfFileExpected"] = 9] = "EndOfFileExpected";
  ParseErrorCode2[ParseErrorCode2["InvalidCommentToken"] = 10] = "InvalidCommentToken";
  ParseErrorCode2[ParseErrorCode2["UnexpectedEndOfComment"] = 11] = "UnexpectedEndOfComment";
  ParseErrorCode2[ParseErrorCode2["UnexpectedEndOfString"] = 12] = "UnexpectedEndOfString";
  ParseErrorCode2[ParseErrorCode2["UnexpectedEndOfNumber"] = 13] = "UnexpectedEndOfNumber";
  ParseErrorCode2[ParseErrorCode2["InvalidUnicode"] = 14] = "InvalidUnicode";
  ParseErrorCode2[ParseErrorCode2["InvalidEscapeCharacter"] = 15] = "InvalidEscapeCharacter";
  ParseErrorCode2[ParseErrorCode2["InvalidCharacter"] = 16] = "InvalidCharacter";
})(ParseErrorCode || (ParseErrorCode = {}));

// server/src/Analyzer.js
var import_markdownlint = __toESM(require_markdownlint());
var import_fs = __toESM(require("fs"));

// server/src/CodeAction.js
var CodeAction = class {
  constructor(result, uri, diagnostics) {
    this.title = "Top fixer";
    this.kind = "quickfix";
    this.isPreferred = true;
    this.diagnostics = diagnostics;
    const lineNumber = result.lineNumber - 1;
    const characterStart = result.fixInfo.editColumn - 1;
    const characterEnd = result.fixInfo.deleteCount + characterStart;
    const { insertText } = result.fixInfo;
    this.edit = {
      changes: {
        [uri]: [
          {
            range: {
              start: {
                line: lineNumber,
                character: characterStart
              },
              end: {
                line: lineNumber,
                character: characterEnd
              }
            },
            newText: insertText
          }
        ]
      }
    };
  }
};

// server/src/Analyzer.js
var Analyzer = class {
  #contents = /* @__PURE__ */ new Map();
  #options = void 0;
  updateContent(uri, text) {
    this.#contents.set(uri, text);
  }
  async #initOptions(uri) {
    const index = uri.indexOf("curriculum/");
    if (index === -1) {
      return;
    }
    const path = uri.slice(0, index + "curriculum/".length);
    let config;
    try {
      config = new String(import_fs.default.readFileSync(path + ".markdownlint-cli2.jsonc"));
    } catch (_) {
      return;
    }
    const options = parse2(config);
    const rulePromises = options.customRules.map(
      (rule) => import(path + rule.slice(2))
    );
    options.customRules = await Promise.all(rulePromises);
    options.customRules = options.customRules.map((rule) => rule.default);
    this.#options = options;
  }
  #generateResults(uri) {
    const rootURI = this.#getRootURI(uri);
    const content = this.#contents.get(uri);
    if (!this.#options) {
      this.#initOptions(rootURI);
    }
    let results = [];
    if (this.#options && content) {
      this.#options.strings = { content };
      results = import_markdownlint.default.sync(this.#options).content;
    }
    return results;
  }
  generateDiagnostics(uri) {
    return this.#generateResults(uri).map((r) => new Diagnostic(r));
  }
  generateCodeActions(uri, range, diagnostics) {
    return this.#generateResults(uri).filter((r) => this.#validActionResult(r, range)).map((r) => new CodeAction(r, uri, diagnostics));
  }
  #validActionResult(result, range) {
    const { start, end } = range;
    const line = result.lineNumber - 1;
    return line >= start.line && line <= end.line && result.fixInfo;
  }
  #getRootURI(uri) {
    if (uri && uri.startsWith("file://")) {
      return uri.slice("file://".length);
    } else {
      return uri;
    }
  }
};

// server/src/Encoder.js
var Encoder = class {
  encode(msg) {
    if (msg == void 0 || msg.length === 0) {
      return `Content-Length 0`;
    }
    const json = JSON.stringify(msg);
    return `Content-Length: ${json.length}\r
\r
${json}`;
  }
  decode(msg) {
    const startIndex = "Content-Length ".length;
    const lastIndex = msg.indexOf("\r\n\r\n");
    const length = Number(msg.substring(startIndex, lastIndex));
    const obStart = lastIndex + "\r\n\r\n".length;
    const obj = msg.substring(obStart, obStart + length);
    return JSON.parse(obj);
  }
};

// server/src/completions/sections.js
var kind = 15;
var insertTextFormat = 2;
var sections_default = [
  {
    kind,
    label: "Assignment section",
    detail: "Insert assignment section",
    sortText: "Assignment",
    filterText: "### Assignment",
    insertTextFormat,
    insertText: '### Assignment\n\n<div class="lesson-content__panel" markdown="1">\n\n#### ${1:Optional heading}\n\n1. ${2:List item}\n	- ${3:Instruction}\n\n#### ${4:Extra credit}\n\n- ${5:An optional add-on}\n\n</div>\n\n$0'
  },
  {
    kind,
    label: "Introduction section",
    detail: "Insert introduction section",
    sortText: "Introduction",
    filterText: "### Introduction",
    insertTextFormat,
    insertText: "### Introduction\n\n${1:A Brief Introduction.}\n\n$0"
  },
  {
    kind,
    label: "Lesson overview section",
    detail: "Insert lesson overview section",
    sortText: "Lesson Overview",
    filterText: "### Lesson Overview",
    insertTextFormat,
    insertText: "### Lesson Overview\n\nThis section contains a general overview of topics that you will learn in this lesson.\n\n- ${1:Lesson overview item}\n\n$0"
  },
  {
    kind,
    label: "Knowledge check section",
    detail: "Insert lesson overview section",
    sortText: "Knowledge Check",
    filterText: "### Knowledge check",
    insertTextFormat,
    insertText: "### Knowledge check\n\nThe following questions are an opportunity to reflect on key topics in this lesson. If you can't answer a question, click on it to review the material, but keep in mind you are not expected to memorize or master this knowledge.\n\n- [${1:A knowledge check question}](${2:a-knowledge-check-url})\n\n$0"
  },
  {
    kind,
    label: "Additional resources section",
    detail: "Insert additional resources section",
    sortText: "Additional resources",
    filterText: "### Additional resources",
    insertTextFormat,
    insertText: "### Additional resources\n\nThis section contains helpful links to related content. It isn't required, so consider it supplemental.\n\n- ${1:It looks like this lesson doesn't have any additional resources yet. Help us expand this section by contributing to our curriculum.}\n"
  }
];

// server/src/completions/lessonNotes.js
var kind2 = 15;
var insertTextFormat2 = 2;
var lessonNotes_default = [
  {
    kind: kind2,
    label: "Note",
    detail: "Insert a Note",
    sortText: "note",
    filterText: '<div class="lesson-note" markdown="1">',
    insertTextFormat: insertTextFormat2,
    insertText: '<div class="lesson-note" markdown="1">\n\n#### ${1:Optional title}\n\n${2:Details goes here}\n\n</div>\n\n$0'
  },
  {
    kind: kind2,
    label: "Warning",
    detail: "Insert a warning",
    sortText: "warning",
    filterText: '<div class="lesson-note lesson-note--warning" markdown="1">',
    insertTextFormat: insertTextFormat2,
    insertText: '<div class="lesson-note lesson-note--warning" markdown="1">\n\n#### ${1:Optional title}\n\n${2:Details goes here}\n\n</div>\n\n$0'
  },
  {
    kind: kind2,
    label: "Tip",
    detail: "Insert a tip",
    sortText: "tip",
    filterText: '<div class="lesson-note lesson-note--tip" markdown="1">',
    insertTextFormat: insertTextFormat2,
    insertText: '<div class="lesson-note lesson-note--tip" markdown="1">\n\n#### ${1:Optional title}\n\n${2:Details goes here}\n\n</div>\n\n$0'
  }
];

// server/src/completions/snippets.js
var kind3 = 15;
var insertTextFormat3 = 2;
var snippets_default = [
  {
    kind: kind3,
    label: "Javascript",
    detail: "Javascript snippet",
    sortText: "```javascript",
    filterText: "```javascript",
    insertTextFormat: insertTextFormat3,
    insertText: '```javascript\n	${1:const obj = {\n		name: "object"\n		marker: "X"\n	}}\n```\n$0'
  },
  {
    kind: kind3,
    label: "Bash",
    detail: "Bash snippet",
    sortText: "```bash",
    filterText: "```bash",
    insertTextFormat: insertTextFormat3,
    insertText: "```bash\n${1:cat file.txt}\n```\n$0"
  }
];

// server/src/completions/index.js
var completions_default = [...lessonNotes_default, ...sections_default, ...snippets_default];

// server/src/Protocol.js
var Protocol = class {
  #analyzer;
  constructor(analyzer2) {
    this.#analyzer = analyzer2;
  }
  openResponse(msg) {
    const text = msg.params.textDocument.text;
    const uri = msg.params.textDocument.uri;
    this.#analyzer.updateContent(uri, text);
    return this.#diagnosticsResponse(msg);
  }
  changeResponse(msg) {
    const text = msg.params.contentChanges[0].text;
    const uri = msg.params.textDocument.uri;
    this.#analyzer.updateContent(uri, text);
    return this.#diagnosticsResponse(msg);
  }
  saveResponse(msg) {
    return this.#diagnosticsResponse(msg);
  }
  #diagnosticsResponse(msg) {
    const uri = msg.params.textDocument.uri;
    const diagnostics = this.#analyzer.generateDiagnostics(uri);
    return {
      id: msg.id,
      method: "textDocument/publishDiagnostics",
      params: { uri, diagnostics }
    };
  }
  completionResponse(msg) {
    return { id: msg.id, result: completions_default };
  }
  hoverResponse(msg) {
    const uri = msg.params.textDocument.uri;
    const { line } = msg.params.position;
    const content = this.#analyzer.getContent(uri);
    const contents = content.split("\n")[line];
    return {
      id: msg.id,
      result: {
        contents
      }
    };
  }
  codeActionResponse(msg) {
    const uri = msg.params.textDocument.uri;
    const range = msg.params.range;
    const diagnostics = msg.params.context.diagnostics;
    const actions = this.#analyzer.generateCodeActions(uri, range, diagnostics);
    return {
      id: msg.id,
      result: actions
    };
  }
  initalizationResponse(msg) {
    const initalizeResponse = {
      capabilities: {
        codeActionProvider: true,
        textDocumentSync: 1,
        hoverProvider: true,
        completionProvider: {}
      },
      serverInfo: { name: "toplsp", version: "1.0" }
    };
    return {
      id: msg.id,
      result: initalizeResponse
    };
  }
};

// server/src/main.js
var encoder = new Encoder();
var analyzer = new Analyzer();
var protocol = new Protocol(analyzer);
process.stdin.on("data", (data) => {
  try {
    const msg = encoder.decode(data.toString());
    handleMessage(msg);
  } catch (e) {
    console.error(e);
  }
});
function handleMessage(msg) {
  const { method } = msg;
  let response;
  switch (method) {
    case "initialize":
      response = protocol.initalizationResponse(msg);
      break;
    case "textDocument/didOpen":
      response = protocol.openResponse(msg);
      break;
    case "textDocument/didChange":
      response = protocol.changeResponse(msg);
      break;
    case "textDocument/hover":
      response = protocol.handleHover(msg);
      break;
    case "textDocument/completion":
      response = protocol.completionResponse(msg);
      break;
    case "textDocument/didSave":
      response = protocol.saveResponse(msg);
      break;
    case "textDocument/codeAction":
      response = protocol.codeActionResponse(msg);
      break;
    case "initialized":
      return;
  }
  const encodedResponse = encoder.encode(response);
  process.stdout.write(encodedResponse);
}
/*! Bundled license information:

markdownlint-micromark/micromark.cjs:
  (*! markdownlint-micromark 0.1.9 https://github.com/DavidAnson/markdownlint *)
*/
//# sourceMappingURL=extension.js.map
