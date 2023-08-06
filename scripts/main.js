import {initConfig} from "./config.js";
import { registerSettings } from "./settings.js";

export const MODULE_ID = "dialog-extended";

Hooks.on("init", () => {
    initConfig();
    registerSettings();
    Dialog.input = inputDialog;
});

Hooks.on("ready", async () => {
    //Test
    const dialogData = await Dialog.input({
        title: "Test",
        content: "This is a test input dialog, pick something",
        inputs: {
            myText: {
                type: "text",
                label: "My Text Input",
                placeholder: "Enter some text here",
                default: "Hello World"
            },
            myNumber: {
                type: "number",
                label: "My Number Input",
                placeholder: "Enter a number here",
                default: 42
            },
            mySelect: {
                type: "select",
                label: "My Select Input",
                options: {
                    1: "Option 1",
                    2: "Option 2",
                    3: "Option 3"
                },
                default: 2
            },
            myCheckbox: {
                type: "checkbox",
                label: "My Checkbox Input",
                default: true
            },
            myColor: {
                type: "color",
                label: "My Color Input",
                default: "#ff0000"
            },
            myFilePicker: {
                type: "filePicker",
                filePicker: "imagevideo",
                label: "My File Picker Input",
                placeholder: "path/to/file"
            },
            myRange: {
                type: "range",
                label: "My Range Input",
                min: 0,
                max: 100,
                step: 1,
                default: 50
            },
        }
    });
    console.log(dialogData);
})

async function inputDialog({title, content, inputs, render, defaultYes = true, options = {}} = {}) {
    const inputDialogContent = await getHtml(content, inputs);
    return new Promise((resolve, reject) => {
        new Dialog({
            title,
            content: inputDialogContent,
            focus: true,
            default: defaultYes ? "yes" : "no",
            buttons: {
                yes: {
                  icon: '<i class="fas fa-check"></i>',
                  label: game.i18n.localize("Yes"),
                  callback: html => resolve(getData(html))
                },
                no: {
                  icon: '<i class="fas fa-times"></i>',
                  label: game.i18n.localize("No"),
                  callback: () => resolve(false)
                }
            },
            render: (html) => {
                const el = html[0];
                el.querySelectorAll('input[type="color"]').forEach((input) => {
                    input.addEventListener("change", (event) => {
                        input.closest(".form-fields").querySelector(".color").value = event.target.value;
                    });
                });
                el.querySelectorAll("button.file-picker").forEach((button) => {
                    button.addEventListener("click", _activateFilePicker);
                });
                el.querySelectorAll('input[type="range"]').forEach((input) => {
                    input.addEventListener("input", (event) => {
                        input.closest(".form-fields").querySelector(".range-value").innerText = event.target.value;
                    });
                });
                render && render(html);
            },
            close: () => resolve(null),
        }, options).render(true);
    });

    async function getHtml(content, inputs) {
        return await renderTemplate(`modules/${MODULE_ID}/templates/input-dialog.hbs`, {content, inputs})
    }

    function getData(html) {
        const fd = new FormDataExtended(html[0].querySelector("form"));
        let data = fd.object;
        return data;
    }

    function _activateFilePicker(event) {
        function _getFilePickerOptions(event) {
            const button = event.currentTarget;
            const target = button.dataset.target;
            const field = button.form[target] || null;
            return {
              field: field,
              type: button.dataset.type,
              current: field?.value ?? "",
              button: button,
                callback: () => { }
            };
          }

        event.preventDefault();
        const options = _getFilePickerOptions(event);
        const fp = new FilePicker(options);
        return fp.browse();
    }
    
  }