# Dialog Extended
Extends the Dialog class with a Dialog.input() method

### Installation
Install via manifest URL
```copy
https://github.com/theripper93/dialog-extended/releases/latest/download/module.json
```
### Example Usage

```js
    const dialogData = await Dialog.input({
        title: "Test",
        content: "This is a test input dialog, pick something",
        label: "",
        icon: '<i class="fas fa-check"></i>',
        cancelButton: false,
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

If the user presses the confirmation button the value of `dialogData` will be:

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

If the user closes the dialog, the value of `dialogData` will be `null`

If the cancel button is pressed, the value of `dialogData` will be `false`
