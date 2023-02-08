import AssignmentList from "/js/components/AssignmentList.js";

export default {
    components: {
        AssignmentList,
    },
    template: `
    <section class="space-y-6">
        <assignment-list :assignments="filters.inProgress" title="In Progress"></assignment-list>
        <assignment-list :assignments="filters.completed" title="Completed"></assignment-list>

        <form @submit.prevent="add">
            <div class="border border-gray-600 text-black">
                <input v-model="newAssignment" type="text" class="p-2">
                <button type="submit" class="bg-white p-2 border-l"> Add </button>
            </div>
        </form>
    </section>
    `,

    data () {
        return {
            assignments: [
                {name: "Task 1", complete: false, id: 1},
                {name: "Task 2", complete: false, id: 2},
                {name: "Task 3", complete: false, id: 3}
            ],

            newAssignment: "",
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
        add() { 
            this.assignments.push({
                name: this.newAssignment,
                complete: false,
                id: this.assignments.length + 1,
            });

            this.newAssignment = "";
        }
    }
}