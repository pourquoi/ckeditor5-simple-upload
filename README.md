## standard image upload button

### build integration

https://docs.ckeditor.com/ckeditor5/latest/builds/guides/development/custom-builds.html

```npm install ckeditor5-simple-upload```

add this plugin and remove the ckfinder and easyimage plugins

```javascript
// src/ckeditor.js

import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
//import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
//import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import SimpleuploadPlugin from 'ckeditor5-simple-upload/src/simpleupload'

// ...

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	Essentials,
	UploadAdapter,
	Autoformat,
	Bold,
	Italic,
	BlockQuote,
//	CKFinder,
//	EasyImage,
	Heading,
    Image,
    SimpleuploadPlugin
    // ...
]

ClassicEditor.defaultConfig = {
	toolbar: {
		items: [
			'heading',
			'|',
			'bold',
			'italic',
			'link',
			'bulletedList',
			'numberedList',
			'imageUpload',
			'blockQuote',
			'insertTable',
			'mediaEmbed',
			'undo',
			'redo'
		]
    },
    
    // ...
}

### configuration

```javascript
ClassicEditor.create(document.querySelector( '#editor' ), {
    simpleUpload: {
        uploadUrl: 'http://127.0.0.1/my-upload-endpoint'
    }
})
```

```javascript
var cb = function() { return (new Date()).getTime() }
ClassicEditor.create(document.querySelector( '#editor' ), {
    simpleUpload: {
        uploadUrl: {url:'http://127.0.0.1/my-upload-endpoint', headers:{ 'x-header':'myhead', 'x-header-cb': cb } }
    }
})
```

### backend

the endpoint will receive a file named **upload** and should return the image url

success response :
```json
{
    "uploaded": true,
    "url": "http://127.0.0.1/uploaded-image.jpeg"
}
```

failure response :
```json
{
    "uploaded": false,
    "error": {
        "message": "could not upload this image"
    }
}
```
