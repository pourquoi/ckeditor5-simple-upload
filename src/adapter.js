export default class Adapter {
    constructor(loader, urlOrObject, t) {
        this.loader = loader;
        this.urlOrObject = urlOrObject;
        this.t = t;
    }

    upload() {
        return new Promise((resolve, reject) => {
            this._initRequest();
            this._initListeners(resolve, reject);
            this._sendRequest(reject);
        });
    }

    abort() {
        if (this.xhr) {
            this.xhr.abort();
        }
    }

    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();
		
		let url = this.urlOrObject;
		let headers = null;
		if (typeof(this.urlOrObject) === 'object'){
			url=this.urlOrObject.url;
			headers = this.urlOrObject.headers;
		}

        xhr.withCredentials = true;
        xhr.open('POST', url, true);
		if (headers !== null){
			for(let key in headers){
				if (typeof(headers[key]) === 'function'){
					xhr.setRequestHeader(key, headers[key]());
				}else{
					xhr.setRequestHeader(key, headers[key]);
				}
			}
		}
		
        xhr.responseType = 'json';
    }

    _initListeners(resolve, reject) {
        const xhr = this.xhr;
        const loader = this.loader;
        const t = this.t;
        const genericError = t('Cannot upload file:') + ` ${loader.file.name}.`;

        xhr.addEventListener('error', () => reject(genericError));
        xhr.addEventListener('abort', () => reject());
        xhr.addEventListener('load', () => {
            const response = xhr.response;

            if (!response || !response.uploaded) {
                return reject(response && response.error && response.error.message ? response.error.message : genericError);
            }

            resolve({
                default: response.url
            });
        });

        if (xhr.upload) {
            xhr.upload.addEventListener('progress', evt => {
                if (evt.lengthComputable) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            });
        }
    }

    _sendRequest( reject ) {
		this.loader.file
		.then( file => {
			// Prepare the form data.
			const data = new FormData();
			data.append( 'upload', file );
			// Important note: This is the right place to implement security mechanisms
			// like authentication and CSRF protection. For instance, you can use
			// XMLHttpRequest.setRequestHeader() to set the request headers containing
			// the CSRF token generated earlier by your application.
			// Send the request.
			this.xhr.send( data );
		} )
		.catch( reject );
    }
}
