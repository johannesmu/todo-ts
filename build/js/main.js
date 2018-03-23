var Task = /** @class */ (function () {
    function Task(name) {
        this.name = name;
        this.id = new Date().getTime();
        this.status = false;
        return this;
    }
    return Task;
}());
