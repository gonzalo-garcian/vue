import AssignmentList from "/js/components/AssignmentList.js";
import AssignmentForm from "/js/components/AssignmentForm.js";

export default {
    components: {
        AssignmentList,
        AssignmentForm
    },
    template: `
    <section class="space-y-6">
        <assignment-list :assignments="filters.inProgress" title="In Progress"></assignment-list>
        <assignment-list :assignments="filters.completed" title="Completed"></assignment-list>

        <assignment-form @add="add"></assignment-form>
    </section>
    `,

    data () {
        return {
            assignments: [
                {name: "Task 1", complete: false, id: 1},
                {name: "Task 2", complete: false, id: 2},
                {name: "Task 3", complete: false, id: 3}
            ],
        }
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
            });
        }
    }
}