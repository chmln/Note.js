var Note = function Note(config) {
    var self = this;

    function createElement(node, className, content) {
        var e = document.createElement(node);
        if (className) e.className = className;

        if (content) {
            if (typeof content === "string") e.innerHTML = content;else if (content.nodeName) e.appendChild(content);
        }

        return e;
    }

    function init() {
        parseConfig();
        build();
    }

    function parseConfig() {
        self.config = {
            duration: 4,
            position: "bottomRight",
            closeIcon: '<svg viewbox="0 0 40 40"><path d="M 10,10 L 30,30 M 30,10 L 10,30" /></svg>'
        };

        if (config) for (var opt in config) {
            self.config[opt] = config[opt];
        }
    }

    function build() {
        self.container = createElement("div", "note--container " + self.config.position);
        self.innerContainer = createElement("div", "note--inner");
        self.container.appendChild(self.innerContainer);
        document.body.appendChild(self.container);
    }

    function destroy() {
        document.body.removeChild(self.container);
    }

    function showGeneric(type, title, content, noteConfig) {
        // {
        //     type: ["info", "success", "error", "warning"],
        //     title: "",
        //     content: ""
        // }

        noteConfig = noteConfig || {};

        var note = createElement("div", "note shown note--" + type);
        var noteFragment = document.createDocumentFragment(),
            noteCloseButton = createElement("div", "note--close", self.config.closeIcon),
            noteContent = createElement("div", "note--content");

        if (title) {
            note.classList.add("hasTitle");
            noteContent.appendChild(createElement("h2", "note--title", title));
        }

        noteContent.appendChild(createElement("p", "note--body", content));

        noteFragment.appendChild(noteContent);
        noteFragment.appendChild(noteCloseButton);

        note.appendChild(noteFragment);
        self.innerContainer.appendChild(note);

        var onAnimationEnd = function onAnimationEnd(e) {
            return !note.classList.contains("shown") && self.innerContainer.removeChild(note);
        };
        var hide = function hide() {
            note.classList.remove("shown");
        };

        note.addEventListener("click", hide);
        note.addEventListener("animationend", onAnimationEnd);

        if (!noteConfig.sticky && !self.config.sticky) setTimeout(hide, (noteConfig.duration || self.config.duration) * 1000);

        return {
            hide: hide,

            show: function show() {
                if (!note.parentNode) self.innerContainer.appendChild(note);
                note.classList.add("shown");
            }
        };
    }

    init();

    return {
        show: showGeneric,
        success: function success(title, text, config) {
            return showGeneric("success", title, text, config);
        },
        info: function info(title, text, config) {
            return showGeneric("info", title, text, config);
        },
        notify: function notify(title, text, config) {
            return showGeneric("default", title, text, config);
        },
        error: function error(title, text, config) {
            return showGeneric("error", title, text, config);
        },
        warn: function warn(title, text, config) {
            return showGeneric("warning", title, text, config);
        },
        destroy: destroy
    };
};

if (typeof module !== "undefined" && module.exports) module.exports = Note;
