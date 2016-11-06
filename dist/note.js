var Note = function Note(config) {
    var self = this;

    function createElement(node, className, html) {
        var e = document.createElement(node);
        if (className) e.className = className;

        if (html) e.innerHTML = html;
        return e;
    }

    function init() {
        build();

        self.config = {
            duration: 4,
            closeIcon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17" height="17" viewBox="0 0 17 17"> <g> </g> <path d="M9.207 8.5l6.646 6.646-0.707 0.707-6.646-6.646-6.646 6.646-0.707-0.707 6.646-6.646-6.647-6.646 0.707-0.707 6.647 6.646 6.646-6.646 0.707 0.707-6.646 6.646z" /></svg>'
        };

        if (config) for (var opt in config) {
            self.config[opt] = config[opt];
        }
    }

    function build() {
        self.container = createElement("div", "note--container");
        document.body.appendChild(self.container);
    }

    function destroy() {
        document.body.removeChild(self.container);
    }

    function showGeneric(type, title, text, config) {
        // {
        //     type: ["info", "success", "error", "warning"],
        //     title: "",
        //     text: ""
        // }

        config = config || {};

        var note = createElement("div", "note shown note--" + type);
        var noteFragment = document.createDocumentFragment(),
            noteCloseButton = createElement("div", "note--close", self.config.closeIcon);

        noteFragment.appendChild(noteCloseButton);

        if (title) noteFragment.appendChild(createElement("h2", "note--title", title));

        noteFragment.appendChild(createElement("p", "note--body", text));

        note.appendChild(noteFragment);
        self.container.appendChild(note);

        var onAnimationEnd = function onAnimationEnd(e) {
            return !note.classList.contains("shown") && self.container.removeChild(note);
        };
        var hide = function hide() {
            note.classList.remove("shown");
        };

        noteCloseButton.addEventListener("click", hide);
        note.addEventListener("animationend", onAnimationEnd);

        if (!config.stick && !self.config.stick) setTimeout(function () {
            self.container.removeChild(note);
        }, (config.duration || self.config.duration) * 1000);

        return {
            hide: hide,

            show: function show() {
                if (!note.parentNode) self.container.appendChild(note);
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
