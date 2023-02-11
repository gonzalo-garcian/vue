import AssignmentList from "/js/components/AssignmentList.js";
import AssignmentCreate from "/js/components/AssignmentCreate.js";

export default {
    components: {
        AssignmentList,
        AssignmentCreate
    },
    template: `
    <section class="space-y-6">
        <assignment-list :assignments="filters.inProgress" title="In Progress"></assignment-list>
        <assignment-list :assignments="filters.completed" title="Completed"></assignment-list>

        <assignment-create @add="add"></assignment-create>
    </section>
    `,

    data () {
        return {
            assignments: [
                {name: "Task 1", complete: false, id: 1, tag: 'math'},
                {name: "Task 2", complete: false, id: 2, tag: 'science'},
                {name: "Task 3", complete: false, id: 3, tag: 'math'}
            ],
        }
    },

    created() {
        fetch("http://localhost:3000/assignments")
            .then(response => response.json())
            .then(assignments => this.assignments = assignments)
    },

    computed: {
        filters() {
            return {
                inProgress: this.assignments.filter(t => !t.complete),
                completed: this.assignments.filter(t => t.complete)
            }
        }
    },

    methods: {
        add(name) { 
            this.assignments.push({
                name: name,
                complete: false,
                id: this.assignments.length + 1,
                tag: 'no tag'
            });
        }
    }
}