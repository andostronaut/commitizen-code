function ui() {
  const template = `
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

        <script></script>
    </body>
    </html>
  `

  return template
}

export default ui
