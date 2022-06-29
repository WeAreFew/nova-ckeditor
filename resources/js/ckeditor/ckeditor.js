'use strict';

// Base Editor
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'

// Block Elements
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline'
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar'
import Table from '@ckeditor/ckeditor5-table/src/table'

// Block Elements
import AutoFormat from '@ckeditor/ckeditor5-autoformat/src/autoformat'
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote'
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock'
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import List from '@ckeditor/ckeditor5-list/src/list'

// Font
import Font from '@ckeditor/ckeditor5-font/src/font'

// Styles & Enhancements
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice'
import StrikeThrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough'
import Code from '@ckeditor/ckeditor5-basic-styles/src/code'
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript'
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript'
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline'
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Link from '@ckeditor/ckeditor5-link/src/link'
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage'

// Images and Media
import Image from '@ckeditor/ckeditor5-image/src/image'
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle'
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload'
import ImageResizeEditing from '@ckeditor/ckeditor5-image/src/imageresize/imageresizeediting';
import ImageResizeHandles from '@ckeditor/ckeditor5-image/src/imageresize/imageresizehandles';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar'
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption'
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed'
import HtmlEmbed from '@ckeditor/ckeditor5-html-embed/src/htmlembed'
import ImageTextAlternative from '@ckeditor/ckeditor5-image/src/imagetextalternative'

// Intend
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';

// Browser
import ImageBrowser from './plugins/ImageBrowser'
import VideoBrowser from './plugins/VideoBrowser'
import SnippetBrowser from './plugins/SnippetBrowser'

// Video
import Video from "./plugins/video/video"


// Other
import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting'
import ElementAddAttributes from './plugins/element-attribute/src/add-attribute-to-element'

// allow html classes/Styles
import GeneralHtmlSupport from '@ckeditor/ckeditor5-html-support/src/generalhtmlsupport'

// Collaboration
import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices'
import TrackChanges from '@ckeditor/ckeditor5-track-changes/src/trackchanges'
import Comments from '@ckeditor/ckeditor5-comments/src/comments'
import RevisionHistory from '@ckeditor/ckeditor5-revision-history/src/revisionhistory'

import RealTimeCollaborativeEditing from '@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativeediting'
import RealTimeCollaborationConfig from '@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativeediting'
import RealTimeCollaborativeTrackChanges from '@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativetrackchanges'
// import RealTimeCollaborativeRevisionHistory from '@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativerevisionhistory'
import PresenceList from '@ckeditor/ckeditor5-real-time-collaboration/src/presencelist'

// Extend the Base Class
export default class CkEditor extends ClassicEditorBase {

    // Merge Configurations
    static get defaultConfig() {
        return {
            licenseKey: '',
            ...require('./config/link').default,
            ...require('./config/image').default,
            ...require('./config/media').default,
            ...require('./config/table').default,
            ...require('./config/toolbar').default,
            ...require('./config/headings').default,
            ...require('./config/html').default,
            ...require('./config/video').default,
            ...require('./config/comments').default,
            htmlSupport: {
                allow: [
                    {
                        name: /.*/,
                        attributes: true,
                        classes: true,
                        styles: true
                    }
                ]
            }
        }
    }

    // Add Plugins
    static get builtinPlugins() {
        return [
            ImageBrowser,
            VideoBrowser,
            SnippetBrowser,
            Video,
            Essentials,
            Font,
            Link,
            List,
            Heading,
            Paragraph,
            BlockQuote,
            CodeBlock,
            PasteFromOffice,
            HorizontalLine,
            Bold,
            Italic,
            Underline,
            Subscript,
            Alignment,
            AutoFormat,
            Superscript,
            StrikeThrough,
            Code,
            Image,
            ImageStyle,
            ImageUpload,
            ImageResizeEditing,
            ImageResizeHandles,
            ImageCaption,
            ImageToolbar,
            ImageTextAlternative,
            LinkImage,
            MediaEmbed,
            Table,
            TableToolbar,
            HtmlEmbed,
            SourceEditing,
            Indent,
            IndentBlock,
            ElementAddAttributes,
            GeneralHtmlSupport,
            // CloudServices,
            TrackChanges,
            Comments,
            RevisionHistory,
            PresenceList,
            RealTimeCollaborationConfig,
            RealTimeCollaborativeEditing,
            // RealTimeCollaborativeRevisionHistory,
            RealTimeCollaborativeTrackChanges
        ]
    }
}
