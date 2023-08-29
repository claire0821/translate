//region 初始化
//当前浏览器设置的语言
let currentLanguage = "";
//用于提供当前浏览器及操作系统等信息
// language 当前浏览器语言
// userLanguage 当前操作系统设定的自然语言 null deprecated
// browserLanguage 当前浏览器的语言 null
// systemLanguage 当前操作系统的语言 deprecated
if (navigator) {
    currentLanguage = navigator.language;
} else {
    currentLanguage = 'zh'
}
//endregion

// 获取用户信息
async function send(url) {
    try {
        console.log(url)
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            'contentType': 'json'
        });

        return await response.text();
    } catch (error) {
        console.log('Request Failed', error);
    }
}
let tencentUrl = "https://tmt.tencentcloudapi.com"
async function fetchTencent(params) {
    try {
        let response = await fetch(tencentUrl, {
            method: 'POST',
            timeout: 2000,
            headers: {
                'Content-Type': params.contentType,
                'Host': params.host,
                'X-TC-Action': params.tcAction,
                'X-TC-Region': params.tcRegion,
                'X-TC-Timestamp': params.tcTimestamp,
                'X-TC-Version': params.tcVersion,
                'X-TC-Language': params.tcLanguage,
                'Authorization': params.authorization,
                'Accept': 'application/json'
            },
            body: params.payload
        });
        return await response.text();
    } catch (error) {
        console.log('Request Failed', error);
    }
}
// 后台监听事件消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // console.log(message.type)
    // console.log(message)

    let requestType = message.type;
    switch (requestType) {
        case "get":
            chrome.storage.local.get('globalInfo', (data) => {
                let globalInfo = {
                    enable: true,//是否启用
                    enableKey: "b", //鼠标快捷键 ctrl+b 切换状态
                    speechKey: "d",//鼠标快捷键 ctrl+d 是否播放语音
                    to: currentLanguage,
                    popPosition: "up",//float-right float-left up down
                    floatRight: false,//向右浮动
                    from: "auto",
                    mouseTranslate: true,
                    useShift: false,//使用Shift
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
                    bigSize: false,
                    ignoreUrl: [],
                    apiType: 2
                };
                var arr = Object.keys(data);
                if (data && arr.length > 0) {
                    globalInfo = Object.assign(data.globalInfo)
                }
                sendResponse({ "status": 1, "data": globalInfo });
            });
            break;
        case "set":
            // var currentTab = getCurrentTab();
            // var tabs = sendMessageToActiveTab();
            // console.log(tabs)
            chrome.storage.local.set({"globalInfo": message.data}, function() {
                // chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                //     let message = {
                //         info: "来自background的情书 ",
                //     };
                //     chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
                //         console.log("background=>content");
                //         console.log(response);
                //
                //     });
                // })
                // chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                //     chrome.tabs.sendMessage(tabs[0].id,{number: 1},(response) => {
                //         console.log(tabs[0])
                //         console.log(response)
                //         console.log(
                //             `background -> content script infos have been received. number: 1`
                //         );
                //     });
                // });
                // 消息回传
                // sendResponse({number: 1});


                // chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
                //     let message = {
                //         info: "来自background的情书 ",
                //     };
                //     chrome.tabs.sendMessage(tabId, message, (res) => {
                //         console.log("background=>content");
                //         console.log(res);
                //     });
                // });
                sendResponse({ "status": 1, "data": "success" });
                // chrome.runtime.sendMessage({ type: "update",data: message.data }, (response) => {
                //     console.log(response)
                // });
            });
            break;
        case "fetchBaidu":
            (async () => {
                const data = await send(message.data);
                console.log(data)
                sendResponse({ "status": 1, "data": data });
            })();
            break;
        case 'fetchTencent':
            (async () => {
                const data = await fetchTencent(message.data);
                console.log(data)
                sendResponse({ "status": 1, "data": data });
            })();
            break
        case "log":


            console.log("log---------------")
            console.log(message.data)
            // chrome.i18n.getMessage("enable")
            // console.log(chrome.i18n.getMessage("enable"));
            // chrome.i18n.setLocale('zh')
            // console.log(chrome.i18n.getMessage("enable"));
            break;
        case "setLanguage":
            if(message.data === "zh-CN" || message.data === "zh") {
                language = "zh";
            }
            break;
    }
    // 这里一定要写个，保证async异步执行完成
    console.log("return")
    return true;
});
async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

async function sendMessageToActiveTab(message) {
    const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    return tabs;
    // const response = await chrome.tabs.sendMessage(tab.id, message);
    // TODO: Do something with the response.
}

