import AssignmentList from "/js/components/AssignmentList.js";
import AssignmentCreate from "/js/components/AssignmentCreate.js";

export default {
    components: {
        AssignmentList,
        AssignmentCreate
    },
    template: `
    <section class="flex gap-8">
        <assignment-list :assignments="filters.inProgress" title="In Progress">
            <assignment-create @add="add"></assignment-create>
        </assignment-list>
        <assignment-list :assignments="filters.completed" title="Completed" toggle></assignment-list>
    </section>
    `,

    data () {
        return {
            assignments: [],
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