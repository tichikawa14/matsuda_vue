var vm = new Vue({
    el: "#todo",
    data: {
        memberName: "",
        inputTitle: "タイトル(仮)",
        inputText: "テキストを入力する",
        status: {
            0: "すべて",
            1: "作業中",
            2: "完了"
        },
        current: { 0: "すべて" },
        members: [
            { id: 1, name: "部長" },
            { id: 2, name: "課長" },
            { id: 3, name: "主任" },
            { id: 4, name: "係長" }
        ],
        todos: [
            {
                title: "人事評価",
                text: "給与の査定",
                checked: false,
                status: 0,
                member_id: 1
            },
            {
                title: "面接",
                text: "田中さん",
                checked: false,
                status: 0,
                member_id: 3
            },
            {
                title: "役員会議資料作成",
                text: "決算",
                checked: false,
                status: 0,
                member_id: 2
            },
            {
                title: "人事評価",
                text: "給与の査定",
                checked: false,
                status: 0,
                member_id: 3
            },
            {
                title: "進捗報告1",
                text: "Aプロジェクト",
                checked: false,
                status: 0,
                member_id: 4
            },
            {
                title: "エクセル作成",
                text: "整理する",
                checked: false,
                status: 0,
                member_id: 2
            }
        ]
    },
    methods: {
        addTodo: function() {
            let member = this.members.find(
                member => member.name == this.memberName
            );
            member.todos.push({
                title: this.inputTitle,
                text: this.inputText,
                status: 0
            });
        },
        deleteTodo: function(del_member, del_index) {
            if (confirm("Todoを削除しますか？")) {
                del_member.todos.splice(del_index, 1);
            }
        },
        addTodo2: function() {
            console.log("tittle 追加");
            // if (this.todos === undefined) alert("error")
            this.tittles.push({ search: this.inputText2 });
        },
        selectedDelete: function() {
            // Object.keys(this.members).forEach(function (member) {
            //   console.log(member);
            // });
            // let selectedMembers = this.members.filter(member => member.todos.checked === true)
            // console.log(selectedMembers)
            // let selectedMembers = []
            // this.members.forEach(member => {
            //   member.todos = member.todos.filter(todo => todo.checked === true)
            //   }
            // }
            // }
            this.members.forEach(memeber => {
                memeber.todos = memeber.todos.filter(
                    todo => todo.checked == false
                );
            });
        },
        changeStatus: function() {}
    }
});