let app = new Vue({
  el: "#todo",
  data: {
    member_id: "",
    // inputTitle: "タイトル(仮)",
    // inputText: "テキストを入力する",
    status_options: [
      { value: 0, label: 'すべて' },
      { value: 1, label: '未着手' },
      { value: 2, label: '作業中' },
      { value: 3, label: '完了' }
    ],
    current: 0,
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
        status: 1,
        member_id: 1
      },
      {
        title: "面接",
        text: "田中さん",
        checked: false,
        status: 1,
        member_id: 3

      },
      {
        title: "役員会議資料作成",
        text: "決算",
        checked: false,
        status: 1,
        member_id: 2
      },
      {
        title: "人事評価",
        text: "給与の査定",
        checked: false,
        status: 1,
        member_id: 3
      },
      {
        title: "進捗報告1",
        text: "Aプロジェクト",
        checked: false,
        status: 1,
        member_id: 4
      },
      {
        title: "エクセル作成",
        text: "整理する",
        checked: false,
        status: 1,
        member_id: 2
      }
    ]
  },
  methods: {
    addTodo: function() {
      let title = this.$refs.title
      let comment = this.$refs.comment

      this.tasks.push({
        title: title.value,
        text: comment.value,
        status: 1,
        checked: false,
        member_id: this.member_id
      });
    },
    deleteTodo: function(member_id, del_index) {
      if (confirm("Todoを削除しますか？")) {
        this.tasks.splice(del_index, 1);
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
    changeStatus: function(task) {
      task.status = (task.status === this.status_options.length - 1) ? 1 : task.status + 1
    }
  },
  computed: {
    labels() {
      return this.status_options.reduce(function(a, b) {
        // console.log(Object.assign(a, { [b.value]: b.label }))
        return Object.assign(a, { [b.value]: b.label })
      }, {})
    },
    computedTasks: function() {
      // データ current が -1 ならすべて
      // それ以外なら current と state が一致するものだけに絞り込む

      // 第2引数のthisは、任意のオブジェクトをfilter以外で使う事ができる
      // 配列以外からのデータも一緒に組み込んで処理したいようなケースで、とても便利
      return this.tasks.filter(function(task) {
        // 第2引数のthisを付けないと、this == windowオブジェクトになってしまう
        // console.log(this)
        return this.current === 0 ? true : this.current === task.status
      })
    }
  }
});