new Vue({
    el: "#app",
    data:{
      item: '' ,
      items: [],
      date:'',
      dates:[]
    },
    mounted: function() {
      const today = new Date();
      const year = today.getFullYear();
      const month = ('0' + (today.getMonth() + 1)).slice(-2);
      const day = ('0' + today.getDate()).slice(-2);
      this.date = '(' + month + '/' + day + ')';
      this.loadFromLocalStorage(); 
    },
    methods: {
      addItem() {
        this.items.push(this.item)
        this.item ='' 
        this.dates.push(this.date)
      },
      deleteItem: function(index) {
        this.items.splice(index, 1)
        this.dates.splice(index, 1)
      },
      saveToLocalStorage() {
        // ローカルストレージにデータを保存する
        localStorage.setItem('items', JSON.stringify(this.items));
        localStorage.setItem('dates', JSON.stringify(this.dates));
      },
      loadFromLocalStorage() {
        // ローカルストレージからデータを読み込む
        const items = localStorage.getItem('items');
        const dates = localStorage.getItem('dates');
        if (items && dates) {
          this.items = JSON.parse(items);
          this.dates = JSON.parse(dates);
        }
      }
    },
    watch: {
      // データが変更された場合に自動的にローカルストレージに保存する
      items: function(newItems) {
        this.saveToLocalStorage();
      },
      dates: function(newDates) {
        this.saveToLocalStorage();
      }
    }
  });
  