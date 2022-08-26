<template>
    <default-field :field="field" :errors="errors" :full-width-content="true">
        <template slot="field">
            <div ref="presenceList"></div>

            <div class="ckContainer">
                <div ref="editor" class="hidden mainEditor" :id="field.attribute" :class="errorClasses" :value="value" />
                <div ref="sidebar" class="editorSidebar"></div>
            </div>

            <media-browser @select="$options.editor.execute('imageBrowser', $event)" type="image" :field-key="$options.uuid + '-image'" :multiple="true" />
            <media-browser @select="$options.editor.execute('videoBrowser', $event)" type="video" :field-key="$options.uuid + '-video'" :multiple="true" :has-larupload-trait="field.videoHasLaruploadTrait" />
            <snippet-browser :field-key="$options.uuid" :snippets="field.snippetBrowser" />

            <div ref="revision" id="revision-viewer-container">
                <div class="ckContainer">
                    <div ref="revisionEditor" class="revisionEditor"></div>
                    <div ref="revisionSidebar" class="editorSidebar"></div>
                </div>
            </div>
        </template>
    </default-field>
</template>

<script>
import CkEditor from '../ckeditor/ckeditor'
import SnippetBrowser from "./snippet-browser"
import MediaBrowser from "./media-browser"
import HasUUID from "./mixins/hasUUID"
import CommentsAdapter from "../ckeditor/plugins/CommentsAdapter"
import TrackChangesAdapter from "../ckeditor/plugins/TrackChangesAdapter"
import RevisionHistoryAdapter from "../ckeditor/plugins/RevisionHistoryAdapter"
import {FormField, HandlesValidationErrors} from 'laravel-nova'

export default {
    mixins: [FormField, HandlesValidationErrors, HasUUID],
    props: ['resourceName', 'resourceId', 'field', 'toolbar', 'user', 'users', 'licenseKey'],
    components: {SnippetBrowser, MediaBrowser},
    methods: {
        setInitialValue() {
            this.value = this.field.value || ''
        },

        fill(formData) {
            formData.append(this.field.attribute, this.value || '')
        },

        handleChange(value) {
            this.value = value
        },

        handleEditorEvents(event, data) {
            if (['Tab', '/'].includes(data.key) || [191, 9].includes(data.keyCode)) {
                data.stopPropagation()
            }
        },

        handleEditorSync() {
            this.handleChange(this.$options.editor.getData())
        },
    },
    created() {
        this.$options.uuid = this.uuid()
    },
    mounted() {
        const config = {
            attribute: this.$options.uuid,
            imageBrowser: this.field.imageBrowser,
            videoBrowser: this.field.videoBrowser,
            snippetBrowser: this.field.snippetBrowser,
            language: {
                ui: 'en',
                content: this.field.contentLanguage
            },
            toolbar: {items: this.field.toolbar},
            sidebar: {container: this.$refs.sidebar},
            extraPlugins: [ TrackChangesAdapter, CommentsAdapter, RevisionHistoryAdapter ],
            initialData: this.field.value ? this.field.value : ' ',
            licenseKey: this.field.licenseKey.revisionHistory.dev,
            userId: this.field.user.id,
            allUsers: this.field.users,
            resourceName: this.field.resourceName,
            resrouceId: this.field.resrouceId,
            // cloudServices: {
            //     tokenUrl: this.field.licenseKey.tokenUrl + '?' + userInfo,
            //     uploadUrl: this.field.licenseKey.uploadUrl,
            //     webSocketUrl: this.field.licenseKey.webSocketUrl
            // },
            // collaboration: {
            //     channelId: CryptoJS.MD5(`${this.resourceName}_${this.resourceId}`).toString()
            // },
            // presenceList: {
            //     container: this.$refs.presenceList
            // },
            revisionHistory: {
                editorContainer: this.$refs.editor,
                viewerContainer: this.$refs.revision,
                viewerEditorElement: this.$refs.revisionViewer,
                viewerSidebarContainer: this.$refs.revisionSidebar
            },
            ...this.field.toolbarOptions
        }

        CkEditor.create(this.$refs.editor, config)
            .then((editor) => {
                const {editing, model} = this.$options.editor = editor

                // prevent question-mark & slash from triggering nova search
                editing.view.document.on('keydown', this.handleEditorEvents, {
                    priority: 'highest'
                })

                // sync model changes to vue-model
                model.document.on('change', this.handleEditorSync, {
                    priority: 'lowest'
                })

                // set the height of the editor when editing
                if (this.field.height > 1) {
                    editor.editing.view.change(writer => {
                        writer.setStyle('height', `${this.field.height}px`, editor.editing.view.document.getRoot());
                    });
                }


            })
            .catch((e) => {
                this.$toasted.show(e.toString(), {type: 'error'})
                throw(e)
            })
    },
    beforeDestroy() {
        if (this.$options.editor) {
            this.$options.editor.destroy()
                .then(() => this.$options.editor = null)
                .catch((e) => this.$toasted.show(e.toString(), {type: 'error'}))
        }
    },
}
</script>

<style lang="sass">
.ck.ck-reset_all, .ck.ck-reset_all *
    direction: ltr !important

.ck-content.ck-editor__editable
    resize: vertical

.ck.ck-reset.ck-editor
    .ck.ck-toolbar
        border-radius: 10px 10px 0 0

    .ck-editor__editable_inline
        border-radius: 0 0 10px 10px
        margin: 0
        padding: 0 10px
        @import "../../sass/field"

    .ck.ck-editor__editable:not(.ck-editor__nested-editable).ck-focused
        box-shadow: none

.ck.ck-editor
    position: relative
    z-index: 10
    width: 60%

.ckContainer
    .ck.ck-editor
        display: flex
        flex-direction: column

    .ck.ck-editor__editable
        height: 100% !important

.ck.ck-editor__main
    height: 100%

.ck.ck-editor__editable
    border-bottom-right-radius: 0 !important

.ck.ck-toolbar
    border-top-right-radius: 0 !important

.mainEditor
    width: 60%

.ckContainer
    display: flex
    flex-direction: row
    flex-wrap: nowrap
    position: relative
    width: 100%
    justify-content: center
    align-items: stretch

.editorSidebar
    padding: 0 10px
    position: relative
    width: 40%
    min-width: 290px
    font-size: 20px
    background: hsl(0, 0%, 98%)
    border: 1px solid hsl(0, 0%, 77%)
    border-left: 0
    border-top-right-radius: 10px
    border-bottom-right-radius: 10px
    overflow-x: hidden
    overflow-y: auto
    min-height: 100%

#revision-viewer-container
    display: none
    width: 100%

</style>
