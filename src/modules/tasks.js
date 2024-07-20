
class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    static tasksList = [];
    getTitle() {
        return this.title;
    }

    setTitle(newTitle) {
        this.title = newTitle;
    }
    
    getDescription() {
        return this.title;
    }

    setDescription(newTitle) {
        this.title = newTitle;
    }
    
    getDueDate() {
        return this.dueDate;
    }
    setDueDate(newDueDate) {
        this.dueDate = newDueDate;
    }

    getPriority() {
        return this.priority;
    }
    setPriority(newPriority) {
        this.priority = newPriority;
    }
}

export default Task;
