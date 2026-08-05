const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxl1_PVNVugXAuVVX641uLxYHwBJEW62weuZQ7fpU6xEckTadl9PiQ1AMUXEZIfbC-U_A/exec";

const form = document.getElementById("reportForm");
const button = document.querySelector(".submit-btn");
const toast = document.getElementById("toast");

function showToast(message, success = true) {

    toast.innerHTML = message;

    toast.style.borderColor = success ? "#38ef7d" : "#ff4d6d";

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3500);

}

form.addEventListener("submit", async function(e) {

    e.preventDefault();

    button.disabled = true;

    button.innerHTML = "⏳ ОТПРАВКА...";

    const formData = new URLSearchParams();

    formData.append("name", document.getElementById("name").value.trim());
    formData.append("static", document.getElementById("static").value.trim());
    formData.append("discord", document.getElementById("discord").value.trim());
    formData.append("proof", document.getElementById("proof").value.trim());

    try {

        const response = await fetch(SCRIPT_URL, {

            method: "POST",

            body: formData

        });

        const result = await response.text();

        if(result === "success"){

            showToast("✅ Отчет успешно отправлен!");

            form.reset();

        }else{

            showToast("❌ Ошибка отправки!", false);

        }

    } catch(error){

        console.error(error);

        showToast("❌ Не удалось подключиться к серверу.", false);

    }

    button.disabled = false;

    button.innerHTML = "🚀 ОТПРАВИТЬ ОТЧЕТ";

});