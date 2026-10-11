import { useEffect, useRef, useState } from "react";

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaLink,
  FaUnlink,
  FaQuoteLeft,
  FaCode,
  FaUndo,
  FaRedo,
  FaEraser,
  FaChevronDown,
} from "react-icons/fa";

import "./RichTextEditor.css";

const HEADING_OPTIONS = [
  { value: "p", label: "Paragraph" },
  { value: "h1", label: "Heading 1" },
  { value: "h2", label: "Heading 2" },
  { value: "h3", label: "Heading 3" },
  { value: "h4", label: "Heading 4" },
  { value: "h5", label: "Heading 5" },
  { value: "h6", label: "Heading 6" },
];

// ==========================================
// HELPERS
// ==========================================

const isExternalLink = (href) => {
  if (!href) return false;

  if (/^(mailto:|tel:|#|\/)/i.test(href)) return false;

  try {
    const url = new URL(href, window.location.origin);
    return url.origin !== window.location.origin;
  } catch {
    return false;
  }
};

const normalizeUrl = (url) => {
  let finalUrl = (url || "").trim();

  if (!finalUrl) return "";

  if (
    !/^https?:\/\//i.test(finalUrl) &&
    !/^mailto:/i.test(finalUrl) &&
    !/^tel:/i.test(finalUrl) &&
    !/^#/.test(finalUrl) &&
    !/^\//.test(finalUrl)
  ) {
    finalUrl = `https://${finalUrl}`;
  }

  return finalUrl;
};

const RichTextEditor = ({
  value,
  onChange,
  disabled = false,
  placeholder = "Write your blog content here...",
}) => {
  const editorRef = useRef(null);
  const isInternalChangeRef = useRef(false);
  const savedSelectionRef = useRef(null);

  const [currentBlock, setCurrentBlock] = useState("p");

  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [linkMode, setLinkMode] = useState("existing");

  // ==========================================
  // SYNC VALUE
  // ==========================================

  useEffect(() => {
    if (!editorRef.current) return;

    if (isInternalChangeRef.current) {
      isInternalChangeRef.current = false;
      return;
    }

    const currentHTML = editorRef.current.innerHTML;
    const newValue = value || "";

    if (currentHTML !== newValue) {
      editorRef.current.innerHTML = newValue;
    }
  }, [value]);

  // ==========================================
  // DETECT CURRENT BLOCK
  // ==========================================

  const detectCurrentBlock = () => {
    try {
      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;

      let node = selection.anchorNode;

      while (node && node !== editorRef.current) {
        if (
          node.nodeType === 1 &&
          /^(H1|H2|H3|H4|H5|H6|P|BLOCKQUOTE|PRE)$/i.test(node.tagName)
        ) {
          const tag = node.tagName.toLowerCase();

          if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(tag)) {
            setCurrentBlock(tag);
          } else if (tag === "p") {
            setCurrentBlock("p");
          }

          return;
        }
        node = node.parentNode;
      }

      setCurrentBlock("p");
    } catch {
      // ignore
    }
  };

  // ==========================================
  // RUN COMMAND
  // ==========================================

  const runCommand = (command, argument = null) => {
    if (disabled || !editorRef.current) return;

    editorRef.current.focus();

    document.execCommand(command, false, argument);

    const html = editorRef.current.innerHTML;

    isInternalChangeRef.current = true;
    onChange(html);

    detectCurrentBlock();
  };

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleInput = () => {
    if (!editorRef.current) return;

    const html = editorRef.current.innerHTML;

    isInternalChangeRef.current = true;
    onChange(html);
  };

  const handleKeyUp = () => {
    detectCurrentBlock();
  };

  const handleHeadingChange = (event) => {
    const tag = event.target.value;
    runCommand("formatBlock", tag);
  };

  // ==========================================
  // OPEN LINK MODAL
  // ==========================================

  const openLinkModal = () => {
    if (disabled || !editorRef.current) return;

    editorRef.current.focus();

    const selection = window.getSelection();
    const selectedText =
      selection && !selection.isCollapsed ? selection.toString() : "";

    if (selection && selection.rangeCount > 0) {
      savedSelectionRef.current = selection.getRangeAt(0).cloneRange();
    }

    if (selectedText) {
      setLinkMode("existing");
      setLinkText(selectedText);
    } else {
      setLinkMode("new");
      setLinkText("");
    }

    setLinkUrl("https://");
    setShowLinkModal(true);
  };

  const closeLinkModal = () => {
    setShowLinkModal(false);
    setLinkUrl("");
    setLinkText("");
    savedSelectionRef.current = null;
  };

  // ==========================================
  // APPLY LINK ATTRIBUTES
  // External → rel="nofollow" ONLY (no target)
  // Internal → remove target and rel
  // ==========================================

  const applyLinkAttributes = () => {
    if (!editorRef.current) return;

    const links = editorRef.current.querySelectorAll("a");

    links.forEach((a) => {
      const href = a.getAttribute("href") || "";

      // Always remove target — never set it
      a.removeAttribute("target");

      if (isExternalLink(href)) {
        a.setAttribute("rel", "nofollow");
      } else {
        a.removeAttribute("rel");
      }
    });
  };

  // ==========================================
  // INSERT LINK
  // ==========================================

  const insertLink = () => {
    if (!editorRef.current) return;

    const finalUrl = normalizeUrl(linkUrl);

    if (!finalUrl || finalUrl === "https://") {
      alert("Please enter a valid URL.");
      return;
    }

    editorRef.current.focus();

    const selection = window.getSelection();
    if (savedSelectionRef.current && selection) {
      selection.removeAllRanges();
      selection.addRange(savedSelectionRef.current);
    }

    if (linkMode === "existing" && selection && !selection.isCollapsed) {
      document.execCommand("createLink", false, finalUrl);
    } else {
      const safeText = (linkText || finalUrl).replace(/</g, "&lt;");
      const linkHTML = `<a href="${finalUrl}">${safeText}</a>`;

      document.execCommand("insertHTML", false, linkHTML);
    }

    // Apply nofollow on external, nothing on internal
    applyLinkAttributes();

    const html = editorRef.current.innerHTML;
    isInternalChangeRef.current = true;
    onChange(html);

    closeLinkModal();
  };

  // ==========================================
  // REMOVE LINK
  // ==========================================

  const removeLink = () => {
    if (disabled || !editorRef.current) return;

    editorRef.current.focus();

    const selection = window.getSelection();

    if (!selection || selection.isCollapsed) {
      alert("Please place cursor inside a link first.");
      return;
    }

    document.execCommand("unlink");

    const html = editorRef.current.innerHTML;
    isInternalChangeRef.current = true;
    onChange(html);
  };

  // ==========================================
  // HANDLE PASTE
  // ==========================================

  const handlePaste = (event) => {
    event.preventDefault();

    const htmlData = event.clipboardData?.getData("text/html");
    const textData = event.clipboardData?.getData("text/plain");

    if (htmlData) {
      const temp = document.createElement("div");
      temp.innerHTML = htmlData;

      // Strip all attributes except href
      temp.querySelectorAll("*").forEach((el) => {
        const tag = el.tagName.toLowerCase();

        const allowedAttrsByTag = {
          a: ["href"],
        };

        const allowed = allowedAttrsByTag[tag] || [];

        [...el.attributes].forEach((attr) => {
          if (!allowed.includes(attr.name)) {
            el.removeAttribute(attr.name);
          }
        });
      });

      // Apply link rules — nofollow only, no target
      temp.querySelectorAll("a").forEach((a) => {
        const href = a.getAttribute("href") || "";

        a.removeAttribute("target");

        if (isExternalLink(href)) {
          a.setAttribute("rel", "nofollow");
        } else {
          a.removeAttribute("rel");
        }
      });

      document.execCommand("insertHTML", false, temp.innerHTML);
    } else if (textData) {
      document.execCommand("insertText", false, textData);
    }

    const html = editorRef.current?.innerHTML || "";
    isInternalChangeRef.current = true;
    onChange(html);
  };

  // ==========================================
  // PREVENT LINK NAVIGATION IN EDITOR
  // ==========================================

  const handleEditorClick = (event) => {
    const target = event.target;

    if (target.tagName === "A") {
      event.preventDefault();

      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        range.selectNodeContents(target);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  // ==========================================
  // TOOLBAR BUTTON
  // ==========================================

  const ToolbarButton = ({ title, onClick, children }) => (
    <button
      type="button"
      className="rich-toolbar-btn"
      title={title}
      disabled={disabled}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
    >
      {children}
    </button>
  );

  const previewHref = normalizeUrl(linkUrl) || "#";
  const previewIsExternal = isExternalLink(previewHref);

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <>
      <div
        className={`rich-editor ${
          disabled ? "rich-editor-disabled" : ""
        }`}
      >
        <div className="rich-editor-toolbar">

          <div className="rich-toolbar-group">
            <div className="rich-heading-select">
              <select
                value={currentBlock}
                onChange={handleHeadingChange}
                disabled={disabled}
                title="Text Style"
              >
                {HEADING_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              <FaChevronDown className="rich-heading-arrow" />
            </div>
          </div>

          <div className="rich-toolbar-divider" />

          <div className="rich-toolbar-group">
            <ToolbarButton
              title="Bold"
              onClick={() => runCommand("bold")}
            >
              <FaBold />
            </ToolbarButton>

            <ToolbarButton
              title="Italic"
              onClick={() => runCommand("italic")}
            >
              <FaItalic />
            </ToolbarButton>

            <ToolbarButton
              title="Underline"
              onClick={() => runCommand("underline")}
            >
              <FaUnderline />
            </ToolbarButton>
          </div>

          <div className="rich-toolbar-divider" />

          <div className="rich-toolbar-group">
            <ToolbarButton
              title="Bullet List"
              onClick={() => runCommand("insertUnorderedList")}
            >
              <FaListUl />
            </ToolbarButton>

            <ToolbarButton
              title="Numbered List"
              onClick={() => runCommand("insertOrderedList")}
            >
              <FaListOl />
            </ToolbarButton>
          </div>

          <div className="rich-toolbar-divider" />

          <div className="rich-toolbar-group">
            <ToolbarButton title="Add Link" onClick={openLinkModal}>
              <FaLink />
            </ToolbarButton>

            <ToolbarButton title="Remove Link" onClick={removeLink}>
              <FaUnlink />
            </ToolbarButton>

            <ToolbarButton
              title="Blockquote"
              onClick={() => runCommand("formatBlock", "blockquote")}
            >
              <FaQuoteLeft />
            </ToolbarButton>

            <ToolbarButton
              title="Code Block"
              onClick={() => runCommand("formatBlock", "pre")}
            >
              <FaCode />
            </ToolbarButton>
          </div>

          <div className="rich-toolbar-divider" />

          <div className="rich-toolbar-group">
            <ToolbarButton
              title="Undo"
              onClick={() => runCommand("undo")}
            >
              <FaUndo />
            </ToolbarButton>

            <ToolbarButton
              title="Redo"
              onClick={() => runCommand("redo")}
            >
              <FaRedo />
            </ToolbarButton>

            <ToolbarButton
              title="Clear Formatting"
              onClick={() => runCommand("removeFormat")}
            >
              <FaEraser />
            </ToolbarButton>
          </div>

        </div>

        <div
          ref={editorRef}
          className="rich-editor-content"
          contentEditable={!disabled}
          suppressContentEditableWarning
          data-placeholder={placeholder}
          onInput={handleInput}
          onKeyUp={handleKeyUp}
          onMouseUp={handleKeyUp}
          onPaste={handlePaste}
          onClick={handleEditorClick}
        />
      </div>

      {/* ==========================================
          LINK MODAL — no target options
      ========================================== */}

      {showLinkModal && (
        <div
          className="rich-link-modal-overlay"
          onClick={closeLinkModal}
        >
          <div
            className="rich-link-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="rich-link-modal-title">
              <FaLink />
              {linkMode === "existing"
                ? "Add Link to Selected Text"
                : "Insert New Link"}
            </h3>

            {linkMode === "new" && (
              <div className="rich-link-field">
                <label>Link Text</label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Click here"
                  autoFocus
                />
              </div>
            )}

            <div className="rich-link-field">
              <label>URL</label>
              <input
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                autoFocus={linkMode === "existing"}
              />
            </div>

            {previewIsExternal && (
              <div className="rich-link-info">
                <span className="rich-link-info-icon">ℹ️</span>
                <span>
                  External links are automatically set to{" "}
                  <code>rel="nofollow"</code>
                </span>
              </div>
            )}

            <div className="rich-link-preview">
              <span>Preview:</span>
              <a
                href={previewHref}
                rel={previewIsExternal ? "nofollow" : undefined}
                onClick={(e) => e.preventDefault()}
              >
                {linkMode === "new"
                  ? linkText || linkUrl || "Link"
                  : "Selected text"}
              </a>
            </div>

            <div className="rich-link-actions">
              <button
                type="button"
                className="rich-link-btn cancel"
                onClick={closeLinkModal}
              >
                Cancel
              </button>

              <button
                type="button"
                className="rich-link-btn insert"
                onClick={insertLink}
              >
                {linkMode === "existing"
                  ? "Update Link"
                  : "Insert Link"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RichTextEditor;