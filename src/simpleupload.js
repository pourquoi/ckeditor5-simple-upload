import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';

import Adapter from './adapter';

export default class SimpleUpload extends Plugin {

    static get requires() {
        return [FileRepository];
    }

    static get pluginName() {
        return 'SimpleUpload';
    }

    init() {
        const url = this.editor.config.get('simpleUpload.uploadUrl');

        if (!url) {
            console.warn('simpleUpload.uploadUrl is not configured')
            return;
        }

        this.editor.plugins.get('FileRepository').createUploadAdapter = loader => new Adapter(loader, url, this.editor.t);
    }
}
