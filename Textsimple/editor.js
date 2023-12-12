let quill;
let currentFile = null;

document.addEventListener('DOMContentLoaded', function () {
  quill = new Quill('#editor', {
    theme: 'snow'
  });
});

function uploadFile() {
  alert('Uploading file');
}

function saveFile() {
  if (currentFile) {
    alert('Saving file: ' + currentFile);
  } else {
    saveAs();
  }
}

function saveAs() {
  const fileName = prompt('Enter a file name:');
  if (fileName) {
    currentFile = fileName;
    alert('Saving file as: ' + currentFile);
  }
}

function runCode() {
  const htmlCode = quill.root.innerHTML;
  const cssCode = document.getElementById('cssCode').value;
  const jsCode = document.getElementById('jsCode').value;

  const outputContainer = document.getElementById('codeOutput');

  try {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);

    const doc = iframe.contentDocument || iframe.contentWindow.document;

    doc.open();
    doc.write(`
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>${htmlCode}</body>
        <script>${jsCode}</script>
      </html>
    `);
    doc.close();

    outputContainer.innerHTML = '';
    outputContainer.appendChild(iframe.contentDocument.body.cloneNode(true));

    document.body.removeChild(iframe);
  } catch (error) {
    console.error('Error:', error);
    outputContainer.innerText = `Error: ${error.message}`;
  }
}

function clearCodeInputs() {
  document.getElementById('htmlCode').value = '';
  document.getElementById('cssCode').value = '';
  document.getElementById('jsCode').value = '';
}

window.runCode = runCode;
window.uploadFile = uploadFile;
window.saveFile = saveFile;
window.saveAs = saveAs;

  
