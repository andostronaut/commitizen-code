export const sourceControlUI = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Commitizen Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }

        input[type="checkbox"] {
            margin-right: 5px;
        }

        input[type="text"] {
            width: 200px;
            height: 25px;
            padding: 0 5px;
            border: 1px solid #ccc;
            border-radius: 2px;
        }
    </style>
</head>
<body>
    <div>
      <input type="text" id="textInput">
    </div>

    <script>
        const checkbox = document.getElementById('checkbox');
        const textInput = document.getElementById('textInput');

        // Add event listener to checkbox
        checkbox.addEventListener('change', (event) => {
            // Handle checkbox state change
            if (event.target.checked) {
                console.log('Checkbox is checked');
            } else {
                console.log('Checkbox is unchecked');
            }
        });

        // Add event listener to text input
        textInput.addEventListener('input', (event) => {
            // Handle text input change
            const inputValue = event.target.value;
            console.log('Text Input:', inputValue);
        });
    </script>
</body>
</html>
`
