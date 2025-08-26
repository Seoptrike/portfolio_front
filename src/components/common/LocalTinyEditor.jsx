// src/components/common/LocalTinyEditor.jsx
import React, { useCallback } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import DOMPurify from 'dompurify';

// TinyMCE core / theme / model
import 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/models/dom';

// v8 플러그인: side-effect import
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';

// 스킨 & 콘텐츠 CSS (번들 포함)
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/content/default/content.min.css';

const ALLOWED_TAGS = ['p', 'h2', 'h3', 'strong', 'em', 'u', 'ul', 'ol', 'li', 'a', 'br', 'blockquote'];
const ALLOWED_ATTR = ['href', 'target', 'rel'];

const LocalTinyEditor = ({ value, onChange, height = 300 }) => {
    const handleEditorChange = useCallback((html) => {
        const clean = DOMPurify.sanitize(html, {
            ALLOWED_TAGS,
            ALLOWED_ATTR,
            USE_PROFILES: { html: true },
            FORBID_ATTR: ['style'],
        });
        onChange?.(clean);
    }, [onChange]);

    return (
        <Editor
            value={value}
            onEditorChange={handleEditorChange}
            init={{
                menubar: false,
                height,
                // side-effect import로 이미 로드됨 → 문자열로 등록
                plugins: 'link lists',
                toolbar: 'undo redo | bold italic underline | bullist numlist | link',
                block_formats: '본문=p; 소제목=h2; 소소제목=h3',

                // 중요: 라이선스/홍보
                license_key: 'gpl',
                promotion: false,

                // 외부 로드 막고, 위에서 import한 CSS 사용
                skin: false,
                content_css: false,

                content_style: `
          body { font-family: system-ui, sans-serif; line-height:1.6; font-size:15px; }
          h2 { font-size:1.2rem; margin:1em 0 .5em; font-weight:700; }
          h3 { font-size:1.05rem; margin:.8em 0 .4em; font-weight:600; }
          p { margin:.5em 0; }
          blockquote { margin:.8em 0; padding-left:.9em; border-left:3px solid #ddd; color:#444; }
        `,
            }}
        />
    );
};

export default LocalTinyEditor;
