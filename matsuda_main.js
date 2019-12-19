var vm = new Vue({
  el: "#todo",
  data: {
    memberName: "",
    inputTitle: "タイトル(仮)",
    inputText: "テキストを入力する",
    status_options: [
      { value: 0, label: 'すべて' },
      { value: 1, label: '作業中' },
      { value: 2, label: '完了' }
    ],
    // current: { 0: "すべて" },
    members: [
      { id: 1, name: "部長" },
      { id: 2, name: "課長" },
      { id: 3, name: "主任" },
      { id: 4, name: "係長" }
    ],
    tasks: [
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
      let add_member = this.members.find(
        member => member.name == this.memberName
      );
      this.tasks.push({
        title: this.inputTitle,
        text: this.inputText,
        status: 0,
        checked: false,
        member_id: add_member.id
      });
    },
    deleteTodo: function(member_id, del_index) {
      if (confirm("Todoを削除しますか？")) {
        // todosを探す
        // let targets = this.tasks.filter(task =>
        //     task.member_id === member_id
        // );
        // console.log(this.tasks);
        // // todoを抽出
        // console.log(targets);
        // let del_task = targets.find(target => target[del_index]);
        // 削除
        this.tasks.splice(del_index, 1);
        // console.log(targets.find(function(target) {
        //         target[del_index]
        //     })
        // );
      }
    },
    addTodo2: function() {
      // if (this.todos === undefined) alert("error")
      this.titles.push({ search: this.inputText2 });
    },
    selectedDelete: function() {
      // 削除
      this.tasks = this.tasks.filter(task => task.checked == false)
    },
    changeStatus: function() {}
  },
  computed: {
    labels() {
      return this.status_options.reduce(function(a, b) {
        // console.log(Object.assign(a, { [b.value]: b.label }))
        return Object.assign(a, { [b.value]: b.label })
      }, {})
    }
  }
});