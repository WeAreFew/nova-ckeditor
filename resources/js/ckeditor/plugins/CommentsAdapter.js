export default class CommentsAdapter {
    constructor( editor ) {
        this.editor = editor;
    }

    static get requires() {
        return [ 'CommentsRepository' ];
    }

    init() {
        const commentsRepositoryPlugin = this.editor.plugins.get( 'CommentsRepository' );
        const editorConfig = this.editor.config;
        const resourceName = editorConfig.get('resourceName');
        const resourceId = editorConfig.get('resourceId');

        // Set the adapter on the `CommentsRepository#adapter` property.
        commentsRepositoryPlugin.adapter = {
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

            async addComment( data ) {
                console.log( 'Comment added', data );

                const response = this.sendPostRequest(`/ck/comment/create`, data);
                
                return {
                    createdAt: new Date()       // Should be set on the server side.
                };
            },

            async updateComment( data ) {
                console.log( 'Comment updated', data );

                const response = this.sendPostRequest(`/ck/comment/update/${data.commentId}`, data);
                
                return {
                    createdAt: new Date()       // Should be set on the server side.
                };
            },

            removeComment( data ) {
                console.log( 'Comment removed', data );

                this.sendPostRequest(`/ck/suggestion/destroy/${data.commentId}`, data);
                
                return Promise.resolve();
            },

            async getCommentThread( data ) {
                const response = await fetch(`/ck/comment/thread-comments/${data.threadId}`);
                const commentsData = await response.json();
                const comments = [];

                for (const i in commentsData) {
                    comments[i] = {
                        commentId: commentsData[i].id,
                        authorId: commentsData[i].author,
                        content: commentsData[i].content,
                        createdAt: new Date(commentsData[i].created_at),
                        attributes: commentsData[i].attributes,
                    };
                }

                return {
                    threadId: data.threadId,
                    comments: comments,
                    isFromAdapter: true,
                };
            }
        };
    }
}