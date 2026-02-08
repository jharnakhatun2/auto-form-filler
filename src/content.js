chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "FILL_FORM") {
    chrome.storage.sync.get(["formData"], (res) => {
      const data = res.formData;
      if (!data) return;

      fillInput("input[name='name']", data.name);
      fillInput("input[name='email']", data.email);
      fillInput("input[name='phone']", data.phone);
    });
  }
});

function fillInput(selector, value) {
  const input = document.querySelector(selector);
  if (input) input.value = value;
}
