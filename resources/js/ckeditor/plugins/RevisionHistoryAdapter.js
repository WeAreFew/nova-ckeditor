export default class RevisionHistoryAdapter {
    constructor( editor ) {
        this.editor = editor;
    }

    static get pluginName() {
        return 'RevisionHistoryAdapter';
    }

    static get requires() {
        return [ 'RevisionHistory' ];
    }

    async init() {
        const revisionHistory = this.editor.plugins.get( 'RevisionHistory' );

        revisionHistory.adapter = {
            getRevisions: (data) => {
                // console.log('getRevisions', 'init', data);
                return this._sendGetRequest('/ck/revision/channel/' + data.channelId);
            },
            addRevision: ( revisionData ) => {
                // console.log('addRevision', revisionData);
                return this._sendPostRequest('/ck/revision/create', revisionData);
            },
            getRevision: ( { revisionId } ) => {
                console.log('getRevision', revisionId);
                // Get revision data, based on its id.
                // This should be an asynchronous request to your database.
                // Do not dump your revisions data here -- this is only for testing purposes.
                switch ( revisionId ) {
                    case 'initial':
                        return Promise.resolve(
                            {
                                "id": "initial",
                                "name": "Initial revision",
                                "creatorId": "user-1460",
                                "authorsIds": [ "user-1460" ],
                                "diffData": {
                                    "main": {
                                        "insertions": '[{"name":"h1","attributes":[],"children":["PUBLISHING AGREEMENT"]},{"name":"h3","attributes":[],"children":["Introduction"]},{"name":"p","attributes":[],"children":["This publishing contract, the “contract”, is entered into as of ………… by and between The Lower Shelf, the “Publisher”, and …………, the “Author”."]},{"name":"h3","attributes":[],"children":["Grant of Rights"]},{"name":"p","attributes":[],"children":["The Author grants the Publisher full right and title to the following, in perpetuity:"]},{"name":"ul","attributes":[],"children":[{"name":"li","attributes":[],"children":["To publish, sell, and profit from the listed works in all languages and formats in existence today and at any point in the future."]},{"name":"li","attributes":[],"children":["To create or devise modified, abridged, or derivative works based on the works listed."]},{"name":"li","attributes":[],"children":["To allow others to use the listed works at their discretion, without providing additional compensation to the Author."]}]},{"name":"p","attributes":[],"children":["These rights are granted by the Author on behalf of him/herself and their successors, heirs, executors, and any other party who may attempt to lay claim to these rights at any point now or in the future."]},{"name":"p","attributes":[],"children":["Any rights not granted to the Publisher above remain with the Author."]},{"name":"p","attributes":[],"children":["The rights granted to the Publisher by the Author shall not be constrained by geographic territories and are considered global in nature."]},{"name":"p","attributes":[],"children":["Publishing formats are enumerated in Appendix A."]}]',
                                        "deletions": '[{"name":"h1","attributes":[],"children":["PUBLISHING AGREEMENT"]},{"name":"h3","attributes":[],"children":["Introduction"]},{"name":"p","attributes":[],"children":["This publishing contract, the “contract”, is entered into as of ………… by and between The Lower Shelf, the “Publisher”, and …………, the “Author”."]},{"name":"h3","attributes":[],"children":["Grant of Rights"]},{"name":"p","attributes":[],"children":["The Author grants the Publisher full right and title to the following, in perpetuity:"]},{"name":"ul","attributes":[],"children":[{"name":"li","attributes":[],"children":["To publish, sell, and profit from the listed works in all languages and formats in existence today and at any point in the future."]},{"name":"li","attributes":[],"children":["To create or devise modified, abridged, or derivative works based on the works listed."]},{"name":"li","attributes":[],"children":["To allow others to use the listed works at their discretion, without providing additional compensation to the Author."]}]},{"name":"p","attributes":[],"children":["These rights are granted by the Author on behalf of him/herself and their successors, heirs, executors, and any other party who may attempt to lay claim to these rights at any point now or in the future."]},{"name":"p","attributes":[],"children":["Any rights not granted to the Publisher above remain with the Author."]},{"name":"p","attributes":[],"children":["The rights granted to the Publisher by the Author shall not be constrained by geographic territories and are considered global in nature."]},{"name":"p","attributes":[],"children":["Publishing formats are enumerated in Appendix A."]}]'
                                    }
                                },
                                "createdAt": "2021-05-27T13:22:59.077Z",
                                "attributes": {},
                                "fromVersion": 1,
                                "toVersion": 1
                            }
                        );
                    case 'e6f80e6be6ee6057fd5a449ab13fba25d':
                        return Promise.resolve(
                            {
                                "id": "e6f80e6be6ee6057fd5a449ab13fba25d",
                                "name": "Updated with the actual data",
                                "creatorId": "user-1460",
                                "authorsIds": [ "user-1460" ],
                                "diffData": {
                                    "main": {
                                        "insertions": '[{"name":"h1","attributes":[],"children":["PUBLISHING AGREEMENT"]},{"name":"h3","attributes":[],"children":["Introduction"]},{"name":"p","attributes":[],"children":["This publishing contract, the “contract”, is entered into as of ",{"name":"revision-start","attributes":[["name","insertion:u1:0"]],"children":[]},"1st",{"name":"revision-end","attributes":[["name","insertion:u1:0"]],"children":[]}," ",{"name":"revision-start","attributes":[["name","insertion:u1:1"]],"children":[]},"June 2020 ",{"name":"revision-end","attributes":[["name","insertion:u1:1"]],"children":[]},"by and between The Lower Shelf, the “Publisher”, and ",{"name":"revision-start","attributes":[["name","insertion:u1:2"]],"children":[]},"John Smith",{"name":"revision-end","attributes":[["name","insertion:u1:2"]],"children":[]},", the “Author”."]},{"name":"h3","attributes":[],"children":["Grant of Rights"]},{"name":"p","attributes":[],"children":["The Author grants the Publisher full right and title to the following, in perpetuity:"]},{"name":"ul","attributes":[],"children":[{"name":"li","attributes":[],"children":["To publish, sell, and profit from the listed works in all languages and formats in existence today and at any point in the future."]},{"name":"li","attributes":[],"children":["To create or devise modified, abridged, or derivative works based on the works listed."]},{"name":"li","attributes":[],"children":["To allow others to use the listed works at their discretion, without providing additional compensation to the Author."]}]},{"name":"p","attributes":[],"children":["These rights are granted by the Author on behalf of him and their successors, heirs, executors, and any other party who may attempt to lay claim to these rights at any point now or in the future."]},{"name":"p","attributes":[],"children":["Any rights not granted to the Publisher above remain with the Author."]},{"name":"p","attributes":[],"children":["The rights granted to the Publisher by the Author shall not be constrained by geographic territories and are considered global in nature."]}]',
                                        "deletions": '[{"name":"h1","attributes":[],"children":["PUBLISHING AGREEMENT"]},{"name":"h3","attributes":[],"children":["Introduction"]},{"name":"p","attributes":[],"children":["This publishing contract, the “contract”, is entered into as of ",{"name":"revision-start","attributes":[["name","deletion:u1:0"]],"children":[]},"…………",{"name":"revision-end","attributes":[["name","deletion:u1:0"]],"children":[]}," by and between The Lower Shelf, the “Publisher”, and ",{"name":"revision-start","attributes":[["name","deletion:u1:1"]],"children":[]},"…………",{"name":"revision-end","attributes":[["name","deletion:u1:1"]],"children":[]},", the “Author”."]},{"name":"h3","attributes":[],"children":["Grant of Rights"]},{"name":"p","attributes":[],"children":["The Author grants the Publisher full right and title to the following, in perpetuity:"]},{"name":"ul","attributes":[],"children":[{"name":"li","attributes":[],"children":["To publish, sell, and profit from the listed works in all languages and formats in existence today and at any point in the future."]},{"name":"li","attributes":[],"children":["To create or devise modified, abridged, or derivative works based on the works listed."]},{"name":"li","attributes":[],"children":["To allow others to use the listed works at their discretion, without providing additional compensation to the Author."]}]},{"name":"p","attributes":[],"children":["These rights are granted by the Author on behalf of him",{"name":"revision-start","attributes":[["name","deletion:u1:2"]],"children":[]},"/herself",{"name":"revision-end","attributes":[["name","deletion:u1:2"]],"children":[]}," and their successors, heirs, executors, and any other party who may attempt to lay claim to these rights at any point now or in the future."]},{"name":"p","attributes":[],"children":["Any rights not granted to the Publisher above remain with the Author."]},{"name":"p","attributes":[],"children":["The rights granted to the Publisher by the Author shall not be constrained by geographic territories and are considered global in nature.",{"name":"revision-start","attributes":[["name","deletion:u1:3"]],"children":[]}]},{"name":"p","attributes":[],"children":["Publishing formats are enumerated in Appendix A.",{"name":"revision-end","attributes":[["name","deletion:u1:3"]],"children":[]}]}]'
                                    }
                                },
                                "createdAt": "2021-05-27T13:23:52.553Z",
                                "attributes": {},
                                "fromVersion": 1,
                                "toVersion": 20
                            }
                        );
                    case 'e6590c50ccbc86acacb7d27231ad32064':
                        return Promise.resolve(
                            {
                                "id": "e6590c50ccbc86acacb7d27231ad32064",
                                "name": "Inserted logo",
                                "creatorId": "user-1460",
                                "authorsIds": [ "user-1460" ],
                                "diffData": {
                                    "main": {
                                        "insertions": '[{"name":"figure","attributes":[["data-revision-start-before","insertion:u1:0"],["class","image"]],"children":[{"name":"img","attributes":[["src","https://ckeditor.com/docs/ckeditor5/latest/assets/img/revision-history-demo.png"]],"children":[]}]},{"name":"h1","attributes":[],"children":[{"name":"revision-end","attributes":[["name","insertion:u1:0"]],"children":[]},"PUBLISHING AGREEMENT"]},{"name":"h3","attributes":[],"children":["Introduction"]},{"name":"p","attributes":[],"children":["This publishing contract, the “contract”, is entered into as of 1st June 2020 by and between The Lower Shelf, the “Publisher”, and John Smith, the “Author”."]},{"name":"h3","attributes":[],"children":["Grant of Rights"]},{"name":"p","attributes":[],"children":["The Author grants the Publisher full right and title to the following, in perpetuity:"]},{"name":"ul","attributes":[],"children":[{"name":"li","attributes":[],"children":["To publish, sell, and profit from the listed works in all languages and formats in existence today and at any point in the future."]},{"name":"li","attributes":[],"children":["To create or devise modified, abridged, or derivative works based on the works listed."]},{"name":"li","attributes":[],"children":["To allow others to use the listed works at their discretion, without providing additional compensation to the Author."]}]},{"name":"p","attributes":[],"children":["These rights are granted by the Author on behalf of him and their successors, heirs, executors, and any other party who may attempt to lay claim to these rights at any point now or in the future."]},{"name":"p","attributes":[],"children":["Any rights not granted to the Publisher above remain with the Author."]},{"name":"p","attributes":[],"children":["The rights granted to the Publisher by the Author shall not be constrained by geographic territories and are considered global in nature."]}]',
                                        "deletions": '[{"name":"h1","attributes":[["data-revision-start-before","deletion:u1:0"]],"children":[{"name":"revision-end","attributes":[["name","deletion:u1:0"]],"children":[]},"PUBLISHING AGREEMENT"]},{"name":"h3","attributes":[],"children":["Introduction"]},{"name":"p","attributes":[],"children":["This publishing contract, the “contract”, is entered into as of 1st June 2020 by and between The Lower Shelf, the “Publisher”, and John Smith, the “Author”."]},{"name":"h3","attributes":[],"children":["Grant of Rights"]},{"name":"p","attributes":[],"children":["The Author grants the Publisher full right and title to the following, in perpetuity:"]},{"name":"ul","attributes":[],"children":[{"name":"li","attributes":[],"children":["To publish, sell, and profit from the listed works in all languages and formats in existence today and at any point in the future."]},{"name":"li","attributes":[],"children":["To create or devise modified, abridged, or derivative works based on the works listed."]},{"name":"li","attributes":[],"children":["To allow others to use the listed works at their discretion, without providing additional compensation to the Author."]}]},{"name":"p","attributes":[],"children":["These rights are granted by the Author on behalf of him and their successors, heirs, executors, and any other party who may attempt to lay claim to these rights at any point now or in the future."]},{"name":"p","attributes":[],"children":["Any rights not granted to the Publisher above remain with the Author."]},{"name":"p","attributes":[],"children":["The rights granted to the Publisher by the Author shall not be constrained by geographic territories and are considered global in nature."]}]'
                                    }
                                },
                                "createdAt": "2021-05-27T13:26:39.252Z",
                                "attributes": {},
                                "fromVersion": 20,
                                "toVersion": 24
                            }
                        );
                    case 'egh91t5jccbi894cacxx7dz7t36aj3k021':
                        return Promise.resolve(
                            {
                                "id": "egh91t5jccbi894cacxx7dz7t36aj3k021",
                                "name": null,
                                "creatorId": null,
                                "authorsIds": [],
                                "diffData": {
                                    "main": {
                                        "insertions": '[{"name":"figure","attributes":[["class","image"]],"children":[{"name":"img","attributes":[["src","https://ckeditor.com/docs/ckeditor5/latest/assets/img/revision-history-demo.png"]],"children":[]}]},{"name":"h1","attributes":[],"children":["PUBLISHING AGREEMENT"]},{"name":"h3","attributes":[],"children":["Introduction"]},{"name":"p","attributes":[],"children":["This publishing contract, the “contract”, is entered into as of 1st June 2020 by and between The Lower Shelf, the “Publisher”, and John Smith, the “Author”."]},{"name":"h3","attributes":[],"children":["Grant of Rights"]},{"name":"p","attributes":[],"children":["The Author grants the Publisher full right and title to the following, in perpetuity:"]},{"name":"ul","attributes":[],"children":[{"name":"li","attributes":[],"children":["To publish, sell, and profit from the listed works in all languages and formats in existence today and at any point in the future."]},{"name":"li","attributes":[],"children":["To create or devise modified, abridged, or derivative works based on the works listed."]},{"name":"li","attributes":[],"children":["To allow others to use the listed works at their discretion, without providing additional compensation to the Author."]}]},{"name":"p","attributes":[],"children":["These rights are granted by the Author on behalf of him and their successors, heirs, executors, and any other party who may attempt to lay claim to these rights at any point now or in the future."]},{"name":"p","attributes":[],"children":["Any rights not granted to the Publisher above remain with the Author."]},{"name":"p","attributes":[],"children":["The rights granted to the Publisher by the Author shall not be constrained by geographic territories and are considered global in nature."]}]',
                                        "deletions": '[{"name":"h1","attributes":[],"children":["PUBLISHING AGREEMENT"]},{"name":"h3","attributes":[],"children":["Introduction"]},{"name":"p","attributes":[],"children":["This publishing contract, the “contract”, is entered into as of 1st June 2020 by and between The Lower Shelf, the “Publisher”, and John Smith, the “Author”."]},{"name":"h3","attributes":[],"children":["Grant of Rights"]},{"name":"p","attributes":[],"children":["The Author grants the Publisher full right and title to the following, in perpetuity:"]},{"name":"ul","attributes":[],"children":[{"name":"li","attributes":[],"children":["To publish, sell, and profit from the listed works in all languages and formats in existence today and at any point in the future."]},{"name":"li","attributes":[],"children":["To create or devise modified, abridged, or derivative works based on the works listed."]},{"name":"li","attributes":[],"children":["To allow others to use the listed works at their discretion, without providing additional compensation to the Author."]}]},{"name":"p","attributes":[],"children":["These rights are granted by the Author on behalf of him and their successors, heirs, executors, and any other party who may attempt to lay claim to these rights at any point now or in the future."]},{"name":"p","attributes":[],"children":["Any rights not granted to the Publisher above remain with the Author."]},{"name":"p","attributes":[],"children":["The rights granted to the Publisher by the Author shall not be constrained by geographic territories and are considered global in nature."]}]'
                                    }
                                },
                                "createdAt": "2021-05-27T13:26:39.252Z",
                                "attributes": {},
                                "fromVersion": 24,
                                "toVersion": 24
                            }
                        );
                }
            },
            updateRevisions: revisionsData => {
                const documentData = this.editor.getData();
                console.log('updateRevisions', revisionsData);
                // This should be an asynchronous request to your database
                // that saves `revisionsData` and `documentData`.
                //
                // Document data should be saved each time a revision is saved.
                //
                // `revisionsData` is an array with objects,
                // where each object contains updated and new revisions.
                //
                // See the API reference for `RevisionHistoryAdapter` to learn
                // how to correctly integrate the feature with your application.
                //
                return Promise.resolve();
            },
            updateRevision: ( revisionData ) => {
                console.log('updateRevision', revisionData);
                return Promise.resolve();
            },
        };

        // Add the revisions data for existing revisions.
        // You can either dump the revisions data straight in the source code, or
        // you can fetch the data asynchronously from your database (as this example shows).
        //
        // Note that the revisions data does not contain `diffData` property.
        // `diffData` property may be big and will be fetched on demand by `adapter.getRevision()`.
        //
        // const revisionsData = await this._fetchRevisionsData();

        // for ( const revisionData of revisionsData ) {
        //     revisionHistory.addRevisionData( revisionData );
        // }
    }

    async _sendPostRequest (url, data) {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'X-CSRF-TOKEN': document.querySelector("meta[name='csrf-token']").content
            }
        });

        return await res.json();
    };

    async _sendGetRequest (url) {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'X-CSRF-TOKEN': document.querySelector("meta[name='csrf-token']").content
            }
        });

        return await res.json();
    };

}
