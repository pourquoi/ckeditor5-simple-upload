## standard image upload button

### build integration

https://docs.ckeditor.com/ckeditor5/latest/builds/guides/development/custom-builds.html

```yarn add ckeditor5-simple-upload```

add this plugin and remove the ckfinder and easyimage plugins

```javascript
// build-config.js

module.exports = {
	// ...
	
	plugins: [
        '@ckeditor/ckeditor5-essentials/src/essentials',
        // ...

        //'@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter',
        //'@ckeditor/ckeditor5-easy-image/src/easyimage',

        'ckeditor5-simple-upload/src/simpleupload'

        // ...
    ],

    // ...
}
        
```

### configuration

```javascript
ClassicEditor.create(document.querySelector( '#editor' ), {
    simpleUpload: {
        uploadUrl: 'http://127.0.0.1/my-upload-endpoint'
    }
})
```

### backend

the endpoint will receive a file named **upload**

success response :
```json
{
    uploaded: true,
    url: "http://127.0.0.1/uploaded-image.jpeg"
}
```

failure response :
```json
{
    uploaded: false,
    error: {
        message: "could not upload this image"
    }
}
```