let inventory = {
    汚れた鍵: false,
    コイン: false,
    宝石: false,
    トイレの鍵: false,
    寝室の鍵: false,
    玄関の鍵: false,
    屋根裏部屋の鍵: false,
    赤いくまの人形: false
};

let currentRoom = "大広間";
let basementSearchCount = 0;

const roomImages = {
    "大広間": "images/大広間.png",
    "玄関": "images/玄関.png",
    "図書室": "images/図書室.png",
    "キッチン": "images/キッチン.png",
    "お風呂場": "images/お風呂場.png",
    "トイレ（1F）": "images/トイレ.png",
    "廊下（2F）": "images/廊下2F.png",
    "寝室": "images/寝室.png",
    "こども部屋": "images/こども部屋.png",
    "客室": "images/客室.png",
    "トイレ（2F）": "images/トイレ.png",
    "屋根裏部屋": "images/屋根裏部屋.png",
    "地下室": "images/地下室.png"
};

function startGame() {
    document.getElementById("title-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
}

function updateButtons() {
    document.querySelectorAll(".button").forEach(button => button.style.display = 'none');

    if (currentRoom === "大広間") {
        document.getElementById("entrance-button").style.display = 'inline';
        document.getElementById("kitchen-button").style.display = 'inline';
        document.getElementById("bathroom-button").style.display = 'inline';
        document.getElementById("toilet-button").style.display = 'inline';
        document.getElementById("staircase-button").style.display = 'inline';
        document.getElementById("basement-button").style.display = 'inline';
    } else if (["玄関", "キッチン", "お風呂場", "トイレ（1F）", "地下室"].includes(currentRoom)) {
        document.getElementById("hall-button").style.display = 'inline';
    } else if (currentRoom === "廊下（2F）") {
        document.getElementById("hall-button").style.display = 'inline';
        document.getElementById("bedroom-button").style.display = 'inline';
        document.getElementById("kids-room-button").style.display = 'inline';
        document.getElementById("guest-room-button").style.display = 'inline';
        document.getElementById("toilet2f-button").style.display = 'inline';
        document.getElementById("library-button").style.display = 'inline';
        document.getElementById("attic-button").style.display = 'inline';
    } else if (["寝室", "こども部屋", "客室", "トイレ（2F）", "図書室", "屋根裏部屋"].includes(currentRoom)) {
        document.getElementById("staircase-button").style.display = 'inline';
    }

    if (currentRoom === "玄関" && inventory["玄関の鍵"]) {
        document.getElementById("escape-button").style.display = 'inline';
    }
    document.getElementById("search-button").style.display = 'inline';
}

function moveToRoom(roomName) {
    if (roomName === "寝室" && !inventory["寝室の鍵"]) {
        alert("寝室は鍵がかかっていて、入れません。\n");
        return;
    }
    if (roomName === "トイレ（1F）" && !inventory["トイレの鍵"]) {
        alert("鍵がかかって入れない。\n");
        return;
    }
    if (roomName === "屋根裏部屋" && !inventory["屋根裏部屋の鍵"]) {
        alert("屋根裏部屋は鍵がかかっていて、入れません。\n");
        return;
    }
    currentRoom = roomName;
    document.getElementById("intro-text").style.display = "none"; // Hide the intro text after first move
    updateRoomLabel();
    updateRoomImage();
    updateButtons();
    updateInventory();
}

function updateRoomLabel() {
    document.getElementById("room-label").textContent = `あなたは${currentRoom}にいます。`;
}

function updateRoomImage() {
    document.getElementById("room-image").src = roomImages[currentRoom];
}

function updateInventory() {
    const inventoryList = document.getElementById("inventory-list");
    inventoryList.innerHTML = "";
    for (let item in inventory) {
        if (inventory[item]) {
            let listItem = document.createElement("li");
            listItem.textContent = item;
            inventoryList.appendChild(listItem);
        }
    }
}

function searchRoom() {
    const clues = {
        "玄関": "開かない",
        "大広間": "重要な手がかりがありそうです。",
        "図書室": "本の間に紙が挟まっています。紙には「眠たいな, 2, 5, 8」と書かれています。",
        "キッチン": "鍵のかかった箱を見つけました。",
        "寝室": "",
        "トイレ（1F）": "寝室の鍵を手に入れた。",
        "お風呂場": "何も見つかりません。",
        "こども部屋": "子供がいたのだろうか",
        "客室": "少しきれいだ。",
        "トイレ（2F）": "何も見つかりません。",
        "屋根裏部屋": "古い日記を見つけました。日記には「お腹がすいたな, 3, 6, 9」と書かれています。",
        "地下室": "不気味だ。進むのはやめておこう。"
    };

    if (currentRoom === "寝室" && !inventory["汚れた鍵"]) {
        alert("謎の箱を見つけた\n" + clues["寝室"]);
        const code = prompt("箱の暗証番号を入力してください（3桁の数字）:");
        if (code === "258") {
            alert("正しい番号です！箱が開きました。汚れた鍵を見つけました。");
            inventory["汚れた鍵"] = true;
            delete inventory["謎の箱の鍵"];
        } else {
            alert("間違った番号です。箱は開きません。");
        }
    } else if (currentRoom === "キッチン"&& !inventory["玄関の鍵"]) {
        alert(clues["キッチン"]);
        const code = prompt("箱の暗証番号を入力してください（3桁の数字）:");
        if (code === "369") {
            alert("正しい番号です！箱が開きました。玄関の鍵を見つけました。");
            inventory["玄関の鍵"] = true;
            delete inventory["鍵のかかった箱の鍵"];
        } else {
            alert("間違った番号です。箱は開きません。");
        }
    } else if (currentRoom === "地下室") {
        basementSearchCount++;
        if (basementSearchCount >= 3) {
            alert("地下室で怪物に襲われました。ゲームオーバー！");
            quitGame();
            return;
        } else {
            alert(clues["地下室"]);
        }
    } else {
        alert(clues[currentRoom] || "ここには何も見つかりません。");
    }

    if (currentRoom === "トイレ（1F）") {
        inventory["寝室の鍵"] = true;
    }

    if (currentRoom === "図書室" && !inventory["コイン"] && !inventory["トイレの鍵"]) {
        inventory["コイン"] = true;
        alert("古いコインを見つけました。\n");
    } else if (currentRoom === "客室" && !inventory["宝石"]&& !inventory["トイレの鍵"]) {
        inventory["宝石"] = true;
        alert("輝く宝石を見つけました。\n");
    }

    if (inventory["コイン"] && inventory["宝石"] && !inventory["トイレの鍵"]) {
        inventory["トイレの鍵"] = true;
        alert("コインと宝石を組み合わせて、新しい鍵を作りました。\nトイレ（1F）の鍵を手に入れた\n");
        delete inventory["コイン"];
        delete inventory["宝石"];
    }

    if (currentRoom === "お風呂場" && inventory["汚れた鍵"]) {
        cleanKey();
        delete inventory["汚れた鍵"];
    }
    if (currentRoom === "こども部屋" && inventory["玄関の鍵"]) {
        alert("ベッドの上に人形が置いてある...\n赤いくまの人形を手に入れた。");
        inventory["赤いくまの人形"] = true;
    }

    updateInventory();
}

function cleanKey() {
    if (currentRoom === "お風呂場" && inventory["汚れた鍵"]) {
        alert("汚れた鍵をきれいに洗いました。");
        inventory["屋根裏部屋の鍵"] = true;
        delete inventory["汚れた鍵"];
    } else if (currentRoom !== "お風呂場") {
        alert("ここでは鍵を洗えません。");
    } else {
        alert("汚れた鍵がありません。");
    }
}

function escape() {
    if (currentRoom === "玄関" && inventory["玄関の鍵"]) {
        if (inventory["赤いくまの人形"]){
            alert("おめでとう！、完全脱出！");
            quitGame();
        }
        alert("鍵を使って扉を開けました。脱出成功！");
        quitGame();
    } else {
        alert("鍵が必要です。");
    }
}

function openDoor() {
    alert("鍵を使って扉を開けました。");
}

function quitGame() {
    document.location.reload();
}

updateButtons();
updateInventory();
