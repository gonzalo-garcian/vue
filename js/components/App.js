import AppButton from "/js/components/AppButton.js";

export default {
    template: `
        <section v-show="inProgress.length">
            <h2>In progress</h2>
            <ul>
                <li v-for="task in inProgress" :key="task.id">
                    <label>
                        {{task.name}}
                        <input type="checkbox" v-model="task.complete">
                    </label>
                </li>
            </ul>
        </section>

        <section v-show="completed.length">
            <h2>Completed</h2>
            <ul>
                <li v-for="task in completed" :key="task.id">
                    <label>
                        {{task.name}}
                        <input type="checkbox" v-model="task.complete">
                    </label>
                </li>
            </ul>
        </section>
    `,

    data () {
        return {
            tasks: [
                {name: "Task 1", complete: false, id: 1},
                {name: "Task 2", complete: false, id: 2},
                {name: "Task 3", complete: false, id: 3}
            ]
        }
    },

    computed: {
        completed() {
            return this.tasks.filter(t => t.complete);
        },

        inProgress() {
            return this.tasks.filter(t => !t.complete)
        }
    }
}