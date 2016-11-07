var Note = function Note(config) {
    var self = this;

    function createElement(node, className, html) {
        var e = document.createElement(node);
        if (className) e.className = className;

        if (html) e.innerHTML = html;
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
            closeIcon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17" height="17" viewBox="0 0 17 17"> <g> </g> <path d="M9.207 8.5l6.646 6.646-0.707 0.707-6.646-6.646-6.646 6.646-0.707-0.707 6.646-6.646-6.647-6.646 0.707-0.707 6.647 6.646 6.646-6.646 0.707 0.707-6.646 6.646z" /></svg>'
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

    function showGeneric(type, title, text, noteConfig) {
        // {
        //     type: ["info", "success", "error", "warning"],
        //     title: "",
        //     text: ""
        // }

        noteConfig = noteConfig || {};

        var note = createElement("div", "note shown note--" + type);
        var noteFragment = document.createDocumentFragment(),
            noteCloseButton = createElement("div", "note--close", self.config.closeIcon);

        noteFragment.appendChild(noteCloseButton);

        if (title) noteFragment.appendChild(createElement("h2", "note--title", title));

        noteFragment.appendChild(createElement("p", "note--body", text));

        note.appendChild(noteFragment);
        self.innerContainer.appendChild(note);

        var onAnimationEnd = function onAnimationEnd(e) {
            return !note.classList.contains("shown") && self.innerContainer.removeChild(note);
        };
        var hide = function hide() {
            note.classList.remove("shown");
        };

        noteCloseButton.addEventListener("click", hide);
        note.addEventListener("animationend", onAnimationEnd);

        if (!noteConfig.stick && !self.config.stick) setTimeout(hide, (noteConfig.duration || self.config.duration) * 1000);

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
