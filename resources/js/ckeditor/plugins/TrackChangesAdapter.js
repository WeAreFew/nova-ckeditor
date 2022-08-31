export default class TrackChangesAdapter {
    constructor(editor) {
        this.editor = editor;
    }

    init() {

        const usersPlugin = this.editor.plugins.get('Users');
        const allUsers = this.editor.config.get('allUsers');
        const Me = this.editor.config.get('userId');

        // Load the users data.
        for ( const user of allUsers ) {
            // console.log(user);
            usersPlugin.addUser( user );
        }

        // Set the current user.
        usersPlugin.defineMe( `user-${Me}` );

        if(this.editor.plugins.has('TrackChanges')){

            const trackChangesPlugin = this.editor.plugins.get('TrackChanges');

            // Set the adapter to the `TrackChanges#adapter` property.
            trackChangesPlugin.adapter = {
                async sendPostRequest (url, data) {
                    const res = await fetch(url, {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                            'X-CSRF-TOKEN': document.querySelector("meta[name='csrf-token']").content
                        }
                    });

                    return await res.json();
                },

                async getSuggestion (suggestionId) {
                    console.log( 'Getting suggestion', suggestionId );

                    const response = await fetch(`/ck/suggestion/${suggestionId}`);
                    const data = await response.json();

                    return {
                        id: suggestionId,
                        type: data.type,
                        authorId: data.authorId,
                        createdAt: new Date(data.created_at),
                        data: data.data,
                        attributes: data.attributes
                    };

                },

                async addSuggestion (suggestionData) {
                    console.log( 'Suggestion added', suggestionData );

                    const response = this.sendPostRequest('/ck/suggestion/create', suggestionData);

                    return {
                        createdAt: new Date()       // Should be set on the server side.
                    };
                },

                async updateSuggestion ( id, suggestionData ) {
                    console.log( 'Suggestion updated', id, suggestionData );

                    const response = this.sendPostRequest(`/ck/suggestion/update/${id}`, suggestionData);

                    return {
                        createdAt: new Date()       // Should be set on the server side.
                    };
                }
            };
        }
    }
}
