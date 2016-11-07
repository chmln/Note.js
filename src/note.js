const Note = function (config) {
    const self = this;

    function createElement(node, className, html) {
        let e = document.createElement(node);
        if (className)
            e.className = className;

        if (html)
            e.innerHTML = html;
        return e;
    }

    function init() {
        parseConfig();
        build();
    }

    function parseConfig() {
        self.config = {
            duration: 4,
            position: "topRight",
            closeIcon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17" height="17" viewBox="0 0 17 17"> <g> </g> <path d="M9.207 8.5l6.646 6.646-0.707 0.707-6.646-6.646-6.646 6.646-0.707-0.707 6.646-6.646-6.647-6.646 0.707-0.707 6.647 6.646 6.646-6.646 0.707 0.707-6.646 6.646z" /></svg>'
        };

        if (config)
            for(let opt in config)
                self.config[opt] = config[opt];
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

        let note = createElement("div", "note shown note--" + type);
        let noteFragment = document.createDocumentFragment(),
            noteCloseButton = createElement("div", "note--close", self.config.closeIcon);

        noteFragment.appendChild(noteCloseButton);

        if (title)
            noteFragment.appendChild(createElement("h2", "note--title", title));

        noteFragment.appendChild(createElement("p", "note--body", text));

        note.appendChild(noteFragment);
        self.innerContainer.appendChild(note);

        let onAnimationEnd = e => !note.classList.contains("shown") && (self.innerContainer.removeChild(note));
        let hide = () => {
            note.classList.remove("shown");
        };

        noteCloseButton.addEventListener("click", hide);
        note.addEventListener("animationend", onAnimationEnd);

        if (!noteConfig.stick && !self.config.stick)
            setTimeout(hide, (noteConfig.duration || self.config.duration) * 1000);

        return {
            hide: hide,

            show: function (){
                if (!note.parentNode)
                    self.innerContainer.appendChild(note);
                note.classList.add("shown");
            }
        }
    }

    init();

    return {
        show: showGeneric,
        success: (title, text, config) => showGeneric("success", title, text, config),
        info: (title, text, config) => showGeneric("info", title, text, config),
        notify: (title, text, config) => showGeneric("default", title, text, config),
        error: (title, text, config) => showGeneric("error", title, text, config),
        warn: (title, text, config) => showGeneric("warning", title, text, config),
        destroy: destroy
    };

}

if (typeof module !== "undefined" && module.exports)
    module.exports = Note;
