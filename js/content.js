//region CryptoJS
/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(h,s){var f={},g=f.lib={},q=function(){},m=g.Base={extend:function(a){q.prototype=this;var c=new q;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
    r=g.WordArray=m.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=s?c:4*a.length},toString:function(a){return(a||k).stringify(this)},concat:function(a){var c=this.words,d=a.words,b=this.sigBytes;a=a.sigBytes;this.clamp();if(b%4)for(var e=0;e<a;e++)c[b+e>>>2]|=(d[e>>>2]>>>24-8*(e%4)&255)<<24-8*((b+e)%4);else if(65535<d.length)for(e=0;e<a;e+=4)c[b+e>>>2]=d[e>>>2];else c.push.apply(c,d);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
            32-8*(c%4);a.length=h.ceil(c/4)},clone:function(){var a=m.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],d=0;d<a;d+=4)c.push(4294967296*h.random()|0);return new r.init(c,a)}}),l=f.enc={},k=l.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var d=[],b=0;b<a;b++){var e=c[b>>>2]>>>24-8*(b%4)&255;d.push((e>>>4).toString(16));d.push((e&15).toString(16))}return d.join("")},parse:function(a){for(var c=a.length,d=[],b=0;b<c;b+=2)d[b>>>3]|=parseInt(a.substr(b,
            2),16)<<24-4*(b%8);return new r.init(d,c/2)}},n=l.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var d=[],b=0;b<a;b++)d.push(String.fromCharCode(c[b>>>2]>>>24-8*(b%4)&255));return d.join("")},parse:function(a){for(var c=a.length,d=[],b=0;b<c;b++)d[b>>>2]|=(a.charCodeAt(b)&255)<<24-8*(b%4);return new r.init(d,c)}},j=l.Utf8={stringify:function(a){try{return decodeURIComponent(escape(n.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return n.parse(unescape(encodeURIComponent(a)))}},
    u=g.BufferedBlockAlgorithm=m.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=j.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,d=c.words,b=c.sigBytes,e=this.blockSize,f=b/(4*e),f=a?h.ceil(f):h.max((f|0)-this._minBufferSize,0);a=f*e;b=h.min(4*a,b);if(a){for(var g=0;g<a;g+=e)this._doProcessBlock(d,g);g=d.splice(0,a);c.sigBytes-=b}return new r.init(g,b)},clone:function(){var a=m.clone.call(this);
            a._data=this._data.clone();return a},_minBufferSize:0});g.Hasher=u.extend({cfg:m.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){u.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(c,d){return(new a.init(d)).finalize(c)}},_createHmacHelper:function(a){return function(c,d){return(new t.HMAC.init(a,
        d)).finalize(c)}}});var t=f.algo={};return f}(Math);
(function(h){for(var s=CryptoJS,f=s.lib,g=f.WordArray,q=f.Hasher,f=s.algo,m=[],r=[],l=function(a){return 4294967296*(a-(a|0))|0},k=2,n=0;64>n;){var j;a:{j=k;for(var u=h.sqrt(j),t=2;t<=u;t++)if(!(j%t)){j=!1;break a}j=!0}j&&(8>n&&(m[n]=l(h.pow(k,0.5))),r[n]=l(h.pow(k,1/3)),n++);k++}var a=[],f=f.SHA256=q.extend({_doReset:function(){this._hash=new g.init(m.slice(0))},_doProcessBlock:function(c,d){for(var b=this._hash.words,e=b[0],f=b[1],g=b[2],j=b[3],h=b[4],m=b[5],n=b[6],q=b[7],p=0;64>p;p++){if(16>p)a[p]=
        c[d+p]|0;else{var k=a[p-15],l=a[p-2];a[p]=((k<<25|k>>>7)^(k<<14|k>>>18)^k>>>3)+a[p-7]+((l<<15|l>>>17)^(l<<13|l>>>19)^l>>>10)+a[p-16]}k=q+((h<<26|h>>>6)^(h<<21|h>>>11)^(h<<7|h>>>25))+(h&m^~h&n)+r[p]+a[p];l=((e<<30|e>>>2)^(e<<19|e>>>13)^(e<<10|e>>>22))+(e&f^e&g^f&g);q=n;n=m;m=h;h=j+k|0;j=g;g=f;f=e;e=k+l|0}b[0]=b[0]+e|0;b[1]=b[1]+f|0;b[2]=b[2]+g|0;b[3]=b[3]+j|0;b[4]=b[4]+h|0;b[5]=b[5]+m|0;b[6]=b[6]+n|0;b[7]=b[7]+q|0},_doFinalize:function(){var a=this._data,d=a.words,b=8*this._nDataBytes,e=8*a.sigBytes;
        d[e>>>5]|=128<<24-e%32;d[(e+64>>>9<<4)+14]=h.floor(b/4294967296);d[(e+64>>>9<<4)+15]=b;a.sigBytes=4*d.length;this._process();return this._hash},clone:function(){var a=q.clone.call(this);a._hash=this._hash.clone();return a}});s.SHA256=q._createHelper(f);s.HmacSHA256=q._createHmacHelper(f)})(Math);
(function(){var h=CryptoJS,s=h.enc.Utf8;h.algo.HMAC=h.lib.Base.extend({init:function(f,g){f=this._hasher=new f.init;"string"==typeof g&&(g=s.parse(g));var h=f.blockSize,m=4*h;g.sigBytes>m&&(g=f.finalize(g));g.clamp();for(var r=this._oKey=g.clone(),l=this._iKey=g.clone(),k=r.words,n=l.words,j=0;j<h;j++)k[j]^=1549556828,n[j]^=909522486;r.sigBytes=l.sigBytes=m;this.reset()},reset:function(){var f=this._hasher;f.reset();f.update(this._iKey)},update:function(f){this._hasher.update(f);return this},finalize:function(f){var g=
        this._hasher;f=g.finalize(f);g.reset();return g.finalize(this._oKey.clone().concat(f))}})})();
//endregion


//region 百度翻译
//region 百度api md5加密
var MD5 = function (string) {

    function RotateLeft(lValue, iShiftBits) {
        return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
    }

    function AddUnsigned(lX,lY) {
        var lX4,lY4,lX8,lY8,lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }

    function F(x,y,z) { return (x & y) | ((~x) & z); }
    function G(x,y,z) { return (x & z) | (y & (~z)); }
    function H(x,y,z) { return (x ^ y ^ z); }
    function I(x,y,z) { return (y ^ (x | (~z))); }

    function FF(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function GG(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function HH(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function II(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1=lMessageLength + 8;
        var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
        var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
        var lWordArray=Array(lNumberOfWords-1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while ( lByteCount < lMessageLength ) {
            lWordCount = (lByteCount-(lByteCount % 4))/4;
            lBytePosition = (lByteCount % 4)*8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount-(lByteCount % 4))/4;
        lBytePosition = (lByteCount % 4)*8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
        lWordArray[lNumberOfWords-2] = lMessageLength<<3;
        lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
        return lWordArray;
    };

    function WordToHex(lValue) {
        var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
        for (lCount = 0;lCount<=3;lCount++) {
            lByte = (lValue>>>(lCount*8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
        }
        return WordToHexValue;
    };

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    };

    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d;
    var S11=7, S12=12, S13=17, S14=22;
    var S21=5, S22=9 , S23=14, S24=20;
    var S31=4, S32=11, S33=16, S34=23;
    var S41=6, S42=10, S43=15, S44=21;

    string = Utf8Encode(string);

    x = ConvertToWordArray(string);

    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

    for (k=0;k<x.length;k+=16) {
        AA=a; BB=b; CC=c; DD=d;
        a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
        d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
        c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
        b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
        a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
        d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
        c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
        b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
        a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
        d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
        c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
        b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
        a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
        d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
        c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
        b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
        a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
        d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
        c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
        b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
        a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
        d=GG(d,a,b,c,x[k+10],S22,0x2441453);
        c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
        b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
        a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
        d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
        c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
        b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
        a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
        d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
        c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
        b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
        a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
        d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
        c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
        b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
        a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
        d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
        c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
        b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
        a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
        d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
        c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
        b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
        a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
        d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
        c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
        b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
        a=II(a,b,c,d,x[k+0], S41,0xF4292244);
        d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
        c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
        b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
        a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
        d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
        c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
        b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
        a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
        d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
        c=II(c,d,a,b,x[k+6], S43,0xA3014314);
        b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
        a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
        d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
        c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
        b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
        a=AddUnsigned(a,AA);
        b=AddUnsigned(b,BB);
        c=AddUnsigned(c,CC);
        d=AddUnsigned(d,DD);
    }

    var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

    return temp.toLowerCase();
}
//endregion

//将输入翻译语言名称转换为百度api语种代码
function getBaiduLanguageTo(to) {
    //中国地区
    if(to === 'zh-CN' || to === 'zh') {
        return 'zh'
    }
    //繁体中文
    if(to == 'zh-TW') {
        return 'cht'
    }
    //粤语
    if(to === 'zh-HK') {
        return 'yue'
    }
    //英语
    if(to === 'en' || to === 'en-US') {
        return 'en'
    }
    //韩语
    if(to === 'ko-KR') {
        return 'kor'
    }
    //泰语
    if(to === 'th') {
        return 'th'
    }
    //葡萄牙语
    if(to === 'pt-BR' || to === 'pt-PT') {
        return 'pt'
    }
    //希腊语
    if(to === 'el-GR') {
        return 'el'
    }
    //保加利亚语
    if(to === 'bul') {
        return 'bul'
    }
    //芬兰语
    if(to === 'fi-FI') {
        return 'fin'
    }
    //斯洛文尼亚语
    if(to === 'slo') {
        return 'slo'
    }
    //文言文
    if(to === 'wyw') {
        return 'wyw'
    }
    //法语
    if(to === 'fr-fr' || to === 'fr-lu' || to === 'fr-ch' || to === 'fr-be' || to === 'fr-ca') {
        return 'fra'
    }
    //阿拉伯语
    if(to === 'ara') {
        return 'ara'
    }
    //德语
    if(to === 'de' || to === 'de-De') {
        return 'de'
    }
    //荷兰语
    if(to === 'nl' || to === 'nl-NL' || to === 'nl-BE') {
        return 'nl'
    }
    //爱沙尼亚语
    if(to === 'est') {
        return 'est'
    }
    //捷克语
    if(to === 'cs-CZ') {
        return 'cs'
    }
    //瑞典语
    if(to === 'swe') {
        return 'swe'
    }
    //越南语
    if(to === 'vie') {
        return 'vie'
    }
    //日语
    if(to === 'jp' || to === 'ja-JP') {
        return 'jp'
    }
    //西班牙语
    if(to === 'spa') {
        return 'spa'
    }
    //俄语
    if(to === 'ru' || to === 'ru-RU') {
        return 'ru'
    }
    //意大利语
    if(to === 'it' || to === 'it-IT') {
        return 'it'
    }
    //波兰语
    if(to === 'pl' || to === 'pl-PL') {
        return 'pl'
    }
    //丹麦语
    if(to === 'dan' || to === 'da-DK') {
        return 'dan'
    }
    //罗马尼亚语
    if(to === 'rom') {
        return 'rom'
    }
    //匈牙利语
    if(to === 'hu' || 'hu-HU') {
        return 'hu'
    }
}
//endregion

//语言选项
let SimpleLanguages = {
        en: "English",
        "zh-CN": "Chinese",
        "zh-": "ChineseTraditional",
        "ko-": "Korea",
        fr: "French",
        de: "German",
        "ja-": "Japanese",
        es: "Spanish",
        ru: "Russian",
        it: "Italy"
};
let Languages = {
    English: "English",
    Chinese: "简体中文",
    Korea: "한국인",
    French: "Français",
    German: "Deutsch",
    Japanese: "日本",
    Spanish: "Española",
    Russian: "русский",
    Italy: "Italia"
};
let SimpleLanguageKeys = Object.keys(SimpleLanguages);


//shift 选择文本
var onShiftInfo = {
    onShift: false,
    lastText: ""
};
//鼠标指针
var clientX, clientY = 0;
//最后一次选择的element
var lastElement = 0;
//全局变量 记录信息
var globalInfo = {
    enable: true,//是否启用
    enableKey: "b", //鼠标快捷键 ctrl+b 切换状态
    useShift: false,//使用Shift启用鼠标
    speechKey: "d",//鼠标快捷键 ctrl+d 是否播放语音
    to: "zh",
    popPosition: "up",//float-right float-left up down
    floatRight: false,//向右浮动
    from: "auto",
    mouseTranslate: true,
    lineTranslate: false,//是否翻译一行
    selectTranslate: true,
    showSameFromTo: false,//是否显示相同语言的翻译 英文翻译中文时遇到英文不显示
    isInSelected: false,//是否已选中
    ignoreChinese: true,//忽略特殊中文字符
    wordSpeech: false,
    sentenceSpeech: false,//句子演讲
    strongLine: false,
    uid: "",
    token: "",
    apiKey: "",
    secretKey: "",
    bigSize: true,
    ignoreUrl: [],
    apiType: 2//1-百度 2-腾讯
};
//初始化info
function initInfo() {
    chrome.storage.local.get('globalInfo', function(data) {
        if (data) {
            globalInfo = Object.assign(data.globalInfo)
        }
    });
}
initInfo();
//调用翻译api
function callApi(e) {
    if(globalInfo.apiType == 1) {
        return baiduTranslate(e);
    } else if(globalInfo.apiType == 2) {
        return tencentTranslate(e)
    }
}

const baiduUrl = "https://fanyi-api.baidu.com/api/trans/vip/translate";
//调用百度api
function baiduTranslate(text) {
    var salt = (new Date).getTime();
    var str1 = globalInfo.apiKey + text + salt + globalInfo.secretKey;
    var sign = MD5(str1);
    let data = {
            q: text,
            to: getBaiduLanguageTo(globalInfo.to),
            from: globalInfo.from,
            appid: globalInfo.apiKey,
            salt: salt,
            sign: sign
        };

    let url = `${baiduUrl}?q=${data.q}&from=${data.from}&to=${data.to}&appid=${data.appid}&salt=${data.salt}&sign=${data.sign}`;
    // chrome.runtime.sendMessage({ type: "fetchBaidu",data: url }, (response) => {
    //     console.log(response);
    //     if (response.complete) {
    //         console.log(response.data);
    //     }
    // });
    return new Promise(g => {
        chrome.runtime.sendMessage({
                type: "fetchBaidu",
                data: url
        }, res => g(res.data))
    })
    // return new Promise(g => {
    //     chrome.runtime.sendMessage({
    //         info: JSON.stringify({
    //             type: "fetchBaidu",
    //             data: url
    //         })
    //     }, h => g(h))
    // })
}

//签名方法参考https://cloud.tencent.com/document/api/213/30654
let tencentUrl = ""
function sha256(message, secret = '', encoding) {
    let hash = CryptoJS.HmacSHA256(message, secret)
    return hash
    // if (encoding === '') {
    //     return hash
    // }
   // return CryptoJS.enc.Hex.stringify(CryptoJS.enc.Hex.parse(hash.toString()));
    // const hmac = crypto.createHmac('sha256', secret)
    // return hmac.update(message).digest(encoding)
}

function getHash(message, encoding = 'hex') {
    let hash = CryptoJS.SHA256(message).toString()
    return CryptoJS.enc.Hex.stringify(CryptoJS.enc.Hex.parse(hash));
    // const hash = crypto.createHash('sha256')
    // return hash.update(message).digest(encoding)
}

function getDate(timestamp) {
    const date = new Date(timestamp * 1000)
    const year = date.getUTCFullYear()
    const month = ('0' + (date.getUTCMonth() + 1)).slice(-2)
    const day = ('0' + date.getUTCDate()).slice(-2)
    return `${year}-${month}-${day}`
}

function tencentTranslate(text) {
    // 密钥参数
    // 需要设置环境变量 TENCENTCLOUD_SECRET_ID，值为示例的 AKIDz8krbsJ5yKBZQpn74WFkmLPx3*******
    const SECRET_ID = globalInfo.apiKey
    // 需要设置环境变量 TENCENTCLOUD_SECRET_KEY，值为示例的 Gu5t9xGARNpq86cd98joQYCN3*******
    const SECRET_KEY = globalInfo.secretKey

    const endpoint = "tmt.tencentcloudapi.com"
    const service = "tmt"
    const region = "ap-guangzhou"
    const action = "TextTranslate"
    const version = "2018-03-21"
    const language = "zh-CN"
    //const timestamp = getTime()
    const timestamp = Math.ceil(Date.now() / 1000)
    //时间处理, 获取世界时间日期
    const date = getDate(timestamp)
    // ************* 步骤 1：拼接规范请求串 *************
    //const payload = "{\"Limit\": 1, \"Filters\": [{\"Values\": [\"\\u672a\\u547d\\u540d\"], \"Name\": \"instance-name\"}]}"
    const payload = JSON.stringify({
        SourceText: text,
        Source: 'auto',
        Target: 'zh',
        ProjectId: 0
    });
    const hashedRequestPayload = getHash(payload);
    const httpRequestMethod = "POST"
    const canonicalUri = "/"
    const canonicalQueryString = ""
    const canonicalHeaders = "content-type:application/json\n"
        + "host:" + endpoint + "\n"
        + "x-tc-action:" + action.toLowerCase() + "\n"
    const signedHeaders = "content-type;host;x-tc-action"

    const canonicalRequest = httpRequestMethod + "\n"
        + canonicalUri + "\n"
        + canonicalQueryString + "\n"
        + canonicalHeaders + "\n"
        + signedHeaders + "\n"
        + hashedRequestPayload
    // console.log(canonicalRequest)

    // ************* 步骤 2：拼接待签名字符串 *************
    const algorithm = "TC3-HMAC-SHA256"
    const hashedCanonicalRequest = getHash(canonicalRequest);
    const credentialScope = date + "/" + service + "/" + "tc3_request"
    const stringToSign = algorithm + "\n" +
        timestamp.toString() + "\n" +
        credentialScope + "\n" +
        hashedCanonicalRequest
    // console.log(stringToSign)

    // ************* 步骤 3：计算签名 *************
    const kDate = sha256(date, 'TC3' + SECRET_KEY)
    const kService = sha256(service, kDate)
    const kSigning = sha256('tc3_request', kService)
    const signature = CryptoJS.enc.Hex.stringify(sha256(stringToSign, kSigning));
    // console.log(signature)

    // ************* 步骤 4：拼接 Authorization *************
    const authorization = algorithm + " " +
        "Credential=" + SECRET_ID + "/" + credentialScope + ", " +
        "SignedHeaders=" + signedHeaders + ", " +
        "Signature=" + signature
    // console.log(authorization)

    let params = {
        authorization: authorization,
        contentType: 'application/json',
        host: endpoint,
        tcAction: action,
        tcTimestamp: timestamp.toString(),
        tcVersion: version,
        tcRegion: region,
        tcLanguage: language,
        payload: payload
    };
    const curlcmd = 'curl -X POST ' + "https://" + endpoint
        + ' -H "Authorization: ' + authorization + '"'
        + ' -H "Content-Type: application/json"'
        + ' -H "Host: ' + endpoint + '"'
        + ' -H "X-TC-Action: ' + action + '"'
        + ' -H "X-TC-Timestamp: ' + timestamp.toString() + '"'
        + ' -H "X-TC-Version: ' + version + '"'
        + ' -H "X-TC-Region: ' + region + '"'
        + ' -H "X-TC-Language: ' + language + '"'
        + " -d '" + payload + "'"
    // console.log(curlcmd)
    // console.log("---------------params---------------")
    // console.log(params)
    return new Promise(g => {
        chrome.runtime.sendMessage({
            type: "fetchTencent",
            data: params
        }, res => g(res.data))
    })
}
window.addEventListener("keydown", e => {
    if(e.key === "Shift") {
        onShiftInfo.onShift = true;
    }
});
window.addEventListener("keyup", e => {
    if(e.key === "Shift") {
        onShiftInfo.onShift = false;
    }
});

var weakSetElement = new WeakSet;
var de = {};
var CharactersArray = {
    "(": true,
    ")": true,
    "[": true,
    "]": true,
    "{": true,
    "}": true,
    "?": true,
    ".": true,
    ",": true,
    "!": true,
    "/": true,
    "\\": true,
    "..": true,
    "...": true,
    "....": true,
    ".....": true,
    "......": true
};
//特殊中文字符
const SpecialChineseCharacters = /[぀-ヿ㐀-䶿一-鿿豈-﫿ｦ-ﾟ]/;
//分割符号
var SplitCharacters = /(\s|\.|\,|\:|\!|\?|\"|\||\'|。|，|？|》|《)/g;
var  P = {};
//校验字符
function checkCharacter(e) {
    //文本长度过长
    if(e.length > 9999) {
        return false;
    }
    if(P[e]) {
        return false;
    }
    e = e.trim();
    //是否为特殊符号
    if(CharactersArray[e]) {
        return false;
    }
    if(e.length <= 0){
        return false;
    }
    //检测一个字符串是否匹配某个模式.
    if(/^(http\:\/\/|https:\/\/)/.test(e)) {
        return false;
    }
    if(/(function\(|\<script|\<style|background\:|color\:|font-size\:)/.test(e)) {
        return false;
    }
    //检测是否为数字
    if(!isNaN(Number(e))) {
        return false;
    }
    //含有特殊中文字符
    if(globalInfo.ignoreChinese && SpecialChineseCharacters.test(e)) {
        P[e] = true;
        return false;
    }
    return true;
}

//调用api翻译
async function translateText(text, translateRes) {
	//e 鼠标选中单词
    try {
        //替换换行符号和标点符号
        text = text.replace(/-\n/g, "").replace(/\n/g, " ").replace(/(-|\.|,|\?)$/g, "")
    } catch (g) {}

    // let res = {
    //     translatedText: "",
    //     bSame: false
    // }

    let n = g => {
        !g || (globalInfo.showSameFromTo || g.to !== g.from) && translateRes(g.dst, g.to === g.from)
    };
	// $ = "";
    // if ($ !== "") return n({
    //     dst: $,
    //     from: "en",
    //     to: "zh"
    // });

    if (!checkCharacter(text)) return translateRes(text,globalInfo.to === globalInfo.from);
    onShiftInfo.lastText = text;
    let f = text + globalInfo.to;
    let p = de[f];
	// console.log(p);
    // if (p) {
    //     n(p);
	// 	console.log(p);
    //     return
    // }
    callApi(text).then(res => {
        try {
            //百度
            if(globalInfo.apiType == 1) {
                let json = JSON.parse(res);
                if (json.error_code) {
                    console.log(json);
                    return;
                }
                if (!json.trans_result || !json.trans_result[0]) {
                    console.log(json);
                    return;
                }
                let dst = "";
                json.trans_result.forEach(S => {
                    dst += S.dst;
                });
                return translateRes(dst,json.from === json.to);
            } else if(globalInfo.apiType == 2) {
                //腾讯
                let json = JSON.parse(res);
                if(!json.Response) {
                    return
                }
                if(json.Response.Error) {
                    console.log(json.Response.Error)
                    return
                }
                // if(res.Response.TargetText)
                return translateRes(json.Response.TargetText,json.Response.Source === json.Response.Target);
            }
        } catch (d) {
            n({
                from: globalInfo.from,
                to: globalInfo.to,
                dst: res
            })
        }
    })
}
//语音合成
var utterance = new SpeechSynthesisUtterance();
//当前设备所有可用声音的列表
var voices = window.speechSynthesis.getVoices();

var lastSpeechText = "_____________";
//播报文本
function speechText(text) {
    if (!text) return;
    let rate = .8;//说话的速度
    if(text.length < 3) {
        rate = .2;
    } else if(text.length < 4){
        rate = .5;
    } else if(text.length < 5){
        rate = .6;
    }
    speechSynthesis.cancel();
    utterance.voice = voices[0];
    utterance.volume = .9;
    utterance.rate = rate;
    utterance.pitch = .8;
    utterance.text = text;
    utterance.lang = "en";
    //语音说完后触发
    utterance.onend = function(n) {
        speechSynthesis.cancel()
    };
    speechSynthesis.speak(utterance)
}
//播报文本及记录 防重复
function handleSpeechText(text) {
    if (!text) return;
    let textLen = text.split(" ").length;
    if(!globalInfo.sentenceSpeech && textLen > 3 || !globalInfo.wordSpeech && textLen < 4 || text !== lastSpeechText) {
        return;
    }
    lastSpeechText = text;
    speechText(text);
}
const ID_PREFIX = "translate-";//id前缀
//pop位置
const POP_POSITION_UP = "up";
const POP_POSITION_FLOAT_RIGHT = "float-right";
const POP_POSITION_FLOAT_LEFT = "float-left";

function createPop(e = "pop") {
    let element = document.getElementById(ID_PREFIX + e);
    if (element) return element;
    let span = document.createElement("span");
    span.style.cssText = 'opacity:1; font-size:13px; width:auto; max-width:400px; display:inline; position:fixed; top:0px; left:0; z-index:9999; pointer-events:none; padding:5px 7px; background:rgba(10,10,11,0.95); color:rgba(255,255,255,0.93); box-shadow:0px 2px 2px rgba(0,0,0,0.07); border-radius:5px; line-height:1.3; font-family: "SF Pro SC","SF Pro Text","SF Pro Icons","PingFang SC","Helvetica Neue","Helvetica","Arial",sans-serif;';
    if(globalInfo.bigSize) {
        span.style.fontSize = "17px";
    }
    //位置
    if(e === "pop") {
        if(globalInfo.popPosition === POP_POSITION_FLOAT_RIGHT) {
            span.style.left = "auto";
            span.style.right = "50px";
            span.style.top = "50px";
        } else if(globalInfo.popPosition === POP_POSITION_FLOAT_LEFT) {
            span.style.right = "auto";
            span.style.left = "50px";
            span.style.top = "50px";
        }
    }
    span.textContent = "";
    span.id = ID_PREFIX + e;
    weakSetElement.add(span);
    document.body.append(span);
    return span;
}

function showTranslated(element) {
    if(!element.translated || !element.translateText) {
        return;
    }
    let elementRect = element.getBoundingClientRect();

    let translatedPop = createPop();//翻译文本pop
    let translatedPopRect = translatedPop.getBoundingClientRect();
    translatedPop.textContent = element.translateText;
    if(globalInfo.popPosition === POP_POSITION_UP) {
        translatedPop.style.right = "auto";
        translatedPop.style.left = elementRect.x + elementRect.width / 2 - translatedPopRect.width / 2 + "px";
        if(elementRect.y < 60) {
            translatedPop.style.top = elementRect.y + elementRect.height + 5 + "px";
        } else {
            var height = translatedPopRect.height;
            if(height <= 10) {
                height = 26;
            }
            translatedPop.style.top = elementRect.y - height - 5 + "px";
        }
    }

    translatedPop.style.opacity = "1";
    let translatedLine = createLine();
    translatedLine.style.opacity = "1";
    translatedLine.style.left = elementRect.x + "px";
    translatedLine.style.top = elementRect.y + elementRect.height + 2 + "px";
    translatedLine.style.width = elementRect.width + "px";
}
function createLine(e = "line") {
    let element = document.getElementById(ID_PREFIX + e);
    if (element) return element;
    let div = document.createElement("div");
    div.style.cssText = "opacity:1;z-index:9999; pointer-events:none; height:1px; width: 0px; position:fixed; top:0px; left:0px;";
    globalInfo.strongLine ? div.style.background = "rgba(0,0,0,0.55)" : div.style.background = "rgba(128,128,128,0.4)";
    div.id = ID_PREFIX + e;
    weakSetElement.add(div);
    document.body.append(div);
    return div;
}
//符号
var ELEMENT_MATCHER = /(\:|,|\.|\?|\!|\=|\+|\"|\'|\(|\)|，|。|？|》|《)/g;

//在element上添加事件
function addListenerOnElement(e) {
    e.addEventListener("mouseenter", () => {
        handleElementMouseEnter(e)
    }, true);
    e.addEventListener("mousemove", () => {
        handleElementMouseEnter(e)
    }, true);
    e.addEventListener("mouseout", () => {
        hidePopLine()
    }, true);
    e.addEventListener("mouseleave", () => {
        hidePopLine()
    }, true);
    e.addEventListener("mouseover", () => {
        hidePopLine()
    }, true);
}

//正在翻译的文本
var currentText;
//定时
let timeoutShow;
let timeoutHide;
window.addEventListener("scroll", () => {
    hidePopLine()
});
const mapTranslate = new WeakMap();

function handleElementMouseEnter(element) {
    if (!globalInfo || !globalInfo.enable
        || globalInfo.useShift && !onShiftInfo.onShift) return;
    if(!globalInfo.mouseTranslate) {
        return;
    }
    //正在进行翻译 减少重复调用api
    if(element.beInProgress) {
        return;
    }
    element.beInProgress = true;
    if(timeoutHide) {
        clearTimeout(timeoutHide);
    }
    timeoutHide = setTimeout(() => {
        hidePopLine()
    }, element.textContent.length > 40 ? 13500 : 3500);
    if(timeoutShow) {
        clearTimeout(timeoutShow);
    }

    // timeoutShow = setTimeout(() => {

        if (globalInfo.isInSelected) {
            hidePopLine();
            element.beInProgress = false;
            return;
        }

        if(element.translated && element.translateText) {
            showTranslated(element);
            element.beInProgress = false;
            return;
        }

        let text = element.textContent.trim();
        //替换空字符串和其他符号
        if(/\s/.test(text)) {
            text = text.replace(ELEMENT_MATCHER, "");
        }

        currentText = text;

        translateText(text, (translatedText, same) => {
            if (same && !globalInfo.showSameFromTo) {
                hidePopLine();
                element.beInProgress = false;
                return;
            }
            //判断被翻译的文本是否为空
            if (!translatedText) {
                hidePopLine();
                element.beInProgress = false;
                return;
            }

            if (currentText !== text) {
                element.beInProgress = false;
                return;
            };
            //记录
            mapTranslate.set(element,translatedText);
            element.translated = true;
            element.translateText = translatedText;

            showTranslated(element);
            handleSpeechText(text)
            element.beInProgress = false;

        })
    // }, 20);
};
function hidePopLine () {
    let pop = createPop();
    let line = createLine();
    line.style.opacity = "0";
    pop.style.opacity = "0";
    pop.textContent = "";
};

//状态pop
var timeoutStatus;
//创建显示状态pop
function createStatusPop() {
    let e = createPop("enable");
    e.style.right = "10px";
    e.style.left = "auto";
    return e;
}
let EnglishStatusEnable = "Translate is enable";
let ChineseStatusEnable = "Translate 已启用";
let EnglishStatusDisable = "Translate is disable";
let ChineseStatusDisable = "Translate 已禁用";
//显示当前翻译插件状态
function showStatusPop() {
    let statusPop = createStatusPop();
    if(globalInfo.to === "zh") {
        statusPop.textContent = globalInfo.enable ? ChineseStatusEnable : ChineseStatusDisable;
    } else if(globalInfo.to === "en") {
        statusPop.textContent = globalInfo.enable ? EnglishStatusEnable : EnglishStatusDisable;
    }
    statusPop.style.top = "10px";
    statusPop.style.opacity = "1";
    if(timeoutStatus) {
        clearTimeout(timeoutStatus);
    }
    //两秒后消失
    timeoutStatus = setTimeout(() => {
        statusPop.style.opacity = "0"
    }, 2000)
}
//返回选中的element text xy坐标
function getSelectElement() {
    let item = {
        element: null,
        text: "",
        x: 0,
        y: 0
    }
    var selectedText = window.getSelection().toString();
    if (selectedText) {
        let text = selectedText.trim();
        if (text) {
            item.text = text;
            let selection = document.getSelection();
            //anchorNode 返回该选区起点所在的节点（Node）
            if (selection && selection.anchorNode && selection.anchorNode.parentElement) {
                let rect = selection.getRangeAt(0).getBoundingClientRect();
                item.element = selection.anchorNode.parentElement;

                item.x = rect.x;
                item.y = rect.y;
            }
        }
    }
    return item;
}
var timeoutSelect;
//创建选中翻译pop
function createSelectPop() {
    return createPop("select")
}
//翻译选中文本
var handleSelectTranslate = () => {
    if(!globalInfo.enable) {
        return;
    }
    if( !globalInfo.selectTranslate) {
        return;
    }
    // if(timeoutSelect) {
    //     clearTimeout(timeoutSelect);
    // }

    setTimeout(() => {
    let item = getSelectElement();
    let selectPop = createSelectPop();
    if (item.element && item.text) {
        translateText(item.text, (translatedText, same) => {
            if (same && !globalInfo.showSameFromTo) return;
            selectPop.textContent = translatedText;
            let rect = selectPop.getBoundingClientRect();
            selectPop.style.opacity = "1";
            if(globalInfo.floatRight) {
                selectPop.style.top = "50px";
                selectPop.style.right = "50px";
                selectPop.style.left = "auto";
            } else {
                selectPop.style.right = "auto";
                selectPop.style.top = item.y - rect.height - 15 + "px";
                selectPop.style.left = item.x + "px";
            }
            globalInfo.isInSelected = true
            hidePopLine();
            handleSpeechText(item.text)
        });
    } else {
        selectPop.style.opacity = "0";
        globalInfo.isInSelected = false
    }
    }, 20);
};
window.addEventListener("mouseup", handleSelectTranslate);
window.addEventListener("mousedown", () => {
    if(globalInfo.selectTranslate) {
        globalInfo.isInSelected = true;
    }
});
window.addEventListener("scroll", handleSelectTranslate);
var rt = new Set(["altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "linearGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "script", "set", "stop", "style", "svg", "switch", "symbol", "text", "textPath", "title", "tref", "tspan", "use", "view", "vkern"]);

function Z(e) {
    //SVGElement 返回true
    if(e instanceof SVGAElement) {
        return true;
    }
    if(e.tagName && rt.has(e.tagName.toLowerCase())) {
        return true;
    }
    return false;
}

//获取element之后
function handleGetElement(e) {
    //element 为空
    if(!e) {
        return;
    }
    if(e.parentElement && e.parentElement.translated) {
        return;
    }
    if(weakSetElement.has(e)) {
        return;
    }
    weakSetElement.add(e);
    //TODO
    if(Z(e)) return;

    [...e.childNodes].forEach(node => {
        if (!weakSetElement.has(node) && node.nodeType === node.TEXT_NODE && node.textContent && node.parentElement && !node.parentElement.translated) {
            weakSetElement.add(node);
            if (node.parentElement.closest && node.parentElement.closest(".monaco-editor")) return;
            requestAnimationFrame(() => {
                findText(node)
            })
        }
    })
}

//从element中找到文本 分割文本添加span translate记录只分割一次
function findText(node) {
    if (!node || node.translated || node &&
        (node.contentEditable == "true" || node.nodeName === "INPUT" || node.nodeName === "TEXTAREA") || Z(node)) return;
    let text = node.textContent;
    //去除长度>9999 数字 特殊中文的字符
    if (!checkCharacter(text)) return;
    let textNode;
    if(node.nodeName === "#text" && node.tagName == null) {
        textNode = document.createElement("span");
        textNode.style.cssText = "all: unset";
        textNode.addEventListener("mousedown", () => {
            textNode.style.pointerEvents = "none", setTimeout(() => {
                textNode !== null && (textNode.style.cssText = "all: unset")
            }, 500)
        });
    } else {
        textNode = node;
    }

    textNode.translated = true;
    node.translated = true;
    //全行翻译
    if(globalInfo.lineTranslate) {
        textNode.textContent = text;
        addListenerOnElement(textNode);
    } else { //单字翻译
        //根据分割符号分割字符串 去除空字符串
        text.split(SplitCharacters).filter(Boolean).forEach(item => {
            let span = document.createElement("span");
            span.id = generateUUID();
            span.style.cssText = "all: unset";
            span.textContent = item;
            span.translated = true;
            let g = item.trim();
            if(g && g.length > 0) {
                //非数字 ![^0-9]
                if(!/\d/.test(g)) {
                    addListenerOnElement(span);
                }
            }
            textNode.appendChild(span);
        })
    }
    //添加下划线
    if(node.nodeName === "#text" && node.tagName == null) {
        node.replaceWith(textNode);
    }
}

//获取坐标点下的元素
function getElementFromPoint() {
    let elementFromPoint = document.elementFromPoint(clientX, clientY);
    if(!elementFromPoint) {
        return;
    }
    if(elementFromPoint != lastElement){
        hidePopLine();
        lastElement = elementFromPoint;
        handleGetElement(elementFromPoint);
    }
    //e ? (e != lastElement && E(), Ee(e), lastElement = e) : E()
}


//鼠标快捷键切换是否允许翻译或语音
window.addEventListener("keydown", e => {
    if(!e.ctrlKey) {
        return;
    }
    if(!e.key) {
        return;
    }
    //翻译
    if(e.key === globalInfo.enableKey) {
        globalInfo.enable = !globalInfo.enable;
        showStatusPop();
        globalInfo.enable ? getElementFromPoint() : hidePopLine();
    }
    //语音
    if(e.key === globalInfo.speechKey) {
        speechText(onShiftInfo.lastText);
    }
});


//鼠标移动
window.addEventListener("mousemove", e => {
    //未启用
    if(!globalInfo.enable) {
        return;
    }
    //TODO 是否
    if(globalInfo.useShift) {
        return;
    }
    if(!onShiftInfo.onShift) {
        clientX = e.clientX;
        clientY = e.clientY;
        getElementFromPoint();
    }
})

function generateUUID() {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}