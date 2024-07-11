const tasks = (() => {
    class Task {
        constructor(title, description, dueDate, priority, project) {
            this.title = title;
            this.description = description;
            this.dueDate = dueDate;
            this.priority = priority;
            this.project = project;
        }
    
        get task() {
            return {
                

            };
        }
    
        set title (newTitle) {
            this.title = newTitle;
        }
        
        get description () {
            return this.description;
        }
    
    }
})();
