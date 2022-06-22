<template>
    <default-field :field="field" :errors="errors" :full-width-content="true">
        <template slot="field">
            <div ref="presenceList"></div>
            <textarea ref="editor" class="hidden" :id="field.attribute" :class="errorClasses" :value="value" />

            <media-browser @select="$options.editor.execute('imageBrowser', $event)" type="image" :field-key="$options.uuid + '-image'" :multiple="true" />
            <media-browser @select="$options.editor.execute('videoBrowser', $event)" type="video" :field-key="$options.uuid + '-video'" :multiple="true" :has-larupload-trait="field.videoHasLaruploadTrait" />
            <snippet-browser :field-key="$options.uuid" :snippets="field.snippetBrowser" />

            <div ref="revision">
                <div>
                    <div ref="revisionEditor"></div>
                    <div ref="revisionSidebar"></div>
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
import {FormField, HandlesValidationErrors} from 'laravel-nova'
import CryptoJS from 'crypto-js'

export default {
    mixins: [FormField, HandlesValidationErrors, HasUUID],
    props: ['resourceName', 'resourceId', 'field', 'toolbar'],
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
            cloudServices: {
                tokenUrl: 'https://90033.cke-cs.com/token/dev/183479f3ff724c1c2cddfad0fe18428f06763418c64dde33aada0551ed25?limit=10',
                uploadUrl: 'https://90033.cke-cs.com/easyimage/upload/',
                webSocketUrl: 'wss://90033.cke-cs.com/ws'
            },
            collaboration: {
                channelId: CryptoJS.MD5(`${this.resourceName}_${this.resourceId}`).toString()
            },
            presenceList: {
                container: this.$refs.presenceList
            },
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
</style>
