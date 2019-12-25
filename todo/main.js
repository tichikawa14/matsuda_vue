// https://jp.vuejs.org/v2/examples/todomvc.html
let STORAGE_KEY = 'ti-todo'
let todoStorage = {
  fetch: function() {
    let dataList = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    return dataList
  },

  save: function(datalist) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(datalist))
  }
}

let app = new Vue({
  el: "#todo",
  components: {
    vuejsDatepicker
  },
  data: {
    member_id: "",
    input_end_at: "",
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
        id: 1,
        title: "人事評価",
        text: "給与の査定",
        checked: false,
        status: 1,
        member_id: 1,
        end_at: moment(new Date()).add(1, 'days').format('YYYY-MM-DD')
      },
      {
        id: 2,
        title: "面接",
        text: "田中さん",
        checked: false,
        status: 1,
        member_id: 3,
        end_at: moment(new Date()).add(3, 'days').format('YYYY-MM-DD')
      },
      {
        id: 3,
        title: "役員会議資料作成",
        text: "決算",
        checked: false,
        status: 1,
        member_id: 2,
        end_at: moment(new Date()).add(5, 'days').format('YYYY-MM-DD')
      },
      {
        id: 4,
        title: "人事評価",
        text: "給与の査定",
        checked: false,
        status: 1,
        member_id: 3,
        end_at: moment(new Date()).add(6, 'days').format('YYYY-MM-DD')
      },
      {
        id: 5,
        title: "進捗報告1",
        text: "Aプロジェクト",
        checked: false,
        status: 1,
        member_id: 4,
        end_at: moment(new Date()).add(7, 'days').format('YYYY-MM-DD')
      },
      {
        id: 6,
        title: "エクセル作成",
        text: "整理する",
        checked: false,
        status: 1,
        member_id: 2,
        end_at: moment(new Date()).add(8, 'days').format('YYYY-MM-DD')
      }
    ],
    defaultDate: moment(new Date()),
    ja: {
      language: 'Japanese',
      months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      monthsAbbr: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      days: ['日', '月', '火', '水', '木', '金', '土'],
      rtl: false,
      ymd: 'yyyy-MM-dd',
      yearSuffix: '年'
    },
    disabledDates: {
      to: new Date(new Date().setDate(new Date().getDate() - 1))
    }
  },
  created() {
    // インスタンス作成時に自動的に fetch() する
    let dataList = todoStorage.fetch()

    // 配列に値がある場合、インスタンス変数に格納
    if (dataList.length) {
      this.members = dataList[0]
      this.tasks = dataList[1]
    }

    // 複数の値を監視
    this.$watch(function () {
      return [this.members, this.tasks]
    }, function(datalist) {
      todoStorage.save(datalist)
    }, {deep: true})
  },
  methods: {
    addTodo: function() {
      let title = this.$refs.title
      let comment = this.$refs.comment

      this.tasks.push({
        id: this.lastId(this.tasks) + 1,
        title: title.value,
        text: comment.value,
        status: 1,
        checked: false,
        member_id: this.member_id,
        end_at: moment(this.input_end_at).format('YYYY-MM-DD')
      });

    },
    deleteTodo: function(member_id, del_index) {
      if (confirm("Todoを削除しますか？")) {
        this.tasks.splice(del_index, 1);
      }
    },
    addMember: function() {
      let in_charge = this.$refs.in_charge

      this.members.push({
        id: this.lastId(this.members) + 1,
        name: in_charge.value
      })
    },
    lastId: function(obj) {
      // 最後のオブジェクトを返す
      if (obj.length == 0) return 0

      // obj[obj.length - 1].idと同義
      return obj.slice(-1)[0].id
    },
    selectedDelete: function() {
      // 削除
      this.tasks = this.tasks.filter(task => task.checked == false)
    },
    changeStatus: function(task) {
      task.status = (task.status === this.status_options.length - 1) ? 1 : task.status + 1
    },
    allowDrop: function (ev) {
      ev.preventDefault()
    },
    drag: function (ev) {
      ev.dataTransfer.setData("drag-id", ev.target.id)
    },
    drop: function (ev, member_id) {
      ev.preventDefault();
      let drag_id = ev.dataTransfer.getData("drag-id")
      let target_task = this.tasks.find(task => task.id === Number(drag_id))
      target_task.member_id = member_id
    },
    FormatDate(date) {
      return moment(date).format('YYYY年MM月DD日');
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
      }, this)
    }
  }
});