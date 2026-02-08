chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "FILL_FORM") {
        chrome.storage.sync.get(["formData"], (res) => {
            const data = res.formData;
            if (!data) return;

            fillReactInput("#name", data.name);
            fillReactInput("#email", data.email);
            fillReactInput(".PhoneInputInput", data.phone);
        });
    }
});

function fillReactInput(selector, value) {
    const input = document.querySelector(selector);
    if (!input) {
        console.log("Not found:", selector);
        return;
    }

    const nativeSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
    ).set;

    nativeSetter.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
}
