# Module Name
desc

![Latest Release Download Count](https://img.shields.io/github/downloads/theripper93/Levels/latest/module.zip?color=2b82fc&label=DOWNLOADS&style=for-the-badge) [![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Flevels&colorB=03ff1c&style=for-the-badge)](https://forge-vtt.com/bazaar#package=levels) ![Foundry Core Compatible Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2Ftheripper93%2FLevels%2Fmain%2Fmodule.json&label=Foundry%20Version&query=$.compatibleCoreVersion&colorB=orange&style=for-the-badge) [![alt-text](https://img.shields.io/badge/-Patreon-%23ff424d?style=for-the-badge)](https://www.patreon.com/theripper93) [![alt-text](https://img.shields.io/badge/-Discord-%235662f6?style=for-the-badge)](https://discord.gg/F53gBjR97G)

### Example Usage

```js
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
```

### Resulting Dialog

![image](https://github.com/theripper93/dialog-extended/assets/1346839/bebc8521-bad8-475b-a672-83cbd1edfcca)

### Output

If the user presses "Yes" the value of `dialogData` will be:

```json
{
    "myText": "Hello World",
    "myNumber": 42,
    "mySelect": "2",
    "myCheckbox": true,
    "myColor": "#ff0000",
    "myFilePicker": "",
    "myRange": 50
}
```

If the user presses "No" the value of `dialogData` will be `false`

If the user closes the dialog, the value of `dialogData` will be `null`
