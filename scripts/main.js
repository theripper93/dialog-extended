import {initConfig} from "./config.js";
import { registerSettings } from "./settings.js";

export const MODULE_ID = "dialog-extended";

Hooks.on("init", () => {
    initConfig();
    registerSettings();
    Dialog.input = inputDialog;
});

async function inputDialog({title, content, inputs, icon, label, cancelButton, render, options = {}} = {}) {
    const inputDialogContent = await getHtml(content, inputs);
    return new Promise((resolve, reject) => {
        const buttons = {
            confirm: {
              icon: icon ?? '<i class="fas fa-check"></i>',
              label: label ?? "",
              callback: html => resolve(getData(html))
            }
        };
        if (cancelButton) {
            buttons.cancel = {
                icon: '<i class="fas fa-times"></i>',
                label: game.i18n.localize("Cancel"),
                callback: () => resolve(false)
            };
        }
        new Dialog({
            title,
            content: inputDialogContent,
            focus: true,
            default: "confirm",
            buttons, 
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