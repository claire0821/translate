
const checkboxEnable = document.getElementById("checkboxEnable");
const spanShortcutKeys = document.getElementById("spanShortcutKeys");
const textAPPID = document.getElementById("textAPPID");
const textPassword = document.getElementById("textPassword");
const btnSave = document.getElementById("btnSave");
const selectPopPosition = document.getElementById("selectPopPosition");
const selectApiType = document.getElementById("selectApiType");
let globalInfo;
function init() {
    chrome.runtime.sendMessage({type: "setLanguage",data:window.navigator.languages[0]})
    chrome.runtime.sendMessage({ type: "get"}, (response) => {
        chrome.runtime.sendMessage({ type: "log",data: response}, (response) => {
        });
        globalInfo = Object.assign(response.data);

        checkboxEnable.checked = globalInfo.enable;
        spanShortcutKeys.textContent = "(Ctrl+" + globalInfo.enableKey + ")";
        textAPPID.value = globalInfo.apiKey;
        textPassword.value = globalInfo.secretKey;
        selectPopPosition.value = globalInfo.popPosition;
        if(globalInfo.apiType == 1) {
            selectApiType.value = "百度"
        } else if(globalInfo.apiType == 2) {
            selectApiType.value = "腾讯"
        }
        chrome.runtime.sendMessage({ type: "log",data: globalInfo}, (response) => {
        });
    });

    btnSave.onclick = save;

}
function notify(msg) {
    chrome.notifications.create({
        "type": "basic",
        "iconUrl": "logo/logo16.png",
        "title": "",
        "message": msg
    }, function (notificationId) {
        setTimeout(function () {
            chrome.notifications.clear(notificationId);
        }, 5000);
    });
}
function save() {
    globalInfo.enable = checkboxEnable.checked;
    globalInfo.apiKey = textAPPID.value;
    globalInfo.secretKey = textPassword.value;
    globalInfo.popPosition = selectPopPosition.value;
    if(selectApiType.value === "百度") {
        globalInfo.apiType = 1
    } else if(selectApiType.value === "腾讯") {
        globalInfo.apiType = 2
    }
    chrome.runtime.sendMessage({ type: "set",data: globalInfo }, (response) => {
        console.log(response);
        chrome.runtime.sendMessage({ type: "log",data: response}, (response) => {
        });

        if(response.status === 1) {
            notify("设置成功")
        } else {
            notify("设置失败")
        }
    });
}
init();

// document.addEventListener('DOMContentLoaded', function () {
//
//
//     // // 向background.js发送通讯
//     // document.querySelector("#getUserData").onclick = function () {
//     //     chrome.runtime.sendMessage({ type: "getUserData" }, (response) => {
//     //         console.log(response);
//     //         if (response.complete) {
//     //             console.log(response.data);
//     //         }
//     //     });
//     // };
//     //
//     // // 向background.js发送通讯
//     // document.querySelector("#notifyMessage").onclick = function () {
//     //     chrome.runtime.sendMessage({ type: "notify" }, (response) => {
//     //         if (response.complete) {
//     //             window.close();
//     //         }
//     //     });
//     // };
// });
